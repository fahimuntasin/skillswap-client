import Link from "next/link"

export function CtaBanner() {
  return (
    <section className="border-t border-[#F1F5F9] py-24 text-center">
      <div className="mx-auto max-w-[1280px] px-6">
        <h2 className="text-[48px] font-bold text-[#0F172A] tracking-[-0.01em]">Start your first task today</h2>
        <p className="mt-4 text-[18px] text-[#64748B] max-w-[520px] mx-auto">
          Join thousands of clients and freelancers on SkillSwap.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/register" className="inline-flex items-center gap-2 rounded-[6px] bg-[#7C3AED] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#6D28D9]">
            Get Started
          </Link>
          <Link href="/tasks" className="inline-flex items-center gap-2 rounded-[6px] border border-[#E2E8F0] px-7 py-3 text-[15px] font-semibold text-[#0F172A] transition-colors hover:border-[#7C3AED]">
            Browse Tasks
          </Link>
        </div>
      </div>
    </section>
  )
}
