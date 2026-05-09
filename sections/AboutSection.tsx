'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import CrossedSwords from '@/components/CrossedSwords'

const STATS = [
  { num: '2',   label: 'Người chơi', sub: 'Đại Việt vs Mông Nguyên' },
  { num: "45'", label: 'Mỗi ván',    sub: 'Thời gian chơi' },
  { num: '9+', label: 'Độ tuổi',    sub: 'Phù hợp' },
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

              <p className="font-cinzel text-[10px] tracking-[0.3em] text-crimson-300 mb-4 uppercase flex items-center gap-1.5">
                <CrossedSwords size={14} /> Câu chuyện dự án
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

          {/* Right — poster image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative"
          >
            {/* Poster image */}
            <div
              className="relative rounded-sm overflow-hidden shadow-parchment-xl"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(201,163,106,0.2)) drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
              }}
            >
              <Image
                src="/images/poster2.jpg"
                alt="Poster Bách Chiến Trận Đồ - Bộ Board Game"
                width={600}
                height={750}
                className="w-full h-auto rounded-sm"
                style={{ border: '2px solid rgba(201,163,106,0.3)', objectFit: 'cover' }}
              />
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
