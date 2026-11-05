import React from 'react';
import {
  Wrench,
  Database,
  ShieldAlert,
  MessageCircle,
  KeyRound,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LogoWithHoldTrigger } from './LogoWithHoldTrigger';

interface MaintenanceScreenProps {
  onTriggerOwnerAuth: () => void;
  onOpenOwnerDashboard: () => void;
}

export const MaintenanceScreen: React.FC<MaintenanceScreenProps> = ({
  onTriggerOwnerAuth,
  onOpenOwnerDashboard,
}) => {
  const { settings, isOwnerLoggedIn } = useStore();

  return (
    <div className="min-h-screen bg-[#030a1c] text-white font-['Cairo',sans-serif] flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-hidden text-right select-none dir-rtl">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top Bar with Store Logo + Owner Quick Trigger */}
      <header className="w-full max-w-4xl flex items-center justify-between relative z-10 py-2 border-b border-white/10">
        <LogoWithHoldTrigger
          size="sm"
          showText={true}
          onTriggerAuth={isOwnerLoggedIn ? onOpenOwnerDashboard : onTriggerOwnerAuth}
        />

        {isOwnerLoggedIn ? (
          <button
            onClick={onOpenOwnerDashboard}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all border border-emerald-400/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>لوحة تحكم المالك</span>
          </button>
        ) : (
          <button
            onClick={onTriggerOwnerAuth}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-white/10 flex items-center gap-1.5 transition-all"
            title="نقر مباشر أو ضغط 20 ثانية على الشعار لفتح بوابة المالك"
          >
            <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
            <span>بوابة المالك</span>
          </button>
        )}
      </header>

      {/* Main Hero Card */}
      <main className="relative z-10 max-w-2xl w-full my-auto py-8">
        <div className="bg-gradient-to-b from-[#0a183d]/90 to-[#06102a]/95 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-center space-y-6">
          {/* Animated Icon Badge */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-yellow-500/10 border border-amber-400/40 flex items-center justify-center shadow-xl shadow-amber-500/10">
              <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 animate-spin-slow" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 border-2 border-[#0a183d] p-2 rounded-xl text-white shadow-lg">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* Maintenance Status Badge */}
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-black">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>وضع الصيانة وتحديث قواعد البيانات مُفعل</span>
            </span>
          </div>

          {/* Custom Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Cairo'] tracking-tight">
            {settings.maintenanceTitle || 'المتجر تحت الصيانة والتحديث الدوري'}
          </h1>

          {/* Custom Message */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium bg-black/20 p-4 rounded-2xl border border-white/5">
            {settings.maintenanceMessage ||
              'نقوم حالياً بإجراء تحديثات وتحسينات هامة على قواعد البيانات والسيرفرات لتوفير تجربة أسرع وأكثر أماناً. سنعود للعمل قريباً جداً!'}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/967${settings.whatsappNumber}?text=${encodeURIComponent(
                'مرحباً دعم متجر رقيب برو، أود الاستفسار أثناء وضع الصيانة...'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل مع الدعم الفني عبر واتساب</span>
            </a>

            {!isOwnerLoggedIn && (
              <button
                onClick={onTriggerOwnerAuth}
                className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white font-bold text-xs sm:text-sm rounded-2xl border border-cyan-400/30 flex items-center justify-center gap-2 transition-all"
              >
                <KeyRound className="w-4 h-4" />
                <span>تسجيل دخول المالك لإيقاف الصيانة</span>
              </button>
            )}

            {isOwnerLoggedIn && (
              <button
                onClick={onOpenOwnerDashboard}
                className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>الذهاب إلى لوحة تحكم المالك</span>
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-4xl text-center py-3 text-xs text-slate-500 border-t border-white/5">
        <p>© 2026 تطبيقات رقيب برو - Rqeeb Pro Apps. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};
