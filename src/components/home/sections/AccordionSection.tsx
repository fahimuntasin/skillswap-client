"use client"

import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"

const items = [
  { title: "Post a Task", desc: "Describe your task, set a budget and deadline. Takes less than 2 minutes.", link: "Learn more →" },
  { title: "Review Proposals", desc: "Freelancers apply with their price, timeline, and a cover note explaining their approach.", link: "Learn more →" },
  { title: "Hire & Pay", desc: "Accept a proposal and pay securely via Stripe. Work begins immediately after payment.", link: "Learn more →" },
  { title: "Get Work Done", desc: "Freelancer delivers, you approve and leave a review. Fast, transparent, and reliable.", link: "Learn more →" },
]

export function AccordionSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-[1280px] gap-20 px-6 lg:grid-cols-[45%_55%]">
        <div>
          <h2 className="text-[36px] font-bold text-[#0F172A] tracking-[-0.02em] mb-2">How SkillSwap works</h2>
          <p className="text-[16px] text-[#64748B] mb-12">Three simple steps to get your tasks done</p>

          <div>
            {items.map((item, i) => (
              <div key={item.title} className="border-t border-[#F1F5F9]">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-[17px] font-medium text-[#0F172A]">{item.title}</span>
                  <ChevronDownIcon className={`size-5 text-[#94A3B8] transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="pb-5 -mt-1">
                    <p className="text-[15px] leading-[1.7] text-[#64748B] mb-3">{item.desc}</p>
                    <a href="#" className="text-[14px] font-medium text-[#7C3AED] hover:underline">{item.link}</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="sticky top-20 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] font-semibold text-sm">SC</div>
                <span className="text-sm font-medium text-[#0F172A]">Sarah Chen</span>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-[#DCFCE7] text-[#166534] font-medium">Open</span>
            </div>
            <h3 className="text-[17px] font-semibold text-[#0F172A]">Design a modern landing page</h3>
            <p className="text-sm text-[#64748B]">Fixed-price · $150 · Due Jul 15</p>
            <div className="flex -space-x-2 pt-2">
              {["bg-[#7C3AED]", "bg-[#A78BFA]", "bg-[#C4B5FD]"].map((c, i) => (
                <div key={i} className={`size-7 rounded-full border-2 border-white ${c} flex items-center justify-center text-[10px] text-white font-semibold`}>
                  {["S","A","E"][i]}
                </div>
              ))}
              <span className="text-xs text-[#64748B] pl-4 pt-1">3 proposals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
