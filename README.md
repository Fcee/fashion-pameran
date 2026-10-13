# ATELIER NOIR & CO. — Katalog Digital UMKM Fashion Pro

Platform katalog digital e-commerce mandiri berbasis arsitektur **Jamstack Universal (PRD 3.0 Enterprise-Level Static Architecture)** khusus untuk UMKM busana dan pakaian bermerk (*curated haute fashion*).

---

## 1. Filosofi Desain & Ketentuan Proyek

* **3 Warna Dasar Elegan:**
  * **Noir Onyx (`#141413`):** Mewakili kemewahan abadi, ketegasan garis siluet, tipografi berkontras tinggi, dan tombol primer.
  * **Ivory Alabaster (`#F7F4EE`):** Mewakili kanvas museum/galeri butik yang hangat, bersih, dan berkelas (*negative space*).
  * **Champagne Sand (`#B89563`):** Mewakili aksen eksklusif, lencana prestise, penanda status stok, dan sorotan kurasi.
* **Tipografi Mode Editorial:**
  * **Headings / Display:** *Playfair Display* (Serif editorial berkelas dengan proporsi haute couture).
  * **Body / Interface:** *Plus Jakarta Sans* (Sans-serif berdaya baca tinggi dengan spasi tracking lapang khas majalah mode).
* **Nol Emoji (Zero Emoji):** Seluruh elemen visual menggunakan ikon vektor minimalis (*Lucide Icons*), tanpa emoji apa pun.
* **Bebas Kesan AI-Generated:** Menggunakan narasi kurasi otentik pengrajin tenun Indonesia (Jepara, Pekalongan, Yogyakarta, Baduy), detail bahan nyata (*Belgian Linen*, *Sutera ATBM*, *Worsted Wool 120s*), panduan ukuran sartorial dalam centimeter, dan format pemesanan WhatsApp profesional.

---

## 2. Fitur Unggulan Sesuai Master PRD

### 2.1 Hyper-Personalization & PWA (PRD 4.1)
* **PWA & Offline Capability:** Terintegrasi dengan `manifest.json` dan Service Worker (`sw.js`) untuk caching aset statis dan katalog.
* **Dynamic Theming System:** Seluruh konfigurasi toko, jam operasional, dan nomor WhatsApp dikendalikan via file konfigurasi statis `public/data/store_config.json`.
* **Multi-Language (i18n):** Pergantian dwibahasa instan antara Bahasa Indonesia (ID) dan Bahasa Inggris (EN) yang tersimpan di `localStorage`.
* **Loyalty Points (Atelier Privilege Club):** Sistem poin penghargaan lokal tersimpan di browser pelanggan setiap kali menyelesaikan pemesanan via WhatsApp, dengan 3 jenjang keanggotaan (*Classic Client*, *Gold Patron*, *Noir Private Member*).

### 2.2 Advanced Product Engine (PRD 4.2)
* **Complex Variant Matrix:** Mendukung pemilihan ukuran (S, M, L, XL), pilihan kerah/lapisan, dan personalisasi tambahan (bordir inisial monogram / kotak kayu koleksi) dengan penambahan harga dinamis seketika.
* **Dynamic Wholesale / Bundling:** Kalkulasi diskon *client-side* otomatis:
  * Pembelian 2 busana: Diskon 10% (*Curated Pair*).
  * Pembelian 3+ busana: Diskon 15% (*Capsule Wardrobe*).
  * Dilengkapi bilah progres interaktif pada laci tas belanja.
* **Smart Availability (Status Jam Galeri):** Pengecekan waktu lokal klien terhadap jam operasional (08:30 - 21:30 WIB) untuk menampilkan status buka langsung atau peralihan otomatis ke layanan *Pre-Order*.
* **Faceted Search & Filter:** Mesin pencari teks penuh dan fuzzy menggunakan *Fuse.js*, disertai filter kategori, ukuran, status ketersediaan stok, dan pengurutan harga/rating.

### 2.3 Advanced Checkout & Omnichannel Integration (PRD 4.3)
* **Smart WhatsApp Order Router:**
  * Format rincian pesanan berstandar faktur resmi dengan ID Pesanan unik (contoh: `#ATLR-2026-7842`).
  * *Round-Robin Router:* Mengalirkan kontak WhatsApp secara bergantian ke daftar nomor admin kurator yang ditentukan di `store_config.json`.
* **Geotagging Otomatis:** Fitur tombol "Deteksi Lokasi Otomatis" menggunakan API Geolocation peramban + *Reverse Geocoding* untuk mengisi otomatis kota dan alamat tujuan pengiriman klien.
* **Abandonment Cart Recovery:** Mendeteksi tas belanja yang belum diselesaikan dari sesi sebelumnya dan memunculkan bilah pengingat elegan saat kembali membuka katalog.

