"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Check } from "lucide-react"
import Image from "next/image"

const popularCountries = [
  { name: "United States", region: "Americas", flag: "🇺🇸" },
  { name: "United Kingdom", region: "Europe", flag: "🇬🇧" },
  { name: "Japan", region: "Asia", flag: "🇯🇵" },
  { name: "Australia", region: "Oceania", flag: "🇦🇺" },
  { name: "Germany", region: "Europe", flag: "🇩🇪" },
  { name: "France", region: "Europe", flag: "🇫🇷" },
  { name: "Thailand", region: "Asia", flag: "🇹🇭" },
  { name: "Canada", region: "Americas", flag: "🇨🇦" },
  { name: "Spain", region: "Europe", flag: "🇪🇸" },
  { name: "Italy", region: "Europe", flag: "🇮🇹" },
  { name: "South Korea", region: "Asia", flag: "🇰🇷" },
  { name: "Dubai (UAE)", region: "Middle East", flag: "🇦🇪" },
]

export function Coverage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCountries = popularCountries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <section id="coverage" className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <Image src="/world-map-with-connection-lines-network.jpg" alt="World Map" fill className="object-cover" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Global Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Available in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              190+ Countries
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From bustling cities to remote destinations, stay connected everywhere
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-card border-border/50"
            />
          </div>
        </div>

        {/* Popular Countries Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCountries.map((country, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <div className="font-semibold group-hover:text-primary transition-colors">{country.name}</div>
                      <div className="text-xs text-muted-foreground">{country.region}</div>
                    </div>
                  </div>
                  <Check className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="group bg-transparent">
            View All Countries
            <MapPin className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
