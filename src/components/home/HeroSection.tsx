import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

export function HeroSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-[96px] border-b border-[#F1F5F9]">
      <div className="max-w-[720px] mx-auto text-center">
        <div className="animate-fade-in-up space-y-6">
          <h1>
            Hire expert{" "}
            <span className="text-[#7C3AED]">freelancers</span>
            {" "}for any task
          </h1>
          <p className="text-[18px] text-[#475569] leading-relaxed max-w-[600px] mx-auto">
            Post your task, receive proposals from top talent, and get quality work done — fast, secure, and hassle-free.
          </p>
        </div>

        <div className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-3 [animation-delay:150ms] opacity-0">
          <Link href="/register">
            <Button variant="plastic" size="xl" className="gap-2 rounded-xl h-12 px-7 text-[15px]">
              Get Started
              <ArrowRightIcon className="size-4" />
            </Button>
          </Link>
          <Link href="/tasks">
            <Button variant="outline" size="xl" className="gap-2 rounded-xl h-12 px-7 text-[15px] border-[#E2E8F0]">
              Browse Tasks
            </Button>
          </Link>
        </div>

        <div className="animate-fade-in-up mt-14 flex items-center justify-center gap-10 [animation-delay:300ms] opacity-0">
          {[
            { value: "500+", label: "Tasks Done" },
            { value: "200+", label: "Freelancers" },
            { value: "98%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-2">
              {i > 0 && <div className="h-8 w-px bg-[#E2E8F0]" />}
              <div>
                <div className="text-[28px] font-semibold text-[#0F172A]">{stat.value}</div>
                <div className="text-sm text-[#64748B]">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
