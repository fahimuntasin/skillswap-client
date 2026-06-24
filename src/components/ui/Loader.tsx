"use client"

export function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative flex items-center justify-center w-[180px] h-[180px] rounded-full select-none">
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full animate-[loader-rotate_2s_linear_infinite]" />
        {/* Letters */}
        {["S","k","i","l","l","S","w","a","p"].map((l, i) => (
          <span
            key={i}
            className="inline-block opacity-40 animate-[loader-letter-anim_2s_infinite] text-white text-[1.2em] font-light z-10"
            style={{ animationDelay: `${i * 0.1}s`, position: "absolute", transform: `rotate(${i * 36}deg) translateY(-60px)` }}
          >
            {l}
          </span>
        ))}
        {/* Center dot */}
        <div className="absolute w-4 h-4 rounded-full bg-violet-500 shadow-[0_0_20px_#7c3aed] z-10" />
      </div>
      <style jsx>{`
        @keyframes loader-rotate {
          0% { transform: rotate(90deg); box-shadow: 0 10px 20px 0 #fff inset, 0 20px 30px 0 #ad5fff inset, 0 60px 60px 0 #471eec inset; }
          50% { transform: rotate(270deg); box-shadow: 0 10px 20px 0 #fff inset, 0 20px 10px 0 #d60a47 inset, 0 40px 60px 0 #311e80 inset; }
          100% { transform: rotate(450deg); box-shadow: 0 10px 20px 0 #fff inset, 0 20px 30px 0 #ad5fff inset, 0 60px 60px 0 #471eec inset; }
        }
        @keyframes loader-letter-anim {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          20% { opacity: 1; transform: scale(1.15); }
          40% { opacity: 0.7; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
