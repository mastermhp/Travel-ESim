import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"

// Block/Unblock agent
export async function PATCH(req, { params }) {
  try {
    const { agentId } = await params
    const { action } = await req.json() // action: "block" or "unblock"

    const agentsCol = await getCollection("agents")

    const result = await agentsCol.updateOne(
      { _id: new ObjectId(agentId) },
      { $set: { isBlocked: action === "block" } },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Agent not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: `Agent ${action}ed successfully` })
  } catch (error) {
    console.error("[Admin Agent Action] Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// Delete agent
export async function DELETE(req, { params }) {
  try {
    const { agentId } = await params

    const agentsCol = await getCollection("agents")
    const walletsCol = await getCollection("agentwallets")
    const ordersCol = await getCollection("agentorders")

    // Delete agent, wallet, and orders
    await Promise.all([
      agentsCol.deleteOne({ _id: new ObjectId(agentId) }),
      walletsCol.deleteOne({ agentId: new ObjectId(agentId) }),
      ordersCol.deleteMany({ agentId: new ObjectId(agentId) }),
    ])

    return NextResponse.json({ success: true, message: "Agent deleted successfully" })
  } catch (error) {
    console.error("[Admin Agent Delete] Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
