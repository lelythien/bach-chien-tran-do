'use client'

import { motion } from 'framer-motion'
import GlossaryGrid from '@/components/rules/GlossaryGrid'
import MoraleTable from '@/components/rules/MoraleTable'
import SoldierCards from '@/components/rules/SoldierCards'

/* ─── Helpers ─────────────────────────────────────────────────── */
interface SectionWrapProps {
  anchor: string
  number: number
  icon: string
  label: string
  title: string
  subtitle?: string
  accentColor: string
  children: React.ReactNode
}

function SectionWrap({ anchor, number, icon, label, title, subtitle, accentColor, children }: SectionWrapProps) {
  return (
    <section id={anchor} className="scroll-mt-24 pb-16 border-b border-parchment-400/30 last:border-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="flex items-start gap-4 mb-6"
      >
        {/* Number + icon badge */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <div
            className="w-14 h-14 rounded-sm flex items-center justify-center text-2xl border-2 shadow-parchment"
            style={{ background: `${accentColor}15`, borderColor: `${accentColor}60`, boxShadow: `0 0 16px ${accentColor}20` }}
          >
            {icon}
          </div>
          <span className="font-cinzel text-[10px] tracking-widest" style={{ color: accentColor }}>
            {String(number).padStart(2, '0')}
          </span>
        </div>

        <div className="flex-1">
          <p className="font-garamond italic text-sm tracking-[0.08em] mb-1" style={{ color: accentColor }}>
            {label}
          </p>
          <h2 className="font-cinzel font-bold text-earth-500 text-xl md:text-2xl leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="font-garamond text-earth-400 text-base italic mt-1">{subtitle}</p>
          )}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="divider-ornate mb-8" style={{ '--divider-color': accentColor } as React.CSSProperties}>
        <span style={{ color: accentColor }}>⚜</span>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {children}
      </motion.div>
    </section>
  )
}

