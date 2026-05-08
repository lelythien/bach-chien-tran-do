'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { NAV_SECTIONS } from '@/lib/rulesData'

export default function RulesSidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_SECTIONS[0].anchor)
  const [mobileOpen, setMobileOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )
    NAV_SECTIONS.forEach(({ anchor }) => {
      const el = document.getElementById(anchor)
      if (el) observerRef.current!.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [])

  const scrollTo = (anchor: string) => {
    const el = document.getElementById(anchor)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const active = NAV_SECTIONS.find(s => s.anchor === activeId)

  return (
    <>
      {/* Desktop: fixed right panel on xl+ */}
      <aside className="hidden xl:block fixed right-6 top-24 z-30 w-52">
        <div className="card-parchment p-4 rounded-sm">
          <p className="font-cinzel text-[10px] tracking-[0.25em] text-crimson-300 uppercase mb-3">Mục lục</p>
          <nav className="space-y-0.5">
            {NAV_SECTIONS.map((s, i) => {
              const isActive = activeId === s.anchor
              return (
                <motion.button
                  key={s.anchor}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(s.anchor)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm text-left
                             transition-all duration-200
                             ${isActive ? 'bg-earth-500 text-parchment-200' : 'text-earth-400 hover:bg-earth-500/10 hover:text-earth-500'}`}
                >
                  <span className="text-sm flex-shrink-0">{s.icon}</span>
                  <span className="font-cinzel text-[11px] tracking-wide leading-tight flex-1">{s.label}</span>
                  {isActive && (
                    <motion.span layoutId="sidebar-dot" className="w-1.5 h-1.5 rounded-full bg-parchment-400 flex-shrink-0" />
                  )}
                </motion.button>
              )
            })}
          </nav>
          <div className="mt-4 pt-3 border-t border-parchment-400/30">
            <p className="font-garamond text-earth-400/50 text-xs italic text-center leading-snug">
              "Biết người biết ta,<br />trăm trận trăm thắng"
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile: floating bottom dropdown */}
      <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-sm">
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-sm
                     border border-parchment-400/50 shadow-parchment-lg font-cinzel text-sm text-parchment-200"
          style={{ background: 'rgba(42,28,18,0.95)', backdropFilter: 'blur(8px)' }}
        >
          <span className="flex items-center gap-2 truncate">
            <span>{active?.icon}</span>
            <span className="text-xs tracking-wider truncate">{active?.label}</span>
          </span>
          <ChevronDown size={16} className={`text-parchment-400 flex-shrink-0 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-2 left-0 right-0 rounded-sm overflow-hidden
                         border border-parchment-400/40 shadow-parchment-lg"
              style={{ background: 'rgba(42,28,18,0.97)', backdropFilter: 'blur(8px)' }}
            >
              {NAV_SECTIONS.map(s => (
                <button
                  key={s.anchor}
                  onClick={() => scrollTo(s.anchor)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left border-b border-parchment-400/10 last:border-0
                             transition-colors ${activeId === s.anchor ? 'bg-earth-500/30 text-parchment-200' : 'text-parchment-300 hover:bg-earth-500/20'}`}
                >
                  <span className="text-sm">{s.icon}</span>
                  <span className="font-cinzel text-xs tracking-wider flex-1">{s.label}</span>
                  {activeId === s.anchor && <span className="w-1.5 h-1.5 rounded-full bg-parchment-400" />}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
