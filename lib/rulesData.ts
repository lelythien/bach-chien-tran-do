// ─── Bách Chiến Trận Đồ — Rules Data ─────────────────────────────
// Nội dung khớp đúng với rulebook PDF thật

// ─── Types ───────────────────────────────────────────────────────
export type SectionId =
  | 'gioi-thieu-co-truyen'
  | 'cach-chien-thang'
  | 'thuat-ngu'
  | 'vat-dung'
  | 'loai-the-chi-so'
  | 'setup-ban-choi'
  | 'buoc-trong-luot'
  | 'co-che-giao-tranh'
  | 'luu-y-dac-biet'

export interface NavSection {
  id: SectionId
  anchor: string
  icon: string
  label: string
}

// ─── Sidebar navigation sections ────────────────────────────────
export const NAV_SECTIONS: NavSection[] = [
  { id: 'gioi-thieu-co-truyen', anchor: 'sec-gioi-thieu',   icon: '📜', label: 'Giới thiệu & Cốt truyện' },
  { id: 'cach-chien-thang',     anchor: 'sec-chien-thang',  icon: '🏆', label: 'Cách chiến thắng' },
  { id: 'thuat-ngu',            anchor: 'sec-thuat-ngu',    icon: '📖', label: 'Thuật ngữ viết tắt' },
  { id: 'vat-dung',             anchor: 'sec-vat-dung',     icon: '🎴', label: 'Vật dụng trong trò chơi' },
  { id: 'loai-the-chi-so',      anchor: 'sec-loai-the',     icon: '⚔',  label: 'Loại thẻ & chỉ số' },
  { id: 'setup-ban-choi',       anchor: 'sec-setup',        icon: '🗺',  label: 'Setup bàn chơi' },
  { id: 'buoc-trong-luot',      anchor: 'sec-hanh-dong',    icon: '🔄', label: 'Các bước trong lượt' },
  { id: 'co-che-giao-tranh',    anchor: 'sec-giao-tranh',   icon: '⚔',  label: 'Cơ chế Giao tranh' },
  { id: 'luu-y-dac-biet',       anchor: 'sec-luu-y',        icon: '⚠',  label: 'Lưu ý & Đặc biệt' },
]

// ─── Glossary Terms ───────────────────────────────────────────────
export interface GlossaryTerm {
  abbr: string
  fullName: string
  icon: string
  description: string
  color: string
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    abbr: 'LL',
    fullName: 'Lực lượng',
    icon: '⚔',
    description: 'Số lượng quân lính thực tế trong một Đạo quân. LL quyết định sức mạnh chiến đấu cơ bản.',
    color: '#A52A2A',
  },
  {
    abbr: 'LT',
    fullName: 'Lương thực',
    icon: '🌾',
    description: 'Tài nguyên nuôi quân mỗi lượt. Thiếu LT làm giảm TT, ảnh hưởng trực tiếp đến SM của quân.',
    color: '#5C7A2D',
  },
  {
    abbr: 'TT',
    fullName: 'Tinh thần',
    icon: '🔥',
    description: 'Chỉ số tâm lý chiến đấu của Đạo quân (0–100%). TT thấp gây phạt nặng lên SM và di chuyển.',
    color: '#C9A36A',
  },
  {
    abbr: 'SM',
    fullName: 'Sức mạnh',
    icon: '💥',
    description: 'Chỉ số chiến đấu thực tế = LL nhân với hệ số TT. SM được tính khi Giao tranh.',
    color: '#7A1F1F',
  },
  {
    abbr: 'ĐQ',
    fullName: 'Đạo quân',
    icon: '🏳',
    description: 'Một đơn vị chiến đấu gồm nhiều Toàn quân, do một Tướng lĩnh chỉ huy. Đơn vị hành động chính trong trò chơi.',
    color: '#4A3A7A',
  },
  {
    abbr: 'TQ',
    fullName: 'Toàn quân',
    icon: '🧱',
    description: 'Đơn vị cơ bản trong một Đạo quân, gồm nhiều lính cùng loại (vd: 5 Bộ binh = 1 Toàn quân).',
    color: '#5C3520',
  },
  {
    abbr: 'ĐĐ',
    fullName: 'Ô đất',
    icon: '🟫',
    description: 'Ô vuông trên bàn cờ chiến trận. Có 5 loại: Đồng bằng, Rừng, Núi, Sông/Biển, Thành.',
    color: '#7A4E2D',
  },
]

