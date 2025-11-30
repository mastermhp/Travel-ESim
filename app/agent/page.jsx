"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  ShoppingCart,
  Menu,
  X,
  BarChart3,
  Wallet,
  DollarSign,
  LogOut,
  Plus,
  LinkIcon,
  Eye,
  Settings,
  EyeOff,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table" // Import Table components

export default function AgentDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [agentData, setAgentData] = useState(null)
  const [wallet, setWallet] = useState(null)
  const [orders, setOrders] = useState([])
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNewSaleDialog, setShowNewSaleDialog] = useState(false)
  const [showSettlementDialog, setShowSettlementDialog] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [saleForm, setSaleForm] = useState({
    planId: "",
    customerEmail: "",
    customerPhone: "",
    paymentType: "cash",
  })
  const [settlementForm, setSettlementForm] = useState({
    amount: "",
    method: "bank_transfer",
    notes: "",
  })
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetailsDialog, setShowOrderDetailsDialog] = useState(false)
  const [pollingOrderId, setPollingOrderId] = useState(null)

  // Define showRequestSettlementDialog state
  const [showRequestSettlementDialog, setShowRequestSettlementDialog] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const tabParam = urlParams.get("tab")
      if (tabParam) {
        setSelectedTab(tabParam)
      }
    }
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem("agentToken")
    const storedAgent = localStorage.getItem("agentData")

    if (!token || !storedAgent) {
      console.log("[v0] No agent token found, redirecting to login")
      router.push("/agent/login")
      return
    }

    try {
      const agent = JSON.parse(storedAgent)
      setAgentData(agent)

      const statusRes = await fetch("/api/v1/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (statusRes.ok) {
        const statusData = await statusRes.json()
        if (statusData.agent.requirePasswordChange) {
          setSelectedTab("settings")
          toast({
            title: "Password Change Required",
            description: "Please change your temporary password in the settings below",
            duration: 6000,
          })
        }
      }

      await fetchDashboardData(token, agent.agentId)
    } catch (error) {
      console.error("[v0] Auth error:", error)
      router.push("/agent/login")
    }
  }

  const fetchDashboardData = async (token, agentId) => {
    try {
      console.log("[v0] Fetching dashboard data for agent:", agentId)

      // Fetch wallet data
      const walletRes = await fetch(`/api/v1/agent/wallet`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (walletRes.ok) {
        const walletData = await walletRes.json()
        console.log("[v0] Wallet data:", walletData)
        setWallet(walletData.wallet)
      }

      // Fetch agent orders
      const ordersRes = await fetch(`/api/v1/agent/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        console.log("[v0] Orders data:", ordersData)
        setOrders(ordersData.orders || [])
      }

      // Fetch available plans
      const plansRes = await fetch("/api/v1/plans")
      if (plansRes.ok) {
        const plansData = await plansRes.json()
        console.log("[v0] Plans data:", plansData)
        setPlans(plansData.plans || [])
      }

      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching dashboard data:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data",
      })
      setLoading(false)
    }
  }

  // Function to fetch agent data (useful for refreshing after password change)
  const fetchAgentData = async () => {
    const token = localStorage.getItem("agentToken")
    if (!token) {
      router.push("/agent/login")
      return
    }
    try {
      const res = await fetch("/api/v1/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setAgentData(data.agent)
      } else {
        throw new Error("Failed to fetch agent profile")
      }
    } catch (error) {
      console.error("Error fetching agent data:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not refresh agent data.",
      })
    }
  }

  const pollForEsimDetails = async (agentOrderId, token) => {
    let attempts = 0
    const maxAttempts = 30 // Poll for up to 30 seconds

    const checkOrder = async () => {
      try {
        const res = await fetch(`/api/v1/agent/orders/${agentOrderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        console.log(`[v0] Polling response status: ${res.status}`)

        if (!res.ok) {
          console.log("[v0] Polling response not OK")
          return false
        }

        const data = await res.json()
        console.log("[v0] Polling response data:", JSON.stringify(data, null, 2))

        if (data.order?.esimDetails?.iccid) {
          console.log("[v0] eSIM provisioned! Showing details...")
          setSelectedOrder(data.order)
          setShowOrderDetailsDialog(true)
          setPollingOrderId(null)

          toast({
            title: "eSIM Activated!",
            description: "Customer activation details are now ready",
          })

          return true
        }

        console.log("[v0] eSIM details not ready yet:", {
          hasOrder: !!data.order,
          hasEsimDetails: !!data.order?.esimDetails,
          hasIccid: !!data.order?.esimDetails?.iccid,
        })

        return false
      } catch (error) {
        console.error("[v0] Polling error:", error)
        return false
      }
    }

    // Start polling
    const poll = setInterval(async () => {
      attempts++
      console.log(`[v0] Polling for eSIM details... attempt ${attempts}/${maxAttempts}`)

      const found = await checkOrder()

      if (found || attempts >= maxAttempts) {
        clearInterval(poll)
        if (attempts >= maxAttempts) {
          toast({
            title: "Provisioning in Progress",
            description: "eSIM details will be available shortly. Check order details later.",
          })
        }
      }
    }, 2000) // Check every 2 seconds
  }

  const handleNewSale = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("agentToken")

    try {
      console.log("[v0] Creating new sale:", saleForm)

      const endpoint = saleForm.paymentType === "cash" ? "/api/v1/agent/orders/cash" : "/api/v1/agent/orders/remote"

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(saleForm),
      })

      const data = await res.json()
      console.log("[v0] Sale response:", data)

      if (!res.ok) {
        throw new Error(data.error || "Failed to create sale")
      }

      toast({
        title: "Sale Created Successfully",
        description: saleForm.paymentType === "cash" ? "Provisioning eSIM now..." : "Payment link sent to customer",
      })

      if (data.paymentLink) {
        // Show payment link for remote sales
        toast({
          title: "Payment Link",
          description: data.paymentLink,
          duration: 10000,
        })
      }

      if (saleForm.paymentType === "cash" && data.agentOrderId) {
        console.log("[v0] Starting polling for order:", data.agentOrderId)
        toast({
          title: "Checking eSIM Status",
          description: "Waiting for activation details...",
          duration: 3000,
        })
        setPollingOrderId(data.agentOrderId)
        pollForEsimDetails(data.agentOrderId, token)
      }

      setShowNewSaleDialog(false)
      setSaleForm({ planId: "", customerEmail: "", customerPhone: "", paymentType: "cash" })

      // Refresh data
      await fetchDashboardData(token, agentData.agentId)
    } catch (error) {
      console.error("[v0] Sale error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    }
  }

  const handleSettlementRequest = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("agentToken")

    try {
      console.log("[v0] Requesting settlement:", settlementForm)

      const res = await fetch("/api/v1/agent/settlement/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number.parseFloat(settlementForm.amount),
          method: settlementForm.method,
          notes: settlementForm.notes,
        }),
      })

      const data = await res.json()
      console.log("[v0] Settlement response:", data)

      if (!res.ok) {
        throw new Error(data.error || "Failed to request settlement")
      }

      toast({
        title: "Settlement Requested",
        description: `Request for $${settlementForm.amount} submitted successfully`,
      })

      setShowSettlementDialog(false)
      setSettlementForm({ amount: "", method: "bank_transfer", notes: "" })

      // Refresh wallet data
      await fetchDashboardData(token, agentData.agentId)
    } catch (error) {
      console.error("[v0] Settlement error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    }
  }

  const handleViewOrderDetails = async (agentOrderId) => {
    try {
      const token = localStorage.getItem("agentToken")
      const res = await fetch(`/api/v1/agent/orders/${agentOrderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Failed to fetch order details")

      const data = await res.json()
      console.log("[v0] Order details received:", data)
      console.log("[v0] eSIM details:", data.order?.esimDetails)
      setSelectedOrder(data.order)
      setShowOrderDetailsDialog(true)
    } catch (error) {
      console.error("[v0] Error fetching order details:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load order details",
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("agentToken")
    localStorage.removeItem("agentData")
    router.push("/agent/login")
  }

  if (loading || !agentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Calculate stats from orders
  const todayOrders = orders.filter((o) => {
    const orderDate = new Date(o.createdAt)
    const today = new Date()
    return orderDate.toDateString() === today.toDateString()
  })

  const todayCommission = todayOrders.reduce((sum, o) => sum + (o.commissionAmount || 0), 0)
  const totalSales = orders.length
  const totalCommission = orders.reduce((sum, o) => sum + (o.commissionAmount || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Agent Portal
        </div>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:sticky top-0 left-0 h-screen w-88 bg-white border-r z-40 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <div className="p-6 border-b hidden lg:block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              TraveleSIM
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Agent Portal</p>
          </div>

          <div className="p-4 border-b bg-gradient-to-br from-emerald-50 to-blue-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {agentData.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "AG"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{agentData.name}</p>
                <p className="text-sm text-muted-foreground">ID: {agentData.agentId}</p>
              </div>
            </div>
            <Badge className="mt-3 w-full justify-center" variant="secondary">
              {agentData.commissionRate}% Commission
            </Badge>
          </div>

          <nav className="p-4 space-y-2">
            <Button
              variant={selectedTab === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab("dashboard")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={selectedTab === "sales" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab("sales")}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              My Sales
            </Button>
            <Button
              variant={selectedTab === "wallet" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab("wallet")}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Wallet
            </Button>
            <Button
              variant={selectedTab === "settings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab("settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white space-y-2">
            <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto lg:mt-0 mt-0 w-full">
          {/* Dashboard Tab */}
          {selectedTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Dashboard</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">Welcome back, {agentData.name}!</p>
                </div>
                <Button onClick={() => setShowNewSaleDialog(true)} size="lg" className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  New Sale
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-emerald-100">Today's Commission</CardDescription>
                    <CardTitle className="text-3xl">${todayCommission.toFixed(2)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{todayOrders.length} sales today</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Wallet Balance</CardDescription>
                    <CardTitle className="text-3xl">${wallet?.balance?.toFixed(2) || "0.00"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{wallet?.currency || "USD"}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Sales</CardDescription>
                    <CardTitle className="text-3xl">{totalSales}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">All time</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-blue-100">Total Earnings</CardDescription>
                    <CardTitle className="text-3xl">${totalCommission.toFixed(2)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Lifetime commission</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>Your latest transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No sales yet. Click "New Sale" to get started!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{order.customerEmail}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.planId} - {order.type}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-emerald-600">
                              +${order.commissionAmount?.toFixed(2) || "0.00"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Sales Tab */}
          {selectedTab === "sales" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">My Sales</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">View the history of your transactions</p>
                </div>
                <Button onClick={() => setShowNewSaleDialog(true)} size="lg" className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  New Sale
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Sales History</CardTitle>
                  <CardDescription className="text-sm">All your commission-earning transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="inline-block min-w-full align-middle">
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Commission</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No sales yet</p>
                              </TableCell>
                            </TableRow>
                          ) : (
                            orders.map((order) => (
                              <TableRow key={order._id}>
                                <TableCell>
                                  <p className="font-medium">{order.customerEmail}</p>
                                </TableCell>
                                <TableCell>
                                  <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{order.type}</Badge>
                                </TableCell>
                                <TableCell className="font-semibold text-emerald-600 text-lg">
                                  +${order.commissionAmount?.toFixed(2) || "0.00"}
                                </TableCell>
                                <TableCell>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(order.createdAt).toLocaleString()}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Button size="sm" variant="outline" onClick={() => handleViewOrderDetails(order._id)}>
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Wallet Tab */}
          {selectedTab === "wallet" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">Wallet</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">Manage your earnings and withdrawals</p>
                </div>
                <Button
                  onClick={() => setShowRequestSettlementDialog(true)}
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Request Payout
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
                  <CardHeader>
                    <CardDescription className="text-emerald-100">Available Balance</CardDescription>
                    <CardTitle className="text-4xl">${wallet?.balance?.toFixed(2) || "0.00"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Currency: {wallet?.currency || "USD"}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardDescription>Reserved Balance</CardDescription>
                    <CardTitle className="text-4xl">${wallet?.reserved?.toFixed(2) || "0.00"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Pending settlements</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Recent wallet activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">No transactions yet</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {selectedTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Settings</h2>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Change Password</CardTitle>
                  <CardDescription className="text-sm">
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const token = localStorage.getItem("agentToken")

                      // Validate passwords match
                      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                        toast({
                          variant: "destructive",
                          title: "Error",
                          description: "New passwords do not match",
                        })
                        return
                      }

                      // Validate password strength
                      if (passwordForm.newPassword.length < 8) {
                        toast({
                          variant: "destructive",
                          title: "Error",
                          description: "Password must be at least 8 characters long",
                        })
                        return
                      }

                      try {
                        const res = await fetch("/api/v1/agent/change-password", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            currentPassword: passwordForm.currentPassword,
                            newPassword: passwordForm.newPassword,
                          }),
                        })

                        const data = await res.json()

                        if (!res.ok) {
                          throw new Error(data.error || "Failed to change password")
                        }

                        toast({
                          title: "Success",
                          description: "Password changed successfully",
                        })

                        // Reset form
                        setPasswordForm({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        })

                        // Refresh agent data to clear requirePasswordChange flag
                        fetchAgentData()
                      } catch (error) {
                        toast({
                          variant: "destructive",
                          title: "Error",
                          description: error.message,
                        })
                      }
                    }}
                  >
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <div className="relative">
                        <Input
                          type={showPasswords.current ? "text" : "password"}
                          placeholder="Enter current password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <div className="relative">
                        <Input
                          type={showPasswords.new ? "text" : "password"}
                          placeholder="Enter new password (min 8 characters)"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          required
                          minLength={8}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          type={showPasswords.confirm ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {agentData?.requirePasswordChange && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-800 font-medium">
                          ⚠️ You must change your temporary password before continuing
                        </p>
                      </div>
                    )}

                    <Button type="submit" className="w-full">
                      Change Password
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Payout Details</CardTitle>
                  <CardDescription className="text-sm">Configure how you receive payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target)
                      const token = localStorage.getItem("agentToken")

                      try {
                        const res = await fetch("/api/v1/agent/payout-details", {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(Object.fromEntries(formData)),
                        })

                        if (!res.ok) throw new Error("Failed to update")

                        toast({
                          title: "Success",
                          description: "Payout details updated successfully",
                        })
                      } catch (error) {
                        toast({
                          variant: "destructive",
                          title: "Error",
                          description: "Failed to update payout details",
                        })
                      }
                    }}
                  >
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <Select name="method" defaultValue={agentData.payoutDetails?.method || "bank_transfer"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="mobile_money">Mobile Money</SelectItem>
                          <SelectItem value="stripe">Stripe</SelectItem>
                          <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2 sm:col-span-2">
                        <Label>Bank Name</Label>
                        <Input
                          name="bankName"
                          defaultValue={agentData.payoutDetails?.bankName}
                          placeholder="Your Bank Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Name</Label>
                        <Input
                          name="accountName"
                          defaultValue={agentData.payoutDetails?.accountName}
                          placeholder="Full Account Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <Input
                          name="accountNumber"
                          defaultValue={agentData.payoutDetails?.accountNumber}
                          placeholder="Account Number"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label>SWIFT/BIC Code (for international)</Label>
                        <Input
                          name="swiftCode"
                          defaultValue={agentData.payoutDetails?.swiftCode}
                          placeholder="SWIFT Code"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Save Payout Details
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* New Sale Dialog */}
      <Dialog open={showNewSaleDialog} onOpenChange={setShowNewSaleDialog}>
        <DialogContent className="max-w-md w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Sale</DialogTitle>
            <DialogDescription>Choose a plan and enter customer details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewSale} className="space-y-4">
            <div className="space-y-2">
              <Label>Select Plan</Label>
              <Select value={saleForm.planId} onValueChange={(value) => setSaleForm({ ...saleForm, planId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a plan" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan._id} value={plan._id}>
                      {plan.name} - ${plan.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Customer Email</Label>
              <Input
                type="email"
                placeholder="customer@example.com"
                value={saleForm.customerEmail}
                onChange={(e) => setSaleForm({ ...saleForm, customerEmail: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Customer Phone</Label>
              <Input
                type="tel"
                placeholder="+1234567890"
                value={saleForm.customerPhone}
                onChange={(e) => setSaleForm({ ...saleForm, customerPhone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Type</Label>
              <Select
                value={saleForm.paymentType}
                onValueChange={(value) => setSaleForm({ ...saleForm, paymentType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Cash Payment
                    </div>
                  </SelectItem>
                  <SelectItem value="remote">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      Remote Payment Link
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewSaleDialog(false)}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Create Sale
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Settlement Request Dialog */}
      <Dialog open={showSettlementDialog} onOpenChange={setShowSettlementDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Payout</DialogTitle>
            <DialogDescription>Available balance: ${wallet?.balance?.toFixed(2) || "0.00"}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSettlementRequest} className="space-y-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={settlementForm.amount}
                onChange={(e) => setSettlementForm({ ...settlementForm, amount: e.target.value })}
                max={wallet?.balance || 0}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select
                value={settlementForm.method}
                onValueChange={(value) => setSettlementForm({ ...settlementForm, method: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Input
                placeholder="Payment details or notes"
                value={settlementForm.notes}
                onChange={(e) => setSettlementForm({ ...settlementForm, notes: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSettlementDialog(false)}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Request Payout
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDetailsDialog} onOpenChange={setShowOrderDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>eSIM activation information for customer</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Email:</span> {selectedOrder.customerEmail}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Phone:</span> {selectedOrder.customerPhone}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Order ID:</span> {selectedOrder.orderId}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Date:</span>{" "}
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Commission</h4>
                  <p className="text-2xl font-bold text-emerald-600">
                    ${selectedOrder.commissionAmount?.toFixed(2) || "0.00"}
                  </p>
                  <Badge className="mt-2">{selectedOrder.type}</Badge>
                </div>
              </div>

              {selectedOrder.esimDetails && (
                <>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">eSIM Activation Details</h4>

                    {selectedOrder.esimDetails.qrCodeUrl && (
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg mb-4">
                        <img
                          src={selectedOrder.esimDetails.qrCodeUrl || "/placeholder.svg"}
                          alt="eSIM QR Code"
                          className="w-48 h-48 mb-2"
                        />
                        <p className="text-sm text-muted-foreground">Scan this QR code to activate eSIM</p>
                      </div>
                    )}

                    <div className="grid gap-3">
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-sm text-muted-foreground">ICCID</p>
                        <p className="font-mono font-medium">{selectedOrder.esimDetails.iccid || "N/A"}</p>
                      </div>

                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-sm text-muted-foreground">Activation Code</p>
                        <p className="font-mono text-sm">{selectedOrder.esimDetails.activationCode || "N/A"}</p>
                      </div>

                      {selectedOrder.esimDetails.smdpAddress && (
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-sm text-muted-foreground">SM-DP+ Address</p>
                          <p className="font-mono text-sm">{selectedOrder.esimDetails.smdpAddress}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-900 mb-2">Instructions for Customer:</h5>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Go to Settings → Cellular/Mobile Data</li>
                      <li>Tap "Add eSIM" or "Add Cellular Plan"</li>
                      <li>Scan the QR code or enter details manually</li>
                      <li>Follow on-screen instructions to complete setup</li>
                    </ol>
                  </div>
                </>
              )}

              {!selectedOrder.esimDetails && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>eSIM is being provisioned. Details will appear shortly.</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
