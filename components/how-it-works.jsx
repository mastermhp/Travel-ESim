"use client"

import { QrCode, Download, Zap, Check, Scan, Network, TowerControl, TowerControlIcon, RadioTower, LucideAperture, PrinterIcon, LocateOffIcon, LocateFixed } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    icon: LocateFixed,
    title: "Choose Your Plan",
    description: "Select your destination and pick the perfect data plan for your trip duration.",
    gradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(139, 92, 246, 0.5)",
  },
  {
    number: "02",
    icon: QrCode,
    title: "Receive QR Code",
    description: "Get your eSIM QR code instantly via email or in the app after payment.",
    gradient: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.5)",
  },
  {
    number: "03",
    icon: Scan,
    title: "Scan & Activate",
    description: "Scan the QR code in your phone settings and activate your eSIM in seconds.",
    gradient: "from-pink-500 to-rose-600",
    glowColor: "rgba(236, 72, 153, 0.5)",
  },
  {
    number: "04",
    icon: RadioTower,
    title: "Start Roaming",
    description: "You are connected! Enjoy high-speed data wherever you travel.",
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.5)",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-background via-secondary/30 to-background overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
            <span className="text-sm font-medium text-primary font-semibold">Simple Process</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Get Connected in{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                4 Easy Steps
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M0 4 Q50 0, 100 4 T200 4" stroke="url(#underlineGradient)" strokeWidth="3" fill="none" />
                <defs>
                  <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.55 0.15 200)" />
                    <stop offset="100%" stopColor="oklch(0.65 0.18 35)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From purchase to activation, we have made it incredibly simple
          </p>
        </div>

        {/* Steps - 3D Card Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Flowing connection line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.55 0.15 200)" stopOpacity="0.4" />
                <stop offset="50%" stopColor="oklch(0.65 0.18 35)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="oklch(0.55 0.15 200)" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M 12% 25% Q 35% 15%, 38% 25% T 62% 25% Q 85% 15%, 88% 25%"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              fill="none"
            >
              <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="4s" repeatCount="indefinite" />
            </path>
          </svg>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative" style={{ zIndex: 1 }}>
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card className="relative h-full hover:shadow-2xl transition-all duration-500 border-border/50 bg-card backdrop-blur-sm overflow-hidden group-hover:-translate-y-3 group-hover:scale-105">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Glowing border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500" />

                  <CardContent className="relative p- space-y-8">
                    {/* Step Number - 3D Effect */}
                    <div className="relative inline-flex">
                      <div className=" relative h-20 w-20 mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-3xl text-white shadow-2xl transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                        <step.icon className="h-10 w-10 z-10" />

                        {/* 3D depth layers */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-50 transform translate-x-1 translate-y-1 -z-10" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-30 transform translate-x-2 translate-y-2 -z-20" />
                      </div>

                      {/* Animated glow pulse */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-500 animate-pulse-slow" />
                    </div>

                   

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-md">{step.description}</p>
                    </div>

                    {/* Progress indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
                      <div className="h-full bg-gradient-to-r from-primary to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    </div>
                  </CardContent>
                </Card>

                {/* Connecting arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center py-4">
                    <div className="h-12 w-1 bg-gradient-to-b from-primary to-accent opacity-30 rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes sparkle-1 {
          0%, 100% { transform: translate(0, 0) scale(0); opacity: 0; }
          50% { transform: translate(-10px, -10px) scale(1); opacity: 1; }
        }
        @keyframes sparkle-2 {
          0%, 100% { transform: translate(0, 0) scale(0); opacity: 0; }
          50% { transform: translate(10px, 10px) scale(1); opacity: 1; }
        }
        @keyframes sparkle-3 {
          0%, 100% { transform: translate(0, 0) scale(0); opacity: 0; }
          50% { transform: translate(15px, 0) scale(1); opacity: 1; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-sparkle-1 { animation: sparkle-1 2s ease-in-out infinite; }
        .animate-sparkle-2 { animation: sparkle-2 2.5s ease-in-out infinite 0.5s; }
        .animate-sparkle-3 { animation: sparkle-3 2.2s ease-in-out infinite 1s; }
      `}</style>
    </section>
  )
}
