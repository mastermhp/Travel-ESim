import { connectDB } from "../db.js"
import Order from "../models/order.js"
import { bullmqManager, QUEUE_NAMES } from "../queue-bullmq.js"
import { sendOrderConfirmationEmail, sendOrderConfirmationSMS } from "../notifications.js"

export async function startNotificationWorker() {
  console.log("[Notification Worker] Starting...")
  await connectDB()

  await bullmqManager.createWorker(
    QUEUE_NAMES.NOTIFICATION,
    async (job) => {
      return await processNotificationJob(job.data)
    },
    { concurrency: 5 },
  )

  console.log("[Notification Worker] Ready and listening for jobs")
}

async function processNotificationJob(jobData) {
  const { type, orderId, userEmail, phoneNumber, qrUrl, activationCode } = jobData

  console.log(`[Notification Worker] Processing ${type} for order: ${orderId}`)

  try {
    if (type === "order_confirmation") {
      const order = await Order.findOne({ orderId })
      if (!order) {
        throw new Error("Order not found")
      }

      // Send email notification
      await sendOrderConfirmationEmail(order, qrUrl, activationCode)

      // Send SMS notification if phone number provided
      if (phoneNumber) {
        await sendOrderConfirmationSMS(phoneNumber, orderId, activationCode)
      }

      console.log("[Notification Worker] Notifications sent successfully:", orderId)
      return { success: true }
    }

    throw new Error(`Unknown notification type: ${type}`)
  } catch (error) {
    console.error("[Notification Worker] Error:", error.message)
    throw error
  }
}

// Auto-start worker if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startNotificationWorker().catch(console.error)
}
