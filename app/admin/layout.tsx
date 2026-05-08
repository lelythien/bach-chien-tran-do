'use client'

import { useAdminStats } from '@/lib/hooks/useAdminStats'
import AdminGuard from '@/components/admin/AdminGuard'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminGuard>
  )
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { feedbackPending } = useAdminStats()

  return (
    <div className="admin-layout">
      <AdminSidebar pendingFeedback={feedbackPending} />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  )
}
