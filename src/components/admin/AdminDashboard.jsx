import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AnalyticsOverview } from './AnalyticsOverview';
import { OrdersCRM } from './OrdersCRM';
import { ProductsManager } from './ProductsManager';
import { ClientsCRM } from './ClientsCRM';
import { StoreSettings } from './StoreSettings';
import { initialOrders, initialClients } from '../../data/crmMockData';
import { 
  BarChart3, 
  ShoppingBag, 
  Layers, 
  Users, 
  Settings, 
  ArrowLeft, 
  ShieldCheck, 
  ExternalLink,
  Clock
} from 'lucide-react';

export const AdminDashboard = ({ onExitAdmin }) => {
  const { catalog, setCatalog, storeConfig, setStoreConfig } = useStore();
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'orders' | 'products' | 'clients' | 'settings'

  // CRM State
  const [orders, setOrders] = useState(initialOrders);
  const [clients, setClients] = useState(initialClients);

  const tabs = [
    { id: 'analytics', label: 'Analitik & Grafik', icon: BarChart3 },
    { id: 'orders', label: 'Pesanan & Concierge', icon: ShoppingBag, badge: orders.filter(o => o.status === 'Menunggu Respon').length },
    { id: 'products', label: 'Inventaris Katalog', icon: Layers, badge: catalog.length },
    { id: 'clients', label: 'CRM Klien VIP', icon: Users, badge: clients.length },
    { id: 'settings', label: 'Pengaturan Galeri', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-ivory text-noir font-sans-editorial flex flex-col">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-noir text-ivory border-b border-noir-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Brand & Mode Indicator */}
          <div className="flex items-center gap-4">
            <button
              onClick={onExitAdmin}
              className="text-ivory/70 hover:text-champagne transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider py-1 border-r border-noir-border pr-4"
              title="Kembali ke Tampilan Katalog Publik"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ke Toko</span>
            </button>

            <div>
              <span className="font-serif-fashion text-lg md:text-xl font-semibold tracking-wider block leading-tight">
                ATELIER NOIR &amp; CO.
              </span>
              <span className="text-[9px] uppercase tracking-ultra text-champagne-light block">
                Executive Concierge CRM &bull; Atelier Portal
              </span>
            </div>
          </div>

          {/* User & Live Time */}
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-2 text-ivory/70">
              <Clock className="w-3.5 h-3.5 text-champagne" />
              <span className="font-mono text-[11px]">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            <div className="bg-noir-light border border-noir-border px-3 py-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-medium text-ivory">Director Concierge</span>
            </div>
          </div>

        </div>

        {/* Tab Navigation Menu */}
        <div className="bg-noir-light border-t border-noir-border px-4 md:px-8 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-champagne text-white bg-noir/50'
                      : 'border-transparent text-ivory/60 hover:text-ivory hover:border-ivory/30'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-champagne' : 'text-ivory/60'}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-none font-mono ${
                      isActive ? 'bg-champagne text-noir font-bold' : 'bg-noir-border text-ivory/70'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Admin View Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        {activeTab === 'analytics' && (
          <AnalyticsOverview orders={orders} clients={clients} catalog={catalog} />
        )}
        {activeTab === 'orders' && (
          <OrdersCRM orders={orders} setOrders={setOrders} />
        )}
        {activeTab === 'products' && (
          <ProductsManager catalog={catalog} setCatalog={setCatalog} />
        )}
        {activeTab === 'clients' && (
          <ClientsCRM clients={clients} setClients={setClients} />
        )}
        {activeTab === 'settings' && (
          <StoreSettings storeConfig={storeConfig} setStoreConfig={setStoreConfig} />
        )}
      </main>

      {/* Admin Minimal Footer */}
      <footer className="border-t border-ivory-border bg-white py-4 px-4 md:px-8 text-xs text-noir-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Atelier Noir &amp; Co. CRM Platform &bull; Universal Jamstack Architecture
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={onExitAdmin}
              className="hover:text-noir underline transition-colors"
            >
              Lihat Tampilan Toko Publik
            </button>
            <span>&bull;</span>
            <span className="font-mono text-[11px]">Enkripsi Data Klien Aman</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

