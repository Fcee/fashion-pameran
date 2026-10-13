import React, { useState, useEffect } from 'react';
import { useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { StoreStatusBanner } from './components/StoreStatusBanner';
import { Hero } from './components/Hero';
import { LookbookShowcase } from './components/LookbookShowcase';
import { CatalogFilter } from './components/CatalogFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App = () => {
  const { loading, t } = useStore();
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.hash === '#admin';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
  };

  const exitAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <span className="font-serif-fashion text-2xl font-semibold tracking-widest text-noir block animate-pulse">
            ATELIER NOIR &amp; CO.
          </span>
          <span className="text-[10px] tracking-ultra uppercase text-noir-muted block">
            Memuat Koleksi Master UMKM...
          </span>
        </div>
      </div>
    );
  }

  // Render Admin CRM Dashboard
  if (isAdminView) {
    return <AdminDashboard onExitAdmin={exitAdmin} />;
  }

  // Render Public Catalog Storefront
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-noir font-sans-editorial">
      {/* Top Header */}
      <Header onOpenAdmin={openAdmin} />

      {/* Dynamic Status & Cart Alert */}
      <StoreStatusBanner />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Editorial Hero */}
        <Hero />

        {/* Lookbook Runway Showcase */}
        <LookbookShowcase />

        {/* Main Catalog Section */}
        <section id="katalog" className="py-16 max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-semibold tracking-ultra uppercase text-champagne-dark block mb-2">
              Koleksi Eksklusif
            </span>
            <h2 className="font-serif-fashion text-3xl md:text-4xl text-noir font-normal mb-3">
              Katalog Busana Terpilih
            </h2>
            <p className="text-xs text-noir-muted leading-relaxed font-sans-editorial">
              Pilih karya busana bertaraf internasional dengan sentuhan tenun dan material artisanal terbaik nusantara.
            </p>
          </div>

          {/* Faceted Filter & Search */}
          <CatalogFilter />

          {/* Product Grid */}
          <ProductGrid />
        </section>
      </main>

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <SizeGuideModal />
      <LoyaltyModal />

      {/* Footer */}
      <Footer onOpenAdmin={openAdmin} />
    </div>
  );
};

export default App;
