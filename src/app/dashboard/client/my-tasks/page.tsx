"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PencilIcon, TrashIcon, XIcon, SaveIcon } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import { getSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const sc: Record<string, string> = {
  Open: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700/50",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700/50",
}

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [session, setSession] = useState<any>(null)
  const [editingTask, setEditingTask] = useState<any>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDesc, setEditDesc] = useState("")
  const [editBudget, setEditBudget] = useState("")
  const [editDeadline, setEditDeadline] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSession().then((s) => {
      setSession(s)
      if (s?.user?.email) {
        api.getClientTasks(s.user.email).then((data) => {
          setTasks(Array.isArray(data) ? data : [])
        }).catch(() => {})
      }
    })
  }, [])

  const statusLabel = (s: string) => s === "open" ? "Open" : s === "in_progress" ? "In Progress" : s === "completed" ? "Completed" : s

  const openEdit = (t: any) => {
    setEditingTask(t)
    setEditTitle(t.title)
    setEditDesc(t.description || "")
    setEditBudget(String(t.budget))
    setEditDeadline(t.deadline ? new Date(t.deadline).toISOString().split("T")[0] : "")
  }

  const handleSaveEdit = async () => {
    if (!editingTask) return
    setSaving(true)
    try {
      await api.updateTask(editingTask._id, { title: editTitle, description: editDesc, budget: Number(editBudget), deadline: new Date(editDeadline) })
      setTasks(prev => prev.map(t => t._id === editingTask._id ? { ...t, title: editTitle, description: editDesc, budget: Number(editBudget), deadline: new Date(editDeadline) } : t))
      toast.success("Task updated")
      setEditingTask(null)
    } catch { toast.error("Failed to update task") }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task? This cannot be undone.")) return
    try {
      const proposals = await api.getProposals(`task_id=${id}`)
      const accepted = Array.isArray(proposals) ? proposals.filter((p: any) => p.status === "Accepted") : []
      if (accepted.length > 0) { toast.error("Cannot delete: task has an accepted proposal"); return }
      await api.deleteTask(id)
      setTasks(prev => prev.filter(t => t._id !== id))
      toast.success("Task deleted")
    } catch { toast.error("Failed to delete task") }
  }

  return (
    <DashboardShell role="client" userName={session?.user?.name || "Client"}>
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-1">Tasks</p>
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc]">My Tasks</h1>
          <Link href="/dashboard/client/post-task"><Button variant="plastic" className="rounded-lg">Post New Task</Button></Link>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a]">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-[1fr_100px_90px_110px] gap-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8] dark:text-[#64748b]">
            <span>Task</span><span>Budget</span><span>Status</span><span>Actions</span>
          </div>
          {tasks.length === 0 ? (
            <p className="px-6 py-8 text-sm text-[#94A3B8]">No tasks found.</p>
          ) : (
            tasks.map((t: any) => (
              <div key={t._id} className="grid grid-cols-[1fr_100px_90px_110px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] last:border-0 text-sm">
                <div>
                  <p className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">{t.title}</p>
                  <p className="text-xs text-[#94A3B8] dark:text-[#64748b]">Due {new Date(t.deadline).toLocaleDateString()}</p>
                </div>
                <span className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">${t.budget}</span>
                <Badge variant="outline" className={`text-xs font-medium ${sc[statusLabel(t.status)]}`}>{statusLabel(t.status)}</Badge>
                <div className="flex gap-1.5">
                  {(t.status === "open" || t.status === "Open") && (
                    <>
                      <Button size="sm" variant="ghost" className="size-8" onClick={() => openEdit(t)}><PencilIcon className="size-4" /></Button>
                      <Button size="sm" variant="ghost" className="size-8 text-red-500" onClick={() => handleDelete(t._id)}><TrashIcon className="size-4" /></Button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
          </div>
        </div>

      <Dialog open={!!editingTask} onOpenChange={(o) => { if (!o) setEditingTask(null) }}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader><DialogTitle>Edit Task</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid gap-2"><Label>Title</Label><Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:text-[#f8fafc]" /></div>
            <div className="grid gap-2"><Label>Description</Label><Textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} rows={3} className="rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:text-[#f8fafc]" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2"><Label>Budget ($)</Label><Input type="number" value={editBudget} onChange={e => setEditBudget(e.target.value)} className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:text-[#f8fafc]" /></div>
              <div className="grid gap-2"><Label>Deadline</Label><Input type="date" value={editDeadline} onChange={e => setEditDeadline(e.target.value)} className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:text-[#f8fafc]" /></div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" className="rounded-lg" onClick={() => setEditingTask(null)}><XIcon className="size-4" /> Cancel</Button>
              <Button variant="plastic" className="rounded-lg gap-1.5" disabled={saving} onClick={handleSaveEdit}><SaveIcon className="size-4" /> {saving ? "Saving..." : "Save"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
