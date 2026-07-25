import React from 'react';

const Logo = ({ size = 40, showText = true, light = false }) => (
  <div className="flex items-center gap-2.5 select-none">
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crossGradLight" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={light ? 'rgba(255,255,255,0.95)' : '#64B5F6'} />
          <stop offset="100%" stopColor={light ? 'rgba(255,255,255,0.8)' : '#1565C0'} />
        </linearGradient>
      </defs>
      <rect x="35" y="10" width="30" height="80" rx="9" fill="url(#crossGradLight)" />
      <rect x="10" y="35" width="80" height="30" rx="9" fill="url(#crossGradLight)" />
      <path d="M15 60 Q38 24 84 46" stroke={light ? 'rgba(255,255,255,0.95)' : 'white'} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M20 70 Q46 36 90 56" stroke={light ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.55)'} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="85" cy="37" r="5.5" fill={light ? 'rgba(255,255,255,0.95)' : '#0D47A1'} />
      <circle cx="77" cy="29" r="4" fill={light ? 'rgba(255,255,255,0.65)' : '#64B5F6'} />
    </svg>

    {showText && (
      <div>
        <div
          style={{ fontSize: size * 0.55, fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1 }}
          className={light ? 'text-white' : 'text-gradient-blue'}
        >
          Hyontrax
        </div>
        <div
          style={{ fontSize: size * 0.26 }}
          className={`font-medium mt-px ${light ? 'text-white/65' : 'text-slate-400'}`}
        >
          Health Awareness
        </div>
      </div>
    )}
  </div>
);

export default Logo;
