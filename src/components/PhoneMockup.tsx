import React, { useState } from 'react';
import {
  Search,
  Wifi,
  Battery,
  Signal,
  Gamepad2,
  GraduationCap,
  Settings,
  LayoutGrid,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { AndroidApp, TRANSLATIONS } from '../data/appsData';
import { useStore } from '../context/StoreContext';
import { AppIconRenderer } from './AppIconRenderer';
import { RqeebLogo } from './RqeebLogo';

interface PhoneMockupProps {
  lang: 'ar' | 'en';
  onSelectApp: (app: AndroidApp) => void;
  onExploreCategory?: (cat: string) => void;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  lang,
  onSelectApp,
  onExploreCategory,
}) => {
  const { apps } = useStore();
  const [phoneSearch, setPhoneSearch] = useState('');
  const [selectedPhoneCat, setSelectedPhoneCat] = useState<'all' | 'games' | 'education' | 'utility'>('all');
  const t = TRANSLATIONS[lang];

  // Specific 4 apps for "أحدث التطبيقات" as seen in the uploaded image or latest dynamic
  const latestApps = [
    apps.find((a) => a.id === 'rqeeb-pro') || apps[0],
    apps.find((a) => a.id === 'math-solver') || apps[1],
    apps.find((a) => a.id === 'flash-player') || apps[2],
    apps.find((a) => a.id === 'quran-app') || apps[3],
  ].filter(Boolean);

  // 4 apps for "الأكثر تحميلاً" as seen in the uploaded image
  const mostDownloadedApps = [
    apps.find((a) => a.id === 'safe-vpn') || apps[4] || apps[0],
    apps.find((a) => a.id === 'block-puzzle') || apps[5] || apps[1],
    apps.find((a) => a.id === 'video-editor-pro') || apps[6] || apps[2],
    apps.find((a) => a.id === 'speed-cleaner') || apps[7] || apps[3],
  ].filter(Boolean);

  // Filtered apps if user searches inside phone
  const filteredSearchApps = phoneSearch.trim()
    ? apps.filter((a) => {
        const query = phoneSearch.toLowerCase();
        return (
          a.nameAr.toLowerCase().includes(query) ||
          a.nameEn.toLowerCase().includes(query) ||
          a.descriptionAr.toLowerCase().includes(query)
        );
      })
    : null;

  return (
    <div className="relative mx-auto select-none transition-transform duration-500 hover:scale-[1.01]">
      {/* 3D Phone Body Frame */}
      <div className="relative w-[310px] sm:w-[350px] md:w-[370px] h-[670px] sm:h-[730px] bg-slate-950 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,30,80,0.5),0_0_0_1px_rgba(255,255,255,0.1),0_0_40px_rgba(0,180,255,0.2)] border-[5px] border-slate-800 ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
        {/* Top Speaker Ear-piece */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-800 rounded-full z-30" />

        {/* Glossy Diagonal Reflection Streak Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent z-20" />

        {/* Inside Phone Screen Display */}
        <div className="relative w-full h-full bg-[#f8fafc] rounded-[38px] overflow-hidden flex flex-col shadow-inner border border-slate-200/50">
          {/* 1. Android Status Bar */}
          <div className="h-7 px-5 pt-1.5 flex items-center justify-between text-slate-800 text-[11px] font-semibold tracking-tight z-10 shrink-0 bg-white/70 backdrop-blur-md">
            <span>12:45</span>

            {/* Front Camera Punch-hole */}
            <div className="w-3.5 h-3.5 bg-black rounded-full border-2 border-slate-900 shadow-inner -mt-0.5" />

            <div className="flex items-center gap-1.5 text-slate-700">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          {/* 2. Scrollable Store Content inside the phone */}
          <div className="flex-1 overflow-y-auto px-3.5 pt-2 pb-5 space-y-3.5 scrollbar-thin">
            {/* Phone Top Header with Rqeeb Logo */}
            <div className="flex flex-col items-center justify-center text-center pt-1 pb-1">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center shadow-sm border border-cyan-400/40 p-1">
                  <span className="font-black text-cyan-300 text-lg font-['Tajawal']">R</span>
                </div>
                <div className="text-right">
                  <h4 className="font-black text-slate-900 text-sm leading-tight font-['Tajawal',sans-serif]">
                    Rqeeb Pro Apps
                  </h4>
                  <p className="text-[10px] text-blue-600 font-bold font-['Cairo',sans-serif]">
                    تطبيقات رقيب برو
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Search Bar Input */}
            <div className="relative">
              <input
                type="text"
                value={phoneSearch}
                onChange={(e) => setPhoneSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs rounded-full py-2 pl-3 pr-10 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Cairo',sans-serif]"
              />
              <button
                type="button"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* If searching inside phone: Show Search Results */}
            {filteredSearchApps ? (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs px-1 text-slate-600">
                  <span>نتائج البحث ({filteredSearchApps.length})</span>
                  <button
                    onClick={() => setPhoneSearch('')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    إلغاء
                  </button>
                </div>
                {filteredSearchApps.length === 0 ? (
                  <p className="text-xs text-center text-slate-400 py-6">
                    {t.noResults}
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {filteredSearchApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => onSelectApp(app)}
                        className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-300 cursor-pointer transition-all"
                      >
                        <AppIconRenderer app={app} size="sm" />
                        <div className="flex-1 min-w-0 text-right">
                          <p className="text-xs font-bold text-slate-900 truncate font-['Cairo']">
                            {lang === 'ar' ? app.nameAr : app.nameEn}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {app.size} · {app.downloads}
                          </p>
                        </div>
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                          {t.free}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* 3. Featured Banner ("تطبيقات مميزة") as in screenshot */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#041d4a] via-[#09357a] to-[#021333] p-3 text-white shadow-md border border-cyan-400/30">
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl" />

                  <div className="relative flex items-center justify-between gap-2">
                    {/* Left: Android mascot with floating icons */}
                    <div className="w-16 h-16 relative shrink-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center shadow-lg shadow-lime-500/30">
                        {/* Android mascot */}
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                          <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 2.23 12.95 2 12 2c-.96 0-1.86.23-2.66.63L7.85 1.14c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 4.26 6 6.01 6 8h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
                        </svg>
                      </div>
                      {/* Floating mini badge */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded bg-blue-500 text-[9px] flex items-center justify-center font-bold shadow">
                        ⚡
                      </div>
                    </div>

                    {/* Right: Text & Call to action */}
                    <div className="text-right space-y-1">
                      <h4 className="font-extrabold text-sm font-['Cairo',sans-serif] text-cyan-200">
                        {t.featuredApps}
                      </h4>
                      <p className="text-[10px] text-slate-300 font-medium">
                        {t.discoverBest}
                      </p>
                      <button
                        onClick={() => {
                          const app = apps.find((a) => a.id === 'rqeeb-pro') || apps[0];
                          if (app) onSelectApp(app);
                        }}
                        className="mt-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg text-[11px] font-bold shadow-sm inline-flex items-center gap-1 transition-all"
                      >
                        <span>{t.browseNow}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Quick Category Icons Grid (4 items) */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  {/* Category 1: Games (Purple) */}
                  <div
                    onClick={() => onExploreCategory && onExploreCategory('games')}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 font-['Cairo']">
                      {t.catGames}
                    </span>
                  </div>

                  {/* Category 2: Educational (Blue) */}
                  <div
                    onClick={() => onExploreCategory && onExploreCategory('education')}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 font-['Cairo']">
                      {t.catEdu}
                    </span>
                  </div>

                  {/* Category 3: Utility (Green) */}
                  <div
                    onClick={() => onExploreCategory && onExploreCategory('utility')}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Settings className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 font-['Cairo']">
                      {t.catUtils}
                    </span>
                  </div>

                  {/* Category 4: All Categories (Cyan/Indigo) */}
                  <div
                    onClick={() => onExploreCategory && onExploreCategory('all')}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 font-['Cairo']">
                      {t.allCategories}
                    </span>
                  </div>
                </div>

                {/* 5. Latest Apps Section ("أحدث التطبيقات") */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs px-0.5">
                    <span className="font-extrabold text-slate-900 font-['Cairo',sans-serif]">
                      {t.latestApps}
                    </span>
                    <button
                      onClick={() => onExploreCategory && onExploreCategory('all')}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 font-['Cairo']"
                    >
                      {t.viewAll}
                    </button>
                  </div>

                  {/* 4 Apps Row matching the screenshot: Rqeeb Pro, Math Solver, Flash Player, Quran App */}
                  <div className="grid grid-cols-4 gap-2">
                    {latestApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => onSelectApp(app)}
                        className="flex flex-col items-center text-center cursor-pointer group p-1 rounded-xl hover:bg-slate-100/70 transition-colors"
                      >
                        <div className="group-hover:scale-105 transition-transform">
                          <AppIconRenderer app={app} size="sm" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 mt-1 truncate w-full font-['Cairo']">
                          {lang === 'ar' ? app.nameAr : app.nameEn}
                        </span>
                        <span className="text-[9px] text-blue-600 font-semibold font-['Cairo']">
                          {t.free}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Most Downloaded Section ("الأكثر تحميلاً") */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs px-0.5">
                    <span className="font-extrabold text-slate-900 font-['Cairo',sans-serif]">
                      {t.mostDownloaded}
                    </span>
                    <button
                      onClick={() => onExploreCategory && onExploreCategory('all')}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 font-['Cairo']"
                    >
                      {t.viewAll}
                    </button>
                  </div>

                  {/* 4 Most downloaded apps icons matching screenshot */}
                  <div className="grid grid-cols-4 gap-2">
                    {mostDownloadedApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => onSelectApp(app)}
                        className="flex flex-col items-center text-center cursor-pointer group p-1 rounded-xl hover:bg-slate-100/70 transition-colors"
                      >
                        <div className="group-hover:scale-105 transition-transform">
                          <AppIconRenderer app={app} size="sm" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 mt-1 truncate w-full font-['Cairo']">
                          {lang === 'ar' ? app.nameAr : app.nameEn}
                        </span>
                        <span className="text-[9px] text-emerald-600 font-semibold font-['Cairo']">
                          ★ {app.rating}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
