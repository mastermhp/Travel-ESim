import { connectDB } from "../db.js"
import Order from "../models/order.js"
import Plan from "../models/plan.js"
import { bullmqManager, QUEUE_NAMES } from "../queue-bullmq.js"
import { provisionTwilioSuperSIM } from "../twilio.js"
import { uploadQRCodeToCloudinary } from "../cloudinary.js"
import { sendAdminAlert } from "../notifications.js"

export async function startProvisionWorker() {
  console.log("[Provision Worker] Starting...")
  await connectDB()

  await bullmqManager.createWorker(
    QUEUE_NAMES.PROVISION_HIGH,
    async (job) => {
      return await processProvisionJob(job.data)
    },
    { concurrency: 2 },
  )

  console.log("[Provision Worker] Ready and listening for jobs")
}

async function processProvisionJob(jobData) {
  const { orderId, planId, userId, supplierId, attempt = 0 } = jobData
  const maxAttempts = 3

  console.log(`[Worker] Processing provision job for order: ${orderId} (attempt ${attempt + 1}/${maxAttempts})`)

  try {
    const order = await Order.findOneAndUpdate(
      { orderId, provisionStatus: "pending" },
      { provisionStatus: "processing" },
      { new: true },
    )

    if (!order) {
      const existingOrder = await Order.findOne({ orderId })
      if (existingOrder?.provisionStatus === "provisioned") {
        console.log("[Worker] Order already provisioned, skipping:", orderId)
        return { success: true, message: "Already provisioned" }
      }
      throw new Error("Order not found or already being processed")
    }

    if (order.supplierResponse && order.qrUrl && order.activationCode) {
      console.log("[Worker] Order already has eSIM data, marking as complete:", orderId)
      order.provisionStatus = "provisioned"
      order.status = "completed"
      await order.save()
      return { success: true, message: "Already has eSIM data" }
    }

    const plan = await Plan.findById(planId)
    if (!plan) {
      throw new Error("Plan not found")
    }

    const selectedSupplierId = supplierId || plan.supplierId || "TWILIO"

    let provisionResult
    if (selectedSupplierId === "TWILIO") {
      provisionResult = await provisionTwilioSuperSIM(order)
    } else {
      throw new Error(`Unsupported supplier: ${selectedSupplierId}`)
    }

    if (!provisionResult.success) {
      throw new Error(provisionResult.error || "Provisioning failed")
    }

    let qrUrl = provisionResult.qrUrl
    if (provisionResult.qrImageBuffer) {
      qrUrl = await uploadQRCodeToCloudinary(provisionResult.qrImageBuffer, orderId)
    }

    order.provisionStatus = "provisioned"
    order.status = "completed"
    order.paymentStatus = order.paymentStatus === "unpaid" ? "paid" : order.paymentStatus
    order.supplierResponse = {
      ...provisionResult.rawResponse,
      provisionedAt: new Date(),
      supplierId: selectedSupplierId,
    }
    order.qrUrl = qrUrl
    order.activationCode = provisionResult.activationCode
    order.iccid = provisionResult.iccid || provisionResult.sid
    await order.save()

    console.log("[Worker] eSIM provisioned successfully:", orderId)

    await bullmqManager.enqueue(QUEUE_NAMES.NOTIFICATION, {
      type: "order_confirmation",
      orderId,
      userEmail: order.userEmail,
      phoneNumber: order.phoneNumber,
      qrUrl,
      activationCode: provisionResult.activationCode,
    })

    return { success: true, orderId, qrUrl }
  } catch (error) {
    console.error("[Worker] Provisioning error:", error.message)

    const order = await Order.findOne({ orderId })
    if (!order) {
      throw error
    }

    const plan = await Plan.findById(order.planId)
    if (plan?.fallbackSupplierId && attempt === 0) {
      console.log(`[Worker] Trying fallback supplier: ${plan.fallbackSupplierId}`)
      order.provisionStatus = "pending"
      await order.save()

      await bullmqManager.enqueue(
        QUEUE_NAMES.PROVISION_HIGH,
        { ...jobData, supplierId: plan.fallbackSupplierId, attempt: attempt + 1 },
        { maxAttempts: 2, backoffDelay: 10000 },
      )
      throw new Error("Retrying with fallback supplier")
    }

    if (attempt >= maxAttempts - 1) {
      console.error(`[Worker] Max attempts reached for order: ${orderId}`)
      order.provisionStatus = "failed"
      order.status = "failed"
      order.lastError = error.message
      await order.save()

      await sendAdminAlert(
        `eSIM Provisioning Failed: ${orderId}`,
        `Order ${orderId} failed after ${maxAttempts} attempts.\n\nError: ${error.message}\n\nPlan: ${order.planId}\nUser: ${order.userEmail}`,
      )

      throw new Error("Max attempts reached")
    }

    order.provisionStatus = "pending"
    order.lastError = error.message
    await order.save()

    throw error
  }
}

// Auto-start worker if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startProvisionWorker().catch(console.error)
}
