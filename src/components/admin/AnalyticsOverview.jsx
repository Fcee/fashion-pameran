import React, { useState } from 'react';
import { revenueAnalytics } from '../../data/crmMockData';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  Calendar,
  MessageCircle,
  Eye,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AnalyticsOverview = ({ orders, clients, catalog }) => {
  const [metricView, setMetricView] = useState('revenue'); // 'revenue' | 'orders'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const formatIDR = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);

  const { summary, monthlyTrend, categoryShare, channelConversion } = revenueAnalytics;

  // SVG Chart Dimensions for Trend Area Chart
  const svgWidth = 650;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = metricView === 'revenue' 
    ? Math.max(...monthlyTrend.map(d => d.revenue)) * 1.15
    : Math.max(...monthlyTrend.map(d => d.orders)) * 1.25;

  const points = monthlyTrend.map((d, index) => {
    const val = metricView === 'revenue' ? d.revenue : d.orders;
    const x = paddingX + (index / (monthlyTrend.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (val / maxVal) * (svgHeight - paddingY * 2);
    return { x, y, data: d };
  });

  // Generate SVG path for line and area
  const linePath = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  return (
    <div className="space-y-8 font-sans-editorial">
      
      {/* Top KPI Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Gross Revenue */}
        <div className="bg-white border border-ivory-border p-5 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-xs text-noir-muted uppercase tracking-wider mb-2">
            <span>Omzet Galeri (Bulan Ini)</span>
            <div className="p-2 bg-ivory text-noir border border-ivory-border">
              <CreditCard className="w-4 h-4 text-champagne-dark" />
            </div>
          </div>
          <div className="font-serif-fashion text-2xl font-bold text-noir mb-2">
            {formatIDR(summary.monthlyGross)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="font-semibold">+{summary.monthlyGrossGrowth}%</span>
            <span className="text-noir-muted text-[11px]">vs bulan sebelumnya</span>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white border border-ivory-border p-5 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-xs text-noir-muted uppercase tracking-wider mb-2">
            <span>Total Transaksi Busana</span>
            <div className="p-2 bg-ivory text-noir border border-ivory-border">
              <ShoppingBag className="w-4 h-4 text-champagne-dark" />
            </div>
          </div>
          <div className="font-serif-fashion text-2xl font-bold text-noir mb-2">
            {orders.length + summary.totalOrders} Pesanan
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="font-semibold">+{summary.ordersGrowth}%</span>
            <span className="text-noir-muted text-[11px]">pipeline WhatsApp aktif</span>
          </div>
        </div>

        {/* Card 3: AOV (Average Order Value) */}
        <div className="bg-white border border-ivory-border p-5 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-xs text-noir-muted uppercase tracking-wider mb-2">
            <span>Rata-rata Keranjang (AOV)</span>
            <div className="p-2 bg-ivory text-noir border border-ivory-border">
              <ArrowUpRight className="w-4 h-4 text-champagne-dark" />
            </div>
          </div>
          <div className="font-serif-fashion text-2xl font-bold text-noir mb-2">
            {formatIDR(summary.averageOrderValue)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-noir-muted">
            <span className="text-champagne-dark font-semibold">+{summary.aovGrowth}%</span>
            <span className="text-[11px]">efek diskon bundling</span>
          </div>
        </div>

        {/* Card 4: VIP Clients & Conversion */}
        <div className="bg-white border border-ivory-border p-5 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-xs text-noir-muted uppercase tracking-wider mb-2">
            <span>Konversi Concierge WA</span>
            <div className="p-2 bg-ivory text-noir border border-ivory-border">
              <MessageCircle className="w-4 h-4 text-champagne-dark" />
            </div>
          </div>
          <div className="font-serif-fashion text-2xl font-bold text-noir mb-2">
            {summary.conversionRate}%
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-semibold">{clients.length} Klien VIP</span>
            <span className="text-noir-muted text-[11px]">terdaftar di Privilege Club</span>
          </div>
        </div>

      </div>

      {/* Main Graph: Revenue & Orders Area Trend Chart */}
      <div className="bg-white border border-ivory-border p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-ivory-border">
          <div>
            <span className="text-[10px] font-semibold tracking-ultra uppercase text-champagne-dark block mb-1">
              Performa Finansial
            </span>
            <h3 className="font-serif-fashion text-xl font-medium text-noir">
              Tren Pertumbuhan Omzet &amp; Pesanan (Semester 2026)
            </h3>
          </div>

          {/* Metric View Switcher */}
          <div className="flex items-center gap-1 bg-ivory p-1 border border-ivory-border">
            <button
              onClick={() => setMetricView('revenue')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                metricView === 'revenue'
                  ? 'bg-noir text-ivory shadow-xs'
                  : 'text-noir-muted hover:text-noir'
              }`}
            >
              Omzet (IDR)
            </button>
            <button
              onClick={() => setMetricView('orders')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                metricView === 'orders'
                  ? 'bg-noir text-ivory shadow-xs'
                  : 'text-noir-muted hover:text-noir'
              }`}
            >
              Volume Pesanan
            </button>
          </div>
        </div>

        {/* Interactive SVG Area Chart */}
        <div className="relative overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-64 overflow-visible"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B89563" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F7F4EE" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const yPos = svgHeight - paddingY - ratio * (svgHeight - paddingY * 2);
              const gridLabel = metricView === 'revenue'
                ? formatIDR(maxVal * ratio)
                : Math.round(maxVal * ratio);
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={yPos}
                    x2={svgWidth - paddingX}
                    y2={yPos}
                    stroke="#E2DED5"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 8}
                    y={yPos + 3}
                    textAnchor="end"
                    className="text-[9px] fill-noir-muted font-mono"
                  >
                    {gridLabel}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            <path d={areaPath} fill="url(#areaGradient)" />

            {/* Line Stroke */}
            <path
              d={linePath}
              fill="none"
              stroke="#141413"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((pt, idx) => {
              const isHovered = hoveredPoint === idx;
              return (
                <g key={idx} className="cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? '#B89563' : '#141413'}
                    stroke="#FAF8F5"
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {/* Month Label */}
                  <text
                    x={pt.x}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    className="text-[10px] fill-noir font-medium uppercase tracking-wider"
                  >
                    {pt.data.month}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip Card */}
          {hoveredPoint !== null && (
            <div className="mt-2 bg-noir text-ivory text-xs p-3 border border-champagne flex items-center justify-between max-w-sm mx-auto shadow-md">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-champagne-light block">
                  Bulan {monthlyTrend[hoveredPoint].month} 2026
                </span>
                <span className="font-semibold text-sm">
                  {formatIDR(monthlyTrend[hoveredPoint].revenue)}
                </span>
              </div>
              <div className="text-right text-[11px] text-ivory/80">
                <div>{monthlyTrend[hoveredPoint].orders} Pesanan Terverifikasi</div>
                <div className="text-[10px] text-ivory/60">{monthlyTrend[hoveredPoint].visitors} Kunjungan Pengunjung</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Graphs: Category Share & Conversion Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Category Revenue Breakdown (Horizontal Bars) */}
        <div className="lg:col-span-7 bg-white border border-ivory-border p-6 shadow-sm">
          <div className="mb-6 pb-3 border-b border-ivory-border">
            <span className="text-[10px] font-semibold tracking-ultra uppercase text-champagne-dark block mb-1">
              Distribusi Lini Produk
            </span>
            <h4 className="font-serif-fashion text-lg font-medium text-noir">
              Kontribusi Penjualan per Kategori Busana
            </h4>
          </div>

          <div className="space-y-5">
            {categoryShare.map((cat) => (
              <div key={cat.category} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-noir">{cat.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-noir-muted text-[11px] font-mono">
                      {cat.count} potong ({cat.percentage}%)
                    </span>
                    <span className="font-semibold text-noir">
                      {formatIDR(cat.revenue)}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-ivory-border h-2 overflow-hidden">
                  <div
                    className="h-full bg-noir transition-all duration-700"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: WhatsApp Concierge Conversion Ring / Channel Breakdown */}
        <div className="lg:col-span-5 bg-white border border-ivory-border p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-6 pb-3 border-b border-ivory-border">
              <span className="text-[10px] font-semibold tracking-ultra uppercase text-champagne-dark block mb-1">
                Kanal Akuisisi &amp; Konversi
              </span>
              <h4 className="font-serif-fashion text-lg font-medium text-noir">
                Rute Pesanan Concierge Masuk
              </h4>
            </div>

            {/* Custom SVG Ring / Donut Chart */}
            <div className="flex items-center justify-center py-4">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Segment 1: WA Direct (64%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#141413"
                    strokeWidth="14"
                    strokeDasharray="152.8 238.7" // 64% of 238.7 circumference
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Lookbook (22%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#B89563"
                    strokeWidth="14"
                    strokeDasharray="52.5 238.7" // 22% of 238.7
                    strokeDashoffset="-152.8"
                  />
                  {/* Segment 3: Member Referral (14%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#E2DED5"
                    strokeWidth="14"
                    strokeDasharray="33.4 238.7" // 14% of 238.7
                    strokeDashoffset="-205.3"
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-serif-fashion text-xl font-bold text-noir">
                    68.2%
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-noir-muted">
                    Closing Rate
                  </span>
                </div>
              </div>
            </div>

            {/* Channel Legends */}
            <div className="space-y-2.5 pt-4 border-t border-ivory-border text-xs">
              {channelConversion.map((ch) => (
                <div key={ch.channel} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-none" style={{ backgroundColor: ch.color }} />
                    <span className="text-noir-muted text-[11px]">{ch.channel}</span>
                  </div>
                  <span className="font-semibold text-noir font-mono">{ch.share}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ivory-subtle text-[11px] text-noir-muted">
            Semua pesanan diselesaikan langsung via WhatsApp tanpa biaya potongan komisi gateway (0% gateway fee).
          </div>
        </div>

      </div>

    </div>
  );
};

