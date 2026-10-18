import React from 'react';

interface RqeebLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const RqeebLogo: React.FC<RqeebLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-sm' },
    md: { icon: 46, text: 'text-base' },
    lg: { icon: 84, text: 'text-2xl' },
    xl: { icon: 140, text: 'text-4xl' },
  };

  const { icon: iconSize } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Faceted Glowing "R" Mark with Android Mascot peek */}
      <div
        className="relative flex items-center justify-center transition-transform hover:scale-105 duration-300"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Glow ambient aura */}
        <div className="absolute inset-0 bg-cyan-400/30 rounded-2xl blur-lg animate-pulse" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,140,255,0.4)] relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for faceted 3D "R" */}
            <linearGradient id="facetDarkBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0044cc" />
              <stop offset="50%" stopColor="#002688" />
              <stop offset="100%" stopColor="#001242" />
            </linearGradient>

            <linearGradient id="facetCyan" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00b4d8" />
              <stop offset="60%" stopColor="#0077b6" />
              <stop offset="100%" stopColor="#03045e" />
            </linearGradient>

            <linearGradient id="facetHighlight" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#48cae4" />
              <stop offset="100%" stopColor="#0077b6" />
            </linearGradient>

            <linearGradient id="facetNeonLoop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#90e0ef" />
              <stop offset="40%" stopColor="#0096c7" />
              <stop offset="100%" stopColor="#023e8a" />
            </linearGradient>

            <linearGradient id="androidGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#76c820" />
              <stop offset="100%" stopColor="#439b00" />
            </linearGradient>

            <linearGradient id="swirlRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#00bbf9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0077b6" stopOpacity="0" />
            </linearGradient>

            {/* Glass shine filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Curved Swoosh / Orbital Ring under the R */}
          <path
            d="M 12 75 C 8 50, 30 18, 62 14 C 84 12, 94 28, 90 46 C 84 68, 54 86, 24 88 C 15 88, 10 82, 12 75 Z"
            fill="none"
            stroke="url(#swirlRing)"
            strokeWidth="5"
            strokeLinecap="round"
            className="opacity-80"
          />

          {/* Background Rounded Shield Tile */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="22"
            fill="url(#facetDarkBlue)"
            stroke="#0096c7"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Top highlight glare */}
          <path
            d="M 10 24 C 10 16 16 10 24 10 L 76 10 C 84 10 90 16 90 24 L 90 34 C 60 22 40 38 10 34 Z"
            fill="white"
            fillOpacity="0.12"
          />

          {/* 3D Geometric Faceted 'R' Structure */}
          {/* Main Stem (Vertical Spine of R) */}
          <polygon points="26,22 44,22 44,78 26,78" fill="url(#facetNeonLoop)" />
          <polygon points="26,22 36,22 36,78 26,78" fill="url(#facetHighlight)" />

          {/* Top Loop of 'R' */}
          <path
            d="M 44 22 L 64 22 C 75 22 82 28 82 38 C 82 48 74 54 62 54 L 44 54 Z"
            fill="url(#facetCyan)"
          />
          {/* Top Loop Inner Cutout */}
          <path
            d="M 44 32 L 60 32 C 67 32 70 34 70 38 C 70 42 67 44 60 44 L 44 44 Z"
            fill="#051638"
          />

          {/* Angular Highlight Wedge on Upper Loop */}
          <polygon points="44,22 66,22 60,32 44,32" fill="white" fillOpacity="0.35" />

          {/* Diagonal 3D Leg of 'R' */}
          <polygon points="46,52 62,52 82,78 66,78" fill="url(#facetNeonLoop)" />
          <polygon points="58,52 62,52 82,78 78,78" fill="white" fillOpacity="0.3" />

          {/* Yellow/Golden Play accent inside cutout */}
          <polygon points="50,34 50,42 58,38" fill="#ffd166" />

          {/* Android Green Mascot Silhouette Peek at bottom-right of R */}
          <g transform="translate(62, 54) scale(0.38)">
            {/* Robot Head */}
            <path
              d="M 10 30 A 20 20 0 0 1 50 30 Z"
              fill="url(#androidGreen)"
              stroke="#2e6d00"
              strokeWidth="1.5"
            />
            {/* Eyes */}
            <circle cx="22" cy="22" r="2.5" fill="white" />
            <circle cx="38" cy="22" r="2.5" fill="white" />
            {/* Antennas */}
            <line x1="18" y1="14" x2="12" y2="6" stroke="#5da812" strokeWidth="3" strokeLinecap="round" />
            <line x1="42" y1="14" x2="48" y2="6" stroke="#5da812" strokeWidth="3" strokeLinecap="round" />
            {/* Robot Torso */}
            <rect x="10" y="34" width="40" height="28" rx="4" fill="url(#androidGreen)" />
            {/* Arms */}
            <rect x="1" y="34" width="6" height="22" rx="3" fill="url(#androidGreen)" />
            <rect x="53" y="34" width="6" height="22" rx="3" fill="url(#androidGreen)" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-white font-['Tajawal',sans-serif] text-lg sm:text-xl drop-shadow-sm">
              Rqeeb Pro Apps
            </span>
          </div>
          <span className="text-cyan-300 font-semibold text-xs sm:text-sm tracking-wide font-['Cairo',sans-serif]">
            تطبيقات رقيب برو
          </span>
        </div>
      )}
    </div>
  );
};
