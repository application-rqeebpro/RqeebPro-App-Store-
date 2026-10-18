import React, { useState } from 'react';
import { Search, X, Star } from 'lucide-react';
import { AndroidApp, TRANSLATIONS } from '../data/appsData';
import { useStore } from '../context/StoreContext';
import { AppIconRenderer } from './AppIconRenderer';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  onSelectApp: (app: AndroidApp) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectApp,
}) => {
  const { apps } = useStore();
  const [query, setQuery] = useState('');
  if (!isOpen) return null;
  const t = TRANSLATIONS[lang];

  const filtered = apps.filter((app) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      app.nameAr.toLowerCase().includes(q) ||
      app.nameEn.toLowerCase().includes(q) ||
      app.categoryAr.toLowerCase().includes(q) ||
      app.descriptionAr.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-['Cairo',sans-serif]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 text-slate-800 placeholder-slate-400 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1.5">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm">
              {t.noResults}
            </div>
          ) : (
            filtered.map((app) => (
              <div
                key={app.id}
                onClick={() => {
                  onSelectApp(app);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <AppIconRenderer app={app} size="sm" />
                  <div className="text-right">
                    <h5 className="font-bold text-sm text-slate-900 font-['Cairo']">
                      {lang === 'ar' ? app.nameAr : app.nameEn}
                    </h5>
                    <p className="text-xs text-slate-500">
                      {lang === 'ar' ? app.categoryAr : app.categoryEn} · {app.size}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-500 flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" /> {app.rating}
                  </span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold">
                    {t.free}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