// ─── TT (Tinh thần) Table ─────────────────────────────────────────
export interface TTRow {
  range: string
  min: number
  max: number
  smFormula: string
  movePenalty: boolean
  supplyPenalty: boolean
  isLose: boolean
  color: string
  label: string
  description: string
}

export const TT_TABLE: TTRow[] = [
  {
    range: '81–100%',
    min: 81, max: 100,
    smFormula: 'LL × 2',
    movePenalty: false, supplyPenalty: false, isLose: false,
    color: '#D4A017',
    label: 'Dũng mãnh',
    description: 'Quân sĩ hăng hái, sức mạnh vượt trội.',
  },
  {
    range: '61–80%',
    min: 61, max: 80,
    smFormula: 'LL × 1',
    movePenalty: false, supplyPenalty: false, isLose: false,
    color: '#5C7A2D',
    label: 'Bình thường',
    description: 'Chiến đấu tiêu chuẩn, không bị phạt.',
  },
  {
    range: '41–60%',
    min: 41, max: 60,
    smFormula: 'LL × 1',
    movePenalty: true, supplyPenalty: false, isLose: false,
    color: '#C9A36A',
    label: 'Mệt mỏi',
    description: 'SM không giảm nhưng bị phạt di chuyển.',
  },
  {
    range: '21–40%',
    min: 21, max: 40,
    smFormula: 'LL × 0.5',
    movePenalty: true, supplyPenalty: false, isLose: false,
    color: '#A07850',
    label: 'Suy yếu',
    description: 'SM giảm còn nửa, bị phạt di chuyển.',
  },
  {
    range: '1–20%',
    min: 1, max: 20,
    smFormula: 'LL × 0.5',
    movePenalty: false, supplyPenalty: true, isLose: false,
    color: '#7A1F1F',
    label: 'Kiệt sức',
    description: 'SM nửa, bị phạt nuôi quân mỗi lượt.',
  },
  {
    range: '0%',
    min: 0, max: 0,
    smFormula: '—',
    movePenalty: false, supplyPenalty: false, isLose: true,
    color: '#521414',
    label: 'THUA CUỘC',
    description: 'Đạo quân tan rã. Người chơi thua ngay lập tức.',
  },
]

// ─── Action Flow (4 Hành động trong lượt) ────────────────────────
export interface ActionStep {
  number: string
  title: string
  subtitle: string
  icon: string
  color: string
  details: string[]
  subSteps?: { label: string; desc: string }[]
}

export const ACTION_STEPS: ActionStep[] = [
  {
    number: 'HĐ1',
    title: 'Bắt đầu lượt',
    subtitle: 'Khởi động chiến trận',
    icon: '⚜',
    color: '#C9A36A',
    details: [
      'Rút 1 thẻ Thời tiết từ bộ bài Thời tiết chung',
      'Rút số thẻ Kỹ năng theo quy định của Tướng lĩnh',
      'Áp dụng hiệu ứng Thời tiết ngay lập tức',
    ],
  },
  {
    number: 'HĐ2',
    title: 'Thu hoạch',
    subtitle: 'Duy trì sức mạnh đội quân',
    icon: '🌾',
    color: '#5C7A2D',
    details: [
      'Thu LT từ các Ô đất đang kiểm soát',
      'Nhận viện binh nếu thỏa điều kiện thẻ Kỹ năng',
      'Trừ LT để nuôi quân (1 LT / Toàn quân / lượt)',
      'Tính lại TT dựa trên lượng LT còn lại',
    ],
  },
  {
    number: 'HĐ3',
    title: 'Bày binh bố trận',
    subtitle: 'Lập trình di chuyển bí mật',
    icon: '🗺',
    color: '#4A3A7A',
    details: [
      'Ghi kín lệnh di chuyển cho từng Đạo quân',
      'Có thể di chuyển, đứng yên, hoặc tấn công',
      'Lệnh được giữ bí mật đến khi tất cả xác nhận',
      'Các lệnh được thực hiện đồng thời khi lật mở',
    ],
  },
  {
    number: 'HĐ4',
    title: 'Chiến đấu',
    subtitle: 'Giao tranh theo nhịp',
    icon: '⚔',
    color: '#A52A2A',
    details: [
      'Lật mở lệnh di chuyển đồng thời',
      'Giải quyết xung đột theo Nhịp (vòng chiến đấu)',
      'Mỗi Nhịp: so sánh SM của hai bên → tính tổn thất',
      'Tiếp tục các Nhịp cho đến khi một bên rút lui hoặc bị tiêu diệt',
    ],
    subSteps: [
      { label: 'Nhịp 1', desc: 'Cả hai bên tuyên bố tấn công / phòng thủ' },
      { label: 'Giao tranh', desc: 'So sánh SM → tính LL tổn thất' },
      { label: 'Nhịp 2+', desc: 'Lặp lại đến khi có bên thua hoặc rút lui' },
    ],
  },
]

