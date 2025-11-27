"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Globe2,
  Search,
  MapPin,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Check,
} from "lucide-react";
import Link from "next/link";
import { getCountryByCode } from "@/lib/countries-data";
import Image from "next/image";

export function CountriesSection() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  async function fetchCountries() {
    try {
      const response = await fetch("/api/v1/countries?active=true");
      const data = await response.json();

      if (data.success) {
        const enrichedCountries = data.countries.map((country) => {
          const countryData = getCountryByCode(country.code);
          return {
            ...country,
            flag: countryData?.flag || "🌍",
          };
        });
        setCountries(enrichedCountries);
      }
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    } finally {
      setLoading(false);
    }
  }

  const regions = [...new Set(countries.map((c) => c.region))].sort();
  const popularCountries = countries.filter((c) => c.popular).slice(0, 8);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === "all" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <>
      
      <section
        id="coverage"
        className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/world-map-with-connection-lines-network.jpg"
            alt="World Map"
            fill
            className="object-cover"
          />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Global Coverage
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              Available in{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                190+ Countries
              </span>
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              From bustling cities to remote destinations, stay connected
              everywhere
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
            {filteredCountries.slice(0, 24).map((country, index) => (
              <Link
                key={country._id}
                href="/plans"
                className="group animate-slide-in-up"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 bg-card/10 backdrop-blur-sm border-8"
                >
                  <CardContent className="">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center gap-8">
                        <span className="text-[60px]">{country.flag}</span>
                        <div>
                          <div className="font-semibold text-[20px] group-hover:text-primary transition-colors">
                            {country.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {country.region}
                          </div>
                        </div>
                      </div>
                      <Check className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 group-hover:border-primary transition-opacity border-[1px] p-1 ml-6 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Link href="/plans">
              <Button
                size="lg"
                variant="outline"
                className="group bg-transparent hover:cursor-pointer"
              >
                View All Countries
                <MapPin className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
