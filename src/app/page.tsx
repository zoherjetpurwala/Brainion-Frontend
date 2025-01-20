import HeroComponent from '../components/landingpage/HeroComponent'
import FeaturesSection from '../components/landingpage/FeaturesSection'
import HowItWorksSection from '../components/landingpage/HowItWorksSection'
import TestimonialsSection from '../components/landingpage/TestimonialsSection'
import PricingSection from '../components/landingpage/PricingSection'
import FAQSection from '../components/landingpage/FAQSection'
import CTASection from '../components/landingpage/CTASection'
import Footer from '../components/landingpage/Footer'
import Navbar from '../components/landingpage/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <HeroComponent />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}

