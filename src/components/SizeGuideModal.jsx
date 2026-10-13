import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Ruler, Info } from 'lucide-react';

export const SizeGuideModal = () => {
  const { activeModal, closeModal, t } = useStore();

  if (activeModal !== 'size_guide') return null;

  const sizeTable = [
    { size: 'S', chest: '98 - 100', shoulder: '44', length: '72', sleeve: '60', waist: '76 - 80' },
    { size: 'M', chest: '104 - 106', shoulder: '46', length: '74', sleeve: '62', waist: '81 - 85' },
    { size: 'L', chest: '110 - 112', shoulder: '48', length: '76', sleeve: '64', waist: '86 - 90' },
    { size: 'XL', chest: '116 - 118', shoulder: '50', length: '78', sleeve: '65', waist: '91 - 96' },
    { size: 'XXL (Custom)', chest: '122+', shoulder: '52', length: '80', sleeve: '66', waist: '97 - 102' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-noir/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white border border-ivory-border max-w-2xl w-full p-4 sm:p-6 md:p-8 shadow-2xl max-h-[92vh] overflow-y-auto my-auto">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-noir hover:text-champagne transition-colors"
          aria-label="Tutup panduan ukuran"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <Ruler className="w-5 h-5 text-champagne" />
          <h2 className="font-serif-fashion text-2xl text-noir font-medium">
            {t.sizeGuide.title}
          </h2>
        </div>
        <p className="text-xs text-noir-muted mb-6">
          {t.sizeGuide.subtitle}
        </p>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-ivory-border mb-6">
          <table className="w-full text-xs text-left">
            <thead className="bg-ivory text-noir uppercase tracking-wider text-[11px] border-b border-ivory-border">
              <tr>
                <th className="py-3 px-4 font-semibold">Ukuran</th>
                <th className="py-3 px-4 font-semibold">{t.sizeGuide.chest}</th>
                <th className="py-3 px-4 font-semibold">Bahu</th>
                <th className="py-3 px-4 font-semibold">{t.sizeGuide.waist}</th>
                <th className="py-3 px-4 font-semibold">{t.sizeGuide.length}</th>
                <th className="py-3 px-4 font-semibold">{t.sizeGuide.sleeve}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-subtle font-sans-editorial">
              {sizeTable.map((row) => (
                <tr key={row.size} className="hover:bg-ivory-subtle/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-noir">{row.size}</td>
                  <td className="py-3 px-4 text-noir-muted">{row.chest} cm</td>
                  <td className="py-3 px-4 text-noir-muted">{row.shoulder} cm</td>
                  <td className="py-3 px-4 text-noir-muted">{row.waist} cm</td>
                  <td className="py-3 px-4 text-noir-muted">{row.length} cm</td>
                  <td className="py-3 px-4 text-noir-muted">{row.sleeve} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement tips */}
        <div className="bg-ivory p-4 border border-ivory-border text-xs text-noir-muted space-y-2 mb-6">
          <div className="flex items-center gap-2 font-semibold text-noir uppercase text-[11px]">
            <Info className="w-3.5 h-3.5 text-champagne" />
            <span>Petunjuk Pengukuran Mandiri:</span>
          </div>
          <p className="leading-relaxed">
            1. <strong>Lingkar Dada:</strong> Ukur bagian dada paling penuh dengan pita ukur sejajar horizontal.
          </p>
          <p className="leading-relaxed">
            2. <strong>Bahu:</strong> Ukur dari batas tulang bahu kiri hingga tulang bahu kanan melintasi punggung atas.
          </p>
          <p className="leading-relaxed">
            3. <strong>Layanan Kustom:</strong> Jika ukuran tubuh Anda di antara dua pilihan, pilih satu tingkat lebih besar atau hubungi Concierge Atelier untuk penyesuaian fitting secara cuma-cuma.
          </p>
        </div>

        {/* Footer Button */}
        <div className="text-right">
          <button
            onClick={closeModal}
            className="bg-noir text-ivory px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-noir-light transition-colors"
          >
            {t.sizeGuide.close}
          </button>
        </div>

      </div>
    </div>
  );
};

