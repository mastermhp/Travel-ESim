import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { Agent } from "@/lib/models/agent"
import { Plan } from "@/lib/models/plan"
import Order from "@/lib/models/order"
import { AgentOrder } from "@/lib/models/agent-order"
import { AgentWallet } from "@/lib/models/agent-wallet"
import { LedgerEntry } from "@/lib/models/ledger-entry"
import { queueManager, QUEUE_NAMES } from "@/lib/queue"

export async function POST(request) {
  try {
    console.log("[Agent Cash Sale] Starting cash sale")
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

    const { planId, customerEmail, customerPhone, customerName } = await request.json()

    console.log("[Agent Cash Sale] Agent:", agent.agentId)
    console.log("[Agent Cash Sale] Plan:", planId)
    console.log("[Agent Cash Sale] Customer:", customerEmail)

    const plan = await Plan.findById(planId)
    if (!plan || !plan.active) {
      return NextResponse.json({ error: "Plan not found or inactive" }, { status: 404 })
    }

    const commissionAmount = (plan.price * agent.commissionRate) / 100

    console.log("[Agent Cash Sale] Plan price:", plan.price, plan.currency)
    console.log("[Agent Cash Sale] Commission rate:", agent.commissionRate + "%")
    console.log("[Agent Cash Sale] Commission amount:", commissionAmount)

    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const clientRequestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const order = new Order({
      orderId,
      clientRequestId,
      userId: agent._id.toString(),
      userEmail: customerEmail,
      phoneNumber: customerPhone || agent.phone,
      planId: plan._id.toString(),
      amount: plan.price,
      currency: plan.currency,
      paymentMethod: "agent_cash",
      paymentStatus: "paid",
      status: "paid",
      provisionStatus: "pending",
      purchaseSource: "agent",
      agentId: agent._id.toString(),
      supplierId: plan.supplierId,
      supplierCode: plan.supplierCode,
      fallbackSupplierId: plan.fallbackSupplierId,
      metadata: {
        customerName,
        agentName: agent.name,
        saleType: "cash",
      },
    })

    await order.save()
    console.log("[Agent Cash Sale] Order created:", orderId)

    const agentOrder = new AgentOrder({
      agentId: agent._id,
      orderId: order._id,
      customerEmail,
      customerPhone,
      planId: plan._id,
      type: "cash",
      paymentStatus: "paid",
      commissionAmount,
      commissionStatus: "pending",
      planPrice: plan.price,
      currency: plan.currency,
    })

    await agentOrder.save()
    console.log("[Agent Cash Sale] Agent order created")

    let wallet = await AgentWallet.findOne({ agentId: agent._id })
    if (!wallet) {
      wallet = new AgentWallet({
        agentId: agent._id,
        balance: 0,
        reserved: 0,
        currency: plan.currency,
      })
    }

    wallet.balance += commissionAmount
    wallet.totalEarned += commissionAmount
    await wallet.save()

    console.log("[Agent Cash Sale] Wallet updated, new balance:", wallet.balance)

    const ledger = new LedgerEntry({
      agentId: agent._id,
      type: "commission",
      amount: commissionAmount,
      balanceAfter: wallet.balance,
      meta: {
        orderId: order._id,
        description: `Commission from cash sale - ${plan.name}`,
      },
    })

    await ledger.save()
    console.log("[Agent Cash Sale] Ledger entry created")

    await Agent.updateOne({ _id: agent._id }, { $inc: { totalSales: 1 } })
    console.log("[Agent Cash Sale] Total sales incremented")

    agentOrder.commissionStatus = "paid"
    await agentOrder.save()

    await queueManager.enqueue(QUEUE_NAMES.PROVISION_NORMAL, {
      orderId: order.orderId,
      planId: plan._id.toString(),
      userId: agent._id.toString(),
    })

    console.log("[Agent Cash Sale] Job enqueued for provisioning")
    console.log("[Agent Cash Sale] Sale completed successfully")

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      agentOrderId: agentOrder._id.toString(),
      commission: commissionAmount,
      newBalance: wallet.balance,
      message: "Sale recorded successfully. eSIM will be provisioned shortly.",
    })
  } catch (error) {
    console.error("[Agent Cash Sale] Error:", error)
    return NextResponse.json({ error: "Failed to process sale", details: error.message }, { status: 500 })
  }
}
