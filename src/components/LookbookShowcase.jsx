import React from 'react';
import { useStore } from '../context/StoreContext';
import { Eye, ArrowUpRight } from 'lucide-react';

export const LookbookShowcase = () => {
  const { catalog, openProductDetail, t } = useStore();

  const lookbookItems = catalog.filter(item => item.is_lookbook);

  if (!lookbookItems.length) return null;

  return (
    <section id="lookbook" className="py-10 md:py-16 bg-ivory-subtle border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 pb-4 md:pb-6 border-b border-ivory-border gap-3 md:gap-4">
          <div>
            <span className="text-[10px] md:text-[11px] font-semibold tracking-ultra uppercase text-champagne-dark block mb-1 md:mb-2">
              Sartorial Archive
            </span>
            <h2 className="font-serif-fashion text-2xl md:text-4xl text-noir font-normal">
              Editorial Lookbook &amp; Siluet
            </h2>
          </div>
          <p className="font-sans-editorial text-xs text-noir-muted max-w-md">
            Dokumentasi kurasi rancangan busana yang memadukan tekstur tenun pusaka nusantara dengan garis desain minimalis avant-garde.
          </p>
        </div>

        {/* Lookbook Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {lookbookItems.slice(0, 4).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openProductDetail(item)}
              className="group cursor-pointer bg-white border border-ivory-border hover:border-champagne transition-all flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-noir/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="bg-white text-noir px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.product.quickView}</span>
                  </span>
                </div>

                {/* Serial look index */}
                <div className="absolute top-3 left-3 bg-noir text-ivory text-[10px] font-mono px-2 py-0.5">
                  LOOK {String(idx + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Item brief */}
              <div className="p-4 flex flex-col flex-grow justify-between border-t border-ivory-border">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-noir-muted block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif-fashion text-sm text-noir font-medium line-clamp-1 group-hover:text-champagne-dark transition-colors">
                    {item.title}
                  </h3>
                </div>
                
                <div className="mt-3 pt-3 border-t border-ivory-subtle flex items-center justify-between text-xs">
                  <span className="font-medium text-noir font-sans-editorial">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.base_price)}
                  </span>
                  <span className="text-champagne flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

