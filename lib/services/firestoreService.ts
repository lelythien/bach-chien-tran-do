import {
  doc, setDoc, getDoc, serverTimestamp,
  collection, query, limit, getDocs,
  where
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

// ─── Types ────────────────────────────────────────────────────
export interface PreorderDoc {
  uid:       string
  name:      string
  email:     string
  createdAt: any
}

export interface FeedbackDoc {
  uid:       string
  name:      string
  avatar:    string
  rating:    number
  comment:   string
  createdAt: any
  approved:  boolean
}

// ═══════════════════════════════════════════════════════════════
// PREORDER SERVICES
// ═══════════════════════════════════════════════════════════════

/** Check if user has already pre-ordered */
export async function getPreorderByUid(uid: string): Promise<PreorderDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'preorders', uid))
    return snap.exists() ? (snap.data() as PreorderDoc) : null
  } catch (err) {
    console.error('[preorderService] getPreorderByUid:', err)
    return null
  }
}

/** Create a new preorder (one per user, uid = doc id) */
export async function createPreorder(user: {
  uid: string; name: string; email: string
}): Promise<{ success: boolean; alreadyExists: boolean; error?: string }> {
  try {
    const ref  = doc(db, 'preorders', user.uid)
    const snap = await getDoc(ref)

    if (snap.exists()) {
      return { success: false, alreadyExists: true }
    }

    await setDoc(ref, {
      uid:       user.uid,
      name:      user.name,
      email:     user.email,
      createdAt: serverTimestamp(),
    })

    return { success: true, alreadyExists: false }
  } catch (err: any) {
    console.error('[preorderService] createPreorder:', err)
    return { success: false, alreadyExists: false, error: err.message }
  }
}

// ═══════════════════════════════════════════════════════════════
// FEEDBACK SERVICES
// ═══════════════════════════════════════════════════════════════

/** Submit feedback (approved = false by default, awaits admin review) */
export async function createFeedback(data: {
  uid: string; name: string; avatar: string
  rating: number; comment: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if user already submitted feedback
    const existing = query(
      collection(db, 'feedbacks'),
      where('uid', '==', data.uid),
      limit(1)
    )
    const snap = await getDocs(existing)
    if (!snap.empty) {
      return { success: false, error: 'Bạn đã gửi feedback rồi.' }
    }

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

/** Fetch approved feedbacks */
export async function getApprovedFeedbacks(limitCount = 6): Promise<FeedbackDoc[]> {
  try {
    const q = query(
      collection(db, 'feedbacks'),
      where('approved', '==', true),
      limit(limitCount)
    )
    const snap = await getDocs(q)
    const docs = snap.docs.map(d => d.data() as FeedbackDoc)
    // Sort client-side to avoid needing a composite Firestore index
    return docs.sort((a, b) => {
      const ta = a.createdAt?.toMillis?.() ?? 0
      const tb = b.createdAt?.toMillis?.() ?? 0
      return tb - ta
    })
  } catch (err) {
    console.error('[feedbackService] getApprovedFeedbacks:', err)
    return []
  }
}
