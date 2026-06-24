"use client"

import Link from "next/link"
import { FileTextIcon, UsersIcon, ShieldCheckIcon } from "lucide-react"
import { useReveal } from "@/lib/use-reveal"

const cards = [
  { icon: FileTextIcon, title: "Post tasks instantly", desc: "Describe what you need, set a budget, and publish. Freelancers see it immediately.", link: "Post a task", href: "/register" },
  { icon: UsersIcon, title: "Find skilled freelancers", desc: "Browse vetted professionals with ratings. Review proposals and hire with confidence.", link: "Browse freelancers", href: "/freelancers" },
  { icon: ShieldCheckIcon, title: "Pay with confidence", desc: "Secure Stripe payments. Funds held until you approve the work. Total transparency.", link: "Learn more", href: "/register" },
]

export function FeatureCards() {
  const { ref, visible } = useReveal()

  return (
    <section ref={ref} className="border-b border-[#d1d9e0] py-24">
      <div className={`mx-auto max-w-[1280px] px-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="mb-6"><p className="text-sm font-semibold text-[#7C3AED]">Platform features</p></div>
        <div className="grid gap-px border border-[#d1d9e0] bg-[#d1d9e0] sm:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="bg-white p-8 sm:p-10 flex flex-col group hover:bg-[#FAFAFA] transition-colors">
              <div className="mb-5 flex size-9 items-center justify-center rounded-full bg-[#EDE9FE] group-hover:scale-110 transition-transform">
                <card.icon className="size-[18px] text-[#7C3AED]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A]">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B]">{card.desc}</p>
              <Link href={card.href} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#0F172A] hover:text-[#7C3AED] transition-colors">
                {card.link}
                <svg className="size-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