### 2.4 Headless CMS Ready (PRD Fase 2)
* Konfigurasi **Decap CMS** tersemat di `public/admin/config.yml` dan `public/admin/index.html` untuk mempermudah pemilik UMKM mengelola data tanpa menyentuh kode program.

### 2.5 Admin CRM & Executive Analytics Portal
* **Dashboard Analitik Interaktif:**
  * **Grafik Area Tren Omzet & Pesanan:** Grafik kurva SVG interaktif dengan tooltip bulanan dan pemilihan metrik (Omzet IDR vs Volume Pesanan).
  * **Bagan Batang Distribusi Lini Busana:** Pangsa pendapatan per kategori busana (*Outerwear & Jas*, *Gaun & Setelan*, *Kemeja & Atasan*, *Bawahan & Celana*).
  * **Bagan Cincin (*Donut Ring*) Konversi Saluran:** Tingkat keberhasilan transaksi Concierge WhatsApp (68.2% *closing rate*).
* **Pipeline Pesanan Concierge WhatsApp:** Filter status saluran (*Menunggu Respon*, *Proses Fitting*, *Siap Kirim*, *Selesai*), rincian faktur pesanan, serta tautan aksi langsung ke WhatsApp pelanggan.
* **Manajemen Inventaris Busana:** Pengeditan cepat (*inline edit*) harga dasar dan sisa stok fisik, serta modal penambahan busana baru lengkap dengan rincian material & narasi kurasi.
* **Direktori Klien VIP & CRM Privilege Club:** Daftar klien kehormatan dengan histori akumulasi belanja, saldo poin kehormatan, jenjang keanggotaan, dan catatan rahasia *fitting*.
* **Pengaturan Galeri UMKM:** Pengaturan jam buka/tutup dinamis, pembagian nomor WhatsApp (*round-robin*), dan persentase diskon *bundling*.
* **Akses Mudah:** Cukup klik tautan **"Admin CRM"** di bagian atas (*header*) atau bawah (*footer*), atau akses langsung via hash `#admin` di URL peramban.

---

## 3. Cara Menjalankan Proyek

### Mode Pengembangan (Development)
```bash
npm run dev
```
Akses di peramban: `http://localhost:3000`

### Mode Produksi & Build Statis (GitHub Pages Ready)
```bash
npm run build
```
Hasil build siap diunggah langsung ke GitHub Pages atau hosting statis apa pun di folder `dist/`.

### Preview Build
```bash
npm run preview
```

---

## 4. Struktur Direktori

```
umkm-fashion-pameran/
├── dist/                          # Hasil build statis siap deploy
├── public/
│   ├── admin/
│   │   ├── config.yml             # Skema Decap CMS
│   │   └── index.html             # Pintu masuk portal admin CMS
│   ├── data/
│   │   ├── catalog.json           # Data katalog busana bermerk
│   │   └── store_config.json      # Konfigurasi toko, jam kerja, router WA
│   ├── manifest.json              # Web App Manifest PWA
│   └── sw.js                      # Service Worker caching offline
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx         # Laci belanja, diskon bertingkat, geotagging, WA router
│   │   ├── CatalogFilter.jsx      # Filter kategori, ukuran, sort, dan status stok
│   │   ├── Footer.jsx             # Footer editorial, info galeri, link admin
│   │   ├── Header.jsx             # Top bar, status galeri, i18n, keranjang
│   │   ├── Hero.jsx               # Banner lookbook editorial haute couture
│   │   ├── LookbookShowcase.jsx   # Dokumentasi siluet busana terpilih
│   │   ├── LoyaltyModal.jsx       # Modal poin privilege & jenjang keanggotaan
│   │   ├── ProductCard.jsx        # Kartu produk dengan rasio 3:4 dan quick view
│   │   ├── ProductDetailModal.jsx # Detail varian bersarang & penyesuaian harga live
│   │   ├── ProductGrid.jsx        # Grid responsif katalog
│   │   ├── SizeGuideModal.jsx     # Bagan ukuran busana sartorial (cm)
│   │   └── StoreStatusBanner.jsx  # Notifikasi status buka & keranjang tertinggal
│   ├── context/
│   │   └── StoreContext.jsx       # State management terpusat & integrasi Fuse.js
│   ├── data/
│   │   └── translations.js        # Kamus dwibahasa (ID / EN)
│   ├── App.jsx                    # Komponen induk
│   ├── index.css                  # Konfigurasi Tailwind & scrollbar kustom
│   └── main.jsx                   # Entry point aplikasi
├── index.html                     # HTML utama dengan Google Fonts & SEO OpenGraph
├── package.json
├── postcss.config.js
├── tailwind.config.js             # Definisi 3 warna dasar & tipografi
└── vite.config.js
```

