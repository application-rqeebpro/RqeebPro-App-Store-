import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Smartphone } from 'lucide-react';
import { TRANSLATIONS } from '../data/appsData';
import { useStore } from '../context/StoreContext';

interface CustomAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const CustomAppModal: React.FC<CustomAppModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const { addRequest, settings } = useStore();
  const [appName, setAppName] = useState('');
  const [category, setCategory] = useState('utility');
  const [features, setFeatures] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName.trim() || !clientPhone.trim()) return;

    // Save request to Owner Inbox
    addRequest({
      appName,
      category,
      features,
      clientName: clientName || 'عميل المتجر',
      clientPhone,
    });

    setSubmitted(true);

    // Prefill WhatsApp link with user request using the dynamic settings WhatsApp number
    const message = encodeURIComponent(
      `مرحباً رقيب برو، أرغب في طلب تطبيق مخصص:\n- اسم الفكرة: ${appName}\n- التصنيف: ${category}\n- التفاصيل: ${features}\n- مقدم الطلب: ${clientName || 'عميل'}\n- رقم الهاتف: ${clientPhone}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/967${settings.whatsappNumber}?text=${message}`, '_blank');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-['Cairo',sans-serif] text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#031d4e] via-[#05327e] to-[#021844] p-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>خدمة مخصصة للمطورين والشركات</span>
          </div>
          <h3 className="text-xl font-black font-['Tajawal',sans-serif]">
            {t.customAppModalTitle}
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {t.customAppModalDesc}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {t.requestSuccess}
              </h4>
              <p className="text-xs text-slate-500">
                جاري فتح محادثة الدعم الفني عبر واتساب لنقل تفاصيل طلبك مباشرة...
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.appNameField} *
                </label>
                <input
                  type="text"
                  required
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="مثال: تطبيق متجر إلكتروني، حاسبة خاصة..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.appCategoryField}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                >
                  <option value="utility">خدمي وأدوات (Utilities)</option>
                  <option value="games">لعبة أندرويد (2D/3D Games)</option>
                  <option value="education">تعليمي وكورسات (Educational)</option>
                  <option value="commercial">تجاري ومتاجر (E-Commerce)</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.appFeaturesField}
                </label>
                <textarea
                  rows={3}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="صف أهم الخصائص والشاشات التي تحتاجها في تطبيقك..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.clientNameField}
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="اسمك الكريم"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.clientPhoneField} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="785502919"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.submitRequest}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
