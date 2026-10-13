import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, MessageCircle, ArrowUpRight, Compass, Layers } from 'lucide-react';

export const Footer = ({ onOpenAdmin }) => {
  const { storeConfig, setActiveModal, t } = useStore();

  return (
    <footer className="bg-noir text-ivory border-t border-noir-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-noir-border">
          
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif-fashion text-2xl font-semibold tracking-wider text-ivory block">
              ATELIER NOIR &amp; CO.
            </span>
            <p className="font-sans-editorial text-xs text-ivory/70 leading-relaxed max-w-md">
              {t.footer.brandDesc}
            </p>
            <div className="pt-2 flex items-center gap-2 text-champagne-light text-xs">
              <ShieldCheck className="w-4 h-4 text-champagne" />
              <span>{t.footer.guarantee}</span>
            </div>
          </div>

          {/* Gallery Info & Operating Hours */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-champagne-light block">
              {t.footer.visit}
            </span>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Kawasan Senopati &bull; Jakarta Selatan<br />
              DKI Jakarta 12190, Indonesia
            </p>
            <div className="pt-1">
              <span className="text-[10px] uppercase tracking-wider text-ivory/50 block">Jam Pelayanan Daring:</span>
              <span className="text-xs text-ivory/90 font-medium">{t.footer.hours}</span>
            </div>
          </div>

          {/* Navigation & CMS Admin */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-champagne-light block">
              Akses Kurasi
            </span>
            <ul className="space-y-2 text-xs text-ivory/70">
              <li>
                <a href="#katalog" className="hover:text-champagne transition-colors">
                  {t.nav.collection}
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-champagne transition-colors">
                  {t.nav.lookbook}
                </a>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('size_guide')}
                  className="hover:text-champagne transition-colors text-left"
                >
                  {t.product.sizeGuide}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('loyalty')}
                  className="hover:text-champagne transition-colors text-left"
                >
                  {t.nav.privilege}
                </button>
              </li>
              {onOpenAdmin && (
                <li className="pt-2">
                  <button
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 text-xs text-champagne hover:text-white transition-colors text-left font-semibold uppercase tracking-wider"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Portal Admin CRM</span>
                  </button>
                </li>
              )}
              <li className="pt-1">
                <a
                  href="/admin/"
                  className="inline-flex items-center gap-1 text-[11px] text-ivory/50 hover:text-champagne transition-colors"
                >
                  <Layers className="w-3 h-3" />
                  <span>Decap CMS Backend</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Jamstack Badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ivory/50">
          <div>
            &copy; {new Date().getFullYear()} ATELIER NOIR &amp; CO. &bull; {t.footer.rights}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-ivory transition-colors">Universal Jamstack 3.0</span>
            <span>&bull;</span>
            <span className="hover:text-ivory transition-colors">Zero Payment Fee WhatsApp Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

