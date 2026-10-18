import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Phone,
  KeyRound,
  ShieldAlert,
  X,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { credentials, loginOwner } = useStore();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [extraPassword, setExtraPassword] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [showExtraPass, setShowExtraPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      const ok = loginOwner({
        email,
        phone,
        password,
        extraPassword,
      });

      if (ok) {
        setIsVerifying(false);
        onSuccess();
      } else {
        setIsVerifying(false);
        setErrorMsg('البيانات المدخلة غير صحيحة! يرجى التأكد من البريد ورقم الهاتف وكلمتي المرور.');
      }
    }, 600);
  };

  const handleFillDefaults = () => {
    setEmail(credentials.email);
    setPhone(credentials.phone);
    setPassword(credentials.password);
    setExtraPassword(credentials.extraPassword);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-['Cairo',sans-serif]">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Dark Navy / Cyan glow */}
        <div className="relative bg-gradient-to-r from-[#00173d] via-[#05265e] to-[#011438] p-5 sm:p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>الوصول المصرح للمالك</span>
              </div>
              <h3 className="text-xl font-black font-['Tajawal',sans-serif]">
                تسجيل الدخول إلى لوحة المالك
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            تم فتح قفل المالك بنجاح عبر الضغط المطول. يرجى إدخال البيانات الأمنية الأربعة للمتابعة:
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Email field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              البريد الإلكتروني للمالك
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rqeebinstagram@gmail.com"
                className="w-full pl-3 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-left"
                dir="ltr"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* 2. Phone field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              رقم الهاتف المسجل
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="785502919"
                className="w-full pl-3 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-left"
                dir="ltr"
              />
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* 3. Primary Password field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              كلمة السر الأساسية
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-left"
                dir="ltr"
              />
              <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 4. Extra Security Password field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              كلمة المرور الإضافية (مفتاح الحماية)
            </label>
            <div className="relative">
              <input
                type={showExtraPass ? 'text' : 'password'}
                required
                value={extraPassword}
                onChange={(e) => setExtraPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-left"
                dir="ltr"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowExtraPass(!showExtraPass)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showExtraPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Default Credentials quick-hint and auto-fill helper */}
          <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-200/70 text-slate-700 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 text-[11px]">
                بيانات الدخول الافتراضية للمالك:
              </span>
              <button
                type="button"
                onClick={handleFillDefaults}
                className="text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-white px-2 py-0.5 rounded-lg border border-blue-200 shadow-xs hover:shadow"
              >
                تعبئة تلقائية
              </button>
            </div>
            <div className="text-[11px] font-mono text-slate-600 space-y-0.5 leading-tight text-left" dir="ltr">
              <div>Email: {credentials.email}</div>
              <div>Phone: {credentials.phone}</div>
              <div>Pass: {credentials.password} | Extra: {credentials.extraPassword}</div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>دخول لوحة تحكم المالك</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
