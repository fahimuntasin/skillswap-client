"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import workspaceImg from "@/Picture/Freelance Workspace Scene (Hero right side).png"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="border-b border-[#d1d9e0]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-8 py-28 lg:grid-cols-2">
        <div>
          <p className={`mb-4 text-sm font-medium text-[#7C3AED] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            SkillSwap
          </p>
          <h1 className={`text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0F172A] sm:text-[72px] transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            From task to done, <span className="text-[#7C3AED]">in one platform</span>
          </h1>
          <p className={`mt-6 max-w-[460px] text-lg text-[#64748B] transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            Post any job and get it done by vetted professionals.
          </p>
          <div className={`mt-10 flex items-center gap-6 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <Link href="/register" className="btn-glossy">
              Get Started <span>→</span>
            </Link>
            <Link href="/tasks" className="group inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-all duration-200 hover:border-[#CBD5E1] hover:bg-[#F8FAFC]">
              Browse Tasks <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
        <div className={`hidden lg:block transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <Image src={workspaceImg} alt="" width={640} height={480} className="w-full h-auto" priority />
        </div>
      </div>
    </section>
  )
}
