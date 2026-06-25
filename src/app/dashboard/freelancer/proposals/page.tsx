"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { getSession } from "@/lib/auth-client"

const sc: Record<string, string> = { pending: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", accepted: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", rejected: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" }

export default function FreelancerProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([])
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    getSession().then((s) => {
      setSession(s)
      if (s?.user?.email) {
        api.getProposals(`freelancer_email=${s.user.email}`).then((data) => {
          setProposals(Array.isArray(data) ? data : [])
        }).catch(() => {})
      }
    })
  }, [])

  return (
    <DashboardShell role="freelancer" userName={session?.user?.name || "Freelancer"}>
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-1">Proposals</p>
        <h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc]">My Proposals</h1>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a]">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-[1fr_100px_120px_100px] gap-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8] dark:text-[#64748b]">
            <span>Task</span><span>Bid</span><span>Date</span><span>Status</span>
          </div>
          {proposals.length === 0 ? (
            <p className="px-6 py-8 text-sm text-[#94A3B8]">No proposals submitted yet.</p>
          ) : (
            proposals.map((p: any) => (
              <div key={p._id} className="grid grid-cols-[1fr_100px_120px_100px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] last:border-0 text-sm">
                <span className="font-medium text-[#0F172A] dark:text-[#f8fafc]">{p.task?.title || p.task_id}</span>
                <span className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">${p.proposed_budget}</span>
                <span className="text-[#64748B] dark:text-[#94a3b8]">{new Date(p.submitted_at || p.date).toLocaleDateString()}</span>
                <Badge className={`text-xs font-medium ${sc[p.status] || ""}`}>{p.status}</Badge>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
