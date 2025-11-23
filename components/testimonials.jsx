"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Digital Nomad",
    location: "Bali, Indonesia",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Absolutely game-changing! I travel to 4-5 countries every month and RoamConnect has saved me so much time and money. The eSIM activates instantly and the data speeds are excellent.",
  },
  {
    name: "Michael Chen",
    role: "Business Traveler",
    location: "Singapore",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "As someone who travels frequently for work, having reliable internet is crucial. RoamConnect never disappoints. The coverage is fantastic and customer support is top-notch.",
  },
  {
    name: "Ahmed Hassan",
    role: "Taxi Driver & Agent",
    location: "Dubai, UAE",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Being an agent has been incredibly rewarding. I earn extra income helping tourists stay connected, and the commission payouts are always on time. Highly recommend the agent program!",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
            <Star className="h-4 w-4 text-accent fill-current" />
            <span className="text-sm font-medium text-accent">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Travelers Worldwide
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            See what our customers and agents have to say about their experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <CardContent className="p-6 lg:p-8 space-y-6">
                {/* Quote Icon */}
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Quote className="h-6 w-6 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.location}
                    </div>
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
