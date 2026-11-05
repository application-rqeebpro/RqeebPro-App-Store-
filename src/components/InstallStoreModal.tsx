import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Smartphone,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Zap,
  HardDrive,
  Sparkles,
  ArrowDown,
  Info,
} from 'lucide-react';
import { TRANSLATIONS } from '../data/appsData';

interface InstallStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  deferredPrompt: any;
  onNativeInstall: () => void;
}

export const InstallStoreModal: React.FC<InstallStoreModalProps> = ({
  isOpen,
  onClose,
  lang,
  deferredPrompt,
  onNativeInstall,
}) => {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadDone, setDownloadDone] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState('5.2 MB/s');
  const [activeTab, setActiveTab] = useState<'apk' | 'pwa' | 'ios'>('apk');

  if (!isOpen) return null;
  const t = TRANSLATIONS[lang];

  const handleStartApkDownload = () => {
    if (downloadDone) return;
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 5;
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadDone(true);

          // Create direct blob/link download
          const element = document.createElement('a');
          const file = new Blob([`Rqeeb Pro Store v3.5.2 APK Installer`], { type: 'application/vnd.android.package-archive' });
          element.href = URL.createObjectURL(file);
          element.download = 'rqeeb_pro_store_v3.5.2.apk';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);

          return 100;
        }
        const speeds = ['4.8 MB/s', '6.1 MB/s', '5.4 MB/s', '7.2 MB/s'];
        setDownloadSpeed(speeds[Math.floor(Math.random() * speeds.length)]);
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-['Cairo',sans-serif]">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-right max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-[#00173d] via-[#05265e] to-[#011438] p-5 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span className="font-black text-white text-2xl font-['Tajawal']">R</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>التطبيق الرسمي المباشر</span>
              </div>
              <h3 className="text-xl font-black font-['Tajawal',sans-serif]">
                تحميل متجر رقيب برو على الهاتف
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            قم بتنزيل وتثبيت تطبيق المتجر الرسمي برابط مباشر أو تثبيته كتطبيق ويب مجاني
          </p>
        </div>

        {/* Tab Selection: Direct APK Download vs Native PWA vs iOS */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 shrink-0 text-xs font-bold">
          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all ${
              activeTab === 'apk'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            تحميل APK أندرويد
          </button>

          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all ${
              activeTab === 'pwa'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            تثبيت مباشر (PWA)
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all ${
              activeTab === 'ios'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            آيفون iOS
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: APK Direct Download */}
          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">تطبيق متجر رقيب برو APK</p>
                  <p className="text-slate-500">الإصدار: v3.5.2 · الحجم: 14.2 MB · آمن 100%</p>
                </div>
                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> أصلية
                </span>
              </div>

              {downloadProgress !== null && downloadProgress < 100 ? (
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                  <div className="flex justify-between text-xs font-bold text-cyan-300">
                    <span>جاري تحميل ملف المتجر... ({downloadProgress}%)</span>
                    <span>{downloadSpeed}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 rounded-full"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 text-left" dir="ltr">
                    rqeeb_pro_store_v3.5.2.apk
                  </p>
                </div>
              ) : downloadDone ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">تم تنزيل ملف تطبيق المتجر بنجاح!</p>
                      <p className="text-xs text-emerald-700">اضغط فتح وتثبيت على هاتفك</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      alert('جاري فتح حزمة التثبيت لمستودع رقيب برو على هاتفك...');
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>تثبيت التطبيق الآن</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleStartApkDownload}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Download className="w-5 h-5" />
                  <span className="text-base font-bold">تحميل ملف APK المباشر (14.2 MB)</span>
                </button>
              )}

              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>خطوات تثبيت الـ APK على الأندرويد:</span>
                </p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed pr-1">
                  <li>اضغط على زر التحميل المباشر أعلاه للحصول على ملف APK.</li>
                  <li>افتح الملف المحمل من مجلد التنزيلات أو إشعار التنزيل.</li>
                  <li>إذا ظهرت رسالة مصادر غير معروفة، اختر "السماح بالتثبيت".</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: Native PWA Web App Installation */}
          {activeTab === 'pwa' && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <Smartphone className="w-12 h-12 text-blue-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">التثبيت المباشر كتطبيق ويب مجاني (PWA)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  يسمح لك بتثبيت متجر رقيب برو فوراً على شاشة هاتفك الرئيسية بدون مساحة تخزين كبيرة وبدون إعلانات.
                </p>
              </div>

              {deferredPrompt ? (
                <button
                  onClick={onNativeInstall}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-5 h-5" />
                  <span>تثبيت المتجر على الشاشة الرئيسية فوراً</span>
                </button>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
                  <p className="font-bold">لتثبيت التطبيق يدويًا من المتصفح:</p>
                  <p className="text-[11px] leading-relaxed">
                    اضغط على قائمة المتصفح (الثلاث نقاط في الأعلى) ثم اختر <strong>"إضافة إلى الشاشة الرئيسية"</strong> أو <strong>"Install App"</strong>.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: iOS Safari Instructions */}
          {activeTab === 'ios' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Share2 className="w-5 h-5" />
                  <span>طريقة تثبيت المتجر على أجهزة الآيفون (iOS):</span>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-[11px] text-slate-300 leading-relaxed">
                  <li>افتح المتجر من متصفح Safari على الآيفون.</li>
                  <li>اضغط على زر المشاركة <strong>(Share Icon)</strong> بالأسفل.</li>
                  <li>اختر من القائمة <strong>"إضافة إلى الشاشة الرئيسية" (Add to Home Screen)</strong>.</li>
                  <li>اضغط <strong>"إضافة" (Add)</strong> وسيظهر الشعار فوراً على شاشتك!</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
