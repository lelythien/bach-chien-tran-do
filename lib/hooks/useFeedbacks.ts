'use client'

import { useEffect, useState } from 'react'
import { getApprovedFeedbacks, FeedbackDoc } from '@/lib/services/firestoreService'

interface FeedbacksState {
  feedbacks: FeedbackDoc[]
  loading:   boolean
}

/** Fetch approved feedbacks once on mount, with 4s timeout fallback */
export function useFeedbacks(limitCount = 6): FeedbacksState {
  const [feedbacks, setFeedbacks] = useState<FeedbackDoc[]>([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    let done = false

    // Timeout: if Firestore doesn't respond in 4s, show fallback
    const timer = setTimeout(() => {
      if (!done) {
        done = true
        setLoading(false)
      }
    }, 4000)

    getApprovedFeedbacks(limitCount)
      .then(data => {
        if (!done) {
          done = true
          setFeedbacks(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!done) {
          done = true
          setLoading(false)
        }
      })

    return () => clearTimeout(timer)
  }, [limitCount])

  return { feedbacks, loading }
}
