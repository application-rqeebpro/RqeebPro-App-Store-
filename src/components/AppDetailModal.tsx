import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Star,
  CheckCircle2,
  HardDrive,
  Info,
  Shield,
  Smartphone,
  Share2,
  Check,
} from 'lucide-react';
import { AndroidApp, TRANSLATIONS } from '../data/appsData';
import { AppIconRenderer } from './AppIconRenderer';

interface AppDetailModalProps {
  app: AndroidApp | null;
  onClose: () => void;
  lang: 'ar' | 'en';
  onAddToDownloads: (app: AndroidApp) => void;
  isDownloaded: boolean;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({
  app,
  onClose,
  lang,
  onAddToDownloads,
  isDownloaded,
}) => {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadSpeed, setDownloadSpeed] = useState('3.8 MB/s');
  const [downloadDone, setDownloadDone] = useState(isDownloaded);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setDownloadDone(isDownloaded);
    setDownloadProgress(null);
  }, [app, isDownloaded]);

  if (!app) return null;
  const t = TRANSLATIONS[lang];

  const handleStartDownload = () => {
    if (downloadDone) return;
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 5;
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadDone(true);
          onAddToDownloads(app);
          return 100;
        }
        const speeds = ['4.2 MB/s', '5.1 MB/s', '3.9 MB/s', '6.0 MB/s'];
        setDownloadSpeed(speeds[Math.floor(Math.random() * speeds.length)]);
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 250);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon / Banner */}
        <div className="relative bg-gradient-to-r from-[#031d4e] via-[#05327e] to-[#021844] p-5 sm:p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={handleShare}
            className="absolute top-4 left-16 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            title="مشاركة التطبيق"
          >
            {copiedLink ? <Check className="w-5 h-5 text-lime-400" /> : <Share2 className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-4 mt-2">
            <AppIconRenderer app={app} size="lg" className="shadow-lg border-2 border-white/20" />
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black font-['Tajawal',sans-serif] tracking-tight">
                {lang === 'ar' ? app.nameAr : app.nameEn}
              </h3>
              <p className="text-xs sm:text-sm text-cyan-300 font-medium font-['Cairo',sans-serif]">
                {lang === 'ar' ? app.categoryAr : app.categoryEn} · رقيب برو الرسمي
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-300 pt-1 font-semibold">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {app.rating}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-white/90">{app.downloads} تحميل</span>
                <span className="text-white/40">·</span>
                <span className="text-lime-300 font-bold">{t.free}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-right font-['Cairo',sans-serif]">
          {/* Metadata Specs Bar */}
          <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div>
              <p className="text-[11px] text-slate-500">{t.size}</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{app.size}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500">{t.version}</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{app.version}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500">{t.target}</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{app.targetAndroid}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500">الأمان</p>
              <p className="text-xs sm:text-sm font-bold text-emerald-600 flex items-center justify-center gap-0.5">
                <Shield className="w-3.5 h-3.5" /> آمن
              </p>
            </div>
          </div>

          {/* Download Button & Real-time Progress Bar */}
          <div className="space-y-2">
            {downloadProgress !== null && downloadProgress < 100 ? (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="flex justify-between text-xs font-bold text-blue-900">
                  <span>جاري تحميل ملف APK... ({downloadProgress}%)</span>
                  <span>{downloadSpeed}</span>
                </div>
                <div className="w-full h-3 bg-blue-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 rounded-full"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 text-left" dir="ltr">
                  Downloading {app.nameEn}_{app.version}.apk
                </p>
              </div>
            ) : downloadDone ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-900">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm">تم تنزيل الحزمة بنجاح! ({app.size})</h5>
                    <p className="text-xs text-emerald-700">الملف جاهز للتثبيت المباشر على هاتفك</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert(`جاري تشغيل مثبت الحزم لتطبيق ${app.nameAr} (${app.version}) على جهاز الأندرويد.`);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all shrink-0 flex items-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{t.openFile}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleStartDownload}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Download className="w-5 h-5" />
                <span className="text-base font-bold">
                  {t.downloadApk} ({app.size})
                </span>
              </button>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">نبذة عن التطبيق</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'ar' ? app.descriptionAr : app.descriptionEn}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">أبرز المميزات</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(lang === 'ar' ? app.featuresAr : app.featuresEn).map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots Gallery */}
          {app.screenshots && app.screenshots.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">لقطات الشاشة</h4>
              <div className="grid grid-cols-2 gap-3">
                {app.screenshots.map((src, i) => (
                  <div
                    key={i}
                    className="h-36 rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
                  >
                    <img
                      src={src}
                      alt="Screenshot"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safe APK Guarantee */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 text-slate-600 text-xs">
            <Shield className="w-5 h-5 text-blue-600 shrink-0" />
            <span>
              تم فحص هذا الملف بأحدث أنظمة مكافحة البرمجيات الخبيثة وهو خالٍ تماماً من الفيروسات وأصلي 100%.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
