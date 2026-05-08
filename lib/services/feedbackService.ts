import {
  doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc,
  collection, query, orderBy, limit, where,
  onSnapshot, serverTimestamp, getCountFromServer, Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { FeedbackDoc } from '@/lib/types/feedback.types'

// ── Submit feedback ───────────────────────────────────────────
export async function createFeedback(data: {
  uid: string; name: string; avatar: string
  rating: number; comment: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const existing = query(
      collection(db, 'feedbacks'),
      where('uid', '==', data.uid),
      limit(1)
    )
    const snap = await getDocs(existing)
    if (!snap.empty) return { success: false, error: 'Bạn đã gửi feedback rồi.' }

    await setDoc(doc(collection(db, 'feedbacks')), {
      ...data,
      approved:  false,
      createdAt: serverTimestamp(),
    })
    return { success: true }
  } catch (err: any) {
    console.error('[feedbackService] createFeedback:', err)
    return { success: false, error: err.message }
  }
}

// ── Get approved feedbacks (public) ─────────────────────────
export async function getApprovedFeedbacks(limitCount = 6): Promise<FeedbackDoc[]> {
  try {
    const q = query(
      collection(db, 'feedbacks'),
      where('approved', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() })) as FeedbackDoc[]
  } catch (err) {
    console.error('[feedbackService] getApprovedFeedbacks:', err)
    return []
  }
}

// ── Admin: realtime all feedbacks ────────────────────────────
export function subscribeAllFeedbacks(
  callback: (pending: FeedbackDoc[], approved: FeedbackDoc[]) => void
): () => void {
  const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    const all = snap.docs.map(d => ({ id: d.id, ...d.data() })) as FeedbackDoc[]
    callback(
      all.filter(f => !f.approved),
      all.filter(f =>  f.approved)
    )
  })
}

// ── Admin: approve feedback ───────────────────────────────────
export async function approveFeedback(id: string): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'feedbacks', id), { approved: true })
    return true
  } catch (err) {
    console.error('[feedbackService] approveFeedback:', err)
    return false
  }
}

// ── Admin: delete feedback ────────────────────────────────────
export async function deleteFeedback(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'feedbacks', id))
    return true
  } catch (err) {
    console.error('[feedbackService] deleteFeedback:', err)
    return false
  }
}

// ── Admin: feedback count ─────────────────────────────────────
export async function getFeedbackCount(): Promise<{ total: number; pending: number }> {
  try {
    const totalSnap   = await getCountFromServer(collection(db, 'feedbacks'))
    const pendingSnap = await getCountFromServer(
      query(collection(db, 'feedbacks'), where('approved', '==', false))
    )
    return {
      total:   totalSnap.data().count,
      pending: pendingSnap.data().count,
    }
  } catch {
    return { total: 0, pending: 0 }
  }
}

// ── Admin: feedbacks grouped by date (for chart) ─────────────
export async function getFeedbacksByDay(): Promise<{ date: string; count: number }[]> {
  try {
    const snap = await getDocs(
      query(collection(db, 'feedbacks'), orderBy('createdAt', 'asc'))
    )
    const map: Record<string, number> = {}
    snap.docs.forEach(d => {
      const ts = d.data().createdAt as Timestamp
      if (!ts?.toDate) return
      const date = ts.toDate().toISOString().split('T')[0]
      map[date] = (map[date] ?? 0) + 1
    })
    return Object.entries(map).map(([date, count]) => ({ date, count }))
  } catch {
    return []
  }
}

// ── Admin: rating distribution ────────────────────────────────
export async function getRatingDistribution(): Promise<{ rating: number; count: number }[]> {
  try {
    const snap = await getDocs(collection(db, 'feedbacks'))
    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    snap.docs.forEach(d => {
      const r = d.data().rating as number
      if (r >= 1 && r <= 5) dist[r]++
    })
    return Object.entries(dist).map(([rating, count]) => ({
      rating: Number(rating), count
    }))
  } catch {
    return []
  }
}
