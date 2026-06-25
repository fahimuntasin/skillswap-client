"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { api } from "@/lib/api"

const sc: Record<string, string> = { Open: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", "In Progress": "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" }

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    api.getTasks("status=all&limit=100").then((data: any) => {
      setTasks(data?.tasks ? data.tasks : Array.isArray(data) ? data : [])
    }).catch(() => {})
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return
    try {
      await api.deleteTask(id)
      setTasks((prev) => prev.filter((t) => t._id !== id))
    } catch {
      alert("Failed to delete task")
    }
  }

  const statusLabel = (s: string) => s === "open" ? "Open" : s === "in_progress" ? "In Progress" : s === "completed" ? "Completed" : s

  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="mb-6"><p className="text-sm font-semibold text-[#7C3AED] mb-1">Admin</p><h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc]">Manage Tasks</h1></div>
      <div className="overflow-x-auto rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a]">
        <div className="min-w-[550px]">
          <div className="grid grid-cols-[1fr_140px_80px_80px_60px] gap-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8] dark:text-[#64748b]">
            <span>Title</span><span>Client</span><span>Budget</span><span>Status</span><span></span>
          </div>
          {tasks.length === 0 ? (
            <p className="px-6 py-8 text-sm text-[#94A3B8]">No tasks found.</p>
          ) : (
            tasks.map((t: any) => (
              <div key={t._id} className="grid grid-cols-[1fr_140px_80px_80px_60px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] last:border-0 text-sm">
                <span className="font-medium text-[#0F172A] dark:text-[#f8fafc]">{t.title}</span>
                <span className="text-[#64748B] dark:text-[#94a3b8]">{t.client_email}</span>
                <span className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">${t.budget}</span>
                <Badge className={`text-xs font-medium ${sc[statusLabel(t.status)] || ""}`}>{statusLabel(t.status)}</Badge>
                <Button size="icon" variant="ghost" className="size-8 text-red-500" onClick={() => handleDelete(t._id)}>
                  <TrashIcon className="size-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
