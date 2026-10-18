import React from 'react';
import { Gamepad2, GraduationCap, Briefcase, Trophy } from 'lucide-react';
import { AndroidApp } from '../data/appsData';

interface SideDisplayCardProps {
  onSelectCategory: (cat: string) => void;
  onSelectApp: (appId: string) => void;
}

export const SideDisplayCard: React.FC<SideDisplayCardProps> = ({
  onSelectCategory,
  onSelectApp,
}) => {
  return (
    <div className="relative w-64 xl:w-72 hidden md:flex flex-col gap-3 select-none transform rotate-y-[-12deg] rotate-x-[4deg] perspective-1000 transition-all duration-500 hover:rotate-y-[-6deg]">
      {/* 1. Racing Game Banner (Top as in image) */}
      <div
        onClick={() => onSelectApp('racing-game')}
        className="group relative h-28 rounded-2xl overflow-hidden shadow-lg border border-white/60 cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
      >
        <img
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format&fit=crop&q=80"
          alt="Racing Game"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-between p-3 text-white">
          <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide font-['Tajawal']">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Racing Game</span>
          </div>
          <span className="text-[10px] bg-red-600/90 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            HOT
          </span>
        </div>
      </div>

      {/* 2. Educational Apps Card */}
      <div
        onClick={() => onSelectCategory('education')}
        className="group relative h-24 rounded-2xl overflow-hidden shadow-md border border-cyan-300/40 cursor-pointer bg-gradient-to-br from-blue-700 via-indigo-800 to-sky-900 transition-transform duration-300 hover:scale-[1.03]"
      >
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl" />
        <div className="relative h-full flex items-center justify-between p-3.5 text-white">
          <div className="space-y-0.5 text-right">
            <span className="text-[11px] text-cyan-300 font-medium block">
              دروس وتطوير المهارات
            </span>
            <h5 className="font-extrabold text-base font-['Cairo',sans-serif]">
              تطبيقات تعليمية
            </h5>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-cyan-300 group-hover:rotate-12 transition-transform">
            <GraduationCap className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* 3. Utility Apps Card */}
      <div
        onClick={() => onSelectCategory('utility')}
        className="group relative h-24 rounded-2xl overflow-hidden shadow-md border border-amber-300/40 cursor-pointer bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 transition-transform duration-300 hover:scale-[1.03]"
      >
        <div className="relative h-full flex items-center justify-between p-3.5 text-white">
          <div className="space-y-0.5 text-right">
            <span className="text-[11px] text-amber-100 font-medium block">
              أدوات وإنتاجية الهاتف
            </span>
            <h5 className="font-extrabold text-base font-['Cairo',sans-serif]">
              تطبيقات خدمية
            </h5>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 text-white group-hover:rotate-12 transition-transform">
            <Briefcase className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* 4. Fun Games Card (Bottom) */}
      <div
        onClick={() => onSelectCategory('games')}
        className="group relative h-24 rounded-2xl overflow-hidden shadow-md border border-purple-400/40 cursor-pointer bg-gradient-to-br from-purple-700 via-fuchsia-700 to-indigo-900 transition-transform duration-300 hover:scale-[1.03]"
      >
        <div className="relative h-full flex items-center justify-between p-3.5 text-white">
          <div className="space-y-0.5 text-right">
            <span className="text-[11px] text-purple-200 font-medium block">
              أحدث وأفضل الألعاب
            </span>
            <h5 className="font-extrabold text-base font-['Cairo',sans-serif]">
              ألعاب ممتعة
            </h5>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 text-fuchsia-200 group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-7 h-7" />
          </div>
        </div>
      </div>
    </div>
  );
};
