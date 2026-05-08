'use client'

import { useAuth } from '@/lib/authContext'
import { usePathname } from 'next/navigation'

const BREADCRUMBS: Record<string, string> = {
  '/admin':           'Tổng quan',
  '/admin/preorders': 'Quản lý Preorder',
  '/admin/feedback':  'Duyệt Feedback',
  '/admin/content':   'Quản lý Nội dung',
  '/admin/rulebook':  'Quản lý Ảnh Rulebook',
  '/admin/settings':  'Cài đặt',
}

export default function AdminHeader() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const pageTitle = BREADCRUMBS[pathname] ?? 'Admin'

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <div className="admin-header-breadcrumb">
          <span className="admin-header-breadcrumb-root">⚔ Admin</span>
          <span className="admin-header-breadcrumb-sep">›</span>
          <span className="admin-header-breadcrumb-current">{pageTitle}</span>
        </div>
        <h1 className="admin-header-title">{pageTitle}</h1>
      </div>

      <div className="admin-header-right">
        {/* User info */}
        {user && (
          <div className="admin-header-user">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName ?? ''}
                className="admin-header-avatar"
              />
            )}
            <div className="admin-header-user-info">
              <span className="admin-header-user-name">{user.displayName}</span>
              <span className="admin-header-user-role">Tổng quản</span>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="admin-header-logout"
          title="Đăng xuất"
        >
          ⎋ Thoát
        </button>
      </div>
    </header>
  )
}
