"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import workspaceImg from "@/Picture/Freelance Workspace Scene (Hero right side).png"
import { StarsBackground } from "@/components/home/StarsBackground"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="relative border-b border-[#d1d9e0] dark:border-[#2a2a3e] overflow-hidden">
      <StarsBackground />
      <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-8 py-28 lg:grid-cols-2">
        <div>
          <p className={`mb-4 text-sm font-medium text-[#7C3AED] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            SkillSwap
          </p>
          <h1 className={`text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0F172A] dark:text-[#f8fafc] sm:text-[72px] transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            From task to done, <span className="text-[#7C3AED]">in one platform</span>
          </h1>
          <p className={`mt-6 max-w-[460px] text-lg text-[#64748B] dark:text-[#94a3b8] transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            Post any job and get it done by vetted professionals.
          </p>
          <div className={`mt-10 flex items-center gap-6 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <Link href="/register" className="btn-glossy">
              Get Started <span>→</span>
            </Link>
            <Link href="/tasks" className="group inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2a2a3e] px-6 py-3 text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc] transition-all duration-200 hover:border-[#CBD5E1] dark:hover:border-[#4a4a6e] hover:bg-[#F8FAFC] dark:hover:bg-[#1e1b4b]">
              Browse Tasks <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
        <div className={`hidden lg:block transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <Image src={workspaceImg} alt="" width={640} height={480} className="w-full h-auto hidden dark:lg:hidden lg:block" priority />
          <div className="hidden dark:lg:flex lg:hidden items-center justify-center w-full h-[400px]">
            <svg viewBox="0 0 500 350" className="w-full max-w-[500px] opacity-30">
              <circle cx="250" cy="100" r="80" stroke="#7C3AED" strokeWidth="1" fill="none" opacity="0.3"/>
              <circle cx="150" cy="280" r="60" stroke="#A78BFA" strokeWidth="1" fill="none" opacity="0.2"/>
              <circle cx="380" cy="220" r="50" stroke="#7C3AED" strokeWidth="1" fill="none" opacity="0.25"/>
              <line x1="100" y1="50" x2="400" y2="50" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15"/>
              <line x1="100" y1="150" x2="400" y2="150" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15"/>
              <line x1="100" y1="250" x2="400" y2="250" stroke="#7C3AED" strokeWidth="0.5" opacity="0.15"/>
              <rect x="230" y="85" width="40" height="30" rx="6" stroke="#7C3AED" strokeWidth="1.5" fill="none" opacity="0.4"/>
              <rect x="135" y="272" width="30" height="16" rx="4" stroke="#A78BFA" strokeWidth="1" fill="none" opacity="0.35"/>
              <rect x="365" y="210" width="30" height="20" rx="4" fill="#7C3AED" opacity="0.15"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
