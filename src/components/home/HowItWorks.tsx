import { FileText, Users, CreditCard, Check, ArrowRight } from "lucide-react"

const steps = [
  {
    n: "01",
    title: "Post a Task",
    desc: "Describe your need, set budget and deadline. Takes under 2 minutes.",
    icon: FileText,
    features: ["Describe your requirements", "Set your budget & timeline", "Published in seconds"],
  },
  {
    n: "02",
    title: "Get Proposals",
    desc: "Freelancers review and submit competitive bids with their price and timeline.",
    icon: Users,
    features: ["Freelancers review your task", "Receive competitive bids", "Compare portfolios & ratings"],
  },
  {
    n: "03",
    title: "Hire & Pay",
    desc: "Accept the best proposal, pay securely via Stripe, and work begins immediately.",
    icon: CreditCard,
    features: ["Accept the best proposal", "Secure Stripe payments", "Work begins immediately"],
  },
]

const btnGradient = {
  background: "linear-gradient(to bottom, #7C3AED, #5B21B6)",
}

const numGradient = {
  background: "linear-gradient(135deg, #7C3AED, #C4B5FD)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-[96px] border-b border-[#F1F5F9] dark:border-[#2a2a3e]">
      <div className="mb-12 text-center">
        <h2>How it works</h2>
        <p className="mt-3 text-[#64748B] dark:text-[#94a3b8] text-base">
          Three simple steps — Post, review, and pay — all in one place
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.n}
              className="flex flex-col gap-4 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#cbd5e1] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:hover:border-[#3d2a6e]"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]">
                  <Icon className="size-6 text-black" />
                </div>
                <span className="text-[42px] font-bold leading-none" style={numGradient}>
                  {s.n}
                </span>
              </div>

              <h3 className="text-lg font-medium text-[#0F172A] dark:text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-[#475569] dark:text-[#94a3b8]">{s.desc}</p>

              <hr className="w-full border-0" style={{ height: 1, backgroundColor: "#E2E8F0" }} />

              <ul className="flex flex-col gap-1.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]">
                      <Check className="size-3 text-black" />
                    </span>
                    <span className="text-[#475569] dark:text-[#CBD5E1]">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className="mt-auto inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#6D28D9] px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] active:translate-y-0"
                style={btnGradient}
              >
                Learn More <ArrowRight className="size-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
