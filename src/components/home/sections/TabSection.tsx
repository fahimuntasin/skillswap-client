"use client"

import { useState } from "react"

const tabs = [
  { id: "delegate", label: "Delegate to freelancers", desc: "Start a task from an idea, a description, or a project already in motion." },
  { id: "inbox", label: "Centralized proposals", desc: "Manage all your incoming proposals in one place. Compare, review, and decide." },
  { id: "canvas", label: "Track progress", desc: "Every task comes with a workspace for files, messages, and deliverables." },
  { id: "review", label: "Review & merge", desc: "Inspect deliverables, preview work, leave feedback, and mark tasks complete." },
]

export function TabSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="border-b border-[#d1d9e0] dark:border-[#2a2a3e] py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 text-center">
          <div className="inline-flex flex-wrap justify-center rounded-full border border-[#d1d9e0] dark:border-[#2a2a3e] p-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                active === i ? "bg-[#0F172A] text-white" : "text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8] hover:text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-[520px] text-base leading-relaxed text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8]">
          {tabs[active].desc}
        </p>
      </div>
    </section>
  )
}
