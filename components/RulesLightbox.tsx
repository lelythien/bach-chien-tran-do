'use client'

import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

// Generic item interface — không ràng buộc vào type cũ
export interface LightboxItem {
  id: number
  title: string
  caption: string
  category: string
  aspect: 'landscape' | 'portrait' | 'square'
  span?: string
  imagePath?: string  // đường dẫn ảnh thật, nếu có
}

interface LightboxProps {
  items: LightboxItem[]
  currentIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

const CATEGORY_ICONS: Record<string, string> = {
  'gioi-thieu-co-truyen': '📜',
  'cach-chien-thang':     '🏆',
  'thuat-ngu':            '📖',
  'vat-dung':             '🎴',
  'loai-the-chi-so':      '⚔',
  'setup-ban-choi':       '🗺',
  'buoc-trong-luot':      '🔄',
  'co-che-giao-tranh':    '⚔',
  'luu-y-dac-biet':       '⚠',
  // legacy keys
  'gioi-thieu': '📜', 'luot-choi': '⚔', 'chien-dau': '🗡',
  'di-chuyen': '🏃', 'ky-nang': '✨', 'chien-thang': '🏆',
}

export default function RulesLightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [imgError, setImgError] = useState<Record<number, boolean>>({})

  const isOpen = currentIndex !== null
  const current = currentIndex !== null ? items[currentIndex] : null

  const goNext = useCallback(() => {
    if (currentIndex === null) return
    onNavigate((currentIndex + 1) % items.length)
    setZoomed(false)
  }, [currentIndex, items.length, onNavigate])

  const goPrev = useCallback(() => {
    if (currentIndex === null) return
    onNavigate((currentIndex - 1 + items.length) % items.length)
    setZoomed(false)
  }, [currentIndex, items.length, onNavigate])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); setZoomed(false) }
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose, goNext, goPrev])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const delta = touchStart - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) { delta > 0 ? goNext() : goPrev() }
    setTouchStart(null)
  }

  const aspectClass = current?.aspect === 'portrait' ? 'aspect-[3/4]'
    : current?.aspect === 'square' ? 'aspect-square' : 'aspect-[16/9]'

  const showRealImage = !!current?.imagePath && !imgError[current.id]

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(5,2,0,0.95)', backdropFilter: 'blur(8px)' }}
          onClick={() => { onClose(); setZoomed(false) }}
          onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        >
          {/* Ornaments */}
          <span className="fixed top-6 left-6 text-parchment-400/20 text-3xl pointer-events-none">❧</span>
          <span className="fixed top-6 right-16 text-parchment-400/20 text-3xl pointer-events-none" style={{ transform: 'scaleX(-1)' }}>❧</span>
          <span className="fixed bottom-10 left-6 text-parchment-400/20 text-3xl pointer-events-none" style={{ transform: 'rotate(180deg) scaleX(-1)' }}>❧</span>

          {/* Close */}
          <button onClick={() => { onClose(); setZoomed(false) }}
            className="fixed top-4 right-4 z-10 w-10 h-10 flex items-center justify-center
                       border border-parchment-400/40 hover:border-parchment-400 text-parchment-300
                       hover:text-parchment-200 rounded-sm bg-earth-600/80 transition-all"
            aria-label="Đóng"><X size={18} /></button>

          {/* Counter */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10">
            <span className="font-cinzel text-xs tracking-widest text-parchment-400/70">
              {(currentIndex ?? 0) + 1} / {items.length}
            </span>
          </div>

          {/* Main card */}
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl mx-12 md:mx-20 rounded-sm overflow-hidden
                       border border-parchment-400/30 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            style={{ background: '#1A0E06' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Image area */}
            <div
              className={`relative ${aspectClass} overflow-hidden cursor-zoom-in`}
              style={{ maxHeight: '72vh' }}
              onClick={() => setZoomed(z => !z)}
            >
              {showRealImage ? (
                <div className={`w-full h-full transition-transform duration-500 ${zoomed ? 'scale-150' : 'scale-100'}`}>
                  <Image
                    src={current.imagePath!}
                    alt={current.title}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    onError={() => setImgError(prev => ({ ...prev, [current.id]: true }))}
                  />
                </div>
              ) : (
                /* Fallback placeholder */
                <div className={`w-full h-full flex flex-col items-center justify-center p-8 transition-transform duration-500 ${zoomed ? 'scale-150' : 'scale-100'}`}
                     style={{ background: 'linear-gradient(135deg, #2A1C12, #1A0E06)' }}>
                  <div className="text-8xl mb-4 opacity-20">{CATEGORY_ICONS[current.category] ?? '📷'}</div>
                  <p className="font-cinzel text-parchment-300/40 text-sm tracking-[0.2em] uppercase">{current.title}</p>
                  <p className="font-garamond text-parchment-400/20 text-xs mt-3 italic">
                    {current.imagePath ? `Đang tải: ${current.imagePath}` : 'Chưa có ảnh'}
                  </p>
                </div>
              )}

              {/* Corner ornaments */}
              <span className="absolute top-2 left-2 text-parchment-400/20 text-lg z-10 pointer-events-none">✦</span>
              <span className="absolute top-2 right-2 text-parchment-400/20 text-lg z-10 pointer-events-none">✦</span>

              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 text-parchment-400/40 pointer-events-none">
                {zoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                <span className="font-cinzel text-[10px]">{zoomed ? 'Thu nhỏ' : 'Phóng to'}</span>
              </div>
            </div>

            {/* Caption */}
            <div className="px-5 py-3 border-t border-parchment-400/20 flex items-center justify-between gap-4"
                 style={{ background: 'rgba(10,5,2,0.7)' }}>
              <div className="min-w-0">
                <p className="font-cinzel text-sm text-parchment-200 tracking-wider truncate">{current.title}</p>
                <p className="font-garamond text-parchment-400 text-sm mt-0.5 line-clamp-2">{current.caption}</p>
              </div>
              <button onClick={() => setZoomed(z => !z)}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-parchment-400/30
                           hover:border-parchment-400 text-parchment-400 hover:text-parchment-200 rounded-sm transition-all"
                aria-label="Zoom">
                {zoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
              </button>
            </div>
          </motion.div>

          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); goPrev() }}
            className="fixed left-1 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12
                       flex items-center justify-center border border-parchment-400/30 hover:border-parchment-400
                       text-parchment-400 hover:text-parchment-200 rounded-sm bg-earth-600/80 transition-all hover:scale-110"
            aria-label="Ảnh trước"><ChevronLeft size={20} /></button>

          {/* Next */}
          <button onClick={e => { e.stopPropagation(); goNext() }}
            className="fixed right-1 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12
                       flex items-center justify-center border border-parchment-400/30 hover:border-parchment-400
                       text-parchment-400 hover:text-parchment-200 rounded-sm bg-earth-600/80 transition-all hover:scale-110"
            aria-label="Ảnh tiếp theo"><ChevronRight size={20} /></button>

          {/* Thumbnail strip */}
          <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 max-w-[80vw] overflow-x-auto px-2">
            {items.map((item, i) => (
              <button key={item.id}
                onClick={e => { e.stopPropagation(); onNavigate(i); setZoomed(false) }}
                className={`flex-shrink-0 w-9 h-9 rounded-sm border flex items-center justify-center text-sm
                            transition-all duration-200
                            ${i === currentIndex
                              ? 'border-parchment-400 bg-parchment-400/20 scale-110'
                              : 'border-parchment-400/20 bg-earth-600/50 hover:border-parchment-400/50'}`}
                aria-label={item.title}>
                <span>{CATEGORY_ICONS[item.category] ?? '📷'}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
