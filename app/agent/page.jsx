"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  TrendingUp,
  Users,
  ShoppingCart,
  Calendar,
  Share2,
  Copy,
  Globe,
  Menu,
  X,
  BarChart3,
  Wallet,
} from "lucide-react"

export default function AgentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("dashboard")

  // Mock agent data
  const agentData = {
    name: "John Driver",
    agentId: "AG-12345",
    commissionRate: "15%",
    earnings: {
      today: 450,
      week: 2340,
      month: 8920,
      total: 45600,
    },
    sales: {
      today: 12,
      week: 78,
      month: 298,
      total: 1520,
    },
    referralLink: "https://travelesim.com/ref/AG12345",
  }

  const recentSales = [
    {
      id: 1,
      customer: "Tourist A",
      country: "USA",
      plan: "10 GB",
      price: 45,
      commission: 6.75,
      status: "completed",
      time: "2 hours ago",
    },
    {
      id: 2,
      customer: "Tourist B",
      country: "UK",
      plan: "5 GB",
      price: 28,
      commission: 4.2,
      status: "completed",
      time: "4 hours ago",
    },
    {
      id: 3,
      customer: "Tourist C",
      country: "Japan",
      plan: "20 GB",
      price: 78,
      commission: 11.7,
      status: "pending",
      time: "5 hours ago",
    },
    {
      id: 4,
      customer: "Tourist D",
      country: "France",
      plan: "15 GB",
      price: 56,
      commission: 8.4,
      status: "completed",
      time: "1 day ago",
    },
    {
      id: 5,
      customer: "Tourist E",
      country: "Germany",
      plan: "10 GB",
      price: 42,
      commission: 6.3,
      status: "completed",
      time: "1 day ago",
    },
  ]

  const topPlans = [
    { country: "USA", sales: 45, revenue: 2025 },
    { country: "UK", sales: 38, revenue: 1064 },
    { country: "Japan", sales: 32, revenue: 2496 },
    { country: "France", sales: 28, revenue: 1568 },
  ]

  const copyReferralLink = () => {
    navigator.clipboard.writeText(agentData.referralLink)
    alert("Referral link copied!")
  }

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`Get instant eSIM data for your travels! Use my link: ${agentData.referralLink}`)
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
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
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r z-40 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              TraveleSIM
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Agent Portal</p>
          </div>

          <div className="p-4 border-b bg-gradient-to-br from-emerald-50 to-blue-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {agentData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{agentData.name}</p>
                <p className="text-sm text-muted-foreground">ID: {agentData.agentId}</p>
              </div>
            </div>
            <Badge className="mt-3 w-full justify-center" variant="secondary">
              {agentData.commissionRate} Commission
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
              Sales History
            </Button>
            <Button
              variant={selectedTab === "customers" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab("customers")}
            >
              <Users className="w-4 h-4 mr-2" />
              Customers
            </Button>
            <Button
              variant={selectedTab === "earnings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab("earnings")}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Earnings
            </Button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/">Exit Portal</Link>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Dashboard Tab */}
          {selectedTab === "dashboard" && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
                <p className="text-muted-foreground">
                  Welcome back, {agentData.name}! Here's your performance overview.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-emerald-100">Today's Earnings</CardDescription>
                    <CardTitle className="text-3xl">${agentData.earnings.today}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12% from yesterday</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>This Week</CardDescription>
                    <CardTitle className="text-3xl">${agentData.earnings.week}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{agentData.sales.week} sales</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle className="text-3xl">${agentData.earnings.month}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{agentData.sales.month} sales</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-blue-100">Total Earnings</CardDescription>
                    <CardTitle className="text-3xl">${agentData.earnings.total}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{agentData.sales.total} total sales</p>
                  </CardContent>
                </Card>
              </div>

              {/* Referral Link Card */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Your Referral Link
                  </CardTitle>
                  <CardDescription>Share this link with travelers to earn commission</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={agentData.referralLink} readOnly className="font-mono text-sm" />
                    <Button onClick={copyReferralLink} size="icon" variant="outline">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={shareOnWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share on WhatsApp
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Share2 className="w-4 h-4 mr-2" />
                      More Options
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Sales */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>Your latest transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentSales.slice(0, 5).map((sale) => (
                        <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{sale.customer}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Globe className="w-3 h-3" />
                              <span>
                                {sale.country} - {sale.plan}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-emerald-600">+${sale.commission}</p>
                            <Badge variant={sale.status === "completed" ? "default" : "secondary"} className="text-xs">
                              {sale.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      View All Sales
                    </Button>
                  </CardContent>
                </Card>

                {/* Top Selling Plans */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Selling Plans</CardTitle>
                    <CardDescription>Most popular destinations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPlans.map((plan, index) => (
                        <div key={plan.country} className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{plan.country}</p>
                            <p className="text-sm text-muted-foreground">{plan.sales} sales</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${plan.revenue}</p>
                            <p className="text-sm text-muted-foreground">revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent" asChild>
                      <Link href="/plans">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="font-medium">Browse Plans</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent">
                      <Calendar className="w-6 h-6" />
                      <span className="font-medium">Sales Report</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent">
                      <Wallet className="w-6 h-6" />
                      <span className="font-medium">Request Payout</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Other tabs would go here */}
          {selectedTab !== "dashboard" && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <p className="text-2xl font-semibold mb-2">Coming Soon</p>
                <p className="text-muted-foreground">This section is under development</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
