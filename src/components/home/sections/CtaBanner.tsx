"use client"

import Link from "next/link"

export function CtaBanner() {
  return (
    <section className="py-24 text-center">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="gsap-heading text-sm font-semibold text-[#7C3AED] mb-4">Get started</p>
        <h2 className="gsap-heading text-[40px] font-bold text-[#0F172A] dark:text-[#f8fafc] tracking-[-0.02em]">Ready to get work done?</h2>
        <p className="gsap-heading mt-3 text-base text-[#64748B] dark:text-[#94a3b8] max-w-[480px] mx-auto">Join thousands of clients and freelancers already using SkillSwap.</p>
        <div className="gsap-cta mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/register" className="btn-glossy gsap-hover">Get Started →</Link>
          <Link href="/tasks" className="btn-sweep gsap-hover">Browse Tasks →</Link>
        </div>
      </div>
    </section>
  )
}
