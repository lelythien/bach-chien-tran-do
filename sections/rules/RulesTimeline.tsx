'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TIMELINE_STEPS } from '@/lib/rulesData'

interface StepProps {
  step: typeof TIMELINE_STEPS[number]
  index: number
  total: number
  isLast: boolean
}

function TimelineStep({ step, index, isLast }: StepProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      {/* Vertical connector line (mobile) / hidden on desktop */}
      {!isLast && (
        <div className="lg:hidden absolute top-14 left-1/2 -translate-x-1/2 w-0.5 h-full -mb-2"
             style={{ background: 'linear-gradient(to bottom, rgba(201,163,106,0.5), transparent)', zIndex: 0 }} />
      )}

      {/* Step circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12, type: 'spring', stiffness: 200 }}
        className="relative z-10 flex items-center justify-center w-14 h-14 rounded-sm
                   border-2 shadow-parchment-lg"
        style={{
          background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
          borderColor: step.color,
          boxShadow: inView ? `0 0 20px ${step.color}40` : 'none',
        }}
      >
        <span className="text-2xl">{step.icon}</span>
      </motion.div>

      {/* Step number */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.1 }}
        className="mt-2 font-cinzel text-[10px] tracking-[0.3em] uppercase"
        style={{ color: step.color }}
      >
        Bước {step.step}
      </motion.div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.12 + 0.2 }}
        className="mt-3 card-parchment p-4 rounded-sm text-center max-w-[160px] lg:max-w-[200px]"
        style={{ borderTop: `2px solid ${step.color}` }}
      >
        <p className="font-cinzel font-bold text-earth-500 text-sm mb-1">{step.title}</p>
        <p className="font-garamond text-earth-400/70 text-xs italic mb-2">{step.subtitle}</p>
        <p className="font-garamond text-earth-400 text-sm leading-snug">
          {step.description}
        </p>
      </motion.div>
    </div>
  )
}

// Animated connector line between steps (desktop)
function Connector({ index, total, inView }: { index: number; total: number; inView: boolean }) {
  if (index >= total - 1) return null
  return (
    <div className="hidden lg:flex items-center justify-center flex-1 mt-7 px-2">
      <div className="relative w-full h-px overflow-hidden" style={{ background: 'rgba(201,163,106,0.2)' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.3, ease: 'easeOut' }}
          className="absolute inset-0 origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(201,163,106,0.8), rgba(165,42,42,0.6))' }}
        />
        {/* Arrow head */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.7 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1"
          style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid rgba(165,42,42,0.6)' }}
        />
      </div>
    </div>
  )
}

export default function RulesTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #2A1C12 0%, #1A0E06 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cinzel text-xs tracking-[0.3em] text-crimson-300 uppercase mb-3"
          >
            Trình tự chiến trận
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title-light"
          >
            Dòng chảy trận chiến
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="divider-ornate max-w-xs mx-auto mt-4"
          >
            <span>⚜</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-garamond text-parchment-300/70 text-lg mt-4 max-w-lg mx-auto italic"
          >
            Từ lúc triệu tập binh mã đến khi tiếng trống trận im bặt — đây là hành trình của một trận chiến.
          </motion.p>
        </div>

        {/* Timeline */}
        <div
          ref={sectionRef}
          className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-0"
        >
          {TIMELINE_STEPS.map((step, i) => (
            <div key={step.step} className="contents">
              {/* Mobile: vertical layout */}
              <div className="lg:hidden w-full max-w-xs mx-auto">
                <TimelineStep step={step} index={i} total={TIMELINE_STEPS.length} isLast={i === TIMELINE_STEPS.length - 1} />
                {i < TIMELINE_STEPS.length - 1 && (
                  <div className="flex justify-center my-4">
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.15 + 0.5 }}
                      className="text-parchment-400/40 text-xl"
                    >
                      ↓
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Desktop: horizontal layout */}
              <div className="hidden lg:block flex-1">
                <TimelineStep step={step} index={i} total={TIMELINE_STEPS.length} isLast={i === TIMELINE_STEPS.length - 1} />
              </div>
              <Connector index={i} total={TIMELINE_STEPS.length} inView={inView} />
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pt-12 border-t border-parchment-400/10"
        >
          <p className="font-garamond text-parchment-400/50 text-lg italic max-w-md mx-auto">
            "Mưu sâu kế hiểm, thắng địch không cần giao chiến"
          </p>
          <p className="font-cinzel text-parchment-400/30 text-xs tracking-widest mt-2">— Binh thư yếu lược</p>
        </motion.div>
      </div>
    </section>
  )
}
