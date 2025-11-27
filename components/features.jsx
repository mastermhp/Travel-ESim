"use client"

import { Zap, Shield, Globe, Smartphone, DollarSign, Headphones } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Instant Activation",
    description: "Get connected in under 2 minutes. Scan QR code and start using data immediately.",
  },
  {
    icon: Globe,
    title: "190+ Countries",
    description: "Global coverage across all continents. One platform for all your travel connectivity needs.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Bank-level encryption and 99.9% uptime. Your data and privacy are protected.",
  },
  {
    icon: DollarSign,
    title: "Affordable Plans",
    description: "Competitive pricing with no hidden fees. Pay only for what you need.",
  },
  {
    icon: Smartphone,
    title: "Easy Management",
    description: "Manage all your eSIMs in one app. Check usage, top up, and switch plans instantly.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support in multiple languages. We are here to help.",
  },
]

export function Features() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Neon Lightning Lines - Animated Flowing Connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ filter: "blur(1px)" }}>
        <defs>
          <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.55 0.15 200)" stopOpacity="0.8">
              <animate attributeName="stop-opacity" values="0.8;0.5;0.8" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="oklch(0.6 0.15 200)" stopOpacity="0.6">
              <animate attributeName="stop-opacity" values="0.6;0.9;0.6" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Lightning Flow Lines - Connecting features */}
        <g filter="url(#glow)">
          {/* Top horizontal connections */}
          <path
            d="M 20% 25% L 50% 25% L 80% 25%"
            stroke="url(#neonGradient1)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          >
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </path>

          {/* Diagonal connections */}
          <path
            d="M 25% 30% L 40% 50% L 60% 50% L 75% 30%"
            stroke="url(#neonGradient1)"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          >
            <animate attributeName="stroke-dasharray" values="1000,0;0,1000" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" />
          </path>

          {/* Bottom connections */}
          <path d="M 20% 75% Q 50% 60% 80% 75%" stroke="url(#neonGradient1)" strokeWidth="2" fill="none" opacity="0.4">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="5s" repeatCount="indefinite" />
          </path>

          {/* Vertical energy flows */}
          <path d="M 30% 20% L 30% 80%" stroke="oklch(0.55 0.15 200)" strokeWidth="1" fill="none" opacity="0.3">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="2.5s" repeatCount="indefinite" />
          </path>
          <path d="M 70% 20% L 70% 80%" stroke="oklch(0.55 0.15 200)" strokeWidth="1" fill="none" opacity="0.3">
            <animate attributeName="stroke-dasharray" values="1000,0;0,1000" dur="3.5s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Glowing orbs at connection points */}
        <circle cx="20%" cy="25%" r="4" fill="oklch(0.55 0.15 200)" opacity="0.7">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50%" cy="25%" r="4" fill="oklch(0.55 0.15 200)" opacity="0.7">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="80%" cy="25%" r="4" fill="oklch(0.55 0.15 200)" opacity="0.7">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float-slow opacity-60 blur-sm" />
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-float-medium opacity-70 blur-sm"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary rounded-full animate-float-fast opacity-50 blur-sm"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-2 h-2 bg-accent rounded-full animate-float-slow opacity-60 blur-sm"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/30 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <span className="text-sm font-medium text-primary">Why Choose Us</span>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance text-white">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Seamless Travel
            </span>
          </h2>
          <p className="text-lg text-slate-300 text-pretty">
            Experience hassle-free connectivity with features designed for modern travelers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Neon glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

              {/* Animated border shimmer */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg opacity-50 blur-sm" />
              </div>

              <CardContent className="p-6 lg:p-8 relative z-10">
                <div className="space-y-4">
                  {/* Icon with neon glow */}
                  <div className="relative inline-flex">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      {feature.description}
                    </p>
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
