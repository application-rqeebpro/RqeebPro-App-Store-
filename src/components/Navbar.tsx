import React, { useState } from 'react';
import {
  Home,
  Search,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Gamepad2,
  GraduationCap,
  Briefcase,
  Phone,
  Sparkles,
  Layers,
  ChevronLeft,
  Download,
  Truck,
} from 'lucide-react';
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
  onOpenOrderTracker: () => void;
  onOpenCustomAppModal: () => void;
  onOpenInstallModal: () => void;
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
  onOpenOrderTracker,
  onOpenCustomAppModal,
  onOpenInstallModal,
  onTriggerOwnerAuth,
  onOpenOwnerDashboard,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOwnerLoggedIn, settings } = useStore();
  const t = TRANSLATIONS[lang];

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'apps', label: t.navApps, icon: Layers },
    { id: 'games', label: t.navGames, icon: Gamepad2 },
    { id: 'edu', label: t.navEdu, icon: GraduationCap },
    { id: 'utils', label: t.navUtils, icon: Briefcase },
    { id: 'custom', label: t.navCustom, icon: Sparkles, isSpecial: true },
    { id: 'contact', label: t.navContact, icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'custom') {
      onOpenCustomAppModal();
    } else if (id === 'contact') {
      const el = document.getElementById('contact-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(`https://wa.me/967${settings.whatsappNumber}`, '_blank');
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
      {/* Curved Dark Blue Navigation Bar */}
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

                  {/* Active cyan highlight bar */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons: Uncluttered and spacious */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Direct Download Store App Button */}
            <button
              onClick={onOpenInstallModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl text-xs font-extrabold shadow-md hover:scale-105 transition-all border border-cyan-300/30"
              title="تحميل تطبيق المتجر على الهاتف"
            >
              <Download className="w-3.5 h-3.5 text-cyan-200 animate-bounce" />
              <span className="hidden sm:inline">تحميل المتجر</span>
            </button>

            {/* If Owner is Logged In: Show Owner Control Panel Shortcut */}
            {isOwnerLoggedIn && (
              <button
                onClick={onOpenOwnerDashboard}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-all"
                title="لوحة المالك"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">لوحة المالك</span>
              </button>
            )}

            {/* Language Switcher Pill (Desktop) */}
            <div className="hidden sm:flex items-center bg-[#00173d] p-0.5 rounded-full border border-blue-400/30 text-xs font-semibold">
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

            {/* Order Tracking Button (Desktop) */}
            <button
              onClick={onOpenOrderTracker}
              title="تتبع حالة الطلب والشحن"
              className="hidden sm:flex p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
            >
              <Truck className="w-5 h-5 text-cyan-300" />
            </button>

            {/* Shopping / Download Bag Icon (Desktop) */}
            <button
              onClick={onOpenCart}
              title={t.installedCount}
              className="hidden sm:flex p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-cyan-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-cyan-400/30"
              aria-label="افتح القائمة الجانبية"
              title="القائمة"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-Over Mobile Side Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex font-['Cairo',sans-serif]">
          {/* Dark Blur Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#020d24]/80 backdrop-blur-md animate-fade-in"
          />

          {/* Slide-out Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-gradient-to-b from-[#021333] via-[#05265e] to-[#011438] text-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto border-l border-cyan-500/30 z-10 animate-scale-up">
            <div>
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <LogoWithHoldTrigger
                  size="sm"
                  showText={true}
                  onTriggerAuth={() => {
                    setMobileMenuOpen(false);
                    onTriggerOwnerAuth();
                  }}
                  onClickStandard={() => {
                    setMobileMenuOpen(false);
                    handleNavClick('home');
                  }}
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items List */}
              <div className="space-y-1.5">
                <p className="text-[11px] text-cyan-300 font-bold px-2 mb-2 uppercase tracking-wider">
                  القائمة الجانبية للتصفح
                </p>

                {navItems.map((item) => {
                  const isActive = activeNav === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-right ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 border border-cyan-400/40'
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-white/5 text-cyan-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-['Cairo'] text-sm">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {item.id === 'custom' && (
                          <span className="text-[10px] bg-cyan-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                            جديد
                          </span>
                        )}
                        <ChevronLeft className="w-4 h-4 text-slate-400 opacity-60" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              {/* Download Store App Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInstallModal();
                }}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all border border-cyan-300/40"
              >
                <Download className="w-4 h-4 animate-bounce text-cyan-200" />
                <span>تحميل متجر رقيب برو على الهاتف</span>
              </button>

              {/* Track Orders Link */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderTracker();
                }}
                className="w-full py-2.5 px-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all border border-cyan-300/30"
              >
                <Truck className="w-4 h-4 text-cyan-200" />
                <span>تتبع حالة طلبك والشحنة 🚚</span>
              </button>

              {/* WhatsApp Quick Link */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.open(`https://wa.me/967${settings.whatsappNumber}`, '_blank');
                }}
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>تواصل معنا عبر واتساب</span>
              </button>

              {/* Owner Panel Shortcut */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isOwnerLoggedIn) {
                    onOpenOwnerDashboard();
                  } else {
                    onTriggerOwnerAuth();
                  }
                }}
                className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-cyan-300 rounded-xl text-[11px] font-semibold border border-cyan-400/20 flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isOwnerLoggedIn ? 'فتح لوحة تحكم المالك' : 'دخول المالك (20 ثانية)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

