import React from 'react';
import {
  Calculator,
  Zap,
  BookOpen,
  Car,
  Shield,
  Scissors,
  Gamepad2,
  Sparkles,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { AndroidApp } from '../data/appsData';

interface AppIconProps {
  app: AndroidApp;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AppIconRenderer: React.FC<AppIconProps> = ({
  app,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl text-base',
    md: 'w-14 h-14 rounded-2xl text-xl',
    lg: 'w-20 h-20 rounded-3xl text-3xl',
    xl: 'w-24 h-24 rounded-3xl text-4xl',
  };

  // Specific high fidelity renderings matching the image
  if (app.iconType === 'rqeeb') {
    return (
      <div
        className={`${sizeClasses[size]} relative flex items-center justify-center bg-gradient-to-br from-[#003893] via-[#0055d4] to-[#00174d] shadow-md border border-cyan-400/40 overflow-hidden ${className}`}
      >
        <span className="font-black text-cyan-300 font-['Tajawal'] tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          R
        </span>
        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-lime-500 rounded-full border-2 border-slate-900" />
      </div>
    );
  }

  if (app.iconType === 'math') {
    return (
      <div
        className={`${sizeClasses[size]} flex flex-col items-center justify-center bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-800 shadow-md border border-sky-300/30 text-white ${className}`}
      >
        <div className="grid grid-cols-2 gap-0.5 text-center font-bold text-[10px] leading-tight">
          <span>+</span>
          <span>÷</span>
          <span>−</span>
          <span>=</span>
        </div>
      </div>
    );
  }

  if (app.iconType === 'flash') {
    return (
      <div
        className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 shadow-md border border-amber-300/40 text-amber-100 ${className}`}
      >
        <Zap className="w-2/3 h-2/3 fill-amber-200 stroke-amber-100 drop-shadow" />
      </div>
    );
  }

  if (app.iconType === 'quran') {
    return (
      <div
        className={`${sizeClasses[size]} flex flex-col items-center justify-center bg-gradient-to-br from-emerald-700 via-teal-800 to-[#043321] shadow-md border border-emerald-300/30 text-amber-300 ${className}`}
      >
        <div className="w-2/3 h-2/3 rounded-full border-2 border-amber-400/70 flex items-center justify-center p-1">
          <BookOpen className="w-full h-full text-amber-300" />
        </div>
      </div>
    );
  }

  if (app.iconType === 'racing') {
    return (
      <div
        className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 shadow-md border border-orange-300/40 text-white ${className}`}
      >
        <Car className="w-2/3 h-2/3 fill-white/20 stroke-white drop-shadow" />
      </div>
    );
  }

  if (app.iconType === 'vpn' || app.iconType === 'security') {
    return (
      <div
        className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-900 shadow-md border border-cyan-400/30 text-cyan-200 ${className}`}
      >
        <Shield className="w-2/3 h-2/3 fill-cyan-400/30 text-cyan-200" />
      </div>
    );
  }

  if (app.iconType === 'video' || app.iconType === 'tools') {
    return (
      <div
        className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-rose-500 via-purple-600 to-amber-600 shadow-md border border-rose-300/40 text-white ${className}`}
      >
        <Scissors className="w-2/3 h-2/3" />
      </div>
    );
  }

  if (app.iconType === 'puzzle') {
    return (
      <div
        className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 shadow-md border border-pink-300/40 text-white ${className}`}
      >
        <Gamepad2 className="w-2/3 h-2/3 fill-white/20" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md ${className}`}
    >
      <Sparkles className="w-1/2 h-1/2" />
    </div>
  );
};
