import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import workspaceImg from "@/Picture/Freelance Workspace Scene (Hero right side).png"
import networkImg from "@/Picture/Collaboration Network (Bottom of hero).png"
import cardsImg from "@/Picture/Floating Task Cards.png"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#F1F5F9]">
      {/* Floating task cards — subtle background */}
      <div className="pointer-events-none absolute right-[-60px] top-0 hidden h-full w-[550px] lg:block animate-float-subtle opacity-[0.06]">
        <div className="relative h-full w-full">
          <Image src={cardsImg} alt="" fill className="object-contain object-right-top" unoptimized />
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 py-[120px]">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left text */}
          <div className="max-w-[580px]">
            <div className="animate-fade-in-up space-y-6">
              <h1 className="text-[48px] sm:text-[56px]">
                Hire expert{" "}
                <span className="text-[#7C3AED]">freelancers</span>
                {" "}for any task
              </h1>
              <p className="text-[18px] text-[#475569] leading-relaxed max-w-[480px]">
                Post your task, receive proposals from top talent, and get quality work done — fast, secure, and hassle-free.
              </p>
            </div>

            <div className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-3 [animation-delay:150ms] opacity-0">
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

            <div className="animate-fade-in-up mt-14 flex items-center gap-10 [animation-delay:300ms] opacity-0">
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

          {/* Right — workspace illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <Image
              src={workspaceImg}
              alt="Freelance workspace illustration"
              width={550}
              height={450}
              className="w-full max-w-[550px] h-auto"
              priority
            />
          </div>
        </div>

        {/* Bottom — collaboration network */}
        <div className="mt-20 flex justify-center">
          <Image
            src={networkImg}
            alt="Collaboration network"
            width={700}
            height={140}
            className="w-full max-w-[700px] h-auto opacity-60"
            priority
          />
        </div>
      </div>
    </section>
  )
}
