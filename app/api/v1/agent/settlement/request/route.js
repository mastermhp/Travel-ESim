import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { Agent } from "@/lib/models/agent"
import { AgentWallet } from "@/lib/models/agent-wallet"
import { Settlement } from "@/lib/models/settlement"

export async function POST(request) {
  try {
    console.log("[Agent Settlement] Requesting settlement")
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
    if (!agent || agent.status !== "approved") {
      return NextResponse.json({ error: "Agent not approved" }, { status: 403 })
    }

    const { amount, method, paymentDetails, notes } = await request.json()

    const wallet = await AgentWallet.findOne({ agentId: agent._id })
    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 })
    }

    const availableBalance = wallet.balance - wallet.reserved

    if (amount > availableBalance) {
      return NextResponse.json({ error: "Insufficient balance", available: availableBalance }, { status: 400 })
    }

    if (amount < 10) {
      return NextResponse.json({ error: "Minimum settlement amount is $10" }, { status: 400 })
    }

    console.log("[Agent Settlement] Amount:", amount)
    console.log("[Agent Settlement] Method:", method)
    console.log("[Agent Settlement] Available balance:", availableBalance)

    const finalPaymentDetails = paymentDetails || {
      bankName: agent.payoutDetails?.bankName,
      accountNumber: agent.payoutDetails?.accountNumber,
      accountName: agent.payoutDetails?.accountName,
      swiftCode: agent.payoutDetails?.swiftCode,
      iban: agent.payoutDetails?.iban,
      mobileNumber: agent.payoutDetails?.mobileMoneyNumber,
      cryptoAddress: agent.payoutDetails?.cryptoAddress,
    }

    const settlement = new Settlement({
      agentId: agent._id,
      amount,
      currency: wallet.currency,
      status: "requested",
      method: method || agent.payoutDetails?.method || "bank_transfer",
      paymentDetails: finalPaymentDetails,
      notes,
    })

    await settlement.save()

    wallet.reserved += amount
    await wallet.save()

    console.log("[Agent Settlement] Settlement requested successfully")

    return NextResponse.json({
      success: true,
      settlement: {
        id: settlement._id,
        amount: settlement.amount,
        status: settlement.status,
        createdAt: settlement.createdAt,
      },
      message: "Settlement request submitted. Admin will review within 24-48 hours.",
    })
  } catch (error) {
    console.error("[Agent Settlement] Error:", error)
    return NextResponse.json({ error: "Failed to request settlement", details: error.message }, { status: 500 })
  }
}
