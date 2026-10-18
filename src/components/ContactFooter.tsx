import React, { useState } from 'react';
import {
  Phone,
  Send,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { TRANSLATIONS } from '../data/appsData';
import { useStore } from '../context/StoreContext';

interface ContactFooterProps {
  lang: 'ar' | 'en';
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ lang }) => {
  const { settings } = useStore();
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(settings.whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    window.open(`https://wa.me/967${settings.whatsappNumber}`, '_blank');
  };

  return (
    <footer id="contact-section" className="w-full pt-4 pb-8 select-none">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 px-4 py-4 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm">
        {/* 1. WhatsApp Contact Widget (Left side as in screenshot) */}
        <div
          onClick={handleOpenWhatsApp}
          className="group relative flex items-center gap-3.5 px-4 py-3 bg-gradient-to-r from-emerald-50 to-green-100/70 border border-emerald-300 rounded-2xl cursor-pointer hover:shadow-md hover:border-emerald-400 transition-all duration-300 w-full sm:w-auto"
        >
          {/* Green WhatsApp Circle Icon */}
          <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-500/40 group-hover:scale-105 transition-transform shrink-0">
            {/* WhatsApp Phone Logo */}
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.22-1.15l-.3-.18-3.13.82.83-3.05-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.24-8.19 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7 2.46 1.06 2.46.71 2.9.67.44-.04 1.47-.6 1.68-1.18.2-.59.2-1.09.14-1.19-.06-.1-.22-.16-.47-.28z" />
            </svg>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold text-emerald-800 font-['Cairo']">
              {t.contactWhatsapp}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-wider font-mono">
                {settings.whatsappNumber || t.whatsappNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyNumber}
                title="نسخ الرقم"
                className="p-1 text-slate-500 hover:text-emerald-700 rounded-lg hover:bg-emerald-200/50 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {copied && (
            <span className="absolute -top-3 left-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
              {t.copied}
            </span>
          )}
        </div>

        {/* 2. Social Media Channels (Center) */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-slate-600 font-['Cairo']">
            {t.followUs}
          </span>
          <div className="flex items-center gap-2.5">
            {/* Telegram */}
            <a
              href="https://t.me/rqeebpro"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              title="Telegram"
            >
              <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-sm hover:scale-110 transition-transform shadow-sm font-['Tajawal']"
              title="Facebook"
            >
              f
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-black text-xs hover:scale-110 transition-transform shadow-sm"
              title="X (Twitter)"
            >
              𝕏
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/rqeebpro"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              title="YouTube"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
          <span className="text-xs font-semibold text-slate-800 font-mono tracking-wider">
            {t.socialHandle}
          </span>
        </div>

        {/* 3. Slogan (Right side as in screenshot) */}
        <div className="text-center lg:text-left">
          <p className="text-lg sm:text-xl font-extrabold text-[#002666] font-['Cairo',sans-serif] tracking-wide">
            {t.slogan}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            جميع الحقوق محفوظة © رقيب برو {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};
