"use client"

import Link from "next/link"
import { useReveal } from "@/lib/use-reveal"

export function CtaBanner() {
  const { ref, visible } = useReveal()

  return (
    <section ref={ref} className={`py-24 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-4">Get started</p>
        <h2 className="text-[40px] font-bold text-[#0F172A] tracking-[-0.02em]">Ready to get work done?</h2>
        <p className="mt-3 text-base text-[#64748B] max-w-[480px] mx-auto">Join thousands of clients and freelancers already using SkillSwap.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/register" className="btn-glossy">Get Started <span>→</span></Link>
          <Link href="/tasks" className="group inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-all duration-200 hover:border-[#CBD5E1] hover:bg-[#F8FAFC]">
            Browse Tasks
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
