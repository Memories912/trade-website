/**
 * Admin Mock Data
 * Complete mock dataset for the admin panel including users, inquiries,
 * sourcing requests, chat records, FAQ items, dashboard trends, and language configs.
 */

export const adminCredentials = { email: 'admin@trade.com', password: 'admin123' }

export const adminProfile = {
  id: 'admin_001',
  name: 'Admin',
  email: 'admin@trade.com',
  role: 'super_admin',
  avatar: null,
}

export const mockUsers = [
  { id: 'u_001', name: 'Kim Min-su', email: 'kim@abc.co.kr', company: 'ABC Trading Co.', country: 'Korea', status: 'active', avatar: null, createdAt: '2025-12-10' },
  { id: 'u_002', name: 'Tanaka Yuki', email: 'tanaka@def.jp', company: 'DEF Industries', country: 'Japan', status: 'active', avatar: null, createdAt: '2025-12-15' },
  { id: 'u_003', name: 'John Smith', email: 'john@ghi.com', company: 'GHI Imports LLC', country: 'USA', status: 'active', avatar: null, createdAt: '2025-12-20' },
  { id: 'u_004', name: 'Hans Mueller', email: 'hans@jkl.de', company: 'JKL GmbH', country: 'Germany', status: 'active', avatar: null, createdAt: '2026-01-05' },
  { id: 'u_005', name: 'Park Ji-yeon', email: 'park@mno.co.kr', company: 'MNO Electronics', country: 'Korea', status: 'inactive', avatar: null, createdAt: '2026-01-10' },
  { id: 'u_006', name: 'Li Wei', email: 'liwei@pqr.cn', company: 'PQR Trading', country: 'China', status: 'active', avatar: null, createdAt: '2026-01-15' },
  { id: 'u_007', name: 'Sarah Johnson', email: 'sarah@stu.com', company: 'STU Wholesale', country: 'UK', status: 'active', avatar: null, createdAt: '2026-01-20' },
  { id: 'u_008', name: 'Suzuki Akira', email: 'suzuki@vwx.jp', company: 'VWX Corp', country: 'Japan', status: 'active', avatar: null, createdAt: '2026-02-01' },
  { id: 'u_009', name: 'Pierre Dupont', email: 'pierre@yza.fr', company: 'YZA Sarl', country: 'France', status: 'inactive', avatar: null, createdAt: '2026-02-05' },
  { id: 'u_010', name: 'Cho Eun-ho', email: 'cho@bcd.co.kr', company: 'BCD Global', country: 'Korea', status: 'active', avatar: null, createdAt: '2026-02-10' },
  { id: 'u_011', name: 'Michael Brown', email: 'mike@efg.com', company: 'EFG Distributors', country: 'USA', status: 'active', avatar: null, createdAt: '2026-02-15' },
  { id: 'u_012', name: 'Wang Fang', email: 'wang@hij.cn', company: 'HIJ Exports', country: 'China', status: 'active', avatar: null, createdAt: '2026-02-20' },
  { id: 'u_013', name: 'Emily Davis', email: 'emily@klm.com.au', company: 'KLM Supplies', country: 'Australia', status: 'active', avatar: null, createdAt: '2026-03-01' },
  { id: 'u_014', name: 'Yamamoto Kenji', email: 'yamamoto@nop.jp', company: 'NOP Trading', country: 'Japan', status: 'active', avatar: null, createdAt: '2026-03-05' },
  { id: 'u_015', name: 'Maria Garcia', email: 'maria@qrs.es', company: 'QRS Importaciones', country: 'Spain', status: 'active', avatar: null, createdAt: '2026-03-10' },
  { id: 'u_016', name: 'Lee Dong-wook', email: 'lee@tuv.co.kr', company: 'TUV Tech', country: 'Korea', status: 'inactive', avatar: null, createdAt: '2026-03-12' },
  { id: 'u_017', name: 'Roberto Rossi', email: 'roberto@wxy.it', company: 'WXY Srl', country: 'Italy', status: 'active', avatar: null, createdAt: '2026-03-15' },
  { id: 'u_018', name: 'James Wilson', email: 'james@zab.ca', company: 'ZAB Industries', country: 'Canada', status: 'active', avatar: null, createdAt: '2026-03-18' },
]

