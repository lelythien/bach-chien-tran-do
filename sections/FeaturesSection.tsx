'use client'

import { motion } from 'framer-motion'
import { FEATURES } from '@/lib/constants'

export default function FeaturesSection() {
  return (
    <section
      id="tinh-nang"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #3B2A1E 0%, #2A1C12 100%)' }}
      aria-label="Điểm nổi bật"
    >
      {/* Top / bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-parchment-400/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-parchment-400/40 to-transparent" />

      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-cinzel text-[10px] tracking-[0.4em] text-parchment-400 mb-3 uppercase">
            Điểm nổi bật
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }} className="section-title-light">
            Tại sao chọn<br />
            <span className="text-parchment-400">Bách Chiến Trận Đồ?</span>
          </motion.h2>
          <div className="divider-ornate max-w-xs mx-auto mt-4"><span>⚜</span></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <div
                className="group relative h-full rounded-sm overflow-hidden
                           border border-parchment-400/20 hover:border-parchment-400/60
                           transition-all duration-400 cursor-default"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,163,106,0.07) 0%, rgba(42,28,18,0.7) 100%)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {/* Hover glow top */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,163,106,0.14) 0%, transparent 70%)' }}
                />

                <div className="relative p-8 text-center flex flex-col items-center gap-5">
                  {/* Icon ring */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl
                               border border-parchment-400/35 group-hover:border-parchment-400/80
                               transition-all duration-400 group-hover:shadow-gold-glow"
                    style={{ background: 'rgba(201,163,106,0.08)' }}
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </div>

                  <h3 className="font-cinzel font-bold text-parchment-200 text-lg leading-snug
                                 group-hover:text-parchment-400 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Expanding divider */}
                  <div className="w-10 h-px bg-parchment-400/35 group-hover:w-20 transition-all duration-400" />

                  <p className="font-garamond text-parchment-300/65 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px
                                bg-gradient-to-r from-transparent via-parchment-400/0 to-transparent
                                group-hover:via-parchment-400/50 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
