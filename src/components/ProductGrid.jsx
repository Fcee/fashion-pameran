import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { SearchX, RotateCcw } from 'lucide-react';

export const ProductGrid = () => {
  const { filteredCatalog, setSelectedCategory, setSelectedSize, setSearchQuery, t } = useStore();

  if (filteredCatalog.length === 0) {
    return (
      <div className="py-20 text-center bg-white border border-ivory-border p-8 max-w-xl mx-auto">
        <SearchX className="w-10 h-10 text-noir-muted mx-auto mb-4" />
        <h3 className="font-serif-fashion text-xl text-noir mb-2">
          Karya Tidak Ditemukan
        </h3>
        <p className="font-sans-editorial text-xs text-noir-muted mb-6 leading-relaxed">
          Tidak ada karya busana yang cocok dengan filter atau kata kunci pencarian Anda. Silakan coba kriteria lainnya.
        </p>
        <button
          onClick={() => {
            setSelectedCategory('all');
            setSelectedSize('all');
            setSearchQuery('');
          }}
          className="inline-flex items-center gap-2 bg-noir text-ivory px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-noir-light transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.filter.clearFilter}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredCatalog.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

