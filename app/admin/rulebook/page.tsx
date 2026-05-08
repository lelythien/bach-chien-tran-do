'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  uploadRulebookImage, subscribeRulebookImages,
  deleteRulebookImage, updateImageOrder, updateImageTitle,
  validateImageFile
} from '@/lib/services/storageService'
import {
  RulebookImage, RulebookSection, RULEBOOK_SECTIONS
} from '@/lib/types/siteConfig.types'
import ConfirmModal from '@/components/admin/ConfirmModal'

const TOAST_STYLE = { background: '#F4EBCF', color: '#3B2A1E', border: '1px solid #C9A36A' }

export default function AdminRulebookPage() {
  const [activeSection, setActiveSection] = useState<RulebookSection>('cover')
  const [images,        setImages]        = useState<RulebookImage[]>([])
  const [loading,       setLoading]       = useState(true)
  const [uploading,     setUploading]     = useState(false)
  const [uploadPct,     setUploadPct]     = useState(0)
  const [deleteTarget,  setDeleteTarget]  = useState<RulebookImage | null>(null)
  const [dragging,      setDragging]      = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLoading(true)
    const unsub = subscribeRulebookImages(activeSection, (imgs) => {
      setImages(imgs)
      setLoading(false)
    })
    return () => unsub()
  }, [activeSection])

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    const err  = validateImageFile(file)
    if (err) { toast.error(err); return }

    const title = file.name.replace(/\.[^/.]+$/, '')
    setUploading(true)
    setUploadPct(0)

    const result = await uploadRulebookImage(
      file, activeSection, title,
      images.length,
      (pct) => setUploadPct(pct)
    )
    setUploading(false)

    if (result.success) {
      toast.success('✓ Upload thành công', { style: TOAST_STYLE })
    } else {
      toast.error(`Lỗi upload: ${result.error}`)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFileChange(e.dataTransfer.files)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    const ok = await deleteRulebookImage(deleteTarget)
    setDeleteTarget(null)
    if (ok) toast.success('✓ Đã xóa ảnh', { style: TOAST_STYLE })
    else    toast.error('Lỗi khi xóa ảnh')
  }

  const handleReorder = async (newOrder: RulebookImage[]) => {
    setImages(newOrder)
    // Update order index in Firestore
    await Promise.all(newOrder.map((img, idx) => updateImageOrder(img.id, idx)))
  }

  const handleTitleChange = async (img: RulebookImage, title: string) => {
    setImages(prev => prev.map(i => i.id === img.id ? { ...i, title } : i))
    await updateImageTitle(img.id, title)
  }

  const sectionLabel = RULEBOOK_SECTIONS.find(s => s.key === activeSection)?.label ?? activeSection

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="admin-page-header-ornament">⚔ ─────────────────── ⚔</div>
        <h2 className="admin-page-title">Quản lý Ảnh Rulebook</h2>
        <p className="admin-page-subtitle">Upload và sắp xếp ảnh minh họa luật chơi</p>
      </div>

      {/* Section tabs */}
      <div className="admin-section-tabs">
        {RULEBOOK_SECTIONS.map(sec => (
          <button
            key={sec.key}
            className={`admin-section-tab ${activeSection === sec.key ? 'active' : ''}`}
            onClick={() => setActiveSection(sec.key)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Upload zone */}
      <div
        className={`admin-upload-zone ${dragging ? 'dragging' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={e => handleFileChange(e.target.files)}
        />
        {uploading ? (
          <div className="admin-upload-progress">
            <div className="admin-upload-progress-label">⬆ Đang upload... {uploadPct}%</div>
            <div className="admin-upload-bar-track">
              <div className="admin-upload-bar-fill" style={{ width: `${uploadPct}%` }} />
            </div>
          </div>
        ) : (
          <>
            <div className="admin-upload-icon">🖼</div>
            <div className="admin-upload-text">
              Kéo thả ảnh vào đây hoặc <span>click để chọn</span>
            </div>
            <div className="admin-upload-hint">
              Chấp nhận .jpg .png .webp — tối đa 5MB
            </div>
          </>
        )}
      </div>

      {/* Image Grid */}
      <div className="admin-rulebook-section-info">
        <span>📂 Section: <strong>{sectionLabel}</strong></span>
        <span>{images.length} ảnh</span>
      </div>

      {loading ? (
        <div className="admin-image-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-shimmer admin-image-skel" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="admin-empty">
          <span className="admin-empty-icon">🖼</span>
          <p>Chưa có ảnh nào trong section này</p>
        </div>
      ) : (
        <Reorder.Group
          axis="x"
          values={images}
          onReorder={handleReorder}
          className="admin-image-grid"
        >
          {images.map((img) => (
            <Reorder.Item key={img.id} value={img} className="admin-image-item">
              <div className="admin-image-preview">
                <img src={img.url} alt={img.title} />
                <div className="admin-image-overlay">
                  <span className="admin-image-drag-hint">⇔ Kéo để đổi thứ tự</span>
                </div>
              </div>
              <input
                className="admin-image-title-input"
                value={img.title}
                onChange={e => handleTitleChange(img, e.target.value)}
                placeholder="Tiêu đề ảnh..."
              />
              <button
                className="admin-image-delete-btn"
                onClick={() => setDeleteTarget(img)}
              >✕ Xóa</button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}

      <ConfirmModal
        open={deleteTarget !== null}
        title="Xóa ảnh"
        message={`Xóa ảnh "${deleteTarget?.title}"? Hành động không thể hoàn tác.`}
        confirmLabel="✕ Xóa"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        danger
      />
    </div>
  )
}
