import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';

export const Hero = () => {
  const { t } = useStore();

  return (
    <section className="relative bg-ivory border-b border-ivory-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-champagne" />
              <span className="text-xs uppercase tracking-ultra font-semibold text-champagne-dark">
                {t.hero.season}
              </span>
            </div>

            <h1 className="font-serif-fashion text-4xl sm:text-5xl lg:text-6xl text-noir font-normal leading-[1.15] tracking-tight mb-6">
              {t.hero.headline}
            </h1>

            <p className="font-sans-editorial text-sm sm:text-base text-noir-muted leading-relaxed max-w-xl mb-8">
              {t.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-3 bg-noir text-ivory px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-noir-light transition-all border border-noir shadow-sm group"
              >
                <span>{t.hero.ctaExplore}</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#lookbook"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-noir px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-ivory-subtle transition-all border border-noir/30"
              >
                <Compass className="w-3.5 h-3.5 text-champagne-dark" />
                <span>{t.hero.ctaLookbook}</span>
              </a>
            </div>

            {/* Micro stats / Trust badges */}
            <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-ivory-border">
              <div>
                <span className="block font-serif-fashion text-2xl text-noir font-semibold">100%</span>
                <span className="block font-sans-editorial text-[11px] text-noir-muted uppercase tracking-wider mt-1">Tenun Tangan Asli</span>
              </div>
              <div>
                <span className="block font-serif-fashion text-2xl text-noir font-semibold">Zero Fee</span>
                <span className="block font-sans-editorial text-[11px] text-noir-muted uppercase tracking-wider mt-1">Direct WhatsApp WA</span>
              </div>
              <div>
                <span className="block font-serif-fashion text-2xl text-noir font-semibold">Jamstack</span>
                <span className="block font-sans-editorial text-[11px] text-noir-muted uppercase tracking-wider mt-1">PWA Offline Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Haute Editorial Look Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-ivory-border p-3 bg-white shadow-xl">
              <div className="relative overflow-hidden aspect-[3/4] bg-ivory-subtle">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                  alt="Atelier Noir & Co. Autumn Winter 2026 Editorial"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Floating Sartorial Stamp */}
                <div className="absolute bottom-4 left-4 bg-noir/90 backdrop-blur-sm text-ivory p-3 max-w-[220px] border border-champagne/40">
                  <span className="block font-serif-fashion text-xs italic text-champagne-light">
                    Arsip Busana No. 01/2026
                  </span>
                  <span className="block font-sans-editorial text-[10px] tracking-wider uppercase mt-1">
                    Siluet Tenun Sutera Organza Lilit Kontemporer
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

