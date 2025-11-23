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
  const [countryForm, setCountryForm] = useState({
    name: "",
    code: "",
    region: "",
    active: true,
    supported: true,
  })
  const [planForm, setPlanForm] = useState({
    country: "",
    name: "",
    dataGB: "",
    validityDays: "",
    price: "",
    currency: "USD",
    costPrice: "",
    supplierId: "",
    supplierCode: "",
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
    try {
      const token = localStorage.getItem("adminToken")
      const method = editingPlan ? "PUT" : "POST"
      const body = editingPlan ? { id: editingPlan._id, ...planForm } : planForm

      const res = await fetch("/api/v1/admin/plan", {
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
        setShowPlanModal(false)
        setEditingPlan(null)
        setPlanForm({
          country: "",
          name: "",
          dataGB: "",
          validityDays: "",
          price: "",
          currency: "USD",
          costPrice: "",
          supplierId: "",
          supplierCode: "",
          isUnlimited: false,
          fairUseLimitGB: "",
          active: true,
        })
        fetchPlans()
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save plan", variant: "destructive" })
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
                        name: "",
                        dataGB: "",
                        validityDays: "",
                        price: "",
                        currency: "USD",
                        costPrice: "",
                        supplierId: "",
                        supplierCode: "",
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
                              <th className="text-left py-3 px-4 font-medium">Price</th>
                              <th className="text-left py-3 px-4 font-medium">Status</th>
                              <th className="text-right py-3 px-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {plans.map((plan) => (
                              <tr key={plan._id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">{plan.name}</td>
                                <td className="py-3 px-4">{plan.country}</td>
                                <td className="py-3 px-4">{plan.isUnlimited ? "Unlimited" : `${plan.dataGB} GB`}</td>
                                <td className="py-3 px-4">{plan.validityDays} days</td>
                                <td className="py-3 px-4">
                                  {plan.currency} {plan.price}
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
                                          name: plan.name,
                                          dataGB: plan.dataGB,
                                          validityDays: plan.validityDays,
                                          price: plan.price,
                                          currency: plan.currency,
                                          costPrice: plan.costPrice,
                                          supplierId: plan.supplierId,
                                          supplierCode: plan.supplierCode,
                                          isUnlimited: plan.isUnlimited,
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
                            ))}
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto">
          <Card className="w-full max-w-2xl my-8">
            <CardHeader>
              <CardTitle>{editingPlan ? "Edit Plan" : "Add Plan"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePlanSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Country Code</Label>
                    <Input
                      value={planForm.country}
                      onChange={(e) => setPlanForm({ ...planForm, country: e.target.value.toUpperCase() })}
                      placeholder="US"
                      required
                    />
                  </div>
                  <div>
                    <Label>Plan Name</Label>
                    <Input
                      value={planForm.name}
                      onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                      placeholder="USA 3GB 7 days"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Data (GB)</Label>
                    <Input
                      type="number"
                      value={planForm.dataGB}
                      onChange={(e) => setPlanForm({ ...planForm, dataGB: e.target.value })}
                      placeholder="3"
                      disabled={planForm.isUnlimited}
                      required={!planForm.isUnlimited}
                    />
                  </div>
                  <div>
                    <Label>Validity (Days)</Label>
                    <Input
                      type="number"
                      value={planForm.validityDays}
                      onChange={(e) => setPlanForm({ ...planForm, validityDays: e.target.value })}
                      placeholder="7"
                      required
                    />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Input
                      value={planForm.currency}
                      onChange={(e) => setPlanForm({ ...planForm, currency: e.target.value.toUpperCase() })}
                      placeholder="USD"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={planForm.price}
                      onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
                      placeholder="7.99"
                      required
                    />
                  </div>
                  <div>
                    <Label>Cost Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={planForm.costPrice}
                      onChange={(e) => setPlanForm({ ...planForm, costPrice: e.target.value })}
                      placeholder="3.50"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Supplier ID</Label>
                    <Input
                      value={planForm.supplierId}
                      onChange={(e) => setPlanForm({ ...planForm, supplierId: e.target.value })}
                      placeholder="SUPPLIER_A"
                      required
                    />
                  </div>
                  <div>
                    <Label>Supplier Code</Label>
                    <Input
                      value={planForm.supplierCode}
                      onChange={(e) => setPlanForm({ ...planForm, supplierCode: e.target.value })}
                      placeholder="SUP-USA-3GB"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={planForm.isUnlimited}
                      onCheckedChange={(checked) => setPlanForm({ ...planForm, isUnlimited: checked })}
                    />
                    <Label>Unlimited Data</Label>
                  </div>
                  {planForm.isUnlimited && (
                    <div className="flex-1">
                      <Label>Fair Use Limit (GB)</Label>
                      <Input
                        type="number"
                        value={planForm.fairUseLimitGB}
                        onChange={(e) => setPlanForm({ ...planForm, fairUseLimitGB: e.target.value })}
                        placeholder="50"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={planForm.active}
                    onCheckedChange={(checked) => setPlanForm({ ...planForm, active: checked })}
                  />
                  <Label>Active</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save Plan
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPlanModal(false)
                      setEditingPlan(null)
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
    </div>
  )
}
