import {
  doc, setDoc, getDoc, getDocs, deleteDoc,
  collection, query, orderBy, limit, where,
  onSnapshot, serverTimestamp, startAfter,
  QueryDocumentSnapshot, getCountFromServer,
  Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { PreorderDoc } from '@/lib/types/preorder.types'

// ── Create preorder (1 per uid) ──────────────────────────────
export async function createPreorder(user: {
  uid: string; name: string; email: string
}): Promise<{ success: boolean; alreadyExists: boolean; error?: string }> {
  try {
    const ref  = doc(db, 'preorders', user.uid)
    const snap = await getDoc(ref)
    if (snap.exists()) return { success: false, alreadyExists: true }

    await setDoc(ref, {
      uid:       user.uid,
      name:      user.name,
      email:     user.email,
      status:    'confirmed',
      createdAt: serverTimestamp(),
    })
    return { success: true, alreadyExists: false }
  } catch (err: any) {
    console.error('[preorderService] createPreorder:', err)
    return { success: false, alreadyExists: false, error: err.message }
  }
}

// ── Check preorder by uid ─────────────────────────────────────
export async function getPreorderByUid(uid: string): Promise<PreorderDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'preorders', uid))
    if (!snap.exists()) return null
    return { id: snap.id, ...snap.data() } as PreorderDoc
  } catch (err) {
    console.error('[preorderService] getPreorderByUid:', err)
    return null
  }
}

// ── Admin: get all preorders paginated ───────────────────────
export async function getAllPreorders(
  pageSize = 20,
  lastDoc?: QueryDocumentSnapshot
): Promise<{ preorders: PreorderDoc[]; lastDoc: QueryDocumentSnapshot | null }> {
  try {
    let q = query(
      collection(db, 'preorders'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    )
    if (lastDoc) q = query(q, startAfter(lastDoc))

    const snap = await getDocs(q)
    const preorders = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
    })) as PreorderDoc[]

    return {
      preorders,
      lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    }
  } catch (err) {
    console.error('[preorderService] getAllPreorders:', err)
    return { preorders: [], lastDoc: null }
  }
}

// ── Admin: realtime all preorders ────────────────────────────
export function subscribeAllPreorders(
  callback: (preorders: PreorderDoc[]) => void
): () => void {
  const q = query(collection(db, 'preorders'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })) as PreorderDoc[])
  })
}

// ── Admin: get preorder count ─────────────────────────────────
export async function getPreorderCount(): Promise<number> {
  try {
    const snap = await getCountFromServer(collection(db, 'preorders'))
    return snap.data().count
  } catch {
    return 0
  }
}

// ── Admin: preorders grouped by date (for chart) ─────────────
export async function getPreordersByDay(): Promise<{ date: string; count: number }[]> {
  try {
    const snap = await getDocs(
      query(collection(db, 'preorders'), orderBy('createdAt', 'asc'))
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
