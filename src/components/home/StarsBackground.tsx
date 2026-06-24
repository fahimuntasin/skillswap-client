export function StarsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 dark:opacity-100 opacity-0 transition-opacity duration-700">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#1b1635_0%,#090a0f_100%)]" />
      <div id="stars" className="absolute inset-0" />
      <div id="stars2" className="absolute inset-0" />
      <div id="stars3" className="absolute inset-0" />
    </div>
  )
}
