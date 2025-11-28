import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { Agent } from "@/lib/models/agent"
import { AgentWallet } from "@/lib/models/agent-wallet"
import { LedgerEntry } from "@/lib/models/ledger-entry"

export async function GET(request) {
  try {
    console.log("[Agent Wallet] Fetching wallet")
    await connectDB()

    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")

    if (decoded.role !== "agent") {
      return NextResponse.json({ error: "Invalid agent token" }, { status: 403 })
    }

    const agent = await Agent.findById(decoded.id)
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    let wallet = await AgentWallet.findOne({ agentId: agent._id })
    if (!wallet) {
      wallet = new AgentWallet({
        agentId: agent._id,
        balance: 0,
        reserved: 0,
        currency: "USD",
      })
      await wallet.save()
    }

    const recentEntries = await LedgerEntry.find({ agentId: agent._id }).sort({ createdAt: -1 }).limit(20)

    console.log("[Agent Wallet] Wallet fetched successfully")

    return NextResponse.json({
      success: true,
      wallet: {
        balance: wallet.balance,
        reserved: wallet.reserved,
        available: wallet.balance - wallet.reserved,
        currency: wallet.currency,
        totalEarned: wallet.totalEarned,
        totalWithdrawn: wallet.totalWithdrawn,
      },
      recentTransactions: recentEntries,
    })
  } catch (error) {
    console.error("[Agent Wallet] Error:", error)
    return NextResponse.json({ error: "Failed to fetch wallet", details: error.message }, { status: 500 })
  }
}
