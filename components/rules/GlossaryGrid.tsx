'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GLOSSARY_TERMS } from '@/lib/rulesData'

export default function GlossaryGrid() {
  const [tooltip, setTooltip] = useState<string | null>(null)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {GLOSSARY_TERMS.map((term, i) => (
          <motion.div
            key={term.abbr}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="relative"
            onMouseEnter={() => setTooltip(term.abbr)}
            onMouseLeave={() => setTooltip(null)}
            onFocus={() => setTooltip(term.abbr)}
            onBlur={() => setTooltip(null)}
          >
            {/* Card */}
            <div
              className="card-parchment rounded-sm p-4 text-center cursor-pointer select-none
                         transition-all duration-300 hover:-translate-y-1
                         hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
              style={{ borderTop: `3px solid ${term.color}` }}
              tabIndex={0}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center text-xl mx-auto mb-2"
                style={{ background: `${term.color}18`, border: `1px solid ${term.color}40` }}
              >
                {term.icon}
              </div>

              {/* Abbreviation */}
              <p
                className="font-cinzel font-black text-2xl tracking-widest mb-0.5"
                style={{ color: term.color }}
              >
                {term.abbr}
              </p>

              {/* Full name */}
              <p className="font-cinzel text-[11px] tracking-wide text-earth-400 leading-tight">
                {term.fullName}
              </p>

              {/* Hover hint */}
              <div className="mt-2 w-4 h-px mx-auto transition-all duration-300 group-hover:w-8"
                   style={{ background: term.color }} />
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {tooltip === term.abbr && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
                             w-56 rounded-sm p-3 shadow-parchment-lg pointer-events-none"
                  style={{
                    background: '#F4EBCF',
                    border: `1px solid ${term.color}60`,
                  }}
                >
                  {/* Arrow */}
                  <div
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                    style={{ background: '#F4EBCF', border: `1px solid ${term.color}60`, borderTop: 'none', borderLeft: 'none' }}
                  />
                  <p className="font-cinzel text-xs font-bold mb-1" style={{ color: term.color }}>
                    {term.abbr} — {term.fullName}
                  </p>
                  <p className="font-garamond text-earth-500 text-sm leading-snug">
                    {term.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Legend note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center font-garamond text-earth-400/60 text-sm italic mt-4"
      >
        Di chuyển chuột vào từng thẻ để xem giải thích chi tiết
      </motion.p>
    </div>
  )
}
