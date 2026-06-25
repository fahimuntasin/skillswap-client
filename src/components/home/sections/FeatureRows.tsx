"use client"

import Link from "next/link"
import { useReveal } from "@/lib/use-reveal"
import { AnimatedLines } from "@/components/home/decor/Decorations"

const features = [
  {
    tag: "Post tasks instantly",
    title: "Get your tasks in front of skilled freelancers",
    desc: "Describe what you need, set a budget and deadline. Freelancers see it immediately and start applying.",
    link: "Post a Task",
    href: "/register",
    bg: "bg-[#F8FAFC] dark:bg-[#0e0e16]",
    reverse: false,
  },
  {
    tag: "Find top talent",
    title: "Hire the best freelancers",
    desc: "Review proposals, compare pricing, check ratings, and hire with confidence. Only pay for work you approve.",
    link: "Browse Freelancers",
    href: "/freelancers",
    bg: "bg-white dark:bg-[#111118]",
    reverse: true,
  },
  {
    tag: "Pay securely",
    title: "Payment held until you're satisfied",
    desc: "Pay via Stripe — funds are held securely until you approve the delivered work. No risk, total transparency.",
    link: "Learn about payments",
    href: "/register",
    bg: "bg-[#F8FAFC] dark:bg-[#0e0e16]",
    reverse: false,
  },
]

function FeatureRow({ f, i }: { f: typeof features[0]; i: number }) {
  const { ref, visible } = useReveal()
  const cardBg = "bg-white dark:bg-[#1c1a3a]"
  const cardBorder = "border-[#d1d9e0] dark:border-[#2a2a3e]"

  return (
    <div ref={ref}>
      {i > 0 && <div className="border-t border-[#d1d9e0] dark:border-[#2a2a3e]" />}
      <div className={`grid items-center gap-8 sm:gap-16 px-4 sm:px-6 py-12 sm:py-24 ${f.bg} ${f.reverse ? "lg:grid-cols-[55%_45%]" : "lg:grid-cols-[45%_55%]"} transition-all duration-700 overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className={f.reverse ? "lg:order-2" : ""}>
          <p className="mb-3 text-sm font-semibold text-[#7C3AED]">{f.tag}</p>
          <h2 className="text-[28px] leading-tight sm:text-[32px] font-bold text-[#0F172A] dark:text-[#f8fafc] tracking-[-0.02em]">{f.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-[#64748B] dark:text-[#94a3b8] max-w-[480px]">{f.desc}</p>
          <Link href={f.href} className="btn-action mt-6">{f.link}<span className="btn-arrow">→</span></Link>
        </div>
          <div className={`rounded-xl border ${cardBorder} ${cardBg} p-4 sm:p-6 ${f.reverse ? "lg:order-1" : ""} overflow-hidden max-w-full sm:max-w-[90%]`}>
          <div className="space-y-3">
            {f.tag.includes("Post") && (
              <div className={`rounded-lg border ${cardBorder} p-4 dark:bg-[#16163a]`}>
                <p className="text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc]">Design a modern landing page</p>
                <p className="text-xs text-[#64748B] dark:text-[#94a3b8] mt-1">Design · $150 budget · Due Jul 15</p>
              </div>
            )}
            {f.tag.includes("top talent") && (
              <>
                <div className={`flex items-center gap-3 rounded-lg border ${cardBorder} p-3 dark:bg-[#16163a]`}>
                  <div className="size-8 rounded-full bg-[#EDE9FE] dark:bg-[#7C3AED]/30 flex items-center justify-center text-xs font-semibold text-[#7C3AED] dark:text-[#c4b5fd]">SC</div>
                  <div><p className="text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc]">Sarah Chen</p><p className="text-xs text-[#64748B] dark:text-[#94a3b8]">UI Designer · $45/hr · 4.9 ★</p></div>
                </div>
                <div className={`flex items-center gap-3 rounded-lg border ${cardBorder} p-3 dark:bg-[#16163a]`}>
                  <div className="size-8 rounded-full bg-[#EDE9FE] dark:bg-[#7C3AED]/30 flex items-center justify-center text-xs font-semibold text-[#7C3AED] dark:text-[#c4b5fd]">AR</div>
                  <div><p className="text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc]">Alex Rivera</p><p className="text-xs text-[#64748B] dark:text-[#94a3b8]">Full-Stack Dev · $55/hr · 4.8 ★</p></div>
                </div>
              </>
            )}
            {f.tag.includes("securely") && (
              <div className={`rounded-lg border ${cardBorder} p-4 text-center dark:bg-[#16163a]`}>
                <p className="text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc]">Secure Payment</p>
                <p className="text-xs text-[#64748B] dark:text-[#94a3b8] mt-1">Pay via Stripe · Funds held until approval</p>
                <p className="text-lg font-bold text-[#0F172A] dark:text-[#f8fafc] mt-2">$150.00</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeatureRows() {
  return (
    <section className="relative border-b border-[#d1d9e0] dark:border-[#2a2a3e] overflow-hidden">
      <AnimatedLines />
      <div className="mx-auto max-w-[1280px] relative">
        {features.map((f, i) => <FeatureRow key={i} f={f} i={i} />)}
      </div>
    </section>
  )
}
