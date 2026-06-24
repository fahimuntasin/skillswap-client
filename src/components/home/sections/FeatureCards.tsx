import { FileTextIcon, UsersIcon, ShieldCheckIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"

const cards = [
  {
    icon: FileTextIcon,
    title: "Post tasks instantly",
    body: "Describe your need, set a budget, and publish your task in under 2 minutes. Skilled freelancers see it right away.",
    href: "/tasks",
  },
  {
    icon: UsersIcon,
    title: "Find skilled freelancers",
    body: "Browse hundreds of vetted professionals. Review their ratings, past work, and proposals before you hire.",
    href: "/freelancers",
  },
  {
    icon: ShieldCheckIcon,
    title: "Pay with confidence",
    body: "Secure payments via Stripe. Funds are held until you approve the work. No risk, total transparency.",
    href: "/register",
  },
]

export function FeatureCards() {
  return (
    <section className="border-t border-[#F1F5F9] py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-16 text-center">
          <h2 className="text-[40px] font-bold text-[#0F172A] tracking-[-0.02em]">Everything you need to get work done</h2>
          <p className="mt-4 text-[16px] text-[#64748B]">One platform. Endless possibilities.</p>
        </div>

        <div className="grid border border-[#E2E8F0] sm:grid-cols-3">
          {cards.map((card, i) => (
            <div key={card.title} className={`p-8 sm:p-10 ${i < 2 ? "sm:border-r border-[#E2E8F0]" : ""}`}>
              <div className="mb-5 flex size-9 items-center justify-center rounded-full bg-[#EDE9FE]">
                <card.icon className="size-[18px] text-[#7C3AED]" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#0F172A]">{card.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#64748B]">{card.body}</p>
              <Link
                href={card.href}
                className="mt-6 inline-flex size-8 items-center justify-center rounded-full border border-[#E2E8F0] text-[#0F172A] transition-colors hover:border-[#7C3AED] hover:text-[#7C3AED]"
              >
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
