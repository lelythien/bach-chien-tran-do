import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OrderPreviewSection from '@/sections/OrderPreviewSection'

export default function OrderPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <OrderPreviewSection />
      </div>
      <Footer />
    </main>
  )
}
