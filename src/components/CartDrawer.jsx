import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, MapPin, MessageCircle, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const CartDrawer = () => {
  const {
    activeModal,
    closeModal,
    cart,
    removeFromCart,
    updateCartQty,
    bundlingCalculation,
    triggerWhatsAppOrder,
    t,
  } = useStore();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  if (activeModal !== 'cart') return null;

  const formatIDR = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);

  // HTML5 Geotagging (PRD 4.3)
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Fitur geolokasi tidak didukung oleh peramban Anda.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // Reverse geocoding via OpenStreetMap Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`
          );
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.county || data.address?.state || 'Jakarta Selatan';
          const road = data.address?.road ? `${data.address.road}, ` : '';
          
          setCustomer(prev => ({
            ...prev,
            city: city,
            address: `${road}${city}, ${data.address?.state || 'Indonesia'}`
          }));
          setLocationSuccess(true);
        } catch {
          setCustomer(prev => ({
            ...prev,
            city: 'Jakarta Selatan',
            address: 'Jakarta Selatan, DKI Jakarta'
          }));
          setLocationSuccess(true);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        alert('Izin lokasi ditolak atau tidak dapat diakses. Silakan masukkan alamat manual.');
      },
      { timeout: 8000 }
    );
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!cart.length) return;
    if (!customer.name.trim() || !customer.phone.trim()) {
      alert('Mohon lengkapi Nama dan Nomor WhatsApp Anda.');
      return;
    }
    triggerWhatsAppOrder(customer);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-noir/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white border-l border-ivory-border shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-ivory-border bg-ivory flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-ultra font-semibold text-champagne-dark block">
                Atelier Concierge
              </span>
              <h2 className="font-serif-fashion text-xl text-noir font-medium">
                {t.cart.title}
              </h2>
            </div>
            <button
              onClick={closeModal}
              className="p-2 text-noir hover:text-champagne transition-colors"
              aria-label="Tutup keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            
            {/* Dynamic Wholesale / Bundling Progress Bar (PRD 4.2) */}
            {cart.length > 0 && (
              <div className="bg-ivory-subtle p-4 border border-ivory-border text-xs">
                <div className="flex items-center justify-between font-semibold text-noir mb-1.5">
                  <span className="uppercase tracking-wider">{t.bundling.title}</span>
                  {bundlingCalculation.discountPercent > 0 && (
                    <span className="text-champagne-dark font-bold">
                      {bundlingCalculation.discountPercent}% OFF
                    </span>
                  )}
                </div>

                {bundlingCalculation.nextThreshold ? (
                  <p className="text-noir-muted leading-tight mb-2">
                    Tambahkan <strong>{bundlingCalculation.nextThreshold.itemsNeeded} busana lagi</strong> untuk membuka diskon {bundlingCalculation.nextThreshold.nextDiscount}%!
                  </p>
                ) : (
                  <p className="text-emerald-700 leading-tight mb-2 font-medium">
                    Tingkat Tertinggi Aktif: Anda menikmati potongan 15% VIP Capsule!
                  </p>
                )}

                {/* Progress bar visual */}
                <div className="w-full bg-ivory-border h-1.5 overflow-hidden">
                  <div
                    className="bg-champagne h-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (bundlingCalculation.totalItems / 3) * 100)}%`
                    }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="text-center py-16 text-noir-muted">
                <p className="font-serif-fashion text-base mb-3 text-noir">
                  {t.cart.empty}
                </p>
                <p className="text-xs leading-relaxed max-w-xs mx-auto mb-6">
                  Jelajahi karya tenun dan busana sartorial kami untuk menambahkan ke tas kurasi Anda.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-noir text-ivory text-xs px-5 py-2.5 uppercase font-semibold tracking-wider hover:bg-noir-light transition-colors"
                >
                  {t.cart.startShopping}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.itemKey}
                    className="flex gap-4 p-3 bg-ivory/50 border border-ivory-border text-xs"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover border border-ivory-border bg-white"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif-fashion text-sm font-medium text-noir line-clamp-1">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.itemKey)}
                            className="text-noir-muted hover:text-red-700 p-1"
                            aria-label="Hapus produk"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Variants breakdown */}
                        {item.variants && item.variants.length > 0 && (
                          <div className="text-[10px] text-noir-muted mt-1 space-y-0.5">
                            {item.variants.map((v, idx) => (
                              <div key={idx}>
                                {v.group}: <span className="font-medium text-noir">{v.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Quantity & Line Total */}
                      <div className="flex items-center justify-between pt-2 border-t border-ivory-border/60">
                        <div className="flex items-center border border-ivory-border bg-white">
                          <button
                            onClick={() => updateCartQty(item.itemKey, -1)}
                            className="px-2 py-0.5 text-xs hover:bg-ivory"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-mono font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQty(item.itemKey, 1)}
                            className="px-2 py-0.5 text-xs hover:bg-ivory"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-semibold text-noir">
                          {formatIDR(item.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Client Form (Only if items exist) */}
            {cart.length > 0 && (
              <form onSubmit={handleCheckout} className="border-t border-ivory-border pt-6 space-y-4 text-xs">
                <span className="font-semibold uppercase tracking-wider text-noir block mb-2">
                  {t.cart.customerInfo}
                </span>

                <div>
                  <label className="block text-[11px] text-noir-muted uppercase mb-1">
                    {t.cart.name} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Raden Suryo"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full bg-white border border-ivory-border focus:border-champagne px-3 py-2 outline-none font-sans-editorial"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-noir-muted uppercase mb-1">
                    {t.cart.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 08123456789"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-white border border-ivory-border focus:border-champagne px-3 py-2 outline-none font-sans-editorial"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-noir-muted uppercase">
                      {t.cart.address}
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={isDetectingLocation}
                      className="text-[11px] text-champagne-dark hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{isDetectingLocation ? 'Mendeteksi...' : t.cart.detectLocation}</span>
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Alamat lengkap tujuan pengiriman..."
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full bg-white border border-ivory-border focus:border-champagne px-3 py-2 outline-none font-sans-editorial resize-none"
                  />
                  {locationSuccess && (
                    <span className="text-[10px] text-emerald-700 block mt-0.5">
                      Lokasi berhasil terdeteksi otomatis melalui browser.
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] text-noir-muted uppercase mb-1">
                    {t.cart.notes}
                  </label>
                  <input
                    type="text"
                    placeholder="Permintaan penyesuaian keliman / inisial monogram"
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    className="w-full bg-white border border-ivory-border focus:border-champagne px-3 py-2 outline-none font-sans-editorial"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Footer & Checkout Total */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-ivory-border bg-ivory space-y-3 text-xs">
              <div className="flex justify-between text-noir-muted">
                <span>{t.cart.subtotal}</span>
                <span>{formatIDR(bundlingCalculation.subtotal)}</span>
              </div>

              {bundlingCalculation.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>{t.cart.discount} ({bundlingCalculation.discountPercent}%)</span>
                  <span>-{formatIDR(bundlingCalculation.discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-bold text-noir pt-2 border-t border-ivory-border">
                <span>{t.cart.total}</span>
                <span className="font-sans-editorial">{formatIDR(bundlingCalculation.finalTotal)}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-noir text-ivory hover:bg-noir-light py-3.5 px-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-champagne" />
                  <span>{t.cart.checkoutWhatsapp}</span>
                </button>
              </div>

              <p className="text-[10px] text-noir-muted text-center leading-normal">
                {t.cart.zeroGatewayNotice}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

