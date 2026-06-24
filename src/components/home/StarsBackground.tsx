export function StarsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden dark:opacity-100 opacity-0 transition-opacity duration-700">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at bottom, #1b1b3a 0%, #090a0f 100%)",
        }}
      />
      <div id="stars" className="absolute inset-0" />
      <div id="stars2" className="absolute inset-0" />
      <div id="stars3" className="absolute inset-0" />
    </div>
  )
}
