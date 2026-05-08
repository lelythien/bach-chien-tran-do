'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, BookOpen, ZoomIn } from 'lucide-react'
import Image from 'next/image'

// 13 trang rulebook theo thứ tự
const RULEBOOK_PAGES = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  filename: `page-${String(i + 1).padStart(3, '0')}.png`,
  label: `Trang ${i + 1}`,
}))

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({
  pages,
  index,
  onClose,
  onNavigate,
}: {
  pages: typeof RULEBOOK_PAGES
  index: number
  onClose: () => void
  onNavigate: (i: number) => void
}) {
  const page = pages[index]

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(Math.min(index + 1, pages.length - 1))
      if (e.key === 'ArrowLeft')  onNavigate(Math.max(index - 1, 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [index, onClose, onNavigate, pages.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'rgba(5, 2, 1, 0.96)' }}
      onClick={onClose}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <BookOpen size={16} className="text-parchment-400" />
          <span className="font-cinzel text-parchment-300 text-sm tracking-widest">
            {page.label} / {pages.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-sm border border-parchment-400/40
                     text-parchment-400 hover:text-parchment-100 hover:border-parchment-400 transition-all"
        >
          <X size={18} />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative w-full max-w-4xl mx-auto px-16"
        style={{ maxHeight: 'calc(100vh - 140px)' }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="relative"
            style={{ aspectRatio: '297/210' }}
          >
            <Image
              src={`/images/rules/${page.filename}`}
              alt={page.label}
              fill
              unoptimized
              className="object-contain rounded-sm shadow-2xl"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2" onClick={e => e.stopPropagation()}>
        <button
          onClick={() => onNavigate(Math.max(index - 1, 0))}
          disabled={index === 0}
          className="w-11 h-11 flex items-center justify-center rounded-sm border border-parchment-400/40
                     text-parchment-400 hover:text-parchment-100 hover:border-parchment-400
                     transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={22} />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2" onClick={e => e.stopPropagation()}>
        <button
          onClick={() => onNavigate(Math.min(index + 1, pages.length - 1))}
          disabled={index === pages.length - 1}
          className="w-11 h-11 flex items-center justify-center rounded-sm border border-parchment-400/40
                     text-parchment-400 hover:text-parchment-100 hover:border-parchment-400
                     transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 py-3 flex items-center gap-2 overflow-x-auto
                   scrollbar-thin"
        style={{ background: 'rgba(10,5,2,0.85)' }}
        onClick={e => e.stopPropagation()}
      >
        {pages.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onNavigate(i)}
            className={`flex-shrink-0 relative rounded-sm overflow-hidden transition-all duration-200
                        ${i === index
                          ? 'ring-2 ring-parchment-400 opacity-100 scale-105'
                          : 'opacity-40 hover:opacity-70'}`}
            style={{ width: 56, height: 40 }}
          >
            <Image
              src={`/images/rules/${p.filename}`}
              alt={p.label}
              fill
              unoptimized
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────
export default function RulesGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const handleNavigate = useCallback((i: number) => setLightboxIndex(i), [])

  return (
    <section id="rules-gallery" className="py-16 md:py-20" style={{ background: 'linear-gradient(180deg, #1A0E06 0%, #0F0704 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-cinzel text-xs tracking-[0.3em] text-crimson-300 uppercase mb-3"
          >
            Rulebook PDF
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Hình ảnh luật chơi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-garamond text-parchment-400/70 text-sm mt-3"
          >
            {RULEBOOK_PAGES.length} trang · Click vào trang để xem toàn màn hình
          </motion.p>
          <div className="divider-ornate max-w-xs mx-auto mt-4"><span>⚜</span></div>
        </div>

        {/* Grid — 4 cột đều nhau, aspect ratio cố định */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {RULEBOOK_PAGES.map((page, i) => (
            <motion.button
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
              whileHover={{ scale: 1.03, y: -2 }}
              onClick={() => setLightboxIndex(i)}
              className="group relative rounded-sm overflow-hidden cursor-pointer
                         border border-parchment-400/20 hover:border-parchment-400/60
                         transition-all duration-300 hover:shadow-[0_6px_24px_rgba(0,0,0,0.5)]"
              style={{ aspectRatio: '297/210' }}
            >
              {/* Ảnh */}
              <Image
                src={`/images/rules/${page.filename}`}
                alt={page.label}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />

              {/* Overlay khi hover */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2
                           opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                style={{ background: 'rgba(5,2,1,0.55)' }}
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full
                                border border-parchment-300/80 bg-earth-500/70">
                  <ZoomIn size={16} className="text-parchment-200" />
                </div>
              </div>

              {/* Badge số trang */}
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1
                              font-cinzel text-[10px] tracking-wider text-parchment-300/90 text-center
                              transition-colors"
                   style={{ background: 'linear-gradient(to top, rgba(5,2,1,0.85), transparent)' }}
              >
                {page.label}
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mt-6 font-garamond text-earth-400/50 text-xs italic"
        >
          Dùng phím ← → để điều hướng · Nhấn Esc để đóng
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            pages={RULEBOOK_PAGES}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
