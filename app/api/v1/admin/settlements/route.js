import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Settlement from "@/lib/models/settlement"
import AgentWallet from "@/lib/models/agent-wallet"
import LedgerEntry from "@/lib/models/ledger-entry"

// GET - Fetch all settlement requests
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") // pending, approved, completed, rejected

    console.log("[Admin] Fetching settlements with status:", status || "all")

    const filter = status ? { status } : {}
    const settlements = await Settlement.find(filter).populate("agentId").sort({ createdAt: -1 })

    console.log(`[Admin] Found ${settlements.length} settlements`)

    return NextResponse.json({ success: true, settlements })
  } catch (error) {
    console.error("[Admin] Error fetching settlements:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST - Approve or reject settlement
export async function POST(request) {
  try {
    await connectDB()

    const { settlementId, action, notes } = await request.json()

    console.log("[Admin] Processing settlement action:", { settlementId, action })

    const settlement = await Settlement.findById(settlementId).populate("agentId")
    if (!settlement) {
      return NextResponse.json({ success: false, error: "Settlement not found" }, { status: 404 })
    }

    if (action === "approve") {
      settlement.status = "approved"
      settlement.approvedAt = new Date()
      settlement.notes = notes || ""
      await settlement.save()

      console.log("[Admin] Settlement approved:", settlementId)
    } else if (action === "complete") {
      // Mark as completed and deduct from wallet
      const wallet = await AgentWallet.findOne({ agentId: settlement.agentId._id })
      if (!wallet) {
        return NextResponse.json({ success: false, error: "Wallet not found" }, { status: 404 })
      }

      if (wallet.reserved < settlement.amount) {
        return NextResponse.json({ success: false, error: "Insufficient reserved balance" }, { status: 400 })
      }

      wallet.reserved -= settlement.amount
      await wallet.save()

      settlement.status = "completed"
      settlement.completedAt = new Date()
      settlement.notes = notes || ""
      await settlement.save()

      // Create ledger entry
      await LedgerEntry.create({
        agentId: settlement.agentId._id,
        type: "withdrawal",
        amount: -settlement.amount,
        balanceAfter: wallet.balance,
        meta: { settlementId: settlement._id, method: settlement.method },
      })

      console.log("[Admin] Settlement completed and balance deducted:", settlementId)
    } else if (action === "reject") {
      // Reject and release reserved amount
      const wallet = await AgentWallet.findOne({ agentId: settlement.agentId._id })
      if (wallet && wallet.reserved >= settlement.amount) {
        wallet.reserved -= settlement.amount
        wallet.balance += settlement.amount
        await wallet.save()
      }

      settlement.status = "rejected"
      settlement.notes = notes || ""
      await settlement.save()

      console.log("[Admin] Settlement rejected and balance released:", settlementId)
    } else {
      return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({ success: true, settlement })
  } catch (error) {
    console.error("[Admin] Error processing settlement:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
