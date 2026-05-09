'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth }           from '@/lib/authContext'
import { usePreorderCount }  from '@/lib/hooks/usePreorderCount'
import { usePreorderStatus } from '@/lib/hooks/usePreorderStatus'
import { createPreorder }    from '@/lib/services/firestoreService'
import LoginRequiredModal    from '@/components/LoginRequiredModal'
import CrossedSwords         from '@/components/CrossedSwords'

const ORDER_URL = process.env.NEXT_PUBLIC_ORDER_URL ?? 'https://coolvietnam.vn'

/* ── Faction Data ── */
const FACTIONS = [
  {
    id: 'daiviet',
    name: 'Đại Việt',
    icon: '🏯',
    tagline: 'Bảo vệ non sông',
    color: '#22c55e',
    colorDim: 'rgba(34,197,94,0.15)',
    border: 'rgba(34,197,94,0.45)',
    borderHover: 'rgba(34,197,94,0.8)',
    glow: 'rgba(34,197,94,0.3)',
    stats: [
      { label: 'Lực lượng',     value: '30 LL' },
      { label: 'Lương thực',   value: '30 LT' },
      { label: 'Max Cung thủ', value: '8 quân' },
    ],
    traits: ['Phòng thủ vững chắc', 'Chiến thuật linh hoạt', 'Địa lợi nhân hoà'],
    gradient: 'from-green-950/80 via-green-900/60 to-earth-600/80',
  },
  {
    id: 'mongol',
    name: 'Mông Nguyên',
    icon: '⚔',
    tagline: 'Chinh phục thiên hạ',
    color: '#ef4444',
    colorDim: 'rgba(239,68,68,0.15)',
    border: 'rgba(239,68,68,0.45)',
    borderHover: 'rgba(239,68,68,0.8)',
    glow: 'rgba(239,68,68,0.3)',
    stats: [
      { label: 'Lực lượng',    value: '45 LL' },
      { label: 'Lương thực',  value: '150 LT' },
      { label: 'Max Kỵ binh', value: '15 quân' },
    ],
    traits: ['Kỵ binh tốc chiến', 'Lương thực dồi dào', 'Tấn công bão táp'],
    gradient: 'from-red-950/80 via-red-900/60 to-earth-600/80',
  },
]

const GAME_COMPONENTS = [
  { icon: '🗺',  name: 'Bản đồ chiến trường', qty: '1 tờ canvas' },
  { icon: '🎴', name: '90 Thẻ binh',          qty: '90 thẻ' },
  { icon: '✨',  name: '60 Thẻ kỹ năng',      qty: '60 thẻ' },
  { icon: '👑', name: '12 Thẻ tướng',          qty: '12 thẻ' },
  { icon: '☁',  name: '12 Thẻ thời tiết',     qty: '12 thẻ' },
  { icon: '🔴',  name: '267 Token',            qty: '267 token' },
  { icon: '📦',  name: 'Hộp tre Thạch Xá',    qty: 'Thủ công' },
  { icon: '📖',  name: 'Rulebook bản in',      qty: '1 quyển' },
]


