"use client"

import { QrCode, Download, Zap, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Choose Your Plan",
    description: "Select your destination and pick the perfect data plan for your trip duration.",
  },
  {
    number: "02",
    icon: QrCode,
    title: "Receive QR Code",
    description: "Get your eSIM QR code instantly via email or in the app after payment.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Scan & Activate",
    description: "Scan the QR code in your phone settings and activate your eSIM in seconds.",
  },
  {
    number: "04",
    icon: Check,
    title: "Start Roaming",
    description: "You are connected! Enjoy high-speed data wherever you travel.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
            <span className="text-sm font-medium text-accent">Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Get Connected in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">4 Easy Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From purchase to activation, we have made it incredibly simple
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/50 bg-card">
                <CardContent className="p-6 lg:p-8 space-y-6">
                  {/* Step Number */}
                  <div className="relative inline-flex">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-xl text-primary-foreground shadow-lg">
                      {step.number}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-30 animate-pulse-glow" />
                  </div>

                  {/* Icon */}
                  <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center py-4">
                  <div className="h-8 w-0.5 bg-gradient-to-b from-primary to-accent opacity-30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
