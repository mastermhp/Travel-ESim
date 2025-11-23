"use client"

import { Button } from "@/components/ui/button"
import { Globe, Zap, Shield, ArrowRight } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-[url('/abstract-network-connections-global-map.jpg')] opacity-5 bg-cover bg-center" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left animate-slide-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Instant Activation</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance">
                Stay Connected{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  Anywhere
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto lg:mx-0">
                Instant eSIM data plans for 190+ countries. No physical SIM needed. Activate in seconds and enjoy
                seamless global connectivity.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg h-14 px-8 group">
                Browse Plans
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-transparent">
                <Globe className="mr-2 h-5 w-5" />
                Check Coverage
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">190+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Travelers</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">4.9/5</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative lg:h-[600px] animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative z-10">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative rounded-[3rem] border-8 border-foreground/10 bg-background shadow-2xl overflow-hidden aspect-[9/19]">
                  <Image
                    src="/smartphone-showing-esim-qr-code-activation-travel-.jpg"
                    alt="eSIM App Interface"
                    width={400}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-8 -right-8 bg-card border border-border rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Secure</div>
                      <div className="text-xs text-muted-foreground">256-bit encryption</div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-xl animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Instant</div>
                      <div className="text-xs text-muted-foreground">2 min activation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 left-0 w-40 h-40 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-foreground/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
