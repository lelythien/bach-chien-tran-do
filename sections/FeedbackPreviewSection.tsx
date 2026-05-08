'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth }       from '@/lib/authContext'
import { useFeedbacks }  from '@/lib/hooks/useFeedbacks'
import { createFeedback, FeedbackDoc } from '@/lib/services/firestoreService'
import { TESTIMONIALS }  from '@/lib/constants'
import LoginRequiredModal from '@/components/LoginRequiredModal'

/* ── Star Rating Picker ── */
function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0)
  const active = hover || value
  return (
    <div className="flex gap-1.5" role="radiogroup" aria-label="Đánh giá sao">
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} sao`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          whileTap={{ scale: 0.85 }}
          animate={{
            scale: active >= n ? [1, 1.25, 1] : 1,
            transition: { duration: 0.2 },
          }}
          className="text-2xl focus-visible:outline-none"
          style={{ color: active >= n ? '#D4A017' : 'rgba(201,163,106,0.35)' }}
        >
          ★
        </motion.button>
      ))}
    </div>
  )
}

/* ── Feedback Card ── */
function FeedbackCard({ fb, index }: { fb: FeedbackDoc; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-parchment p-6 h-full flex flex-col gap-4 relative group"
    >
      {/* Decorative quote */}
      <span className="absolute top-4 right-5 font-garamond font-bold text-earth-200/30 text-6xl leading-none select-none">"</span>

      {/* Stars */}
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(n => (
          <span key={n} className={n <= fb.rating ? 'star-filled' : 'star-empty'}>★</span>
        ))}
      </div>

      {/* Comment */}
      <p className="font-garamond text-earth-400 text-base leading-relaxed flex-1 italic">
        "{fb.comment}"
      </p>

      <div className="h-px bg-parchment-400/50" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-parchment-400/60 flex items-center justify-center
                        text-lg flex-shrink-0 overflow-hidden"
             style={{ background: 'rgba(201,163,106,0.15)' }}>
          {fb.avatar
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={fb.avatar} alt="" className="w-full h-full object-cover" />
            : '👤'}
        </div>
        <div>
          <p className="font-cinzel font-semibold text-earth-500 text-sm">{fb.name}</p>
          <p className="font-garamond text-earth-400/60 text-xs">Chiến binh</p>
        </div>
      </div>

      {/* Hover lift shadow */}
      <div className="absolute inset-0 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ boxShadow: 'inset 0 0 20px rgba(201,163,106,0.08)' }} />
    </motion.div>
  )
}

/* ── Skeleton ── */
function FeedbackSkeleton() {
  return (
    <div className="card-parchment p-6 h-48 flex flex-col gap-3">
      <div className="h-4 w-24 skeleton-shimmer rounded" />
      <div className="h-3 w-full skeleton-shimmer rounded" />
      <div className="h-3 w-3/4 skeleton-shimmer rounded" />
      <div className="mt-auto h-8 w-32 skeleton-shimmer rounded" />
    </div>
  )
}

/* ── Main ── */
export default function FeedbackPreviewSection() {
  const { user }                    = useAuth()
  const { feedbacks, loading }      = useFeedbacks(6)
  const [showLogin,  setShowLogin]  = useState(false)
  const [showForm,   setShowForm]   = useState(false)
  const [rating,     setRating]     = useState(5)
  const [comment,    setComment]    = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)

  const displayFeedbacks = feedbacks.length > 0
    ? feedbacks
    : TESTIMONIALS.map(t => ({
        uid: t.name, name: t.name, avatar: '', rating: t.rating,
        comment: t.comment.replace(/["""]/g, ''), approved: true, createdAt: null,
      } as FeedbackDoc))

  const handleOpenForm = () => {
    if (!user) { setShowLogin(true); return }
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    if (!comment.trim()) { toast.error('Vui lòng nhập nội dung feedback.'); return }
    setSubmitting(true)
    const result = await createFeedback({
      uid: user.uid, name: user.displayName ?? '',
      avatar: user.photoURL ?? '', rating, comment: comment.trim(),
    })
    setSubmitting(false)
    if (result.success) {
      setSubmitted(true); setShowForm(false)
      toast.success('Cảm ơn! Feedback đang chờ duyệt. ⚔', {
        duration: 5000,
        style: { background: '#F4EBCF', color: '#3B2A1E', border: '1px solid #C9A36A' },
      })
    } else {
      toast.error(result.error ?? 'Có lỗi xảy ra. Thử lại sau.')
    }
  }

  return (
    <section id="feedback" className="bg-parchment-texture py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-cinzel text-[10px] tracking-[0.35em] text-crimson-300 mb-3 uppercase">
            Cộng đồng chiến binh
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }} className="section-title">
            Tiếng vang từ<br />
            <span className="text-earth-300">chiến trường</span>
          </motion.h2>
          <div className="divider-ornate max-w-xs mx-auto mt-4"><span>⚜</span></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? [1,2,3].map(i => <FeedbackSkeleton key={i} />)
            : displayFeedbacks.map((fb, i) => <FeedbackCard key={fb.uid + i} fb={fb} index={i} />)
          }
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }} className="text-center mt-12">
          {submitted ? (
            <motion.p initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="font-cinzel text-earth-400 text-sm tracking-wider">
              ✦ Feedback đã gửi — đang chờ duyệt ✦
            </motion.p>
          ) : (
            <button onClick={handleOpenForm} className="btn-earth">
              <span>✍</span><span>Viết feedback của bạn</span>
            </button>
          )}
        </motion.div>
      </div>

      {/* Feedback Form Modal */}
      <AnimatePresence>
        {showForm && user && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: 'rgba(10,5,2,0.88)' }}
            onClick={() => setShowForm(false)}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full rounded-sm overflow-hidden"
              style={{
                background: '#F4EBCF',
                border: '2px solid #C9A36A',
                boxShadow: '0 0 60px rgba(201,163,106,0.2), 0 20px 60px rgba(0,0,0,0.5)',
              }}
              onClick={e => e.stopPropagation()}>
              <div className="h-0.5 bg-gradient-to-r from-earth-300 via-parchment-400 to-earth-300" />
              <div className="p-8">
                <h3 className="font-cinzel font-bold text-earth-500 text-xl mb-1">Chia sẻ trải nghiệm</h3>
                <p className="font-garamond text-earth-400/70 text-sm mb-6">Đăng nhập với: {user.displayName}</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="font-cinzel text-xs tracking-widest text-earth-500 block mb-2">ĐÁNH GIÁ</label>
                    <StarPicker value={rating} onChange={setRating} />
                  </div>
                  <div>
                    <label className="font-cinzel text-xs tracking-widest text-earth-500 block mb-2">NHẬN XÉT</label>
                    <textarea
                      value={comment} onChange={e => setComment(e.target.value)}
                      rows={4} required maxLength={500}
                      placeholder="Chia sẻ cảm nhận của bạn..."
                      className="input-parchment resize-none"
                    />
                    <p className="text-right font-garamond text-earth-400/50 text-xs mt-1">{comment.length}/500</p>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setShowForm(false)} className="btn-earth flex-1 justify-center">
                      Hủy
                    </button>
                    <button type="submit" disabled={submitting}
                      className="btn-primary flex-1 justify-center disabled:opacity-60">
                      {submitting
                        ? <><Loader size={14} className="animate-spin" /><span>Đang gửi...</span></>
                        : <><Send size={14} /><span>Gửi feedback</span></>}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginRequiredModal isOpen={showLogin} onClose={() => setShowLogin(false)}
        message="Đăng nhập để chia sẻ trải nghiệm của bạn với cộng đồng." />
    </section>
  )
}
