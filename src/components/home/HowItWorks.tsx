export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Post a Task",
      description: "Describe what you need done. Set your budget and deadline. It takes less than 2 minutes.",
    },
    {
      step: "02",
      title: "Get Proposals",
      description: "Freelancers review your task and submit competitive proposals with their price and timeline.",
    },
    {
      step: "03",
      title: "Hire & Pay",
      description: "Accept the best proposal, pay securely via Stripe, and the freelancer starts working right away.",
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
        <p className="mt-2 text-muted-foreground">Three simple steps to get your tasks done</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.step}
            className="relative rounded-2xl border border-sakura-petal/50 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sakura/10"
          >
            <span className="mb-4 inline-block text-5xl font-bold text-sakura-light/60">
              {step.step}
            </span>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

            {index < steps.length - 1 && (
              <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 sm:block">
                <svg className="size-6 text-sakura-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