export const mockInquiries = [
  { id: 'INQ-001', productId: 'cordless-drill', productName: '18V Brushless Impact Drill', customer: { name: 'Kim Min-su', email: 'kim@abc.co.kr', company: 'ABC Trading Co.', country: 'Korea' }, message: 'We are interested in purchasing 1000 units of the 18V Brushless Impact Drill. Please provide pricing, lead time, and available certifications for the Korean market.', status: 'pending', notes: [], replies: [], createdAt: '2026-03-20', updatedAt: '2026-03-20' },
  { id: 'INQ-002', productId: 'air-fryer', productName: '5.5L Digital Air Fryer', customer: { name: 'Tanaka Yuki', email: 'tanaka@def.jp', company: 'DEF Industries', country: 'Japan' }, message: 'Can you provide a quote for 500 units of the 5.5L Digital Air Fryer? We need PSE certification and Japanese language manual.', status: 'processing', notes: [{ id: 'n1', content: 'Customer needs PSE cert, checking availability with factory.', author: 'Admin', createdAt: '2026-03-19T10:30:00' }], replies: [], createdAt: '2026-03-18', updatedAt: '2026-03-19' },
  { id: 'INQ-003', productId: 'pressure-washer', productName: 'High Pressure Washer 2000PSI', customer: { name: 'John Smith', email: 'john@ghi.com', company: 'GHI Imports LLC', country: 'USA' }, message: 'Looking for 200 units of the pressure washer with ETL certification. Do you offer custom branding?', status: 'quoted', notes: [{ id: 'n2', content: 'ETL cert available. Custom branding at +$2/unit for MOQ 200.', author: 'Admin', createdAt: '2026-03-17T14:20:00' }], replies: [{ id: 'r1', content: 'Dear John, Thank you for your inquiry. We can offer the 2000PSI Pressure Washer at $85/unit FOB Shenzhen, with ETL certification. Custom branding adds $2/unit. Lead time is 30-40 days.', sentAt: '2026-03-17T15:00:00' }], createdAt: '2026-03-15', updatedAt: '2026-03-17' },
  { id: 'INQ-004', productId: 'laser-level', productName: '16-Line Laser Level', customer: { name: 'Hans Mueller', email: 'hans@jkl.de', company: 'JKL GmbH', country: 'Germany' }, message: 'We need 300 units of the 16-line laser level for our construction projects in Germany. Please confirm CE certification and German manual availability.', status: 'processing', notes: [], replies: [], createdAt: '2026-03-14', updatedAt: '2026-03-14' },
  { id: 'INQ-005', productId: 'humidifier', productName: 'Ultrasonic Humidifier 5L', customer: { name: 'Park Ji-yeon', email: 'park@mno.co.kr', company: 'MNO Electronics', country: 'Korea' }, message: 'Interested in 800 units of the humidifier. Please share detailed specs, KC cert, and packaging details.', status: 'pending', notes: [], replies: [], createdAt: '2026-03-13', updatedAt: '2026-03-13' },
  { id: 'INQ-006', productId: 'angle-grinder', productName: 'Angle Grinder 4.5" Brushless', customer: { name: 'Li Wei', email: 'liwei@pqr.cn', company: 'PQR Trading', country: 'China' }, message: 'Can you supply 2000 units of the angle grinder? We need OEM branding with our logo.', status: 'quoted', notes: [{ id: 'n3', content: 'OEM branding confirmed. Quote sent at $42/unit.', author: 'Admin', createdAt: '2026-03-11T09:00:00' }], replies: [{ id: 'r2', content: 'Dear Li Wei, OEM order for 2000 units at $42/unit FOB. Lead time 35 days. 30% deposit required.', sentAt: '2026-03-11T10:30:00' }], createdAt: '2026-03-10', updatedAt: '2026-03-11' },
  { id: 'INQ-007', productId: 'gas-detector', productName: '4-in-1 Gas Detector', customer: { name: 'Sarah Johnson', email: 'sarah@stu.com', company: 'STU Wholesale', country: 'UK' }, message: 'Need 150 units of gas detector for mining applications. ATEX certification required.', status: 'pending', notes: [], replies: [], createdAt: '2026-03-09', updatedAt: '2026-03-09' },
  { id: 'INQ-008', productId: 'submersible-pump', productName: 'Submersible Pump 1.5HP', customer: { name: 'Suzuki Akira', email: 'suzuki@vwx.jp', company: 'VWX Corp', country: 'Japan' }, message: 'Quotation request for 100 units submersible pump, PSE certified, for agricultural use.', status: 'processing', notes: [{ id: 'n4', content: 'PSE cert in progress, ETA 2 weeks.', author: 'Admin', createdAt: '2026-03-08T11:00:00' }], replies: [], createdAt: '2026-03-07', updatedAt: '2026-03-08' },
  { id: 'INQ-009', productId: 'circular-saw', productName: '7-1/4" Circular Saw 1650W', customer: { name: 'Pierre Dupont', email: 'pierre@yza.fr', company: 'YZA Sarl', country: 'France' }, message: 'Please quote 400 units circular saw with CE and French manual.', status: 'closed', notes: [{ id: 'n5', content: 'Order completed. Customer satisfied.', author: 'Admin', createdAt: '2026-03-04T16:00:00' }], replies: [{ id: 'r3', content: 'Dear Pierre, Order for 400 units confirmed at $65/unit. Delivery scheduled for April 15.', sentAt: '2026-03-01T14:00:00' }], createdAt: '2026-02-25', updatedAt: '2026-03-04' },
  { id: 'INQ-010', productId: 'steam-cleaner', productName: 'Steam Cleaner 1500W', customer: { name: 'Cho Eun-ho', email: 'cho@bcd.co.kr', company: 'BCD Global', country: 'Korea' }, message: 'Looking for 250 units steam cleaner. KC cert required. Please share MOQ and pricing.', status: 'quoted', notes: [], replies: [{ id: 'r4', content: 'Dear Cho, MOQ is 200 units. Price at $78/unit FOB Shenzhen with KC certification. Lead time 25-30 days.', sentAt: '2026-03-03T09:30:00' }], createdAt: '2026-03-01', updatedAt: '2026-03-03' },
  { id: 'INQ-011', productId: 'coffee-grinder', productName: 'Electric Coffee Grinder', customer: { name: 'Michael Brown', email: 'mike@efg.com', company: 'EFG Distributors', country: 'USA' }, message: 'Interested in 600 units coffee grinder for US market. FCC cert needed.', status: 'pending', notes: [], replies: [], createdAt: '2026-03-19', updatedAt: '2026-03-19' },
  { id: 'INQ-012', productId: 'drain-pump', productName: 'Sewage Submersible Pump 0.75HP', customer: { name: 'Emily Davis', email: 'emily@klm.com.au', company: 'KLM Supplies', country: 'Australia' }, message: 'Need 80 units sewage pump for municipal project. SAA certification required.', status: 'processing', notes: [{ id: 'n6', content: 'Checking SAA cert availability with factory.', author: 'Admin', createdAt: '2026-03-16T10:00:00' }], replies: [], createdAt: '2026-03-15', updatedAt: '2026-03-16' },
  { id: 'INQ-013', productId: 'oscillating-tool', productName: 'Oscillating Multi-Tool 300W', customer: { name: 'Roberto Rossi', email: 'roberto@wxy.it', company: 'WXY Srl', country: 'Italy' }, message: 'Please quote 350 units oscillating multi-tool for EU market.', status: 'pending', notes: [], replies: [], createdAt: '2026-03-20', updatedAt: '2026-03-20' },
  { id: 'INQ-014', productId: 'rotary-laser', productName: 'Rotary Laser Level', customer: { name: 'James Wilson', email: 'james@zab.ca', company: 'ZAB Industries', country: 'Canada' }, message: 'Request quote for 50 units rotary laser level for construction surveying.', status: 'processing', notes: [], replies: [], createdAt: '2026-03-17', updatedAt: '2026-03-17' },
  { id: 'INQ-015', productId: 'ph-meter', productName: 'Professional pH Meter', customer: { name: 'Maria Garcia', email: 'maria@qrs.es', company: 'QRS Importaciones', country: 'Spain' }, message: 'We need 200 units pH meter for laboratory distribution in Spain.', status: 'pending', notes: [], replies: [], createdAt: '2026-03-20', updatedAt: '2026-03-20' },
  { id: 'INQ-016', productId: 'transfer-pump', productName: 'Diesel Transfer Pump 12V', customer: { name: 'Yamamoto Kenji', email: 'yamamoto@nop.jp', company: 'NOP Trading', country: 'Japan' }, message: 'Interested in 120 units diesel transfer pump. PSE certification needed.', status: 'quoted', notes: [], replies: [{ id: 'r5', content: 'Dear Yamamoto, 120 units at $55/unit FOB. PSE cert available. Lead time 20-25 days.', sentAt: '2026-03-12T11:00:00' }], createdAt: '2026-03-10', updatedAt: '2026-03-12' },
  { id: 'INQ-017', productId: 'alcohol-tester', productName: 'Professional Alcohol Tester', customer: { name: 'Lee Dong-wook', email: 'lee@tuv.co.kr', company: 'TUV Tech', country: 'Korea' }, message: 'Require 300 units alcohol tester with KC cert for police procurement.', status: 'closed', notes: [{ id: 'n7', content: 'Order delivered. Follow-up scheduled.', author: 'Admin', createdAt: '2026-03-05T14:00:00' }], replies: [{ id: 'r6', content: 'Dear Lee, Order for 300 units at $38/unit delivered. Thank you for your business.', sentAt: '2026-03-02T16:00:00' }], createdAt: '2026-02-20', updatedAt: '2026-03-05' },
]

