'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'

interface AdminGuardProps {
  children: React.ReactNode
}

/**
 * AdminGuard — wraps any admin page.
 * Redirects non-admin users to homepage.
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace('/')
    }
  }, [user, isAdmin, loading, router])

  // Loading state
  if (loading) {
    return (
      <div className="admin-guard-loading">
        <div className="admin-guard-spinner">
          <div className="admin-guard-emblem">⚔</div>
          <p>Đang xác thực quyền truy cập...</p>
        </div>
      </div>
    )
  }

  // Not authenticated or not admin
  if (!user || !isAdmin) {
    return null
  }

  return <>{children}</>
}
