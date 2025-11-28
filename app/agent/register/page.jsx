"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle2, User, Mail, Phone, MapPin } from "lucide-react"

export default function AgentRegister() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    businessType: "",
    experience: "",
    whyJoin: "",
    agreeTerms: false,
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/v1/agent/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStep(4)
      } else {
        alert("Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Agent registration error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TraveleSIM
            </h1>
          </Link>
          <h2 className="text-2xl font-bold mb-2">Become an Agent</h2>
          <p className="text-muted-foreground">Start earning commission by selling eSIMs to travelers</p>
        </div>

        {/* Progress Indicator */}
        {step < 4 && (
          <div className="mb-8">
            <div className="flex justify-between items-center max-w-md mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= s
                        ? "bg-gradient-to-r from-primary to-accent text-white scale-110"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        step > s ? "bg-gradient-to-r from-primary to-accent" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between max-w-md mx-auto mt-2 text-sm text-muted-foreground">
              <span>Personal</span>
              <span>Business</span>
              <span>Review</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Tell us about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-9"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-9"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1234567890"
                        className="pl-9"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                      <Input
                        id="country"
                        placeholder="United States"
                        className="pl-9"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="button" onClick={() => setStep(2)} className="w-full" size="lg">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Business Details */}
          {step === 2 && (
            <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>Tell us about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => handleInputChange("businessType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="taxi">Taxi/Uber Driver</SelectItem>
                      <SelectItem value="tour">Tour Guide</SelectItem>
                      <SelectItem value="hotel">Hotel/Hostel Staff</SelectItem>
                      <SelectItem value="travel">Travel Agency</SelectItem>
                      <SelectItem value="retail">Retail Shop</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">New to selling</SelectItem>
                      <SelectItem value="intermediate">1-3 years experience</SelectItem>
                      <SelectItem value="expert">3+ years experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whyJoin">Why do you want to join? *</Label>
                  <Textarea
                    id="whyJoin"
                    placeholder="Tell us why you want to become an agent and how you plan to sell eSIMs..."
                    rows={4}
                    value={formData.whyJoin}
                    onChange={(e) => handleInputChange("whyJoin", e.target.value)}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="button" onClick={() => setStep(1)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button type="button" onClick={() => setStep(3)} className="flex-1">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle>Review Your Application</CardTitle>
                <CardDescription>Please review your information before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">
                        {formData.city}, {formData.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Business Type</p>
                      <p className="font-medium capitalize">{formData.businessType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-medium capitalize">{formData.experience}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked)}
                  />
                  <label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    , and confirm that the information provided is accurate.
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button type="button" onClick={() => setStep(2)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                    disabled={!formData.agreeTerms || loading}
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <Card className="shadow-lg animate-in fade-in zoom-in">
              <CardContent className="pt-12 pb-12 text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Application Submitted!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thank you for applying to become an agent. We'll review your application and get back to you within
                    24-48 hours via email.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button asChild>
                    <Link href="/">Return Home</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/agent/login">Go to Login</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>

        {/* Benefits Card */}
        {step < 4 && (
          <Card className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">What You'll Get as an Agent:</h3>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>15-25% commission on every sale</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Instant payout to your wallet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Agent dashboard with analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>24/7 dedicated support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Marketing materials provided</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>No upfront costs or fees</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
