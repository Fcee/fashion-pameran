import React, { useState } from 'react';
import { 
  Search, 
  Award, 
  MessageCircle, 
  Eye, 
  Edit, 
  UserPlus, 
  MapPin, 
  X,
  CreditCard
} from 'lucide-react';

export const ClientsCRM = ({ clients, setClients }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedClient, setSelectedClient] = useState(null);

  const formatIDR = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);

  const tiers = ['all', 'Noir Private Member', 'Gold Patron', 'Classic Client'];

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Noir Private Member':
        return (
          <span className="bg-noir text-champagne-light border border-champagne text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 inline-flex items-center gap-1 shadow-xs">
            <Award className="w-3 h-3 text-champagne" />
            <span>{tier}</span>
          </span>
        );
      case 'Gold Patron':
        return (
          <span className="bg-champagne-subtle text-noir border border-champagne-dark text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 inline-flex items-center gap-1">
            <Award className="w-3 h-3 text-champagne-dark" />
            <span>{tier}</span>
          </span>
        );
      case 'Classic Client':
        return (
          <span className="bg-ivory text-noir border border-ivory-border text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 inline-flex items-center gap-1">
            <Award className="w-3 h-3 text-noir-muted" />
            <span>{tier}</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filteredClients = clients.filter(cl => {
    const matchesTier = selectedTier === 'all' || cl.tier === selectedTier;
    const matchesSearch = 
      cl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cl.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cl.phone.includes(searchQuery);
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans-editorial">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-border">
        <div>
          <span className="text-[10px] font-semibold tracking-ultra uppercase text-champagne-dark block mb-1">
            Direktori Klien Eksklusif
          </span>
          <h3 className="font-serif-fashion text-2xl font-medium text-noir">
            CRM Privilege Club &amp; Pelanggan VIP
          </h3>
        </div>

        {/* Tier Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTier(t)}
              className={`text-xs px-3 py-1.5 border uppercase tracking-wider transition-all ${
                selectedTier === t
                  ? 'bg-noir text-ivory border-noir font-semibold'
                  : 'bg-white text-noir border-ivory-border hover:border-champagne'
              }`}
            >
              {t === 'all' ? 'Semua Jenjang' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-ivory-border p-3 flex items-center justify-between gap-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari nama klien VIP, kota, atau nomor WhatsApp..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-ivory border border-ivory-border pl-8 pr-3 py-2 outline-none font-sans-editorial text-noir focus:border-champagne"
          />
          <Search className="w-3.5 h-3.5 text-noir-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="text-xs text-noir-muted">
          Menampilkan <strong>{filteredClients.length}</strong> Klien VIP
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white border border-ivory-border overflow-x-auto shadow-sm">
        <table className="w-full text-xs text-left">
          <thead className="bg-ivory border-b border-ivory-border uppercase tracking-wider text-[11px] text-noir">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Nama Klien &amp; Domisili</th>
              <th className="py-3.5 px-4 font-semibold">Jenjang Keanggotaan</th>
              <th className="py-3.5 px-4 font-semibold">Akumulasi Belanja</th>
              <th className="py-3.5 px-4 font-semibold">Poin Privilege</th>
              <th className="py-3.5 px-4 font-semibold">Pesanan Terakhir</th>
              <th className="py-3.5 px-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ivory-border">
            {filteredClients.map((client) => (
              <tr key={client.id} className="hover:bg-ivory/50 transition-colors">
                
                {/* Name & City */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="font-serif-fashion font-medium text-sm text-noir block">
                    {client.name}
                  </span>
                  <span className="text-[11px] text-noir-muted flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-champagne" />
                    <span>{client.city}</span>
                    <span className="text-noir-muted/50">&bull;</span>
                    <span className="font-mono">+{client.phone}</span>
                  </span>
                </td>

                {/* Tier */}
                <td className="py-4 px-4 whitespace-nowrap">
                  {getTierBadge(client.tier)}
                </td>

                {/* Lifetime Value */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="font-bold text-noir block">
                    {formatIDR(client.totalSpent)}
                  </span>
                  <span className="text-[10px] text-noir-muted">
                    {client.ordersCount} kali transaksi
                  </span>
                </td>

                {/* Points */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="font-mono font-semibold text-champagne-dark text-sm block">
                    {client.pointsBalance} Pts
                  </span>
                </td>

                {/* Last Order Date */}
                <td className="py-4 px-4 whitespace-nowrap text-noir-muted font-mono">
                  {client.lastOrderDate}
                </td>

                {/* Actions */}
                <td className="py-4 px-4 whitespace-nowrap text-right space-x-2">
                  <button
                    onClick={() => setSelectedClient(client)}
                    className="p-1.5 bg-ivory text-noir hover:bg-noir hover:text-ivory border border-ivory-border transition-colors inline-block"
                    title="Lihat Profil & Catatan Klien"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${client.phone}?text=${encodeURIComponent(`Yth. ${client.name}, salam hangat dari Concierge Atelier Noir & Co.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-noir text-ivory hover:bg-champagne hover:text-noir transition-colors inline-block"
                    title="Kirim Pesan Pribadi Concierge"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Client Profile Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/70 backdrop-blur-sm">
          <div className="bg-white border border-ivory-border max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 p-2 text-noir hover:text-champagne transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-ultra font-semibold text-champagne-dark block mb-1">
              Profil Klien Kehormatan
            </span>
            <h3 className="font-serif-fashion text-2xl font-medium text-noir mb-2">
              {selectedClient.name}
            </h3>
            <div className="mb-4">
              {getTierBadge(selectedClient.tier)}
            </div>

            <div className="bg-ivory p-4 border border-ivory-border space-y-3 text-xs mb-4">
              <div className="flex justify-between border-b border-ivory-border pb-2">
                <span className="text-noir-muted">Domisili</span>
                <span className="font-medium text-noir">{selectedClient.city}</span>
              </div>
              <div className="flex justify-between border-b border-ivory-border pb-2">
                <span className="text-noir-muted">Total Pembelian Akumulasi</span>
                <span className="font-bold text-noir">{formatIDR(selectedClient.totalSpent)}</span>
              </div>
              <div className="flex justify-between border-b border-ivory-border pb-2">
                <span className="text-noir-muted">Saldo Poin Privilege</span>
                <span className="font-mono font-bold text-champagne-dark">{selectedClient.pointsBalance} Poin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-noir-muted">Frekuensi Kunjungan</span>
                <span className="font-medium text-noir">{selectedClient.ordersCount} Pesanan Selesai</span>
              </div>
            </div>

            <div className="bg-champagne-subtle/30 p-3 border border-champagne text-xs mb-6">
              <span className="font-semibold text-noir block text-[11px] mb-1">
                Catatan Rahasia Concierge:
              </span>
              <p className="text-noir-muted leading-relaxed">
                {selectedClient.vipNotes}
              </p>
            </div>

            <div className="flex justify-end gap-3 text-xs">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 border border-ivory-border text-noir hover:bg-ivory"
              >
                Tutup
              </button>
              <a
                href={`https://wa.me/${selectedClient.phone}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-noir text-ivory uppercase tracking-wider font-semibold hover:bg-noir-light inline-flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-champagne" />
                <span>Buka WhatsApp Klien</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

