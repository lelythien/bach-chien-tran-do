'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SITE_NAME } from '@/lib/constants'
import { useAuth } from '@/lib/authContext'
import CrossedSwords from '@/components/CrossedSwords'

export default function Navbar() {
  const { user, loginWithGoogle, logout, loading } = useAuth()
  const pathname = usePathname()
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  /* ── Scroll handler ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Close mobile on resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* ── Prevent body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    // All hrefs now start with '/' so this is mostly unused,
    // kept for safety
    if (href.startsWith('/')) return
    const id = href.replace('#', '')
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const isActivePage = (href: string) => href.startsWith('/') && pathname === href

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-earth-600/92 backdrop-blur-md border-b border-parchment-400/25 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16 md:h-20'}`}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="Trang chủ">
              <CrossedSwords
                size={scrolled ? 18 : 22}
                className="text-parchment-400 transition-transform group-hover:scale-110"
              />
              <span
                className="font-cinzel font-bold text-parchment-200 tracking-widest
                           group-hover:text-parchment-400 transition-colors"
                style={{ fontSize: scrolled ? '0.75rem' : '0.875rem', transition: 'font-size 0.3s ease' }}
              >
                {SITE_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7" role="navigation" aria-label="Menu chính">
              {NAV_LINKS.map((link) => {
                const isPage   = link.href.startsWith('/')
                const isActive = isActivePage(link.href)
                const isExt    = 'external' in link && link.external
                const cls = `relative font-cinzel text-xs tracking-widest transition-colors group
                             ${isActive
                               ? 'text-parchment-400 font-bold'
                               : 'text-parchment-200 hover:text-parchment-400'}`
                if (isExt) return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-parchment-400 group-hover:w-full transition-all duration-300" />
                  </a>
                )
                return isPage ? (
                  <Link key={link.href} href={link.href} className={cls}>
                    {link.label}
                    {/* Underline: active = red, hover = parchment */}
                    <span
                      className={`absolute -bottom-1 left-0 h-px transition-all duration-300
                                  ${isActive
                                    ? 'w-full bg-crimson-300'
                                    : 'w-0 bg-parchment-400 group-hover:w-full'}`}
                    />
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={cls}
                    aria-label={link.label}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-parchment-400 group-hover:w-full transition-all duration-300" />
                  </button>
                )
              })}

              {/* Auth */}
              {loading ? (
                <div className="w-8 h-8 rounded-full border border-parchment-400/40 animate-pulse" />
              ) : user ? (
                <div ref={dropRef} className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 group"
                    aria-label="Menu tài khoản"
                    aria-expanded={dropdownOpen}
                  >
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName ?? 'Avatar'}
                        width={34} height={34}
                        className="rounded-full border-2 border-parchment-400/50
                                   group-hover:border-parchment-400 transition-all
                                   group-hover:shadow-gold-glow"
                      />
                    ) : (
                      <div className="w-[34px] h-[34px] rounded-full bg-earth-300 flex items-center justify-center
                                      border-2 border-parchment-400/50 group-hover:border-parchment-400 transition-all">
                        <UserIcon size={14} className="text-parchment-200" />
                      </div>
                    )}
                    <span className="font-cinzel text-xs text-parchment-300 max-w-[80px] truncate hidden lg:block">
                      {user.displayName?.split(' ').slice(-1)[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 w-56 rounded-sm shadow-parchment-lg overflow-hidden
                                   border border-parchment-400/40"
                        style={{ background: '#F4EBCF' }}
                      >
                        <div className="h-0.5 bg-gradient-to-r from-crimson-300 via-parchment-400 to-crimson-300" />
                        <div className="px-4 py-3 border-b border-parchment-400/30">
                          <p className="font-cinzel text-xs text-earth-500 font-semibold truncate">{user.displayName}</p>
                          <p className="font-garamond text-earth-400/70 text-xs truncate mt-0.5">{user.email}</p>
                        </div>
                        <button
                          onClick={() => { logout(); setDropdownOpen(false) }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-left
                                     font-garamond text-sm text-earth-500 hover:bg-parchment-300/50
                                     transition-colors"
                        >
                          <LogOut size={14} />
                          Đăng xuất
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button onClick={loginWithGoogle} className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
                  <CrossedSwords size={14} /> Đăng nhập
                </button>
              )}
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-parchment-200 hover:text-parchment-400 transition-colors p-1
                         relative w-8 h-8 flex items-center justify-center"
              aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="open"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{
              background: 'rgba(26,14,6,0.97)',
              backgroundImage: 'radial-gradient(ellipse at 50% 20%, rgba(122,78,45,0.2) 0%, transparent 60%)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Top spacer */}
            <div className="h-14 md:h-20" />

            {/* Ornate top border */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-parchment-400/40 to-transparent" />

            <nav className="flex flex-col items-center justify-center flex-1 gap-6 px-6 py-12"
                 role="navigation" aria-label="Menu di động">
              <div className="flex items-center gap-2 justify-center">
                <CrossedSwords size={16} />
              </div>

                  {NAV_LINKS.map((link, i) => {
                const isPage   = link.href.startsWith('/')
                const isActive = isActivePage(link.href)
                const isExt    = 'external' in link && link.external
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                  >
                    {isExt ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="font-cinzel text-2xl tracking-widest text-parchment-200 hover:text-parchment-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : isPage ? (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`font-cinzel text-2xl tracking-widest transition-colors
                                    ${isActive
                                      ? 'text-parchment-400 underline decoration-crimson-300 underline-offset-4'
                                      : 'text-parchment-200 hover:text-parchment-400'}`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="font-cinzel text-2xl tracking-widest text-parchment-200 hover:text-parchment-400 transition-colors"
                      >
                        {link.label}
                      </button>
                    )}
                  </motion.div>
                )
              })}

              <div className="divider-ornate w-48 mt-2"><span>⚜</span></div>

              {/* Auth in mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.07 + 0.1 }}
                className="flex flex-col items-center gap-4"
              >
                {user ? (
                  <>
                    <div className="flex items-center gap-3">
                      {user.photoURL && (
                        <Image src={user.photoURL} alt="" width={36} height={36}
                               className="rounded-full border-2 border-parchment-400" />
                      )}
                      <span className="font-cinzel text-sm text-parchment-300">{user.displayName}</span>
                    </div>
                    <button
                      onClick={() => { logout(); setMobileOpen(false) }}
                      className="btn-ghost text-sm px-6"
                    >
                      <LogOut size={14} />
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { loginWithGoogle(); setMobileOpen(false) }}
                    className="btn-primary"
                  >
                    <CrossedSwords size={16} /> Đăng nhập Google
                  </button>
                )}
              </motion.div>
            </nav>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-parchment-400/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
