"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"

const tasks = [
  { id: "1", title: "Design landing page", client: "client@example.com", category: "Design", budget: 150, status: "Open" },
  { id: "2", title: "Fix CSS bugs", client: "tech@example.com", category: "Development", budget: 80, status: "In Progress" },
  { id: "3", title: "Spam task", client: "spam@example.com", category: "Other", budget: 5, status: "Open" },
]

const sc: Record<string, string> = { Open: "bg-amber-50 text-amber-700", "In Progress": "bg-blue-50 text-blue-700", Completed: "bg-emerald-50 text-emerald-700" }

export default function AdminTasksPage() {
  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="mb-6"><p className="text-sm font-semibold text-[#7C3AED] mb-1">Admin</p><h1 className="text-[28px] font-bold text-[#0F172A]">Manage Tasks</h1></div>
      <div className="rounded-xl border border-[#F1F5F9] bg-white">
        <div className="grid grid-cols-[1fr_140px_80px_80px_60px] gap-4 border-b border-[#F1F5F9] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8]">
          <span>Title</span><span>Client</span><span>Budget</span><span>Status</span><span></span>
        </div>
        {tasks.map((t) => (
          <div key={t.id} className="grid grid-cols-[1fr_140px_80px_80px_60px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] last:border-0 text-sm">
            <span className="font-medium text-[#0F172A]">{t.title}</span><span className="text-[#64748B]">{t.client}</span><span className="font-semibold">${t.budget}</span>
            <Badge className={`text-xs font-medium ${sc[t.status]}`}>{t.status}</Badge>
            <Button size="icon" variant="ghost" className="size-8 text-red-500"><TrashIcon className="size-4" /></Button>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
