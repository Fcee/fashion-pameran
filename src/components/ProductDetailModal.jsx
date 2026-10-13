import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Check, Star, ShieldCheck, Ruler, ShoppingBag, MessageCircle } from 'lucide-react';

export const ProductDetailModal = () => {
  const {
    activeModal,
    closeModal,
    selectedProduct,
    addToCart,
    setActiveModal,
    triggerWhatsAppOrder,
    t,
  } = useStore();

  if (activeModal !== 'product_detail' || !selectedProduct) return null;

  // Selected image index
  const [activeImage, setActiveImage] = useState(selectedProduct.image);
  
  // Selected variant state
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Initialize default variants on open
  useEffect(() => {
    if (selectedProduct?.variants) {
      const defaults = {};
      selectedProduct.variants.forEach(group => {
        if (group.options?.length > 0) {
          defaults[group.name] = group.options[0].name;
        }
      });
      setSelectedVariants(defaults);
      setActiveImage(selectedProduct.image);
      setQuantity(1);
      setIsAddedSuccess(false);
    }
  }, [selectedProduct]);

  // Calculate live price including chosen variant options
  const calculateUnitPrice = () => {
    let price = selectedProduct.base_price;
    selectedProduct.variants?.forEach(group => {
      const selectedOptionName = selectedVariants[group.name];
      const optionObj = group.options?.find(opt => opt.name === selectedOptionName);
      if (optionObj && optionObj.price_add) {
        price += optionObj.price_add;
      }
    });
    return price;
  };

  const unitPrice = calculateUnitPrice();
  const totalPrice = unitPrice * quantity;

  const formatIDR = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);

  const handleVariantChange = (groupName, optionName) => {
    setSelectedVariants(prev => ({
      ...prev,
      [groupName]: optionName,
    }));
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedVariants, quantity);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
    }, 2500);
  };

  const handleDirectWhatsApp = () => {
    // Add to cart first then trigger instant checkout
    addToCart(selectedProduct, selectedVariants, quantity);
    setActiveModal('cart');
  };

  const galleryImages = selectedProduct.gallery?.length > 0
    ? selectedProduct.gallery
    : [selectedProduct.image];

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-noir/70 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative bg-white border border-ivory-border max-w-4xl w-full my-auto md:my-8 shadow-2xl flex flex-col md:flex-row max-h-[92vh] md:max-h-[90vh] overflow-y-auto md:overflow-hidden">
        
        {/* Close Modal Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 bg-white/95 md:bg-ivory text-noir hover:bg-noir hover:text-ivory p-2 border border-ivory-border shadow-sm transition-colors rounded-full md:rounded-none"
          aria-label="Tutup modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-3 sm:p-5 md:p-6 bg-ivory flex flex-col flex-shrink-0">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[3/4] max-h-56 sm:max-h-72 md:max-h-none overflow-hidden bg-white border border-ivory-border mb-3 md:mb-4">
            <img
              src={activeImage}
              alt={selectedProduct.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          {/* Thumbnail list */}
          {galleryImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-12 h-14 sm:w-14 sm:h-16 md:w-16 md:h-20 border overflow-hidden flex-shrink-0 transition-all ${
                    activeImage === img ? 'border-champagne ring-1 ring-champagne' : 'border-ivory-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Specs, Variant Matrix & Actions */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col md:overflow-y-auto md:max-h-[90vh]">
          <div className="space-y-4 md:space-y-5">
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-noir-muted uppercase tracking-widest">
              <span>{selectedProduct.category}</span>
              <div className="flex items-center gap-1 text-champagne-dark font-medium">
                <Star className="w-3.5 h-3.5 fill-champagne-dark text-champagne-dark" />
                <span>{selectedProduct.rating}</span>
                <span className="text-noir-muted">({selectedProduct.reviews_count} ulasan)</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-serif-fashion text-xl sm:text-2xl md:text-3xl text-noir font-medium leading-tight">
              {selectedProduct.title}
            </h2>

            {/* Subtitle / Edition */}
            {selectedProduct.subtitle && (
              <p className="text-xs text-champagne-dark font-medium uppercase tracking-wider">
                {selectedProduct.subtitle}
              </p>
            )}

            {/* Live Price */}
            <div className="pb-3 md:pb-4 border-b border-ivory-border">
              <span className="text-[11px] uppercase tracking-wider text-noir-muted block mb-1">
                Investasi Nilai Busana
              </span>
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="font-sans-editorial text-xl sm:text-2xl font-bold text-noir">
                  {formatIDR(unitPrice)}
                </span>
                {selectedProduct.stock_status === 'in_stock' && (
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    Sisa {selectedProduct.stock_count} potong siap kirim
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-noir-muted leading-relaxed font-sans-editorial">
              {selectedProduct.description}
            </p>

            {/* Material & Care Details */}
            <div className="bg-ivory-subtle p-3 sm:p-3.5 border border-ivory-border text-xs space-y-2">
              <div>
                <strong className="text-noir font-semibold uppercase tracking-wider text-[11px] block">
                  {t.product.composition}:
                </strong>
                <span className="text-noir-muted">{selectedProduct.composition}</span>
              </div>
              <div>
                <strong className="text-noir font-semibold uppercase tracking-wider text-[11px] block">
                  {t.product.care}:
                </strong>
                <span className="text-noir-muted">{selectedProduct.care_instructions}</span>
              </div>
            </div>

            {/* Complex Variant Matrix (PRD 4.2) */}
            {selectedProduct.variants?.map((group) => (
              <div key={group.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-noir">
                    {group.group}:
                  </span>
                  {group.name === 'size' && (
                    <button
                      onClick={() => setActiveModal('size_guide')}
                      className="text-[11px] text-champagne-dark hover:underline flex items-center gap-1"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>{t.product.sizeGuide}</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.options.map((opt) => {
                    const isSelected = selectedVariants[group.name] === opt.name;
                    return (
                      <button
                        key={opt.name}
                        onClick={() => handleVariantChange(group.name, opt.name)}
                        className={`text-xs px-2.5 py-1.5 sm:px-3 sm:py-2 border transition-all text-left ${
                          isSelected
                            ? 'bg-noir text-ivory border-noir shadow-sm'
                            : 'bg-white text-noir border-ivory-border hover:border-champagne'
                        }`}
                      >
                        <span className="font-medium">{opt.name}</span>
                        {opt.price_add > 0 && (
                          <span className={`block text-[10px] mt-0.5 ${isSelected ? 'text-champagne-light' : 'text-champagne-dark'}`}>
                            +{formatIDR(opt.price_add)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 sm:gap-4 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-noir">
                Kuantitas:
              </span>
              <div className="flex items-center border border-ivory-border bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-sm hover:bg-ivory transition-colors text-noir"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold text-noir font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-sm hover:bg-ivory transition-colors text-noir"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-noir-muted">
                Total: <strong>{formatIDR(totalPrice)}</strong>
              </span>
            </div>

            {/* Action Buttons (Natural Flow, NOT fixed / NOT sticky) */}
            <div className="pt-4 border-t border-ivory-border space-y-2.5">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 border ${
                  isAddedSuccess
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-noir text-ivory hover:bg-noir-light border-noir active:scale-[0.99]'
                }`}
              >
                {isAddedSuccess ? (
                  <>
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>Berhasil Ditambahkan ke Tas</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                    <span>{t.product.addToCart}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-widest bg-champagne text-noir hover:bg-champagne-light transition-all flex items-center justify-center gap-2 border border-champagne active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>{t.product.buyNowWhatsapp}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

