'use client'

import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, getCountFromServer } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const GOAL = Number(process.env.NEXT_PUBLIC_PREORDER_GOAL ?? 1000)

interface PreorderCountState {
  count:    number
  goal:     number
  percent:  number
  loading:  boolean
}

/**
 * Real-time preorder count via Firestore onSnapshot listener.
 * Automatically updates whenever a new preorder is created.
 */
export function usePreorderCount(): PreorderCountState {
  const [count,   setCount]   = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = collection(db, 'preorders')

    const unsubscribe = onSnapshot(q, (snap) => {
      setCount(snap.size)
      setLoading(false)
    }, (err) => {
      console.error('[usePreorderCount]', err)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const rawPercent = Math.min((count / GOAL) * 100, 100)
  // Show 1 decimal if < 1%, otherwise round to nearest int
  const percent = rawPercent < 1 && rawPercent > 0
    ? parseFloat(rawPercent.toFixed(1))
    : Math.round(rawPercent)

  return {
    count,
    goal:    GOAL,
    percent,
    loading,
  }
}
