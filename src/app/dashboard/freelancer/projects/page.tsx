"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UploadIcon, ExternalLinkIcon } from "lucide-react"

const projects = [
  { id: "1", task: "Fix CSS bugs", client: "WebAgency", budget: 75, status: "In Progress", deliverable: null },
  { id: "2", task: "Write blog article", client: "ContentHub", budget: 95, status: "Completed", deliverable: "https://docs.google.com/article" },
]

export default function ActiveProjectsPage() {
  return (
    <DashboardShell role="freelancer" userName="Sarah">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-1">Work</p>
        <h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc] dark:text-[#f8fafc]">Active Projects</h1>
      </div>
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] dark:bg-[#1c1a3a] dark:bg-[#1c1a3a] p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-[15px] font-semibold text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc] dark:text-[#f8fafc]">{p.task}</h3>
                <p className="text-sm text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8] dark:text-[#94a3b8]">Client: {p.client} · ${p.budget}</p>
              </div>
              <Badge className={`text-xs font-medium ${p.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>{p.status}</Badge>
            </div>
            {p.status === "In Progress" && (
              <Button variant="plastic" size="sm" className="gap-1.5 rounded-lg"><UploadIcon className="size-3.5" /> Submit Deliverable</Button>
            )}
            {p.deliverable && (
              <a href={p.deliverable} target="_blank" className="inline-flex items-center gap-1 text-sm font-medium text-[#7C3AED] hover:underline mt-2"><ExternalLinkIcon className="size-3.5" /> View Deliverable</a>
            )}
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
