'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CrossedSwords from '@/components/CrossedSwords'

export default function LoadingScreen() {
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar
    const steps = [20, 45, 70, 90, 100]
    const timers: NodeJS.Timeout[] = []
    steps.forEach((p, i) => {
      timers.push(setTimeout(() => setProgress(p), i * 220))
    })
    // Hide after completion
    timers.push(setTimeout(() => setShow(false), steps.length * 220 + 300))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="loading-screen"
          aria-label="Đang tải..."
          role="status"
        >
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")` }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center gap-6 px-8 text-center"
          >
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 180 }}
              aria-hidden="true"
            >
              <CrossedSwords size={72} />
            </motion.div>

            {/* Title */}
            <div>
              <p className="font-cinzel font-black text-earth-500 text-2xl sm:text-3xl tracking-[0.12em] leading-tight">
                BÁCH CHIẾN
              </p>
              <p className="font-cinzel font-black text-parchment-400 text-2xl sm:text-3xl tracking-[0.12em]">
                TRẬN ĐỒ
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 w-48">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-parchment-400/60" />
              <span className="text-parchment-400 text-xs">⚜</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-parchment-400/60" />
            </div>

            {/* Progress bar */}
            <div className="w-56 sm:w-72">
              <div className="w-full h-1.5 rounded-full bg-parchment-300/30 overflow-hidden border border-parchment-400/20">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--red-son), var(--gold))' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Loading text */}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="font-cinzel text-[10px] tracking-[0.3em] text-earth-300/70 uppercase"
            >
              Đang triệu tập chiến tướng...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
