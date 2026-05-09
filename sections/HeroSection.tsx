'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import CrossedSwords from '@/components/CrossedSwords'

// Stable particles
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  style: {
    width:  `${3 + (i % 5) * 2}px`,
    height: `${3 + (i % 5) * 2}px`,
    left:   `${5 + (i * 5.3) % 92}%`,
    bottom: `${(i * 7) % 45}%`,
    animationDuration: `${5 + (i % 5) * 2}s`,
    animationDelay:    `${(i * 0.6) % 5}s`,
    opacity: 0.25 + (i % 4) * 0.08,
  } as React.CSSProperties,
}))

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  const heroRef   = useRef<HTMLElement>(null)
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const [isMobile, setIsMobile] = useState(false)
  const [showSticky, setShowSticky] = useState(false)

  /* Detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* Spotlight effect (desktop) */
  useEffect(() => {
    if (isMobile) return
    const el = heroRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setSpot({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [isMobile])

  /* Show sticky CTA after hero scrolled past */
  useEffect(() => {
    const onScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? 600
      setShowSticky(window.scrollY > heroHeight * 0.6)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToNext = () => {
    document.getElementById('gioi-thieu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%,  rgba(122,78,45,0.55) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 100%, rgba(165,42,42,0.22) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 50%,  rgba(165,42,42,0.10) 0%, transparent 45%),
            linear-gradient(180deg, #1A0E06 0%, #0E0804 100%)
          `,
        }}
      >
        {/* ── Spotlight overlay (desktop) ── */}
        {!isMobile && (
          <div
            className="spotlight-overlay"
            style={{
              background: `radial-gradient(circle 500px at ${spot.x}% ${spot.y}%, rgba(201,163,106,0.06) 0%, transparent 70%)`,
            }}
          />
        )}

        {/* ── Noise texture ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* ── Animated fog layers ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { top: '15%', dur: 18, del: 0, col: 'rgba(201,163,106,0.08)' },
            { top: '45%', dur: 24, del: 4, col: 'rgba(122,78,45,0.06)'   },
            { top: '72%', dur: 20, del: 8, col: 'rgba(165,42,42,0.05)'   },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-28 pointer-events-none"
              style={{
                top: f.top,
                background: `linear-gradient(90deg, transparent 0%, ${f.col} 30%, ${f.col} 70%, transparent 100%)`,
                filter: 'blur(24px)',
              }}
              animate={{ x: ['-25%', '25%', '-25%'], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut', delay: f.del }}
            />
          ))}
        </div>

        {/* ── Particles ── */}
        {PARTICLES.map((p, i) => (
          <div key={i} className="particle" style={p.style} />
        ))}

        {/* ── Top ornament ── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-parchment-400/50 to-transparent" />

        {/* ── Corner decorations ── */}
        <span className="absolute top-6 left-6 text-parchment-400/40 text-3xl font-cinzel select-none">❧</span>
        <span className="absolute top-6 right-6 text-parchment-400/40 text-3xl font-cinzel select-none" style={{ transform: 'scaleX(-1)' }}>❧</span>
        <span className="absolute bottom-16 left-6 text-parchment-400/25 text-2xl select-none">✦</span>
        <span className="absolute bottom-16 right-6 text-parchment-400/25 text-2xl select-none">✦</span>

        {/* ── Content ── */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-28 flex flex-col items-center text-center">

          {/* Pre-title */}
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-parchment-400/70" />
            <span className="font-cinzel text-[10px] tracking-[0.35em] text-parchment-400 uppercase">
              Boardgame Chiến Thuật Lịch Sử
            </span>
            <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-parchment-400/70" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            custom={0.15} initial="hidden" animate="visible" variants={fadeUp}
            className="font-cinzel font-black text-parchment-200 leading-none mb-3
                       text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
            style={{
              textShadow: '0 0 80px rgba(201,163,106,0.35), 0 4px 24px rgba(0,0,0,0.9)',
              letterSpacing: '0.06em',
            }}
          >
            BÁCH CHIẾN
            <br />
            <span className="text-parchment-400 block mt-3"
                  style={{ textShadow: '0 0 50px rgba(201,163,106,0.6)' }}>
              TRẬN ĐỒ
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div custom={0.3} initial="hidden" animate="visible" variants={fadeUp}
            className="flex items-center gap-3 my-5">
            <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-parchment-400/50" />
            <span className="text-parchment-400 text-xl">⚜</span>
            <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-parchment-400/50" />
          </motion.div>

          {/* Sub-title */}
          <motion.p custom={0.4} initial="hidden" animate="visible" variants={fadeUp}
            className="font-cinzel text-parchment-400 tracking-[0.2em] text-sm sm:text-base mb-5">
            Kháng chiến chống Mông Nguyên · Năm 1285
          </motion.p>

          {/* Description */}
          <motion.p custom={0.52} initial="hidden" animate="visible" variants={fadeUp}
            className="font-garamond text-parchment-300/75 text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto mb-10">
            Tái hiện những trận chiến lịch sử bằng chiến thuật, điều binh và tư duy quân sự.
            Mỗi quân bài là một tướng lĩnh — mỗi nước đi là quyết định sinh tử.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div custom={0.65} initial="hidden" animate="visible" variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#order"
              onClick={e => { e.preventDefault(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-primary w-full sm:w-auto justify-center py-4 px-8 text-sm"
              aria-label="Pre-order ngay"
            >
              <CrossedSwords size={18} />
              <span>Pre-order — Ưu đãi sớm</span>
            </a>
            <Link
              href="/rules"
              className="btn-ghost w-full sm:w-auto justify-center py-4 px-8 text-sm"
              aria-label="Xem luật chơi"
            >
              <span>📜</span>
              <span>Xem luật chơi</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div custom={0.8} initial="hidden" animate="visible" variants={fadeUp}
            className="flex items-center justify-center gap-8 sm:gap-16 mt-14 pt-8
                       border-t border-parchment-400/20">
            {[
              { num: '247+', label: 'Pre-orders' },
              { num: '1285',  label: 'Năm lịch sử' },
              { num: '100%', label: 'Thủ công Việt' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="font-cinzel font-bold text-parchment-400 text-2xl sm:text-3xl">{num}</p>
                <p className="font-garamond text-parchment-300/55 text-xs tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={scrollToNext}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1
                     text-parchment-400/50 hover:text-parchment-400 transition-colors cursor-pointer"
          style={{ animation: 'float 3s ease-in-out infinite' }}
          aria-label="Cuộn xuống"
        >
          <span className="font-cinzel text-[10px] tracking-[0.3em]">CUỘN XUỐNG</span>
          <ChevronDown size={16} />
        </motion.button>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-parchment-400/30 to-transparent" />
      </section>

      {/* ── Mobile sticky CTA ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-sticky-cta md:hidden"
          >
            <a
              href="#order"
              onClick={e => { e.preventDefault(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-primary flex-1 justify-center py-3 text-xs"
            >
              <CrossedSwords size={14} /> Pre-order ngay
            </a>
            <Link href="/rules" className="btn-ghost flex-1 justify-center py-3 text-xs">
              📜 Luật chơi
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
