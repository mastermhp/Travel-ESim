import { NextResponse } from "next/server"
import { getCollection, connectDB } from "@/lib/db"
import { Agent } from "@/lib/models/agent"
import jwt from "jsonwebtoken"

export async function GET(req) {
  try {
    console.log("[Agent Orders] Starting request")

    // Verify agent token
    const token = req.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      console.log("[Agent Orders] No token provided")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
      console.log("[Agent Orders] Token verified for agent:", decoded.agentId)
    } catch (jwtError) {
      console.error("[Agent Orders] JWT verification failed:", jwtError.message)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    await connectDB()
    const agent = await Agent.findOne({ agentId: decoded.agentId })
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    console.log("[Agent Orders] Fetching orders for agent:", decoded.agentId, "(_id:", agent._id.toString() + ")")

    const agentOrdersCollection = await getCollection("agentorders")
    const orders = await agentOrdersCollection.find({ agentId: agent._id }).sort({ createdAt: -1 }).toArray()

    console.log("[Agent Orders] Found orders:", orders.length)

    return NextResponse.json({
      success: true,
      orders,
      count: orders.length,
    })
  } catch (error) {
    console.error("[Agent Orders] Error:", error.message)
    console.error("[Agent Orders] Stack:", error.stack)
    return NextResponse.json(
      {
        error: "Failed to fetch orders",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
