"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader } from "@/components/ui/Loader"
import { DollarSignIcon, ClockIcon, UserIcon } from "lucide-react"
import { api } from "@/lib/api"
import { getSession } from "@/lib/auth-client"
import { toast } from "sonner"

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getSession().then(setSession)
    api.getTask(id).then(setTask).finally(() => setLoading(false))
  }, [id])

  async function handleProposal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSubmitting(true)
    const form = new FormData(e.currentTarget)
    try {
      await api.createProposal({
        task_id: id,
        freelancer_email: session?.user?.email,
        proposed_budget: Number(form.get("budget")),
        estimated_days: Number(form.get("days")),
        cover_note: form.get("note"),
      })
      toast.success("Proposal submitted!")
    } catch { toast.error("Failed to submit proposal") }
    finally { setSubmitting(false) }
  }

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><Loader /></div>
  if (!task) return <div className="py-20 text-center text-[#64748B]">Task not found</div>

  return (
    <div className="min-h-[calc(100vh-4rem)] border-b border-[#d1d9e0] dark:border-[#2a2a3e]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          <div>
            <p className="text-sm font-semibold text-[#7C3AED] mb-2">Task Detail</p>
            <h1 className="text-[24px] sm:text-[36px] font-bold text-[#0F172A] dark:text-[#f8fafc] tracking-[-0.02em]">{task.title}</h1>
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge className="bg-[#F5F3FF] dark:bg-[#2d1f5e] text-[#7C3AED] dark:text-[#c4b5fd] border-0">{task.category}</Badge>
              <span className="flex items-center gap-1 text-sm text-[#64748B] dark:text-[#94a3b8]"><DollarSignIcon className="size-3.5" />${task.budget}</span>
              <span className="flex items-center gap-1 text-sm text-[#64748B] dark:text-[#94a3b8]"><ClockIcon className="size-3.5" />Due {new Date(task.deadline).toLocaleDateString()}</span>
              <span className="flex items-center gap-1 text-sm text-[#64748B] dark:text-[#94a3b8]"><UserIcon className="size-3.5" />{task.client_email}</span>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-[#475569] dark:text-[#cbd5e1]">{task.description}</p>
          </div>

          <div className="rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] p-6 h-fit sticky top-24">
            <h2 className="text-lg font-semibold text-[#0F172A] dark:text-[#f8fafc] mb-4">Submit a Proposal</h2>
            {!session?.user ? (
              <div className="text-center py-6 space-y-3">
                <p className="text-sm text-[#64748B] dark:text-[#94a3b8]">You must be logged in to submit a proposal.</p>
                <Link href="/login"><Button variant="plastic" className="w-full">Log in to Submit</Button></Link>
              </div>
            ) : (
            <form onSubmit={handleProposal} className="space-y-4">
              <div className="grid gap-2"><Label className="dark:text-[#e2e8f0]">Your Budget (USD)</Label><Input name="budget" type="number" min={1} required className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc]" /></div>
              <div className="grid gap-2"><Label className="dark:text-[#e2e8f0]">Estimated Days</Label><Input name="days" type="number" min={1} required className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc]" /></div>
              <div className="grid gap-2"><Label className="dark:text-[#e2e8f0]">Cover Note</Label><Textarea name="note" placeholder="Why you're the best fit..." rows={4} required className="rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc]" /></div>
              <Button type="submit" variant="plastic" className="w-full" disabled={submitting}>{submitting ? "Submitting..." : "Submit Proposal"}</Button>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