export const mockSourcingRequests = [
  { id: 'SR-001', title: 'Industrial Wet/Dry Vacuum Cleaner', description: 'Looking for a heavy-duty wet/dry vacuum cleaner for industrial use. Must have 20L+ capacity, 1400W+ motor, and HEPA filter. Target market: Germany.', customer: { name: 'Hans Mueller', email: 'hans@jkl.de', company: 'JKL GmbH', country: 'Germany' }, status: 'pending', quote: null, createdAt: '2026-03-19', updatedAt: '2026-03-19' },
  { id: 'SR-002', title: 'Cordless Impact Wrench 1/2"', description: 'Need 1/2" cordless impact wrench with brushless motor, 18V or 20V platform. At least 300Nm torque. For Korean automotive market.', customer: { name: 'Kim Min-su', email: 'kim@abc.co.kr', company: 'ABC Trading Co.', country: 'Korea' }, status: 'quoted', quote: { price: 65, currency: 'USD', leadTime: '35-40 days', notes: 'KC certification included. 18V platform with 4.0Ah battery kit.', quotedAt: '2026-03-17' }, createdAt: '2026-03-15', updatedAt: '2026-03-17' },
  { id: 'SR-003', title: 'Digital Multimeter with Data Logging', description: 'Looking for professional-grade digital multimeter with data logging capability, Bluetooth connectivity, and CAT III 600V safety rating.', customer: { name: 'John Smith', email: 'john@ghi.com', company: 'GHI Imports LLC', country: 'USA' }, status: 'pending', quote: null, createdAt: '2026-03-18', updatedAt: '2026-03-18' },
  { id: 'SR-004', title: 'Backpack Leaf Blower 60V', description: 'Need 60V backpack leaf blower for commercial landscaping. Must be brushless, have variable speed, and low vibration. For Japanese market.', customer: { name: 'Tanaka Yuki', email: 'tanaka@def.jp', company: 'DEF Industries', country: 'Japan' }, status: 'processing', quote: null, createdAt: '2026-03-16', updatedAt: '2026-03-16' },
  { id: 'SR-005', title: 'Portable Power Station 1000W', description: 'Looking for 1000W portable power station with LiFePO4 battery, multiple output ports (AC/DC/USB), and solar charging capability.', customer: { name: 'Park Ji-yeon', email: 'park@mno.co.kr', company: 'MNO Electronics', country: 'Korea' }, status: 'quoted', quote: { price: 180, currency: 'USD', leadTime: '30-35 days', notes: 'LiFePO4 1000W with solar input. KC cert in progress, ETA 10 days.', quotedAt: '2026-03-14' }, createdAt: '2026-03-12', updatedAt: '2026-03-14' },
  { id: 'SR-006', title: 'Diamond Blade Set for Concrete', description: 'Need 4-1/2" and 7" diamond blades for concrete cutting. Professional grade, continuous rim, with arbor adapters.', customer: { name: 'Pierre Dupont', email: 'pierre@yza.fr', company: 'YZA Sarl', country: 'France' }, status: 'closed', quote: { price: 12, currency: 'USD', leadTime: '15-20 days', notes: 'Set of 4-1/2" and 7" blades. CE certified.', quotedAt: '2026-03-08' }, createdAt: '2026-03-05', updatedAt: '2026-03-10' },
  { id: 'SR-007', title: 'Thermal Imaging Camera', description: 'Seeking handheld thermal imaging camera with 320x240 resolution, -20°C to 550°C range, and WiFi connectivity. For building inspection market.', customer: { name: 'Sarah Johnson', email: 'sarah@stu.com', company: 'STU Wholesale', country: 'UK' }, status: 'pending', quote: null, createdAt: '2026-03-20', updatedAt: '2026-03-20' },
  { id: 'SR-008', title: 'Cordless Rivet Gun', description: 'Need 18V cordless rivet gun for steel and aluminum rivets up to 6.4mm. Brushless motor preferred. Australian market.', customer: { name: 'Emily Davis', email: 'emily@klm.com.au', company: 'KLM Supplies', country: 'Australia' }, status: 'processing', quote: null, createdAt: '2026-03-17', updatedAt: '2026-03-17' },
  { id: 'SR-009', title: 'Auto-Darkening Welding Helmet', description: 'Looking for solar-powered auto-darkening welding helmet with 1/1/1/2 optical class, grind mode, and adjustable shade 9-13.', customer: { name: 'Li Wei', email: 'liwei@pqr.cn', company: 'PQR Trading', country: 'China' }, status: 'quoted', quote: { price: 28, currency: 'USD', leadTime: '25-30 days', notes: '1/1/1/2 optical class, solar powered. CE and ANSI certified.', quotedAt: '2026-03-13' }, createdAt: '2026-03-10', updatedAt: '2026-03-13' },
  { id: 'SR-010', title: 'Battery-Powered Chain Saw 18V', description: 'Need 18V cordless chain saw with 12" bar length, tool-less chain tensioning, and safety brake. For consumer market in Canada.', customer: { name: 'James Wilson', email: 'james@zab.ca', company: 'ZAB Industries', country: 'Canada' }, status: 'pending', quote: null, createdAt: '2026-03-20', updatedAt: '2026-03-20' },
  { id: 'SR-011', title: 'Industrial Dehumidifier 50L/day', description: 'Looking for 50L/day industrial dehumidifier with pump drain, continuous operation capability, and RS485 control interface.', customer: { name: 'Suzuki Akira', email: 'suzuki@vwx.jp', company: 'VWX Corp', country: 'Japan' }, status: 'processing', quote: null, createdAt: '2026-03-18', updatedAt: '2026-03-18' },
  { id: 'SR-012', title: 'Mini Excavator Attachment - Hydraulic Breaker', description: 'Need hydraulic breaker attachment for 1.5-2.5 ton mini excavators. Must be compatible with standard hydraulic flow rates.', customer: { name: 'Roberto Rossi', email: 'roberto@wxy.it', company: 'WXY Srl', country: 'Italy' }, status: 'closed', quote: { price: 1200, currency: 'USD', leadTime: '45-50 days', notes: 'Compatible with 1.5-2.5T excavators. CE certified. Chisel included.', quotedAt: '2026-02-28' }, createdAt: '2026-02-25', updatedAt: '2026-03-05' },
]

