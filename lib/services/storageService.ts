import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll
} from 'firebase/storage'
import {
  collection, doc, setDoc, getDocs, deleteDoc, updateDoc,
  query, orderBy, serverTimestamp, onSnapshot
} from 'firebase/firestore'
import { storage, db } from '@/lib/firebase'
import { RulebookImage, RulebookSection } from '@/lib/types/siteConfig.types'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 5 * 1024 * 1024  // 5MB

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) return 'Chỉ nhận .jpg, .png, .webp'
  if (file.size > MAX_SIZE_BYTES)         return 'File tối đa 5MB'
  return null
}

// ── Upload image to Storage + save metadata to Firestore ─────
export function uploadRulebookImage(
  file:      File,
  section:   RulebookSection,
  title:     string,
  order:     number,
  onProgress: (pct: number) => void
): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    const storagePath = `rules/${section}/${Date.now()}_${file.name}`
    const storageRef  = ref(storage, storagePath)
    const task        = uploadBytesResumable(storageRef, file)

    task.on(
      'state_changed',
      (snap) => onProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
      (err)  => resolve({ success: false, error: err.message }),
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref)
          const docRef = doc(collection(db, 'rulebookImages'))
          await setDoc(docRef, {
            section, title, url, storagePath, order,
            createdAt: serverTimestamp(),
          })
          resolve({ success: true })
        } catch (err: any) {
          resolve({ success: false, error: err.message })
        }
      }
    )
  })
}

// ── Get images for a section (realtime) ──────────────────────
export function subscribeRulebookImages(
  section: RulebookSection,
  callback: (images: RulebookImage[]) => void
): () => void {
  const q = query(
    collection(db, 'rulebookImages'),
    orderBy('order', 'asc')
  )
  return onSnapshot(q, (snap) => {
    const all = snap.docs
      .map(d => ({ id: d.id, ...d.data() })) as RulebookImage[]
    callback(all.filter(img => img.section === section))
  })
}

// ── Delete image ──────────────────────────────────────────────
export async function deleteRulebookImage(image: RulebookImage): Promise<boolean> {
  try {
    // Delete from Storage
    const storageRef = ref(storage, image.storagePath)
    await deleteObject(storageRef)
    // Delete from Firestore
    await deleteDoc(doc(db, 'rulebookImages', image.id))
    return true
  } catch (err) {
    console.error('[storageService] deleteRulebookImage:', err)
    return false
  }
}

// ── Update image order ────────────────────────────────────────
export async function updateImageOrder(id: string, order: number): Promise<void> {
  try {
    await updateDoc(doc(db, 'rulebookImages', id), { order })
  } catch (err) {
    console.error('[storageService] updateImageOrder:', err)
  }
}

// ── Update image title ────────────────────────────────────────
export async function updateImageTitle(id: string, title: string): Promise<void> {
  try {
    await updateDoc(doc(db, 'rulebookImages', id), { title })
  } catch (err) {
    console.error('[storageService] updateImageTitle:', err)
  }
}
