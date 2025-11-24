"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Globe2, Search, MapPin, ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import { getCountryByCode } from "@/lib/countries-data"

export function CountriesSection() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCountries()
  }, [])

  async function fetchCountries() {
    try {
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
      setLoading(false)
    }
  }

  const regions = [...new Set(countries.map((c) => c.region))].sort()
  const popularCountries = countries.filter((c) => c.popular).slice(0, 8)

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = selectedRegion === "all" || country.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  return (
    <section
      id="countries"
      className="py-20 lg:py-32 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-slide-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Globe2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Global Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Connect in{" "}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent">
              190+ Countries
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From bustling cities to remote destinations, stay connected wherever your journey takes you
          </p>
        </div>

        {/* Popular Countries Showcase */}
        {popularCountries.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-amber-500" />
                <h3 className="text-2xl font-bold">Popular Destinations</h3>
              </div>
              <Button variant="ghost" className="group" asChild>
                <Link href="/plans">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {popularCountries.map((country, index) => (
                <Link key={country._id} href="/plans" className="group" style={{ animationDelay: `${index * 100}ms` }}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="text-5xl group-hover:scale-125 transition-transform duration-300">
                        {country.flag}
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold text-sm leading-tight">{country.name}</div>
                        <Badge variant="secondary" className="text-xs">
                          {country.planCount || 0} {country.planCount === 1 ? "plan" : "plans"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <Card className="mb-8 shadow-xl border-2 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-accent" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base border-2 focus:border-primary"
                />
              </div>

              {/* Region Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={selectedRegion === "all" ? "default" : "outline"}
                  onClick={() => setSelectedRegion("all")}
                  className="h-12"
                >
                  All Regions
                </Button>
                {regions.slice(0, 4).map((region) => (
                  <Button
                    key={region}
                    size="sm"
                    variant={selectedRegion === region ? "default" : "outline"}
                    onClick={() => setSelectedRegion(region)}
                    className="h-12"
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>
                Showing {filteredCountries.length} {filteredCountries.length === 1 ? "country" : "countries"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Countries Grid */}
        {loading ? (
          <div className="text-center py-20">
            <Globe2 className="h-16 w-16 mx-auto mb-4 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading countries...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {filteredCountries.slice(0, 24).map((country, index) => (
                <Link
                  key={country._id}
                  href="/plans"
                  className="group animate-slide-in-up"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
                    <CardContent className="p-4 text-center space-y-2">
                      <div className="text-4xl group-hover:scale-110 transition-transform">{country.flag}</div>
                      <div className="font-semibold text-sm leading-tight">{country.name}</div>
                      {country.popular && <Sparkles className="h-3 w-3 mx-auto text-amber-500 fill-amber-500" />}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 shadow-xl group" asChild>
                <Link href="/plans">
                  Explore All Countries
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