export const mockChatRecords = [
  {
    userId: 'u_001', userName: 'Kim Min-su',
    messages: [
      { id: 'msg_001', role: 'user', content: 'What is the MOQ for the 18V Impact Drill?', timestamp: '2026-03-20T09:00:00' },
      { id: 'msg_002', role: 'assistant', content: 'The MOQ for the 18V Brushless Impact Drill is 500 pcs. For first-time orders, we can support trial orders of 200 pcs.', timestamp: '2026-03-20T09:00:15' },
      { id: 'msg_003', role: 'user', content: 'Is KC certification available?', timestamp: '2026-03-20T09:01:00' },
      { id: 'msg_004', role: 'assistant', content: 'Yes, KC certification is available for the 18V Impact Drill. We also have CE, FCC, and PSE certifications.', timestamp: '2026-03-20T09:01:12' },
      { id: 'msg_005', role: 'user', content: 'What is the lead time for 1000 units?', timestamp: '2026-03-20T09:02:00' },
      { id: 'msg_006', role: 'assistant', content: 'For 1000 units, the standard lead time is 30-45 days including production, QC inspection, and packaging.', timestamp: '2026-03-20T09:02:10' },
    ],
  },
  {
    userId: 'u_002', userName: 'Tanaka Yuki',
    messages: [
      { id: 'msg_007', role: 'user', content: 'PSE認証のあるエアフライヤーはありますか？', timestamp: '2026-03-19T14:00:00' },
      { id: 'msg_008', role: 'assistant', content: 'はい、5.5LデジタルエアフライヤーはPSE認証を取得しています。日本語取扱説明書もご用意できます。', timestamp: '2026-03-19T14:00:20' },
      { id: 'msg_009', role: 'user', content: '500台の見積もりをいただけますか？', timestamp: '2026-03-19T14:01:30' },
      { id: 'msg_010', role: 'assistant', content: '500台のお見積り：FOB深圳 $42/台、リードタイム25-35日。PSE認証・日本語マニュアル付きです。', timestamp: '2026-03-19T14:01:45' },
    ],
  },
  {
    userId: 'u_003', userName: 'John Smith',
    messages: [
      { id: 'msg_011', role: 'user', content: 'Do you offer OEM branding on pressure washers?', timestamp: '2026-03-18T10:00:00' },
      { id: 'msg_012', role: 'assistant', content: 'Yes, we offer OEM branding on pressure washers. Custom logo printing and packaging design are available. MOQ for OEM is 200 units with a setup fee of $200.', timestamp: '2026-03-18T10:00:18' },
    ],
  },
  {
    userId: 'u_004', userName: 'Hans Mueller',
    messages: [
      { id: 'msg_013', role: 'user', content: 'Können Sie die 16-Linien-Laserwaage mit deutscher Anleitung liefern?', timestamp: '2026-03-17T08:30:00' },
      { id: 'msg_014', role: 'assistant', content: 'Ja, wir können die 16-Linien-Laserwaage mit deutscher Bedienungsanleitung liefern. CE-Zertifizierung ist ebenfalls verfügbar.', timestamp: '2026-03-17T08:30:25' },
      { id: 'msg_015', role: 'user', content: 'Was ist die MOQ?', timestamp: '2026-03-17T08:31:00' },
      { id: 'msg_016', role: 'assistant', content: 'Die MOQ für die 16-Linien-Laserwaage beträgt 300 Stück. Probebestellungen ab 50 Stück sind möglich.', timestamp: '2026-03-17T08:31:12' },
    ],
  },
  {
    userId: 'u_007', userName: 'Sarah Johnson',
    messages: [
      { id: 'msg_017', role: 'user', content: 'I need gas detectors with ATEX certification for UK mining operations.', timestamp: '2026-03-16T11:00:00' },
      { id: 'msg_018', role: 'assistant', content: 'Our 4-in-1 Gas Detector is available with ATEX certification. It detects O2, H2S, CO, and LEL. Price starts at $120/unit for MOQ 100.', timestamp: '2026-03-16T11:00:30' },
      { id: 'msg_019', role: 'user', content: 'Can you provide calibration certificates?', timestamp: '2026-03-16T11:02:00' },
      { id: 'msg_020', role: 'assistant', content: 'Yes, each unit comes with a factory calibration certificate. We also offer annual recalibration services.', timestamp: '2026-03-16T11:02:15' },
    ],
  },
  {
    userId: 'u_010', userName: 'Cho Eun-ho',
    messages: [
      { id: 'msg_021', role: 'user', content: '스팀 청소기 KC 인증 가능한가요?', timestamp: '2026-03-15T16:00:00' },
      { id: 'msg_022', role: 'assistant', content: '네, 스팀 청소기 1500W 모델은 KC 인증이 가능합니다. 추가 인증 비용은 주문 수량에 따라 다릅니다.', timestamp: '2026-03-15T16:00:22' },
    ],
  },
  {
    userId: 'u_011', userName: 'Michael Brown',
    messages: [
      { id: 'msg_023', role: 'user', content: 'What payment terms do you accept for US orders?', timestamp: '2026-03-14T13:00:00' },
      { id: 'msg_024', role: 'assistant', content: 'We accept T/T (30% deposit, 70% before shipment) and L/C at sight for US orders. For established customers, we can offer D/P terms.', timestamp: '2026-03-14T13:00:18' },
      { id: 'msg_025', role: 'user', content: 'Do you have FCC certification for the coffee grinder?', timestamp: '2026-03-14T13:01:30' },
      { id: 'msg_026', role: 'assistant', content: 'Yes, the Electric Coffee Grinder has FCC certification. It also has CE and RoHS certifications.', timestamp: '2026-03-14T13:01:42' },
    ],
  },
  {
    userId: 'u_017', userName: 'Roberto Rossi',
    messages: [
      { id: 'msg_027', role: 'user', content: 'Potete fornire il trapano a percussione con certificazione CE?', timestamp: '2026-03-13T09:00:00' },
      { id: 'msg_028', role: 'assistant', content: 'Sì, il trapano a percussione 18V è disponibile con certificazione CE. Possiamo anche fornire manuali in italiano su richiesta.', timestamp: '2026-03-13T09:00:28' },
    ],
  },
]

