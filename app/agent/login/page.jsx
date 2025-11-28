"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock, Mail, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AgentLogin() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    console.log("[v0] Agent login attempt:", formData.email)

    try {
      const res = await fetch("/api/v1/agent/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      console.log("[v0] Login response:", data)

      if (!res.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Store agent token in localStorage
      localStorage.setItem("agentToken", data.token)
      localStorage.setItem("agentData", JSON.stringify(data.agent))

      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.agent.name}!`,
      })

      // Redirect to agent dashboard
      router.push("/agent")
    } catch (error) {
      console.error("[v0] Login error:", error)
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid email or password",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              TraveleSIM
            </h1>
            <p className="text-muted-foreground">Agent Portal</p>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Login to access your agent dashboard and track your earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="agent@example.com"
                    className="pl-9"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/agent/forgot-password" className="text-sm text-emerald-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-9"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Logging in..." : "Login to Dashboard"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-center text-muted-foreground">
                Not an agent yet?{" "}
                <Link href="/agent/register" className="text-emerald-600 font-medium hover:underline">
                  Register now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="pt-6">
            <p className="font-semibold mb-3">Agent Benefits:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2" />
                <span>Earn up to 15% commission on every sale</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2" />
                <span>Real-time tracking and instant payouts</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2" />
                <span>24/7 support and marketing materials</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to main website
          </Link>
        </div>
      </div>
    </div>
  )
}
