import { connectDB } from "@/lib/db"
import Order from "@/lib/models/order"
import Plan from "@/lib/models/plan"
import { provisionWithFallback } from "@/lib/provider-manager"
import { uploadQRCodeToCloudinary } from "@/lib/cloudinary"
import { verifyAdminAuth } from "@/lib/auth"

export async function POST(request) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth(request)
    if (!authResult.isValid) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[Admin Queue] Manual processing triggered by admin")

    await connectDB()

    // Find all pending orders
    const pendingOrders = await Order.find({
      paymentStatus: "paid",
      provisionStatus: { $in: ["pending", "processing"] },
    })
      .sort({ createdAt: 1 })
      .limit(20) // Process up to 20 orders when manually triggered

    console.log(`[Admin Queue] Found ${pendingOrders.length} pending orders`)

    if (pendingOrders.length === 0) {
      return Response.json({
        success: true,
        message: "No pending orders to process",
        processed: 0,
      })
    }

    const results = []

    for (const order of pendingOrders) {
      try {
        console.log(`[Admin Queue] Processing order: ${order.orderId}`)

        // Skip if already provisioned
        if (order.provisionStatus === "provisioned" && order.qrUrl) {
          console.log(`[Admin Queue] Order ${order.orderId} already provisioned`)
          results.push({
            orderId: order.orderId,
            success: true,
            message: "Already provisioned",
          })
          continue
        }

        // Update to processing
        order.provisionStatus = "processing"
        await order.save()

        // Get plan
        const plan = await Plan.findById(order.planId)
        if (!plan) {
          throw new Error("Plan not found")
        }

        // Provision
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

        // Upload QR
        let qrUrl = provisionResult.qrUrl
        if (provisionResult.qrImageBuffer && process.env.CLOUDINARY_CLOUD_NAME) {
          qrUrl = await uploadQRCodeToCloudinary(provisionResult.qrImageBuffer, order.orderId)
        }

        // Update order
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

        console.log(`[Admin Queue] ✅ Order ${order.orderId} provisioned`)

        results.push({
          orderId: order.orderId,
          success: true,
          iccid: provisionResult.iccid,
        })
      } catch (error) {
        console.error(`[Admin Queue] ❌ Failed ${order.orderId}:`, error.message)

        order.provisionStatus = "pending"
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

    return Response.json({
      success: true,
      message: `Processed ${results.length} orders`,
      processed: results.length,
      successful: successCount,
      failed: failCount,
      results,
    })
  } catch (error) {
    console.error("[Admin Queue] Error:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
