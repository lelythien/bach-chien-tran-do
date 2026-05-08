import {
  collection, getCountFromServer, onSnapshot, query, orderBy
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { UserDoc } from '@/lib/types/user.types'

// ── Get total user count ──────────────────────────────────────
export async function getUserCount(): Promise<number> {
  try {
    const snap = await getCountFromServer(collection(db, 'users'))
    return snap.data().count
  } catch {
    return 0
  }
}

// ── Realtime user count ───────────────────────────────────────
export function subscribeUserCount(callback: (count: number) => void): () => void {
  return onSnapshot(collection(db, 'users'), (snap) => {
    callback(snap.size)
  })
}
