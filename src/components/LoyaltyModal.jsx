import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoyaltyModal = () => {
  const { activeModal, closeModal, loyaltyPoints, t } = useStore();

  if (activeModal !== 'loyalty') return null;

  // Determine tier
  let tierName = t.loyalty.tierClassic;
  let nextTierPoints = 50;
  if (loyaltyPoints >= 150) {
    tierName = t.loyalty.tierNoir;
    nextTierPoints = null;
  } else if (loyaltyPoints >= 50) {
    tierName = t.loyalty.tierGold;
    nextTierPoints = 150;
  }

  const tiers = [
    {
      name: t.loyalty.tierClassic,
      min: '0 - 49 Poin',
      perks: ['Akses prioritas katalog rilis baru', 'Akumulasi 10 poin per Rp 100.000 transaksi'],
      active: loyaltyPoints < 50,
    },
    {
      name: t.loyalty.tierGold,
      min: '50 - 149 Poin',
      perks: ['Gratis bordir inisial monogram nama', 'Potongan tambahan 5% setiap pembelian capsule', 'Akses lookbook sebelum peluncuran resmi'],
      active: loyaltyPoints >= 50 && loyaltyPoints < 150,
    },
    {
      name: t.loyalty.tierNoir,
      min: '150+ Poin',
      perks: ['Layanan private video fitting bersama master tailor', 'Kotak koleksi kayu jati gratis untuk setiap pesanan', 'Akses pesanan bahan tenun langka & custom bespoke'],
      active: loyaltyPoints >= 150,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-noir/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white border border-ivory-border max-w-xl w-full p-4 sm:p-6 md:p-8 shadow-2xl max-h-[92vh] overflow-y-auto my-auto">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-noir hover:text-champagne transition-colors"
          aria-label="Tutup modal privilege club"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-6 h-6 text-champagne" />
          <h2 className="font-serif-fashion text-2xl text-noir font-medium">
            {t.loyalty.title}
          </h2>
        </div>
        <p className="text-xs text-noir-muted mb-6 leading-relaxed">
          {t.loyalty.pointsExplanation}
        </p>

        {/* Current Status Card */}
        <div className="bg-noir text-ivory p-6 border border-champagne/40 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-ultra text-champagne-light block">
                {t.loyalty.currentTier}
              </span>
              <h3 className="font-serif-fashion text-xl font-semibold text-white mt-0.5">
                {tierName}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-ultra text-ivory/60 block">
                {t.loyalty.pointsBalance}
              </span>
              <span className="font-mono text-2xl font-bold text-champagne-light">
                {loyaltyPoints}
              </span>
            </div>
          </div>

          {nextTierPoints && (
            <div className="pt-3 border-t border-noir-border text-[11px] text-ivory/70 flex justify-between items-center">
              <span>Kurang <strong>{nextTierPoints - loyaltyPoints} poin</strong> menuju tingkat berikutnya</span>
              <span className="font-mono">{Math.round((loyaltyPoints / nextTierPoints) * 100)}%</span>
            </div>
          )}
        </div>

        {/* Membership Tiers Overview */}
        <div className="space-y-3 mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-noir block">
            Hak Istimewa Jenjang Klien:
          </span>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-3.5 border transition-all text-xs ${
                tier.active
                  ? 'border-champagne bg-champagne-subtle/30 ring-1 ring-champagne'
                  : 'border-ivory-border bg-ivory/30 opacity-70'
              }`}
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-semibold text-noir font-serif-fashion text-sm">
                  {tier.name}
                </span>
                <span className="text-[10px] font-mono text-noir-muted">
                  {tier.min}
                </span>
              </div>
              <ul className="space-y-1">
                {tier.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-noir-muted text-[11px]">
                    <CheckCircle2 className="w-3 h-3 text-champagne shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Close CTA */}
        <div className="text-right">
          <button
            onClick={closeModal}
            className="bg-noir text-ivory px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-noir-light transition-colors"
          >
            Tutup Informasi
          </button>
        </div>

      </div>
    </div>
  );
};

