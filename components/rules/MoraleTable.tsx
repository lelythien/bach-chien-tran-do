'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TT_TABLE } from '@/lib/rulesData'

function TTBar({ row, index }: { row: typeof TT_TABLE[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const barWidth = row.isLose ? 100 : ((row.max + row.min) / 2)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      className={`rounded-sm overflow-hidden transition-all duration-300 hover:scale-[1.01]
                  ${row.isLose ? 'ring-2 ring-crimson-300/60' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #F4EBCF, #E8D7B9)',
        border: `1px solid ${row.color}40`,
        boxShadow: row.isLose ? `0 0 20px ${row.color}30` : undefined,
      }}
    >
      <div className="flex items-stretch">
        {/* Left: TT range + label */}
        <div
          className="flex-shrink-0 w-28 md:w-32 flex flex-col items-center justify-center p-3 text-center"
          style={{ background: `${row.color}18`, borderRight: `2px solid ${row.color}40` }}
        >
          <p className="font-cinzel font-black text-sm" style={{ color: row.color }}>
            {row.range}
          </p>
          <p className="font-cinzel text-[10px] tracking-wider mt-1" style={{ color: row.color }}>
            {row.label}
          </p>
        </div>

        {/* Middle: progress bar + formula */}
        <div className="flex-1 p-3">
          {/* SM formula badge */}
          <div className="flex items-center gap-3 mb-2">
            <span
              className="font-cinzel font-bold text-sm px-3 py-0.5 rounded-sm"
              style={{
                background: row.isLose ? row.color : `${row.color}20`,
                color: row.isLose ? '#E8D7B9' : row.color,
                border: `1px solid ${row.color}60`,
              }}
            >
              SM = {row.smFormula}
            </span>

            {/* Penalty badges */}
            {row.movePenalty && (
              <span className="font-cinzel text-[10px] tracking-wide px-2 py-0.5 rounded-sm
                               bg-amber-100 text-amber-700 border border-amber-300">
                ⚡ Phạt di chuyển
              </span>
            )}
            {row.supplyPenalty && (
              <span className="font-cinzel text-[10px] tracking-wide px-2 py-0.5 rounded-sm
                               bg-red-100 text-red-700 border border-red-300">
                💸 Phạt nuôi quân
              </span>
            )}
            {row.isLose && (
              <span className="font-cinzel text-[10px] tracking-wide px-2 py-0.5 rounded-sm
                               bg-crimson-300/20 text-crimson-300 border border-crimson-300/50 animate-pulse">
                ☠ THUA CUỘC
              </span>
            )}
          </div>

          {/* Gradient progress bar */}
          {!row.isLose ? (
            <div className="relative h-2.5 rounded-full overflow-hidden"
                 style={{ background: 'rgba(59,42,30,0.1)' }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${row.color}80, ${row.color})`,
                }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${barWidth}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.09 + 0.3, ease: 'easeOut' }}
              />
            </div>
          ) : (
            <div className="h-2.5 rounded-full overflow-hidden"
                 style={{ background: `linear-gradient(90deg, ${row.color}, #521414)` }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)' }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              />
            </div>
          )}

          {/* Description */}
          <p className="font-garamond text-earth-400 text-sm mt-1.5 leading-snug">
            {row.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function MoraleTable() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 p-4 rounded-sm"
           style={{ background: 'linear-gradient(135deg, rgba(59,42,30,0.08), transparent)', border: '1px solid rgba(201,163,106,0.3)' }}>
        <span className="text-2xl">🔥</span>
        <div>
          <p className="font-garamond italic text-sm tracking-[0.12em] text-crimson-300 mb-0.5">Bảng tham chiếu</p>
          <p className="font-garamond font-semibold text-earth-500 text-base">Tinh thần (TT) ảnh hưởng đến Sức mạnh (SM)</p>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[7rem_1fr] md:grid-cols-[8rem_1fr] gap-0 mb-2 px-1">
        <p className="font-cinzel text-[10px] tracking-widest text-earth-400/60 uppercase">TT%</p>
        <p className="font-cinzel text-[10px] tracking-widest text-earth-400/60 uppercase">Công thức & Phạt</p>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {TT_TABLE.map((row, i) => (
          <TTBar key={row.range} row={row} index={i} />
        ))}
      </div>

      {/* Note */}
      <div className="mt-4 p-3 rounded-sm border-l-3"
           style={{ background: 'rgba(201,163,106,0.08)', borderLeft: '3px solid rgba(201,163,106,0.5)' }}>
        <p className="font-cinzel text-[10px] tracking-widest text-parchment-400 uppercase mb-1">Lưu ý</p>
        <p className="font-garamond text-earth-400 text-sm leading-relaxed">
          TT được tính lại mỗi lượt trong HĐ2 (Thu hoạch). Thiếu LT sẽ làm TT giảm nhanh.
          Khi TT = 0%, Đạo quân tan rã và người chơi đó thua ngay lập tức.
        </p>
      </div>
    </div>
  )
}
