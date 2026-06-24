export function AuthIllustration() {
  return (
    <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px] h-auto ml-auto opacity-30">
      {/* Large circular gradient */}
      <circle cx="280" cy="100" r="180" fill="url(#g1)" opacity="0.3" />
      <circle cx="120" cy="380" r="120" fill="url(#g2)" opacity="0.2" />
      <circle cx="320" cy="420" r="80" fill="url(#g1)" opacity="0.25" />

      {/* Grid lines */}
      <line x1="40" y1="60" x2="360" y2="60" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15" />
      <line x1="40" y1="140" x2="360" y2="140" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15" />
      <line x1="40" y1="220" x2="360" y2="220" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15" />
      <line x1="40" y1="300" x2="360" y2="300" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15" />
      <line x1="40" y1="380" x2="360" y2="380" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15" />
      <line x1="100" y1="20" x2="100" y2="460" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15" />
      <line x1="200" y1="20" x2="200" y2="460" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15" />
      <line x1="300" y1="20" x2="300" y2="460" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15" />

      {/* Floating connected nodes */}
      <circle cx="100" cy="140" r="6" fill="#7C3AED" opacity="0.5" />
      <circle cx="200" cy="60" r="4" fill="#7C3AED" opacity="0.4" />
      <circle cx="300" cy="140" r="8" fill="#7C3AED" opacity="0.6" />
      <circle cx="140" cy="300" r="5" fill="#7C3AED" opacity="0.45" />
      <circle cx="260" cy="300" r="7" fill="#7C3AED" opacity="0.55" />
      <circle cx="200" cy="380" r="5" fill="#7C3AED" opacity="0.4" />
      <circle cx="320" cy="380" r="6" fill="#7C3AED" opacity="0.5" />

      {/* Connecting dashed lines */}
      <path d="M100 140 Q150 100 200 60" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
      <path d="M200 60 Q250 100 300 140" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
      <path d="M300 140 Q220 220 260 300" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
      <path d="M140 300 Q170 340 200 380" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
      <path d="M200 380 Q280 350 320 380" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />

      {/* Decorative elements */}
      <rect x="85" y="132" width="30" height="16" rx="4" stroke="#7C3AED" strokeWidth="1.5" fill="none" opacity="0.35" />
      <rect x="280" y="130" width="40" height="20" rx="5" fill="#7C3AED" opacity="0.15" />
      <rect x="125" y="290" width="30" height="20" rx="4" stroke="#7C3AED" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="60" cy="250" r="3" fill="#7C3AED" opacity="0.3" />
      <circle cx="340" cy="250" r="3" fill="#7C3AED" opacity="0.3" />
      <circle cx="160" cy="420" r="3" fill="#7C3AED" opacity="0.25" />

      <defs>
        <radialGradient id="g1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g2" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
