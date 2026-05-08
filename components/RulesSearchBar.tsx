'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { NAV_SECTIONS } from '@/lib/rulesData'

interface SearchBarProps {
  onFilterChange: (category: string, query: string) => void
}

const ALL_FILTER = { id: 'all', icon: '📋', label: 'Tất cả' }

export default function RulesSearchBar({ onFilterChange }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const handleQuery = (val: string) => {
    setQuery(val)
    onFilterChange(activeCategory, val)
  }

  const handleCategory = (cat: string) => {
    setActiveCategory(cat)
    onFilterChange(cat, query)
  }

  const clearAll = () => {
    setQuery('')
    setActiveCategory('all')
    onFilterChange('all', '')
  }

  const filters = [ALL_FILTER, ...NAV_SECTIONS.map(s => ({ id: s.anchor, icon: s.icon, label: s.label }))]
  const hasFilter = query || activeCategory !== 'all'

  return (
    <div className="card-parchment p-5 rounded-sm mb-8">
      {/* Search input */}
      <div className="relative mb-4">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400/60">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={query}
          onChange={e => handleQuery(e.target.value)}
          placeholder="Tìm kiếm luật chơi..."
          className="w-full pl-9 pr-10 py-2.5 bg-transparent border border-parchment-400/50
                     focus:border-parchment-400 focus:outline-none rounded-sm
                     font-garamond text-earth-500 placeholder:text-earth-400/50 text-sm
                     transition-colors duration-200"
          style={{ background: 'rgba(244,235,207,0.6)' }}
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400/60 hover:text-earth-500 transition-colors"
            >
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs
                       font-cinzel tracking-wide transition-all duration-200
                       ${activeCategory === cat.id
                         ? 'border-parchment-400 bg-earth-500 text-parchment-200 shadow-parchment'
                         : 'border-parchment-400/30 text-earth-400 hover:border-parchment-400/60 hover:text-earth-500'
                       }`}
          >
            <span>{cat.icon}</span>
            <span className="hidden sm:inline">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Clear */}
      <AnimatePresence>
        {hasFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-parchment-400/30 flex items-center justify-end"
          >
            <button
              onClick={clearAll}
              className="font-cinzel text-[10px] tracking-widest text-crimson-300 hover:text-crimson-200 transition-colors uppercase"
            >
              Xóa bộ lọc
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
