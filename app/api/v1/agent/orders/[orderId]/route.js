import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    console.log("[Agent Order Details] Starting request")

    const { orderId } = await params
    console.log("[Agent Order Details] Requested orderId:", orderId)

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    console.log("[Agent Order Details] Token verified for agent:", decoded.agentId)

    const agentsCol = await getCollection("agents")
    const agent = await agentsCol.findOne({ agentId: decoded.agentId })

    if (!agent) {
      console.log("[Agent Order Details] Agent not found:", decoded.agentId)
      return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    const agentMongoId = agent._id.toString()
    console.log("[Agent Order Details] Agent MongoDB _id:", agentMongoId)

    const agentOrdersCol = await getCollection("agentorders")
    const ordersCol = await getCollection("orders")

    console.log("[Agent Order Details] Querying for agent order with _id:", orderId)

    const agentOrder = await agentOrdersCol.findOne({ _id: new ObjectId(orderId) })

    console.log("[Agent Order Details] Agent order result:", agentOrder ? "Found" : "Not found")

    if (!agentOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const agentIdFromOrder = agentOrder.agentId.toString()

    console.log(
      "[Agent Order Details] Comparing agentId from order:",
      agentIdFromOrder,
      "with agent MongoDB _id:",
      agentMongoId,
    )

    if (agentIdFromOrder !== agentMongoId) {
      console.log("[Agent Order Details] Authorization failed - IDs don't match")
      return NextResponse.json({ error: "Unauthorized - This order does not belong to you" }, { status: 403 })
    }

    console.log("[Agent Order Details] Authorization passed")

    console.log("[Agent Order Details] Looking up main order with _id:", agentOrder.orderId)
    const fullOrder = await ordersCol.findOne({ _id: new ObjectId(agentOrder.orderId) })
    console.log("[Agent Order Details] Full order found:", fullOrder ? "YES" : "NO")

    if (fullOrder) {
      console.log("[Agent Order Details] Full order eSIM data:", {
        iccid: fullOrder.iccid || "missing",
        qrUrl: fullOrder.qrUrl || "missing",
        activationCode: fullOrder.esimData?.ac || "missing",
        status: fullOrder.status,
      })
    }

    const orderDetails = {
      ...agentOrder,
      esimDetails: fullOrder
        ? {
            iccid: fullOrder.iccid,
            qrCodeUrl: fullOrder.qrUrl,
            activationCode: fullOrder.esimData?.ac,
            smdpAddress: fullOrder.esimData?.smdpStatus,
            status: fullOrder.status,
            esimData: fullOrder.esimData,
          }
        : null,
    }

    console.log("[Agent Order Details] Order details prepared successfully")

    return NextResponse.json({ success: true, order: orderDetails })
  } catch (error) {
    console.error("[Agent Order Details] Error:", error)
    return NextResponse.json({ error: "Failed to fetch order details", details: error.message }, { status: 500 })
  }
}
