import React from 'react';

interface RqeebLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const STORE_LOGO_IMAGE = '/assets/aistudio/IMG_________________3d5e013c.png';

export const RqeebLogo: React.FC<RqeebLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-9 h-9 rounded-xl', img: 'w-full h-full', textTitle: 'text-sm', textSub: 'text-[11px]' },
    md: { box: 'w-12 h-12 rounded-2xl', img: 'w-full h-full', textTitle: 'text-base', textSub: 'text-xs' },
    lg: { box: 'w-20 h-20 rounded-3xl', img: 'w-full h-full', textTitle: 'text-2xl', textSub: 'text-sm' },
    xl: { box: 'w-28 h-28 rounded-3xl', img: 'w-full h-full', textTitle: 'text-3xl', textSub: 'text-base' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Logo Image Container with Cyan Ambient Glow */}
      <div className={`relative ${currentSize.box} shrink-0 bg-[#021333] border border-cyan-400/50 shadow-[0_4px_20px_rgba(0,180,255,0.35)] overflow-hidden transition-transform duration-300 hover:scale-105 flex items-center justify-center p-0.5`}>
        {/* Glow ambient aura */}
        <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-sm animate-pulse" />

        {/* Logo Image */}
        <img
          src={STORE_LOGO_IMAGE}
          alt="لوجو متجر رقيب برو Tech Mark"
          className="relative z-10 w-full h-full object-cover rounded-xl"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1">
            <span className={`font-black tracking-tight text-white font-['Tajawal',sans-serif] ${currentSize.textTitle} drop-shadow-sm`}>
              Rqeeb Pro Tech Mark
            </span>
          </div>
          <span className={`text-cyan-300 font-bold tracking-wide font-['Cairo',sans-serif] ${currentSize.textSub}`}>
            تطبيقات وخدمات رقيب برو
          </span>
        </div>
      )}
    </div>
  );
};
