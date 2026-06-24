"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"

const earnings = [
  { id: "1", task: "Fix CSS bugs", client: "WebAgency", amount: 75, date: "2026-07-10" },
  { id: "2", task: "Write blog article", client: "ContentHub", amount: 95, date: "2026-07-05" },
  { id: "3", task: "Design logo", client: "StartupX", amount: 200, date: "2026-06-28" },
]

export default function EarningsPage() {
  const total = earnings.reduce((s, e) => s + e.amount, 0)
  return (
    <DashboardShell role="freelancer" userName="Sarah">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-1">Earnings</p>
        <h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">My Earnings</h1>
        <p className="text-lg font-bold text-[#7C3AED] mt-1">${total} total</p>
      </div>
      <div className="rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white">
        <div className="grid grid-cols-[1fr_120px_100px_120px] gap-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8] dark:text-[#64748b]">
          <span>Task</span><span>Client</span><span>Amount</span><span>Date</span>
        </div>
        {earnings.map((e) => (
          <div key={e.id} className="grid grid-cols-[1fr_120px_100px_120px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] last:border-0 text-sm">
            <span className="font-medium text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">{e.task}</span><span className="text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8]">{e.client}</span><span className="font-semibold text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">${e.amount}</span><span className="text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8]">{new Date(e.date).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
