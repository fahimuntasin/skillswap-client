export function HowItWorks() {
  const steps = [
    { n: "01", title: "Post a Task", desc: "Describe your need, set budget and deadline. Takes under 2 minutes." },
    { n: "02", title: "Get Proposals", desc: "Freelancers review and submit competitive bids with their price and timeline." },
    { n: "03", title: "Hire & Pay", desc: "Accept the best proposal, pay securely via Stripe, and work begins immediately." },
  ]

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-[96px] border-b border-[#F1F5F9] dark:border-[#2a2a3e]">
      <div className="mb-12 text-center">
        <h2>How It Works</h2>
        <p className="mt-3 text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8] text-base">Three simple steps to get your tasks done</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.n} className="card-global relative">
            <span className="mb-4 inline-block text-[42px] font-semibold text-[#F1F5F9]">{s.n}</span>
            <h3 className="mb-2">{s.title}</h3>
            <p className="text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8] text-sm leading-relaxed">{s.desc}</p>
            {i < 2 && (
              <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 sm:block">
                <svg className="size-5 text-[#E2E8F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
