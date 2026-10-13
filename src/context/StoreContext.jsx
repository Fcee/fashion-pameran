import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { translations } from '../data/translations';
import fallbackCatalogData from '../../public/data/catalog.json';
import fallbackStoreConfigData from '../../public/data/store_config.json';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [storeConfig, setStoreConfig] = useState(fallbackStoreConfigData.store_config);
  const [catalog, setCatalog] = useState(fallbackCatalogData.catalog);
  const [loading, setLoading] = useState(false);

  // Language state (i18n)
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('atelier_lang') || 'id';
  });

  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Abandoned cart detection (PRD 4.3)
  const [hasAbandonedCart, setHasAbandonedCart] = useState(false);

  // Loyalty points persisted in localStorage
  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    const saved = localStorage.getItem('atelier_loyalty_points');
    return saved ? parseInt(saved, 10) : 40; // Starts with 40 welcome points
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPriceFilter, setMaxPriceFilter] = useState(2500000);

  // Modals
  const [activeModal, setActiveModal] = useState(null); // 'product_detail' | 'cart' | 'size_guide' | 'loyalty'
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load config and catalog from JSON files (Jamstack / Decap CMS compatible with BASE_URL)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const [configRes, catalogRes] = await Promise.all([
          fetch(`${baseUrl}data/store_config.json`),
          fetch(`${baseUrl}data/catalog.json`)
        ]);
        if (configRes.ok && catalogRes.ok) {
          const configData = await configRes.json();
          const catalogData = await catalogRes.json();
          if (configData?.store_config) setStoreConfig(configData.store_config);
          if (catalogData?.catalog) setCatalog(catalogData.catalog);
        }
      } catch (err) {
        console.warn('Using bundled catalog fallback data:', err);
      }
    };
    fetchData();
  }, []);

  // Save cart to localStorage and check abandonment
  useEffect(() => {
    localStorage.setItem('atelier_cart', JSON.stringify(cart));
    if (cart.length > 0) {
      const hasCheckedOut = sessionStorage.getItem('atelier_just_checked_out');
      if (!hasCheckedOut) {
        setHasAbandonedCart(true);
      }
    } else {
      setHasAbandonedCart(false);
    }
  }, [cart]);

  // Persist language
  useEffect(() => {
    localStorage.setItem('atelier_lang', lang);
  }, [lang]);

  // Persist loyalty points
  useEffect(() => {
    localStorage.setItem('atelier_loyalty_points', loyaltyPoints.toString());
  }, [loyaltyPoints]);

  // Check store opening status based on current time (PRD 4.2 Smart Availability)
  const isStoreOpen = useMemo(() => {
    if (!storeConfig?.operating_hours) return true;
    try {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeNum = currentHour * 60 + currentMinute;

      const [openHour, openMin] = storeConfig.operating_hours.open.split(':').map(Number);
      const [closeHour, closeMin] = storeConfig.operating_hours.close.split(':').map(Number);

      const openTimeNum = openHour * 60 + openMin;
      const closeTimeNum = closeHour * 60 + closeMin;

      return currentTimeNum >= openTimeNum && currentTimeNum <= closeTimeNum;
    } catch {
      return true;
    }
  }, [storeConfig]);

  // Translation helper
  const t = translations[lang] || translations.id;

  // Fuse.js setup for high-speed client-side fuzzy search (PRD 3.0 & 4.2)
  const fuse = useMemo(() => {
    if (!catalog.length) return null;
    return new Fuse(catalog, {
      keys: ['title', 'subtitle', 'category', 'description', 'composition'],
      threshold: 0.35,
    });
  }, [catalog]);

  // Filtered & Sorted Catalog
  const filteredCatalog = useMemo(() => {
    let result = catalog;

    // Search filter
    if (searchQuery.trim() && fuse) {
      const searchResults = fuse.search(searchQuery.trim());
      result = searchResults.map(item => item.item);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Size filter
    if (selectedSize !== 'all') {
      result = result.filter(item => {
        const sizeVariant = item.variants?.find(v => v.name === 'size');
        return sizeVariant?.options?.some(opt => opt.code === selectedSize || opt.name.includes(selectedSize));
      });
    }

    // In-stock only filter
    if (inStockOnly) {
      result = result.filter(item => item.stock_status === 'in_stock');
    }

    // Price filter
    result = result.filter(item => item.base_price <= maxPriceFilter);

    // Sorting
    const sorted = [...result];
    if (sortBy === 'price_asc') {
      sorted.sort((a, b) => a.base_price - b.base_price);
    } else if (sortBy === 'price_desc') {
      sorted.sort((a, b) => b.base_price - a.base_price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [catalog, searchQuery, fuse, selectedCategory, selectedSize, inStockOnly, maxPriceFilter, sortBy]);

  // Cart operations
  const addToCart = (product, selectedVariants = {}, quantity = 1) => {
    // Calculate total price with variant adjustments
    let unitPrice = product.base_price;
    const variantsList = [];

    product.variants?.forEach(group => {
      const selectedOptionName = selectedVariants[group.name];
      const optionObj = group.options.find(opt => opt.name === selectedOptionName);
      if (optionObj) {
        unitPrice += (optionObj.price_add || 0);
        variantsList.push({
          group: group.group,
          name: optionObj.name,
          price_add: optionObj.price_add || 0,
        });
      }
    });

    // Create unique key for item + variant combo
    const variantKey = Object.entries(selectedVariants)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    const itemKey = `${product.id}-${variantKey}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        next[existingIndex].totalPrice = next[existingIndex].quantity * next[existingIndex].unitPrice;
        return next;
      } else {
        return [
          ...prev,
          {
            itemKey,
            productId: product.id,
            title: product.title,
            image: product.image,
            base_price: product.base_price,
            unitPrice,
            quantity,
            totalPrice: unitPrice * quantity,
            variants: variantsList,
            selectedVariants,
          }
        ];
      }
    });

    sessionStorage.removeItem('atelier_just_checked_out');
  };

  const removeFromCart = (itemKey) => {
    setCart(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const updateCartQty = (itemKey, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.itemKey === itemKey) {
          const nextQty = Math.max(1, item.quantity + delta);
          return {
            ...item,
            quantity: nextQty,
            totalPrice: nextQty * item.unitPrice,
          };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Dynamic Wholesale / Bundling Calculation (PRD 4.2)
  const bundlingCalculation = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

    let discountPercent = 0;
    let label = '';
    let nextThreshold = null;

    if (storeConfig?.bundling_rules) {
      const sortedRules = [...storeConfig.bundling_rules].sort((a, b) => b.min_qty - a.min_qty);
      const activeRule = sortedRules.find(r => totalItems >= r.min_qty);
      if (activeRule) {
        discountPercent = activeRule.discount_percent;
        label = activeRule.label;
      }

      // Check next threshold
      const nextRule = [...storeConfig.bundling_rules]
        .sort((a, b) => a.min_qty - b.min_qty)
        .find(r => totalItems < r.min_qty);

      if (nextRule) {
        nextThreshold = {
          itemsNeeded: nextRule.min_qty - totalItems,
          nextDiscount: nextRule.discount_percent,
        };
      }
    }

    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const finalTotal = Math.max(0, subtotal - discountAmount);

    return {
      totalItems,
      subtotal,
      discountPercent,
      discountAmount,
      label,
      nextThreshold,
      finalTotal,
    };
  }, [cart, storeConfig]);

  // Smart WhatsApp Order Router with Round-Robin & Unique #ORD ID (PRD 4.3)
  const triggerWhatsAppOrder = (customerData) => {
    if (!storeConfig?.whatsapp_routers?.length) return;

    // Generate Unique generic Order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ATLR-${new Date().getFullYear()}-${randomSuffix}`;

    // Round-robin router across numbers
    const lastRouterIndex = parseInt(localStorage.getItem('atelier_last_router_index') || '0', 10);
    const nextRouterIndex = (lastRouterIndex + 1) % storeConfig.whatsapp_routers.length;
    localStorage.setItem('atelier_last_router_index', nextRouterIndex.toString());
    const assignedRouter = storeConfig.whatsapp_routers[nextRouterIndex];

    // Format currency helper
    const formatIDR = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

    // Build itemized message
    let itemsText = '';
    cart.forEach((item, index) => {
      itemsText += `\n${index + 1}. *${item.title}*`;
      if (item.variants && item.variants.length > 0) {
        const variantDetails = item.variants.map(v => `${v.group}: ${v.name}`).join(' | ');
        itemsText += `\n   Pilihan: ${variantDetails}`;
      }
      itemsText += `\n   Jumlah: ${item.quantity} pcs @ ${formatIDR(item.unitPrice)} = ${formatIDR(item.totalPrice)}`;
    });

    const isStoreOpenText = isStoreOpen 
      ? 'Galeri Buka (Siap Proses Pengiriman)' 
      : 'Di Luar Jam Galeri (Pesanan Tercatat untuk Prioritas Pagi)';

    const message = 
`KONFIRMASI PESANAN ATELIER NOIR & CO.
ID Pesanan: #${orderId}
Status Galeri: ${isStoreOpenText}
Tanggal: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}

RINCIAN BUSANA:${itemsText}

RINGKASAN INVESTASI:
Subtotal: ${formatIDR(bundlingCalculation.subtotal)}
Potongan Hak Istimewa Bundling (${bundlingCalculation.discountPercent}%): -${formatIDR(bundlingCalculation.discountAmount)}
TOTAL AKHIR: ${formatIDR(bundlingCalculation.finalTotal)}

DATA KLIEN PEMESAN:
Nama: ${customerData.name || '-'}
WhatsApp: ${customerData.phone || '-'}
Kota / Alamat Pengiriman: ${customerData.address || customerData.city || '-'}
Catatan Khusus / Permintaan Ukuran: ${customerData.notes || 'Tidak ada'}

Pesanan ini dibuat melalui Katalog Digital Universal UMKM Jamstack. Mohon konfirmasi kesiapan pengiriman dan instruksi penyelesaian. Terima kasih.`;

    const encodedText = encodeURIComponent(message);
    const waUrl = `https://wa.me/${assignedRouter.phone}?text=${encodedText}`;

    // Award loyalty points (PRD 4.1 Gamification)
    const earnedPoints = Math.floor(bundlingCalculation.finalTotal / 100000) * 10;
    setLoyaltyPoints(prev => prev + earnedPoints);

    // Mark checked out
    sessionStorage.setItem('atelier_just_checked_out', 'true');
    setHasAbandonedCart(false);

    // Open WhatsApp
    window.open(waUrl, '_blank');
  };

  // Open Product Modal
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setActiveModal('product_detail');
  };

  // Close any modal
  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <StoreContext.Provider
      value={{
        storeConfig,
        catalog,
        loading,
        lang,
        setLang,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        bundlingCalculation,
        loyaltyPoints,
        isStoreOpen,
        hasAbandonedCart,
        setHasAbandonedCart,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSize,
        setSelectedSize,
        sortBy,
        setSortBy,
        inStockOnly,
        setInStockOnly,
        maxPriceFilter,
        setMaxPriceFilter,
        filteredCatalog,
        activeModal,
        setActiveModal,
        selectedProduct,
        openProductDetail,
        closeModal,
        triggerWhatsAppOrder,
        setCatalog,
        setStoreConfig,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

