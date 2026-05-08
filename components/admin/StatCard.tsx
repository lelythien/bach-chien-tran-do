'use client'

interface StatCardProps {
  icon:      string
  title:     string
  value:     number | string
  subtitle?: string
  badge?:    number
  color?:    'gold' | 'crimson' | 'earth' | 'teal'
  loading?:  boolean
}

export default function StatCard({
  icon, title, value, subtitle, badge, color = 'gold', loading
}: StatCardProps) {
  return (
    <div className={`admin-stat-card admin-stat-card--${color}`}>
      {loading ? (
        <div className="admin-stat-skeleton">
          <div className="skeleton-shimmer admin-stat-skel-icon" />
          <div className="skeleton-shimmer admin-stat-skel-val" />
          <div className="skeleton-shimmer admin-stat-skel-title" />
        </div>
      ) : (
        <>
          <div className="admin-stat-icon-wrap">
            <span className="admin-stat-icon">{icon}</span>
            {badge != null && badge > 0 && (
              <span className="admin-stat-badge">{badge > 99 ? '99+' : badge}</span>
            )}
          </div>
          <div className="admin-stat-value">{value.toLocaleString('vi-VN')}</div>
          <div className="admin-stat-title">{title}</div>
          {subtitle && (
            <div className="admin-stat-subtitle">{subtitle}</div>
          )}
        </>
      )}
    </div>
  )
}
