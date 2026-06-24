import Link from "next/link"
import Image from "next/image"
import workspaceImg from "@/Picture/Freelance Workspace Scene (Hero right side).png"

export function HeroSection() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center border-b border-[#d1d9e0]">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-16 px-6 lg:grid-cols-2">
        <div className="max-w-[560px]">
          <p className="mb-4 text-sm font-medium text-[#7C3AED]">SkillSwap</p>

          <h1 className="text-[clamp(48px,6vw,72px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0F172A]">
            From task to done,
            <br />
            <span className="text-[#7C3AED]">in one platform</span>
          </h1>

          <p className="mt-6 max-w-[460px] text-lg leading-relaxed text-[#64748B]">
            SkillSwap is the only freelance platform built for micro-tasks. Post any job and get it done by vetted professionals.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-md bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6D28D9]"
            >
              Get Started
              <svg className="size-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg>
            </Link>
            <Link href="/tasks" className="text-sm font-semibold text-[#0F172A] hover:text-[#7C3AED] transition-colors inline-flex items-center gap-1">
              Browse Tasks
              <svg className="size-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg>
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <Image src={workspaceImg} alt="" width={600} height={500} className="w-full max-w-[600px] h-auto" priority />
        </div>
      </div>
    </section>
  )
}
