'use client'

import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface AdminStats {
  preorderCount:  number
  feedbackTotal:  number
  feedbackPending: number
  userCount:      number
  loading:        boolean
}

/**
 * Real-time admin dashboard statistics.
 * Subscribes to 3 Firestore collections simultaneously.
 */
export function useAdminStats(): AdminStats {
  const [preorderCount,   setPreorderCount]   = useState(0)
  const [feedbackTotal,   setFeedbackTotal]   = useState(0)
  const [feedbackPending, setFeedbackPending] = useState(0)
  const [userCount,       setUserCount]       = useState(0)
  const [loading,         setLoading]         = useState(true)
  const [loaded,          setLoaded]          = useState({ p: false, f: false, u: false })

  useEffect(() => {
    // Preorders
    const unsubP = onSnapshot(collection(db, 'preorders'), (snap) => {
      setPreorderCount(snap.size)
      setLoaded(l => ({ ...l, p: true }))
    })

    // Feedbacks total + pending
    const unsubF = onSnapshot(collection(db, 'feedbacks'), (snap) => {
      setFeedbackTotal(snap.size)
      setFeedbackPending(snap.docs.filter(d => !d.data().approved).length)
      setLoaded(l => ({ ...l, f: true }))
    })

    // Users
    const unsubU = onSnapshot(collection(db, 'users'), (snap) => {
      setUserCount(snap.size)
      setLoaded(l => ({ ...l, u: true }))
    })

    return () => { unsubP(); unsubF(); unsubU() }
  }, [])

  useEffect(() => {
    if (loaded.p && loaded.f && loaded.u) setLoading(false)
  }, [loaded])

  return { preorderCount, feedbackTotal, feedbackPending, userCount, loading }
}