// ─── Soldier Types ────────────────────────────────────────────────
export interface SoldierType {
  id: string
  name: string
  count: string
  icon: string
  color: string
  texture: string
  specialRule: string
  movement: string
  terrain: string
  note?: string
}

export const SOLDIER_TYPES: SoldierType[] = [
  {
    id: 'bo-binh',
    name: 'Bộ binh',
    count: '×30',
    icon: '🗡',
    color: '#7A4E2D',
    texture: 'linear-gradient(135deg, #5C3520, #7A4E2D)',
    specialRule: 'Có thể gộp 3 Bộ binh thành 1 Cựu binh',
    movement: 'Lên/xuống/ngang — 1 ô/lượt',
    terrain: 'Đồng bằng, Rừng (phạt 1 nhịp)',
    note: undefined,
  },
  {
    id: 'ky-binh',
    name: 'Kỵ binh',
    count: '×25',
    icon: '🐴',
    color: '#A52A2A',
    texture: 'linear-gradient(135deg, #7A1F1F, #A52A2A)',
    specialRule: 'Di chuyển theo đường chéo',
    movement: 'Chéo — 2 ô/lượt',
    terrain: 'Đồng bằng, Núi (phạt SM)',
    note: 'Không thể vào Sông/Biển',
  },
  {
    id: 'cung-thu',
    name: 'Cung thủ',
    count: '×15',
    icon: '🏹',
    color: '#5C7A2D',
    texture: 'linear-gradient(135deg, #3A5C1A, #5C7A2D)',
    specialRule: 'SM × 2 khi đứng trên Ô Núi',
    movement: 'Lên/xuống/ngang — 1 ô/lượt',
    terrain: 'Núi (buff ×2), Rừng (bình thường)',
    note: undefined,
  },
  {
    id: 'thuy-binh',
    name: 'Thủy binh',
    count: '×10',
    icon: '⚓',
    color: '#1A4A7A',
    texture: 'linear-gradient(135deg, #102A50, #1A4A7A)',
    specialRule: 'Di chuyển không giới hạn trên Sông/Biển',
    movement: 'Sông/Biển — không giới hạn ô',
    terrain: 'Sông, Biển (chuyên biệt)',
    note: 'Không thể vào Đất liền',
  },
  {
    id: 'cuu-binh',
    name: 'Cựu binh',
    count: '×10',
    icon: '🛡',
    color: '#D4A017',
    texture: 'linear-gradient(135deg, #A07810, #D4A017)',
    specialRule: '3 Bộ binh → 1 Cựu binh. SM × 3',
    movement: 'Lên/xuống/ngang — 1 ô/lượt',
    terrain: 'Đồng bằng, Rừng',
    note: 'Không thể được tạo thêm, chỉ có 10 trong hộp',
  },
]

