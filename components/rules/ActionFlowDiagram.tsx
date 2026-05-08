'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ACTION_STEPS } from '@/lib/rulesData'

/* ── Sub-step flow for HĐ4 ── */
function SubStepFlow({ subSteps }: { subSteps: { label: string; desc: string }[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {subSteps.map((sub, i) => (
        <div key={sub.label} className="flex items-center gap-2">
          <div
            className="rounded-sm px-3 py-1.5 text-center"
            style={{ background: 'rgba(165,42,42,0.12)', border: '1px solid rgba(165,42,42,0.3)' }}
          >
            <p className="font-cinzel text-[10px] font-bold text-crimson-300 tracking-wide">{sub.label}</p>
            <p className="font-garamond text-earth-400 text-xs mt-0.5">{sub.desc}</p>
          </div>
          {i < subSteps.length - 1 && (
            <span className="text-crimson-300/60 text-sm font-bold">→</span>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Single action card ── */
function ActionCard({ step, index }: {
  step: typeof ACTION_STEPS[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-sm overflow-hidden shadow-parchment hover:shadow-parchment-lg
                 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'linear-gradient(135deg, #F4EBCF 0%, #EDE0C4 100%)',
        border: `2px solid ${step.color}50`,
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-4 px-5 py-3"
        style={{ background: `linear-gradient(135deg, ${step.color}25, ${step.color}08)` }}
      >
        {/* Icon badge */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-sm flex flex-col items-center justify-center border-2"
          style={{
            background: `linear-gradient(135deg, ${step.color}35, ${step.color}15)`,
            borderColor: step.color,
            boxShadow: `0 0 14px ${step.color}40`,
          }}
        >
          <span className="text-xl leading-none">{step.icon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="font-cinzel font-black text-xs tracking-[0.25em]"
            style={{ color: step.color }}
          >
            {step.number}
          </p>
          <p className="font-cinzel font-bold text-earth-500 text-base leading-tight">
            {step.title}
          </p>
          <p className="font-garamond text-earth-400 text-sm italic">{step.subtitle}</p>
        </div>
      </div>

      {/* Details list */}
      <div className="px-5 py-4">
        <ul className="space-y-2">
          {step.details.map((detail, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: index * 0.12 + i * 0.06 + 0.25 }}
              className="flex items-start gap-2.5"
            >
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                style={{ background: step.color }}
              />
              <span className="font-garamond text-earth-500 text-[15px] leading-snug">{detail}</span>
            </motion.li>
          ))}
        </ul>

        {/* Sub-steps only for HĐ4 */}
        {step.subSteps && <SubStepFlow subSteps={step.subSteps} />}
      </div>
    </motion.div>
  )
}

/* ── Connector arrow between cards ── */
function StepConnector({ fromColor, toColor, index }: {
  fromColor: string
  toColor: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 + 0.4, duration: 0.35 }}
      className="flex flex-col items-center gap-0 py-1"
    >
      <div
        className="w-0.5 h-5"
        style={{ background: `linear-gradient(to bottom, ${fromColor}, ${toColor})` }}
      />
      <div
        className="w-0 h-0"
        style={{
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: `8px solid ${toColor}`,
        }}
      />
    </motion.div>
  )
}

/* ── Main export ── */
export default function ActionFlowDiagram() {
  return (
    <div>
      {/* Intro note */}
      <div
        className="mb-6 p-4 rounded-sm"
        style={{ background: 'rgba(201,163,106,0.08)', border: '1px solid rgba(201,163,106,0.25)' }}
      >
        <p className="font-garamond text-earth-500 text-base leading-relaxed">
          Mỗi lượt chơi gồm <strong className="text-earth-500 font-semibold">4 hành động bắt buộc</strong> theo đúng thứ tự.
          Không được bỏ qua hoặc đảo ngược thứ tự. Tất cả người chơi thực hiện đồng thời trong <em>HĐ3</em>, lần lượt trong các hành động còn lại.
        </p>
      </div>

      {/* 2-column grid on md+, single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ACTION_STEPS.map((step, i) => (
          <ActionCard key={step.number} step={step} index={i} />
        ))}
      </div>

      {/* Flow order indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-5 flex items-center justify-center gap-3"
      >
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,163,106,0.4))' }} />
        <div className="flex items-center gap-2 px-4 py-2 rounded-sm card-parchment">
          {ACTION_STEPS.map((step, i) => (
            <div key={step.number} className="flex items-center gap-1.5">
              <span className="font-cinzel text-[11px] font-bold" style={{ color: step.color }}>
                {step.number}
              </span>
              {i < ACTION_STEPS.length - 1 && (
                <span className="text-earth-300 text-xs">→</span>
              )}
            </div>
          ))}
          <span className="font-cinzel text-[10px] tracking-wide text-earth-400 ml-2">→ lặp lại</span>
        </div>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,163,106,0.4))' }} />
      </motion.div>
    </div>
  )
}
