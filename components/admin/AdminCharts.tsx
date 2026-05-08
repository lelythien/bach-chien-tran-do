'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell, Legend
} from 'recharts'

// ── Growth Chart ───────────────────────────────────────────────
interface GrowthData {
  date: string
  count: number
}

interface GrowthChartProps {
  data:  GrowthData[]
  label: string
  color: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="admin-chart-tooltip">
        <p className="admin-chart-tooltip-date">{label}</p>
        <p className="admin-chart-tooltip-val">{payload[0].value} preorder</p>
      </div>
    )
  }
  return null
}

export function GrowthChart({ data, label, color }: GrowthChartProps) {
  // Accumulate total
  let running = 0
  const accumulated = data.map(d => {
    running += d.count
    return { date: d.date, total: running, daily: d.count }
  })

  return (
    <div className="admin-chart-wrap">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={accumulated} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,163,106,0.15)" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#C9A36A', fontSize: 11, fontFamily: 'Georgia, serif' }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(201,163,106,0.3)' }}
          />
          <YAxis
            tick={{ fill: '#C9A36A', fontSize: 11, fontFamily: 'Georgia, serif' }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(201,163,106,0.3)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="total"
            stroke={color}
            strokeWidth={2.5}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#E8D7B9' }}
            name={label}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── Rating Distribution Chart ──────────────────────────────────
interface RatingData {
  rating: number
  count:  number
}

const RATING_COLORS = ['#7A1F1F', '#A52A2A', '#C9A36A', '#B8893A', '#D4A017']

export function RatingChart({ data }: { data: RatingData[] }) {
  const CustomRatingTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      return (
        <div className="admin-chart-tooltip">
          <p className="admin-chart-tooltip-date">{payload[0].payload.rating} sao</p>
          <p className="admin-chart-tooltip-val">{payload[0].value} feedback</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="admin-chart-wrap">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,163,106,0.15)" />
          <XAxis
            dataKey="rating"
            tick={{ fill: '#C9A36A', fontSize: 12, fontFamily: 'Georgia, serif' }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(201,163,106,0.3)' }}
          />
          <YAxis
            tick={{ fill: '#C9A36A', fontSize: 11, fontFamily: 'Georgia, serif' }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(201,163,106,0.3)' }}
          />
          <Tooltip content={<CustomRatingTooltip />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={RATING_COLORS[index % RATING_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
