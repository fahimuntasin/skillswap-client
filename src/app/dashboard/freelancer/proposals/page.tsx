"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileTextIcon, ClockIcon, CheckCircleIcon, DollarSignIcon, UploadIcon } from "lucide-react"
import Link from "next/link"

const proposals = [
  { id: "1", task: "Design landing page", budget: 140, date: "2026-07-01", status: "Pending" },
  { id: "2", task: "Fix CSS bugs", budget: 75, date: "2026-06-28", status: "Accepted" },
  { id: "3", task: "Write blog article", budget: 95, date: "2026-06-25", status: "Accepted" },
  { id: "4", task: "Setup Google Ads", budget: 180, date: "2026-06-20", status: "Rejected" },
]

const sc: Record<string, string> = { Pending: "bg-amber-50 text-amber-700", Accepted: "bg-emerald-50 text-emerald-700", Rejected: "bg-red-50 text-red-700" }

export default function FreelancerProposalsPage() {
  return (
    <DashboardShell role="freelancer" userName="Sarah">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-1">Proposals</p>
        <h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc] dark:text-[#f8fafc]">My Proposals</h1>
      </div>
      <div className="rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] dark:border-[#2a2a3e] bg-white">
        <div className="grid grid-cols-[1fr_100px_120px_100px] gap-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] dark:border-[#2a2a3e] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8] dark:text-[#64748b] dark:text-[#64748b]">
          <span>Task</span><span>Bid</span><span>Date</span><span>Status</span>
        </div>
        {proposals.map((p) => (
          <div key={p.id} className="grid grid-cols-[1fr_100px_120px_100px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] dark:border-[#2a2a3e] last:border-0 text-sm">
            <span className="font-medium text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc] dark:text-[#f8fafc]">{p.task}</span>
            <span className="font-semibold">${p.budget}</span>
            <span className="text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8] dark:text-[#94a3b8]">{new Date(p.date).toLocaleDateString()}</span>
            <Badge className={`text-xs font-medium ${sc[p.status]}`}>{p.status}</Badge>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
