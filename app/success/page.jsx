"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { CheckCircle2, Download, Mail, Smartphone, Globe, Clock, Shield, Copy, Check } from "lucide-react"

export default function SuccessPage() {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour countdown

  // Mock order data
  const orderData = {
    orderId: "ESIM-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    email: "traveler@example.com",
    plan: {
      country: "United States",
      data: "10 GB",
      validity: "30 Days",
      price: "$45.00",
    },
    iccid: "8901260123456789012",
    activationCode: "LPA:1$activation.esim.example$CODE123456",
    qrCodeUrl: "/esim-qr-code-for-activation.jpg",
  }

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
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQR = () => {
    // Mock download - in production this would download the actual QR code
    alert("QR Code downloaded!")
  }

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

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Success Message */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-balance">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Your eSIM is ready to use. Follow the instructions below to activate your data plan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* QR Code Card */}
          <Card className="animate-in fade-in slide-in-from-left duration-700 delay-150">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Your eSIM QR Code
              </CardTitle>
              <CardDescription>Scan this code with your device to install the eSIM</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <img
                  src={orderData.qrCodeUrl || "/placeholder.svg"}
                  alt="eSIM QR Code"
                  className="w-full max-w-[300px] h-auto"
                />
              </div>

              {/* Download Button */}
              <Button onClick={downloadQR} className="w-full" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>

              {/* Timer */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Access expires in:</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600 font-mono">{formatTime(timeLeft)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  QR code also sent to your email for future reference
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Details Card */}
          <Card className="animate-in fade-in slide-in-from-right duration-700 delay-150">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Order #{orderData.orderId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Email Address</p>
                  <p className="text-sm text-muted-foreground">{orderData.email}</p>
                </div>
              </div>

              <Separator />

              {/* Plan Details */}
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Plan Details</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Country:</span>
                      <span className="font-medium">{orderData.plan.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="font-medium">{orderData.plan.data}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Validity:</span>
                      <span className="font-medium">{orderData.plan.validity}</span>
                    </div>
                    <div className="flex justify-between text-base pt-2 border-t">
                      <span className="font-medium">Total Paid:</span>
                      <span className="font-bold text-emerald-600">{orderData.plan.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* ICCID */}
              <div>
                <p className="font-medium mb-2">ICCID Number</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono">{orderData.iccid}</code>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(orderData.iccid)}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Activation Code */}
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
