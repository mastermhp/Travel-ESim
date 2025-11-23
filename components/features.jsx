"use client"

import { Zap, Shield, Globe, Smartphone, DollarSign, Headphones } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Instant Activation",
    description: "Get connected in under 2 minutes. Scan QR code and start using data immediately.",
    color: "text-accent",
  },
  {
    icon: Globe,
    title: "190+ Countries",
    description: "Global coverage across all continents. One platform for all your travel connectivity needs.",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Bank-level encryption and 99.9% uptime. Your data and privacy are protected.",
    color: "text-primary",
  },
  {
    icon: DollarSign,
    title: "Affordable Plans",
    description: "Competitive pricing with no hidden fees. Pay only for what you need.",
    color: "text-accent",
  },
  {
    icon: Smartphone,
    title: "Easy Management",
    description: "Manage all your eSIMs in one app. Check usage, top up, and switch plans instantly.",
    color: "text-primary",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support in multiple languages. We are here to help.",
    color: "text-accent",
  },
]

export function Features() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-sm font-medium text-primary">Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Seamless Travel
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Experience hassle-free connectivity with features designed for modern travelers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="relative inline-flex">
                    <div
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
