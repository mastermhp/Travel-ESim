import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import Stripe from "stripe"
import { connectDB } from "@/lib/db"
import { Agent } from "@/lib/models/agent"
import { Plan } from "@/lib/models/plan"
import Order from "@/lib/models/order"
import { AgentOrder } from "@/lib/models/agent-order"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    console.log("[Agent Remote Sale] Starting remote sale")
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

    console.log("[Agent Remote Sale] Agent:", agent.agentId)
    console.log("[Agent Remote Sale] Plan:", planId)
    console.log("[Agent Remote Sale] Customer:", customerEmail)

    const plan = await Plan.findById(planId)
    if (!plan || !plan.active) {
      return NextResponse.json({ error: "Plan not found or inactive" }, { status: 404 })
    }

    const commissionAmount = (plan.price * agent.commissionRate) / 100

    console.log("[Agent Remote Sale] Plan price:", plan.price, plan.currency)
    console.log("[Agent Remote Sale] Commission:", commissionAmount)

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
      paymentMethod: "card",
      paymentStatus: "unpaid",
      status: "pending",
      provisionStatus: "pending",
      purchaseSource: "agent",
      agentId: agent._id.toString(),
      supplierId: plan.supplierId,
      supplierCode: plan.supplierCode,
      fallbackSupplierId: plan.fallbackSupplierId,
      metadata: {
        customerName,
        agentName: agent.name,
        saleType: "remote",
      },
    })

    await order.save()
    console.log("[Agent Remote Sale] Order created:", orderId)

    const agentOrder = new AgentOrder({
      agentId: agent._id,
      orderId: order._id,
      customerEmail,
      customerPhone,
      planId: plan._id,
      type: "remote",
      paymentStatus: "pending",
      commissionAmount,
      commissionStatus: "pending",
      planPrice: plan.price,
      currency: plan.currency,
    })

    await agentOrder.save()

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price_data: {
            currency: plan.currency.toLowerCase(),
            product_data: {
              name: plan.name,
              description: `${plan.dataGB} GB - ${plan.validityDays} days - ${plan.country}`,
            },
            unit_amount: Math.round(plan.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: order.orderId,
        agentId: agent._id.toString(),
        agentOrderId: agentOrder._id.toString(),
        type: "agent_remote",
      },
      after_completion: {
        type: "redirect",
        redirect: {
          url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?orderid=${orderId}`,
        },
      },
    })

    console.log("[Agent Remote Sale] Payment link created:", paymentLink.url)

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      paymentLink: paymentLink.url,
      expectedCommission: commissionAmount,
      message: "Payment link generated. Share with customer.",
    })
  } catch (error) {
    console.error("[Agent Remote Sale] Error:", error)
    return NextResponse.json({ error: "Failed to create payment link", details: error.message }, { status: 500 })
  }
}
