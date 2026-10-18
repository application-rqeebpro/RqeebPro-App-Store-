import React, { useState } from 'react';
import { Home, Search, ShoppingBag, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { LogoWithHoldTrigger } from './LogoWithHoldTrigger';
import { TRANSLATIONS } from '../data/appsData';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  lang: 'ar' | 'en';
  setLang: (l: 'ar' | 'en') => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenCustomAppModal: () => void;
  onTriggerOwnerAuth: () => void;
  onOpenOwnerDashboard: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  activeNav,
  setActiveNav,
  onOpenSearch,
  onOpenCart,
  onOpenCustomAppModal,
  onTriggerOwnerAuth,
  onOpenOwnerDashboard,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOwnerLoggedIn } = useStore();
  const t = TRANSLATIONS[lang];

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'apps', label: t.navApps },
    { id: 'games', label: t.navGames },
    { id: 'edu', label: t.navEdu },
    { id: 'utils', label: t.navUtils },
    { id: 'custom', label: t.navCustom, isSpecial: true },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'custom') {
      onOpenCustomAppModal();
    } else if (id === 'contact') {
      const el = document.getElementById('contact-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open('https://wa.me/967785502919', '_blank');
      }
    } else {
      setActiveNav(id);
      if (id !== 'home') {
        const storeEl = document.getElementById('store-section');
        if (storeEl) {
          storeEl.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Curved Dark Blue Navigation Bar like the uploaded image */}
      <div className="bg-gradient-to-r from-[#021333] via-[#05265e] to-[#011438] text-white shadow-xl border-b border-cyan-500/20 rounded-b-2xl sm:rounded-b-3xl mx-auto max-w-[1720px] px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          {/* Brand Logo with 20-second hold detection for Owner Auth */}
          <div className="shrink-0">
            <LogoWithHoldTrigger
              size="sm"
              showText={true}
              onTriggerAuth={onTriggerOwnerAuth}
              onClickStandard={() => handleNavClick('home')}
            />
          </div>

          {/* Desktop Navigation Links (RTL Arabic order in center) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              const Icon = item.icon;

              if (item.id === 'custom') {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold rounded-xl text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-colors border border-cyan-400/30"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-lg ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
                  <span>{item.label}</span>

                  {/* Active cyan highlight bar like in the image */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Language Toggle, Search, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* If Owner is Logged In: Show Owner Control Panel Shortcut */}
            {isOwnerLoggedIn && (
              <button
                onClick={onOpenOwnerDashboard}
                className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-xs font-bold shadow-md hover:scale-105 transition-all"
                title="لوحة المالك"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">لوحة المالك</span>
              </button>
            )}

            {/* Language Switcher Pill: AR / EN */}
            <div className="flex items-center bg-[#00173d] p-0.5 rounded-full border border-blue-400/30 text-xs font-semibold">
              <button
                onClick={() => setLang('ar')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'ar'
                    ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.7)] font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                AR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.7)] font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* Search Trigger Icon */}
            <button
              onClick={onOpenSearch}
              title={t.searchTitle}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
            >
              <Search className="w-5 h-5 text-cyan-300" />
            </button>

            {/* Shopping / Download Bag Icon */}
            <button
              onClick={onOpenCart}
              title={t.installedCount}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-700/60 pb-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-right ${
                  activeNav === item.id
                    ? 'bg-blue-600/30 text-cyan-300 font-bold border-r-2 border-cyan-400'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'custom' && (
                  <span className="text-[11px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-400/40">
                    جديد
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
