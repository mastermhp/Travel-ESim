import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { getCollection } from "@/lib/db"

export async function GET(request, { params }) {
  try {
    console.log("[Agent Order Details] Starting request")

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    console.log("[Agent Order Details] Token verified for agent:", decoded.agentId)

    const { orderId } = params
    const agentOrdersCol = await getCollection("agentorders")
    const ordersCol = await getCollection("orders")

    // Find the agent order
    const agentOrder = await agentOrdersCol.findOne({ _id: orderId })

    if (!agentOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Verify this order belongs to the agent
    if (agentOrder.agentId.toString() !== decoded.agentMongoId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Get the full order details including eSIM info
    const fullOrder = await ordersCol.findOne({ orderId: agentOrder.orderId })

    const orderDetails = {
      ...agentOrder,
      esimDetails: fullOrder
        ? {
            iccid: fullOrder.iccid,
            qrCodeUrl: fullOrder.qrCodeUrl,
            activationCode: fullOrder.activationCode,
            smdpAddress: fullOrder.smdpAddress,
            status: fullOrder.status,
          }
        : null,
    }

    console.log("[Agent Order Details] Order found")

    return NextResponse.json({ success: true, order: orderDetails })
  } catch (error) {
    console.error("[Agent Order Details] Error:", error)
    return NextResponse.json({ error: "Failed to fetch order details", details: error.message }, { status: 500 })
  }
}
