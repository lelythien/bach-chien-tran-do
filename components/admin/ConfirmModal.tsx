'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ConfirmModalProps {
  open:      boolean
  title:     string
  message:   string
  confirmLabel?: string
  cancelLabel?:  string
  onConfirm: () => void
  onCancel:  () => void
  danger?:   boolean
}

export default function ConfirmModal({
  open, title, message, confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy', onConfirm, onCancel, danger = false
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="admin-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="admin-modal"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1,   opacity: 1, y: 0  }}
            exit={{ scale: 0.9,    opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-icon">{danger ? '⚠' : '❓'}</div>
            <h3 className="admin-modal-title">{title}</h3>
            <p className="admin-modal-message">{message}</p>
            <div className="admin-modal-actions">
              <button className="admin-modal-cancel" onClick={onCancel}>
                {cancelLabel}
              </button>
              <button
                className={`admin-modal-confirm ${danger ? 'danger' : ''}`}
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
