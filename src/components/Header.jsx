import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Search, Award, Clock, Globe } from 'lucide-react';

export const Header = ({ onOpenAdmin }) => {
  const {
    lang,
    setLang,
    t,
    cart,
    loyaltyPoints,
    isStoreOpen,
    setActiveModal,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-ivory-border transition-all">
      {/* Top micro-bar: Gallery status & language switcher */}
      <div className="bg-noir text-ivory text-xs py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 tracking-wide font-light">
            <span className={`inline-block w-2 h-2 rounded-full ${isStoreOpen ? 'bg-emerald-400' : 'bg-champagne'}`} />
            <span className="font-sans-editorial">
              {isStoreOpen ? t.nav.openStatus : t.nav.closedStatus}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Privilege Points quick button */}
            <button
              onClick={() => setActiveModal('loyalty')}
              className="flex items-center gap-1.5 text-champagne-light hover:text-white transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="font-sans-editorial font-medium tracking-wider">
                {loyaltyPoints} Poin Privilege
              </span>
            </button>

            {/* Admin CRM Shortcut */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-champagne hover:text-white uppercase tracking-wider transition-colors"
              >
                <span>Admin CRM</span>
              </button>
            )}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 border-l border-noir-border pl-4">
              <Globe className="w-3.5 h-3.5 text-champagne" />
              <button
                onClick={() => setLang('id')}
                className={`px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wider transition-colors ${
                  lang === 'id' ? 'text-champagne font-bold underline' : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                ID
              </button>
              <span className="text-ivory/40">|</span>
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wider transition-colors ${
                  lang === 'en' ? 'text-champagne font-bold underline' : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation & Atelier Logo */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex flex-col">
            <a href="#" className="group">
              <span className="font-serif-fashion text-2xl md:text-3xl font-semibold tracking-wider text-noir block group-hover:text-champagne-dark transition-colors">
                ATELIER NOIR &amp; CO.
              </span>
              <span className="font-sans-editorial text-[9px] md:text-[10px] tracking-[0.25em] text-noir-muted uppercase block">
                Indonesian Haute Heritage &bull; Est. 2026
              </span>
            </a>
          </div>

          {/* Navigation links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-noir/80">
            <a href="#katalog" className="hover:text-champagne-dark transition-colors py-1">
              {t.nav.collection}
            </a>
            <a href="#lookbook" className="hover:text-champagne-dark transition-colors py-1">
              {t.nav.lookbook}
            </a>
            <button
              onClick={() => setActiveModal('size_guide')}
              className="hover:text-champagne-dark transition-colors py-1 uppercase"
            >
              {t.product.sizeGuide}
            </button>
            <button
              onClick={() => setActiveModal('loyalty')}
              className="hover:text-champagne-dark transition-colors py-1 uppercase"
            >
              {t.nav.privilege}
            </button>
          </nav>

          {/* Right Action Icons: Search & Cart Drawer */}
          <div className="flex items-center gap-4">
            {/* Search Input inline or compact */}
            <div className="relative hidden md:block w-48 xl:w-64">
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 border border-ivory-border focus:border-champagne text-xs rounded-none pl-8 pr-3 py-2 outline-none font-sans-editorial text-noir placeholder:text-noir-muted/60 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-noir-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setActiveModal('cart')}
              className="relative p-2 text-noir hover:text-champagne-dark transition-colors border border-ivory-border hover:border-champagne bg-white"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-champagne text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t.nav.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-ivory-border focus:border-champagne text-xs rounded-none pl-8 pr-3 py-2 outline-none font-sans-editorial text-noir placeholder:text-noir-muted/60"
            />
            <Search className="w-3.5 h-3.5 text-noir-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </header>
  );
};

