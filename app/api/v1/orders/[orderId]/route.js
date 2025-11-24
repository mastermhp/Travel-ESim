import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/lib/models/order"
import { verifyAccessToken } from "@/lib/auth"

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { orderId } = await params

    console.log("[v0] Fetching order:", orderId)

    // Verify authentication
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("[v0] No auth header found")
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = verifyAccessToken(token)
    if (!decoded) {
      console.log("[v0] Invalid token")
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    console.log("[v0] Decoded token userId:", decoded.userId)

    // Fetch order
    const order = await Order.findOne({ orderId }).lean()
    if (!order) {
      console.log("[v0] Order not found")
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    console.log("[v0] Order userId:", order.userId, "Token userId:", decoded.userId)

    const orderUserId = String(order.userId)
    const tokenUserId = String(decoded.userId)

    if (orderUserId !== tokenUserId) {
      console.log("[v0] User does not own this order")
      return NextResponse.json(
        { success: false, error: "Forbidden - You can only view your own orders" },
        { status: 403 },
      )
    }

    console.log("[v0] Order fetched successfully for user")

    return NextResponse.json({
      success: true,
      order: {
        orderId: order.orderId,
        status: order.status,
        paymentStatus: order.paymentStatus,
        amount: order.amount,
        currency: order.currency,
        planId: order.planId,
        phoneNumber: order.phoneNumber,
        iccid: order.iccid,
        activationCode: order.activationCode,
        qrUrl: order.qrUrl,
        createdAt: order.createdAt,
      },
    })
  } catch (error) {
    console.error("[Order API] Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
