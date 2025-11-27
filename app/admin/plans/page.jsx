"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RefreshCw, Loader2, CheckCircle, XCircle, Database, Package } from "lucide-react"

export default function AdminPlansPage() {
  const router = useRouter()
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState(null)
  const [stats, setStats] = useState({ total: 0, esimgo: 0, esimaccess: 0, custom: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
    fetchStats()
  }, [])

  async function checkAuth() {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    try {
      const response = await fetch("/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()

      if (!data.success || data.user.role !== "admin") {
        router.push("/")
      }
    } catch (error) {
      router.push("/admin/login")
    }
  }

  async function fetchStats() {
    try {
      setLoading(true)
      const response = await fetch("/api/v1/plans")
      const data = await response.json()

      if (data.success) {
        const plans = data.plans
        setStats({
          total: plans.length,
          esimgo: plans.filter((p) => p.provider === "esimgo").length,
          esimaccess: plans.filter((p) => p.provider === "esimaccess").length,
          custom: plans.filter((p) => p.isCustom).length,
        })
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  async function syncPlansFromProviders() {
    try {
      setSyncing(true)
      setSyncResult(null)
      const token = localStorage.getItem("token")

      const response = await fetch("/api/v1/plans/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        setSyncResult({
          success: true,
          message: `Successfully synced ${data.summary.total} plans!`,
          details: data.summary,
        })
        await fetchStats()
      } else {
        setSyncResult({
          success: false,
          message: `Sync failed: ${data.error}`,
        })
      }
    } catch (error) {
      console.error("Failed to sync plans:", error)
      setSyncResult({
        success: false,
        message: "Failed to sync plans from providers",
      })
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Admin - Plans Management</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Plans</p>
                    <p className="text-2xl font-bold">{loading ? "..." : stats.total}</p>
                  </div>
                  <Database className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">eSIM-Go</p>
                    <p className="text-2xl font-bold">{loading ? "..." : stats.esimgo}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">eSIM Access</p>
                    <p className="text-2xl font-bold">{loading ? "..." : stats.esimaccess}</p>
                  </div>
                  <Package className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Custom</p>
                    <p className="text-2xl font-bold">{loading ? "..." : stats.custom}</p>
                  </div>
                  <Package className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sync Section */}
          <Card>
            <CardHeader>
              <CardTitle>Sync Plans from Providers</CardTitle>
              <CardDescription>
                Import all available plans from eSIM-Go and eSIM Access providers into your database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={syncPlansFromProviders} disabled={syncing} className="w-full gap-2">
                {syncing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Syncing Plans...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Sync Plans from Both Providers
                  </>
                )}
              </Button>

              {syncResult && (
                <div
                  className={`flex items-start gap-3 p-4 rounded-lg ${
                    syncResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}
                >
                  {syncResult.success ? (
                    <CheckCircle className="h-5 w-5 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{syncResult.message}</p>
                    {syncResult.details && (
                      <div className="mt-2 space-y-1 text-sm">
                        <p>eSIM-Go: {syncResult.details.esimgo} plans</p>
                        <p>eSIM Access: {syncResult.details.esimaccess} plans</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">How it works:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Fetches all available packages from eSIM-Go API</li>
                  <li>Fetches all available packages from eSIM Access API</li>
                  <li>Imports them into your database alongside custom plans</li>
                  <li>Users can purchase any plan from the plans page</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
