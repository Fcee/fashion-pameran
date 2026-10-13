import React from 'react';
import { useStore } from '../context/StoreContext';
import { Eye, Star, Plus } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { openProductDetail, t } = useStore();

  const formatIDR = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);

  const getStockBadge = (status) => {
    switch (status) {
      case 'in_stock':
        return (
          <span className="bg-noir/90 text-ivory text-[9px] sm:text-[10px] font-medium uppercase tracking-wider px-1.5 sm:px-2 py-0.5">
            {t.product.stockInStock}
          </span>
        );
      case 'low_stock':
        return (
          <span className="bg-champagne text-white text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 sm:px-2 py-0.5">
            {t.product.stockLow}
          </span>
        );
      case 'pre_order':
        return (
          <span className="bg-noir-muted text-ivory text-[9px] sm:text-[10px] font-medium uppercase tracking-wider px-1.5 sm:px-2 py-0.5">
            {t.product.stockPreOrder}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      className="group cursor-pointer bg-white border border-ivory-border hover:border-champagne transition-all duration-300 flex flex-col h-full active:scale-[0.99] shadow-xs"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Stock Badge */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
          {getStockBadge(product.stock_status)}
        </div>

        {/* Desktop Quick View Button on Hover */}
        <div className="hidden md:flex absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-noir/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="w-full bg-ivory text-noir text-xs font-semibold py-2.5 uppercase tracking-wider hover:bg-white flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.product.quickView}</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow justify-between border-t border-ivory-border">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-noir-muted uppercase tracking-widest mb-1">
            <span className="truncate pr-1">{product.category}</span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-champagne-dark font-medium shrink-0">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-champagne-dark text-champagne-dark" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif-fashion text-xs sm:text-base text-noir font-medium leading-snug group-hover:text-champagne-dark transition-colors line-clamp-2 mb-1">
            {product.title}
          </h3>

          {/* Subtitle (Hidden on smallest mobile to keep card tidy) */}
          {product.subtitle && (
            <p className="hidden sm:block font-sans-editorial text-[11px] md:text-xs text-noir-muted/80 line-clamp-1 mb-2">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-2 sm:pt-3 border-t border-ivory-subtle flex items-center justify-between mt-2">
          <div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-noir-muted block">
              Investasi
            </span>
            <span className="font-sans-editorial text-xs sm:text-sm font-semibold text-noir">
              {formatIDR(product.base_price)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-none border border-ivory-border group-hover:border-noir flex items-center justify-center text-noir group-hover:bg-noir group-hover:text-ivory transition-all shrink-0"
            aria-label="Pilih Varian & Beli"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
