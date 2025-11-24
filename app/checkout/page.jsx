"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock, Check, ArrowLeft, Mail, User, Phone } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

function CheckoutForm({ plan, clientSecret, orderId }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    console.log("[v0] Starting payment confirmation...")
    setLoading(true)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success?orderId=${orderId}`,
        },
        redirect: "if_required",
      })

      if (error) {
        console.log("[v0] Payment error:", error)
        toast({ title: "Payment Failed", description: error.message, variant: "destructive" })
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("[v0] Payment succeeded! Redirecting to success page...")
        toast({ title: "Payment Successful!", description: "Redirecting to confirmation..." })
        setTimeout(() => {
          router.push(`/success?orderId=${orderId}`)
        }, 1000)
      }
    } catch (error) {
      console.log("[v0] Payment exception:", error)
      toast({ title: "Payment Error", description: "Something went wrong. Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 border border-border rounded-lg bg-background">
        <PaymentElement />
      </div>
      <Button type="submit" disabled={!stripe || loading} className="w-full h-12 text-base font-semibold">
        {loading ? (
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
        ) : (
          <Lock className="mr-2 h-5 w-5" />
        )}
        Complete Purchase
      </Button>
    </form>
  )
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get("plan")
  const [plan, setPlan] = useState(null)
  const [loadingPlan, setLoadingPlan] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [clientSecret, setClientSecret] = useState("")
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    console.log("[v0] Checking authentication...")
    const token = localStorage.getItem("accessToken")
    console.log("[v0] Token found:", !!token)

    if (!token) {
      console.log("[v0] No token, redirecting to login")
      toast({ title: "Authentication Required", description: "Please login to continue", variant: "destructive" })
      router.push(`/auth/login?redirect=${encodeURIComponent(`/checkout?plan=${planId}`)}`)
      return
    }

    const userEmail = localStorage.getItem("userEmail")
    const firstName = localStorage.getItem("firstName")
    const lastName = localStorage.getItem("lastName")
    const userPhone = localStorage.getItem("userPhone")

    console.log("[v0] User data loaded:", { userEmail, firstName, lastName, userPhone })

    if (userEmail) setEmail(userEmail)
    if (firstName) setFirstName(firstName)
    if (lastName) setLastName(lastName)
    if (userPhone) setPhone(userPhone)

    setIsAuthenticated(true)
    setIsAuthenticating(false)
    console.log("[v0] Authentication successful")
  }, [planId, router])

  useEffect(() => {
    if (planId && isAuthenticated) {
      setLoadingPlan(true)
      fetch(`/api/v1/plans/${planId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.success) setPlan(data.plan)
          else toast({ title: "Error", description: "Failed to load plan", variant: "destructive" })
        })
        .catch(() => toast({ title: "Error", description: "Failed to load plan", variant: "destructive" }))
        .finally(() => setLoadingPlan(false))
    }
  }, [planId, isAuthenticated])

  const handleProceedToPayment = async () => {
    if (!agreeToTerms) {
      toast({ title: "Terms Required", description: "Please agree to terms", variant: "destructive" })
      return
    }
    if (!email || !phone || !firstName || !lastName) {
      toast({ title: "Required Fields", description: "Please fill all fields", variant: "destructive" })
      return
    }

    console.log("[v0] Creating order...")

    try {
      const orderResponse = await fetch("/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        body: JSON.stringify({
          clientRequestId: crypto.randomUUID(),
          planId: plan._id,
          phoneNumber: phone,
          email,
          firstName,
          lastName,
          purchaseSource: "web",
        }),
      })
      const orderData = await orderResponse.json()

      console.log("[v0] Order response:", orderData)

      if (!orderData.success) throw new Error(orderData.error || "Failed to create order")

      setClientSecret(orderData.paymentIntentClientSecret)
      setOrderId(orderData.orderId)
      toast({ title: "Order Created", description: "Complete your payment below" })
    } catch (error) {
      console.log("[v0] Order creation error:", error)
      toast({ title: "Order Creation Failed", description: error.message, variant: "destructive" })
    }
  }

  if (isAuthenticating || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Verifying authentication...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (loadingPlan || !plan) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading checkout...</p>
          </div>
        </main>
      </div>
    )
  }

  const tax = plan.price * 0.1
  const total = plan.price + tax

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      <main className="pt-20 pb-16">
        <div className="bg-secondary/30 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  1
                </div>
                <span className="text-sm font-medium hidden sm:inline">Select Plan</span>
              </div>
              <div className="w-16 h-0.5 bg-primary"></div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <span className="text-sm font-medium hidden sm:inline">Checkout</span>
              </div>
              <div className="w-16 h-0.5 bg-border"></div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <span className="text-sm font-medium hidden sm:inline">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <Link href="/plans">
              <Button variant="ghost" size="sm" className="mb-6 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Plans
              </Button>
            </Link>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Your eSIM QR code will be sent to this email</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!clientSecret ? (
                      <>
                        <div className="flex items-center justify-between p-4 border-2 border-primary rounded-lg bg-primary/5">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-6 w-6 text-primary" />
                            <div>
                              <div className="font-semibold">Credit / Debit Card</div>
                              <p className="text-sm text-muted-foreground">Secure payment via Stripe</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} />
                          <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                        <Button
                          onClick={handleProceedToPayment}
                          disabled={!agreeToTerms}
                          className="w-full h-12 text-base font-semibold"
                        >
                          Proceed to Payment
                          <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-green-900 dark:text-green-100">
                            Order created! Complete payment below.
                          </p>
                        </div>
                        <Elements
                          stripe={stripePromise}
                          options={{
                            clientSecret: clientSecret,
                            appearance: { theme: "stripe", variables: { colorPrimary: "#0ea5e9" } },
                          }}
                        >
                          <CheckoutForm plan={plan} clientSecret={clientSecret} orderId={orderId} />
                        </Elements>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-2">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                        <span className="text-3xl">🌍</span>
                        <div className="flex-1">
                          <div className="font-semibold">{plan.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {plan.dataGB} GB • {plan.validityDays} Days
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Plan Price</span>
                        <span className="font-medium">
                          ${plan.price.toFixed(2)} {plan.currency}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          ${total.toFixed(2)} {plan.currency}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
