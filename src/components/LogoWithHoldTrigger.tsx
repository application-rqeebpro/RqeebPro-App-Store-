import React, { useState, useRef, useEffect } from 'react';
import { RqeebLogo } from './RqeebLogo';
import { Lock, ShieldCheck, KeyRound } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface LogoWithHoldTriggerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  onTriggerAuth: () => void;
  className?: string;
  onClickStandard?: () => void;
}

export const LogoWithHoldTrigger: React.FC<LogoWithHoldTriggerProps> = ({
  size = 'md',
  showText = true,
  onTriggerAuth,
  className = '',
  onClickStandard,
}) => {
  const { isOwnerLoggedIn } = useStore();
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100%
  const [secondsHeld, setSecondsHeld] = useState(0); // 0 to 20
  const [isHolding, setIsHolding] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const HOLD_DURATION_MS = 20000; // Exact 20 seconds as requested!

  const startHold = (e: React.SyntheticEvent) => {
    // If owner is already logged in, normal click can open or we still allow hold
    setIsHolding(true);
    setHoldProgress(0);
    setSecondsHeld(0);
    startTimeRef.current = Date.now();

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min((elapsed / HOLD_DURATION_MS) * 100, 100);
      const secs = Math.floor(elapsed / 1000);

      setHoldProgress(progress);
      setSecondsHeld(secs);

      if (elapsed >= HOLD_DURATION_MS) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsHolding(false);
        setHoldProgress(0);
        setSecondsHeld(0);
        // Trigger haptic if available
        if (navigator.vibrate) navigator.vibrate(200);
        onTriggerAuth();
      }
    }, 100);
  };

  const cancelHold = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const elapsed = Date.now() - startTimeRef.current;
    setIsHolding(false);
    setHoldProgress(0);
    setSecondsHeld(0);

    // If it was a quick tap (< 500ms), execute standard click if provided
    if (elapsed < 500 && onClickStandard) {
      onClickStandard();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      onTouchCancel={cancelHold}
      className={`relative cursor-pointer select-none group inline-flex items-center ${className}`}
    >
      {/* 20-Second Circular Progress Ring (Appears when holding) */}
      {isHolding && (
        <div className="absolute -inset-2.5 flex items-center justify-center pointer-events-none z-30">
          <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="rgba(0, 200, 255, 0.2)"
              strokeWidth="5"
              fill="none"
            />
            {/* Animated filling stroke */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#00f5d4"
              strokeWidth="5"
              strokeDasharray="276"
              strokeDashoffset={276 - (276 * holdProgress) / 100}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-100 drop-shadow-[0_0_8px_#00f5d4]"
            />
          </svg>
        </div>
      )}

      {/* Floating Counter Badge during Hold */}
      {isHolding && (
        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-slate-900/95 text-cyan-300 border border-cyan-400 text-[11px] font-bold px-3 py-1 rounded-full shadow-2xl flex items-center gap-1.5 whitespace-nowrap z-40 animate-pulse font-['Cairo']">
          <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
          <span>التحقق من المالك: {secondsHeld} / 20 ثانية</span>
        </div>
      )}

      {/* The Actual Logo */}
      <RqeebLogo size={size} showText={showText} />

      {/* If Owner is already logged in: Show small green badge */}
      {isOwnerLoggedIn && (
        <span
          title="أنت مسجل الدخول كمالك للمتجر"
          className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-sm animate-pulse"
        />
      )}
    </div>
  );
};
