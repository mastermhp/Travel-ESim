"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Smartphone, Shield, Lock, Check, ArrowLeft, Mail, User, Phone, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [email, setEmail] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Mock order data
  const orderData = {
    country: "United States",
    flag: "🇺🇸",
    plan: {
      data: "3 GB",
      duration: "15 Days",
      speed: "4G/5G",
      coverage: "99%",
    },
    price: 12.99,
    tax: 1.3,
    total: 14.29,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16">
        {/* Progress Bar */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  1
                </div>
                <span className="text-sm font-medium hidden sm:inline">Select Plan</span>
              </div>
              <div className="w-16 h-0.5 bg-primary" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <span className="text-sm font-medium hidden sm:inline">Checkout</span>
              </div>
              <div className="w-16 h-0.5 bg-border" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <span className="text-sm font-medium hidden sm:inline">Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link href="/plans">
              <Button variant="ghost" size="sm" className="mb-6 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Plans
              </Button>
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Information */}
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
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Your eSIM QR code will be sent to this email</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-10" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      {/* Credit Card */}
                      <label
                        htmlFor="card"
                        className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-secondary/50"
                        }`}
                      >
                        <RadioGroupItem value="card" id="card" className="mt-1" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Credit / Debit Card</span>
                            <div className="flex gap-1 ml-auto">
                              <img src="/placeholder.svg?height=24&width=36" alt="Visa" className="h-6" />
                              <img src="/placeholder.svg?height=24&width=36" alt="Mastercard" className="h-6" />
                              <img src="/placeholder.svg?height=24&width=36" alt="Amex" className="h-6" />
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">Secure payment via Stripe</p>
                        </div>
                      </label>

                      {/* Mobile Money */}
                      <label
                        htmlFor="mobile-money"
                        className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "mobile-money"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-secondary/50"
                        }`}
                      >
                        <RadioGroupItem value="mobile-money" id="mobile-money" className="mt-1" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Mobile Money</span>
                            <Badge variant="secondary" className="ml-auto">
                              Popular in Africa
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">M-Pesa, MTN Mobile Money, Airtel Money</p>
                        </div>
                      </label>
                    </RadioGroup>

                    {/* Card Payment Form */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="pr-12" />
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM / YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input id="cardName" placeholder="John Doe" />
                        </div>
                      </div>
                    )}

                    {/* Mobile Money Form */}
                    {paymentMethod === "mobile-money" && (
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div className="space-y-2">
                          <Label htmlFor="provider">Select Provider</Label>
                          <select
                            id="provider"
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          >
                            <option>M-Pesa (Kenya)</option>
                            <option>MTN Mobile Money (Uganda)</option>
                            <option>Airtel Money (Tanzania)</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber">Mobile Number</Label>
                          <Input id="mobileNumber" type="tel" placeholder="+254 712 345 678" />
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-900 dark:text-blue-100">
                            You will receive a payment prompt on your phone. Complete the payment to activate your eSIM.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-6 p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>256-bit SSL Encrypted</span>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-5 w-5 text-primary" />
                    <span>PCI DSS Compliant</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-2">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Plan Details */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                        <span className="text-3xl">{orderData.flag}</span>
                        <div className="flex-1">
                          <div className="font-semibold">{orderData.country}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {orderData.plan.data} • {orderData.plan.duration}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{orderData.plan.speed} Speed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{orderData.plan.coverage} Coverage</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>Instant Activation</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>No Contract</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Plan Price</span>
                        <span className="font-medium">${orderData.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span className="font-medium">${orderData.tax}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">${orderData.total}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked)}
                        className="mt-1"
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        I agree to the{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    {/* Complete Purchase Button */}
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg group"
                      disabled={!agreedToTerms || !email}
                    >
                      Complete Purchase
                      <Lock className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    </Button>

                    {/* Money Back Guarantee */}
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                      <Shield className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-900 dark:text-green-100">
                        <div className="font-semibold mb-1">30-Day Money-Back Guarantee</div>
                        <div className="text-xs opacity-90">If you are not satisfied, we will refund you in full.</div>
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
