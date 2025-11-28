import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"

export async function DELETE(req, { params }) {
  try {
    const { orderId } = await params

    const ordersCol = await getCollection("orders")
    const agentOrdersCol = await getCollection("agentorders")

    // Delete both main order and agent order if exists
    await Promise.all([
      ordersCol.deleteOne({ _id: new ObjectId(orderId) }),
      agentOrdersCol.deleteMany({ orderId: new ObjectId(orderId) }),
    ])

    return NextResponse.json({ success: true, message: "Order deleted successfully" })
  } catch (error) {
    console.error("[Admin Order Delete] Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
