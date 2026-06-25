"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon } from "lucide-react"
import { api } from "@/lib/api"
import { getSession } from "@/lib/auth-client"

const sc: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  accepted: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  rejected: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([])
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    getSession().then((s) => {
      setSession(s)
      api.getProposals().then((data) => {
        setProposals(Array.isArray(data) ? data : [])
      }).catch(() => {})
    })
  }, [])

  const handleAccept = async (proposal: any) => {
    try {
      const checkout = await api.createCheckout({
        taskId: proposal.task_id,
        freelancerEmail: proposal.freelancer_email,
        amount: proposal.proposed_budget,
      })
      if (checkout?.url) window.location.href = checkout.url
    } catch {
      alert("Failed to initiate payment")
    }
  }

  const handleReject = async (id: string) => {
    try {
      await api.updateProposal(id, { status: "rejected" })
      setProposals((prev) => prev.map((p) => (p._id === id ? { ...p, status: "rejected" } : p)))
    } catch {
      alert("Failed to reject proposal")
    }
  }

  return (
    <DashboardShell role="client" userName={session?.user?.name || "Client"}>
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-1">Proposals</p>
        <h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc]">Manage Proposals</h1>
      </div>
      <div className="space-y-3">
        {proposals.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">No proposals yet.</p>
        ) : (
          proposals.map((p: any) => (
            <div key={p._id} className="rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-[#94A3B8] dark:text-[#64748b] mb-0.5">
                    Task: <span className="text-[#0F172A] dark:text-[#f8fafc] font-medium">{p.task?.title || p.task_id}</span>
                  </p>
                  <p className="text-[15px] font-semibold text-[#0F172A] dark:text-[#f8fafc]">{p.freelancer_email}</p>
                </div>
                <Badge className={`text-xs font-medium ${sc[p.status] || ""}`}>{p.status}</Badge>
              </div>
              <p className="text-sm text-[#64748B] dark:text-[#94a3b8] mb-3">&ldquo;{p.cover_note}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm">
                  <span className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">${p.proposed_budget}</span>
                  <span className="text-[#64748B] dark:text-[#94a3b8]">{p.estimated_days} days</span>
                </div>
                {p.status === "Pending" && (
                  <div className="flex gap-2">
                    <Button variant="plastic" size="sm" className="gap-1 rounded-lg text-xs sm:text-sm" onClick={() => handleAccept(p)}>
                      <CheckIcon className="size-3.5 shrink-0" /> <span className="hidden sm:inline">Accept</span><span className="sm:hidden">Pay</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 text-red-500 rounded-lg text-xs sm:text-sm" onClick={() => handleReject(p._id)}>
                      <XIcon className="size-3.5 shrink-0" /> <span className="hidden sm:inline">Reject</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  )
}