export default function OrderPreviewSection() {
  const { user }   = useAuth()
  const { count, goal, percent, loading: countLoading } = usePreorderCount()
  const { hasPreordered, loading: statusLoading }       = usePreorderStatus()

  const [submitting,  setSubmitting]  = useState(false)
  const [showLogin,   setShowLogin]   = useState(false)
  const [justOrdered, setJustOrdered] = useState(false)

  const handlePreorder = async () => {
    if (!user) { setShowLogin(true); return }
    if (hasPreordered || justOrdered) {
      toast('Bạn đã đặt trước rồi! ⚔', {
        style: { background: '#F4EBCF', color: '#3B2A1E', border: '1px solid #C9A36A' },
      })
      return
    }
    setSubmitting(true)
    try {
      const result = await createPreorder({ uid: user.uid, name: user.displayName ?? '', email: user.email ?? '' })
      if (result.alreadyExists) {
        toast('Bạn đã đặt trước rồi! ⚔', { style: { background: '#F4EBCF', color: '#3B2A1E', border: '1px solid #C9A36A' } })
        return
      }
      if (result.success) {
        setJustOrdered(true)
        toast.success('Đặt trước thành công! Cảm ơn chiến binh! ⚔', {
          duration: 5000,
          style: { background: '#F4EBCF', color: '#3B2A1E', border: '1px solid #C9A36A' },
        })
      } else toast.error('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally { setSubmitting(false) }
  }

  const isOrdered = hasPreordered || justOrdered
  const isLoading = countLoading || statusLoading

  return (
    <section
      id="order"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #2A1C12 0%, #1A0E06 100%)' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-parchment-400/40 to-transparent" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")` }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-cinzel text-[10px] tracking-[0.4em] text-parchment-400 mb-3 uppercase">
            Pre-order · Ưu đãi sớm
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }} className="section-title-light">
            Chọn phe của bạn<br />
            <span className="text-parchment-400">Tham chiến ngay hôm nay</span>
          </motion.h2>
          <div className="divider-ornate max-w-xs mx-auto mt-4"><span>⚜</span></div>
        </div>

        {/* ── Faction Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {FACTIONS.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative rounded-sm overflow-hidden cursor-default"
              style={{
                background: `linear-gradient(135deg, ${f.colorDim} 0%, rgba(26,14,6,0.85) 100%)`,
                border: `2px solid ${f.border}`,
                transition: 'all 0.35s ease',
              }}
              whileHover={{ y: -6 }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = f.borderHover
                el.style.boxShadow = `0 0 40px ${f.glow}, 0 12px 40px rgba(0,0,0,0.4)`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = f.border
                el.style.boxShadow = 'none'
              }}
            >
              {/* Header */}
              <div className="p-6 pb-4 flex items-center gap-4 border-b"
                   style={{ borderColor: `${f.color}30` }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0
                                border-2 transition-all duration-300"
                     style={{
                       background: `${f.colorDim}`,
                       borderColor: f.border,
                       boxShadow: `0 0 16px ${f.glow}`,
                     }}>
                  {f.icon}
                </div>
                <div>
                  <p className="font-cinzel font-black text-parchment-200 text-xl tracking-wider" style={{ color: f.color }}>{f.name}</p>
                  <p className="font-garamond text-parchment-300/60 text-sm italic">{f.tagline}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-0 border-b" style={{ borderColor: `${f.color}20` }}>
                {f.stats.map(s => (
                  <div key={s.label} className="text-center py-4 px-2 border-r last:border-r-0"
                       style={{ borderColor: `${f.color}20` }}>
                    <p className="font-cinzel font-bold text-lg" style={{ color: f.color }}>{s.value}</p>
                    <p className="font-garamond text-parchment-300/50 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Traits */}
              <div className="p-5 space-y-2">
                {f.traits.map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: f.color }}>✦</span>
                    <span className="font-garamond text-parchment-300/75 text-base">{t}</span>
                  </div>
                ))}
              </div>

              {/* Hover glow inner */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm"
                   style={{ boxShadow: `inset 0 0 40px ${f.colorDim}` }} />
            </motion.div>
          ))}
        </div>

        {/* ── Pre-order Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-sm border border-parchment-400/25 overflow-hidden mb-16"
          style={{ background: 'linear-gradient(135deg, rgba(201,163,106,0.06) 0%, rgba(26,14,6,0.85) 100%)' }}
        >
          <div className="h-0.5 bg-gradient-to-r from-crimson-400 via-parchment-400 to-crimson-400 opacity-70" />
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

              {/* Left: Stats & Progress */}
              <div>
                <h3 className="font-cinzel font-bold text-parchment-200 text-2xl mb-1">Bách Chiến Trận Đồ</h3>
                <p className="font-garamond text-parchment-300/55 text-base mb-8">
                  Hộp game thủ công Tre Thạch Xá — phiên bản First Edition
                </p>

                {/* Realtime progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-cinzel text-xs tracking-widest text-parchment-400">TIẾN ĐỘ PRE-ORDER</span>
                    <span className="font-cinzel font-bold text-parchment-400 text-xl">
                      {isLoading ? '...' : `${percent}%`}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-earth-500/50 overflow-hidden border border-parchment-400/20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: isLoading ? '0%' : `${percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                      className="progress-bar-fill h-full rounded-full"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-garamond text-parchment-300/60 text-sm">
                      {isLoading ? '...' : `${count} chiến binh ủng hộ`}
                    </span>
                    <span className="font-garamond text-parchment-300/40 text-sm">Mục tiêu: {goal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-parchment-400/20">
                  {[
                    { num: isLoading ? '...' : `${count}`, label: 'Chiến binh' },
                    { num: '21', label: 'Ngày còn lại' },
                    { num: isLoading ? '...' : `${percent}%`, label: 'Hoàn thành' },
                  ].map(({ num, label }) => (
                    <div key={label} className="text-center">
                      <p className="font-cinzel font-bold text-parchment-400 text-2xl">{num}</p>
                      <p className="font-garamond text-parchment-300/50 text-xs mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Alert */}
                <div className="mt-6 flex items-start gap-3 p-4 rounded-sm border border-crimson-300/30"
                     style={{ background: 'rgba(165,42,42,0.08)' }}>
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    className="text-crimson-300 mt-0.5 text-lg flex-shrink-0">🔥</motion.span>
                  <p className="font-garamond text-parchment-300/80 text-base leading-relaxed">
                    Chỉ còn <strong className="text-crimson-300">21 ngày</strong> để pre-order với giá ưu đãi.
                    Hỗ trợ làng nghề truyền thống Việt Nam!
                  </p>
                </div>
              </div>

              {/* Right: CTA */}
              <div className="flex flex-col gap-5 justify-center">
                <div>
                  <p className="font-cinzel text-xs tracking-widest text-parchment-400 mb-4">BAO GỒM TRONG HỘP</p>
                  <ul className="space-y-2.5">
                    {[
                      'Hộp game tre Thạch Xá thủ công',
                      'Bộ quân bài 120 tướng lĩnh',
                      'Bản đồ chiến trận vải canvas',
                      'Sổ tay lịch sử độc quyền',
                      'Tặng kèm phiên bản Kickstarter',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-parchment-400 mt-0.5 text-sm flex-shrink-0">✦</span>
                        <span className="font-garamond text-parchment-300/80 text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <div className="flex items-end gap-3 mb-1">
                    <span className="font-cinzel font-bold text-parchment-200 text-3xl">419.000đ</span>
                    <span className="font-cinzel text-crimson-300 text-sm tracking-widest uppercase mb-1">Giá ưu đãi</span>
                  </div>
                  <AnimatePresence mode="wait">
                    {isOrdered ? (
                      <motion.div key="ordered"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center gap-3 py-4 px-6 rounded-sm border border-parchment-400/50"
                        style={{ background: 'rgba(201,163,106,0.12)' }}>
                        <CheckCircle className="text-parchment-400" size={20} />
                        <span className="font-cinzel text-parchment-400 text-sm tracking-wider">Đã đặt trước ✓</span>
                      </motion.div>
                    ) : (
                      <motion.button key="preorder"
                        onClick={handlePreorder}
                        disabled={submitting || statusLoading}
                        className="btn-primary justify-center py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                        whileTap={{ scale: 0.97 }}>
                        {submitting
                          ? <><Loader size={16} className="animate-spin" /><span>Đang xử lý...</span></>
                          : <><CrossedSwords size={16} /><span>Pre-order — Ưu đãi sớm</span></>
                        }
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
                     className="btn-secondary justify-center py-3.5 text-sm">
                    <span>🛒</span><span>Order chính thức tại Cool Vietnam</span>
                  </a>

                  {!user && (
                    <p className="text-center font-garamond text-parchment-300/40 text-xs">
                      Đăng nhập để pre-order và theo dõi đơn hàng
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="h-0.5 bg-gradient-to-r from-crimson-400 via-parchment-400 to-crimson-400 opacity-50" />
        </motion.div>

        {/* ── Components Showcase ── */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <p className="font-cinzel text-[10px] tracking-[0.35em] text-parchment-400 uppercase mb-3">Thành phần hộp game</p>
            <h3 className="font-cinzel font-bold text-parchment-200 text-xl">
              Mọi thứ bạn cần cho một trận chiến
            </h3>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-3">
            {GAME_COMPONENTS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative rounded-sm overflow-hidden cursor-default
                           border border-parchment-400/20 hover:border-parchment-400/50
                           transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(201,163,106,0.07), rgba(26,14,6,0.8))' }}
                whileHover={{ y: -4, scale: 1.05 }}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5
                                bg-earth-600 border border-parchment-400/40 rounded-sm
                                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                pointer-events-none whitespace-nowrap">
                  <p className="font-cinzel text-[10px] text-parchment-400 tracking-wider">{c.qty}</p>
                </div>

                <div className="p-3 text-center">
                  <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
                  <p className="font-garamond text-parchment-300/70 text-[11px] leading-tight">{c.name}</p>
                </div>

                {/* Bronze shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                     style={{ background: 'linear-gradient(135deg, rgba(201,163,106,0.08) 0%, transparent 60%)' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginRequiredModal isOpen={showLogin} onClose={() => setShowLogin(false)}
        message="Bạn cần đăng nhập để đặt trước. Chỉ mất vài giây!" />
    </section>
  )
}
