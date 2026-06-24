"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon } from "lucide-react"

const proposals = [
  { id: "1", task: "Design landing page", freelancer: "Sarah Chen", budget: 140, days: 5, note: "I have 5 years of UI design experience.", status: "Pending" },
  { id: "2", task: "Design landing page", freelancer: "Mia Johnson", budget: 130, days: 4, note: "Can deliver in 4 days with revisions.", status: "Pending" },
  { id: "3", task: "Fix CSS bugs", freelancer: "Alex Rivera", budget: 75, days: 2, note: "Quick turnaround guaranteed.", status: "Accepted" },
  { id: "4", task: "Write blog article", freelancer: "Emily Park", budget: 95, days: 3, note: "SEO optimized content with research.", status: "Pending" },
]

const sc: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Accepted: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
}

export default function ProposalsPage() {
  return (
    <DashboardShell role="client" userName="John">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-1">Proposals</p>
        <h1 className="text-[28px] font-bold text-[#0F172A]">Manage Proposals</h1>
      </div>
      <div className="space-y-3">
        {proposals.map((p) => (
          <div key={p.id} className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-[#94A3B8] mb-0.5">Task: <span className="text-[#0F172A] font-medium">{p.task}</span></p>
                <p className="text-[15px] font-semibold text-[#0F172A]">{p.freelancer}</p>
              </div>
              <Badge className={`text-xs font-medium ${sc[p.status]}`}>{p.status}</Badge>
            </div>
            <p className="text-sm text-[#64748B] mb-3">&ldquo;{p.note}&rdquo;</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                <span className="font-semibold text-[#0F172A]">${p.budget}</span>
                <span className="text-[#64748B]">{p.days} days</span>
              </div>
              {p.status === "Pending" && (
                <div className="flex gap-2">
                  <Button variant="plastic" size="sm" className="gap-1 rounded-lg"><CheckIcon className="size-3.5" /> Accept</Button>
                  <Button variant="ghost" size="sm" className="gap-1 text-red-500 rounded-lg"><XIcon className="size-3.5" /> Reject</Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
