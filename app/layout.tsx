import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/authContext'
import { Toaster } from 'react-hot-toast'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import ScrollToTopBtn from '@/components/ScrollToTopBtn'
import LoadingScreen from '@/components/LoadingScreen'

export const metadata: Metadata = {
  title: {
    default: 'Bách Chiến Trận Đồ — Boardgame Chiến Thuật Lịch Sử Việt Nam',
    template: '%s — Bách Chiến Trận Đồ',
  },
  description:
    'Tái hiện cuộc kháng chiến chống Mông Nguyên năm 1285. Boardgame chiến thuật 2 người — Đại Việt đối đầu Mông Nguyên. Hộp game thủ công tre Thạch Xá.',
  keywords: ['boardgame', 'lịch sử', 'Việt Nam', 'chiến thuật', 'Bách Chiến Trận Đồ', 'Đại Việt', 'Mông Nguyên', 'nhà Trần'],
  authors: [{ name: 'Cool Vietnam' }],
  creator: 'Cool Vietnam',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Bách Chiến Trận Đồ',
    title: 'Bách Chiến Trận Đồ — Boardgame Chiến Thuật Lịch Sử Việt Nam',
    description:
      'Tái hiện cuộc kháng chiến chống Mông Nguyên năm 1285. Boardgame chiến thuật 2 người — Đại Việt đối đầu Mông Nguyên.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bách Chiến Trận Đồ — Boardgame Chiến Thuật Lịch Sử Việt Nam',
    description:
      'Tái hiện cuộc kháng chiến chống Mông Nguyên năm 1285. Boardgame chiến thuật lịch sử Việt Nam.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Playfair+Display+SC:wght@400;700;900&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-parchment-texture antialiased">
        <AuthProvider>
          <LoadingScreen />
          <ScrollProgressBar />
          <ScrollToTopBtn />

          {children}

          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3500,
              style: {
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: '15px',
                background: '#F4EBCF',
                color: '#3B2A1E',
                border: '1px solid #C9A36A',
                boxShadow: '0 8px 32px rgba(59,42,30,0.2)',
                borderRadius: '2px',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
