"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FileTextIcon, UsersIcon, ShieldCheckIcon } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const cards = [
  { icon: FileTextIcon, title: "Post tasks instantly", desc: "Describe what you need, set a budget, and publish. Freelancers see it immediately.", link: "Post a task", href: "/register" },
  { icon: UsersIcon, title: "Find skilled freelancers", desc: "Browse vetted professionals with ratings. Review proposals and hire with confidence.", link: "Browse freelancers", href: "/freelancers" },
  { icon: ShieldCheckIcon, title: "Pay with confidence", desc: "Secure Stripe payments. Funds held until you approve the work. Total transparency.", link: "Learn more", href: "/register" },
]

export function FeatureCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%" } })
      gsap.fromTo(".feat-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="border-b border-[#d1d9e0] dark:border-[#2a2a3e] py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div ref={headingRef} className="mb-6"><p className="text-sm font-semibold text-[#7C3AED]">Platform features</p></div>
        <div className="grid gap-px border border-[#d1d9e0] dark:border-[#2a2a3e] bg-[#d1d9e0] dark:bg-[#2a2a3e] sm:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="feat-card special-card bg-white dark:bg-[#1c1a3a] p-8 sm:p-10 flex flex-col">
              <div className="mb-5 flex size-9 items-center justify-center rounded-full bg-[#EDE9FE] dark:bg-[#2d1f5e]">
                <card.icon className="size-[18px] text-[#7C3AED] dark:text-[#c4b5fd]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#f8fafc]">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B] dark:text-[#94a3b8]">{card.desc}</p>
              <Link href={card.href} className="btn-premium mt-6">
                {card.link}
                <span className="btn-icon">
                  <svg viewBox="0 0 32 32" width="18" height="18">
                    <linearGradient id="fc-arrow" y2="100%" x2="100%" y1="0%" x1="0%">
                      <stop stopColor="#FFFFFF" stopOpacity={1} offset="0%" />
                      <stop stopColor="#AAAAAA" stopOpacity={1} offset="100%" />
                    </linearGradient>
                    <path fill="url(#fc-arrow)" d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"/>
                  </svg>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
