import React, { useState } from 'react';
import {
  Gamepad2,
  GraduationCap,
  Settings,
  LayoutGrid,
  Download,
  Star,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { AndroidApp, TRANSLATIONS } from '../data/appsData';
import { useStore } from '../context/StoreContext';
import { AppIconRenderer } from './AppIconRenderer';

interface StoreCatalogProps {
  lang: 'ar' | 'en';
  onSelectApp: (app: AndroidApp) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  downloadedAppIds: string[];
}

export const StoreCatalog: React.FC<StoreCatalogProps> = ({
  lang,
  onSelectApp,
  selectedCategory,
  setSelectedCategory,
  downloadedAppIds,
}) => {
  const { apps } = useStore();
  const [catalogSearch, setCatalogSearch] = useState('');
  const t = TRANSLATIONS[lang];

  const categories = [
    { id: 'all', label: t.allCategories, icon: LayoutGrid },
    { id: 'games', label: t.catGames, icon: Gamepad2 },
    { id: 'education', label: t.catEdu, icon: GraduationCap },
    { id: 'utility', label: t.catUtils, icon: Settings },
  ];

  const filteredApps = apps.filter((app) => {
    const matchesCat =
      selectedCategory === 'all' ||
      app.category === selectedCategory ||
      (selectedCategory === 'apps' && app.category !== 'games');

    if (!matchesCat) return false;

    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase();
      return (
        app.nameAr.toLowerCase().includes(q) ||
        app.nameEn.toLowerCase().includes(q) ||
        app.descriptionAr.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <section id="store-section" className="w-full pt-8 pb-12 select-none">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="text-right">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            مستودع التطبيقات الكامل
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-['Cairo',sans-serif]">
            متجر تطبيقات رقيب برو
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            تطبيقات أصلية 100% تم فحصها أمنياً وجاهزة للتحميل المباشر بصيغة APK
          </p>
        </div>

        {/* Search inside catalog */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={catalogSearch}
            onChange={(e) => setCatalogSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm rounded-2xl py-2.5 pl-4 pr-10 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-['Cairo',sans-serif]"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 font-['Cairo'] ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Apps Grid */}
      {filteredApps.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">{t.noResults}</p>
          <button
            onClick={() => {
              setCatalogSearch('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-blue-600 font-bold text-xs underline"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredApps.map((app) => {
            const isDownloaded = downloadedAppIds.includes(app.id);

            return (
              <div
                key={app.id}
                onClick={() => onSelectApp(app)}
                className="group relative bg-white rounded-3xl p-4 border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon and Badges */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <AppIconRenderer
                      app={app}
                      size="md"
                      className="group-hover:scale-105 transition-transform"
                    />
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60 font-['Cairo']">
                        {t.free}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {app.rating}
                      </span>
                    </div>
                  </div>

                  {/* App Title & Subtitle */}
                  <div className="text-right space-y-1">
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors font-['Tajawal']">
                      {lang === 'ar' ? app.nameAr : app.nameEn}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-['Cairo']">
                      {lang === 'ar' ? app.descriptionAr : app.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* Bottom Footer Info & Action */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2 text-[11px] font-medium">
                    <span>{app.size}</span>
                    <span>·</span>
                    <span>{app.downloads}</span>
                  </div>

                  {isDownloaded ? (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> محمل
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectApp(app);
                      }}
                      className="px-3 py-1.5 bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t.downloadApk}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
