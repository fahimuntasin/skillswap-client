"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"

export default function TransactionsPage() {
  const [payments, setPayments] = useState<any[]>([])

  useEffect(() => {
    api.getPayments().then((data) => {
      setPayments(Array.isArray(data) ? data : [])
    }).catch(() => {})
  }, [])

  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="mb-6"><p className="text-sm font-semibold text-[#7C3AED] mb-1">Admin</p><h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc]">Transactions</h1></div>
      <div className="overflow-x-auto rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a]">
        <div className="min-w-[550px]">
          <div className="grid grid-cols-[1fr_1fr_80px_100px_80px] gap-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8] dark:text-[#64748b]">
            <span>Client</span><span>Freelancer</span><span>Amount</span><span>Date</span><span>Status</span>
          </div>
          {payments.length === 0 ? (
            <p className="px-6 py-8 text-sm text-[#94A3B8]">No transactions yet.</p>
          ) : (
            payments.map((p: any) => (
              <div key={p._id} className="grid grid-cols-[1fr_1fr_80px_100px_80px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] last:border-0 text-sm">
                <span className="text-[#64748B] dark:text-[#94a3b8]">{p.client_email}</span>
                <span className="text-[#64748B] dark:text-[#94a3b8]">{p.freelancer_email}</span>
                <span className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">${p.amount}</span>
                <span className="text-[#64748B] dark:text-[#94a3b8]">{new Date(p.paid_at || p.date).toLocaleDateString()}</span>
                <Badge className="text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{p.payment_status || "completed"}</Badge>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
