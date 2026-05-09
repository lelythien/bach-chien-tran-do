'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { RULE_PLACEHOLDERS } from '@/lib/constants'

export default function RulePreviewSection() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="luat-choi" className="bg-parchment-texture py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cinzel text-xs tracking-[0.3em] text-crimson-300 mb-3 uppercase"
          >
            Thư viện
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Giải mã kịch bản
            <br />
            <span className="text-earth-300">Bách Chiến Trận Đồ</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-garamond text-earth-400 text-lg max-w-xl mx-auto mt-4"
          >
            Tìm hiểu luật chơi qua hình ảnh minh họa trực quan và chi tiết.
          </motion.p>
          <div className="divider-ornate max-w-xs mx-auto mt-4">
            <span>⚜</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RULE_PLACEHOLDERS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`
                group relative overflow-hidden rounded-sm cursor-pointer
                border border-parchment-400/50 hover:border-parchment-400
                transition-all duration-300
              `}
              style={{
                aspectRatio: '4/3',
                background: 'linear-gradient(135deg, #3B2A1E 0%, #2A1C12 100%)',
              }}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center gap-2
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(59,42,30,0.6)' }}
              >
                <ZoomIn className="text-parchment-200" size={24} />
                <span className="font-cinzel text-parchment-200 text-sm tracking-wider">
                  Xem ảnh
                </span>
              </div>

              {/* Label */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(transparent, rgba(30,15,5,0.9))' }}
              >
                <p className="font-cinzel text-parchment-200 text-sm tracking-wider">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/rules" className="btn-earth inline-flex items-center gap-2">
            <span>📖</span>
            <span>Xem toàn bộ luật chơi</span>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(10,5,2,0.92)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full rounded-sm overflow-hidden border border-parchment-400/40"
              style={{
                background: 'linear-gradient(135deg, #2A1C12, #1A0E06)',
                aspectRatio: '4/3',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0">
                <Image
                  src={RULE_PLACEHOLDERS[lightbox].src}
                  alt={RULE_PLACEHOLDERS[lightbox].title}
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 text-parchment-300 hover:text-parchment-200
                           w-8 h-8 flex items-center justify-center rounded-sm
                           border border-parchment-400/30 hover:border-parchment-400
                           transition-all"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
