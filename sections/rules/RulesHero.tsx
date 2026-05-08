'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function DustParticle({ style }: { style: React.CSSProperties }) {
  return <div className="particle absolute" style={style} aria-hidden="true" />
}

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  width:  `${3 + (i % 4) * 2}px`,
  height: `${3 + (i % 4) * 2}px`,
  left:   `${(i * 17 + 5) % 94}%`,
  bottom: `${(i * 13 + 10) % 55}%`,
  animationDuration: `${4 + (i % 5) * 1.5}s`,
  animationDelay:    `${(i * 0.7) % 4}s`,
  opacity: 0.4,
} as React.CSSProperties))

export default function RulesHero() {
  const heroRef = useRef<HTMLElement>(null)
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const el = heroRef.current; if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setSpot({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [isMobile])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0E0804 0%, #1A0E06 40%, #2A1C12 70%, #3B2A1E 100%)' }}
      aria-label="Trang luật chơi Bách Chiến Trận Đồ"
    >
      {/* Spotlight */}
      {!isMobile && (
        <div className="spotlight-overlay"
          style={{ background: `radial-gradient(circle 420px at ${spot.x}% ${spot.y}%, rgba(201,163,106,0.07) 0%, transparent 70%)` }}
        />
      )}

      {/* Battle map grid */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cg fill='none' stroke='%23C9A36A' stroke-width='0.5'%3E%3Cpath d='M0 100 Q150 80 300 100 Q450 120 600 100'/%3E%3Cpath d='M0 200 Q150 180 300 200 Q450 220 600 200'/%3E%3Cpath d='M0 300 Q150 280 300 300 Q450 320 600 300'/%3E%3Cpath d='M0 400 Q150 380 300 400 Q450 420 600 400'/%3E%3Cpath d='M0 500 Q150 480 300 500 Q450 520 600 500'/%3E%3Cpath d='M100 0 Q80 150 100 300 Q120 450 100 600'/%3E%3Cpath d='M300 0 Q280 150 300 300 Q320 450 300 600'/%3E%3Cpath d='M500 0 Q480 150 500 300 Q520 450 500 600'/%3E%3Ccircle cx='100' cy='100' r='5'/%3E%3Ccircle cx='300' cy='200' r='5'/%3E%3Ccircle cx='500' cy='100' r='5'/%3E%3Ccircle cx='200' cy='400' r='5'/%3E%3Ccircle cx='400' cy='300' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '600px 600px',
        }}
      />

      {/* Animated fog */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: '20%', dur: 18, del: 0, col: 'rgba(165,42,42,0.07)' },
          { top: '55%', dur: 22, del: 5, col: 'rgba(201,163,106,0.06)' },
          { top: '78%', dur: 16, del: 9, col: 'rgba(122,78,45,0.05)' },
        ].map((f, i) => (
          <motion.div key={i} className="absolute w-full h-24 pointer-events-none"
            style={{ top: f.top, background: `linear-gradient(90deg, transparent, ${f.col} 40%, ${f.col} 60%, transparent)`, filter: 'blur(20px)' }}
            animate={{ x: ['-25%', '25%', '-25%'], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut', delay: f.del }}
          />
        ))}
      </div>

      {/* Particles */}
      {PARTICLES.map((style, i) => <DustParticle key={i} style={style} />)}

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="font-cinzel text-[10px] tracking-[0.45em] text-crimson-300 uppercase mb-6">
          Bách Chiến Trận Đồ · Hướng dẫn
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-cinzel font-black tracking-[0.12em] uppercase leading-none"
          style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            color: '#E8D7B9',
            textShadow: '0 0 60px rgba(201,163,106,0.35), 0 4px 24px rgba(0,0,0,0.9)',
          }}
        >
          LUẬT CHƠI
        </motion.h1>

        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="divider-ornate max-w-sm mx-auto my-7">
          <span className="text-parchment-400 text-xl" aria-hidden="true">⚜</span>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="font-garamond text-parchment-300/80 text-xl md:text-2xl italic max-w-xl mx-auto leading-relaxed"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          "Làm chủ chiến thuật. Điều binh như danh tướng."
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => document.getElementById('rules-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="btn-primary text-sm py-3.5 px-8"
            aria-label="Xem hình ảnh rulebook"
          >
            <span aria-hidden="true">📜</span>
            <span>Xem hình ảnh rulebook</span>
          </button>
          <Link href="/" className="btn-ghost text-sm py-3.5 px-6" aria-label="Quay về trang chủ">
            ← Trang chủ
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade to parchment */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
           style={{ background: 'linear-gradient(to bottom, transparent, #E8D7B9)' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-parchment-400/40 to-transparent" />
    </section>
  )
}
