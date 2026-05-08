'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  href:  string
  label: string
  icon:  string
  badge?: number
}

interface AdminSidebarProps {
  pendingFeedback?: number
}

const NAV_ITEMS: NavItem[] = [
  { href: '/admin',          label: 'Tổng quan',          icon: '⚔' },
  { href: '/admin/preorders', label: 'Quản lý Preorder',  icon: '📜' },
  { href: '/admin/feedback',  label: 'Duyệt Feedback',    icon: '💬' },
  { href: '/admin/content',   label: 'Quản lý Nội dung',  icon: '✍' },
  { href: '/admin/rulebook',  label: 'Ảnh Rulebook',      icon: '🖼' },
  { href: '/admin/settings',  label: 'Cài đặt',           icon: '⚙' },
]

export default function AdminSidebar({ pendingFeedback = 0 }: AdminSidebarProps) {
  const pathname  = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="admin-sidebar-logo">
        <span className="admin-sidebar-logo-icon">⚔</span>
        <div>
          <div className="admin-sidebar-logo-title">Bách Chiến</div>
          <div className="admin-sidebar-logo-sub">Phòng Tác Chiến</div>
        </div>
      </div>

      {/* Divider */}
      <div className="admin-sidebar-divider" />

      {/* Nav items */}
      <nav className="admin-sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href)
          const badge  = item.href === '/admin/feedback' ? pendingFeedback : 0
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`admin-nav-item ${active ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span className="admin-nav-label">{item.label}</span>
              {badge > 0 && (
                <span className="admin-nav-badge">{badge}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom back link */}
      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-sidebar-back">
          <span>←</span>
          <span>Về trang chủ</span>
        </Link>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="admin-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        className="admin-mobile-menu-btn"
        onClick={() => setOpen(true)}
        aria-label="Mở menu"
      >
        <span>☰</span>
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="admin-mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="admin-sidebar admin-sidebar-mobile"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <button
                className="admin-sidebar-close"
                onClick={() => setOpen(false)}
              >✕</button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
