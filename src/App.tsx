import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  Smartphone,
  ChevronDown,
  ArrowLeft,
  CheckCircle,
  Megaphone,
  X,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { LogoWithHoldTrigger } from './components/LogoWithHoldTrigger';
import { FeaturesStrip } from './components/FeaturesStrip';
import { PhoneMockup } from './components/PhoneMockup';
import { SideDisplayCard } from './components/SideDisplayCard';
import { ContactFooter } from './components/ContactFooter';
import { StoreCatalog } from './components/StoreCatalog';
import { AppDetailModal } from './components/AppDetailModal';
import { CustomAppModal } from './components/CustomAppModal';
import { SearchModal } from './components/SearchModal';
import { DownloadsDrawer } from './components/DownloadsDrawer';
import { OwnerAuthModal } from './components/OwnerAuthModal';
import { OwnerDashboard } from './components/OwnerDashboard';
import { AndroidApp, TRANSLATIONS } from './data/appsData';

function StoreMain() {
  const {
    apps,
    settings,
    downloadedApps,
    addToDownloads,
    removeFromDownloads,
    isOwnerLoggedIn,
  } = useStore();

  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeNav, setActiveNav] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedApp, setSelectedApp] = useState<AndroidApp | null>(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomAppOpen, setIsCustomAppOpen] = useState(false);

  // Owner Auth & Dashboard state
  const [isOwnerAuthOpen, setIsOwnerAuthOpen] = useState(false);
  const [isOwnerDashboardOpen, setIsOwnerDashboardOpen] = useState(false);

  // Announcement banner dismiss state
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const t = TRANSLATIONS[lang];

  // Update HTML dir and lang
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const storeEl = document.getElementById('store-section');
    if (storeEl) {
      storeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAppSelectById = (appId: string) => {
    const found = apps.find((a) => a.id === appId);
    if (found) {
      setSelectedApp(found);
    }
  };

  const handleTriggerOwnerAuth = () => {
    if (isOwnerLoggedIn) {
      setIsOwnerDashboardOpen(true);
    } else {
      setIsOwnerAuthOpen(true);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#edf3fa] text-slate-800 antialiased font-['Cairo',sans-serif] selection:bg-blue-600 selection:text-white flex flex-col relative overflow-x-hidden ${
        lang === 'ar' ? 'text-right' : 'text-left'
      }`}
    >
      {/* Announcement Bar (Configurable from Owner Dashboard) */}
      {settings.announcementActive && settings.announcementText && !announcementDismissed && (
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-700 text-white text-xs py-2 px-4 shadow-md flex items-center justify-between z-40 relative">
          <div className="max-w-[1720px] mx-auto w-full flex items-center justify-center gap-2 font-semibold">
            <Megaphone className="w-4 h-4 text-cyan-300 shrink-0 animate-bounce" />
            <span className="truncate">{settings.announcementText}</span>
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0 text-white"
            title="إغلاق التنبيه"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Ambient background curves & neon gradients matching the original image */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Upper right cyan ambient flare */}
        <div className="absolute -top-32 -right-32 w-[650px] h-[650px] bg-gradient-to-br from-cyan-400/25 via-blue-500/15 to-transparent rounded-full blur-3xl" />
        {/* Center blue soft glow */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
        {/* Bottom soft gradient */}
        <div className="absolute -bottom-40 left-0 w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-3xl" />
      </div>

      {/* 1. Curved Dark Blue Navbar (Exact Match to Header in Image) */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomAppModal={() => setIsCustomAppOpen(true)}
        onTriggerOwnerAuth={handleTriggerOwnerAuth}
        onOpenOwnerDashboard={() => setIsOwnerDashboardOpen(true)}
        cartCount={downloadedApps.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 relative z-10 space-y-8">
        {/* HERO SECTION - REPLICATING THE ATTACHED IMAGE EXACTLY */}
        <div className="relative w-full rounded-3xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white/90 via-[#f4f8fd]/80 to-white/70 backdrop-blur-md border border-white/80 shadow-[0_15px_45px_rgba(0,40,100,0.06)]">
          {/* Subtle curved background lines */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <svg
              className="absolute -right-20 -top-20 w-[600px] h-[600px] text-cyan-500/10"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* LEFT / CENTER-LEFT COLUMN: Big 3D Logo, Headlines, Badges, Compatibility */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6">
              {/* Big 3D Logo + Headline Group */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-right">
                {/* Massive 3D Faceted "R" Logo as in the image with 20-second hold detection! */}
                <div className="shrink-0" title="اضغط مطولاً لمدة 20 ثانية للتحقق من المالك">
                  <LogoWithHoldTrigger
                    size="lg"
                    showText={false}
                    onTriggerAuth={handleTriggerOwnerAuth}
                    className="drop-shadow-2xl"
                  />
                </div>

                <div className="space-y-1">
                  {/* Arabic Primary Headline */}
                  <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#002666] tracking-tight font-['Cairo',sans-serif] drop-shadow-xs">
                    {t.heroHead}
                  </h1>

                  {/* English Secondary Title */}
                  <h2 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[#003893] font-['Tajawal',sans-serif] tracking-tight">
                    {t.heroSubEng}
                  </h2>

                  {/* Description Headlines */}
                  <div className="pt-2 space-y-0.5">
                    <p className="text-base sm:text-lg xl:text-xl font-bold text-slate-800 font-['Cairo',sans-serif]">
                      {t.heroHeadline}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 font-['Tajawal',sans-serif]">
                      {t.heroHeadlineEng}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Feature Badges (Safe & Reliable, Fast Download, Technical Support, Original Apps) */}
              <FeaturesStrip lang={lang} />

              {/* Action Buttons & Secret Owner Indicator */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('store-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  <Layers className="w-4 h-4" />
                  <span>{t.switchModeCatalog}</span>
                </button>

                <button
                  onClick={() => setIsCustomAppOpen(true)}
                  className="px-5 py-3 bg-white hover:bg-slate-50 text-blue-700 rounded-2xl font-bold text-sm border border-blue-200 shadow-sm transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <span>{t.navCustom}</span>
                </button>

                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="px-4 py-3 text-slate-600 hover:text-slate-900 font-semibold text-xs sm:text-sm hover:underline"
                >
                  {t.searchTitle} 🔍
                </button>

                {/* Subtle discrete indicator / shortcut for the owner */}
                <button
                  onClick={handleTriggerOwnerAuth}
                  className="px-3 py-2 text-[11px] text-slate-400 hover:text-blue-600 rounded-xl transition-colors flex items-center gap-1 border border-slate-200/50 bg-white/40"
                  title="الضغط المطول لمدة 20 ثانية على الشعار أو النقر هنا لفتح لوحة المالك"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>بوابة المالك (20 ثانية ضغط على الشعار)</span>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: 3D Smartphone Frame + Side Display Cards */}
            <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative">
              <div className="relative flex items-center justify-center gap-4">
                {/* 1. Interactive 3D Smartphone Mockup */}
                <PhoneMockup
                  lang={lang}
                  onSelectApp={(app) => setSelectedApp(app)}
                  onExploreCategory={handleCategorySelect}
                />

                {/* 2. Side Display Card (Racing Game, Educational, Utility, Fun Games) */}
                <SideDisplayCard
                  onSelectCategory={handleCategorySelect}
                  onSelectApp={handleAppSelectById}
                />
              </div>
            </div>
          </div>

          {/* Contact Bar & Social Links at bottom of hero (Exact match with footer in screenshot) */}
          <div className="mt-8 pt-6 border-t border-slate-200/70">
            <ContactFooter lang={lang} />
          </div>
        </div>

        {/* FULL APP STORE SECTION (Scrollable Catalog with filters, search, and direct APK download) */}
        <StoreCatalog
          lang={lang}
          onSelectApp={(app) => setSelectedApp(app)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          downloadedAppIds={downloadedApps.map((a) => a.id)}
        />
      </main>

      {/* MODALS */}
      {/* 1. App Details & Download Simulation Modal */}
      <AppDetailModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        lang={lang}
        onAddToDownloads={addToDownloads}
        isDownloaded={selectedApp ? downloadedApps.some((a) => a.id === selectedApp.id) : false}
      />

      {/* 2. Custom App Request Modal */}
      <CustomAppModal
        isOpen={isCustomAppOpen}
        onClose={() => setIsCustomAppOpen(false)}
        lang={lang}
      />

      {/* 3. Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        onSelectApp={(app) => setSelectedApp(app)}
      />

      {/* 4. Downloads Queue Drawer */}
      <DownloadsDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        downloadedApps={downloadedApps}
        onRemoveDownloaded={removeFromDownloads}
        lang={lang}
      />

      {/* 5. Owner Verification / Login Modal (Triggered by 20s Hold on Logo) */}
      <OwnerAuthModal
        isOpen={isOwnerAuthOpen}
        onClose={() => setIsOwnerAuthOpen(false)}
        onSuccess={() => {
          setIsOwnerAuthOpen(false);
          setIsOwnerDashboardOpen(true);
        }}
      />

      {/* 6. Comprehensive Owner Dashboard Fullscreen Overlay */}
      {isOwnerDashboardOpen && (
        <OwnerDashboard onExit={() => setIsOwnerDashboardOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreMain />
    </StoreProvider>
  );
}
