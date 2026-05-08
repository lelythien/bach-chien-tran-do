import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import FeaturesSection from '@/sections/FeaturesSection'
import RulePreviewSection from '@/sections/RulePreviewSection'
import OrderPreviewSection from '@/sections/OrderPreviewSection'
import FeedbackPreviewSection from '@/sections/FeedbackPreviewSection'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <RulePreviewSection />
      <OrderPreviewSection />
      <FeedbackPreviewSection />
      <Footer />
    </main>
  )
}
