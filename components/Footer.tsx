'use client'

import { Facebook } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

const SOCIAL = [
  { icon: Facebook, label: 'Facebook', href: 'https://web.facebook.com/coolvietnambiz/' },
]

const FOOTER_LINKS = [
  { label: 'Trang chủ',  href: '#hero' },
  { label: 'Luật chơi', href: '#luat-choi' },
  { label: 'Order',     href: '#order' },
  { label: 'Feedback',  href: '#feedback' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-parchment border-t border-parchment-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-parchment-400 text-2xl">⚔</span>
              <span className="font-cinzel font-bold text-parchment-200 text-lg tracking-widest">
                {SITE_NAME}
              </span>
            </div>
            <p className="font-garamond text-parchment-300 text-sm leading-relaxed max-w-xs">
              Boardgame chiến thuật lịch sử Việt Nam – tái hiện những trận chiến hào hùng của dân tộc.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-2">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-sm border border-parchment-400/30 flex items-center justify-center
                             text-parchment-400 hover:border-parchment-400 hover:bg-parchment-400/10
                             transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-cinzel text-xs tracking-widest text-parchment-400 mb-4 uppercase">
              Điều hướng
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-garamond text-parchment-300 hover:text-parchment-200
                               transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cool Vietnam */}
          <div>
            <h4 className="font-cinzel text-xs tracking-widest text-parchment-400 mb-4 uppercase">
              Được thực hiện bởi
            </h4>
            <div className="card-parchment p-4 bg-earth-500/30">
              <p className="font-cinzel text-parchment-200 font-semibold mb-1">Cool Vietnam</p>
              <p className="font-garamond text-parchment-300 text-sm leading-relaxed">
                Kết nối doanh nghiệp hiện đại với nghệ nhân làng nghề truyền thống. 
                Hộp game tre Thạch Xá – thủ công Việt Nam.
              </p>
              <a
                href="https://coolvietnam.myharavan.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs font-cinzel tracking-wider text-parchment-400
                           hover:text-parchment-200 transition-colors"
              >
                coolvietnam.myharavan.com →
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-ornate mb-6">
          <span>✦</span>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p className="font-garamond text-parchment-300/60 text-xs">
            © 2026 Bách Chiến Trận Đồ × Cool Vietnam. Mọi quyền được bảo lưu.
          </p>
          <p className="font-garamond text-parchment-300/40 text-xs italic">
            "Điều binh khiển tướng, kiến tạo lịch sử"
          </p>
        </div>
      </div>
    </footer>
  )
}
