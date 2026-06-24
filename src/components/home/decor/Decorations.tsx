export function DottedGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#7C3AED"/></pattern></defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  )
}

export function GlowOrb({ className }: { className?: string }) {
  return <div className={`absolute rounded-full blur-[80px] pointer-events-none ${className}`} />
}

export function AnimatedLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" viewBox="0 0 1200 600" preserveAspectRatio="none">
      <path d="M0 300 Q300 100 600 300 T1200 200" stroke="#7C3AED" strokeWidth="1" fill="none" strokeDasharray="8 12" className="animate-dash" />
      <path d="M0 350 Q300 500 600 350 T1200 450" stroke="#A78BFA" strokeWidth="1" fill="none" strokeDasharray="4 16" className="animate-dash-reverse" />
    </svg>
  )
}
