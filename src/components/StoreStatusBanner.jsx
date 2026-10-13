import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ArrowRight, X, Clock, ShieldCheck } from 'lucide-react';

export const StoreStatusBanner = () => {
  const {
    hasAbandonedCart,
    setHasAbandonedCart,
    cart,
    setActiveModal,
    isStoreOpen,
    t,
  } = useStore();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      {/* Abandoned Cart Recovery Banner (PRD 4.3) */}
      {hasAbandonedCart && cartCount > 0 && (
        <div className="bg-champagne text-noir px-4 py-2.5 border-b border-champagne-dark">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-medium">
              <ShoppingBag className="w-4 h-4 text-noir" />
              <span>
                Anda memiliki <strong>{cartCount} karya busana</strong> tersimpan di tas kurasi dari kunjungan sebelumnya.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveModal('cart')}
                className="bg-noir text-ivory px-3 py-1 text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1 hover:bg-noir-light transition-colors"
              >
                <span>Buka Tas Belanja</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => setHasAbandonedCart(false)}
                className="text-noir hover:text-noir-light p-1"
                aria-label="Tutup pemberitahuan"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zero Fee & Authenticity Assurance Micro-bar */}
      <div className="bg-ivory-subtle border-b border-ivory-border px-4 py-2 text-[11px] text-noir-muted">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
            <span className="font-sans-editorial">
              100% Karya Asli UMKM Indonesia &bull; Sertifikasi Tenun Tradisional
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-champagne" />
            <span className="font-sans-editorial">
              Layanan Concierge WhatsApp: 08:30 - 21:30 WIB &bull; Bebas Biaya Transaksi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

