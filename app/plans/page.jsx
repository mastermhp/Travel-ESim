"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Zap,
  Check,
  Star,
  TrendingUp,
  Loader2,
  Globe2,
  Sparkles,
  ArrowRight,
  Wifi,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCountryByCode } from "@/lib/countries-data"

export default function PlansPage() {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [filterRegion, setFilterRegion] = useState("all")
  const [countries, setCountries] = useState([])
  const [plans, setPlans] = useState([])
  const [loadingCountries, setLoadingCountries] = useState(true)
  const [loadingPlans, setLoadingPlans] = useState(false)

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      fetchPlans(selectedCountry.code)
    }
  }, [selectedCountry])

  async function fetchCountries() {
    try {
      setLoadingCountries(true)
      const response = await fetch("/api/v1/countries?active=true")
      const data = await response.json()

      if (data.success) {
        const enrichedCountries = data.countries.map((country) => {
          const countryData = getCountryByCode(country.code)
          return {
            ...country,
            flag: countryData?.flag || "🌍",
          }
        })
        setCountries(enrichedCountries)
      }
    } catch (error) {
      console.error("Failed to fetch countries:", error)
    } finally {
      setLoadingCountries(false)
    }
  }

  async function fetchPlans(countryCode) {
    try {
      setLoadingPlans(true)
      const response = await fetch(`/api/v1/plans?country=${countryCode}`)
      const data = await response.json()

      if (data.success) {
        setPlans(data.plans)
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error)
    } finally {
      setLoadingPlans(false)
    }
  }

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = filterRegion === "all" || country.region === filterRegion
    return matchesSearch && matchesRegion
  })

  const popularCountries = countries.filter((c) => c.popular).slice(0, 6)
  const uniqueRegions = [...new Set(countries.map((c) => c.region))].sort()

  const sortedPlans = [...plans].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "data":
        return (b.dataGB || 0) - (a.dataGB || 0)
      default:
        return (b.salesCount || 0) - (a.salesCount || 0)
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 animate-gradient-shift">
            <div className="absolute inset-0 opacity-30 bg-[url('/abstract-network-connections-global-map.jpg')] bg-cover bg-center mix-blend-overlay" />
          </div>

          {/* Floating orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-slow" />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-float-slow"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl animate-float-slow"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold mb-6 animate-slide-in-top border border-white/30">
                <Sparkles className="h-5 w-5" />
                <span>190+ Countries • Instant Activation • 24/7 Support</span>
              </div>

              {/* Heading */}
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
                Travel
                <br />
                Without
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">Limits</span>
                  <span className="absolute bottom-3 left-0 w-full h-6 bg-white/30 -skew-y-2" />
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-white/90 font-medium leading-relaxed max-w-3xl mx-auto">
                Stay connected anywhere in the world with instant eSIM activation. Premium data plans at unbeatable
                prices.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-white/90 text-lg px-8 py-6 rounded-full font-bold shadow-2xl transform hover:scale-105 transition-all"
                  onClick={() => {
                    const element = document.getElementById("browse-plans")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Browse Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Check className="h-5 w-5" />
                  <span>No contracts • No hidden fees</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
                <div className="space-y-2">
                  <div className="text-5xl font-black">190+</div>
                  <div className="text-sm text-white/80 font-medium">Countries</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-black">500K+</div>
                  <div className="text-sm text-white/80 font-medium">Happy Travelers</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-black">24/7</div>
                  <div className="text-sm text-white/80 font-medium">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/70 rounded-full animate-scroll-down" />
            </div>
          </div>
        </section>

        <section id="browse-plans" className="py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Sidebar - Country Selection */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="sticky top-24 shadow-2xl border-border/50 backdrop-blur-xl bg-card/80 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />

                  <CardContent className="p-6 space-y-6">
                    {/* Search */}
                    <div className="space-y-3">
                      <label className="text-lg font-bold flex items-center gap-2">
                        <Search className="h-5 w-5 text-emerald-600" />
                        Find Your Destination
                      </label>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Search countries..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-12 h-12 text-base bg-background/50 border-2 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Region Filter */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Filter by Region
                      </label>
                      <Select value={filterRegion} onValueChange={setFilterRegion}>
                        <SelectTrigger className="h-11 bg-background/50 border-2">
                          <SelectValue placeholder="All Regions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Regions</SelectItem>
                          {uniqueRegions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {loadingCountries ? (
                      <div className="flex flex-col items-center justify-center py-16">
                        <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mb-4" />
                        <p className="text-sm text-muted-foreground">Loading countries...</p>
                      </div>
                    ) : (
                      <>
                        {/* Popular Countries */}
                        {popularCountries.length > 0 && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                              <span className="font-bold">Popular Destinations</span>
                            </div>
                            <div className="space-y-2">
                              {popularCountries.map((country) => (
                                <button
                                  key={country._id}
                                  onClick={() => setSelectedCountry(country)}
                                  className={`w-full group relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-500 ${
                                    selectedCountry?._id === country._id
                                      ? "bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-950/50 dark:via-blue-950/50 dark:to-purple-950/50 border-emerald-500 shadow-2xl scale-105"
                                      : "bg-card border-border/50 hover:bg-secondary hover:border-emerald-300 dark:hover:border-emerald-700 hover:scale-102 hover:shadow-xl"
                                  }`}
                                >
                                  {/* Gradient overlay on hover */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/5 group-hover:to-blue-500/5 transition-all duration-500" />

                                  <span className="text-4xl relative z-10">{country.flag || "🌍"}</span>
                                  <div className="flex-1 text-left relative z-10">
                                    <div className="font-bold text-base">{country.name}</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">{country.region}</div>
                                  </div>
                                  {selectedCountry?._id === country._id && (
                                    <div className="relative z-10 bg-emerald-600 text-white rounded-full p-1.5">
                                      <Check className="h-4 w-4 animate-scale-in" />
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* All Countries */}
                        {filteredCountries.length > 0 && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Globe2 className="h-5 w-5 text-emerald-600" />
                              <span className="font-bold">All Countries ({filteredCountries.length})</span>
                            </div>
                            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                              {filteredCountries.map((country) => (
                                <button
                                  key={country._id}
                                  onClick={() => setSelectedCountry(country)}
                                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-300 ${
                                    selectedCountry?._id === country._id
                                      ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-lg"
                                      : "bg-card border-border/50 hover:bg-secondary hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md"
                                  }`}
                                >
                                  <span className="text-2xl">{country.flag || "🌍"}</span>
                                  <span className="flex-1 text-left font-semibold text-sm">{country.name}</span>
                                  {selectedCountry?._id === country._id && (
                                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {filteredCountries.length === 0 && (
                          <div className="text-center py-12 text-muted-foreground">
                            <Globe2 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                            <p className="font-medium">No countries match your search</p>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Content - Data Plans */}
              <div className="lg:col-span-2 space-y-8">
                {/* Sort & Filter Bar */}
                <Card className="shadow-xl border-border/50 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <SlidersHorizontal className="h-6 w-6 text-emerald-600" />
                        <div>
                          {selectedCountry ? (
                            <>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-3xl">{selectedCountry.flag || "🌍"}</span>
                                <span className="text-2xl font-bold">{selectedCountry.name}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {plans.length} {plans.length === 1 ? "plan" : "plans"} available
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="text-xl font-bold">Select a Destination</div>
                              <p className="text-sm text-muted-foreground">Choose from 190+ countries</p>
                            </>
                          )}
                        </div>
                      </div>
                      {selectedCountry && (
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-[220px] h-11 border-2">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="popular">
                              <span className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Most Popular
                              </span>
                            </SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="data">Data Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Plans List */}
                {!selectedCountry ? (
                  <Card className="shadow-2xl border-border/50 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500" />
                    <CardContent className="p-20 text-center">
                      <div className="max-w-lg mx-auto space-y-8 animate-fade-in">
                        <div className="relative mx-auto w-32 h-32">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-20 animate-pulse" />
                          <div className="relative h-full w-full rounded-full bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/50 dark:to-blue-950/50 flex items-center justify-center border-4 border-emerald-200 dark:border-emerald-800">
                            <Globe2 className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-3xl font-black mb-3">Choose Your Destination</h3>
                          <p className="text-muted-foreground text-lg leading-relaxed">
                            Select a country from the sidebar to browse available data plans and start your journey
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-6 pt-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Wifi className="h-5 w-5 text-emerald-600" />
                            <span>High-Speed 5G</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Zap className="h-5 w-5 text-blue-600" />
                            <span>Instant Activation</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : loadingPlans ? (
                  <Card className="shadow-2xl border-border/50 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500 animate-pulse" />
                    <CardContent className="p-20 text-center">
                      <div className="space-y-6">
                        <Loader2 className="h-16 w-16 animate-spin text-emerald-600 mx-auto" />
                        <div>
                          <p className="text-xl font-bold mb-2">Loading plans...</p>
                          <p className="text-muted-foreground">Finding the best deals for {selectedCountry.name}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : sortedPlans.length === 0 ? (
                  <Card className="shadow-2xl border-border/50 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-gray-300 to-gray-500" />
                    <CardContent className="p-20 text-center">
                      <div className="max-w-md mx-auto space-y-6">
                        <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto">
                          <MapPin className="h-12 w-12 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2">No Plans Available</h3>
                          <p className="text-muted-foreground text-lg">
                            We don't have any plans for {selectedCountry.name} yet. Check back soon or contact our
                            support team!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {sortedPlans.map((plan, index) => (
                      <Card
                        key={plan._id}
                        className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-border/50 hover:border-emerald-300 dark:hover:border-emerald-700 overflow-hidden animate-slide-in-bottom"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Animated gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-emerald-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

                        {/* Top accent line */}
                        <div className="h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <CardContent className="p-8 relative">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                            {/* Plan Details */}
                            <div className="flex-1 space-y-5">
                              <div className="flex items-start justify-between gap-6 flex-wrap">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-4 flex-wrap">
                                    {/* Data Amount Badge */}
                                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-black text-2xl shadow-lg">
                                      {plan.isUnlimited ? (
                                        <>
                                          <Zap className="h-6 w-6" />
                                          Unlimited
                                        </>
                                      ) : (
                                        <>
                                          <Wifi className="h-6 w-6" />
                                          {plan.dataGB} GB
                                        </>
                                      )}
                                    </div>

                                    {/* Best Seller Badge */}
                                    {plan.salesCount > 100 && (
                                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-4 py-2 text-sm font-bold">
                                        <TrendingUp className="h-4 w-4 mr-1.5" />
                                        Best Seller
                                      </Badge>
                                    )}
                                  </div>

                                  <h4 className="text-2xl font-bold text-foreground leading-tight">{plan.name}</h4>

                                  {/* Features */}
                                  <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
                                    <span className="flex items-center gap-2 font-semibold">
                                      <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                        <Zap className="h-4 w-4 text-emerald-600" />
                                      </div>
                                      Valid {plan.validityDays} days
                                    </span>
                                    <span className="flex items-center gap-2 font-semibold">
                                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <Wifi className="h-4 w-4 text-blue-600" />
                                      </div>
                                      High-speed 4G/5G
                                    </span>
                                    <span className="flex items-center gap-2 font-semibold">
                                      <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                        <Check className="h-4 w-4 text-purple-600" />
                                      </div>
                                      Instant Activation
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Price & CTA */}
                            <div className="lg:text-right space-y-4 lg:min-w-[240px]">
                              <div>
                                <div className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
                                  ${plan.price.toFixed(2)}
                                </div>
                                <div className="text-sm text-muted-foreground font-medium">{plan.currency}</div>
                              </div>
                              <Button
                                size="lg"
                                className="w-full lg:w-auto bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold px-8 py-6 rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-300"
                                onClick={() => {
                                  window.location.href = `/checkout?plan=${plan._id}`
                                }}
                              >
                                Buy Now
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                              </Button>
                              <p className="text-xs text-muted-foreground">
                                <Check className="h-3 w-3 inline mr-1" />
                                Instant delivery via email
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 shadow-xl border-2 border-border/50 hover:border-emerald-300 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Activation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive your eSIM instantly via email. Scan QR code and you're connected within minutes.
                </p>
              </Card>

              <Card className="text-center p-8 shadow-xl border-2 border-border/50 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                  <Globe2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Coverage</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stay connected in 190+ countries with reliable high-speed data coverage worldwide.
                </p>
              </Card>

              <Card className="text-center p-8 shadow-xl border-2 border-border/50 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                  <Check className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our dedicated support team is always available to help you stay connected.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
