// ─── Site Constants ───────────────────────────────────────────
export const SITE_NAME = 'Bách Chiến Trận Đồ'
export const SITE_DESCRIPTION =
  'Boardgame chiến thuật lịch sử Việt Nam – Tái hiện những trận chiến hào hùng của dân tộc.'

// ─── Navigation ───────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Luật chơi', href: '/rules' },
  { label: 'Order',     href: '/#order' },
  { label: 'Feedback',  href: '/#feedback' },
] as const

// ─── Features ─────────────────────────────────────────────────
export const FEATURES = [
  {
    icon: '⚔',
    title: 'Chiến thuật chuyên sâu',
    description:
      'Điều binh khiển tướng, bày thế trận, phân tích địch tình – mỗi nước đi là một quyết định sinh tử.',
  },
  {
    icon: '📜',
    title: 'Lịch sử Việt Nam',
    description:
      'Lấy cảm hứng từ những trận chiến hào hùng thời Trần, mang lịch sử dân tộc sống dậy qua từng quân cờ.',
  },
  {
    icon: '🏰',
    title: 'Đấu trí nhiều người',
    description:
      'Cùng bạn bè và gia đình trải nghiệm những trận đấu kịch tính, rèn luyện tư duy chiến lược.',
  },
] as const

// ─── Demo Testimonials ────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name: 'Nguyễn Văn Minh',
    role: 'Chiến binh',
    avatar: '👨‍💼',
    rating: 5,
    comment:
      '"Trò chơi tuyệt vời! Vừa giải trí vừa học được nhiều về lịch sử Việt Nam. Rất phù hợp cho cả gia đình."',
  },
  {
    name: 'Trần Thị Lan',
    role: 'Tướng quân',
    avatar: '👩‍🎓',
    rating: 5,
    comment: '"Thiết kế bài bản, luật chơi dễ hiểu nhưng chiều sâu chiến thuật rất cao. Đã đặt mua 2 hộp!"',
  },
  {
    name: 'Phạm Đức Thắng',
    role: 'Đại thống lĩnh',
    avatar: '👨‍🏫',
    rating: 5,
    comment:
      '"Chất liệu cao cấp, hình ảnh đẹp. Một sản phẩm boardgame Việt Nam đáng tự hào. Ủng hộ hết mình!"',
  },
] as const

// ─── Demo Preorder Stats ──────────────────────────────────────
export const PREORDER_STATS = {
  current: 247,
  goal:    500,
  daysLeft: 21,
}

// ─── Rule Preview Placeholders ────────────────────────────────
export const RULE_PLACEHOLDERS = [
  { id: 1, title: 'Thiết lập bàn cờ',   aspect: 'square',    src: '/images/game-board.jpg'    },
  { id: 2, title: 'Giao tranh',         aspect: 'landscape', src: '/images/game-play.jpg'     },
  { id: 3, title: 'Các loại thẻ bài',   aspect: 'landscape', src: '/images/game-cards.jpg'    },
  { id: 4, title: 'Tướng lĩnh',         aspect: 'landscape', src: '/images/game-generals.jpg' },
] as const

