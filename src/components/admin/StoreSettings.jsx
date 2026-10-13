import React, { useState } from 'react';
import { 
  Clock, 
  Phone, 
  Tag, 
  Save, 
  Check, 
  Plus, 
  Trash2, 
  ShieldCheck 
} from 'lucide-react';

export const StoreSettings = ({ storeConfig, setStoreConfig }) => {
  const [config, setConfig] = useState(storeConfig || {
    name: 'ATELIER NOIR & CO.',
    operating_hours: { open: '08:30', close: '21:30' },
    whatsapp_routers: [
      { name: 'Concierge Gallery 1', phone: '6281234567891' },
      { name: 'Concierge Gallery 2', phone: '6281234567892' }
    ],
    bundling_rules: [
      { min_qty: 2, discount_percent: 10, label: 'Curated Pair (Dua Busana Diskon 10%)' },
      { min_qty: 3, discount_percent: 15, label: 'Capsule Wardrobe (Tiga atau Lebih Diskon 15%)' }
    ]
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newRouterName, setNewRouterName] = useState('');
  const [newRouterPhone, setNewRouterPhone] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setStoreConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddRouter = (e) => {
    e.preventDefault();
    if (!newRouterName.trim() || !newRouterPhone.trim()) return;
    setConfig(prev => ({
      ...prev,
      whatsapp_routers: [
        ...prev.whatsapp_routers,
        { name: newRouterName, phone: newRouterPhone }
      ]
    }));
    setNewRouterName('');
    setNewRouterPhone('');
  };

  const handleRemoveRouter = (index) => {
    setConfig(prev => ({
      ...prev,
      whatsapp_routers: prev.whatsapp_routers.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="space-y-8 font-sans-editorial max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-border">
        <div>
          <span className="text-[10px] font-semibold tracking-ultra uppercase text-champagne-dark block mb-1">
            Konfigurasi Terpusat UMKM
          </span>
          <h3 className="font-serif-fashion text-2xl font-medium text-noir">
            Pengaturan Galeri &amp; Router WhatsApp
          </h3>
        </div>

        <button
          onClick={handleSave}
          className="bg-noir text-ivory px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-noir-light transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          {savedSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pengaturan Tersimpan</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5 text-champagne" />
              <span>Simpan Konfigurasi</span>
            </>
          )}
        </button>
      </div>

      {/* Card 1: Operating Hours (Smart Availability Engine) */}
      <div className="bg-white border border-ivory-border p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-noir font-semibold uppercase tracking-wider text-xs border-b border-ivory-border pb-3">
          <Clock className="w-4 h-4 text-champagne" />
          <span>Jam Pelayanan Galeri Daring (Smart Availability)</span>
        </div>
        <p className="text-xs text-noir-muted leading-relaxed">
          Sistem secara otomatis menyesuaikan ketersediaan tombol &quot;Beli Langsung&quot; menjadi &quot;Pre-Order Prioritas&quot; jika pengunjung mengakses katalog di luar rentang jam operasional di bawah ini.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-[11px] text-noir-muted uppercase mb-1.5 font-medium">
              Jam Buka Galeri
            </label>
            <input
              type="time"
              value={config.operating_hours?.open || '08:30'}
              onChange={(e) => setConfig({
                ...config,
                operating_hours: { ...config.operating_hours, open: e.target.value }
              })}
              className="w-full bg-ivory border border-ivory-border px-3 py-2 text-xs font-mono outline-none focus:border-champagne"
            />
          </div>

          <div>
            <label className="block text-[11px] text-noir-muted uppercase mb-1.5 font-medium">
              Jam Tutup Galeri
            </label>
            <input
              type="time"
              value={config.operating_hours?.close || '21:30'}
              onChange={(e) => setConfig({
                ...config,
                operating_hours: { ...config.operating_hours, close: e.target.value }
              })}
              className="w-full bg-ivory border border-ivory-border px-3 py-2 text-xs font-mono outline-none focus:border-champagne"
            />
          </div>
        </div>
      </div>

      {/* Card 2: WhatsApp Routers (Round-Robin Multichannel) */}
      <div className="bg-white border border-ivory-border p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-noir font-semibold uppercase tracking-wider text-xs border-b border-ivory-border pb-3">
          <Phone className="w-4 h-4 text-champagne" />
          <span>Smart WhatsApp Order Routers (Distribusi Pesanan Round-Robin)</span>
        </div>
        <p className="text-xs text-noir-muted leading-relaxed">
          Jika UMKM memiliki beberapa staf concierge atau kurator, pesanan yang masuk melalui checkout akan dibagikan secara adil dan bergiliran (*round-robin*) ke nomor-nomor di bawah ini.
        </p>

        {/* Existing Routers List */}
        <div className="space-y-2">
          {config.whatsapp_routers?.map((r, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-ivory border border-ivory-border text-xs">
              <div>
                <span className="font-semibold text-noir block">{r.name}</span>
                <span className="font-mono text-noir-muted text-[11px]">+{r.phone}</span>
              </div>
              {config.whatsapp_routers.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRouter(idx)}
                  className="p-1.5 text-noir-muted hover:text-red-700"
                  title="Hapus Router"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Router Subform */}
        <div className="pt-3 border-t border-ivory-border">
          <span className="text-[11px] uppercase tracking-wider text-noir font-semibold block mb-2">
            Tambah Nomor Concierge Baru:
          </span>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Label Nama Admin (misal: Concierge Galeri 3)"
              value={newRouterName}
              onChange={(e) => setNewRouterName(e.target.value)}
              className="flex-1 bg-white border border-ivory-border px-3 py-1.5 text-xs outline-none focus:border-champagne"
            />
            <input
              type="text"
              placeholder="No. WA (misal: 6281234567893)"
              value={newRouterPhone}
              onChange={(e) => setNewRouterPhone(e.target.value)}
              className="w-48 bg-white border border-ivory-border px-3 py-1.5 text-xs outline-none font-mono focus:border-champagne"
            />
            <button
              type="button"
              onClick={handleAddRouter}
              className="bg-noir text-ivory px-4 py-1.5 text-xs uppercase font-medium hover:bg-noir-light whitespace-nowrap"
            >
              Tambah
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Dynamic Bundling Rules */}
      <div className="bg-white border border-ivory-border p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-noir font-semibold uppercase tracking-wider text-xs border-b border-ivory-border pb-3">
          <Tag className="w-4 h-4 text-champagne" />
          <span>Aturan Diskon Bundling (Capsule Wardrobe)</span>
        </div>
        <p className="text-xs text-noir-muted leading-relaxed">
          Diskon volume dihitung seketika di peramban klien untuk mendorong pembelian lebih dari satu potong busana (*basket size expansion*).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-ivory border border-ivory-border text-xs space-y-2">
            <span className="font-semibold text-noir block">Tingkat 1: Curated Pair</span>
            <div className="text-noir-muted text-[11px]">
              Minimal Pembelian: <strong>2 Pcs</strong>
            </div>
            <div className="text-champagne-dark font-bold text-sm">
              Diskon 10% Otomatis
            </div>
          </div>

          <div className="p-4 bg-ivory border border-ivory-border text-xs space-y-2">
            <span className="font-semibold text-noir block">Tingkat 2: VIP Capsule Wardrobe</span>
            <div className="text-noir-muted text-[11px]">
              Minimal Pembelian: <strong>3 Pcs atau lebih</strong>
            </div>
            <div className="text-champagne-dark font-bold text-sm">
              Diskon 15% Otomatis
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

