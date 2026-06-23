import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sakura-petal via-white to-sakura-light/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.85_0.1_0/15%),transparent_60%)]" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-sakura/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sakura-light/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-in-up space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Get your tasks done by{" "}
              <span className="bg-gradient-to-r from-sakura-deep via-sakura to-sakura-deep bg-clip-text text-transparent">
                skilled freelancers
              </span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Post small tasks, receive proposals from talented freelancers,
              and get your work done quickly. It&apos;s that simple.
            </p>
          </div>

          <div className="animate-fade-in-up mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center [animation-delay:200ms] opacity-0">
            <Link href="/dashboard/client">
              <Button variant="plastic" size="lg" className="gap-2 text-base">
                Post a Task
                <ArrowRightIcon className="size-4" />
              </Button>
            </Link>
            <Link href="/tasks">
              <Button variant="outline" size="lg" className="gap-2 text-base">
                Browse Tasks
                <ArrowRightIcon className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="animate-fade-in-up mt-12 flex items-center justify-center gap-8 [animation-delay:400ms] opacity-0">
            {[
              { value: "500+", label: "Tasks Completed" },
              { value: "200+", label: "Skilled Freelancers" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-sakura-deep">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
