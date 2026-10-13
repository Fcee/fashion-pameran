import React from 'react';
import { useStore } from '../context/StoreContext';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

export const CatalogFilter = () => {
  const {
    t,
    selectedCategory,
    setSelectedCategory,
    selectedSize,
    setSelectedSize,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    filteredCatalog,
    catalog,
    setSearchQuery,
    searchQuery,
  } = useStore();

  const categories = [
    { id: 'all', label: t.filter.all },
    { id: 'Outerwear & Jas', label: 'Outerwear & Jas' },
    { id: 'Kemeja & Atasan', label: 'Kemeja & Atasan' },
    { id: 'Bawahan & Celana', label: 'Bawahan & Celana' },
    { id: 'Gaun & Setelan', label: 'Gaun & Setelan' },
  ];

  const sizes = ['all', 'S', 'M', 'L', 'XL'];

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('all');
    setSortBy('latest');
    setInStockOnly(false);
    setSearchQuery('');
  };

  const isFiltered = selectedCategory !== 'all' || selectedSize !== 'all' || inStockOnly || sortBy !== 'latest' || searchQuery !== '';

  return (
    <div className="bg-white border border-ivory-border p-4 md:p-6 mb-8">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-ivory-border no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = cat.id === 'all' 
            ? catalog.length 
            : catalog.filter(c => c.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all border ${
                isActive
                  ? 'bg-noir text-ivory border-noir'
                  : 'bg-ivory text-noir border-ivory-border hover:border-champagne hover:bg-white'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`ml-2 text-[10px] ${isActive ? 'text-champagne-light' : 'text-noir-muted'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Row: Sizes, Sort, Stock Toggle, Reset */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Left side: Size selector & In-stock switch */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Size Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-noir-muted">
              {t.filter.size}:
            </span>
            <div className="flex items-center gap-1">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-7 h-7 text-[11px] font-medium uppercase transition-colors border ${
                    selectedSize === s
                      ? 'bg-noir text-ivory border-noir'
                      : 'bg-white text-noir border-ivory-border hover:border-champagne'
                  }`}
                >
                  {s === 'all' ? 'All' : s}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Only Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none border-l border-ivory-border pl-4">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${inStockOnly ? 'bg-noir border-noir text-ivory' : 'bg-white border-ivory-border'}`}>
              {inStockOnly && <Check className="w-3 h-3 text-champagne" />}
            </div>
            <span className="text-xs font-medium text-noir">
              {t.filter.inStockOnly}
            </span>
          </label>
        </div>

        {/* Right side: Sort & Reset button */}
        <div className="flex items-center gap-3">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-noir-muted">
              {t.filter.sortBy}:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-ivory-border text-xs px-3 py-1.5 outline-none font-sans-editorial text-noir focus:border-champagne cursor-pointer"
            >
              <option value="latest">{t.filter.sortLatest}</option>
              <option value="price_asc">{t.filter.sortPriceAsc}</option>
              <option value="price_desc">{t.filter.sortPriceDesc}</option>
              <option value="rating">{t.filter.sortRating}</option>
            </select>
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs text-noir-muted hover:text-noir px-2 py-1.5 border border-dashed border-ivory-border hover:border-champagne transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.filter.clearFilter}</span>
            </button>
          )}
        </div>

      </div>

      {/* Results Count bar */}
      <div className="mt-4 pt-3 border-t border-ivory-border flex justify-between items-center text-[11px] text-noir-muted">
        <span>
          Menampilkan <strong>{filteredCatalog.length}</strong> {t.filter.resultsFound}
        </span>
        {searchQuery && (
          <span>
            Pencarian kata kunci: <em>&quot;{searchQuery}&quot;</em>
          </span>
        )}
      </div>
    </div>
  );
};

