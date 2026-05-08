'use client'

import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { FeedbackDoc } from '@/lib/types/feedback.types'
import { approveFeedback, deleteFeedback } from '@/lib/services/feedbackService'
import ConfirmModal from './ConfirmModal'

interface FeedbackCardProps {
  feedback:  FeedbackDoc
  onUpdate?: () => void
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="admin-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= rating ? 'star-filled' : 'star-empty'}>★</span>
      ))}
    </span>
  )
}

function formatDate(ts: any): string {
  if (!ts) return '—'
  try {
    const date = ts.toDate ? ts.toDate() : new Date(ts)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  } catch { return '—' }
}

export default function FeedbackCard({ feedback, onUpdate }: FeedbackCardProps) {
  const [loading,       setLoading]       = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const handleApprove = async () => {
    setLoading(true)
    const ok = await approveFeedback(feedback.id)
    setLoading(false)
    if (ok) {
      toast.success('✓ Đã duyệt feedback', { style: { background: '#F4EBCF', color: '#3B2A1E', border: '1px solid #C9A36A' } })
      onUpdate?.()
    } else {
      toast.error('Lỗi khi duyệt feedback')
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    setDeleteConfirm(false)
    const ok = await deleteFeedback(feedback.id)
    setLoading(false)
    if (ok) {
      toast.success('✗ Đã xóa feedback', { style: { background: '#F4EBCF', color: '#3B2A1E', border: '1px solid #C9A36A' } })
      onUpdate?.()
    } else {
      toast.error('Lỗi khi xóa feedback')
    }
  }

  return (
    <>
      <div className={`admin-feedback-card ${feedback.approved ? 'approved' : 'pending'}`}>
        {/* Header */}
        <div className="admin-feedback-card-header">
          <div className="admin-feedback-user">
            {feedback.avatar
              ? <img src={feedback.avatar} alt={feedback.name} className="admin-feedback-avatar" />
              : <div className="admin-feedback-avatar-placeholder">👤</div>
            }
            <div>
              <div className="admin-feedback-name">{feedback.name}</div>
              <div className="admin-feedback-date">{formatDate(feedback.createdAt)}</div>
            </div>
          </div>
          <div className="admin-feedback-meta">
            <Stars rating={feedback.rating} />
            <span className={`admin-feedback-badge ${feedback.approved ? 'approved' : 'pending'}`}>
              {feedback.approved ? '✓ Đã duyệt' : '⏳ Chờ duyệt'}
            </span>
          </div>
        </div>

        {/* Comment */}
        <p className="admin-feedback-comment">"{feedback.comment}"</p>

        {/* Actions */}
        <div className="admin-feedback-actions">
          {!feedback.approved && (
            <button
              className="admin-btn-approve"
              onClick={handleApprove}
              disabled={loading}
            >
              ✓ Duyệt
            </button>
          )}
          <button
            className="admin-btn-delete"
            onClick={() => setDeleteConfirm(true)}
            disabled={loading}
          >
            ✗ Xóa
          </button>
        </div>
      </div>

      <ConfirmModal
        open={deleteConfirm}
        title="Xóa Feedback"
        message={`Bạn có chắc muốn xóa feedback của ${feedback.name}? Hành động này không thể hoàn tác.`}
        confirmLabel="✗ Xóa"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
        danger
      />
    </>
  )
}
