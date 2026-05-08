import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RulesHero from '@/sections/rules/RulesHero'
import RulesGallery from '@/sections/rules/RulesGallery'
import RulesSections from '@/sections/rules/RulesSections'
import RulesSidebar from '@/components/RulesSidebar'

export const metadata: Metadata = {
  title: 'Luật chơi — Bách Chiến Trận Đồ',
  description:
    'Luật chơi đầy đủ của Bách Chiến Trận Đồ: giới thiệu, cách chiến thắng, giải thích LL/LT/TT/SM, vật dụng, loại thẻ, setup bàn chơi, 4 hành động trong lượt, cơ chế giao tranh và lưu ý đặc biệt.',
  keywords: ['luật chơi', 'boardgame', 'Bách Chiến Trận Đồ', 'hướng dẫn', 'chiến thuật', 'lịch sử Việt Nam', 'LL LT TT SM'],
  openGraph: {
    title: 'Luật chơi — Bách Chiến Trận Đồ',
    description: 'Hướng dẫn luật chơi đầy đủ — Làm chủ chiến thuật, điều binh như danh tướng.',
    type: 'article',
    siteName: 'Bách Chiến Trận Đồ',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luật chơi — Bách Chiến Trận Đồ',
    description: 'Hướng dẫn luật chơi đầy đủ — Làm chủ chiến thuật, điều binh như danh tướng.',
  },
}

export default function RulesPage() {
  return (
    <main className="min-h-screen" aria-label="Trang luật chơi">
      <Navbar />
      <RulesHero />
      <RulesGallery />
      <RulesSections />
      <RulesSidebar />
      <Footer />
    </main>
  )
}
