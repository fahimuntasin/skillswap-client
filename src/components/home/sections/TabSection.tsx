"use client"

import { useState } from "react"

const tabs = ["Post a Task", "Get Proposals", "Hire & Pay", "Work Done"]

const descriptions: Record<string, string> = {
  "Post a Task": "Describe what you need done. Set your budget and deadline. It takes less than 2 minutes to post a task on SkillSwap.",
  "Get Proposals": "Freelancers review your task details and submit competitive proposals with pricing, timeline, and a personal note.",
  "Hire & Pay": "Review proposals and accept the best match. Pay securely via Stripe — funds are held until the work is approved.",
  "Work Done": "The freelancer delivers the work. You review, approve, and leave feedback. Fast, transparent, and reliable.",
}

export function TabSection() {
  const [active, setActive] = useState(tabs[0])

  return (
    <section className="border-y border-[#F1F5F9] py-20">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <div className="inline-flex rounded-full border border-[#E2E8F0] p-1 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full px-5 py-2 text-[14px] font-medium transition-colors ${
                active === tab ? "bg-[#0F172A] text-white" : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-relaxed text-[#64748B]">
          {descriptions[active]}
        </p>
      </div>
    </section>
  )
}
