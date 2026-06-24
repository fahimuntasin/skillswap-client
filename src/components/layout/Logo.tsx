export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="130"
      height="26"
      viewBox="0 0 320 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(8,8)">
        <rect x="10" y="10" width="24" height="24" rx="6" transform="rotate(-45 22 22)" stroke="#7C3AED" strokeWidth="2" fill="none" />
        <rect x="18" y="18" width="24" height="24" rx="6" transform="rotate(-45 30 30)" fill="#7C3AED" />
        <path d="M28 18 C24 18 22 20 22 23 C22 26 24 27 28 28 C32 29 34 30 34 33 C34 36 31 38 27 38 C24 38 21 37 19 35" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
      <text x="72" y="42" fontFamily="Inter, system-ui, sans-serif" fontSize="28" fontWeight="600" fill="#0F172A">Skill</text>
      <text x="136" y="42" fontFamily="Inter, system-ui, sans-serif" fontSize="28" fontWeight="600" fill="#7C3AED">Swap</text>
    </svg>
  )
}
