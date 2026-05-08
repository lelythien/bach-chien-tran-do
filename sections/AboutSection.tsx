'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const STATS = [
  { num: '2',   label: 'Người chơi', sub: 'Đại Việt vs Mông Nguyên' },
  { num: "45'", label: 'Mỗi ván',    sub: 'Thời gian chơi' },
  { num: '12+', label: 'Độ tuổi',    sub: 'Phù hợp' },
]

const HIGHLIGHTS = [
  { icon: '🗺',  label: 'Bản đồ vải canvas' },
  { icon: '🏯', label: 'Hộp tre Thạch Xá thủ công' },
]


export default function AboutSection() {
  return (
    <section id="gioi-thieu" className="bg-parchment-texture py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-cinzel text-[10px] tracking-[0.4em] text-crimson-300 mb-3 uppercase">
            Giới thiệu
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }} className="section-title">
            Hồi sinh lịch sử<br />
            <span className="text-earth-300">qua từng quân bài</span>
          </motion.h2>
          <div className="divider-ornate max-w-xs mx-auto mt-4"><span>⚜</span></div>
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-parchment p-8 md:p-10 relative">
              {/* Corner ornaments */}
              {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map(pos => (
                <span key={pos} className={`absolute ${pos} text-parchment-400/50 text-lg`} aria-hidden="true">✦</span>
              ))}

              <p className="font-cinzel text-[10px] tracking-[0.3em] text-crimson-300 mb-4 uppercase">
                ⚔ Câu chuyện dự án
              </p>
              <h3 className="font-cinzel font-bold text-earth-500 text-xl md:text-2xl mb-5 leading-snug">
                Boardgame chiến thuật lấy cảm hứng từ thời Trần
              </h3>

              <div className="space-y-4 font-garamond text-earth-400 text-lg leading-relaxed">
                <p>
                  <strong className="text-earth-500">Bách Chiến Trận Đồ</strong> tái hiện những trận đánh
                  hào hùng của quân dân Đại Việt thời nhà Trần — chiến thắng lừng lẫy trước quân
                  Nguyên Mông xâm lược năm 1285.
                </p>
                <p>
                  Mỗi ván chơi, bạn đóng vai một vị tướng quân, điều binh khiển tướng, phân tích
                  địch tình và đưa ra những quyết định sinh tử trên chiến trường.
                </p>
                <p>
                  Kết hợp <strong className="text-earth-500">tư duy chiến thuật</strong> với kiến thức
                  lịch sử Việt Nam — không chỉ là trò chơi, mà là hành trình khám phá di sản dân tộc.
                </p>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-3 mt-6">
                {HIGHLIGHTS.map(h => (
                  <span key={h.label}
                    className="inline-flex items-center gap-1.5 font-cinzel text-xs tracking-wide
                               px-3 py-1.5 rounded-sm border border-parchment-400/50
                               text-earth-400 bg-parchment-100/60">
                    <span aria-hidden="true">{h.icon}</span>{h.label}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-parchment-400/50">
                {STATS.map(s => (
                  <div key={s.label} className="text-center">
                    <p className="font-cinzel font-bold text-crimson-300 text-2xl">{s.num}</p>
                    <p className="font-cinzel text-earth-500 text-xs font-semibold mt-0.5">{s.label}</p>
                    <p className="font-garamond text-earth-400/60 text-xs">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative"
          >
            {/* Main artwork box */}
            <div className="relative rounded-sm overflow-hidden border-2 border-parchment-400/50
                            shadow-parchment-xl aspect-[4/5]"
                 style={{ background: 'linear-gradient(135deg, #1A0E06 0%, #2A1C12 40%, #3B2A1E 100%)' }}>

              {/* Battle map grid overlay */}
              <div className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 60L60 0M-10 10L10-10M50 70L70 50' stroke='%23C9A36A' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px' }}
              />

              {/* Atmospheric glow */}
              <div className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(165,42,42,0.15) 0%, transparent 60%)' }} />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-8xl mb-6 drop-shadow-2xl" aria-hidden="true">
                  ⚔
                </motion.div>
                <p className="font-cinzel font-bold text-parchment-200 text-xl tracking-widest mb-2">
                  BÁCH CHIẾN TRẬN ĐỒ
                </p>
                <p className="font-garamond text-parchment-400/60 text-sm italic">
                  Chiến trường Đại Việt · 1285
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-parchment-400/50" />
                  <span className="text-parchment-400/40 text-xs">⚜</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-parchment-400/50" />
                </div>
              </div>

              {/* Corner decorations */}
              {[
                'top-4 left-4',
                'top-4 right-4 scale-x-[-1]',
                'bottom-4 left-4 rotate-180 scale-x-[-1]',
                'bottom-4 right-4 rotate-180',
              ].map(pos => (
                <span key={pos} className={`absolute ${pos} text-parchment-400/30 text-2xl`} aria-hidden="true">❧</span>
              ))}
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 card-parchment px-5 py-3 text-center shadow-parchment-xl"
            >
              <p className="font-cinzel text-[10px] tracking-widest text-crimson-300">THỦ CÔNG</p>
              <p className="font-cinzel font-bold text-earth-500 text-sm">Tre Thạch Xá</p>
            </motion.div>

            {/* CTA link */}
            <div className="mt-10 flex justify-center">
              <Link href="/rules" className="btn-earth text-sm">
                <span aria-hidden="true">📜</span>
                <span>Đọc luật chơi đầy đủ</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
