export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-0 bottom-0 w-full max-w-[600px] opacity-90 pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Desk */}
      <rect x="280" y="280" width="240" height="12" rx="4" fill="#e5e7eb" />
      <rect x="290" y="292" width="10" height="80" rx="2" fill="#d1d5db" />
      <rect x="500" y="292" width="10" height="80" rx="2" fill="#d1d5db" />

      {/* Laptop screen */}
      <rect x="310" y="220" width="100" height="65" rx="6" fill="#1e293b" />
      <rect x="316" y="226" width="88" height="50" rx="3" fill="#0f172a" />
      <rect x="326" y="240" width="30" height="4" rx="2" fill="#22c55e" />
      <rect x="326" y="250" width="48" height="3" rx="1.5" fill="#475569" />
      <rect x="326" y="257" width="20" height="3" rx="1.5" fill="#475569" />

      {/* Person 1 - coder (left) */}
      <circle cx="330" cy="200" r="14" fill="#fbbf24" />
      <rect x="320" y="210" width="20" height="16" rx="4" fill="#6366f1" />
      {/* Arms typing */}
      <line x1="316" y1="225" x2="325" y2="240" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
      <line x1="340" y1="225" x2="330" y2="240" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />

      {/* Person 2 - designer with tablet (right) */}
      <circle cx="530" cy="190" r="14" fill="#f472b6" />
      <rect x="520" y="200" width="20" height="16" rx="4" fill="#ec4899" />
      {/* Tablet */}
      <rect x="485" y="210" width="40" height="28" rx="4" fill="#1e293b" />
      <rect x="489" y="214" width="32" height="20" rx="2" fill="#f1f5f9" />
      <circle cx="498" cy="221" r="3" fill="#6366f1" />
      <rect x="504" y="219" width="10" height="4" rx="1" fill="#22c55e" />
      {/* Arm */}
      <line x1="543" y1="215" x2="510" y2="225" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" />

      {/* Person 3 - project manager (center back) */}
      <circle cx="430" cy="170" r="14" fill="#60a5fa" />
      <rect x="420" y="180" width="20" height="16" rx="4" fill="#3b82f6" />
      {/* Clipboard */}
      <rect x="440" y="186" width="18" height="22" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="444" y1="192" x2="454" y2="192" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="444" y1="196" x2="452" y2="196" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="444" y1="200" x2="454" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="418" y1="195" x2="443" y2="195" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" />

      {/* Floating elements */}
      {/* Code bracket */}
      <text x="300" y="175" fontSize="18" fill="#22c55e" fontWeight="bold" opacity="0.6">&lt;/&gt;</text>
      {/* Star */}
      <text x="510" y="165" fontSize="16" fill="#fbbf24" opacity="0.6">✦</text>
      {/* Lightbulb */}
      <text x="555" y="230" fontSize="20" fill="#fbbf24" opacity="0.4">💡</text>
      {/* Checkmark */}
      <text x="400" y="155" fontSize="14" fill="#22c55e" opacity="0.5">✓</text>
      {/* Gear */}
      <text x="290" y="230" fontSize="12" fill="#64748b" opacity="0.4">⚙</text>
      {/* Chat bubble */}
      <text x="460" y="158" fontSize="14" fill="#3b82f6" opacity="0.5">💬</text>

      {/* Background circles */}
      <circle cx="200" cy="150" r="80" fill="#22c55e" opacity="0.03" />
      <circle cx="600" cy="280" r="100" fill="#22c55e" opacity="0.03" />
      <circle cx="450" cy="100" r="60" fill="#3b82f6" opacity="0.03" />
    </svg>
  )
}
