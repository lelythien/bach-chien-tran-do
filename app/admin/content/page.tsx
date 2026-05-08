'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useSiteConfig } from '@/lib/hooks/useSiteConfig'
import { saveSiteConfig, saveFaqs } from '@/lib/services/siteConfigService'
import { SiteConfigDoc, FaqItem } from '@/lib/types/siteConfig.types'

const TOAST_STYLE = { background: '#F4EBCF', color: '#3B2A1E', border: '1px solid #C9A36A' }

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="admin-section-title">
      <span>{icon}</span>
      <h3>{title}</h3>
    </div>
  )
}

export default function AdminContentPage() {
  const { config, loading } = useSiteConfig()
  const [form,    setForm]    = useState<SiteConfigDoc | null>(null)
  const [faqs,    setFaqs]    = useState<FaqItem[]>([])
  const [saving,  setSaving]  = useState(false)
  const [activeTab, setActiveTab] = useState<'home' | 'order' | 'faq' | 'social'>('home')

  useEffect(() => {
    if (!loading && config) {
      setForm(config)
      setFaqs(config.faqs ?? [])
    }
  }, [config, loading])

  if (loading || !form) {
    return (
      <div className="admin-page">
        <div className="admin-empty">
          <div className="skeleton-shimmer" style={{ width: 300, height: 40, borderRadius: 4 }} />
        </div>
      </div>
    )
  }

  const update = (section: keyof SiteConfigDoc, field: string, value: any) => {
    setForm(prev => prev ? {
      ...prev,
      [section]: { ...(prev[section] as any), [field]: value }
    } : prev)
  }

  const handleSave = async () => {
    if (!form) return
    setSaving(true)
    const ok = await saveSiteConfig({ ...form, faqs })
    setSaving(false)
    if (ok) toast.success('✓ Đã lưu cấu hình', { style: TOAST_STYLE })
    else     toast.error('Lỗi khi lưu cấu hình')
  }

  // FAQ handlers
  const addFaq = () => {
    const newFaq: FaqItem = {
      id:       Date.now().toString(),
      question: '',
      answer:   '',
      order:    faqs.length + 1,
    }
    setFaqs(prev => [...prev, newFaq])
  }

  const updateFaq = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f))
  }

  const removeFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id))
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="admin-page-header-ornament">⚔ ─────────────────── ⚔</div>
        <h2 className="admin-page-title">Quản lý Nội dung</h2>
        <p className="admin-page-subtitle">CMS — Chỉnh sửa nội dung website không cần code</p>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {[
          { key: 'home',   label: '🏠 Trang chủ' },
          { key: 'order',  label: '📜 Trang Order' },
          { key: 'faq',    label: '❓ FAQ' },
          { key: 'social', label: '🔗 Social' },
        ].map(t => (
          <button
            key={t.key}
            className={`admin-tab ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key as any)}
          >{t.label}</button>
        ))}
      </div>

      <div className="admin-cms-form">
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-form-section">
            <SectionTitle icon="🏠" title="Nội dung Trang chủ" />
            <div className="admin-form-group">
              <label>Hero Title</label>
              <input
                className="admin-input"
                value={form.home.heroTitle}
                onChange={e => update('home', 'heroTitle', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>Hero Subtitle</label>
              <input
                className="admin-input"
                value={form.home.heroSubtitle}
                onChange={e => update('home', 'heroSubtitle', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>Hero Description</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={form.home.heroDescription}
                onChange={e => update('home', 'heroDescription', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>Mô tả ngắn game</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={form.home.gameDescription}
                onChange={e => update('home', 'gameDescription', e.target.value)}
              />
            </div>
          </motion.div>
        )}

        {/* ORDER TAB */}
        {activeTab === 'order' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-form-section">
            <SectionTitle icon="📜" title="Cấu hình Trang Order" />
            <div className="admin-form-group">
              <label>Mục tiêu Preorder</label>
              <input
                className="admin-input"
                type="number"
                value={form.order.preorderGoal}
                onChange={e => update('order', 'preorderGoal', Number(e.target.value))}
              />
            </div>
            <div className="admin-form-group">
              <label>Order URL (Google Site Cool Vietnam)</label>
              <input
                className="admin-input"
                type="url"
                value={form.order.orderUrl}
                onChange={e => update('order', 'orderUrl', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>Trạng thái dự án</label>
              <input
                className="admin-input"
                value={form.order.projectStatus}
                onChange={e => update('order', 'projectStatus', e.target.value)}
                placeholder="Đang kêu gọi preorder"
              />
            </div>
          </motion.div>
        )}

        {/* FAQ TAB */}
        {activeTab === 'faq' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-form-section">
            <SectionTitle icon="❓" title="Câu hỏi thường gặp" />
            <div className="admin-faq-list">
              {faqs.map((faq, i) => (
                <div key={faq.id} className="admin-faq-item">
                  <div className="admin-faq-num">{i + 1}</div>
                  <div className="admin-faq-fields">
                    <input
                      className="admin-input"
                      placeholder="Câu hỏi..."
                      value={faq.question}
                      onChange={e => updateFaq(faq.id, 'question', e.target.value)}
                    />
                    <textarea
                      className="admin-textarea"
                      rows={2}
                      placeholder="Câu trả lời..."
                      value={faq.answer}
                      onChange={e => updateFaq(faq.id, 'answer', e.target.value)}
                    />
                  </div>
                  <button
                    className="admin-faq-remove"
                    onClick={() => removeFaq(faq.id)}
                    title="Xóa câu hỏi"
                  >✕</button>
                </div>
              ))}
            </div>
            <button className="admin-btn-add-faq" onClick={addFaq}>
              + Thêm câu hỏi
            </button>
          </motion.div>
        )}

        {/* SOCIAL TAB */}
        {activeTab === 'social' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-form-section">
            <SectionTitle icon="🔗" title="Social Links" />
            <div className="admin-form-group">
              <label>Facebook</label>
              <input
                className="admin-input"
                type="url"
                value={form.social.facebook}
                onChange={e => update('social', 'facebook', e.target.value)}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="admin-form-group">
              <label>Discord</label>
              <input
                className="admin-input"
                type="url"
                value={form.social.discord}
                onChange={e => update('social', 'discord', e.target.value)}
                placeholder="https://discord.gg/..."
              />
            </div>
            <div className="admin-form-group">
              <label>Google Site / Cool Vietnam</label>
              <input
                className="admin-input"
                type="url"
                value={form.social.coolVn}
                onChange={e => update('social', 'coolVn', e.target.value)}
                placeholder="https://coolvietnam.vn"
              />
            </div>
          </motion.div>
        )}

        {/* Save Button */}
        <div className="admin-form-save">
          <button
            className="admin-btn-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '⏳ Đang lưu...' : '✓ Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>
  )
}
