import Link from "next/link"

export function CtaBanner() {
  return (
    <section className="py-24 text-center">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-4">Get started</p>
        <h2 className="text-[40px] font-bold text-[#0F172A] tracking-[-0.02em]">Ready to get work done?</h2>
        <p className="mt-3 text-base text-[#64748B] max-w-[480px] mx-auto">
          Join thousands of clients and freelancers already using SkillSwap.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
    </section>
  )
}
