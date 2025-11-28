"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Wallet, TrendingUp, Smartphone, ArrowRight, BadgeCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const benefits = [
  {
    icon: TrendingUp,
    title: "Earn Commission",
    description: "Make 15-25% commission on every eSIM sale you make",
  },
  {
    icon: Wallet,
    title: "Instant Payouts",
    description: "Get paid directly to your wallet or mobile money account",
  },
  {
    icon: Smartphone,
    title: "Easy to Use App",
    description: "Sell eSIMs in seconds with our intuitive agent app",
  },
  {
    icon: BadgeCheck,
    title: "Verified Agent",
    description: "Get official agent status and marketing materials",
  },
]

export function AgentSection() {
  return (
    <section id="agents" className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">Agent Program</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
                Become an Agent,{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Earn More</span>
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Join thousands of taxi drivers, tour guides, and entrepreneurs earning extra income by selling eSIMs to
                travelers.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-5 space-y-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg group" asChild>
                <Link href="/agent/register">
                  Become an Agent
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/agent/login">Agent Login</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">5,000+</div>
                <div className="text-sm text-muted-foreground">Active Agents</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">$500K+</div>
                <div className="text-sm text-muted-foreground">Paid in Commissions</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <Card className="overflow-hidden border-border/50 shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src="/professional-taxi-driver-with-smartphone-helping-t.jpg"
                    alt="Agent selling eSIM to traveler"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>

              {/* Floating Stat Cards */}
              <Card className="absolute -top-6 -left-6 p-4 shadow-xl border-border/50 backdrop-blur-sm bg-card/90 animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">25%</div>
                    <div className="text-xs text-muted-foreground">Commission Rate</div>
                  </div>
                </div>
              </Card>

              <Card
                className="absolute -bottom-6 -right-6 p-4 shadow-xl border-border/50 backdrop-blur-sm bg-card/90 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">$2.5K</div>
                    <div className="text-xs text-muted-foreground">Avg Monthly</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/3 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
