import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroIllustration } from "@/components/home/HeroIllustration"
import { ArrowRightIcon, SparklesIcon, StarIcon } from "@heroicons/react/24/solid"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent/50 via-white to-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/3 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="animate-fade-in-up space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
                <SparklesIcon className="size-4" />
                Trusted by 500+ businesses worldwide
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Find the{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">perfect</span>
                  <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-primary/20 rounded-full" />
                </span>
                {" "}freelancer for every task
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl leading-relaxed">
                Post your task, receive proposals from talented professionals, and get quality work done — fast, secure, and hassle-free.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex -space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-primary/10 text-[10px] font-bold text-primary">
                      {["S","A","M","R"][i]}
                    </div>
                  ))}
                </div>
                <span>Joined by <strong className="text-foreground">200+</strong> freelancers</span>
              </div>
            </div>

            <div className="animate-fade-in-up mt-8 flex flex-wrap items-center gap-3 [animation-delay:200ms] opacity-0">
              <Link href="/register">
                <Button variant="plastic" size="xl" className="gap-2">
                  Get Started
                  <ArrowRightIcon className="size-4" />
                </Button>
              </Link>
              <Link href="/tasks">
                <Button variant="outline" size="xl" className="gap-2 border-2">
                  Browse Tasks
                </Button>
              </Link>
            </div>

            <div className="animate-fade-in-up mt-14 flex items-center gap-10 [animation-delay:400ms] opacity-0">
              {[
                { value: "500+", label: "Tasks Completed" },
                { value: "200+", label: "Freelancers" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-2">
                  {i > 0 && <div className="h-8 w-px bg-border" />}
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  )
}
