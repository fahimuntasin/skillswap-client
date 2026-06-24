import Link from "next/link"
import Image from "next/image"
import workspaceImg from "@/Picture/Freelance Workspace Scene (Hero right side).png"

export function HeroSection() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center border-b border-[#F1F5F9]">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-16 px-6 lg:grid-cols-2">
        <div className="max-w-[580px]">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] text-[#7C3AED] uppercase mb-6">
            <span className="block size-2 bg-[#7C3AED]" />
            Freelance Platform
          </div>

          <h1 className="text-[clamp(48px,6vw,72px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0F172A]">
            Hire expert{" "}
            <span className="text-[#7C3AED]">freelancers</span>
            {" "}for any task
          </h1>

          <p className="mt-6 max-w-[440px] text-[18px] leading-[1.7] text-[#64748B]">
            Post your task, receive proposals from top talent, and get quality work done &mdash; fast, secure, and hassle-free.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-[6px] bg-[#7C3AED] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#6D28D9]">
              Get Started
            </Link>
            <Link href="/tasks" className="inline-flex items-center gap-2 rounded-[6px] border border-[#E2E8F0] px-7 py-3 text-[15px] font-semibold text-[#0F172A] transition-colors hover:border-[#7C3AED]">
              Browse Tasks
            </Link>
          </div>

          <div className="mt-16 flex items-center">
            {[
              { n: "500+", l: "Tasks Done" },
              { n: "200+", l: "Freelancers" },
              { n: "98%", l: "Satisfaction" },
            ].map((s, i) => (
              <div key={s.l} className="flex items-center" style={{ paddingLeft: i === 0 ? 0 : 32, paddingRight: i < 2 ? 32 : 0 }}>
                {i > 0 && <div className="absolute -ml-px h-10 w-px bg-[#E2E8F0]" />}
                <div className="relative">
                  {i > 0 && <div className="absolute -left-[33px] top-0 h-10 w-px bg-[#E2E8F0]" />}
                  <div className="text-[32px] font-bold text-[#0F172A] leading-none">{s.n}</div>
                  <div className="mt-0.5 text-[13px] text-[#94A3B8]">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <Image src={workspaceImg} alt="" width={550} height={450} className="w-full max-w-[550px] h-auto" priority />
        </div>
      </div>
    </section>
  )
}
