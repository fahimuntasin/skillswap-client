"use client"

import Link from "next/link"
import { useReveal } from "@/lib/use-reveal"

const features = [
  {
    tag: "Post tasks instantly",
    title: "Get your tasks in front of skilled freelancers",
    desc: "Describe what you need, set a budget and deadline. Freelancers see it immediately and start applying.",
    link: "Post a Task",
    href: "/register",
    bg: "bg-[#F8FAFC]",
    reverse: false,
  },
  {
    tag: "Find top talent",
    title: "Hire the best freelancer for every job",
    desc: "Review proposals, compare pricing, check ratings, and hire with confidence. Only pay for work you approve.",
    link: "Browse Freelancers",
    href: "/freelancers",
    bg: "bg-white",
    reverse: true,
  },
  {
    tag: "Pay securely",
    title: "Payment held until you're satisfied",
    desc: "Pay via Stripe — funds are held securely until you approve the delivered work. No risk, total transparency.",
    link: "Learn about payments",
    href: "/register",
    bg: "bg-[#F8FAFC]",
    reverse: false,
  },
]

function FeatureRow({ f, i }: { f: typeof features[0]; i: number }) {
  const { ref, visible } = useReveal()

  return (
    <div ref={ref}>
      {i > 0 && <div className="border-t border-[#d1d9e0]" />}
      <div className={`grid items-center gap-16 px-6 py-24 ${f.bg} ${f.reverse ? "lg:grid-cols-[55%_45%]" : "lg:grid-cols-[45%_55%]"} transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className={`relative ${f.reverse ? "lg:order-2" : ""} ${f.reverse ? "lg:pl-0 lg:border-l-0" : "lg:border-r border-[#d1d9e0]"}`}>
          <p className="mb-3 text-sm font-semibold text-[#7C3AED]">{f.tag}</p>
          <h2 className="text-[32px] font-bold text-[#0F172A] tracking-[-0.02em] leading-[1.2]">{f.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-[#64748B] max-w-[480px]">{f.desc}</p>
          <Link href={f.href} className="btn-action mt-6">
            {f.link}
            <span className="btn-arrow">→</span>
          </Link>
        </div>
        <div className={`rounded-xl border border-[#d1d9e0] bg-white p-8 ${f.reverse ? "lg:order-1" : ""}`}>
          <div className="space-y-3">
            {f.tag.includes("Post") && <div className="rounded-lg border border-[#d1d9e0] p-4"><p className="text-sm font-semibold text-[#0F172A]">Design a modern landing page</p><p className="text-xs text-[#64748B] mt-1">Design · $150 budget · Due Jul 15</p></div>}
            {f.tag.includes("top talent") && (<><div className="flex items-center gap-3 rounded-lg border border-[#d1d9e0] p-3"><div className="size-8 rounded-full bg-[#EDE9FE] flex items-center justify-center text-xs font-semibold text-[#7C3AED]">SC</div><div><p className="text-sm font-semibold text-[#0F172A]">Sarah Chen</p><p className="text-xs text-[#64748B]">UI Designer · $45/hr · 4.9 ★</p></div></div><div className="flex items-center gap-3 rounded-lg border border-[#d1d9e0] p-3"><div className="size-8 rounded-full bg-[#EDE9FE] flex items-center justify-center text-xs font-semibold text-[#7C3AED]">AR</div><div><p className="text-sm font-semibold text-[#0F172A]">Alex Rivera</p><p className="text-xs text-[#64748B]">Full-Stack Dev · $55/hr · 4.8 ★</p></div></div></>)}
            {f.tag.includes("securely") && <div className="rounded-lg border border-[#d1d9e0] p-4 text-center"><p className="text-sm font-semibold text-[#0F172A]">Secure Payment</p><p className="text-xs text-[#64748B] mt-1">Pay via Stripe · Funds held until approval</p><p className="text-lg font-bold text-[#0F172A] mt-2">$150.00</p></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeatureRows() {
  return (
    <section className="border-b border-[#d1d9e0]">
      <div className="mx-auto max-w-[1280px]">
        {features.map((f, i) => <FeatureRow key={i} f={f} i={i} />)}
      </div>
    </section>
  )
}
