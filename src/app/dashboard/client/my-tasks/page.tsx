"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"

const tasks = [
  { id: "1", title: "Design landing page", status: "Open", budget: 150, deadline: "2026-07-15" },
  { id: "2", title: "Fix CSS bugs", status: "In Progress", budget: 80, deadline: "2026-07-10" },
  { id: "3", title: "Write blog article", status: "Open", budget: 100, deadline: "2026-07-20" },
  { id: "4", title: "Setup Google Ads", status: "Completed", budget: 200, deadline: "2026-07-12" },
]

const sc: Record<string, string> = {
  Open: "bg-amber-50 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

export default function MyTasksPage() {
  return (
    <DashboardShell role="client" userName="John">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-1">Tasks</p>
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-bold text-[#0F172A]">My Tasks</h1>
          <Link href="/dashboard/client/post-task"><Button variant="plastic" className="rounded-lg">Post New Task</Button></Link>
        </div>
      </div>
      <div className="rounded-xl border border-[#F1F5F9] bg-white">
        <div className="grid grid-cols-[1fr_120px_100px_100px] gap-4 border-b border-[#F1F5F9] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8]">
          <span>Task</span><span>Budget</span><span>Status</span><span>Actions</span>
        </div>
        {tasks.map((t) => (
          <div key={t.id} className="grid grid-cols-[1fr_120px_100px_100px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] last:border-0 text-sm">
            <div><p className="font-semibold text-[#0F172A]">{t.title}</p><p className="text-xs text-[#94A3B8]">Due {new Date(t.deadline).toLocaleDateString()}</p></div>
            <span className="font-semibold text-[#0F172A]">${t.budget}</span>
            <Badge variant="outline" className={`text-xs font-medium ${sc[t.status]}`}>{t.status}</Badge>
            <div className="flex gap-2">
              {t.status === "Open" && <Button size="icon" variant="ghost" className="size-8"><PencilIcon className="size-4" /></Button>}
              {t.status === "Open" && <Button size="icon" variant="ghost" className="size-8 text-red-500"><TrashIcon className="size-4" /></Button>}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
