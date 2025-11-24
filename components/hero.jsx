"use client"

import { Button } from "@/components/ui/button"
import { Globe, Zap, Shield, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero() {
  const [typewriterText, setTypewriterText] = useState("")
  const fullText = "Stay Connected Anywhere"

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

        {/* Globe network background */}
        <div className="absolute inset-0 opacity-20">
          <Image src="/abstract-network-connections-global-map.jpg" alt="" fill className="object-cover" priority />
        </div>

        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-accent/20 animate-gradient-shift" />

        {/* Multiple floating orbs for depth */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s", animationDuration: "8s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s", animationDuration: "10s" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left animate-slide-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full border border-primary/20 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Instant Activation</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight text-balance min-h-[1.2em]">
                <span className="inline-block">
                  {typewriterText}
                  <span className="inline-block w-1 h-[0.9em] bg-primary ml-1 animate-pulse" />
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent animate-gradient-x">
                  Around the World
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto lg:mx-0">
                Instant eSIM data plans for 190+ countries. No physical SIM needed. Activate in seconds and enjoy
                seamless global connectivity wherever you go.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-lg h-14 px-8 group shadow-xl hover:shadow-2xl transition-all"
                asChild
              >
                <Link href="/plans">
                  Browse Plans
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                asChild
              >
                <Link href="/#countries">
                  <Globe className="mr-2 h-5 w-5" />
                  Explore Coverage
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  190+
                </div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  500K+
                </div>
                <div className="text-sm text-muted-foreground">Happy Travelers</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  4.9/5
                </div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative z-10">
              {/* Phone Mockup */}
              <div className="relative ml-auto w-full max-w-sm group">
                <div className="relative rounded-[3rem] border-8 border-foreground/10 bg-background shadow-2xl overflow-hidden aspect-12/20 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/smartphone-showing-esim-qr-code-activation-travel-.jpg"
                    alt="eSIM App Interface"
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-blue-500/10 to-transparent" />

                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-primary via-blue-500 to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-8 -right-8 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl animate-float hover:scale-110 transition-transform">
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
                  className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl animate-float hover:scale-110 transition-transform"
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
            <div className="absolute top-1/4 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/4 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-foreground/40 rounded-full animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}
