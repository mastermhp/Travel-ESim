"use client"

import { Globe, Facebook, Twitter, Instagram, Linkedin, Mail, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  product: [
    { label: "Coverage", href: "#coverage" },
    { label: "Pricing", href: "#plans" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "eSIM Compatible Devices", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  agents: [
    { label: "Become an Agent", href: "#agents" },
    { label: "Agent Login", href: "#" },
    { label: "Agent Resources", href: "#" },
    { label: "Commission Structure", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Installation Guide", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black border-t border-slate-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Globe className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 bg-primary blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Travel Esim
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Instant eSIM activation for global travelers. Stay connected in 190+ countries with affordable data plans.
            </p>

            {/* Contact Support with gradient accent */}
            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="font-semibold text-white text-sm">Contact Support</p>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <p className="flex items-center gap-2">
                  <span className="text-slate-500">WhatsApp:</span>
                  <span className="text-primary font-medium">+4670271587</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-primary font-medium">support@esimconnect.com</span>
                </p>
              </div>
            </div>

            {/* Newsletter with gradient styling */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                Subscribe to our newsletter
              </h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary focus:ring-primary/20"
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-0 shadow-lg shadow-primary/20 shrink-0"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Social Links with hover effects */}
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="ghost"
                  className="rounded-full bg-slate-800/50 border border-slate-700 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group"
                >
                  <Icon className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                </Button>
              ))}
            </div>
          </div>

          {/* Links Columns with enhanced styling */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white relative inline-block">
              Product
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-accent transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-accent group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white relative inline-block">
              For Agents
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.agents.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white relative inline-block">
              Support
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-accent to-transparent" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-accent transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-accent group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar with gradient border */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2025 <span className="text-primary font-medium">Travel Esim</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-slate-500 hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="#" className="text-slate-500 hover:text-primary transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
