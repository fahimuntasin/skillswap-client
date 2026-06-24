"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { StarsBackground } from "@/components/home/StarsBackground"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="relative border-b border-[#d1d9e0] dark:border-[#2a2a3e] overflow-hidden">
      <StarsBackground />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.07)_0%,transparent_60%)] dark:bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.05)_0%,transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-8 py-36 text-center">
        <p className={`mb-4 text-sm font-medium text-[#7C3AED] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          SkillSwap
        </p>
        <h1 className={`mx-auto max-w-[800px] text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0F172A] dark:text-[#f8fafc] sm:text-[72px] transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          From task to done, <span className="text-[#7C3AED]">in one platform</span>
        </h1>
        <p className={`mx-auto mt-6 max-w-[500px] text-lg text-[#64748B] dark:text-[#94a3b8] transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          Post any job and get it done by vetted professionals.
        </p>
        <div className={`mt-10 flex items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <Link href="/register" className="btn-glossy">Get Started →</Link>
          <Link href="/tasks" className="group inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2a2a3e] px-6 py-3 text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc] transition-all duration-200 hover:border-[#CBD5E1] dark:hover:border-[#4a4a6e] hover:bg-[#F8FAFC] dark:hover:bg-[#1e1b4b]">
            Browse Tasks <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
