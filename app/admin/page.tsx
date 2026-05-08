'use client'

import { useEffect, useState } from 'react'
import { useAdminStats } from '@/lib/hooks/useAdminStats'
import StatCard from '@/components/admin/StatCard'
import { GrowthChart, RatingChart } from '@/components/admin/AdminCharts'
import { getPreordersByDay } from '@/lib/services/preorderService'
import { getRatingDistribution } from '@/lib/services/feedbackService'

const GOAL = Number(process.env.NEXT_PUBLIC_PREORDER_GOAL ?? 1000)

export default function AdminDashboardPage() {
  const { preorderCount, feedbackTotal, feedbackPending, userCount, loading } = useAdminStats()
  const [preorderData, setPreorderData] = useState<{ date: string; count: number }[]>([])
  const [ratingData,   setRatingData]   = useState<{ rating: number; count: number }[]>([])
  const [chartsLoading, setChartsLoading] = useState(true)

  useEffect(() => {
    Promise.all([getPreordersByDay(), getRatingDistribution()]).then(([p, r]) => {
      setPreorderData(p)
      setRatingData(r)
      setChartsLoading(false)
    })
  }, [])

  const pct = Math.min(Math.round((preorderCount / GOAL) * 100), 100)

  return (
    <div className="admin-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-ornament">⚔ ─────────────────── ⚔</div>
        <h2 className="admin-page-title">Phòng Tác Chiến</h2>
        <p className="admin-page-subtitle">Tổng quan hoạt động realtime</p>
      </div>

      {/* Stat Cards */}
      <div className="admin-stats-grid">
        <StatCard
          icon="📜"
          title="Tổng Preorder"
          value={preorderCount}
          subtitle={`${pct}% / Mục tiêu ${GOAL.toLocaleString('vi-VN')}`}
          color="gold"
          loading={loading}
        />
        <StatCard
          icon="💬"
          title="Tổng Feedback"
          value={feedbackTotal}
          color="earth"
          loading={loading}
        />
        <StatCard
          icon="⏳"
          title="Chờ Duyệt"
          value={feedbackPending}
          badge={feedbackPending}
          color="crimson"
          loading={loading}
        />
        <StatCard
          icon="⚔"
          title="Chiến Binh Đăng Ký"
          value={userCount}
          color="teal"
          loading={loading}
        />
      </div>

      {/* Progress to Goal */}
      <div className="admin-goal-card">
        <div className="admin-goal-header">
          <span className="admin-goal-label">⚡ Tiến độ Preorder</span>
          <span className="admin-goal-numbers">
            {preorderCount.toLocaleString('vi-VN')} / {GOAL.toLocaleString('vi-VN')}
          </span>
        </div>
        <div className="admin-goal-bar-track">
          <div
            className="admin-goal-bar-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="admin-goal-footer">
          <span className="admin-goal-pct">{pct}% hoàn thành</span>
          <span className="admin-goal-remain">
            Còn {Math.max(0, GOAL - preorderCount).toLocaleString('vi-VN')} preorder nữa
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="admin-charts-grid">
        {/* Preorder Growth */}
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">📈 Tăng trưởng Preorder</h3>
          {chartsLoading ? (
            <div className="skeleton-shimmer admin-chart-skeleton" />
          ) : preorderData.length === 0 ? (
            <div className="admin-chart-empty">Chưa có dữ liệu</div>
          ) : (
            <GrowthChart
              data={preorderData}
              label="Tổng preorder"
              color="#C9A36A"
            />
          )}
        </div>

        {/* Rating Distribution */}
        <div className="admin-chart-card">
          <h3 className="admin-chart-title">⭐ Phân bố Rating</h3>
          {chartsLoading ? (
            <div className="skeleton-shimmer admin-chart-skeleton" />
          ) : ratingData.every(r => r.count === 0) ? (
            <div className="admin-chart-empty">Chưa có feedback nào</div>
          ) : (
            <RatingChart data={ratingData} />
          )}
        </div>
      </div>
    </div>
  )
}
