import {
  doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { SiteConfigDoc, FaqItem } from '@/lib/types/siteConfig.types'

const CONFIG_DOC = doc(db, 'siteConfig', 'main')

// ── Default config ────────────────────────────────────────────
export const DEFAULT_SITE_CONFIG: SiteConfigDoc = {
  home: {
    heroTitle:       'Bách Chiến Trận Đồ',
    heroSubtitle:    'Tái Hiện Những Trận Chiến Hào Hùng',
    heroDescription: 'Boardgame chiến thuật lịch sử Việt Nam — Điều binh khiển tướng, bày thế trận, phân tích địch tình.',
    gameDescription: 'Lấy cảm hứng từ những trận chiến lịch sử thời Trần, mang lịch sử dân tộc sống dậy qua từng quân cờ.',
  },
  order: {
    preorderGoal:  119,
    orderUrl:      process.env.NEXT_PUBLIC_ORDER_URL ?? 'https://coolvietnam.vn',
    projectStatus: 'Đang kêu gọi preorder',
  },
  social: {
    facebook: 'https://facebook.com',
    discord:  'https://discord.com',
    coolVn:   process.env.NEXT_PUBLIC_ORDER_URL ?? 'https://coolvietnam.vn',
  },
  settings: {
    preorderEnabled: true,
    feedbackEnabled: true,
  },
  faqs: [
    { id: '1', question: 'Bao nhiêu người chơi?',     answer: '2 người chơi đối kháng trực tiếp.',                                 order: 1 },
    { id: '2', question: 'Điều kiện chiến thắng?',    answer: 'Chiếm 25 ô trên bản đồ hoặc kéo chỉ số TT của đối thủ về 0%.',      order: 2 },
    { id: '3', question: 'Có những loại quân nào?',   answer: '5 loại quân: Bộ binh, Kỵ binh, Xa binh, Thủy binh, Tướng quân.',    order: 3 },
    { id: '4', question: 'Bao giờ phát hành?',        answer: 'Dự kiến phát hành sau khi đạt 119 preorder. Theo dõi để cập nhật!', order: 4 },
    { id: '5', question: 'Ship toàn quốc không?',     answer: 'Có, chúng tôi giao hàng toàn quốc.',                                  order: 5 },
  ],
}

// ── Get site config ───────────────────────────────────────────
export async function getSiteConfig(): Promise<SiteConfigDoc> {
  try {
    const snap = await getDoc(CONFIG_DOC)
    if (snap.exists()) {
      return { ...DEFAULT_SITE_CONFIG, ...snap.data() } as SiteConfigDoc
    }
    return DEFAULT_SITE_CONFIG
  } catch (err) {
    console.error('[siteConfigService] getSiteConfig:', err)
    return DEFAULT_SITE_CONFIG
  }
}

// ── Realtime site config ──────────────────────────────────────
export function subscribeSiteConfig(
  callback: (config: SiteConfigDoc) => void
): () => void {
  return onSnapshot(CONFIG_DOC, (snap) => {
    if (snap.exists()) {
      callback({ ...DEFAULT_SITE_CONFIG, ...snap.data() } as SiteConfigDoc)
    } else {
      callback(DEFAULT_SITE_CONFIG)
    }
  })
}

// ── Save full config ──────────────────────────────────────────
export async function saveSiteConfig(config: Partial<SiteConfigDoc>): Promise<boolean> {
  try {
    await setDoc(CONFIG_DOC, { ...config, updatedAt: serverTimestamp() }, { merge: true })
    return true
  } catch (err) {
    console.error('[siteConfigService] saveSiteConfig:', err)
    return false
  }
}

// ── Save FAQs ─────────────────────────────────────────────────
export async function saveFaqs(faqs: FaqItem[]): Promise<boolean> {
  try {
    await updateDoc(CONFIG_DOC, { faqs, updatedAt: serverTimestamp() })
    return true
  } catch (err) {
    // If doc doesn't exist yet, create it
    try {
      await setDoc(CONFIG_DOC, { faqs, updatedAt: serverTimestamp() }, { merge: true })
      return true
    } catch {
      return false
    }
  }
}
