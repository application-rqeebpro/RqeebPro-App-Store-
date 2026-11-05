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
  Smartphone,
  Wrench,
  BookOpen,
  ShoppingBag,
  Plus,
  Shirt,
} from 'lucide-react';
import { AndroidApp, TRANSLATIONS } from '../data/appsData';
import { PRODUCTS_DATA, StoreProduct } from '../data/storeProducts';
import { useStore } from '../context/StoreContext';
import { AppIconRenderer } from './AppIconRenderer';

interface StoreCatalogProps {
  lang: 'ar' | 'en';
  onSelectApp: (app: AndroidApp) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  downloadedAppIds: string[];
  onOpenCartModal: () => void;
}

export const StoreCatalog: React.FC<StoreCatalogProps> = ({
  lang,
  onSelectApp,
  selectedCategory,
  setSelectedCategory,
  downloadedAppIds,
  onOpenCartModal,
}) => {
  const { apps, addToCart } = useStore();
  const [catalogSearch, setCatalogSearch] = useState('');
  const t = TRANSLATIONS[lang];

  const categories = [
    { id: 'all', label: t.allCategories, icon: LayoutGrid },
    { id: 'education', label: 'تطبيقات تعليمية', icon: GraduationCap },
    { id: 'electronics', label: 'هواتف وإلكترونيات', icon: Smartphone },
    { id: 'accessories', label: 'أدوات وإكسسوارات', icon: Wrench },
    { id: 'school_supplies', label: 'أدوات مدرسية', icon: BookOpen },
    { id: 'fashion', label: 'أحذية وأزياء', icon: Shirt },
    { id: 'games', label: t.catGames, icon: Gamepad2 },
  ];

  // Filter products
  const filteredProducts = PRODUCTS_DATA.filter((prod) => {
    const matchesCat =
      selectedCategory === 'all' || prod.category === selectedCategory;
    if (!matchesCat) return false;

    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase();
      return (
        prod.nameAr.toLowerCase().includes(q) ||
        prod.nameEn.toLowerCase().includes(q) ||
        prod.descriptionAr.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filter apps
  const filteredApps = apps.filter((app) => {
    const matchesCat =
      selectedCategory === 'all' ||
      app.category === selectedCategory ||
      (selectedCategory === 'education' && app.category === 'education');

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

  const handleAddToCartProduct = (prod: StoreProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: prod.id,
      nameAr: prod.nameAr,
      nameEn: prod.nameEn,
      categoryAr: prod.categoryAr,
      priceYer: prod.priceYer,
      priceUsd: prod.priceUsd,
      imageOrIcon: prod.image,
      itemType: 'product',
    });
    onOpenCartModal();
  };

  return (
    <section id="store-section" className="w-full pt-8 pb-12 select-none font-['Cairo',sans-serif]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="text-right">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            منتجات وأدوات وتطبيقات متكاملة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-['Cairo']">
            متجر منتجات وتطبيقات رقيب برو
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            تصفح وشراء الهواتف والأدوات المدرسية والإكسسوارات والأزياء والتطبيقات مع الدفع بالمحافظ الإلكترونية
          </p>
        </div>

        {/* Search inside catalog */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={catalogSearch}
            onChange={(e) => setCatalogSearch(e.target.value)}
            placeholder="ابحث عن منتج، هاتف، أداة، أو تطبيق..."
            className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm rounded-2xl py-2.5 pl-4 pr-10 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-['Cairo']"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
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

      {/* Section 1: Physical Merchandise Products (If available for selected category) */}
      {filteredProducts.length > 0 && (
        <div className="mb-10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <span>الأدوات والهواتف والمستلزمات ({filteredProducts.length})</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              الدفع بالمحافظ: جيب، جوالي، فلوسك، ون كاش، الكريمي (785502919)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-3xl p-4 border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Product Image & Badge */}
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-200/60">
                    <img
                      src={prod.image}
                      alt={prod.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 right-2.5 text-[10px] bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full font-bold">
                      {prod.categoryAr}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                      {prod.salesCount}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="text-right space-y-1">
                    <h4 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors font-['Tajawal']">
                      {prod.nameAr}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {prod.descriptionAr}
                    </p>
                  </div>
                </div>

                {/* Price & Add to Cart Action */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">
                      السعر:
                    </span>
                    <span className="text-sm font-black text-slate-900 font-mono">
                      {prod.priceYer.toLocaleString('ar-EG')} ر.ي
                    </span>
                    <span className="text-[10px] text-blue-600 font-bold block font-mono">
                      (${prod.priceUsd} USD)
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCartProduct(prod, e)}
                    className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>شراء / للسلة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Apps & Software Catalog */}
      {filteredApps.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" />
              <span>تطبيقات وأدوات الأندرويد ({filteredApps.length})</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredApps.map((app) => {
              const isDownloaded = downloadedAppIds.includes(app.id);

              return (
                <div
                  key={app.id}
                  onClick={() => onSelectApp(app)}
                  className="group relative bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Clean Unified Top Header Row */}
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <AppIconRenderer
                        app={app}
                        size="md"
                        className="shrink-0 rounded-2xl shadow-sm group-hover:scale-105 transition-transform"
                      />

                      {/* Title, Rating & Category */}
                      <div className="flex-1 min-w-0 text-right space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors font-['Tajawal'] truncate">
                            {lang === 'ar' ? app.nameAr : app.nameEn}
                          </h3>
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 shrink-0 font-['Cairo']">
                            {t.free}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-['Cairo']">
                          <span className="flex items-center gap-1 font-bold text-amber-500 text-xs shrink-0">
                            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                            <span>{app.rating}</span>
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md truncate">
                            {app.categoryAr}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-['Cairo'] text-right">
                      {lang === 'ar' ? app.descriptionAr : app.descriptionEn}
                    </p>
                  </div>

                  {/* Bottom Footer Row */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 font-mono">
                      <span>{app.size}</span>
                      <span>·</span>
                      <span>{app.downloads}</span>
                    </div>

                    {isDownloaded ? (
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> محمل
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectApp(app);
                        }}
                        className="px-3.5 py-1.5 bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
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
        </div>
      )}

      {filteredProducts.length === 0 && filteredApps.length === 0 && (
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
      )}
    </section>
  );
};

