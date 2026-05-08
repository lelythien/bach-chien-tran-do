'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSiteConfig } from '@/lib/hooks/useSiteConfig'
import { saveSiteConfig } from '@/lib/services/siteConfigService'
import { SiteConfigDoc } from '@/lib/types/siteConfig.types'

const TOAST_STYLE = { background: '#F4EBCF', color: '#3B2A1E', border: '1px solid #C9A36A' }

function ToggleSwitch({
  id, checked, onChange, label, description
}: {
  id: string; checked: boolean; onChange: (v: boolean) => void
  label: string; description: string
}) {
  return (
    <div className="admin-setting-row">
      <div className="admin-setting-info">
        <label htmlFor={id} className="admin-setting-label">{label}</label>
        <p className="admin-setting-desc">{description}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`admin-toggle ${checked ? 'on' : 'off'}`}
      >
        <span className="admin-toggle-knob" />
      </button>
    </div>
  )
}

export default function AdminSettingsPage() {
  const { config, loading } = useSiteConfig()
  const [form,   setForm]   = useState<SiteConfigDoc | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && config) setForm(config)
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
    const ok = await saveSiteConfig(form)
    setSaving(false)
    if (ok) toast.success('✓ Đã lưu cài đặt', { style: TOAST_STYLE })
    else    toast.error('Lỗi khi lưu cài đặt')
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="admin-page-header-ornament">⚔ ─────────────────── ⚔</div>
        <h2 className="admin-page-title">Cài đặt</h2>
        <p className="admin-page-subtitle">Cấu hình hệ thống và tính năng</p>
      </div>

      <div className="admin-settings-wrap">
        {/* Feature Toggles */}
        <div className="admin-settings-card">
          <h3 className="admin-settings-card-title">⚙ Tính năng</h3>

          <ToggleSwitch
            id="preorder-enabled"
            checked={form.settings.preorderEnabled}
            onChange={v => update('settings', 'preorderEnabled', v)}
            label="Cho phép Preorder"
            description="Bật/tắt tính năng preorder cho người dùng"
          />

          <ToggleSwitch
            id="feedback-enabled"
            checked={form.settings.feedbackEnabled}
            onChange={v => update('settings', 'feedbackEnabled', v)}
            label="Cho phép gửi Feedback"
            description="Bật/tắt form gửi feedback từ người dùng"
          />
        </div>

        {/* Order Settings */}
        <div className="admin-settings-card">
          <h3 className="admin-settings-card-title">📜 Preorder & Order</h3>

          <div className="admin-form-group">
            <label>Mục tiêu Preorder</label>
            <input
              className="admin-input"
              type="number"
              value={form.order.preorderGoal}
              onChange={e => update('order', 'preorderGoal', Number(e.target.value))}
              min={1}
            />
          </div>

          <div className="admin-form-group">
            <label>Order URL (Google Site / Cool Vietnam)</label>
            <input
              className="admin-input"
              type="url"
              value={form.order.orderUrl}
              onChange={e => update('order', 'orderUrl', e.target.value)}
              placeholder="https://coolvietnam.vn"
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
        </div>

        {/* Social Links */}
        <div className="admin-settings-card">
          <h3 className="admin-settings-card-title">🔗 Social Links</h3>

          <div className="admin-form-group">
            <label>Facebook</label>
            <input
              className="admin-input"
              type="url"
              value={form.social.facebook}
              onChange={e => update('social', 'facebook', e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label>Discord</label>
            <input
              className="admin-input"
              type="url"
              value={form.social.discord}
              onChange={e => update('social', 'discord', e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label>Google Site / Cool Vietnam</label>
            <input
              className="admin-input"
              type="url"
              value={form.social.coolVn}
              onChange={e => update('social', 'coolVn', e.target.value)}
            />
          </div>
        </div>

        {/* Save */}
        <div className="admin-form-save">
          <button
            className="admin-btn-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '⏳ Đang lưu...' : '✓ Lưu tất cả cài đặt'}
          </button>
        </div>
      </div>
    </div>
  )
}
