import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/lib/models/order"
import Plan from "@/lib/models/plan"
import { verifyToken } from "@/lib/auth"
import { createPaymentIntent } from "@/lib/stripe"

export async function POST(request) {
  try {
    await connectDB()

    const authHeader = request.headers.get("authorization")
    let userId = null
    let userEmail = null

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "")
      const decoded = verifyToken(token)
      if (decoded) {
        userId = decoded.userId
        userEmail = decoded.email
      }
    }

    const body = await request.json()
    const { clientRequestId, planId, phoneNumber, email, firstName, lastName, purchaseSource = "web" } = body

    if (!clientRequestId || !planId || !phoneNumber || !email) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const existingOrder = await Order.findOne({ clientRequestId })
    if (existingOrder) {
      console.log("[Orders] Returning existing order for clientRequestId:", clientRequestId)
      return NextResponse.json(
        {
          success: true,
          orderId: existingOrder.orderId,
          status: existingOrder.status,
          amount: existingOrder.amount,
          currency: existingOrder.currency,
          paymentIntentClientSecret: existingOrder.stripePaymentIntentClientSecret,
          message: "Order already exists",
        },
        { status: 200 },
      )
    }

    const plan = await Plan.findById(planId)
    if (!plan) {
      return NextResponse.json({ success: false, error: "Plan not found" }, { status: 404 })
    }

    if (!plan.active) {
      return NextResponse.json({ success: false, error: "Plan is not active" }, { status: 400 })
    }

    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    const paymentIntent = await createPaymentIntent({
      amount: plan.price,
      currency: plan.currency,
      metadata: {
        orderId,
        planId: plan._id.toString(),
        userId: userId || "guest",
        phoneNumber,
      },
    })

    const order = new Order({
      orderId,
      clientRequestId,
      userId: userId || "guest",
      userEmail: userEmail || email,
      planId: plan._id.toString(),
      phoneNumber,
      amount: plan.price,
      currency: plan.currency,
      paymentMethod: "card",
      paymentStatus: "unpaid",
      status: "pending",
      supplierId: plan.supplierId,
      supplierCode: plan.supplierCode,
      stripePaymentIntentId: paymentIntent.id,
      stripePaymentIntentClientSecret: paymentIntent.client_secret,
      purchaseSource,
      metadata: {
        planName: plan.name,
        dataGB: plan.dataGB,
        validityDays: plan.validityDays,
        customerName: `${firstName} ${lastName}`,
        customerEmail: email,
      },
    })

    await order.save()

    console.log("[Orders] Created new order:", orderId)

    return NextResponse.json(
      {
        success: true,
        orderId: order.orderId,
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        paymentIntentClientSecret: paymentIntent.client_secret,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[Orders] Error creating order:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (orderId) {
      const order = await Order.findOne({ orderId, userId: decoded.userId })
      if (!order) {
        return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
      }
      return NextResponse.json({ success: true, order })
    }

    const orders = await Order.find({ userId: decoded.userId }).sort({ createdAt: -1 }).limit(50)

    return NextResponse.json({ success: true, orders })
  } catch (error) {
    console.error("[Orders] Error fetching orders:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
