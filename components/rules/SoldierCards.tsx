'use client'

import { motion } from 'framer-motion'
import { SOLDIER_TYPES } from '@/lib/rulesData'

const TERRAIN_ICONS: Record<string, string> = {
  'Đồng bằng': '🟫',
  'Rừng': '🌲',
  'Núi': '⛰',
  'Sông': '🌊',
  'Biển': '🌊',
  'Thành': '🏰',
}

function TerrainTag({ terrain }: { terrain: string }) {
  const parts = terrain.split(',').map(s => s.trim())
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {parts.map(p => {
        const key = Object.keys(TERRAIN_ICONS).find(k => p.includes(k))
        return (
          <span
            key={p}
            className="inline-flex items-center gap-0.5 font-garamond text-xs px-1.5 py-0.5 rounded-sm"
            style={{ background: 'rgba(59,42,30,0.08)', border: '1px solid rgba(59,42,30,0.15)' }}
          >
            {key && <span className="text-[11px]">{TERRAIN_ICONS[key]}</span>}
            <span className="text-earth-400">{p}</span>
          </span>
        )
      })}
    </div>
  )
}

function SoldierCard({ soldier, index }: { soldier: typeof SOLDIER_TYPES[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-sm overflow-hidden
                 transition-all duration-300 hover:-translate-y-2
                 hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]"
      style={{
        border: `2px solid ${soldier.color}40`,
        boxShadow: `0 4px 16px rgba(0,0,0,0.12)`,
      }}
    >
      {/* Token-style header */}
      <div
        className="relative flex flex-col items-center justify-center pt-6 pb-4 px-4"
        style={{ background: soldier.texture }}
      >
        {/* Bronze texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%),
                              radial-gradient(ellipse at 70% 70%, rgba(0,0,0,0.3) 0%, transparent 60%)`,
          }}
        />

        {/* Coin outer ring */}
        <div
          className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center
                     shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.4)]"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${soldier.color}dd, ${soldier.color}88)`,
            border: `3px solid rgba(255,255,255,0.2)`,
            boxShadow: `0 0 0 2px ${soldier.color}60, 0 4px 20px ${soldier.color}60`,
          }}
        >
          {/* Inner coin detail ring */}
          <div
            className="absolute inset-2 rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          />
          <span className="text-4xl relative z-10 drop-shadow-lg">{soldier.icon}</span>
        </div>

        {/* Count badge */}
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-sm z-10"
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: `1px solid ${soldier.color}60`,
          }}
        >
          <span className="font-cinzel font-black text-sm" style={{ color: soldier.color }}>
            {soldier.count}
          </span>
        </div>

        {/* Name */}
        <p className="relative z-10 mt-3 font-cinzel font-black text-parchment-200 text-base tracking-widest
                      drop-shadow-lg">
          {soldier.name}
        </p>
      </div>

      {/* Stats body */}
      <div
        className="flex-1 p-4 space-y-3"
        style={{ background: 'linear-gradient(180deg, #F4EBCF, #EDE0C4)' }}
      >
        {/* Special rule — highlighted */}
        <div
          className="rounded-sm p-2.5"
          style={{
            background: `${soldier.color}12`,
            border: `1px solid ${soldier.color}35`,
            borderLeft: `3px solid ${soldier.color}`,
          }}
        >
          <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: soldier.color }}>
            ✦ Đặc điểm
          </p>
          <p className="font-garamond text-earth-500 text-sm leading-snug">
            {soldier.specialRule}
          </p>
        </div>

        {/* Movement */}
        <div>
          <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-earth-400/70 mb-1">
            Di chuyển
          </p>
          <p className="font-garamond text-earth-500 text-xs leading-snug whitespace-nowrap overflow-hidden text-ellipsis">{soldier.movement}</p>
        </div>

        {/* Terrain */}
        <div>
          <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-earth-400/70 mb-1">
            Địa hình
          </p>
          <TerrainTag terrain={soldier.terrain} />
        </div>

        {/* Note */}
        {soldier.note && (
          <div className="pt-2 border-t border-parchment-400/40">
            <p className="font-garamond text-earth-400/80 text-sm italic">⚠ {soldier.note}</p>
          </div>
        )}
      </div>

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100
                   transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 30px ${soldier.color}15` }}
      />
    </motion.div>
  )
}

export default function SoldierCards() {
  return (
    <div>
      {/* Intro */}
      <div className="mb-6 p-4 rounded-sm"
           style={{ background: 'rgba(201,163,106,0.08)', border: '1px solid rgba(201,163,106,0.25)' }}>
        <p className="font-garamond text-earth-500 text-base leading-relaxed">
          Có <strong className="text-earth-500">5 loại lính</strong> trong hộp game, mỗi loại có vai trò chiến thuật riêng.
          Kết hợp đúng loại lính với địa hình và chiến thuật sẽ tạo ra lợi thế quyết định.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {SOLDIER_TYPES.map((soldier, i) => (
          <SoldierCard key={soldier.id} soldier={soldier} index={i} />
        ))}
      </div>

      {/* Upgrade note */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-5 p-4 rounded-sm flex items-start gap-3"
        style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.3)', borderLeft: '3px solid #D4A017' }}
      >
        <span className="text-xl flex-shrink-0">🛡</span>
        <div>
          <p className="font-cinzel text-xs font-bold text-gold-300 tracking-wider mb-1">
            Nâng cấp: Bộ binh → Cựu binh
          </p>
          <p className="font-garamond text-earth-500 text-base leading-relaxed">
            Gộp <strong>3 Bộ binh</strong> từ cùng một Toàn quân thành <strong>1 Cựu binh</strong> trong HĐ2.
            Cựu binh có <strong>SM × 3</strong> — mạnh nhất trên bộ. Giới hạn 10 Cựu binh trong toàn bộ ván chơi.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
