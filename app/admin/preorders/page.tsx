'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { subscribeAllPreorders } from '@/lib/services/preorderService'
import { PreorderDoc } from '@/lib/types/preorder.types'

const PAGE_SIZE = 20

function formatDate(ts: any): string {
  if (!ts) return '—'
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  } catch { return '—' }
}

function exportCSV(preorders: PreorderDoc[]) {
  const date = new Date().toISOString().split('T')[0]
  const filename = `preorder_bach_chien_tran_do_${date}.csv`
  const header   = ['STT', 'Tên', 'Email', 'Ngày Preorder', 'Trạng thái']
  const rows     = preorders.map((p, i) => [
    i + 1,
    p.name,
    p.email,
    formatDate(p.createdAt),
    p.status ?? 'confirmed'
  ])
  const csv = [header, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href  = url; link.download = filename; link.click()
  URL.revokeObjectURL(url)
  toast.success(`Xuất CSV: ${filename}`, { style: { background: '#F4EBCF', color: '#3B2A1E', border: '1px solid #C9A36A' } })
}

export default function AdminPreordersPage() {
  const [allPreorders, setAllPreorders] = useState<PreorderDoc[]>([])
  const [loading,      setLoading]      = useState(true)
  const [search,       setSearch]       = useState('')
  const [sortDir,      setSortDir]      = useState<'asc' | 'desc'>('desc')
  const [page,         setPage]         = useState(1)

  useEffect(() => {
    const unsub = subscribeAllPreorders((data) => {
      setAllPreorders(data)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  // Filter + sort
  const filtered = allPreorders
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const tA = a.createdAt?.toMillis?.() ?? 0
      const tB = b.createdAt?.toMillis?.() ?? 0
      return sortDir === 'desc' ? tB - tA : tA - tB
    })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="admin-page-header-ornament">⚔ ─────────────────── ⚔</div>
        <h2 className="admin-page-title">Quản lý Preorder</h2>
        <p className="admin-page-subtitle">{filtered.length} preorder • Realtime cập nhật</p>
      </div>

      {/* Controls */}
      <div className="admin-table-controls">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên hoặc email..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="admin-search-input"
        />
        <div className="admin-table-actions">
          <button
            className="admin-btn-sort"
            onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
          >
            {sortDir === 'desc' ? '↓ Mới nhất' : '↑ Cũ nhất'}
          </button>
          <button
            className="admin-btn-export"
            onClick={() => exportCSV(filtered)}
            disabled={filtered.length === 0}
          >
            📥 Xuất CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-table-loading">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton-shimmer admin-table-row-skel" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <span className="admin-empty-icon">📜</span>
            <p>Chưa có preorder nào</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Ngày Preorder</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p, i) => (
                <motion.tr
                  key={p.id}
                  className="admin-table-row"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <td className="admin-table-stt">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="admin-table-name">{p.name}</td>
                  <td className="admin-table-email">{p.email}</td>
                  <td className="admin-table-date">{formatDate(p.createdAt)}</td>
                  <td>
                    <span className="admin-status-badge confirmed">
                      ✓ Confirmed
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="admin-pagination">
          <button
            className="admin-page-btn"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >← Trước</button>

          <div className="admin-page-numbers">
            {[...Array(Math.min(totalPages, 7))].map((_, i) => {
              const n = i + 1
              return (
                <button
                  key={n}
                  className={`admin-page-num ${page === n ? 'active' : ''}`}
                  onClick={() => setPage(n)}
                >{n}</button>
              )
            })}
            {totalPages > 7 && <span className="admin-page-ellipsis">…{totalPages}</span>}
          </div>

          <button
            className="admin-page-btn"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >Sau →</button>
        </div>
      )}
    </div>
  )
}