// ─── Gallery Items (real images from rulebook PDF — page-001.png → page-013.png) ──────
export interface GalleryItem {
  id: number
  filename: string
  title: string
  caption: string
  section: SectionId
  aspect: 'landscape' | 'portrait' | 'square'
  span?: 'wide' | 'normal'
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1,  filename: 'page-001.png', title: 'Trang 1 — Tổng quan',              caption: 'Giới thiệu Bách Chiến Trận Đồ và cốt truyện lịch sử', section: 'gioi-thieu-co-truyen', aspect: 'landscape', span: 'wide'   },
  { id: 2,  filename: 'page-002.png', title: 'Trang 2 — Cốt truyện',            caption: 'Bối cảnh lịch sử và thế giới trò chơi',               section: 'gioi-thieu-co-truyen', aspect: 'landscape', span: 'normal' },
  { id: 3,  filename: 'page-003.png', title: 'Trang 3 — Chiến thắng',           caption: 'Các con đường dẫn đến chiến thắng',                    section: 'cach-chien-thang',     aspect: 'landscape', span: 'normal' },
  { id: 4,  filename: 'page-004.png', title: 'Trang 4 — Thuật ngữ',             caption: 'Giải thích LL, LT, TT, SM và các ký hiệu',            section: 'thuat-ngu',            aspect: 'landscape', span: 'wide'   },
  { id: 5,  filename: 'page-005.png', title: 'Trang 5 — Vật dụng',              caption: 'Danh sách đầy đủ các thành phần trò chơi',            section: 'vat-dung',             aspect: 'landscape', span: 'normal' },
  { id: 6,  filename: 'page-006.png', title: 'Trang 6 — Loại thẻ',              caption: 'Giải thích từng loại thẻ và chỉ số trên thẻ',         section: 'loai-the-chi-so',      aspect: 'landscape', span: 'normal' },
  { id: 7,  filename: 'page-007.png', title: 'Trang 7 — Chỉ số thẻ lính',      caption: 'Đọc hiểu SM, LL, khả năng đặc biệt trên thẻ',        section: 'loai-the-chi-so',      aspect: 'landscape', span: 'wide'   },
  { id: 8,  filename: 'page-008.png', title: 'Trang 8 — Setup bàn chơi',        caption: 'Cách bày bàn cờ chiến trận đúng quy cách',           section: 'setup-ban-choi',       aspect: 'landscape', span: 'normal' },
  { id: 9,  filename: 'page-009.png', title: 'Trang 9 — Sơ đồ bố trí',         caption: 'Vị trí ban đầu của các Đạo quân',                    section: 'setup-ban-choi',       aspect: 'landscape', span: 'normal' },
  { id: 10, filename: 'page-010.png', title: 'Trang 10 — Sơ đồ hành động',     caption: 'Trình tự HĐ1 → HĐ2 → HĐ3 → HĐ4',                   section: 'buoc-trong-luot',      aspect: 'landscape', span: 'wide'   },
  { id: 11, filename: 'page-011.png', title: 'Trang 11 — Cơ chế Giao tranh',   caption: 'Giải thích Nhịp chiến đấu và tính tổn thất',          section: 'co-che-giao-tranh',    aspect: 'landscape', span: 'normal' },
  { id: 12, filename: 'page-012.png', title: 'Trang 12 — Bảng TT & SM',        caption: 'Tác động của Tinh thần lên Sức mạnh chiến đấu',      section: 'thuat-ngu',            aspect: 'landscape', span: 'normal' },
  { id: 13, filename: 'page-013.png', title: 'Trang 13 — Lưu ý đặc biệt',      caption: 'Các tình huống ngoại lệ cần xử lý đặc biệt',         section: 'luu-y-dac-biet',       aspect: 'landscape', span: 'wide'   },
]

// ─── Timeline Steps (alias for ACTION_STEPS for RulesTimeline) ────
export interface TimelineStep {
  step: number
  title: string
  subtitle: string
  icon: string
  color: string
  description: string
}

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: 1,
    title: 'Bắt đầu lượt',
    subtitle: 'HĐ1',
    icon: '⚜',
    color: '#C9A36A',
    description: 'Rút thẻ Thời tiết và Kỹ năng. Áp dụng hiệu ứng ngay lập tức.',
  },
  {
    step: 2,
    title: 'Thu hoạch',
    subtitle: 'HĐ2',
    icon: '🌾',
    color: '#5C7A2D',
    description: 'Thu LT từ ô kiểm soát. Tính lại TT. Nhận viện binh.',
  },
  {
    step: 3,
    title: 'Bày binh bố trận',
    subtitle: 'HĐ3',
    icon: '🗺',
    color: '#4A3A7A',
    description: 'Ghi lệnh di chuyển bí mật. Lật đồng thời khi tất cả xong.',
  },
  {
    step: 4,
    title: 'Chiến đấu',
    subtitle: 'HĐ4',
    icon: '⚔',
    color: '#A52A2A',
    description: 'Giao tranh theo Nhịp. Tính tổn thất đến khi một bên rút lui.',
  },
]
