import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/lib/models/order"
import WebhookEvent from "@/lib/models/webhook-event"
import { constructWebhookEvent } from "@/lib/stripe"
import { queueManager, QUEUE_NAMES } from "@/lib/queue"

export async function POST(request) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      console.error("[Stripe Webhook] Missing stripe-signature header")
      return NextResponse.json({ success: false, error: "Missing signature" }, { status: 400 })
    }

    let event
    try {
      event = constructWebhookEvent(body, signature)
    } catch (err) {
      console.error("[Stripe Webhook] Signature verification failed:", err.message)
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }

    await connectDB()

    const existingEvent = await WebhookEvent.findOne({ eventId: event.id })
    if (existingEvent) {
      console.log("[Stripe Webhook] Event already processed:", event.id)
      return NextResponse.json({ success: true, message: "Event already processed" })
    }

    const webhookEventDoc = new WebhookEvent({
      source: "stripe",
      eventId: event.id,
      eventType: event.type,
      payload: event,
      processed: false,
    })
    await webhookEventDoc.save()

    console.log("[Stripe Webhook] Received event:", event.type, event.id)

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object
      const orderId = paymentIntent.metadata.orderId

      if (!orderId) {
        console.error("[Stripe Webhook] Missing orderId in metadata")
        webhookEventDoc.error = "Missing orderId in metadata"
        webhookEventDoc.processed = true
        await webhookEventDoc.save()
        return NextResponse.json({ success: false, error: "Missing orderId" }, { status: 400 })
      }

      const order = await Order.findOne({ orderId })
      if (!order) {
        console.error("[Stripe Webhook] Order not found:", orderId)
        webhookEventDoc.error = "Order not found"
        webhookEventDoc.processed = true
        await webhookEventDoc.save()
        return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
      }

      if (order.paymentStatus === "paid") {
        console.log("[Stripe Webhook] Order already marked as paid:", orderId)
        webhookEventDoc.processed = true
        await webhookEventDoc.save()
        return NextResponse.json({ success: true, message: "Order already paid" })
      }

      order.paymentStatus = "paid"
      order.status = "paid"
      await order.save()

      await queueManager.enqueue(QUEUE_NAMES.PROVISION_HIGH, {
        orderId: order.orderId,
        planId: order.planId,
        userId: order.userId,
        supplierId: order.supplierId,
        supplierCode: order.supplierCode,
        phoneNumber: order.phoneNumber,
        attempt: 0,
      })

      webhookEventDoc.processed = true
      webhookEventDoc.processedAt = new Date()
      await webhookEventDoc.save()

      console.log("[Stripe Webhook] Order marked as paid and provisioning enqueued:", orderId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Stripe Webhook] Error processing webhook:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
