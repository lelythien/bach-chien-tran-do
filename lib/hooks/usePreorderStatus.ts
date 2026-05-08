'use client'

import { useEffect, useState } from 'react'
import { getPreorderByUid } from '@/lib/services/firestoreService'
import { useAuth } from '@/lib/authContext'

interface PreorderStatus {
  hasPreordered: boolean
  loading:       boolean
}

/** Checks if the currently logged-in user has already pre-ordered */
export function usePreorderStatus(): PreorderStatus {
  const { user } = useAuth()
  const [hasPreordered, setHasPreordered] = useState(false)
  const [loading,       setLoading]       = useState(false)

  useEffect(() => {
    if (!user) {
      setHasPreordered(false)
      return
    }

    setLoading(true)
    getPreorderByUid(user.uid)
      .then((doc) => setHasPreordered(!!doc))
      .finally(() => setLoading(false))
  }, [user])

  return { hasPreordered, loading }
}
