export function HowItWorks() {
  const steps = [
    { step: "01", title: "Post a Task", desc: "Describe your need, set budget and deadline. Takes under 2 minutes." },
    { step: "02", title: "Get Proposals", desc: "Freelancers review and submit competitive bids with their price and timeline." },
    { step: "03", title: "Hire & Pay", desc: "Accept the best proposal, pay securely via Stripe, and work begins immediately." },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
        <p className="mt-2 text-muted-foreground">Three simple steps to get your tasks done</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.step} className="uiverse-card group relative rounded-2xl p-6">
            <span className="mb-4 inline-block text-5xl font-bold text-primary/8 group-hover:text-primary/15 transition-colors">
              {step.step}
            </span>
            <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            {i < 2 && (
              <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 sm:block">
                <svg className="size-6 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
