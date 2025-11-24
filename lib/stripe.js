import Stripe from "stripe"

let stripeInstance = null

export function getStripeClient() {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      console.warn("[Stripe] STRIPE_SECRET_KEY not found, Stripe features will not work")
      return null
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2024-11-20.acacia",
    })
  }
  return stripeInstance
}

export async function createPaymentIntent({ amount, currency = "usd", metadata = {} }) {
  const stripe = getStripeClient()
  if (!stripe) {
    throw new Error("Stripe is not configured")
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return paymentIntent
  } catch (error) {
    console.error("[Stripe] Error creating payment intent:", error)
    throw error
  }
}

export function constructWebhookEvent(body, signature) {
  const stripe = getStripeClient()
  if (!stripe) {
    throw new Error("Stripe is not configured")
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured")
  }

  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("[Stripe] Webhook signature verification failed:", error)
    throw error
  }
}