export const mockFaqItems = [
  {
    id: 'faq_001',
    q_cn: '电动工具一般有哪些认证？', q_en: 'What certifications do power tools have?', q_ko: '전동 공구는 어떤 인증이 있나요?', q_ja: '電動工具にはどんな認証がありますか？',
    a_cn: '我们的电动工具产品通常具备以下认证：CE（欧盟强制性认证）、FCC（美国电磁兼容认证）、KC（韩国认证）、PSE（日本电气用品安全认证）。部分产品还可根据客户需求申请GS、ETL、UL等额外认证。', a_en: 'Our power tools typically have CE, FCC, KC, and PSE certifications. Some products can also apply for GS, ETL, UL etc. upon request.', a_ko: '당사의 전동 공구는 일반적으로 CE, FCC, KC, PSE 인증을 보유하고 있습니다. 일부 제품은 요청 시 GS, ETL, UL 등의 추가 인증도 신청 가능합니다.', a_ja: '当社の電動工具は通常、CE、FCC、KC、PSE認証を取得しています。一部の製品はGS、ETL、ULなどの追加認証も申請可能です。',
    tags: ['certification', 'power_tools'],
  },
  {
    id: 'faq_002',
    q_cn: '1000pcs酒精测试仪的交期是多久？', q_en: 'What is the lead time for 1000pcs alcohol testers?', q_ko: '알코올 테스터 1000개의 납기는 얼마인가요?', q_ja: 'アルコールテスター1000個の納期は？',
    a_cn: '1000pcs酒精测试仪的标准交期为15-20天。包括原材料采购（3-5天）、SMT贴片及组装（5-7天）、老化测试及校准（3-5天）、包装及验货（2-3天）。', a_en: 'Standard lead time for 1000pcs alcohol testers is 15-20 days, including material procurement, assembly, testing, and packaging.', a_ko: '알코올 테스터 1000개의 표준 납기는 15-20일입니다. 자재 조달, 조립, 테스트, 포장이 포함됩니다.', a_ja: 'アルコールテスター1000個の標準納期は15-20日です。資材調達、組立、テスト、梱包が含まれます。',
    tags: ['lead_time', 'testers'],
  },
  {
    id: 'faq_003',
    q_cn: '高压清洗机的MOQ是多少？', q_en: 'What is the MOQ for high pressure washers?', q_ko: '고압 세척기의 MOQ는 얼마인가요?', q_ja: '高圧洗浄機のMOQは？',
    a_cn: '高压清洗机的标准MOQ为200台。初次合作客户可支持100台试单。1000台以上可享受额外折扣。', a_en: 'Standard MOQ for pressure washers is 200 pcs. Trial orders of 100 pcs available for new customers. Volume discounts for 1000+ pcs.', a_ko: '고압 세척기의 표준 MOQ는 200대입니다. 신규 고객은 100대 시험 주문 가능. 1000대 이상 추가 할인.', a_ja: '高圧洗浄機の標準MOQは200台です。新規顧客は100台のトライアル注文可能。1000台以上は追加割引。',
    tags: ['moq', 'cleaners'],
  },
  {
    id: 'faq_004',
    q_cn: '激光水平仪包装尺寸和重量？', q_en: 'Laser level packaging dimensions and weight?', q_ko: '레이저 레벨기의 포장 크기와 무게는?', q_ja: 'レーザーレベルの包装サイズと重量は？',
    a_cn: '16线激光水平仪标准包装：铝箱尺寸55×35×18cm，含配件总重约4.5kg。外箱57×37×20cm，每箱4台，毛重约19kg。', a_en: 'Standard packaging: Aluminum case 55×35×18cm, total weight 4.5kg. Master carton 57×37×20cm, 4pcs/carton, gross weight 19kg.', a_ko: '표준 포장: 알루미늄 케이스 55×35×18cm, 총중량 4.5kg. 외부 박스 57×37×20cm, 4대/박스, 총중량 19kg.', a_ja: '標準梱包：アルミケース55×35×18cm、総重量4.5kg。外装箱57×37×20cm、4台/箱、総重量19kg。',
    tags: ['packaging', 'laser'],
  },
  {
    id: 'faq_005',
    q_cn: '空气炸锅是否有KC认证？', q_en: 'Does the air fryer have KC certification?', q_ko: '에어프라이어에 KC 인증이 있나요?', q_ja: 'エアフライヤーにKC認証はありますか？',
    a_cn: '是的，5.5L数码空气炸锅已获得KC认证，并且也通过了CE和GS认证。出口韩国的产品附带韩文说明书和标签。', a_en: 'Yes, the 5.5L Digital Air Fryer has KC certification, as well as CE and GS. Products for Korea include Korean manual and labels.', a_ko: '네, 5.5L 디지털 에어프라이어는 KC 인증을 획득했으며, CE 및 GS 인증도 보유하고 있습니다.', a_ja: 'はい、5.5LデジタルエアフライヤーはKC認証を取得しており、CEおよびGS認証も取得しています。',
    tags: ['certification', 'KC', 'appliances'],
  },
  {
    id: 'faq_006',
    q_cn: '支持哪些付款方式？', q_en: 'What payment methods are supported?', q_ko: '어떤 결제 방법을 지원하나요?', q_ja: 'どのような支払い方法に対応していますか？',
    a_cn: '我们接受T/T电汇、L/C信用证，长期合作客户可接受D/P或D/A。标准条款为30%定金，70%发货前付清。', a_en: 'We accept T/T wire transfer, L/C, and D/P or D/A for long-term partners. Standard terms: 30% deposit, 70% before shipment.', a_ko: 'T/T 송금, L/C 신용장을 수용하며 장기 파트너는 D/P 또는 D/A도 가능합니다. 표준 조건: 30% 계약금, 70% 선적 전.', a_ja: 'T/T電信送金、L/C信用状に対応。長期パートナーはD/PまたはD/Aも可能。標準条件：30%前払い、70%出荷前。',
    tags: ['payment'],
  },
  {
    id: 'faq_007',
    q_cn: '产品质保政策是什么？', q_en: 'What is the product warranty policy?', q_ko: '제품 보증 정책은 어떻게 되나요?', q_ja: '製品の保証ポリシーは？',
    a_cn: '标准质保期为发货后12个月，覆盖制造缺陷。部分产品可提供延长质保。我们备有配件库存支持售后服务。', a_en: 'Standard warranty is 12 months from shipment for manufacturing defects. Extended warranty available for select products. Spare parts in stock.', a_ko: '표준 보증은 선적일로부터 12개월입니다. 일부 제품은 연장 보증 가능. 부품 재고 보유.', a_ja: '標準保証は出荷日から12ヶ月です。一部製品は延長保証可能。部品在庫あり。',
    tags: ['warranty'],
  },
  {
    id: 'faq_008',
    q_cn: '如何保证产品质量？', q_en: 'How do you ensure product quality?', q_ko: '제품 품질을 어떻게 보장하나요?', q_ja: '製品の品質はどのように保証していますか？',
    a_cn: '实施四阶段QC流程：原材料检验、生产过程中抽查、出货前质检、装柜监督。可安排第三方检验（SGS、BV等）。', a_en: '4-stage QC process: raw material inspection, in-production checks, pre-shipment inspection, container loading supervision. Third-party inspection available.', a_ko: '4단계 QC: 원자재 검사, 생산 중 검사, 선적 전 검사, 컨테이너 적재 감독. 제3자 검사 가능.', a_ja: '4段階QC：原材料検査、生産中検査、出荷前検査、コンテナ積載監督。第三者検査可能。',
    tags: ['quality'],
  },
]

/** Generate 30-day inquiry trend data ending around today */
function generateTrendData() {
  const data = []
  const base = new Date('2026-03-21')
  for (let i = 29; i >= 0; i--) {
    const d = new Date(base)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    // Semi-random daily count between 1-8
    const count = Math.max(1, Math.min(8, Math.round(3 + Math.sin(i * 0.5) * 2 + (i % 3))))
    data.push({ date: dateStr, count })
  }
  return data
}

export const mockInquiryTrend = generateTrendData()

export const mockLanguageConfigs = [
  { code: 'zh', name: '中文', enabled: true, isDefault: true },
  { code: 'en', name: 'English', enabled: true, isDefault: false },
  { code: 'ko', name: '한국어', enabled: true, isDefault: false },
  { code: 'ja', name: '日本語', enabled: true, isDefault: false },
]
