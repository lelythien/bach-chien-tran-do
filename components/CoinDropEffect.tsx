'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Coin {
  id: number
  x: number
  rotate: number
  delay: number
  duration: number
}

export default function CoinDropEffect({ trigger }: { trigger: boolean }) {
  const [coins, setCoins] = useState<Coin[]>([])
  const fired = useRef(false)

  useEffect(() => {
    if (!trigger || fired.current) return
    fired.current = true
    const newCoins: Coin[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 30 + Math.random() * 40,          // spread across 30–70% of container
      rotate: -30 + Math.random() * 60,
      delay: i * 0.06,
      duration: 0.8 + Math.random() * 0.4,
    }))
    setCoins(newCoins)
    const t = setTimeout(() => setCoins([]), 2500)
    return () => clearTimeout(t)
  }, [trigger])

  return (
    <AnimatePresence>
      {coins.map(c => (
        <motion.div
          key={c.id}
          initial={{ opacity: 1, y: 0, rotate: c.rotate, scale: 1 }}
          animate={{ opacity: 0, y: -120, rotate: c.rotate + 180, scale: 0.4 }}
          exit={{}}
          transition={{ duration: c.duration, delay: c.delay, ease: [0.2, 0, 0.8, 1] }}
          className="absolute pointer-events-none z-50 text-xl select-none"
          style={{ left: `${c.x}%`, bottom: '100%' }}
          aria-hidden="true"
        >
          🪙
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
