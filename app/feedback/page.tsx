import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FeedbackPreviewSection from '@/sections/FeedbackPreviewSection'

export default function FeedbackPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <FeedbackPreviewSection />
      </div>
      <Footer />
    </main>
  )
}
