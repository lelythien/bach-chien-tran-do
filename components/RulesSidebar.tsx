'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import { NAV_SECTIONS } from '@/lib/rulesData'

export default function RulesSidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_SECTIONS[0].anchor)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopHover, setDesktopHover] = useState(false)
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
      <aside 
        className="hidden xl:flex fixed right-0 top-[12%] z-30 transition-transform duration-500 ease-out"
        onMouseEnter={() => setDesktopHover(true)}
        onMouseLeave={() => setDesktopHover(false)}
        style={{ transform: desktopHover ? 'translateX(0)' : 'translateX(calc(100% - 36px))' }}
      >
        {/* Handle / Trigger */}
        <div className="w-9 bg-[#1A0E06]/95 backdrop-blur-md border-y border-l border-parchment-400/20 rounded-l-md flex flex-col items-center justify-center py-6 shadow-[-4px_0_15px_rgba(0,0,0,0.5)] cursor-pointer">
          <span className="[writing-mode:vertical-lr] font-cinzel text-[12px] font-bold tracking-widest text-parchment-200 uppercase rotate-180">
            Mục lục
          </span>
          <ChevronLeft size={16} className={`mt-3 text-parchment-300 transition-transform duration-500 ${desktopHover ? 'rotate-180' : ''}`} />
        </div>

        {/* Content Area */}
        <div className="w-60 bg-[#1A0E06]/95 backdrop-blur-md border-y border-l border-parchment-400/20 p-5 shadow-[-8px_0_30px_rgba(0,0,0,0.6)]">
          <p className="font-cinzel text-[10px] tracking-[0.25em] text-crimson-300 uppercase mb-4 border-b border-parchment-400/10 pb-2">
            Nội dung
          </p>
          <nav className="space-y-1">
            {NAV_SECTIONS.map((s, i) => {
              const isActive = activeId === s.anchor
              return (
                <button
                  key={s.anchor}
                  onClick={() => scrollTo(s.anchor)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left
                             transition-all duration-200
                             ${isActive ? 'bg-parchment-400/10 text-parchment-200' : 'text-parchment-300/60 hover:bg-parchment-400/5 hover:text-parchment-300'}`}
                >
                  <span className="text-sm flex-shrink-0">{s.icon}</span>
                  <span className="font-cinzel text-[11px] tracking-wider leading-tight flex-1">{s.label}</span>
                  {isActive && (
                    <motion.span layoutId="sidebar-dot" className="w-1.5 h-1.5 rounded-full bg-crimson-400 flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </nav>
          <div className="mt-5 pt-4 border-t border-parchment-400/10">
            <p className="font-garamond text-parchment-300/30 text-xs italic text-center leading-relaxed">
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
