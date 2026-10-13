import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Star,
  Image as ImageIcon,
  SlidersHorizontal
} from 'lucide-react';

export const ProductsManager = ({ catalog, setCatalog }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');

  // Form state for adding new product
  const [newProduct, setNewProduct] = useState({
    id: `ATLR-NEW-${Math.floor(10 + Math.random() * 90)}`,
    title: '',
    subtitle: 'Koleksi Tailoring Eksklusif 2026',
    category: 'Outerwear & Jas',
    base_price: 950000,
    stock_status: 'in_stock',
    stock_count: 10,
    rating: 5.0,
    reviews_count: 1,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    description: '',
    composition: '100% Benang Tenun Kapas Alami & Furing Katun.',
    care_instructions: 'Dry clean only atau cuci tangan lembut.',
    is_featured: false,
    is_lookbook: true,
  });

  const formatIDR = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);

  const categories = ['all', 'Outerwear & Jas', 'Kemeja & Atasan', 'Bawahan & Celana', 'Gaun & Setelan'];

  const filteredCatalog = catalog.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditPrice(item.base_price.toString());
    setEditStock(item.stock_count?.toString() || '10');
  };

  const handleSaveEdit = (itemId) => {
    setCatalog(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const parsedPrice = parseInt(editPrice, 10) || item.base_price;
          const parsedStock = parseInt(editStock, 10) || item.stock_count;
          let nextStatus = item.stock_status;
          if (parsedStock <= 0) nextStatus = 'pre_order';
          else if (parsedStock <= 3) nextStatus = 'low_stock';
          else nextStatus = 'in_stock';

          return {
            ...item,
            base_price: parsedPrice,
            stock_count: parsedStock,
            stock_status: nextStatus,
          };
        }
        return item;
      })
    );
    setEditingId(null);
  };

  const handleDelete = (itemId) => {
    if (confirm('Apakah Anda yakin ingin menghapus karya busana ini dari katalog?')) {
      setCatalog(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.title.trim()) return;

    setCatalog(prev => [
      {
        ...newProduct,
        base_price: parseInt(newProduct.base_price, 10) || 850000,
        stock_count: parseInt(newProduct.stock_count, 10) || 5,
        variants: [
          {
            group: 'Ukuran',
            name: 'size',
            options: [
              { name: 'S', code: 'S', price_add: 0 },
              { name: 'M', code: 'M', price_add: 0 },
              { name: 'L', code: 'L', price_add: 0 },
              { name: 'XL', code: 'XL', price_add: 50000 }
            ]
          }
        ]
      },
      ...prev
    ]);

    setIsAddModalOpen(false);
    // Reset form
    setNewProduct({
      id: `ATLR-NEW-${Math.floor(10 + Math.random() * 90)}`,
      title: '',
      subtitle: 'Koleksi Tailoring Eksklusif 2026',
      category: 'Outerwear & Jas',
      base_price: 950000,
      stock_status: 'in_stock',
      stock_count: 10,
      rating: 5.0,
      reviews_count: 1,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      description: '',
      composition: '100% Benang Tenun Kapas Alami & Furing Katun.',
      care_instructions: 'Dry clean only atau cuci tangan lembut.',
      is_featured: false,
      is_lookbook: true,
    });
  };

  return (
    <div className="space-y-6 font-sans-editorial">
      
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-border">
        <div>
          <span className="text-[10px] font-semibold tracking-ultra uppercase text-champagne-dark block mb-1">
            Inventarisasi Busana Bermerk
          </span>
          <h3 className="font-serif-fashion text-2xl font-medium text-noir">
            Manajemen Katalog &amp; Stok Galeri
          </h3>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-noir text-ivory px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-noir-light transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-champagne" />
          <span>Tambah Karya Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-ivory-border p-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 border uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-noir text-ivory border-noir font-semibold'
                  : 'bg-white text-noir border-ivory-border hover:border-champagne'
              }`}
            >
              {cat === 'all' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-64">
          <input
            type="text"
            placeholder="Cari nama karya atau ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-ivory border border-ivory-border pl-8 pr-3 py-1.5 outline-none font-sans-editorial text-noir focus:border-champagne"
          />
          <Search className="w-3.5 h-3.5 text-noir-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white border border-ivory-border overflow-x-auto shadow-sm">
        <table className="w-full text-xs text-left">
          <thead className="bg-ivory border-b border-ivory-border uppercase tracking-wider text-[11px] text-noir">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Karya Busana</th>
              <th className="py-3.5 px-4 font-semibold">Kategori</th>
              <th className="py-3.5 px-4 font-semibold">Harga Investasi</th>
              <th className="py-3.5 px-4 font-semibold">Sisa Stok</th>
              <th className="py-3.5 px-4 font-semibold">Status Ketersediaan</th>
              <th className="py-3.5 px-4 font-semibold text-right">Kelola</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ivory-border">
            {filteredCatalog.map((item) => {
              const isEditing = editingId === item.id;

              return (
                <tr key={item.id} className="hover:bg-ivory/50 transition-colors">
                  
                  {/* Thumbnail & Title */}
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-16 object-cover border border-ivory-border bg-ivory shrink-0"
                    />
                    <div>
                      <span className="font-mono text-[10px] text-champagne-dark block">
                        {item.id}
                      </span>
                      <span className="font-serif-fashion font-medium text-sm text-noir block">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-noir-muted">
                        Rating: {item.rating} ({item.reviews_count} ulasan)
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 text-noir-muted uppercase text-[11px]">
                    {item.category}
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-28 text-xs bg-white border border-champagne px-2 py-1 outline-none font-mono"
                      />
                    ) : (
                      <span className="font-semibold text-noir">
                        {formatIDR(item.base_price)}
                      </span>
                    )}
                  </td>

                  {/* Stock Count */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editStock}
                        onChange={(e) => setEditStock(e.target.value)}
                        className="w-16 text-xs bg-white border border-champagne px-2 py-1 outline-none font-mono"
                      />
                    ) : (
                      <span className="font-mono text-noir">
                        {item.stock_count || 10} potong
                      </span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 border ${
                        item.stock_status === 'in_stock'
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                          : item.stock_status === 'low_stock'
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                      }`}
                    >
                      {item.stock_status === 'in_stock'
                        ? 'Tersedia'
                        : item.stock_status === 'low_stock'
                        ? 'Stok Terbatas'
                        : 'Pre-Order'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-right space-x-2">
                    {isEditing ? (
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        className="p-1.5 bg-emerald-700 text-white hover:bg-emerald-800 transition-colors inline-block"
                        title="Simpan Perubahan"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="p-1.5 bg-ivory text-noir hover:bg-noir hover:text-ivory border border-ivory-border transition-colors inline-block"
                        title="Edit Cepat Harga & Stok"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 bg-ivory text-noir-muted hover:bg-red-700 hover:text-white border border-ivory-border transition-colors inline-block"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-ivory-border max-w-2xl w-full p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-noir hover:text-champagne transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-ultra font-semibold text-champagne-dark block mb-1">
              Kurasi Master
            </span>
            <h3 className="font-serif-fashion text-2xl font-medium text-noir mb-4">
              Tambah Karya Busana Baru
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-noir-muted uppercase mb-1">
                    ID / Kode Busana
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.id}
                    onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                    className="w-full bg-ivory border border-ivory-border px-3 py-2 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-noir-muted uppercase mb-1">
                    Kategori Lini
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-white border border-ivory-border px-3 py-2 outline-none cursor-pointer"
                  >
                    <option value="Outerwear & Jas">Outerwear & Jas</option>
                    <option value="Kemeja & Atasan">Kemeja & Atasan</option>
                    <option value="Bawahan & Celana">Bawahan & Celana</option>
                    <option value="Gaun & Setelan">Gaun & Setelan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-noir-muted uppercase mb-1">
                  Nama Karya Busana *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tenun Sumba Oversized Kimono Coat"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  className="w-full bg-white border border-ivory-border px-3 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-noir-muted uppercase mb-1">
                    Harga Investasi Dasar (IDR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.base_price}
                    onChange={(e) => setNewProduct({ ...newProduct, base_price: e.target.value })}
                    className="w-full bg-white border border-ivory-border px-3 py-2 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-noir-muted uppercase mb-1">
                    Jumlah Stok Siap Kirim
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock_count}
                    onChange={(e) => setNewProduct({ ...newProduct, stock_count: e.target.value })}
                    className="w-full bg-white border border-ivory-border px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-noir-muted uppercase mb-1">
                  URL Foto Busana Editorial (Resolusi Tinggi)
                </label>
                <input
                  type="url"
                  required
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full bg-white border border-ivory-border px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-noir-muted uppercase mb-1">
                  Deskripsi Narasi Busana
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Cerita kurasi, teknik penenunan, dan siluet rancangan..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full bg-white border border-ivory-border px-3 py-2 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-noir-muted uppercase mb-1">
                    Komposisi Bahan
                  </label>
                  <input
                    type="text"
                    value={newProduct.composition}
                    onChange={(e) => setNewProduct({ ...newProduct, composition: e.target.value })}
                    className="w-full bg-white border border-ivory-border px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-noir-muted uppercase mb-1">
                    Petunjuk Perawatan
                  </label>
                  <input
                    type="text"
                    value={newProduct.care_instructions}
                    onChange={(e) => setNewProduct({ ...newProduct, care_instructions: e.target.value })}
                    className="w-full bg-white border border-ivory-border px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-ivory-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-ivory-border text-noir hover:bg-ivory"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-noir text-ivory uppercase tracking-wider font-semibold hover:bg-noir-light"
                >
                  Simpan ke Katalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

