import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Scissors, 
  Truck, 
  X,
  MapPin,
  Calendar
} from 'lucide-react';

export const OrdersCRM = ({ orders, setOrders }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatIDR = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);

  const statusOptions = ['Menunggu Respon', 'Proses Fitting', 'Siap Kirim', 'Selesai'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Menunggu Respon':
        return (
          <span className="bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-700" />
            <span>{status}</span>
          </span>
        );
      case 'Proses Fitting':
        return (
          <span className="bg-sky-50 text-sky-900 border border-sky-300 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 inline-flex items-center gap-1">
            <Scissors className="w-3 h-3 text-sky-700" />
            <span>{status}</span>
          </span>
        );
      case 'Siap Kirim':
        return (
          <span className="bg-indigo-50 text-indigo-900 border border-indigo-300 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 inline-flex items-center gap-1">
            <Truck className="w-3 h-3 text-indigo-700" />
            <span>{status}</span>
          </span>
        );
      case 'Selesai':
        return (
          <span className="bg-emerald-50 text-emerald-900 border border-emerald-300 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>{status}</span>
          </span>
        );
      default:
        return null;
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const filteredOrders = orders.filter(ord => {
    const matchesStatus = filterStatus === 'all' || ord.status === filterStatus;
    const matchesSearch = 
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans-editorial">
      
      {/* Header & Pipeline Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-border">
        <div>
          <span className="text-[10px] font-semibold tracking-ultra uppercase text-champagne-dark block mb-1">
            Manajemen Saluran Concierge
          </span>
          <h3 className="font-serif-fashion text-2xl font-medium text-noir">
            Pipeline Pesanan &amp; Klien Atelier
          </h3>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['all', ...statusOptions].map(status => {
            const isActive = filterStatus === status;
            const count = status === 'all' 
              ? orders.length 
              : orders.filter(o => o.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`text-xs px-3 py-1.5 border transition-all uppercase tracking-wider font-medium ${
                  isActive
                    ? 'bg-noir text-ivory border-noir shadow-sm'
                    : 'bg-white text-noir border-ivory-border hover:border-champagne'
                }`}
              >
                <span>{status === 'all' ? 'Semua' : status}</span>
                <span className={`ml-1.5 text-[10px] ${isActive ? 'text-champagne-light' : 'text-noir-muted'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white border border-ivory-border p-3 flex items-center justify-between gap-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari ID Pesanan, Nama Klien, atau Kota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-ivory border border-ivory-border pl-8 pr-3 py-2 outline-none font-sans-editorial text-noir focus:border-champagne"
          />
          <Search className="w-3.5 h-3.5 text-noir-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="text-xs text-noir-muted">
          Menampilkan <strong>{filteredOrders.length}</strong> dari {orders.length} pesanan
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-ivory-border overflow-x-auto shadow-sm">
        <table className="w-full text-xs text-left">
          <thead className="bg-ivory border-b border-ivory-border uppercase tracking-wider text-[11px] text-noir">
            <tr>
              <th className="py-3.5 px-4 font-semibold">ID Pesanan &amp; Waktu</th>
              <th className="py-3.5 px-4 font-semibold">Klien &amp; Lokasi</th>
              <th className="py-3.5 px-4 font-semibold">Busana yang Dipesan</th>
              <th className="py-3.5 px-4 font-semibold">Total Investasi</th>
              <th className="py-3.5 px-4 font-semibold">Status Pipeline</th>
              <th className="py-3.5 px-4 font-semibold text-right">Aksi Concierge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ivory-border">
            {filteredOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-ivory/50 transition-colors">
                
                {/* ID & Date */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="font-mono font-bold text-noir block">
                    #{ord.id}
                  </span>
                  <span className="text-[10px] text-noir-muted flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-champagne" />
                    <span>{ord.date}</span>
                  </span>
                </td>

                {/* Client & City */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="font-semibold text-noir block">
                    {ord.clientName}
                  </span>
                  <span className="text-[11px] text-noir-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-champagne" />
                    <span>{ord.city}</span>
                  </span>
                </td>

                {/* Garments Breakdown */}
                <td className="py-4 px-4 max-w-xs">
                  <div className="space-y-1">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="leading-tight">
                        <span className="font-medium text-noir">{item.title}</span>
                        <span className="text-[10px] text-noir-muted block">
                          ({item.qty}x) {item.variant}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Total & Discount */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="font-bold text-noir block">
                    {formatIDR(ord.totalAmount)}
                  </span>
                  {ord.bundlingDiscount > 0 && (
                    <span className="text-[10px] text-emerald-700 block font-medium">
                      Diskon: -{formatIDR(ord.bundlingDiscount)}
                    </span>
                  )}
                  <span className="text-[10px] text-noir-muted block mt-0.5">
                    {ord.paymentStatus}
                  </span>
                </td>

                {/* Status Selector */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="space-y-1.5">
                    <div>{getStatusBadge(ord.status)}</div>
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className="text-[10px] bg-ivory border border-ivory-border px-2 py-1 outline-none text-noir cursor-pointer hover:border-champagne"
                    >
                      {statusOptions.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="py-4 px-4 whitespace-nowrap text-right space-x-2">
                  <button
                    onClick={() => setSelectedOrder(ord)}
                    className="p-1.5 bg-ivory text-noir hover:bg-noir hover:text-ivory border border-ivory-border transition-colors inline-block"
                    title="Lihat Detail Pesanan"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${ord.phone}?text=${encodeURIComponent(`Halo ${ord.clientName}, kami dari Concierge Atelier Noir & Co. mengonfirmasi pesanan #${ord.id}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-noir text-ivory hover:bg-champagne hover:text-noir transition-colors inline-block"
                    title="Hubungi Klien via WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/70 backdrop-blur-sm">
          <div className="bg-white border border-ivory-border max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 text-noir hover:text-champagne transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-ultra font-semibold text-champagne-dark block mb-1">
              Faktur Rincian Pesanan
            </span>
            <h3 className="font-serif-fashion text-2xl font-medium text-noir mb-4">
              Pesanan #{selectedOrder.id}
            </h3>

            <div className="bg-ivory p-4 border border-ivory-border mb-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-noir-muted block text-[10px] uppercase">Nama Klien</span>
                <span className="font-semibold text-noir">{selectedOrder.clientName}</span>
              </div>
              <div>
                <span className="text-noir-muted block text-[10px] uppercase">Nomor WhatsApp</span>
                <span className="font-mono text-noir">+{selectedOrder.phone}</span>
              </div>
              <div>
                <span className="text-noir-muted block text-[10px] uppercase">Kota Pengiriman</span>
                <span className="font-semibold text-noir">{selectedOrder.city}</span>
              </div>
              <div>
                <span className="text-noir-muted block text-[10px] uppercase">Admin Penerima</span>
                <span className="font-semibold text-noir">{selectedOrder.routerAssigned}</span>
              </div>
            </div>

            {/* Garment Items in Order */}
            <div className="space-y-2 mb-4 text-xs">
              <span className="font-semibold uppercase text-noir text-[11px] block">
                Item Rincian:
              </span>
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 bg-ivory/50 border border-ivory-border">
                  <div>
                    <span className="font-medium text-noir">{it.title}</span>
                    <span className="text-[10px] text-noir-muted block">{it.variant}</span>
                  </div>
                  <span className="font-bold text-noir">{formatIDR(it.price * it.qty)}</span>
                </div>
              ))}
            </div>

            {/* Custom Notes */}
            {selectedOrder.notes && (
              <div className="bg-champagne-subtle/30 p-3 border border-champagne text-xs mb-4">
                <span className="font-semibold text-noir text-[11px] block mb-1">Catatan Khusus Klien:</span>
                <p className="text-noir-muted">{selectedOrder.notes}</p>
              </div>
            )}

            {/* Total Footer */}
            <div className="pt-3 border-t border-ivory-border flex justify-between items-center text-xs">
              <div>
                <span className="text-noir-muted block">Total Bersih:</span>
                <span className="font-serif-fashion text-xl font-bold text-noir">{formatIDR(selectedOrder.totalAmount)}</span>
              </div>
              <a
                href={`https://wa.me/${selectedOrder.phone}`}
                target="_blank"
                rel="noreferrer"
                className="bg-noir text-ivory px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-noir-light inline-flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-champagne" />
                <span>Buka Percakapan WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

