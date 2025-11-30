import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { Agent } from "@/lib/models/agent"

export async function GET(request) {
  try {
    await connectDB()

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Find agent
    const agent = await Agent.findById(decoded.id).select("-password")
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      agent: {
        id: agent._id,
        agentId: agent.agentId,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        country: agent.country,
        countryCode: agent.countryCode,
        city: agent.city,
        businessType: agent.businessType,
        status: agent.status,
        commissionRate: agent.commissionRate,
        tier: agent.tier,
        totalSales: agent.totalSales,
        referralCode: agent.referralCode,
        requirePasswordChange: agent.requirePasswordChange || false,
        lastPasswordChange: agent.lastPasswordChange,
        createdAt: agent.createdAt,
        updatedAt: agent.updatedAt,
      },
    })
  } catch (error) {
    console.error("[Agent Profile] Error:", error)
    return NextResponse.json({ error: "Failed to fetch profile", details: error.message }, { status: 500 })
  }
}
