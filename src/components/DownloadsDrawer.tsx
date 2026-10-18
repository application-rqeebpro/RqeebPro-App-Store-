import React from 'react';
import { X, CheckCircle2, Download, Smartphone, Trash2 } from 'lucide-react';
import { AndroidApp, TRANSLATIONS } from '../data/appsData';
import { AppIconRenderer } from './AppIconRenderer';

interface DownloadsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  downloadedApps: AndroidApp[];
  onRemoveDownloaded: (id: string) => void;
  lang: 'ar' | 'en';
}

export const DownloadsDrawer: React.FC<DownloadsDrawerProps> = ({
  isOpen,
  onClose,
  downloadedApps,
  onRemoveDownloaded,
  lang,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in font-['Cairo',sans-serif]">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#031d4e] to-[#042866] text-white flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
              {downloadedApps.length}
            </span>
            <h3 className="font-bold text-base font-['Tajawal']">
              {t.installedCount}
            </h3>
          </div>
        </div>

        {/* Apps List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {downloadedApps.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                <Download className="w-8 h-8" />
              </div>
              <p className="text-sm">لم تقم بتحميل أي تطبيقات بعد</p>
              <p className="text-xs text-slate-400">
                اختر أي تطبيق من المتجر واضغط تحميل APK للتجربة
              </p>
            </div>
          ) : (
            downloadedApps.map((app) => (
              <div
                key={app.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <AppIconRenderer app={app} size="sm" />
                  <div>
                    <h5 className="font-bold text-xs text-slate-900 font-['Cairo']">
                      {lang === 'ar' ? app.nameAr : app.nameEn}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {app.version} · {app.size}
                    </p>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> تم التحميل
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      alert(`جاري تثبيت ملف ${app.nameAr} APK على جهازك`);
                    }}
                    title="تثبيت"
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveDownloaded(app.id)}
                    title="حذف"
                    className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
