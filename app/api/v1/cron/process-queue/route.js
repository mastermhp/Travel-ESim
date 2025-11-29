import { connectDB } from "@/lib/db"
import Order from "@/lib/models/order"
import Plan from "@/lib/models/plan"
import { provisionWithFallback } from "@/lib/provider-manager"
import { uploadQRCodeToCloudinary } from "@/lib/cloudinary"

export async function GET(request) {
  // Verify this is from Vercel Cron
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 })
  }

  console.log("[Cron] Starting queue processor...")

  try {
    await connectDB()

    // Find all pending orders (payment completed but not provisioned)
    const pendingOrders = await Order.find({
      paymentStatus: "paid",
      provisionStatus: { $in: ["pending", "processing"] },
    })
      .sort({ createdAt: 1 })
      .limit(10) // Process up to 10 orders per minute

    console.log(`[Cron] Found ${pendingOrders.length} pending orders to process`)

    if (pendingOrders.length === 0) {
      return Response.json({
        success: true,
        message: "No pending orders",
        processed: 0,
      })
    }

    const results = []

    for (const order of pendingOrders) {
      try {
        console.log(`[Cron] Processing order: ${order.orderId}`)

        // Skip if already processing
        if (order.provisionStatus === "processing") {
          const processingTime = Date.now() - new Date(order.updatedAt).getTime()
          if (processingTime < 5 * 60 * 1000) {
            // Less than 5 minutes
            console.log(`[Cron] Order ${order.orderId} is currently processing, skipping`)
            continue
          }
          console.log(
            `[Cron] Order ${order.orderId} stuck in processing for ${Math.round(processingTime / 1000)}s, retrying`,
          )
        }

        // Skip if already provisioned
        if (order.provisionStatus === "provisioned") {
          console.log(`[Cron] Order ${order.orderId} already provisioned, skipping`)
          continue
        }

        // Update status to processing
        order.provisionStatus = "processing"
        await order.save()

        // Get plan details
        const plan = await Plan.findById(order.planId)
        if (!plan) {
          throw new Error("Plan not found")
        }

        // Provision eSIM
        const primaryProvider = plan.supplierId || "esimgo"
        const fallbackProvider = plan.fallbackSupplierId || (primaryProvider === "esimgo" ? "esimaccess" : "esimgo")

        order.supplierCode = plan.supplierCode || plan.bundleName

        const provisionResult = await provisionWithFallback(
          {
            orderId: order.orderId,
            supplierCode: order.supplierCode,
            bundleName: order.supplierCode,
            packageCode: order.supplierCode,
            plan: {
              supplierId: plan.supplierId,
              supplierCode: plan.supplierCode,
              bundleCode: plan.bundleName,
              country: plan.country,
              dataGB: plan.dataGB,
              validityDays: plan.validityDays,
            },
          },
          primaryProvider,
          fallbackProvider,
        )

        if (!provisionResult.success) {
          throw new Error(provisionResult.error || "Provisioning failed")
        }

        // Upload QR code to Cloudinary
        let qrUrl = provisionResult.qrUrl
        if (provisionResult.qrImageBuffer && process.env.CLOUDINARY_CLOUD_NAME) {
          qrUrl = await uploadQRCodeToCloudinary(provisionResult.qrImageBuffer, order.orderId)
        }

        // Update order with eSIM details
        order.provisionStatus = "provisioned"
        order.status = "completed"
        order.supplierResponse = {
          ...provisionResult.rawResponse,
          provisionedAt: new Date(),
          supplierId: provisionResult.provider?.toUpperCase() || primaryProvider.toUpperCase(),
          usedFallback: provisionResult.usedFallback || false,
        }
        order.qrUrl = qrUrl
        order.activationCode = provisionResult.activationCode
        order.iccid = provisionResult.iccid
        await order.save()

        console.log(`[Cron] ✅ Order ${order.orderId} provisioned successfully`)

        results.push({
          orderId: order.orderId,
          success: true,
          iccid: provisionResult.iccid,
        })
      } catch (error) {
        console.error(`[Cron] ❌ Failed to process order ${order.orderId}:`, error.message)

        // Update order status
        order.provisionStatus = "pending" // Reset to pending for retry
        order.lastError = error.message
        await order.save()

        results.push({
          orderId: order.orderId,
          success: false,
          error: error.message,
        })
      }
    }

    const successCount = results.filter((r) => r.success).length
    const failCount = results.filter((r) => !r.success).length

    console.log(`[Cron] Processed ${results.length} orders: ${successCount} success, ${failCount} failed`)

    return Response.json({
      success: true,
      message: `Processed ${results.length} orders`,
      processed: results.length,
      successful: successCount,
      failed: failCount,
      results,
    })
  } catch (error) {
    console.error("[Cron] Error processing queue:", error)
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
