import React from 'react';
import { useStore } from '../context/StoreContext';
import { Layers, Compass, Award, ShoppingBag, ShieldCheck } from 'lucide-react';

export const MobileBottomNav = ({ onOpenAdmin }) => {
  const { cart, setActiveModal, loyaltyPoints } = useStore();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Mobile Navigation Bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-ivory-border md:hidden shadow-[0_-4px_20px_rgba(20,20,19,0.06)]"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
        
        {/* 1. Koleksi / Katalog */}
        <button
          onClick={() => scrollToSection('katalog')}
          className="flex flex-col items-center justify-center text-noir hover:text-champagne-dark py-1 transition-colors active:scale-95"
        >
          <Layers className="w-5 h-5 text-noir" />
          <span className="text-[10px] font-sans-editorial font-medium tracking-tight mt-1 text-noir">
            Koleksi
          </span>
        </button>

        {/* 2. Lookbook Editorial */}
        <button
          onClick={() => scrollToSection('lookbook')}
          className="flex flex-col items-center justify-center text-noir hover:text-champagne-dark py-1 transition-colors active:scale-95"
        >
          <Compass className="w-5 h-5 text-noir" />
          <span className="text-[10px] font-sans-editorial font-medium tracking-tight mt-1 text-noir">
            Lookbook
          </span>
        </button>

        {/* 3. Privilege Club / Loyalty */}
        <button
          onClick={() => setActiveModal('loyalty')}
          className="flex flex-col items-center justify-center text-noir hover:text-champagne-dark py-1 transition-colors active:scale-95 relative"
        >
          <Award className="w-5 h-5 text-champagne-dark" />
          <span className="text-[10px] font-sans-editorial font-medium tracking-tight mt-1 text-noir">
            Privilege
          </span>
        </button>

        {/* 4. Tas Belanja / Cart */}
        <button
          onClick={() => setActiveModal('cart')}
          className="flex flex-col items-center justify-center text-noir hover:text-champagne-dark py-1 transition-colors active:scale-95 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-noir" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-champagne text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-sans-editorial font-medium tracking-tight mt-1 text-noir">
            Tas ({cartCount})
          </span>
        </button>

        {/* 5. Admin CRM Shortcut */}
        <button
          onClick={onOpenAdmin}
          className="flex flex-col items-center justify-center text-noir hover:text-champagne-dark py-1 transition-colors active:scale-95"
        >
          <ShieldCheck className="w-5 h-5 text-champagne-dark" />
          <span className="text-[10px] font-sans-editorial font-medium tracking-tight mt-1 text-noir">
            Admin
          </span>
        </button>

      </div>
    </nav>
  );
};

