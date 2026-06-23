import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-surface via-white to-brand-light/30">
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-in-up space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <SparklesIcon className="size-4 text-primary" />
              Trusted by 500+ businesses worldwide
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find the perfect{" "}
              <span className="text-primary">freelancer</span>
              {" "}for your task
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl leading-relaxed">
              SkillSwap is your go-to marketplace for micro-tasks. Post any small job and
              get it done by vetted professionals — fast, simple, and secure.
            </p>
          </div>

          <div className="animate-fade-in-up mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center [animation-delay:200ms] opacity-0">
            <Link href="/dashboard/client">
              <Button size="xl" className="gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-shadow">
                Post a Task
                <ArrowRightIcon className="size-4" />
              </Button>
            </Link>
            <Link href="/tasks">
              <Button variant="outline" size="xl" className="gap-2">
                Browse Tasks
                <ArrowRightIcon className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="animate-fade-in-up mt-14 flex items-center justify-center gap-12 [animation-delay:400ms] opacity-0">
            {[
              { value: "500+", label: "Tasks Completed" },
              { value: "200+", label: "Skilled Freelancers" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
