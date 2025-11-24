"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  CheckCircle2,
  Download,
  Mail,
  Smartphone,
  Globe,
  Clock,
  Shield,
  Copy,
  Check,
  Loader2,
  User,
  Phone,
  CreditCard,
  Calendar,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(3600)
  const [loading, setLoading] = useState(true)
  const [orderData, setOrderData] = useState(null)
  const [planData, setPlanData] = useState(null)
  const [userData, setUserData] = useState(null)
  const [pollingCount, setPollingCount] = useState(0)

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    const firstName = localStorage.getItem("firstName")
    const lastName = localStorage.getItem("lastName")
    const phone = localStorage.getItem("userPhone")

    if (email || firstName || lastName) {
      setUserData({
        email: email || "N/A",
        firstName: firstName || "",
        lastName: lastName || "",
        phone: phone || "",
      })
      console.log("[v0] User data loaded:", { email, firstName, lastName, phone })
    }
  }, [])

  useEffect(() => {
    if (!orderData || orderData.status !== "pending" || pollingCount >= 24) {
      return
    }

    const pollTimer = setTimeout(() => {
      console.log("[v0] Polling order status...")
      fetchOrderData(true)
      setPollingCount((prev) => prev + 1)
    }, 5000)

    return () => clearTimeout(pollTimer)
  }, [orderData, pollingCount])

  async function fetchOrderData(isPolling = false) {
    if (!orderId) {
      toast.error("Order ID missing")
      setLoading(false)
      return
    }

    try {
      const token = localStorage.getItem("accessToken")
      if (!token) {
        toast.error("Please login to view order")
        window.location.href = "/auth/login"
        return
      }

      console.log(`[v0] Fetching order: ${orderId}${isPolling ? " (polling)" : ""}`)

      const response = await fetch(`/api/v1/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        console.log("[v0] Order data:", data.order)
        setOrderData(data.order)

        // Fetch plan details
        const planResponse = await fetch(`/api/v1/plans/${data.order.planId}`)
        const planData = await planResponse.json()
        if (planData.success) {
          setPlanData(planData.plan)
        }

        // Reset polling count if order is no longer pending
        if (data.order.status !== "pending") {
          setPollingCount(24)
        }
      } else {
        if (!isPolling) {
          toast.error(data.error || "Failed to load order")
        }
      }
    } catch (error) {
      console.error("[Success Page] Error:", error)
      if (!isPolling) {
        toast.error("Failed to load order details")
      }
    } finally {
      if (!isPolling) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchOrderData()
  }, [orderId])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQR = () => {
    if (orderData?.qrUrl) {
      const link = document.createElement("a")
      link.href = orderData.qrUrl
      link.download = `esim-qr-${orderId}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success("QR Code downloaded!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading your eSIM details...</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Order Not Found</CardTitle>
            <CardDescription>We couldn't find your order details.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/plans">Browse Plans</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isProvisioning = orderData.status === "pending"
  const isPaid = orderData.status === "paid" || orderData.status === "completed"

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
          >
            TraveleSIM
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Success Message */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-balance">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {isProvisioning
              ? "Your eSIM is being provisioned. This usually takes 1-2 minutes."
              : "Your eSIM is ready to use. Follow the instructions below to activate your data plan."}
          </p>
        </div>

        {isProvisioning && (
          <Card className="mb-8 bg-blue-50 border-blue-200 animate-pulse">
            <CardContent className="py-6">
              <div className="flex items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-lg text-blue-900">Provisioning your eSIM...</p>
                  <p className="text-sm text-blue-700">
                    Please wait while we activate your data plan. This page will update automatically.
                  </p>
                </div>
                <Button variant="outline" onClick={() => fetchOrderData()} size="sm">
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* QR Code Card - Takes 2 columns */}
          <Card className="lg:col-span-2 animate-in fade-in slide-in-from-left duration-700 delay-150">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Your eSIM QR Code
              </CardTitle>
              <CardDescription>Scan this code with your device to install the eSIM</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[400px]">
                {orderData.qrUrl ? (
                  <img
                    src={orderData.qrUrl || "/placeholder.svg"}
                    alt="eSIM QR Code"
                    className="w-full max-w-[350px] h-auto"
                  />
                ) : (
                  <div className="text-center py-12">
                    <Loader2 className="w-16 h-16 animate-spin text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600 mb-2">Generating QR code...</p>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                      {isProvisioning
                        ? "Your eSIM is being provisioned with Twilio. This takes 1-2 minutes."
                        : "Preparing your QR code..."}
                    </p>
                  </div>
                )}
              </div>

              {/* Download Button */}
              <Button onClick={downloadQR} className="w-full" size="lg" disabled={!orderData.qrUrl}>
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>

              {/* Timer */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border-2 border-blue-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-lg">Access expires in:</span>
                  </div>
                  <span className="text-3xl font-bold text-blue-600 font-mono">{formatTime(timeLeft)}</span>
                </div>
                <p className="text-sm text-muted-foreground">QR code also sent to your email for future reference</p>
              </div>

              {(orderData.iccid || orderData.activationCode) && (
                <div className="space-y-4 pt-4 border-t">
                  {orderData.iccid && (
                    <div>
                      <p className="font-medium mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        ICCID Number
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono">{orderData.iccid}</code>
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(orderData.iccid)}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  )}

                  {orderData.activationCode && (
                    <div>
                      <p className="font-medium mb-2">Manual Activation Code</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-muted px-3 py-2 rounded text-xs font-mono break-all">
                          {orderData.activationCode}
                        </code>
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(orderData.activationCode)}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-right duration-700 delay-150">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription className="font-mono text-xs">#{orderData.orderId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg">
                    <User className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Name</p>
                      <p className="font-medium truncate">
                        {userData?.firstName && userData?.lastName
                          ? `${userData.firstName} ${userData.lastName}`
                          : orderData.customerName || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Email Address</p>
                      <p className="font-medium text-sm truncate">
                        {userData?.email || orderData.customerEmail || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Phone Number</p>
                      <p className="font-medium truncate">{userData?.phone || orderData.phoneNumber || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  Plan Details
                </h3>
                {planData && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium">Country</span>
                      </div>
                      <Badge variant="secondary" className="font-semibold">
                        {planData.country}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Data</p>
                        <p className="text-xl font-bold text-emerald-600">{planData.dataGB} GB</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Validity</p>
                        <p className="text-xl font-bold text-blue-600">{planData.validityDays} Days</p>
                      </div>
                    </div>

                    {planData.features && planData.features.length > 0 && (
                      <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-2">Features</p>
                        {planData.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  Payment Summary
                </h3>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan Price</span>
                    <span className="font-medium">
                      ${(orderData.amount * 0.9).toFixed(2)} {orderData.currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">
                      ${(orderData.amount * 0.1).toFixed(2)} {orderData.currency}
                    </span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center pt-3">
                  <span className="font-semibold text-lg">Total Paid</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ${orderData.amount} {orderData.currency}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(orderData.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Order Status</span>
                  <Badge
                    variant={isPaid ? "default" : "secondary"}
                    className={isPaid ? "bg-emerald-600" : "bg-yellow-500"}
                  >
                    {orderData.status === "pending" ? "Provisioning" : orderData.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Installation Instructions */}
        <Card className="mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <CardHeader>
            <CardTitle>Installation Instructions</CardTitle>
            <CardDescription>Follow these steps to activate your eSIM on your device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* iPhone Instructions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">iOS / iPhone</Badge>
                </div>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span>
                      Go to <strong>Settings</strong> → <strong>Cellular</strong> → <strong>Add eSIM</strong>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span>
                      Choose <strong>Use QR Code</strong>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span>Scan the QR code displayed above</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <span>Label your plan and set as default if needed</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      5
                    </span>
                    <span>
                      Turn on <strong>Data Roaming</strong> for the eSIM
                    </span>
                  </li>
                </ol>
              </div>

              {/* Android Instructions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">Android</Badge>
                </div>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span>
                      Go to <strong>Settings</strong> → <strong>Network & Internet</strong>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span>
                      Tap <strong>Mobile Network</strong> → <strong>Add Carrier</strong>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span>
                      Select <strong>Download a SIM instead</strong>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <span>Scan the QR code or enter activation code manually</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      5
                    </span>
                    <span>
                      Enable <strong>Roaming</strong> and select as active SIM
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support & FAQ */}
        <Card className="animate-in fade-in slide-in-from-bottom duration-700 delay-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                <Link href="/support">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Contact Support</span>
                  <span className="text-xs text-muted-foreground">24/7 Available</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                <Link href="/guides">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-medium">Video Guides</span>
                  <span className="text-xs text-muted-foreground">Step-by-step tutorials</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
                <Link href="/faq">
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">FAQs</span>
                  <span className="text-xs text-muted-foreground">Common questions</span>
                </Link>
              </Button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm font-medium text-amber-900 mb-2">Important Notes:</p>
              <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                <li>Your device must be eSIM compatible and carrier unlocked</li>
                <li>eSIM can only be installed once - download QR code for backup</li>
                <li>Data plan activates upon first connection to the network</li>
                <li>Keep your ICCID number for reference and support inquiries</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <Button size="lg" className="flex-1" asChild>
                <Link href="/plans">Buy Another eSIM</Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
