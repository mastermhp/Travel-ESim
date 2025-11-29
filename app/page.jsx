import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { CountriesSection } from "@/components/countries-section"
// import { Coverage } from "@/components/coverage"
import { Pricing } from "@/components/pricing"
import { AgentSection } from "@/components/agent-section"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <CountriesSection />
        <HowItWorks />
        {/* <Coverage /> */}
        {/* <Pricing /> */}
        <AgentSection />
        {/* <Testimonials /> */}
      </main>
      <Footer />
    </div>
  )
}
