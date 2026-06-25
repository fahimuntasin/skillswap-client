"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { StarsBackground } from "@/components/home/StarsBackground"

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 })
      gsap.fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 })
      gsap.fromTo(".hero-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 })
      gsap.fromTo(".hero-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.9 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative border-b border-[#d1d9e0] dark:border-[#2a2a3e] overflow-hidden">
      <StarsBackground />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.07)_0%,transparent_60%)] dark:bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-8 py-20 sm:py-36 text-center">
        <p className="hero-badge mb-4 text-sm font-medium text-[#7C3AED]">SkillSwap</p>
        <h1 className="hero-title mx-auto max-w-[800px] text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0F172A] dark:text-[#f8fafc] sm:text-[56px] lg:text-[72px]">
          Get your tasks done by <span className="text-[#7C3AED]">skilled freelancers</span>
        </h1>
        <p className="hero-sub mx-auto mt-6 max-w-[500px] text-lg text-[#64748B] dark:text-[#94a3b8]">
          Post any job and get it done by vetted professionals.
        </p>
        <div className="hero-buttons mt-10 flex items-center justify-center gap-4">
          <Link href="/register" className="btn-glossy gsap-hover">Get Started →</Link>
          <Link href="/tasks" className="group inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2a2a3e] px-6 py-3 text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc] transition-all duration-200 hover:border-[#CBD5E1] dark:hover:border-[#4a4a6e] hover:bg-[#F8FAFC] dark:hover:bg-[#1e1b4b] gsap-hover">
            Browse Tasks <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
