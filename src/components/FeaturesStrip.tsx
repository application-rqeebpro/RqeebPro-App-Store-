import React from 'react';
import { ShieldCheck, Zap, Headphones, Star, Smartphone, Tablet, Monitor } from 'lucide-react';
import { TRANSLATIONS } from '../data/appsData';

interface FeaturesStripProps {
  lang: 'ar' | 'en';
}

export const FeaturesStrip: React.FC<FeaturesStripProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const features = [
    {
      id: 'safe',
      icon: ShieldCheck,
      circleBg: 'bg-gradient-to-br from-blue-500 to-indigo-700 text-white shadow-blue-400/40',
      title: t.safeReliable,
      sub: t.safeReliableSub,
    },
    {
      id: 'fast',
      icon: Zap,
      circleBg: 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-cyan-400/40',
      title: t.fastDownload,
      sub: t.fastDownloadSub,
    },
    {
      id: 'support',
      icon: Headphones,
      circleBg: 'bg-gradient-to-br from-indigo-500 to-purple-700 text-white shadow-indigo-400/40',
      title: t.techSupport,
      sub: t.techSupportSub,
    },
    {
      id: 'original',
      icon: Star,
      circleBg: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-400/40',
      title: t.origApps,
      sub: t.origAppsSub,
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* 4 Feature Cards Row as in image */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* Colored Circular Icon */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2.5 shadow-md ${feat.circleBg}`}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
              </div>

              {/* Title & Subtitle */}
              <h4 className="font-bold text-slate-900 text-sm sm:text-base font-['Cairo',sans-serif]">
                {feat.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                {feat.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Android Device Compatibility Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm">
        {/* Left / Start: Green Android Bot Icon & text */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center shadow-md shadow-lime-500/30 text-white">
            {/* Android Mascot SVG */}
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 2.23 12.95 2 12 2c-.96 0-1.86.23-2.66.63L7.85 1.14c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 4.26 6 6.01 6 8h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 text-sm sm:text-base font-['Cairo',sans-serif]">
              {t.compatibleAndroid}
            </h5>
            <p className="text-[11px] sm:text-xs text-slate-500">
              {t.compatibleAndroidSub}
            </p>
          </div>
        </div>

        {/* Right / End: Connected Devices with Dotted Line */}
        <div className="flex items-center gap-3 sm:gap-6 relative px-2">
          {/* Mobile */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-300">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium text-slate-600">
              {t.deviceMobile}
            </span>
          </div>

          {/* Dotted separator */}
          <div className="w-6 sm:w-10 border-b-2 border-dotted border-slate-300" />

          {/* Tablet */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-300">
              <Tablet className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium text-slate-600">
              {t.deviceTablet}
            </span>
          </div>

          {/* Dotted separator */}
          <div className="w-6 sm:w-10 border-b-2 border-dotted border-slate-300" />

          {/* Computer */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-300">
              <Monitor className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium text-slate-600">
              {t.devicePC}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
