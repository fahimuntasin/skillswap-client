"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"

const transactions = [
  { id: "1", client: "john@example.com", freelancer: "sarah@example.com", amount: 150, date: "2026-07-01", status: "completed" },
  { id: "2", client: "tech@example.com", freelancer: "alex@example.com", amount: 80, date: "2026-06-28", status: "completed" },
  { id: "3", client: "client@example.com", freelancer: "emily@example.com", amount: 95, date: "2026-06-25", status: "completed" },
]

export default function TransactionsPage() {
  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="mb-6"><p className="text-sm font-semibold text-[#7C3AED] mb-1">Admin</p><h1 className="text-[28px] font-bold text-[#0F172A]">Transactions</h1></div>
      <div className="rounded-xl border border-[#F1F5F9] bg-white">
        <div className="grid grid-cols-[1fr_1fr_80px_100px_80px] gap-4 border-b border-[#F1F5F9] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8]">
          <span>Client</span><span>Freelancer</span><span>Amount</span><span>Date</span><span>Status</span>
        </div>
        {transactions.map((t) => (
          <div key={t.id} className="grid grid-cols-[1fr_1fr_80px_100px_80px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] last:border-0 text-sm">
            <span className="text-[#64748B]">{t.client}</span><span className="text-[#64748B]">{t.freelancer}</span><span className="font-semibold text-[#0F172A]">${t.amount}</span><span className="text-[#64748B]">{new Date(t.date).toLocaleDateString()}</span>
            <Badge className="text-xs font-medium bg-emerald-50 text-emerald-700">{t.status}</Badge>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
