import React from 'react'

interface CrossedSwordsProps {
  size?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Realistic crossed-swords SVG icon.
 * Metallic steel blades with gold guard — no animation, photorealistic feel.
 */
export default function CrossedSwords({ size = 24, className = '', style }: CrossedSwordsProps) {
  const id = React.useId().replace(/:/g, '')
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        {/* Steel blade gradient — left sword */}
        <linearGradient id={`blade-l-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#B8C4CC" />
          <stop offset="30%"  stopColor="#E8EEF2" />
          <stop offset="55%"  stopColor="#F5F8FA" />
          <stop offset="80%"  stopColor="#C8D4DA" />
          <stop offset="100%" stopColor="#8A9BA5" />
        </linearGradient>
        {/* Steel blade gradient — right sword */}
        <linearGradient id={`blade-r-${id}`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="#B8C4CC" />
          <stop offset="30%"  stopColor="#E8EEF2" />
          <stop offset="55%"  stopColor="#F5F8FA" />
          <stop offset="80%"  stopColor="#C8D4DA" />
          <stop offset="100%" stopColor="#8A9BA5" />
        </linearGradient>
        {/* Gold guard gradient */}
        <linearGradient id={`guard-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#D4A017" />
          <stop offset="40%"  stopColor="#F0C842" />
          <stop offset="70%"  stopColor="#C9A020" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        {/* Handle wrap */}
        <linearGradient id={`handle-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#5C3520" />
          <stop offset="50%"  stopColor="#7A4E2D" />
          <stop offset="100%" stopColor="#3A1E10" />
        </linearGradient>
        {/* Drop shadow filter */}
        <filter id={`shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* ── Left sword (top-left → bottom-right, tilted ~45°) ── */}
      <g transform="rotate(-45 32 32)" filter={`url(#shadow-${id})`}>
        {/* Blade */}
        <rect x="30.5" y="4" width="3" height="38" rx="0.5" fill={`url(#blade-l-${id})`} />
        {/* Blade edge highlight */}
        <rect x="31.5" y="4" width="0.6" height="38" rx="0.3" fill="white" opacity="0.5" />
        {/* Tip */}
        <polygon points="30.5,4 33.5,4 32,1" fill={`url(#blade-l-${id})`} />
        {/* Guard crosspiece */}
        <rect x="25" y="40" width="14" height="3" rx="1.2" fill={`url(#guard-${id})`} />
        <rect x="24.5" y="39.5" width="15" height="1" rx="0.5" fill="#F0C842" opacity="0.6" />
        {/* Handle */}
        <rect x="30" y="43" width="4" height="14" rx="1.5" fill={`url(#handle-${id})`} />
        {/* Handle wrap lines */}
        <rect x="30" y="46" width="4" height="0.8" rx="0.3" fill="#C9A36A" opacity="0.5" />
        <rect x="30" y="49" width="4" height="0.8" rx="0.3" fill="#C9A36A" opacity="0.5" />
        <rect x="30" y="52" width="4" height="0.8" rx="0.3" fill="#C9A36A" opacity="0.5" />
        {/* Pommel */}
        <ellipse cx="32" cy="58" rx="3" ry="2.2" fill={`url(#guard-${id})`} />
      </g>

      {/* ── Right sword (top-right → bottom-left, tilted ~-45°) ── */}
      <g transform="rotate(45 32 32)" filter={`url(#shadow-${id})`}>
        {/* Blade */}
        <rect x="30.5" y="4" width="3" height="38" rx="0.5" fill={`url(#blade-r-${id})`} />
        {/* Blade edge highlight */}
        <rect x="31.5" y="4" width="0.6" height="38" rx="0.3" fill="white" opacity="0.5" />
        {/* Tip */}
        <polygon points="30.5,4 33.5,4 32,1" fill={`url(#blade-r-${id})`} />
        {/* Guard crosspiece */}
        <rect x="25" y="40" width="14" height="3" rx="1.2" fill={`url(#guard-${id})`} />
        <rect x="24.5" y="39.5" width="15" height="1" rx="0.5" fill="#F0C842" opacity="0.6" />
        {/* Handle */}
        <rect x="30" y="43" width="4" height="14" rx="1.5" fill={`url(#handle-${id})`} />
        {/* Handle wrap lines */}
        <rect x="30" y="46" width="4" height="0.8" rx="0.3" fill="#C9A36A" opacity="0.5" />
        <rect x="30" y="49" width="4" height="0.8" rx="0.3" fill="#C9A36A" opacity="0.5" />
        <rect x="30" y="52" width="4" height="0.8" rx="0.3" fill="#C9A36A" opacity="0.5" />
        {/* Pommel */}
        <ellipse cx="32" cy="58" rx="3" ry="2.2" fill={`url(#guard-${id})`} />
      </g>
    </svg>
  )
}
