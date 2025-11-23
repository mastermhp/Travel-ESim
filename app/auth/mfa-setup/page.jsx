"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ShieldCheck, ArrowLeft } from "lucide-react"

export default function MFASetupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [secret, setSecret] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [step, setStep] = useState(1)

  useEffect(() => {
    setupTOTP()
  }, [])

  const setupTOTP = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("accessToken")

      const response = await fetch("/api/v1/auth/mfa/setup-totp", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.success) {
        setQrCode(data.qrCode)
        setSecret(data.secret)
        setStep(2)
      } else {
        toast({
          title: "Setup failed",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to setup MFA. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const verifyTOTP = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("accessToken")

      const response = await fetch("/api/v1/auth/mfa/verify-totp", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: verificationCode }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "MFA Enabled!",
          description: "Two-factor authentication has been successfully enabled",
        })
        router.push("/plans")
      } else {
        toast({
          title: "Verification failed",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Verification failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Card className="w-full max-w-lg relative z-10 border-2 shadow-2xl backdrop-blur-sm bg-card/95">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-4 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Enable Two-Factor Authentication</h1>
            <p className="text-muted-foreground">Add an extra layer of security to your account</p>
          </div>

          {step === 1 && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Step 1: Scan QR Code */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="font-semibold">Scan QR Code</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  Open your authenticator app (Google Authenticator, Authy, etc.) and scan this QR code
                </p>
                {qrCode && (
                  <div className="flex justify-center p-4 bg-white rounded-lg ml-10">
                    <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="w-48 h-48" />
                  </div>
                )}
              </div>

              {/* Manual entry */}
              <div className="space-y-2 ml-10">
                <p className="text-sm text-muted-foreground">{"Can't scan? Enter this code manually:"}</p>
                <div className="p-3 bg-muted rounded-md">
                  <code className="text-xs font-mono break-all">{secret}</code>
                </div>
              </div>

              {/* Step 2: Verify */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="font-semibold">Enter Verification Code</h3>
                </div>
                <form onSubmit={verifyTOTP} className="space-y-4 ml-10">
                  <div className="space-y-2">
                    <Label htmlFor="code">6-Digit Code</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="123456"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                      className="text-center text-2xl tracking-widest"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => router.back()}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Skip for now
                    </Button>
                    <Button type="submit" className="flex-1" disabled={loading || verificationCode.length !== 6}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 mr-2" />
                          Enable MFA
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
