import React, { useState } from 'react';
import {
  X,
  Code,
  ShieldAlert,
  Database,
  UserCheck,
  CheckCircle2,
  Send,
  Sparkles,
  Smartphone,
  Lock,
  FileText,
  HelpCircle,
  FolderLock,
  KeyRound,
  Globe,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ProgrammingServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
}

export const ProgrammingServicesModal: React.FC<ProgrammingServicesModalProps> = ({
  isOpen,
  onClose,
  lang = 'ar',
}) => {
  const { addRequest, settings } = useStore();

  // Form State
  const [mainCategory, setMainCategory] = useState<
    'data_recovery' | 'account_recovery' | 'general_programming'
  >('data_recovery');

  // 1. Data Recovery States
  const [dataType, setDataType] = useState<'photos' | 'contacts' | 'videos' | 'documents' | 'other'>('photos');
  const [customDataType, setCustomDataType] = useState('');

  // 2. Account Recovery States
  const [accountType, setAccountType] = useState<
    | 'facebook'
    | 'whatsapp'
    | 'tiktok'
    | 'instagram'
    | 'x_twitter'
    | 'website'
    | 'gmail'
    | 'snapchat'
    | 'other'
  >('facebook');
  const [customAccountType, setCustomAccountType] = useState('');
  const [recoveryReason, setRecoveryReason] = useState<
    'hacked' | 'forgot_password' | 'disabled_deleted' | 'lost_phone_2fa' | 'other_reason'
  >('hacked');

  // 3. General Programming Services States
  const [programmingServiceType, setProgrammingServiceType] = useState<
    | 'mobile_app'
    | 'website_ecommerce'
    | 'mechatronics_software'
    | 'security_audit'
    | 'digital_marketing'
    | 'custom_software'
  >('mobile_app');

  // Common Fields
  const [details, setDetails] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Submitted Success View State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('يرجى كتابة اسمك الكامل ورقم الهاتف لتأكيد تقديم الطلب.');
      return;
    }

    let serviceTitle = '';
    let specSummary = '';

    if (mainCategory === 'data_recovery') {
      const dataLabelMap: Record<string, string> = {
        photos: 'صور (Photos)',
        contacts: 'جهات اتصال (Contacts)',
        videos: 'فيديوهات (Videos)',
        documents: 'مستندات وملفات (Documents)',
        other: `أخرى: ${customDataType || 'غير محدد'}`,
      };
      const finalDataType = dataLabelMap[dataType];
      serviceTitle = `استرداد بيانات - ${finalDataType}`;
      specSummary = `الخدمة: استرداد بيانات مفقودة\nنوع البيانات: ${finalDataType}`;
    } else if (mainCategory === 'account_recovery') {
      const accountLabelMap: Record<string, string> = {
        facebook: 'فيسبوك (Facebook)',
        whatsapp: 'واتساب (WhatsApp)',
        tiktok: 'تيكتوك (TikTok)',
        instagram: 'انستغرام (Instagram)',
        x_twitter: 'منصة إكس / تويتر (X)',
        website: 'موقع إلكتروني (Website)',
        gmail: 'جيمايل / كوكل (Gmail)',
        snapchat: 'سناب شات (Snapchat)',
        other: `حساب آخر: ${customAccountType || 'غير محدد'}`,
      };
      const reasonLabelMap: Record<string, string> = {
        hacked: 'تم اختراقه / تهكيره',
        forgot_password: 'نسيان كلمة السر / فقدان كلمة المرور',
        disabled_deleted: 'تم تعطيله أو حذفه من المنصة',
        lost_phone_2fa: 'فقدان رقم الهاتف / المصادقة الثنائية',
        other_reason: 'سبب آخر',
      };
      const finalAcc = accountLabelMap[accountType];
      const finalReason = reasonLabelMap[recoveryReason];
      serviceTitle = `استرجاع حساب ${finalAcc}`;
      specSummary = `الخدمة: استرجاع حساب مغلق/مخترق\nنوع الحساب: ${finalAcc}\nسبب المشكلة: ${finalReason}`;
    } else {
      const progLabelMap: Record<string, string> = {
        mobile_app: 'برمجة وتطوير تطبيق أندرويد / آيفون',
        website_ecommerce: 'إنشاء موقع إلكتروني / متجر رقمي',
        mechatronics_software: 'تصميم أنظمة ميكاترونكس وسوفتوير',
        security_audit: 'فحص ثغرات وتأمين سيرفرات',
        digital_marketing: 'تسويق رقمي وحلول تقنية',
        custom_software: 'خدمة برمجية خاصة أخرى',
      };
      const finalProg = progLabelMap[programmingServiceType];
      serviceTitle = `خدمة برمجية - ${finalProg}`;
      specSummary = `الخدمة: خدمات جميع البرمجة وتطوير الأنظمة\nنوع المشروع المطلوب: ${finalProg}`;
    }

    const fullFeaturesText = `${specSummary}\nالتفاصيل والملاحظات: ${details || 'لا توجد ملاحظات إضافية'}`;

    // Save request to StoreContext
    addRequest({
      appName: serviceTitle,
      category: 'programming_service',
      features: fullFeaturesText,
      clientName,
      clientPhone,
    });

    const fullFormattedMsg = `مرحباً شركة رقيب برو للبرمجة والتسويق،\nأود طلب (*${serviceTitle}*):\n\n- *الاسم الكامل*: ${clientName}\n- *رقم الهاتف*: ${clientPhone}\n${specSummary}\n- *تفاصيل المشكلة*: ${
      details || 'لا توجد تفاصيل إضافية'
    }\n\nيرجى التواصل معي للبدء في التنفيذ. شكراً لكم!`;

    setSubmittedSummary(fullFormattedMsg);
    setIsSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    window.open(
      `https://wa.me/967${settings.whatsappNumber}?text=${encodeURIComponent(
        submittedSummary
      )}`,
      '_blank'
    );
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setMainCategory('data_recovery');
    setDataType('photos');
    setCustomDataType('');
    setAccountType('facebook');
    setCustomAccountType('');
    setRecoveryReason('hacked');
    setProgrammingServiceType('mobile_app');
    setDetails('');
    setClientName('');
    setClientPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-['Cairo',sans-serif] text-right">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#020d24]/80 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Dialog Window */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#041638] via-[#021029] to-[#01091b] border border-cyan-500/40 text-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] animate-scale-up">
        {/* Modal Ribbon Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#003893] via-[#002266] to-[#010e28] border-b border-cyan-500/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white p-1">
              <Code className="w-6 h-6 text-cyan-100" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white font-['Tajawal'] flex items-center gap-2">
                <span>قسم خدمات البرمجة وحلول الأنظمة</span>
                <span className="text-[10px] bg-cyan-400 text-slate-950 px-2 py-0.5 rounded-full font-black">
                  رقيب برو
                </span>
              </h3>
              <p className="text-xs text-cyan-200">
                استرداد البيانات المفقودة، استرجاع الحسابات المغلقة والمخترقة، وتطوير كافة البرمجيات
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* MAIN SERVICE TYPE SELECTION TABS / DROPDOWN */}
              <div className="p-4 rounded-2xl bg-white/5 border border-cyan-500/20 space-y-2">
                <label className="block text-xs font-bold text-cyan-300">
                  اختر قسم الخدمة البرمجية المطلوب *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMainCategory('data_recovery')}
                    className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2 text-xs font-bold ${
                      mainCategory === 'data_recovery'
                        ? 'bg-blue-600 text-white border-cyan-400 shadow-md shadow-blue-500/30 ring-2 ring-cyan-400/40'
                        : 'bg-[#031333] text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <FolderLock className="w-4 h-4 text-cyan-300 shrink-0" />
                    <span>استرداد بيانات ومستندات</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMainCategory('account_recovery')}
                    className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2 text-xs font-bold ${
                      mainCategory === 'account_recovery'
                        ? 'bg-blue-600 text-white border-cyan-400 shadow-md shadow-blue-500/30 ring-2 ring-cyan-400/40'
                        : 'bg-[#031333] text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <KeyRound className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>استرجاع حسابات</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMainCategory('general_programming')}
                    className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2 text-xs font-bold ${
                      mainCategory === 'general_programming'
                        ? 'bg-blue-600 text-white border-cyan-400 shadow-md shadow-blue-500/30 ring-2 ring-cyan-400/40'
                        : 'bg-[#031333] text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Code className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>جميع خدمات البرمجة</span>
                  </button>
                </div>
              </div>

              {/* 1. DATA RECOVERY SECTION */}
              {mainCategory === 'data_recovery' && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#051c47] to-[#020e24] border border-cyan-500/30 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <Database className="w-4 h-4 text-cyan-300" />
                    <h4 className="font-extrabold text-sm text-cyan-200">
                      تفاصيل خدمة استرداد البيانات المفقودة
                    </h4>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      ما نوع البيانات المراد استردادها؟ *
                    </label>
                    <select
                      value={dataType}
                      onChange={(e) => setDataType(e.target.value as any)}
                      className="w-full bg-[#020d24] border border-cyan-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="photos">📷 صور (Photos)</option>
                      <option value="contacts">📇 جهات اتصال (Contacts)</option>
                      <option value="videos">🎥 فيديوهات (Videos)</option>
                      <option value="documents">📄 مستندات وملفات (Documents)</option>
                      <option value="other">⚙️ أخرى (خدمة بيانات أخرى)</option>
                    </select>
                  </div>

                  {dataType === 'other' && (
                    <div className="animate-scale-up">
                      <label className="block text-xs font-bold text-amber-300 mb-1">
                        اكتب نوع الخدمة / البيانات الأخرى المراد استردادها: *
                      </label>
                      <input
                        type="text"
                        required
                        value={customDataType}
                        onChange={(e) => setCustomDataType(e.target.value)}
                        placeholder="مثال: رسائل وتطبيقات محادثة، تسجيلات صوتية..."
                        className="w-full bg-[#020d24] border border-amber-400/50 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-300"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 2. ACCOUNT RECOVERY SECTION */}
              {mainCategory === 'account_recovery' && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#051c47] to-[#020e24] border border-amber-500/30 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <h4 className="font-extrabold text-sm text-amber-200">
                      تفاصيل خدمة استرجاع الحسابات والمنصات
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5">
                        نوع الحساب المراد استرجاعه: *
                      </label>
                      <select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value as any)}
                        className="w-full bg-[#020d24] border border-cyan-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="facebook">🔵 فيسبوك (Facebook)</option>
                        <option value="whatsapp">🟢 واتساب (WhatsApp)</option>
                        <option value="tiktok">🎵 تيكتوك (TikTok)</option>
                        <option value="instagram">📸 انستغرام (Instagram)</option>
                        <option value="x_twitter">🩵 منصة إكس / تويتر (X / Twitter)</option>
                        <option value="website">🌐 موقع إلكتروني (Website)</option>
                        <option value="gmail">📧 جيمايل / كوكل (Gmail)</option>
                        <option value="snapchat">👻 سناب شات (Snapchat)</option>
                        <option value="other">⚙️ أخرى (نوع حساب آخر)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5">
                        سبب الاسترجاع / المشكلة: *
                      </label>
                      <select
                        value={recoveryReason}
                        onChange={(e) => setRecoveryReason(e.target.value as any)}
                        className="w-full bg-[#020d24] border border-amber-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="hacked">🔓 تم اختراقه / تهكيره (Compromised)</option>
                        <option value="forgot_password">🔑 نسيان كلمة السر / فقدان الوصول</option>
                        <option value="disabled_deleted">🗑️ تم تعطيله أو حذفه من المنصة</option>
                        <option value="lost_phone_2fa">📱 فقدان رقم الهاتف / المصادقة الثنائية</option>
                        <option value="other_reason">⚙️ سبب آخر لحذف/فقدان الحساب</option>
                      </select>
                    </div>
                  </div>

                  {accountType === 'other' && (
                    <div className="animate-scale-up">
                      <label className="block text-xs font-bold text-amber-300 mb-1">
                        اكتب نوع المنصة أو الحساب الآخر المراد استرجاعه: *
                      </label>
                      <input
                        type="text"
                        required
                        value={customAccountType}
                        onChange={(e) => setCustomAccountType(e.target.value)}
                        placeholder="مثال: حساب تليجرام، حساب بنكي، منصة خاصة..."
                        className="w-full bg-[#020d24] border border-amber-400/50 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-300"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 3. GENERAL PROGRAMMING SERVICES SECTION */}
              {mainCategory === 'general_programming' && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#051c47] to-[#020e24] border border-emerald-500/30 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <Code className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-extrabold text-sm text-emerald-200">
                      خدمات البرمجة العامة وتطوير المشاريع
                    </h4>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      حدد الخدمة البرمجية المطلوب تنفيذها: *
                    </label>
                    <select
                      value={programmingServiceType}
                      onChange={(e) => setProgrammingServiceType(e.target.value as any)}
                      className="w-full bg-[#020d24] border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="mobile_app">📱 برمجة وتطوير تطبيق أندرويد / آيفون</option>
                      <option value="website_ecommerce">🌐 إنشاء موقع إلكتروني / متجر رقمي احترافي</option>
                      <option value="mechatronics_software">🖥️ تصميم أنظمة ودوائر ميكاترونكس وسوفتوير</option>
                      <option value="security_audit">🛡️ فحص ثغرات وحماية سيرفرات وتأمين حسابات</option>
                      <option value="digital_marketing">🚀 تسويق رقمي وإعلانات وحلول تقنية</option>
                      <option value="custom_software">⚙️ خدمة برمجية خاصة وفق الطلب</option>
                    </select>
                  </div>
                </div>
              )}

              {/* DETAILS TEXTAREA */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  اكتب تفاصيل المشكلة والملاحظات الإضافية *
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="اكتب اسم المستخدم، رابط الحساب، تاريخ فقدان البيانات، أو مواصفات النظام المطلوب..."
                  className="w-full bg-[#020d24] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* CLIENT NAME & PHONE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/10">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="مثال: المهندس أحمد الكندي"
                    className="w-full bg-[#020d24] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    رقم الهاتف / الواتساب للتواصل *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="771234567"
                    className="w-full bg-[#020d24] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  سيتم حفظ الطلب وإتاحته للتواصل المباشر مع خبراء رقيب برو
                </span>

                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال طلب الخدمة البرمجية</span>
                </button>
              </div>
            </form>
          ) : (
            /* SUBMITTED SUCCESS VIEW */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-extrabold px-3 py-1 rounded-full inline-block">
                  تم استلام طلب الخدمة بنجاح 🎉
                </span>
                <h4 className="text-xl font-black text-white font-['Cairo']">
                  شكراً لك {clientName}!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  تم تسجيل طلبك بنجاح في نظام رقيب برو. يمكنك الآن إرسال التفاصيل مباشرة عبر واتساب لبدء الاسترداد والتنفيذ فوراً.
                </p>
              </div>

              {/* Summary message display box */}
              <div className="p-4 bg-[#020d24] rounded-2xl border border-cyan-500/30 text-right text-xs space-y-2 max-w-lg mx-auto font-mono text-cyan-200 whitespace-pre-line shadow-inner">
                {submittedSummary}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>مراسلة المهندس عبر واتساب فوراً 📲</span>
                </button>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold rounded-2xl transition-colors"
                >
                  تقديم طلب آخر
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-3 bg-white/5 hover:bg-white/15 text-slate-400 text-xs font-bold rounded-2xl transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
