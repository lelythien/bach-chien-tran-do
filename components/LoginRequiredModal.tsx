'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuth } from '@/lib/authContext'

interface Props {
  isOpen:   boolean
  onClose:  () => void
  message?: string
}

export default function LoginRequiredModal({ isOpen, onClose, message }: Props) {
  const { loginWithGoogle, loading } = useAuth()

  const handleLogin = async () => {
    await loginWithGoogle()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: 'rgba(10,5,2,0.88)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-md w-full rounded-sm overflow-hidden"
            style={{
              background: '#F4EBCF',
              border: '2px solid #C9A36A',
              boxShadow: '0 0 60px rgba(201,163,106,0.2), 0 20px 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-crimson-400 via-parchment-400 to-crimson-400" />

            <div className="p-8">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-earth-400 hover:text-earth-500 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Icon & Title */}
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">⚔</div>
                <h3 className="font-cinzel font-bold text-earth-500 text-xl mb-2">
                  Chiến binh chưa xác danh
                </h3>
                <p className="font-garamond text-earth-400 text-base leading-relaxed">
                  {message ?? 'Bạn cần đăng nhập để sử dụng tính năng này.'}
                </p>
              </div>

              {/* Divider */}
              <div className="divider-ornate mb-6">
                <span>⚜</span>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-6
                           bg-white border border-gray-200 rounded-sm
                           font-inter font-medium text-gray-700 text-sm
                           hover:bg-gray-50 hover:shadow-md transition-all duration-200
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {/* Google Icon (SVG) */}
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập bằng Google'}
              </button>

              <p className="text-center font-garamond text-earth-400/60 text-xs mt-4">
                Thông tin của bạn được bảo mật tuyệt đối
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
