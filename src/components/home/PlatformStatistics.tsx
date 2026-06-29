"use client"

import { useEffect, useState } from "react"
import { BriefcaseIcon, UsersIcon, DollarSignIcon } from "lucide-react"
import { useReveal } from "@/lib/use-reveal"

type Stats = { totalTasks: number; totalUsers: number; totalRevenue: number; freelancerCount: number }

export function PlatformStatistics() {
  const { ref, visible } = useReveal()
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  const cards = [
    { icon: BriefcaseIcon, label: "Tasks Posted", value: stats?.totalTasks ?? 0 },
    { icon: UsersIcon, label: "Total Users", value: stats?.totalUsers ?? 0 },
    { icon: DollarSignIcon, label: "Total Payout", value: stats ? `$${stats.totalRevenue.toLocaleString()}` : "$0" },
  ]

  return (
    <section className="border-b border-[#d1d9e0] dark:border-[#2a2a3e] py-16 sm:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-[1280px] px-4 sm:px-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#7C3AED] mb-2">Platform Statistics</p>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0F172A] dark:text-[#f8fafc] tracking-[-0.02em]">
            Growing every day
          </h2>
          <p className="mt-3 text-[#64748B] dark:text-[#94a3b8]">Live numbers from the SkillSwap marketplace</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-[#E2E8F0] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] p-8 text-center"
            >
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-[#EDE9FE] dark:bg-[#2d1f5e]">
                <c.icon className="size-6 text-[#7C3AED] dark:text-[#c4b5fd]" />
              </div>
              <p className="text-3xl font-bold text-[#0F172A] dark:text-[#f8fafc]">{c.value}</p>
              <p className="mt-1 text-sm text-[#64748B] dark:text-[#94a3b8]">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
