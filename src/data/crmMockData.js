// Realistic CRM & Analytics Dataset for Atelier Noir & Co.
// Curated Luxury Indonesian Fashion UMKM - Zero Emojis

export const revenueAnalytics = {
  summary: {
    monthlyGross: 48750000,
    monthlyGrossGrowth: 18.4,
    totalOrders: 38,
    ordersGrowth: 12.5,
    averageOrderValue: 1282894,
    aovGrowth: 5.2,
    conversionRate: 68.2,
    conversionGrowth: 3.8,
  },
  monthlyTrend: [
    { month: 'Mei', revenue: 28500000, orders: 22, visitors: 340 },
    { month: 'Jun', revenue: 32100000, orders: 25, visitors: 390 },
    { month: 'Jul', revenue: 36800000, orders: 29, visitors: 460 },
    { month: 'Agu', revenue: 41200000, orders: 32, visitors: 520 },
    { month: 'Sep', revenue: 44600000, orders: 35, visitors: 580 },
    { month: 'Okt', revenue: 48750000, orders: 38, visitors: 640 },
  ],
  categoryShare: [
    { category: 'Outerwear & Jas', revenue: 21500000, percentage: 44.1, count: 17 },
    { category: 'Gaun & Setelan', revenue: 13800000, percentage: 28.3, count: 8 },
    { category: 'Kemeja & Atasan', revenue: 8650000, percentage: 17.7, count: 11 },
    { category: 'Bawahan & Celana', revenue: 4800000, percentage: 9.9, count: 6 },
  ],
  channelConversion: [
    { channel: 'WhatsApp Concierge Direct', share: 64, color: '#141413' },
    { channel: 'Editorial Lookbook Lead', share: 22, color: '#B89563' },
    { channel: 'Privilege Member Referral', share: 14, color: '#5A5852' },
  ],
};

export const initialOrders = [
  {
    id: 'ATLR-2026-8841',
    date: '2026-10-13 16:45',
    clientName: 'Aryo Danisworo',
    phone: '6281298451122',
    city: 'Jakarta Selatan',
    items: [
      { title: 'Tenun Troso Structured Blazer Noir', variant: 'Size L | Lapisan Noir | Bordir Monogram', qty: 1, price: 1335000 },
      { title: 'Double-Pleat Tailored Trousers in Ecru Linen', variant: 'Size 32 | Cuffed 4cm', qty: 1, price: 750000 }
    ],
    bundlingDiscount: 208500, // 10% Curated Pair
    totalAmount: 1876500,
    status: 'Menunggu Respon', // Menunggu Respon | Proses Fitting | Siap Kirim | Selesai
    paymentStatus: 'Menunggu Konfirmasi Bukti Transfer',
    routerAssigned: 'Concierge Gallery 1',
    notes: 'Inisial bordir saku: A.D. dengan benang emas halus.',
  },
  {
    id: 'ATLR-2026-8839',
    date: '2026-10-13 14:20',
    clientName: 'Clara Sasmita',
    phone: '628117765231',
    city: 'Surabaya',
    items: [
      { title: 'Midi Wrap Dress Sutera Organza Ethereal', variant: 'Size S | Alabaster Ivory', qty: 1, price: 1450000 },
      { title: 'Kemeja Sutera ATBM Motif Parang Kontemporer', variant: 'Size M | Cuban Collar | Gift Box', qty: 1, price: 955000 },
      { title: 'Haori Overcoat Katun Tenun Baduy Minimal', variant: 'Size Reguler | Kancing Kuningan', qty: 1, price: 1025000 }
    ],
    bundlingDiscount: 514500, // 15% VIP Capsule
    totalAmount: 2915500,
    status: 'Proses Fitting',
    paymentStatus: 'Terverifikasi (BCA)',
    routerAssigned: 'Concierge Gallery 2',
    notes: 'Kemasan gift box khusus untuk acara pameran pekan depan.',
  },
  {
    id: 'ATLR-2026-8824',
    date: '2026-10-12 19:10',
    clientName: 'Taufiq Hermansyah',
    phone: '6281355449900',
    city: 'Bandung',
    items: [
      { title: 'Two-Piece Relaxed Atelier Suit in Sand Wool', variant: 'Size 48 | Virtual Fitting Session', qty: 1, price: 2130000 }
    ],
    bundlingDiscount: 0,
    totalAmount: 2130000,
    status: 'Siap Kirim',
    paymentStatus: 'Terverifikasi (Mandiri)',
    routerAssigned: 'Concierge Gallery 1',
    notes: 'Jadwal video call fitting sudah selesai, panjang celana dipotong 2cm.',
  },
  {
    id: 'ATLR-2026-8815',
    date: '2026-10-11 11:30',
    clientName: 'Anindya Putri',
    phone: '6281788992211',
    city: 'Semarang',
    items: [
      { title: 'Kemeja Kerah Tegak Katun Oxford Tenun Lurik', variant: 'Size M | Lurik Noir', qty: 2, price: 1360000 }
    ],
    bundlingDiscount: 136000, // 10% Pair
    totalAmount: 1224000,
    status: 'Selesai',
    paymentStatus: 'Terverifikasi (BCA)',
    routerAssigned: 'Concierge Gallery 2',
    notes: 'Paket telah diterima dengan resi JNE YES #882991029.',
  },
  {
    id: 'ATLR-2026-8798',
    date: '2026-10-10 15:40',
    clientName: 'Bambang Kusumo',
    phone: '6281211223344',
    city: 'Jakarta Pusat',
    items: [
      { title: 'Wide Leg Trousers Serat Rami Ramie Eco-Weave', variant: 'Size 1 | Deep Noir', qty: 1, price: 820000 }
    ],
    bundlingDiscount: 0,
    totalAmount: 820000,
    status: 'Selesai',
    paymentStatus: 'Terverifikasi (BCA)',
    routerAssigned: 'Concierge Gallery 1',
    notes: 'Pengiriman via kurir instan galeri.',
  }
];

