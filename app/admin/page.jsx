"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { CountrySelector } from "@/components/country-selector"
import { getCountryByCode } from "@/lib/countries-data"
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Globe,
  Settings,
  DollarSign,
  TrendingUp,
  Menu,
  X,
  Edit,
  Plus,
  Trash2,
  Save,
  Loader2,
  Check,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [authSettings, setAuthSettings] = useState(null)
  const [loadingSettings, setLoadingSettings] = useState(false)

  const [dashboardStats, setDashboardStats] = useState(null)
  const [dashboardCharts, setDashboardCharts] = useState(null)
  const [loadingDashboard, setLoadingDashboard] = useState(false)
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [ordersPagination, setOrdersPagination] = useState(null)
  const [ordersPage, setOrdersPage] = useState(1)
  const [ordersFilter, setOrdersFilter] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)

  const [adminEmail, setAdminEmail] = useState("")

  const [countries, setCountries] = useState([])
  const [plans, setPlans] = useState([])
  const [loadingCountries, setLoadingCountries] = useState(false)
  const [loadingPlans, setLoadingPlans] = useState(false)
  const [showCountryModal, setShowCountryModal] = useState(false)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [editingCountry, setEditingCountry] = useState(null)
  const [editingPlan, setEditingPlan] = useState(null)
  const [submitting, setSubmitting] = useState(false) // New state for loading indicator

  const [availablePackages, setAvailablePackages] = useState([])
  const [loadingPackages, setLoadingPackages] = useState(false)

  const [agents, setAgents] = useState([])
  const [loadingAgents, setLoadingAgents] = useState(false)
  const [agentFilter, setAgentFilter] = useState("pending")
  const [settlements, setSettlements] = useState([])
  const [loadingSettlements, setLoadingSettlements] = useState(false)
  const [settlementFilter, setSettlementFilter] = useState("pending") // Changed from "requested" to "pending" to match API
  const [agentTab, setAgentTab] = useState("applications")
  const [allAgents, setAllAgents] = useState([])
  const [loadingAllAgents, setLoadingAllAgents] = useState(false)
  const [showAgentDetailsModal, setShowAgentDetailsModal] = useState(false)
  const [selectedAgentDetails, setSelectedAgentDetails] = useState(null)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [approvalForm, setApprovalForm] = useState({ commissionRate: "5", currency: "USD" })

  // Fetch auth settings
  const fetchAuthSettings = async () => {
    setLoadingSettings(true)
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/v1/admin/auth-config", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setAuthSettings(data.config)
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to load settings", variant: "destructive" })
    } finally {
      setLoadingSettings(false)
    }
  }

  const fetchDashboardStats = async () => {
    setLoadingDashboard(true)
    try {
      const res = await fetch("/api/v1/admin/dashboard/stats")
      const data = await res.json()
      if (data.success) {
        setDashboardStats(data.stats)
        setDashboardCharts(data.charts)
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoadingDashboard(false)
    }
  }

  const fetchOrders = async () => {
    setLoadingOrders(true)
    try {
      const params = new URLSearchParams({
        page: ordersPage,
        limit: 50,
        ...(ordersFilter && { status: ordersFilter }),
      })
      const res = await fetch(`/api/v1/admin/orders?${params}`)
      const data = await res.json()
      if (data.success) {
        setOrders(data.orders)
        setOrdersPagination(data.pagination)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoadingOrders(false)
    }
  }

  const fetchAvailablePackages = async () => {
    setLoadingPackages(true)
    try {
      const response = await fetch("/api/v1/admin/packages/esimaccess")
      const data = await response.json()

      if (data.success) {
        setAvailablePackages(data.packages)
        toast({
          title: "Success",
          description: `Found ${data.count} available packages from eSIM Access`,
        })
      } else {
        toast({
          title: "Error",
          description: `Failed to fetch packages: ${data.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching packages:", error)
      toast({
        title: "Error",
        description: "Failed to fetch available packages",
        variant: "destructive",
      })
    } finally {
      setLoadingPackages(false)
    }
  }

  const fetchAllAgents = async () => {
    setLoadingAllAgents(true)
    try {
      const res = await fetch("/api/v1/admin/agents")
      const data = await res.json()
      if (data.success) {
        setAllAgents(data.agents)
      }
    } catch (error) {
      console.error("Error fetching all agents:", error)
    } finally {
      setLoadingAllAgents(false)
    }
  }

  const handleBlockAgent = async (agentId, action) => {
    try {
      const res = await fetch(`/api/v1/admin/agents/${agentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      const data = await res.json()
      if (data.success) {
        toast({ title: "Success", description: data.message })
        fetchAllAgents()
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update agent", variant: "destructive" })
    }
  }

  const handleDeleteAgent = async (agentId) => {
    if (!confirm("Are you sure you want to delete this agent? This will also delete their wallet and orders.")) return

    try {
      const res = await fetch(`/api/v1/admin/agents/${agentId}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        toast({ title: "Success", description: data.message })
        fetchAllAgents()
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete agent", variant: "destructive" })
    }
  }

  const handleDeleteOrder = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) return

    try {
      const res = await fetch(`/api/v1/admin/orders/${orderId}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        toast({ title: "Success", description: data.message })
        fetchOrders()
        setShowOrderModal(false)
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete order", variant: "destructive" })
    }
  }

  const [countryForm, setCountryForm] = useState({
    name: "",
    code: "",
    region: "",
    active: true,
    supported: true,
  })

  const [planForm, setPlanForm] = useState({
    country: "",
    countryCode: "",
    name: "",
    description: "",
    features: "",
    dataGB: "",
    validityDays: "",
    price: "",
    currency: "BDT",
    costPrice: "",
    supplierId: "esimaccess",
    supplierCode: "",
    fallbackSupplierId: "esimgo",
    isUnlimited: false,
    fairUseLimitGB: "",
    active: true,
  })

  const [countriesTab, setCountriesTab] = useState("countries")

  useEffect(() => {
    const email = localStorage.getItem("adminEmail")
    setAdminEmail(email || "Admin User")

    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
    }
  }, [router])

  const fetchCountries = async () => {
    setLoadingCountries(true)
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/v1/admin/country", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setCountries(data.countries)
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch countries", variant: "destructive" })
    } finally {
      setLoadingCountries(false)
    }
  }

  const fetchPlans = async () => {
    setLoadingPlans(true)
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/v1/admin/plan", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setPlans(data.plans)
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch plans", variant: "destructive" })
    } finally {
      setLoadingPlans(false)
    }
  }

  async function fetchAgents() {
    setLoadingAgents(true)
    try {
      const res = await fetch(`/api/v1/admin/agents?status=${agentFilter}`)
      const data = await res.json()
      if (data.success) {
        setAgents(data.agents)
      }
    } catch (error) {
      console.error("Error fetching agents:", error)
    } finally {
      setLoadingAgents(false)
    }
  }

  async function fetchSettlements() {
    setLoadingSettlements(true)
    try {
      const res = await fetch(`/api/v1/admin/settlements?status=${settlementFilter}`)
      const data = await res.json()
      if (data.success) {
        setSettlements(data.settlements)
      }
    } catch (error) {
      console.error("Error fetching settlements:", error)
    } finally {
      setLoadingSettlements(false)
    }
  }

  async function handleAgentAction(agentId, action) {
    try {
      const payload = { agentId, action }
      if (action === "approve") {
        payload.commissionRate = Number.parseFloat(approvalForm.commissionRate)
        payload.currency = approvalForm.currency
      }

      const res = await fetch("/api/v1/admin/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (data.success) {
        if (action === "approve" && data.tempPassword) {
          toast({
            title: "Agent Approved Successfully",
            description: `Temporary password: ${data.tempPassword}. Please send this to ${data.agent.email}`,
            duration: 10000,
          })
        } else {
          toast({
            title: action === "approve" ? "Agent Approved" : "Agent Rejected",
            description: `Successfully ${action}ed agent`,
          })
        }
        setShowApprovalModal(false)
        fetchAgents()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Error processing agent:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to process agent",
        variant: "destructive",
      })
    }
  }

  async function handleSettlementAction(settlementId, action, notes = "") {
    try {
      const res = await fetch("/api/v1/admin/settlements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settlementId, action, notes }),
      })

      const data = await res.json()
      if (data.success) {
        toast({
          title: "Settlement Updated",
          description: `Settlement ${action}ed successfully`,
        })
        fetchSettlements()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (selectedTab === "overview") {
      fetchDashboardStats()
    } else if (selectedTab === "orders") {
      fetchOrders()
    } else if (selectedTab === "agents") {
      if (agentTab === "applications") {
        fetchAgents()
      } else if (agentTab === "settlements") {
        fetchSettlements()
      } else if (agentTab === "all") {
        fetchAllAgents()
      }
    } else if (selectedTab === "countries") {
      fetchCountries()
      fetchPlans()
    } else if (selectedTab === "settings") {
      fetchAuthSettings()
    }
  }, [selectedTab, agentFilter, settlementFilter, agentTab, ordersPage, ordersFilter])

  const handleCountrySubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("adminToken")
      const method = editingCountry ? "PUT" : "POST"
      const body = editingCountry ? { id: editingCountry._id, ...countryForm } : countryForm

      const res = await fetch("/api/v1/admin/country", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (data.success) {
        toast({ title: "Success", description: data.message })
        setShowCountryModal(false)
        setEditingCountry(null)
        setCountryForm({ name: "", code: "", region: "", active: true, supported: true })
        fetchCountries()
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save country", variant: "destructive" })
    }
  }

  const handlePlanSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    console.log("[v0] Submitting plan form:", planForm)

    try {
      const token = localStorage.getItem("adminToken") // Changed from authToken to adminToken
      if (!token) {
        toast({ title: "Error", description: "Please log in to continue", variant: "destructive" })
        return
      }

      const payload = {
        country: planForm.countryCode, // Changed from planForm.country to planForm.countryCode
        name: planForm.name,
        description: planForm.description,
        features: planForm.features, // Added features to payload
        dataGB: planForm.dataGB,
        validityDays: planForm.validityDays,
        price: planForm.price,
        currency: planForm.currency,
        costPrice: planForm.costPrice,
        supplierId: planForm.supplierId, // Changed from planForm.supplierId to planForm.supplierId
        supplierCode: planForm.supplierCode, // Changed from planForm.supplierCode to planForm.supplierCode
        fallbackSupplierId: planForm.fallbackSupplierId, // Changed from planForm.fallbackSupplierId to planForm.fallbackSupplierId
        isUnlimited: planForm.isUnlimited,
        fairUseLimitGB: planForm.fairUseLimitGB,
        active: planForm.active,
        isCustomPlan: true, // Assuming this is a new field added based on context
      }

      console.log("[v0] Sending payload:", payload)

      const response = await fetch("/api/v1/admin/plan", {
        method: editingPlan ? "PUT" : "POST", // Handle both POST and PUT for editing
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      console.log("[v0] Response:", data)

      if (!response.ok) {
        throw new Error(data.error || "Failed to create plan")
      }

      toast({ title: "Success", description: data.message || "Plan saved successfully" }) // Use toast for success
      setShowPlanModal(false)
      setEditingPlan(null) // Clear editing state
      setPlanForm({
        // Reset form to default
        country: "",
        countryCode: "",
        name: "",
        description: "",
        features: "",
        dataGB: "",
        validityDays: "",
        price: "",
        currency: "BDT",
        costPrice: "",
        supplierId: "esimaccess",
        supplierCode: "",
        fallbackSupplierId: "esimgo",
        isUnlimited: false,
        fairUseLimitGB: "",
        active: true,
      })
      fetchPlans()
    } catch (error) {
      console.error("[v0] Error creating/updating plan:", error)
      toast({ title: "Error", description: error.message || "Failed to save plan", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteCountry = async (id) => {
    if (!confirm("Are you sure you want to delete this country?")) return

    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/v1/admin/country?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await res.json()
      if (data.success) {
        toast({ title: "Success", description: "Country deleted successfully" })
        fetchCountries()
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete country", variant: "destructive" })
    }
  }

  const handleDeletePlan = async (id) => {
    if (!confirm("Are you sure you want to delete this plan?")) return

    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/v1/admin/plan?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await res.json()
      if (data.success) {
        toast({ title: "Success", description: "Plan deleted successfully" })
        fetchPlans()
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete plan", variant: "destructive" })
    }
  }

  useEffect(() => {
    if (selectedTab === "settings") {
      fetchAuthSettings()
    }
  }, [selectedTab])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminEmail")
    router.push("/admin/login")
  }

  const updateAuthSetting = async (key, value) => {
    try {
      const token = localStorage.getItem("adminToken")
      const updatedSettings = { ...authSettings, [key]: value }
      setAuthSettings(updatedSettings)

      const res = await fetch("/api/v1/admin/auth-config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.JSON.stringify(updatedSettings),
      })

      const data = await res.json()
      if (data.success) {
        toast({ title: "Success", description: "Setting updated successfully" })
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
        fetchAuthSettings()
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update setting", variant: "destructive" })
      fetchAuthSettings()
    }
  }

  // Dummy stats data for overview, will be replaced by API data
  // const stats = dashboardStats
  //   ? [
  //       {
  //         title: "Total Revenue",
  //         value: `$${dashboardStats.revenue.value.toFixed(2)}`,
  //         change: `${dashboardStats.revenue.change > 0 ? "+" : ""}${dashboardStats.revenue.change}%`,
  //         icon: DollarSign,
  //       },
  //       {
  //         title: "Orders",
  //         value: dashboardStats.orders.value.toLocaleString(),
  //         change: `${dashboardStats.orders.change > 0 ? "+" : ""}${dashboardStats.orders.change}%`,
  //         icon: ShoppingCart,
  //       },
  //       {
  //         title: "Active Agents",
  //         value: dashboardStats.agents.value.toString(),
  //         change: `${dashboardStats.agents.change > 0 ? "+" : ""}${dashboardStats.agents.change}%`,
  //         icon: Users,
  //       },
  //       {
  //         title: "Countries",
  //         value: dashboardStats.countries.value.toString(),
  //         change: "Active",
  //         icon: Globe,
  //       },
  //     ]
  //   : []

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                {adminEmail ? adminEmail.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{adminEmail}</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            <Button
              variant={selectedTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab("overview")}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={selectedTab === "orders" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab("orders")}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </Button>
            <Button
              variant={selectedTab === "agents" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab("agents")}
            >
              <Users className="w-4 h-4 mr-2" />
              Agents
            </Button>
            <Button
              variant={selectedTab === "countries" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab("countries")}
            >
              <Globe className="w-4 h-4 mr-2" />
              Countries & Plans
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

          <div className="mt-auto p-4 border-t">
            <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <div className="w-10" />
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
                <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
              </div>

              {loadingDashboard ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${dashboardStats?.revenue?.value ? dashboardStats.revenue.value.toFixed(2) : "0.00"}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {dashboardStats?.revenue?.change || 0}% from last month
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dashboardStats?.orders?.value || 0}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {dashboardStats?.orders?.change || 0}% from last month
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                        <Users className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dashboardStats?.agents?.value || 0}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {dashboardStats?.agents?.change || 0}% from last month
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Countries</CardTitle>
                        <Globe className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dashboardStats?.countries?.value || 0}</div>
                        <p className="text-xs text-muted-foreground">Active from last month</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {dashboardCharts?.revenueByCountry && dashboardCharts.revenueByCountry.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Revenue by Country</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {dashboardCharts.revenueByCountry.map((item, idx) => {
                              const maxRevenue = dashboardCharts.revenueByCountry[0].revenue
                              const percentage = (item.revenue / maxRevenue) * 100
                              return (
                                <div key={idx} className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">{item._id}</span>
                                    <div className="flex items-center gap-3">
                                      <span className="text-muted-foreground">{item.count} orders</span>
                                      <span className="font-bold text-emerald-600">${item.revenue.toFixed(2)}</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div
                                      className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2.5 rounded-full transition-all duration-300"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {dashboardCharts?.ordersByStatus && dashboardCharts.ordersByStatus.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Orders by Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {dashboardCharts.ordersByStatus.map((item, idx) => {
                              const total = dashboardCharts.ordersByStatus.reduce((sum, s) => sum + s.count, 0)
                              const percentage = (item.count / total) * 100
                              return (
                                <div key={idx} className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="capitalize">
                                      {item._id}
                                    </Badge>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                                      <span className="font-bold">{item.count}</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {dashboardCharts?.monthlyRevenue && dashboardCharts.monthlyRevenue.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Revenue Trend (Last 6 Months)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {dashboardCharts.monthlyRevenue.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm font-medium">
                                {new Date(item._id.year, item._id.month - 1).toLocaleDateString("en-US", {
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">{item.orders} orders</span>
                                <span className="font-bold text-emerald-600">${item.revenue.toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {dashboardCharts?.topAgents && dashboardCharts.topAgents.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Performing Agents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {dashboardCharts.topAgents.map((agent, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                                  {idx + 1}
                                </div>
                                <div>
                                  <div className="font-medium">{agent.agentName || "Unknown Agent"}</div>
                                  <div className="text-sm text-muted-foreground">{agent.orders} orders</div>
                                </div>
                              </div>
                              <div className="font-bold text-emerald-600">${agent.revenue.toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          )}

          {selectedTab === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Orders Management</h2>
                  <p className="text-muted-foreground">View and manage all customer orders</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={ordersFilter === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOrdersFilter("")}
                >
                  All
                </Button>
                <Button
                  variant={ordersFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOrdersFilter("pending")}
                >
                  Pending
                </Button>
                <Button
                  variant={ordersFilter === "provisioned" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOrdersFilter("provisioned")}
                >
                  Provisioned
                </Button>
                <Button
                  variant={ordersFilter === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOrdersFilter("active")}
                >
                  Active
                </Button>
                <Button
                  variant={ordersFilter === "cancelled" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOrdersFilter("cancelled")}
                >
                  Cancelled
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  {loadingOrders ? (
                    <div className="text-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">No orders found</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b bg-gray-50">
                          <tr>
                            <th className="text-left py-3 px-4 font-medium text-sm">Order ID</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Customer</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Plan</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                            <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order._id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4 font-mono text-sm">{order.orderId}</td>
                              <td className="py-3 px-4">
                                <div className="text-sm">
                                  <div className="font-medium">{order.customerEmail || order.email || "N/A"}</div>
                                  <div className="text-muted-foreground">
                                    {order.customerPhone || order.phone || "N/A"}
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm">{order.plan?.name || "N/A"}</td>
                              <td className="py-3 px-4 font-semibold text-sm">
                                ${order.amount ? order.amount.toFixed(2) : "0.00"}
                              </td>
                              <td className="py-3 px-4">
                                <Badge
                                  variant={
                                    order.status === "completed"
                                      ? "default"
                                      : order.status === "provisioned"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedOrder(order)
                                      setShowOrderModal(true)
                                    }}
                                  >
                                    View Details
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => handleDeleteOrder(order._id)}>
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {ordersPagination && ordersPagination.pages > 1 && (
                    <div className="flex items-center justify-between border-t p-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {orders.length} of {ordersPagination.total} orders
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={ordersPage === 1}
                          onClick={() => setOrdersPage(ordersPage - 1)}
                        >
                          Previous
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={ordersPage === ordersPagination.pages}
                          onClick={() => setOrdersPage(ordersPage + 1)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Countries Tab */}
          {selectedTab === "countries" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Countries & Plans</h2>
                  <p className="text-muted-foreground">Manage available countries and data plans</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={fetchAvailablePackages} disabled={loadingPackages}>
                    {loadingPackages ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <Globe className="w-4 h-4 mr-2" />
                        Load Packages
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingCountry(null)
                      setCountryForm({ name: "", code: "", region: "", active: true, supported: true })
                      setShowCountryModal(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Country
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingPlan(null)
                      setPlanForm({
                        country: "",
                        countryCode: "",
                        name: "",
                        description: "",
                        features: "",
                        dataGB: "",
                        validityDays: "",
                        price: "",
                        currency: "BDT",
                        costPrice: "",
                        supplierId: "esimaccess",
                        supplierCode: "",
                        fallbackSupplierId: "esimgo",
                        isUnlimited: false,
                        fairUseLimitGB: "",
                        active: true,
                      })
                      setShowPlanModal(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Plan
                  </Button>
                </div>
              </div>

              {availablePackages.length > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Available eSIM Access Packages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {availablePackages.map((pkg, idx) => (
                        <div key={idx} className="bg-white p-3 rounded border flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-blue-600">{pkg.code}</span>
                              <Badge variant="outline">{pkg.country}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {pkg.name} - {pkg.data} - {pkg.validity} days - ${pkg.price}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              setPlanForm((prev) => ({
                                ...prev,
                                supplierCode: pkg.code,
                                countryCode: pkg.country,
                                name: pkg.name,
                                dataGB: pkg.data,
                                validityDays: pkg.validity,
                                costPrice: pkg.price,
                              }))
                              setShowPlanModal(true)
                            }}
                          >
                            Use
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <Tabs value={countriesTab} onValueChange={setCountriesTab}>
                    <TabsList>
                      <TabsTrigger value="countries">Countries ({countries.length})</TabsTrigger>
                      <TabsTrigger value="plans">Data Plans ({plans.length})</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  {countriesTab === "countries" && (
                    <div className="overflow-x-auto">
                      {loadingCountries ? (
                        <div className="text-center py-8">Loading countries...</div>
                      ) : countries.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No countries yet. Add your first country to get started.
                        </div>
                      ) : (
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Country</th>
                              <th className="text-left py-3 px-4 font-medium">Code</th>
                              <th className="text-left py-3 px-4 font-medium">Region</th>
                              <th className="text-left py-3 px-4 font-medium">Status</th>
                              <th className="text-right py-3 px-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {countries.map((country) => (
                              <tr key={country._id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">{country.name}</td>
                                <td className="py-3 px-4">{country.code}</td>
                                <td className="py-3 px-4">{country.region}</td>
                                <td className="py-3 px-4">
                                  <Badge variant={country.active ? "default" : "secondary"}>
                                    {country.active ? "Active" : "Inactive"}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        setEditingCountry(country)
                                        setCountryForm({
                                          name: country.name,
                                          code: country.code,
                                          region: country.region,
                                          active: country.active,
                                          supported: country.supported,
                                        })
                                        setShowCountryModal(true)
                                      }}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleDeleteCountry(country._id)}
                                    >
                                      <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}

                  {countriesTab === "plans" && (
                    <div className="overflow-x-auto">
                      {loadingPlans ? (
                        <div className="text-center py-8">Loading plans...</div>
                      ) : plans.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No data plans yet. Add your first plan to get started.
                        </div>
                      ) : (
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Plan Name</th>
                              <th className="text-left py-3 px-4 font-medium">Country</th>
                              <th className="text-left py-3 px-4 font-medium">Data</th>
                              <th className="text-left py-3 px-4 font-medium">Validity</th>
                              <th className="text-left py-3 px-4 font-medium">Provider</th>
                              <th className="text-left py-3 px-4 font-medium">Pricing</th>
                              <th className="text-left py-3 px-4 font-medium">Status</th>
                              <th className="text-right py-3 px-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {plans.map((plan) => {
                              const retailPrice = Number.parseFloat(plan.price) || 0
                              const costPrice = Number.parseFloat(plan.costPrice) || 0
                              const profit = retailPrice - costPrice
                              const margin = costPrice > 0 ? ((profit / retailPrice) * 100).toFixed(1) : 0

                              return (
                                <tr key={plan._id} className="border-b hover:bg-gray-50">
                                  <td className="py-3 px-4 font-medium">{plan.name}</td>
                                  <td className="py-3 px-4">{plan.country}</td>
                                  <td className="py-3 px-4">{plan.isUnlimited ? "Unlimited" : `${plan.dataGB} GB`}</td>
                                  <td className="py-3 px-4">{plan.validityDays} days</td>
                                  <td className="py-3 px-4">
                                    <Badge variant="outline">{plan.provider || "custom"}</Badge>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="text-sm">
                                      <div className="font-medium">${retailPrice}</div>
                                      {costPrice > 0 && (
                                        <div className="text-xs text-muted-foreground">
                                          Cost: ${costPrice} ({margin}% margin)
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <Badge variant={plan.active ? "default" : "secondary"}>
                                      {plan.active ? "Active" : "Inactive"}
                                    </Badge>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center justify-end gap-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          setEditingPlan(plan)
                                          setPlanForm({
                                            country: plan.country,
                                            countryCode: plan.country, // Assuming country field can be used for code here
                                            name: plan.name,
                                            description: plan.description || "",
                                            features: Array.isArray(plan.features)
                                              ? plan.features.join(", ")
                                              : plan.features || "", // Handle features as string
                                            dataGB: plan.dataGB,
                                            validityDays: plan.validityDays,
                                            price: plan.price,
                                            currency: plan.currency || "USD",
                                            costPrice: plan.costPrice || "",
                                            supplierId: plan.provider || "esimaccess", // Renamed from provider
                                            supplierCode: plan.supplierCode || plan.providerCode || "", // Renamed from providerCode
                                            fallbackSupplierId: planForm.fallbackSupplierId, // Keep default or fetch if available
                                            isUnlimited: plan.isUnlimited || false,
                                            fairUseLimitGB: plan.fairUseLimitGB || "",
                                            active: plan.active,
                                          })
                                          setShowPlanModal(true)
                                        }}
                                      >
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon" onClick={() => handleDeletePlan(plan._id)}>
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === "agents" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Agent Management</h2>
                <p className="text-muted-foreground">Manage agent applications, commissions, and settlements</p>
              </div>

              <Card>
                <CardHeader>
                  <Tabs value={agentTab} onValueChange={setAgentTab}>
                    <TabsList>
                      <TabsTrigger value="applications">Applications ({agents.length})</TabsTrigger>
                      <TabsTrigger value="all">All Agents ({allAgents.length})</TabsTrigger>
                      <TabsTrigger value="settlements">Settlements ({settlements.length})</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  {agentTab === "all" && (
                    <div className="space-y-4">
                      {loadingAllAgents ? (
                        <div className="text-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        </div>
                      ) : allAgents.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No agents found</div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="border-b bg-gray-50">
                              <tr>
                                <th className="text-left py-3 px-4 font-medium text-sm">Agent ID</th>
                                <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                                <th className="text-left py-3 px-4 font-medium text-sm">Email</th>
                                <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-sm">Commission</th>
                                <th className="text-left py-3 px-4 font-medium text-sm">Balance</th>
                                <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allAgents.map((agent) => (
                                <tr key={agent._id} className="border-b hover:bg-gray-50">
                                  <td className="py-3 px-4 font-mono text-sm">{agent.agentId}</td>
                                  <td className="py-3 px-4 text-sm font-medium">{agent.name}</td>
                                  <td className="py-3 px-4 text-sm">{agent.email}</td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant={
                                          agent.status === "approved"
                                            ? "default"
                                            : agent.status === "pending"
                                              ? "secondary"
                                              : "destructive"
                                        }
                                      >
                                        {agent.status}
                                      </Badge>
                                      {agent.isBlocked && <Badge variant="destructive">Blocked</Badge>}
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-sm">{agent.commissionRate}%</td>
                                  <td className="py-3 px-4 text-sm font-semibold text-emerald-600">
                                    ${agent.balance ? agent.balance.toFixed(2) : "0.00"}
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center justify-end gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setSelectedAgentDetails(agent)
                                          setShowAgentDetailsModal(true)
                                        }}
                                      >
                                        View Details
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant={agent.isBlocked ? "default" : "destructive"}
                                        onClick={() =>
                                          handleBlockAgent(agent._id, agent.isBlocked ? "unblock" : "block")
                                        }
                                      >
                                        {agent.isBlocked ? "Unblock" : "Block"}
                                      </Button>
                                      <Button size="sm" variant="ghost" onClick={() => handleDeleteAgent(agent._id)}>
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {agentTab === "applications" && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          variant={agentFilter === "pending" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAgentFilter("pending")}
                        >
                          Pending
                        </Button>
                        <Button
                          variant={agentFilter === "approved" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAgentFilter("approved")}
                        >
                          Approved
                        </Button>
                        <Button
                          variant={agentFilter === "rejected" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAgentFilter("rejected")}
                        >
                          Rejected
                        </Button>
                        <Button
                          variant={agentFilter === "" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAgentFilter("")}
                        >
                          All
                        </Button>
                      </div>

                      {loadingAgents ? (
                        <div className="text-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        </div>
                      ) : agents.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No {agentFilter} agents found</div>
                      ) : (
                        <div className="space-y-3">
                          {agents.map((agent) => (
                            <div key={agent._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                                    <Badge
                                      variant={
                                        agent.status === "approved"
                                          ? "default"
                                          : agent.status === "pending"
                                            ? "secondary"
                                            : "destructive"
                                      }
                                    >
                                      {agent.status}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                    <div>Email: {agent.email}</div>
                                    <div>Phone: {agent.phone}</div>
                                    <div>Country: {agent.country}</div>
                                    <div>Business: {agent.businessName}</div>
                                    {agent.commissionRate && <div>Commission: {agent.commissionRate}%</div>}
                                    {agent.currency && <div>Currency: {agent.currency}</div>}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-2">
                                    Applied: {new Date(agent.createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                                {agent.status === "pending" && (
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        setSelectedAgent(agent)
                                        setApprovalForm({ commissionRate: "5", currency: "USD" })
                                        setShowApprovalModal(true)
                                      }}
                                    >
                                      <Check className="w-4 h-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleAgentAction(agent._id, "reject")}
                                    >
                                      <X className="w-4 h-4 mr-1" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {agentTab === "settlements" && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          variant={settlementFilter === "pending" ? "default" : "outline"} // Changed from "requested" to "pending"
                          size="sm"
                          onClick={() => setSettlementFilter("pending")}
                        >
                          Pending
                        </Button>
                        <Button
                          variant={settlementFilter === "approved" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSettlementFilter("approved")}
                        >
                          Approved
                        </Button>
                        <Button
                          variant={settlementFilter === "completed" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSettlementFilter("completed")}
                        >
                          Completed
                        </Button>
                        <Button
                          variant={settlementFilter === "" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSettlementFilter("")}
                        >
                          All
                        </Button>
                      </div>

                      {loadingSettlements ? (
                        <div className="text-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        </div>
                      ) : settlements.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No {settlementFilter} settlements found
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {settlements.map((settlement) => (
                            <Card key={settlement._id}>
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {settlement.agentId?.name
                                          ?.split(" ")
                                          .map((n) => n[0])
                                          .join("") || "AG"}
                                      </div>
                                      <div>
                                        <p className="font-semibold">{settlement.agentId?.name}</p>
                                        <p className="text-sm text-muted-foreground">{settlement.agentId?.email}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-3">
                                      <div>
                                        <p className="text-sm text-muted-foreground">Amount</p>
                                        <p className="text-2xl font-bold text-emerald-600">
                                          ${settlement.amount?.toFixed(2)} {settlement.currency}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Method</p>
                                        <Badge variant="outline" className="capitalize">
                                          {settlement.method?.replace("_", " ")}
                                        </Badge>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <Badge
                                          variant={
                                            settlement.status === "completed"
                                              ? "default"
                                              : settlement.status === "approved"
                                                ? "secondary"
                                                : "outline"
                                          }
                                        >
                                          {settlement.status}
                                        </Badge>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Requested</p>
                                        <p className="text-sm">{new Date(settlement.createdAt).toLocaleDateString()}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {settlement.status === "pending" && ( // Changed from "requested" to "pending"
                                      <>
                                        <Button
                                          size="sm"
                                          onClick={() => handleSettlementAction(settlement._id, "approve")}
                                        >
                                          Approve
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() => handleSettlementAction(settlement._id, "reject")}
                                        >
                                          Reject
                                        </Button>
                                      </>
                                    )}
                                    {settlement.status === "approved" && (
                                      <Button
                                        size="sm"
                                        variant="default"
                                        onClick={() => handleSettlementAction(settlement._id, "complete")}
                                      >
                                        Complete Payout
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <h4 className="font-semibold mb-3 text-sm">Payout Details</h4>
                                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    {settlement.agentId?.payoutDetails?.bankName && (
                                      <div>
                                        <p className="text-muted-foreground">Bank Name</p>
                                        <p className="font-medium">{settlement.agentId.payoutDetails.bankName}</p>
                                      </div>
                                    )}
                                    {settlement.agentId?.payoutDetails?.accountName && (
                                      <div>
                                        <p className="text-muted-foreground">Account Name</p>
                                        <p className="font-medium">{settlement.agentId.payoutDetails.accountName}</p>
                                      </div>
                                    )}
                                    {settlement.agentId?.payoutDetails?.accountNumber && (
                                      <div>
                                        <p className="text-muted-foreground">Account Number</p>
                                        <p className="font-mono font-medium">
                                          {settlement.agentId.payoutDetails.accountNumber}
                                        </p>
                                      </div>
                                    )}
                                    {settlement.agentId?.payoutDetails?.swiftCode && (
                                      <div>
                                        <p className="text-muted-foreground">SWIFT Code</p>
                                        <p className="font-mono font-medium">
                                          {settlement.agentId.payoutDetails.swiftCode}
                                        </p>
                                      </div>
                                    )}
                                    {settlement.agentId?.payoutDetails?.iban && (
                                      <div>
                                        <p className="text-muted-foreground">IBAN</p>
                                        <p className="font-mono font-medium">{settlement.agentId.payoutDetails.iban}</p>
                                      </div>
                                    )}
                                    {settlement.notes && (
                                      <div className="md:col-span-2">
                                        <p className="text-muted-foreground">Agent Notes</p>
                                        <p className="font-medium">{settlement.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                  {!settlement.agentId?.payoutDetails?.accountNumber && (
                                    <div className="text-center text-muted-foreground py-2">
                                      No payout details provided by agent
                                    </div>
                                  )}
                                </div>
                                {settlement.adminNotes && (
                                  <div className="mt-3 p-3 bg-blue-50 rounded">
                                    <p className="text-sm font-semibold text-blue-900">Admin Notes</p>
                                    <p className="text-sm text-blue-800">{settlement.adminNotes}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {selectedTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Settings</h2>
                <p className="text-muted-foreground">Manage platform configuration and preferences</p>
              </div>

              {loadingSettings ? (
                <Card>
                  <CardContent className="py-8 text-center">Loading settings...</CardContent>
                </Card>
              ) : authSettings ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Authentication Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email & Password Login</Label>
                          <p className="text-sm text-muted-foreground">Allow users to login with email and password</p>
                        </div>
                        <Switch
                          checked={authSettings.enableEmailPassword}
                          onCheckedChange={(checked) => updateAuthSetting("enableEmailPassword", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Phone OTP Login</Label>
                          <p className="text-sm text-muted-foreground">Allow users to login with phone OTP</p>
                        </div>
                        <Switch
                          checked={authSettings.enablePhoneOtp}
                          onCheckedChange={(checked) => updateAuthSetting("enablePhoneOtp", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Google Login</Label>
                          <p className="text-sm text-muted-foreground">Enable Google OAuth authentication</p>
                        </div>
                        <Switch
                          checked={authSettings.enableSocialGoogle}
                          onCheckedChange={(checked) => updateAuthSetting("enableSocialGoogle", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Apple Login</Label>
                          <p className="text-sm text-muted-foreground">Enable Apple Sign In</p>
                        </div>
                        <Switch
                          checked={authSettings.enableSocialApple}
                          onCheckedChange={(checked) => updateAuthSetting("enableSocialApple", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Facebook Login</Label>
                          <p className="text-sm text-muted-foreground">Enable Facebook authentication</p>
                        </div>
                        <Switch
                          checked={authSettings.enableSocialFacebook}
                          onCheckedChange={(checked) => updateAuthSetting("enableSocialFacebook", checked)}
                        />
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <Label>Require MFA</Label>
                            <p className="text-sm text-muted-foreground">Make two-factor authentication mandatory</p>
                          </div>
                          <Switch
                            checked={authSettings.requireMFA}
                            onCheckedChange={(checked) => updateAuthSetting("requireMFA", checked)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Allowed MFA Methods</Label>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={authSettings.allowedMfaMethods.includes("totp")}
                                onCheckedChange={(checked) => {
                                  const methods = checked
                                    ? [...authSettings.allowedMfaMethods, "totp"]
                                    : authSettings.allowedMfaMethods.filter((m) => m !== "totp")
                                  updateAuthSetting("allowedMfaMethods", methods)
                                }}
                              />
                              <Label>TOTP (Authenticator App)</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={authSettings.allowedMfaMethods.includes("sms")}
                                onCheckedChange={(checked) => {
                                  const methods = checked
                                    ? [...authSettings.allowedMfaMethods, "sms"]
                                    : authSettings.allowedMfaMethods.filter((m) => m !== "sms")
                                  updateAuthSetting("allowedMfaMethods", methods)
                                }}
                              />
                              <Label>SMS</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={authSettings.allowedMfaMethods.includes("email")}
                                onCheckedChange={(checked) => {
                                  const methods = checked
                                    ? [...authSettings.allowedMfaMethods, "email"]
                                    : authSettings.allowedMfaMethods.filter((m) => m !== "email")
                                  updateAuthSetting("allowedMfaMethods", methods)
                                }}
                              />
                              <Label>Email</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          )}

          {/* Other tabs remain the same - Orders and Agents with mock data */}
        </div>
      </div>

      {/* Country Modal */}
      {showCountryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{editingCountry ? "Edit Country" : "Add Country"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCountrySubmit} className="space-y-4">
                <CountrySelector
                  value={countryForm.code}
                  onSelect={(country) => {
                    if (country) {
                      setCountryForm({
                        ...countryForm,
                        name: country.name,
                        code: country.code,
                        region: country.region,
                      })
                    }
                  }}
                />

                {countryForm.code && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{getCountryByCode(countryForm.code)?.flag}</span>
                      <div>
                        <div className="font-semibold text-lg">{countryForm.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {countryForm.code} • {countryForm.region}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Switch
                    checked={countryForm.active}
                    onCheckedChange={(checked) => setCountryForm({ ...countryForm, active: checked })}
                  />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={countryForm.supported}
                    onCheckedChange={(checked) => setCountryForm({ ...countryForm, supported: checked })}
                  />
                  <Label>Supported</Label>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCountryModal(false)
                      setEditingCountry(null)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-950 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">{editingPlan ? "Edit Plan" : "Add New Plan"}</h3>
              <form onSubmit={handlePlanSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="plan-name">Plan Name *</Label>
                    <Input
                      id="plan-name"
                      value={planForm.name}
                      onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                      placeholder="Kenya Travel Package"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="plan-description">Description</Label>
                    <textarea
                      id="plan-description"
                      className="w-full min-h-[80px] px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
                      value={planForm.description}
                      onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                      placeholder="Perfect for Kenya safari adventures"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="plan-country">Country *</Label>
                    <CountrySelector
                      value={planForm.countryCode} // Use countryCode for value
                      onSelect={(country) => {
                        if (country) {
                          setPlanForm({
                            ...planForm,
                            country: country.name,
                            countryCode: country.code, // Set countryCode here
                          })
                        }
                      }}
                    />
                    {planForm.countryCode && (
                      <div className="mt-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getCountryByCode(planForm.countryCode)?.flag}</span>
                          <span className="font-semibold">{planForm.country}</span>
                          <span className="text-sm text-muted-foreground">({planForm.countryCode})</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="plan-data">Data (GB) *</Label>
                    <Input
                      id="plan-data"
                      type="number"
                      step="0.1"
                      value={planForm.dataGB}
                      onChange={(e) => setPlanForm({ ...planForm, dataGB: e.target.value })}
                      placeholder="5"
                      required={!planForm.isUnlimited}
                      disabled={planForm.isUnlimited}
                    />
                  </div>

                  <div>
                    <Label htmlFor="plan-validity">Validity (Days) *</Label>
                    <Input
                      id="plan-validity"
                      type="number"
                      value={planForm.validityDays}
                      onChange={(e) => setPlanForm({ ...planForm, validityDays: e.target.value })}
                      placeholder="30"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="plan-currency">Currency *</Label>
                    <select
                      id="plan-currency"
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
                      value={planForm.currency}
                      onChange={(e) => setPlanForm({ ...planForm, currency: e.target.value })}
                      required
                    >
                      <option value="USD">USD</option>
                      <option value="BDT">BDT</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="plan-price">Retail Price * (Customer Pays)</Label>
                    <Input
                      id="plan-price"
                      type="number"
                      step="0.01"
                      value={planForm.price}
                      onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
                      placeholder="24.99"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="plan-cost">Cost Price (You Pay Provider)</Label>
                    <Input
                      id="plan-cost"
                      type="number"
                      step="0.01"
                      value={planForm.costPrice}
                      onChange={(e) => setPlanForm({ ...planForm, costPrice: e.target.value })}
                      placeholder="7.30"
                    />
                    {planForm.price && planForm.costPrice && (
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
                        Profit: $
                        {(Number.parseFloat(planForm.price) - Number.parseFloat(planForm.costPrice)).toFixed(2)} (
                        {(
                          ((Number.parseFloat(planForm.price) - Number.parseFloat(planForm.costPrice)) /
                            Number.parseFloat(planForm.price)) *
                          100
                        ).toFixed(1)}
                        % margin)
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="plan-provider">Primary Provider *</Label>
                    <select
                      id="plan-provider"
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
                      value={planForm.supplierId} // Use supplierId
                      onChange={(e) => setPlanForm({ ...planForm, supplierId: e.target.value })}
                      required
                    >
                      <option value="esimaccess">eSIM Access</option>
                      <option value="esimgo">eSIM-Go</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="plan-fallback">Fallback Provider</Label>
                    <select
                      id="plan-fallback"
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
                      value={planForm.fallbackSupplierId}
                      onChange={(e) => setPlanForm({ ...planForm, fallbackSupplierId: e.target.value })}
                    >
                      <option value="">None</option>
                      <option value="esimaccess">eSIM Access</option>
                      <option value="esimgo">eSIM-Go</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="plan-code">Provider Code * (e.g., KE_5GB_30 or CCKU491)</Label>
                    <Input
                      id="plan-code"
                      value={planForm.supplierCode} // Use supplierCode
                      onChange={(e) => setPlanForm({ ...planForm, supplierCode: e.target.value })}
                      placeholder="KE_5GB_30"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Get this packageCode from {planForm.supplierId === "esimaccess" ? "eSIM Access" : "eSIM-Go"}{" "}
                      portal
                    </p>
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="plan-features">Features (comma-separated)</Label>
                    <Input
                      id="plan-features"
                      value={planForm.features}
                      onChange={(e) => setPlanForm({ ...planForm, features: e.target.value })}
                      placeholder="4G LTE Speed, Instant Activation, 24/7 Support"
                    />
                  </div>

                  <div className="col-span-2 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="plan-unlimited"
                        checked={planForm.isUnlimited}
                        onCheckedChange={(checked) => setPlanForm({ ...planForm, isUnlimited: checked })}
                      />
                      <Label htmlFor="plan-unlimited">Unlimited Data</Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="plan-active"
                        checked={planForm.active}
                        onCheckedChange={(checked) => setPlanForm({ ...planForm, active: checked })}
                      />
                      <Label htmlFor="plan-active">Active</Label>
                    </div>
                  </div>

                  {planForm.isUnlimited && (
                    <div className="col-span-2">
                      <Label htmlFor="plan-fair-use">Fair Use Limit (GB)</Label>
                      <Input
                        id="plan-fair-use"
                        type="number"
                        step="0.1"
                        value={planForm.fairUseLimitGB}
                        onChange={(e) => setPlanForm({ ...planForm, fairUseLimitGB: e.target.value })}
                        placeholder="100"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-2 justify-end pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPlanModal(false)
                      setEditingPlan(null)
                      // Reset form on cancel to ensure clean state
                      setPlanForm({
                        country: "",
                        countryCode: "",
                        name: "",
                        description: "",
                        features: "",
                        dataGB: "",
                        validityDays: "",
                        price: "",
                        currency: "BDT",
                        costPrice: "",
                        supplierId: "esimaccess",
                        supplierCode: "",
                        fallbackSupplierId: "esimgo",
                        isUnlimited: false,
                        fairUseLimitGB: "",
                        active: true,
                      })
                    }}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editingPlan ? "Update Plan" : "Create Plan"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showAgentDetailsModal && selectedAgentDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold">Agent Details</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowAgentDetailsModal(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm text-muted-foreground">Agent ID</Label>
                  <p className="font-mono">{selectedAgentDetails.agentId}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedAgentDetails.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p>{selectedAgentDetails.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Phone</Label>
                  <p>{selectedAgentDetails.phone}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={selectedAgentDetails.status === "approved" ? "default" : "secondary"}>
                      {selectedAgentDetails.status}
                    </Badge>
                    {selectedAgentDetails.isBlocked && <Badge variant="destructive">Blocked</Badge>}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Commission Rate</Label>
                  <p className="font-bold">{selectedAgentDetails.commissionRate}%</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Financial Overview</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-emerald-600">
                        ${selectedAgentDetails.balance ? selectedAgentDetails.balance.toFixed(2) : "0.00"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Earned</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-blue-600">
                        ${selectedAgentDetails.totalEarned ? selectedAgentDetails.totalEarned.toFixed(2) : "0.00"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {selectedAgentDetails.businessName && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Business Information</h4>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-sm text-muted-foreground">Business Name</Label>
                      <p>{selectedAgentDetails.businessName}</p>
                    </div>
                    {selectedAgentDetails.businessAddress && (
                      <div>
                        <Label className="text-sm text-muted-foreground">Business Address</Label>
                        <p>{selectedAgentDetails.businessAddress}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <Label className="text-sm text-muted-foreground">Joined Date</Label>
                <p>{new Date(selectedAgentDetails.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAgentDetailsModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {showApprovalModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Approve Agent</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Agent Name</label>
                <input
                  type="text"
                  value={selectedAgent.name}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Commission Rate (%)</label>
                <input
                  type="number"
                  value={approvalForm.commissionRate}
                  onChange={(e) => setApprovalForm({ ...approvalForm, commissionRate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select
                  value={approvalForm.currency}
                  onChange={(e) => setApprovalForm({ ...approvalForm, currency: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="BDT">BDT</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleAgentAction(selectedAgent._id, "approve")} className="flex-1">
                  Approve Agent
                </Button>
                <Button variant="outline" onClick={() => setShowApprovalModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-start justify-between border-b">
              <div>
                <CardTitle>Order Details</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Order ID: {selectedOrder.orderId}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowOrderModal(false)}>
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{selectedOrder.customerEmail || selectedOrder.email || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <p className="font-medium">{selectedOrder.customerPhone || selectedOrder.phone || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div>
                <h3 className="font-semibold mb-3">Order Information</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Plan:</span>
                    <p className="font-medium">{selectedOrder.plan?.name || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <p className="font-medium text-emerald-600">
                      ${selectedOrder.amount ? selectedOrder.amount.toFixed(2) : "0.00"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline" className="ml-2">
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payment:</span>
                    <Badge variant="outline" className="ml-2">
                      {selectedOrder.paymentStatus}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Created:</span>
                    <p className="font-medium">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* eSIM Details */}
              {selectedOrder.iccid && (
                <div>
                  <h3 className="font-semibold mb-3">eSIM Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">ICCID:</span>
                      <p className="font-mono font-medium">{selectedOrder.iccid}</p>
                    </div>
                    {selectedOrder.qrUrl && (
                      <div>
                        <span className="text-muted-foreground">QR Code:</span>
                        <img
                          src={selectedOrder.qrUrl || "/placeholder.svg"}
                          alt="QR Code"
                          className="w-48 h-48 mt-2 border rounded"
                        />
                      </div>
                    )}
                    {selectedOrder.esimData?.ac && (
                      <div>
                        <span className="text-muted-foreground">Activation Code:</span>
                        <p className="font-mono text-xs bg-gray-100 p-2 rounded mt-1 break-all">
                          {selectedOrder.esimData.ac}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Admin Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Copy order ID
                    navigator.clipboard.writeText(selectedOrder.orderId)
                    toast({ title: "Copied", description: "Order ID copied to clipboard" })
                  }}
                >
                  Copy Order ID
                </Button>
                <Button variant="outline" onClick={() => setShowOrderModal(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
