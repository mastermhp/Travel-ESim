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
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [authSettings, setAuthSettings] = useState(null)
  const [loadingSettings, setLoadingSettings] = useState(false)

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

  useEffect(() => {
    if (selectedTab === "countries") {
      fetchCountries()
      fetchPlans()
    }
  }, [selectedTab])

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
        body: JSON.stringify(updatedSettings),
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

  // Mock data for overview
  const stats = [
    { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign },
    { title: "Orders", value: "2,350", change: "+180.1%", icon: ShoppingCart },
    { title: "Active Agents", value: "456", change: "+19%", icon: Users },
    { title: "Countries", value: "193", change: "+3 new", icon: Globe },
  ]

  const mockCountries = [
    { name: "United States", plans: 12, sales: 850, revenue: 12500, status: "Active" },
    { name: "United Kingdom", plans: 10, sales: 620, revenue: 9800, status: "Active" },
    { name: "Germany", plans: 8, sales: 450, revenue: 7200, status: "Active" },
  ]

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

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
    </div>
  )
}