export const initialClients = [
  {
    id: 'CLT-001',
    name: 'Clara Sasmita',
    phone: '628117765231',
    city: 'Surabaya',
    tier: 'Noir Private Member',
    totalSpent: 8650000,
    ordersCount: 4,
    pointsBalance: 240,
    lastOrderDate: '2026-10-13',
    vipNotes: 'Kolektor busana tenun sutera. Selalu memesan kemasan kotak kayu koleksi.',
  },
  {
    id: 'CLT-002',
    name: 'Aryo Danisworo',
    phone: '6281298451122',
    city: 'Jakarta Selatan',
    tier: 'Gold Patron',
    totalSpent: 5420000,
    ordersCount: 3,
    pointsBalance: 110,
    lastOrderDate: '2026-10-13',
    vipNotes: 'Sering memesan blazer ukuran L dengan monogram emas.',
  },
  {
    id: 'CLT-003',
    name: 'Taufiq Hermansyah',
    phone: '6281355449900',
    city: 'Bandung',
    tier: 'Gold Patron',
    totalSpent: 4890000,
    ordersCount: 2,
    pointsBalance: 90,
    lastOrderDate: '2026-10-12',
    vipNotes: 'Menyukai setelan bahan wol tropis warna sand/tan.',
  },
  {
    id: 'CLT-004',
    name: 'Anindya Putri',
    phone: '6281788992211',
    city: 'Semarang',
    tier: 'Classic Client',
    totalSpent: 2650000,
    ordersCount: 2,
    pointsBalance: 40,
    lastOrderDate: '2026-10-11',
    vipNotes: 'Pelanggan tetap lini kemeja tenun lurik kontemporer.',
  },
  {
    id: 'CLT-005',
    name: 'Bambang Kusumo',
    phone: '6281211223344',
    city: 'Jakarta Pusat',
    tier: 'Classic Client',
    totalSpent: 1820000,
    ordersCount: 1,
    pointsBalance: 20,
    lastOrderDate: '2026-10-10',
    vipNotes: 'Menyukai siluet celana berpotongan rileks (wide leg).',
  }
];

