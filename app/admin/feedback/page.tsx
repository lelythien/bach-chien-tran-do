'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { subscribeAllFeedbacks } from '@/lib/services/feedbackService'
import { FeedbackDoc } from '@/lib/types/feedback.types'
import FeedbackCard from '@/components/admin/FeedbackCard'

type Tab = 'pending' | 'approved'

export default function AdminFeedbackPage() {
  const [pending,  setPending]  = useState<FeedbackDoc[]>([])
  const [approved, setApproved] = useState<FeedbackDoc[]>([])
  const [loading,  setLoading]  = useState(true)
  const [tab,      setTab]      = useState<Tab>('pending')

  useEffect(() => {
    const unsub = subscribeAllFeedbacks((p, a) => {
      setPending(p)
      setApproved(a)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const current = tab === 'pending' ? pending : approved

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="admin-page-header-ornament">⚔ ─────────────────── ⚔</div>
        <h2 className="admin-page-title">Duyệt Feedback</h2>
        <p className="admin-page-subtitle">Kiểm duyệt bình luận trước khi hiển thị</p>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${tab === 'pending' ? 'active' : ''}`}
          onClick={() => setTab('pending')}
        >
          ⏳ Chờ duyệt
          {pending.length > 0 && (
            <span className="admin-tab-badge">{pending.length}</span>
          )}
        </button>
        <button
          className={`admin-tab ${tab === 'approved' ? 'active' : ''}`}
          onClick={() => setTab('approved')}
        >
          ✓ Đã duyệt
          <span className="admin-tab-count">{approved.length}</span>
        </button>
      </div>

      {/* Content */}
      <div className="admin-feedback-grid">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-shimmer admin-feedback-skel" />
          ))
        ) : current.length === 0 ? (
          <div className="admin-empty admin-empty-wide">
            <span className="admin-empty-icon">💬</span>
            <p>
              {tab === 'pending'
                ? 'Không có feedback nào đang chờ duyệt'
                : 'Chưa có feedback nào được duyệt'
              }
            </p>
          </div>
        ) : (
          current.map((fb, i) => (
            <motion.div
              key={fb.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: i * 0.05 }}
            >
              <FeedbackCard feedback={fb} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
