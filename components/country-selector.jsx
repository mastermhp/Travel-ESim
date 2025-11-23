"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronDown, Check, X, Globe2 } from "lucide-react"
import { COUNTRIES_DATA, getAllRegions } from "@/lib/countries-data"

export function CountrySelector({ value, onChange, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")
  const dropdownRef = useRef(null)

  const selectedCountry = value ? COUNTRIES_DATA.find((c) => c.code === value || c.name === value) : null

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredCountries = COUNTRIES_DATA.filter((country) => {
    const matchesSearch =
      searchQuery === "" ||
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRegion = regionFilter === "all" || country.region === regionFilter

    return matchesSearch && matchesRegion
  })

  const regions = getAllRegions()

  function handleSelect(country) {
    if (onChange) {
      onChange(country.code)
    }
    if (onSelect) {
      onSelect(country)
    }
    setIsOpen(false)
    setSearchQuery("")
  }

  function handleClear() {
    if (onChange) {
      onChange("")
    }
    if (onSelect) {
      onSelect(null)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Label className="mb-2 flex items-center gap-2">
        <Globe2 className="h-4 w-4 text-emerald-600" />
        Country
      </Label>

      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between h-11 text-left font-normal"
        >
          {selectedCountry ? (
            <span className="flex items-center gap-3">
              <span className="text-2xl">{selectedCountry.flag}</span>
              <span className="font-medium">{selectedCountry.name}</span>
              <Badge variant="secondary" className="text-xs">
                {selectedCountry.code}
              </Badge>
            </span>
          ) : (
            <span className="text-muted-foreground">Select a country...</span>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>

        {selectedCountry && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-10 top-1/2 -translate-y-1/2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute z-50 mt-2 w-full shadow-2xl border-2 border-emerald-200 dark:border-emerald-800 animate-slide-in-top">
          <CardContent className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>

            {/* Region Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                size="sm"
                variant={regionFilter === "all" ? "default" : "outline"}
                onClick={() => setRegionFilter("all")}
                className="text-xs"
              >
                All Regions
              </Button>
              {regions.map((region) => (
                <Button
                  key={region}
                  type="button"
                  size="sm"
                  variant={regionFilter === region ? "default" : "outline"}
                  onClick={() => setRegionFilter(region)}
                  className="text-xs"
                >
                  {region}
                </Button>
              ))}
            </div>

            {/* Countries List */}
            <div className="max-h-80 overflow-y-auto space-y-1">
              {filteredCountries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Globe2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No countries found</p>
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleSelect(country)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                      selectedCountry?.code === country.code
                        ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500"
                        : "bg-background border-border hover:bg-secondary hover:border-emerald-300"
                    }`}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{country.name}</div>
                      <div className="text-xs text-muted-foreground">{country.region}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {country.code}
                    </Badge>
                    {selectedCountry?.code === country.code && (
                      <Check className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
