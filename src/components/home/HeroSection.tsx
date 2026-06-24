"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroIllustration } from "@/components/home/HeroIllustration"
import { ArrowRightIcon, SparklesIcon, StarIcon } from "@heroicons/react/24/solid"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent/40 via-background to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.12),rgba(255,255,255,0))]" />
      <div className="absolute right-0 top-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-[250px] w-[250px] rounded-full bg-violet-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="animate-fade-in-up space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                <SparklesIcon className="size-4" />
                Trusted by 500+ businesses worldwide
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Hire expert{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                    freelancers
                  </span>
                </span>
                <br />for any task
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl leading-relaxed max-w-lg">
                Post your task, receive proposals from top talent, and get quality work done — fast, secure, and hassle-free.
              </p>
            </div>

            <div className="animate-fade-in-up mt-8 flex flex-wrap items-center gap-3 [animation-delay:150ms] opacity-0">
              <Link href="/register">
                <Button variant="plastic" size="xl" className="gap-2 rounded-xl">
                  Get Started
                  <ArrowRightIcon className="size-4" />
                </Button>
              </Link>
              <Link href="/tasks">
                <Button variant="outline" size="xl" className="gap-2 rounded-xl border-2">
                  Browse Tasks
                </Button>
              </Link>
            </div>

            <div className="animate-fade-in-up mt-12 flex items-center gap-10 [animation-delay:300ms] opacity-0">
              {[
                { value: "500+", label: "Tasks Done" },
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
