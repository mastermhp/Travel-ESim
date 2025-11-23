"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, ArrowRight } from "lucide-react"

const plans = [
  {
    id: 1,
    name: "Starter",
    data: "1 GB",
    duration: "7 Days",
    price: "$4.99",
    features: ["High-speed 4G/5G", "Instant activation", "No contract", "Basic support"],
    popular: false,
    color: "primary",
  },
  {
    id: 2,
    name: "Traveler",
    data: "3 GB",
    duration: "15 Days",
    price: "$12.99",
    features: ["High-speed 4G/5G", "Instant activation", "No contract", "Priority support", "Free top-up"],
    popular: true,
    color: "accent",
  },
  {
    id: 3,
    name: "Explorer",
    data: "5 GB",
    duration: "30 Days",
    price: "$19.99",
    features: [
      "High-speed 4G/5G",
      "Instant activation",
      "No contract",
      "24/7 VIP support",
      "Free top-up",
      "Data rollover",
    ],
    popular: false,
    color: "primary",
  },
  {
    id: 4,
    name: "Unlimited",
    data: "10 GB",
    duration: "30 Days",
    price: "$34.99",
    features: [
      "High-speed 4G/5G",
      "Instant activation",
      "No contract",
      "24/7 VIP support",
      "Free top-up",
      "Data rollover",
      "Multi-device",
    ],
    popular: false,
    color: "primary",
  },
]

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(2)

  return (
    <section id="plans" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Flexible Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Perfect Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Affordable data plans for every type of traveler. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative group hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                selectedPlan === plan.id
                  ? "border-primary shadow-xl scale-105"
                  : "hover:-translate-y-2 border-border/50"
              } ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1.5 shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className={`${plan.popular ? "pt-8" : "pt-6"}`}>
                <CardTitle>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-muted-foreground">{plan.name}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="secondary">{plan.data}</Badge>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{plan.duration}</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full group/btn ${
                    plan.popular ? "bg-gradient-to-r from-primary to-accent hover:shadow-lg" : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Need a custom plan? Contact our sales team</p>
          <Button size="lg" variant="outline">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}
