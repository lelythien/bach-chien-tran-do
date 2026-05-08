export interface FaqItem {
  id:       string
  question: string
  answer:   string
  order:    number
}

export interface SiteConfigHome {
  heroTitle:       string
  heroSubtitle:    string
  heroDescription: string
  gameDescription: string
}

export interface SiteConfigOrder {
  preorderGoal:    number
  orderUrl:        string
  projectStatus:   string
}

export interface SiteConfigSocial {
  facebook: string
  discord:  string
  coolVn:   string
}

export interface SiteConfigSettings {
  preorderEnabled: boolean
  feedbackEnabled: boolean
}

export interface SiteConfigDoc {
  home:     SiteConfigHome
  order:    SiteConfigOrder
  social:   SiteConfigSocial
  settings: SiteConfigSettings
  faqs:     FaqItem[]
  updatedAt?: any
}

export type RulebookSection =
  | 'cover'
  | 'intro'
  | 'components'
  | 'cards'
  | 'setup'
  | 'turns'
  | 'combat'
  | 'special'

export interface RulebookImage {
  id:        string
  section:   RulebookSection
  title:     string
  url:       string
  storagePath: string
  order:     number
  createdAt: any
}

export const RULEBOOK_SECTIONS: { key: RulebookSection; label: string }[] = [
  { key: 'cover',      label: 'Bìa game' },
  { key: 'intro',      label: 'Giới thiệu & Cốt truyện' },
  { key: 'components', label: 'Vật dụng trong game' },
  { key: 'cards',      label: 'Các loại thẻ & Chỉ số' },
  { key: 'setup',      label: 'Setup bàn chơi' },
  { key: 'turns',      label: 'Các bước trong lượt' },
  { key: 'combat',     label: 'Cơ chế Giao tranh' },
  { key: 'special',    label: 'Lưu ý đặc biệt' },
]
