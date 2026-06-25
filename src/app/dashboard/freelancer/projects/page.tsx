"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UploadIcon, ExternalLinkIcon, LoaderIcon } from "lucide-react"
import { api } from "@/lib/api"
import { toast } from "sonner"

export default function ActiveProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deliverableUrl, setDeliverableUrl] = useState("")
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.getProposals("status=accepted").then((data) => {
      const p = Array.isArray(data) ? data : []
      setProjects(p.map((prop: any) => ({
        id: prop._id,
        taskId: prop.task_id,
        task: prop.task_title || "Unknown Task",
        client: prop.client_email || "Unknown",
        budget: prop.proposed_budget || 0,
        status: "In Progress",
        deliverable: null,
      })))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  async function handleSubmitDeliverable() {
    if (!selectedTask || !deliverableUrl) return
    setSubmitting(true)
    try {
      await api.updateTask(selectedTask, { status: "completed", deliverable_url: deliverableUrl })
      toast.success("Deliverable submitted!")
      setDeliverableUrl("")
      setSelectedTask(null)
      setProjects(prev => prev.map(p => p.taskId === selectedTask ? { ...p, status: "Completed", deliverable: deliverableUrl } : p))
    } catch {
      toast.error("Failed to submit deliverable")
    } finally { setSubmitting(false) }
  }

  if (loading) return (
    <DashboardShell role="freelancer" userName="">
      <div className="flex items-center justify-center py-20"><LoaderIcon className="size-6 animate-spin text-[#7C3AED]" /></div>
    </DashboardShell>
  )

  return (
    <DashboardShell role="freelancer" userName="">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#7C3AED] mb-1">Work</p>
        <h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc]">Active Projects</h1>
      </div>
      {projects.length === 0 ? (
        <p className="text-[#64748B] dark:text-[#94a3b8] py-10 text-center">No active projects yet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-[15px] font-semibold text-[#0F172A] dark:text-[#f8fafc]">{p.task}</h3>
                  <p className="text-sm text-[#64748B] dark:text-[#94a3b8]">Client: {p.client} · ${p.budget}</p>
                </div>
                <Badge className={`text-xs font-medium ${p.status === "Completed" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`}>{p.status}</Badge>
              </div>
              {p.status === "In Progress" && (
                <Dialog>
                  <DialogTrigger render={<Button variant="plastic" size="sm" className="gap-1.5 rounded-lg" onClick={() => setSelectedTask(p.taskId)}><UploadIcon className="size-3.5" /> Submit Deliverable</Button>} />
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader><DialogTitle>Submit Deliverable</DialogTitle></DialogHeader>
                    <div className="space-y-4 pt-2">
                      <div className="grid gap-2">
                        <Label>Deliverable URL</Label>
                        <Input value={deliverableUrl} onChange={e => setDeliverableUrl(e.target.value)} placeholder="https://github.com/..." className="h-11 rounded-lg" />
                      </div>
                      <Button variant="plastic" className="w-full h-11 rounded-lg" disabled={!deliverableUrl || submitting} onClick={handleSubmitDeliverable}>
                        {submitting ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {p.deliverable && (
                <a href={p.deliverable} target="_blank" className="inline-flex items-center gap-1 text-sm font-medium text-[#7C3AED] hover:underline mt-2">
                  <ExternalLinkIcon className="size-3.5" /> View Deliverable
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
