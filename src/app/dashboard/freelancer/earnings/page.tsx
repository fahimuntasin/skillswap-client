"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { api } from "@/lib/api"
import { getSession } from "@/lib/auth-client"

export default function EarningsPage() {
  const [earnings, setEarnings] = useState<any[]>([])
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    getSession().then((s) => {
      setSession(s)
      if (s?.user?.email) {
        api.getEarnings(s.user.email).then((data: any) => {
          setEarnings(data?.earnings ? data.earnings : Array.isArray(data) ? data : [])
        }).catch(() => {})
      }
    })
  }, [])

  const total = earnings.reduce((s, e) => s + (e.amount || 0), 0)

  return (
    <DashboardShell role="freelancer" userName={session?.user?.name || "Freelancer"}>
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-1">Earnings</p>
        <h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc]">My Earnings</h1>
        <p className="text-lg font-bold text-[#7C3AED] mt-1">${total} total</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a]">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-[1fr_120px_100px_120px] gap-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8] dark:text-[#64748b]">
            <span>Task</span><span>Client</span><span>Amount</span><span>Date</span>
          </div>
          {earnings.length === 0 ? (
            <p className="px-6 py-8 text-sm text-[#94A3B8]">No earnings yet.</p>
          ) : (
            earnings.map((e: any) => (
              <div key={e._id} className="grid grid-cols-[1fr_120px_100px_120px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] last:border-0 text-sm">
            <span className="font-medium text-[#0F172A] dark:text-[#f8fafc]">{e.taskTitle || e.task?.title || e.task_id}</span>
            <span className="text-[#64748B] dark:text-[#94a3b8]">{e.client_email || e.client}</span>
            <span className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">${e.amount}</span>
            <span className="text-[#64748B] dark:text-[#94a3b8]">{new Date(e.paid_at || e.date).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