/* Info card component */
function InfoCard({ items, accentColor }: { items: { title: string; body: string }[]; accentColor: string }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className="card-parchment rounded-sm p-4"
          style={{ borderLeft: `3px solid ${accentColor}` }}
        >
          <p className="font-cinzel text-sm font-semibold text-earth-500 mb-1">{item.title}</p>
          <p className="font-garamond text-earth-400 text-base leading-relaxed">{item.body}</p>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── 9 Sections ──────────────────────────────────────────────── */
export default function RulesSections() {
  return (
    <div id="rules-content" className="py-16 bg-parchment-texture">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 1 — Giới thiệu & Cốt truyện */}
        <SectionWrap anchor="sec-gioi-thieu" number={1} icon="📜" label="Phần 1"
          title="Giới thiệu & Cốt truyện" accentColor="#C9A36A">
          <div className="space-y-4 font-garamond text-earth-400 text-lg leading-relaxed">
            <p>
              <strong className="text-earth-500">Bách Chiến Trận Đồ</strong> là trò chơi chiến thuật lấy bối cảnh
              lịch sử Việt Nam thời nhà Trần — giai đoạn quân dân Đại Việt ba lần đánh tan quân Nguyên Mông xâm lược
              (thế kỷ XIII).
            </p>
            <p>
              Mỗi người chơi đóng vai một <strong className="text-earth-500">Đại tướng</strong> dẫn dắt Đạo quân của mình
              trên chiến trường. Chiến lược, quản lý lương thực, tinh thần binh sĩ và địa hình — tất cả đều quyết định
              thắng bại.
            </p>
            <p>
              Trò chơi dành cho <strong className="text-earth-500">2–6 người</strong>, mỗi ván kéo dài
              <strong className="text-earth-500"> 45–90 phút</strong>. Độ tuổi phù hợp: <strong className="text-earth-500">12+</strong>.
            </p>
          </div>

          {/* Component thẻ lính */}
          <div className="mt-10">
            <p className="font-cinzel text-xs tracking-[0.25em] text-crimson-300 uppercase mb-4">
              Các loại binh sĩ trong trận
            </p>
            <SoldierCards />
          </div>
        </SectionWrap>

        {/* 2 — Cách chiến thắng */}
        <SectionWrap anchor="sec-chien-thang" number={2} icon="🏆" label="Phần 2"
          title="Cách chiến thắng" subtitle="Có 3 con đường dẫn đến vinh quang" accentColor="#D4A017">
          <InfoCard accentColor="#D4A017" items={[
            {
              title: '① Triệt hạ toàn quân địch',
              body: 'Tiêu diệt toàn bộ Đạo quân của đối phương (LL về 0). Đây là chiến thắng tuyệt đối — kết thúc ván ngay lập tức.',
            },
            {
              title: '② Để địch mất Tinh thần (TT = 0%)',
              body: 'Khiến Tinh thần của Đạo quân địch giảm về 0%. Đạo quân tan rã, người chơi đó bị loại. Đây thường là chiến lược cắt đứt lương thực.',
            },
            {
              title: '③ Chiến thắng điểm kiểm soát',
              body: 'Kiểm soát số lượng Ô đất chiến lược quy định trong kịch bản (tùy số người chơi). Chiến lược này đòi hỏi duy trì vị trí dài hạn.',
            },
          ]} />

          <div className="mt-5 p-4 rounded-sm"
               style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.3)', borderLeft: '3px solid #D4A017' }}>
            <p className="font-garamond text-earth-500 text-base">
              ⚠ Khi chỉ còn 2 người chơi, ván kết thúc ngay khi một trong 3 điều kiện trên được thỏa mãn.
              Với 3+ người chơi, người chơi bị loại rời ván, những người còn lại tiếp tục cho đến khi còn 1 người.
            </p>
          </div>
        </SectionWrap>

        {/* 3 — Thuật ngữ */}
        <SectionWrap anchor="sec-thuat-ngu" number={3} icon="📖" label="Phần 3"
          title="Giải thích từ viết tắt" subtitle="LL · LT · TT · SM và các thuật ngữ quan trọng" accentColor="#C9A36A">
          <GlossaryGrid />

          <div className="mt-10">
            <p className="font-garamond italic text-sm tracking-[0.08em] text-crimson-300 mb-4">
              Bảng Tinh thần (TT) ảnh hưởng Sức mạnh (SM)
            </p>
            <MoraleTable />
          </div>
        </SectionWrap>

        {/* 4 — Vật dụng */}
        <SectionWrap anchor="sec-vat-dung" number={4} icon="🎴" label="Phần 4"
          title="Các vật dụng trong trò chơi" subtitle="Thành phần trong hộp game" accentColor="#7A4E2D">
          <InfoCard accentColor="#7A4E2D" items={[
            { title: '120 Thẻ quân lính', body: 'Bộ binh (30), Kỵ binh (25), Cung thủ (15), Thủy binh (10), Cựu binh (10), Đại tướng (6 × 5 phe). Mỗi thẻ ghi rõ LL, SM cơ bản và kỹ năng đặc biệt.' },
            { title: '1 Bản đồ chiến trường', body: 'Bản đồ dạng lưới gồm 5 loại Ô đất: Đồng bằng, Rừng, Núi, Sông/Biển, Thành. Có đánh số tọa độ để ghi lệnh bí mật (HĐ3).' },
            { title: '30 Thẻ Thời tiết', body: 'Xáo trộn vào bộ bài chung. Rút 1 thẻ/lượt ở HĐ1. Có thể làm tăng/giảm LT thu được, phong tỏa di chuyển trên sông, hoặc tăng SM Cung thủ.' },
            { title: '60 Thẻ Kỹ năng', body: 'Mỗi Tướng lĩnh có bộ thẻ kỹ năng riêng. Rút theo số quy định ở HĐ1. Dùng trong HĐ2 (viện binh) hoặc HĐ4 (chiến đấu đặc biệt).' },
            { title: '50 Thẻ Token địa hình/Thành', body: 'Đặt lên bản đồ để đánh dấu Ô đất đang bị kiểm soát bởi phe nào. Cũng dùng để đánh dấu Thành bị chiếm.' },
            { title: '2 Xúc xắc D8', body: 'Dùng khi cần phân định trong một số trường hợp đặc biệt được ghi rõ trong thẻ Kỹ năng hoặc Thời tiết.' },
          ]} />
        </SectionWrap>

        {/* 5 — Loại thẻ & chỉ số */}
        <SectionWrap anchor="sec-loai-the" number={5} icon="⚔" label="Phần 5"
          title="Giải thích các loại thẻ & chỉ số" subtitle="Cách đọc thông tin trên mỗi thẻ" accentColor="#A52A2A">
          <InfoCard accentColor="#A52A2A" items={[
            { title: 'LL (Lực lượng) trên thẻ', body: 'Góc trên trái. Số lính trong 1 Toàn quân. Khi LL = 0, Toàn quân đó bị loại khỏi ô đất. Tổng LL của tất cả Toàn quân = sức mạnh tổng thể Đạo quân.' },
            { title: 'SM cơ bản trên thẻ', body: 'Góc trên phải. Sức mạnh cơ bản của loại lính này trên Ô đất bình thường. SM thực tế = SM cơ bản × hệ số địa hình × hệ số TT.' },
            { title: 'Chỉ số di chuyển', body: 'Góc dưới trái. Số ô tối đa có thể di chuyển trong HĐ3 (trên địa hình tiêu chuẩn). Địa hình khó có thể làm giảm chỉ số này.' },
            { title: 'Kỹ năng đặc biệt', body: 'Phần giữa thẻ, có biểu tượng ✦. Mô tả khả năng đặc biệt khi kết hợp với thẻ Kỹ năng hoặc điều kiện địa hình cụ thể.' },
            { title: 'Thẻ Tướng lĩnh', body: 'Thẻ lớn hơn, viền vàng. Tướng lĩnh không tham chiến trực tiếp nhưng cộng thêm bonus cho tất cả Toàn quân trong cùng Đạo quân. Nếu Tướng bị bắt, SM toàn Đạo quân giảm 50%.' },
          ]} />
        </SectionWrap>

        {/* 6 — Setup */}
        <SectionWrap anchor="sec-setup" number={6} icon="🗺" label="Phần 6"
          title="Cách setup bàn chơi" subtitle="Thiết lập trước khi bắt đầu ván" accentColor="#4A3A7A">
          <InfoCard accentColor="#4A3A7A" items={[
            {
              title: 'Bước 1: Trải bản đồ & thẻ khai hoang',
              body: 'Hai bên lựa chọn các thẻ khai hoang phù hợp rồi đặt lên bản đồ lớn ở chính giữa.',
            },
            {
              title: 'Bước 2: Chuẩn bị các chồng bài',
              body: 'Xáo đều rồi đặt các chồng bài về đúng vị trí phù hợp (như ảnh).',
            },
            {
              title: 'Bước 3: Chia Token cho 2 bên',
              body: 'Chia các Token theo đúng quy ước:\n• Đại Việt: 30 LL; 30 LT (tối đa 8 cung thủ).\n• Mông Nguyên: 45 LL; 150 LT (tối đa 15 kỵ binh).',
            },
            {
              title: 'Bước 4: Chọn Chủ tướng & Phó tướng',
              body: 'Mỗi bên bốc 3 thẻ tướng rồi chọn 1 Chủ tướng, 1 Phó tướng cho mình. Chủ tướng và Phó tướng khi chết sẽ khiến toàn quân bị trừ lần lượt 10% và 20% TT.',
            },
          ]} />
        </SectionWrap>

        {/* 7 — Hành động */}
        <SectionWrap anchor="sec-hanh-dong" number={7} icon="🔄" label="Phần 7"
          title="Các bước trong lượt" subtitle="4 hành động bắt buộc theo đúng thứ tự" accentColor="#C9A36A">
          <div className="space-y-5">

            {/* HĐ1 */}
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0 }}
              className="rounded-sm overflow-hidden" style={{ border: '2px solid #C9A36A50' }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'linear-gradient(135deg, #C9A36A22, #C9A36A08)' }}>
                <span className="font-cinzel font-black text-sm px-2 py-0.5 rounded-sm" style={{ background: '#C9A36A', color: '#3B2A1E' }}>HĐ1</span>
                <p className="font-cinzel font-bold text-earth-500 text-base">Bắt đầu lượt</p>
              </div>
              <div className="px-4 py-3 space-y-3" style={{ background: 'linear-gradient(180deg, #F4EBCF, #EDE0C4)' }}>
                <div className="flex gap-3">
                  <span className="font-cinzel font-black text-xs mt-0.5 flex-shrink-0" style={{ color: '#C9A36A' }}>1.</span>
                  <div>
                    <p className="font-garamond text-earth-500 text-base leading-relaxed">Lật 1 <strong>Thẻ Thời Tiết</strong> từ bộ bài.</p>
                    <p className="font-garamond text-earth-400 text-sm italic mt-0.5">(Sau khi hết lượt thì đặt lá bài vào chồng bài bỏ)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-cinzel font-black text-xs mt-0.5 flex-shrink-0" style={{ color: '#C9A36A' }}>2.</span>
                  <div>
                    <p className="font-garamond text-earth-500 text-base leading-relaxed">Mỗi người chơi rút thêm <strong>2 Thẻ Kỹ năng</strong> vào tay.</p>
                    <p className="font-garamond text-earth-400 text-sm italic mt-0.5">(Mỗi người chơi chỉ được giữ tối đa 5 Thẻ Kỹ năng trên tay. Nếu vượt quá, phải chọn bỏ bớt bài)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* HĐ2 */}
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}
              className="rounded-sm overflow-hidden" style={{ border: '2px solid #5C7A2D50' }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'linear-gradient(135deg, #5C7A2D22, #5C7A2D08)' }}>
                <span className="font-cinzel font-black text-sm px-2 py-0.5 rounded-sm" style={{ background: '#5C7A2D', color: '#F4EBCF' }}>HĐ2</span>
                <p className="font-cinzel font-bold text-earth-500 text-base">Thu hoạch</p>
              </div>
              <div className="px-4 py-3 space-y-3" style={{ background: 'linear-gradient(180deg, #F4EBCF, #EDE0C4)' }}>
                <div className="flex gap-3">
                  <span className="font-cinzel font-black text-xs mt-0.5 flex-shrink-0" style={{ color: '#5C7A2D' }}>1.</span>
                  <p className="font-garamond text-earth-500 text-base leading-relaxed">Thu hoạch <strong>Lương thực (LT)</strong> từ các ô Ruộng lúa đang kiểm soát.</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-cinzel font-black text-xs mt-0.5 flex-shrink-0" style={{ color: '#5C7A2D' }}>2.</span>
                  <div>
                    <p className="font-garamond text-earth-500 text-base leading-relaxed">Nhận <strong>viện binh</strong>.</p>
                    <p className="font-garamond text-earth-400 text-sm italic mt-0.5">(Mỗi đội tùy chọn binh chủng nhận được)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-cinzel font-black text-xs mt-0.5 flex-shrink-0" style={{ color: '#5C7A2D' }}>3.</span>
                  <p className="font-garamond text-earth-500 text-base leading-relaxed">Nuôi quân bằng LT và nhận <strong>hình phạt</strong> nếu không đủ LT nuôi quân.</p>
                </div>
              </div>
            </motion.div>

            {/* HĐ3 */}
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.16 }}
              className="rounded-sm overflow-hidden" style={{ border: '2px solid #4A3A7A50' }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'linear-gradient(135deg, #4A3A7A22, #4A3A7A08)' }}>
                <span className="font-cinzel font-black text-sm px-2 py-0.5 rounded-sm" style={{ background: '#4A3A7A', color: '#F4EBCF' }}>HĐ3</span>
                <p className="font-cinzel font-bold text-earth-500 text-base">Bày binh bố trận</p>
              </div>
              <div className="px-4 py-3 space-y-3" style={{ background: 'linear-gradient(180deg, #F4EBCF, #EDE0C4)' }}>
                <div className="flex gap-3">
                  <span className="font-cinzel font-black text-xs mt-0.5 flex-shrink-0" style={{ color: '#4A3A7A' }}>1.</span>
                  <p className="font-garamond text-earth-500 text-base leading-relaxed">Cả hai phe dựng <strong>vách ngăn</strong> trên bàn cờ nhỏ của mình.</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-cinzel font-black text-xs mt-0.5 flex-shrink-0" style={{ color: '#4A3A7A' }}>2.</span>
                  <p className="font-garamond text-earth-500 text-base leading-relaxed">Sử dụng các <strong>thẻ kỹ năng</strong> có tác động tới hành động trong lượt này.</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-cinzel font-black text-xs mt-0.5 flex-shrink-0" style={{ color: '#4A3A7A' }}>3.</span>
                  <p className="font-garamond text-earth-500 text-base leading-relaxed">Di chuyển quân và sử dụng các <strong>token chỉ hướng</strong> để bí mật lập trình sẵn tối đa <strong>2 bước di chuyển</strong> cho mỗi đạo quân trên sa bàn.</p>
                </div>
              </div>
            </motion.div>

            {/* HĐ4 */}
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.24 }}
              className="rounded-sm overflow-hidden" style={{ border: '2px solid #A52A2A50' }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'linear-gradient(135deg, #A52A2A22, #A52A2A08)' }}>
                <span className="font-cinzel font-black text-sm px-2 py-0.5 rounded-sm" style={{ background: '#A52A2A', color: '#F4EBCF' }}>HĐ4</span>
                <p className="font-cinzel font-bold text-earth-500 text-base">Chiến đấu</p>
              </div>
              <div className="px-4 py-4 space-y-4" style={{ background: 'linear-gradient(180deg, #F4EBCF, #EDE0C4)' }}>
                <p className="font-garamond text-earth-500 text-base leading-relaxed">
                  Hai bên hạ vách ngăn và công khai bàn cờ nhỏ. Việc di chuyển và chiến đấu diễn ra theo từng <strong>nhịp</strong>:
                </p>

                {/* Nhịp 1 */}
                <div className="rounded-sm p-3 space-y-2" style={{ background: 'rgba(165,42,42,0.06)', border: '1px solid rgba(165,42,42,0.25)', borderLeft: '3px solid #A52A2A' }}>
                  <p className="font-cinzel font-bold text-sm" style={{ color: '#A52A2A' }}>⚔ Nhịp 1</p>
                  <p className="font-garamond text-earth-500 text-base leading-relaxed">
                    Cả hai phe đồng thời di chuyển Token lãnh thổ trên bản đồ lớn theo <strong>bước số 1</strong> đã đặt.
                  </p>
                  <p className="font-garamond text-earth-400 text-sm leading-relaxed">
                    <strong className="text-earth-500">Thứ tự di chuyển:</strong> Phe <strong>Đại Việt</strong> thực hiện trước → Phe <strong>Mông Nguyên</strong> thực hiện sau.
                  </p>
                  <p className="font-garamond text-earth-500 text-base leading-relaxed">
                    Nếu hai đạo quân chạm trán tại cùng 1 ô, lập tức kích hoạt <strong>"Giao tranh"</strong>. Các bên được quyền sử dụng Thẻ Kỹ năng bổ trợ. Bên thua bị tiêu diệt hết toàn bộ LL ở ô đó, bên thắng chiếm lĩnh ô đất.
                  </p>
                </div>

                {/* Nhịp 2 */}
                <div className="rounded-sm p-3 space-y-2" style={{ background: 'rgba(165,42,42,0.06)', border: '1px solid rgba(165,42,42,0.25)', borderLeft: '3px solid #A52A2A' }}>
                  <p className="font-cinzel font-bold text-sm" style={{ color: '#A52A2A' }}>⚔ Nhịp 2</p>
                  <p className="font-garamond text-earth-500 text-base leading-relaxed">
                    Những LL còn lại tiếp tục di chuyển trên bản đồ theo <strong>bước số 2</strong> đã lập trình. Nếu xảy ra chạm trán, tiếp tục kích hoạt <strong>"Giao tranh"</strong>.
                  </p>
                  <div className="flex items-start gap-2 pt-1" style={{ borderTop: '1px solid rgba(165,42,42,0.15)' }}>
                    <span className="text-sm flex-shrink-0">⚠</span>
                    <p className="font-garamond text-earth-400 text-sm italic leading-relaxed">
                      Nếu một đạo quân bị tiêu diệt ở Nhịp 1, lệnh di chuyển Nhịp 2 của đạo quân đó tự động bị hủy bỏ.
                    </p>
                  </div>
                </div>

                {/* Nhịp 3+ */}
                <div className="rounded-sm p-3 space-y-2" style={{ background: 'rgba(122,31,31,0.06)', border: '1px solid rgba(122,31,31,0.25)', borderLeft: '3px solid #7A1F1F' }}>
                  <p className="font-cinzel font-bold text-sm" style={{ color: '#7A1F1F' }}>⚔ Nhịp 3 trở đi</p>
                  <p className="font-garamond text-earth-500 text-base leading-relaxed">
                    Sau khi hoàn tất Nhịp trước, chỉ những đạo quân <strong>Mông Nguyên</strong> được hưởng hiệu ứng liên quan tới <strong>tốc độ</strong> mới được quyền di chuyển thêm Nhịp tiếp theo và nếu chạm trán với LL đối thủ, tiếp tục kích hoạt <strong>"Giao tranh"</strong>.
                  </p>
                </div>

              </div>
            </motion.div>

          </div>
        </SectionWrap>

        {/* 8 — Giao tranh */}
        <SectionWrap anchor="sec-giao-tranh" number={8} icon="⚔" label="Phần 8"
          title="Cơ chế Giao tranh" subtitle="Cách tính tổn thất trong chiến đấu" accentColor="#A52A2A">
          <InfoCard accentColor="#A52A2A" items={[
            { title: 'Điều kiện xảy ra Giao tranh', body: 'Hai Đạo quân di chuyển vào cùng một Ô đất trong HĐ4, hoặc một bên chủ động tấn công Ô đất kề cạnh bằng thẻ Kỹ năng.' },
            { title: 'Tính SM trước khi giao tranh', body: 'SM = (Tổng LL của tất cả Toàn quân) × hệ số địa hình × hệ số TT. Địa hình Núi tăng SM Cung thủ ×2. Tính riêng cho mỗi bên.' },
            { title: 'Nhịp chiến đấu', body: 'Mỗi Nhịp: bên có SM cao hơn gây tổn thất LL = (SM chênh lệch ÷ SM bên địch) × LL bên địch. Làm tròn xuống. Cập nhật LL → tính lại SM → Nhịp tiếp theo.' },
            { title: 'Rút lui', body: 'Trước mỗi Nhịp, bên đang thua có thể tuyên bố Rút lui. Di chuyển toàn Đạo quân về Ô đất kề cạnh đã kiểm soát. Không thể rút về Ô đất địch đang kiểm soát.' },
            { title: 'Kết thúc Giao tranh', body: 'Giao tranh kết thúc khi: một bên LL = 0, hoặc một bên Rút lui, hoặc TT của một bên về 0% do thiệt hại quá lớn. Bên chiến thắng ở lại kiểm soát Ô đất.' },
          ]} />

          {/* Formula box */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-5 rounded-sm"
            style={{ background: 'linear-gradient(135deg, rgba(165,42,42,0.08), rgba(122,31,31,0.05))', border: '1px solid rgba(165,42,42,0.3)', borderLeft: '3px solid #A52A2A' }}
          >
            <p className="font-cinzel text-xs tracking-[0.25em] text-crimson-300 uppercase mb-3">Công thức tính tổn thất</p>
            <div className="space-y-2">
              <div className="font-cinzel text-earth-500 text-sm">
                <span className="text-crimson-300">SM</span> = Tổng LL × Hệ số địa hình × Hệ số TT
              </div>
              <div className="font-cinzel text-earth-500 text-sm">
                <span className="text-crimson-300">LL mất</span> = ⌊ (SM_ta − SM_địch) ÷ SM_địch × LL_địch ⌋
              </div>
            </div>
          </motion.div>
        </SectionWrap>

        {/* 9 — Lưu ý */}
        <SectionWrap anchor="sec-luu-y" number={9} icon="⚠" label="Phần 9"
          title="Lưu ý & Trường hợp đặc biệt" subtitle="Các tình huống ngoại lệ cần xử lý riêng" accentColor="#7A1F1F">
          <InfoCard accentColor="#7A1F1F" items={[
            { title: 'Hai Đạo quân cùng đến một ô trong HĐ3', body: 'Nếu lệnh di chuyển bí mật khiến hai Đạo quân từ hai phía cùng vào một ô, Giao tranh xảy ra ngay tại ô đó. Không bên nào được ưu tiên đứng trước.' },
            { title: 'Đại tướng bị cô lập', body: 'Nếu Tướng lĩnh bị bao vây (không có Toàn quân nào còn ở cùng ô), người chơi phải di chuyển Tướng về ô có Toàn quân trong HĐ3 tiếp theo. Tướng không thể chiến đấu một mình.' },
            { title: 'Hết thẻ Thời tiết', body: 'Nếu bộ bài Thời tiết hết trước khi ván kết thúc, xáo lại toàn bộ bài đã dùng và tiếp tục. Không có hiệu ứng nào kéo dài sang bộ bài mới.' },
            { title: 'Hòa LT trong Thu hoạch', body: 'Nếu hai người cùng kiểm soát một Ô đất LT ngay đầu HĐ2 (tình huống hiếm), không ai thu được LT từ ô đó lượt đó. Cần Giao tranh trước ở HĐ4 để phân định.' },
            { title: 'Kỵ binh qua ô Rừng', body: 'Kỵ binh không thể di chuyển qua Ô Rừng trong một lệnh liên tục. Phải dừng lại ở ô Rừng và dùng thêm 1 lượt để tiếp tục. Chỉ áp dụng cho đường chéo xuyên Rừng.' },
            { title: 'Nhiều Toàn quân hội tụ Giao tranh', body: 'Trong một Giao tranh, tổng SM của toàn bộ Đạo quân (mọi loại Toàn quân cộng lại) mới là SM đại diện cho bên đó. Không tính riêng từng Toàn quân.' },
          ]} />
        </SectionWrap>

      </div>
    </div>
  )
}
