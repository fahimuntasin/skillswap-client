"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const categories = ["Design", "Writing", "Development", "Marketing", "Other"]

export default function PostTaskPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    try {
      const res = await fetch("http://localhost:3001/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.get("title"),
          category: form.get("category"),
          description: form.get("description"),
          budget: Number(form.get("budget")),
          deadline: form.get("deadline"),
          client_email: "client@example.com",
        }),
      })
      if (!res.ok) throw new Error("Failed")
      toast.success("Task posted successfully!")
      router.push("/dashboard/client")
    } catch {
      toast.error("Failed to post task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardShell role="client" userName="John">
      <div className="max-w-[640px]">
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#7C3AED] mb-1">Create</p>
          <h1 className="text-[28px] font-bold text-[#0F172A] tracking-[-0.02em]">Post a New Task</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-2"><Label>Task Title</Label><Input name="title" placeholder="e.g. Design a landing page" required className="h-11 rounded-lg border-[#E2E8F0]" /></div>
          <div className="grid gap-2"><Label>Category</Label><Select name="category" required><SelectTrigger className="h-11 rounded-lg border-[#E2E8F0]"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
          <div className="grid gap-2"><Label>Description</Label><Textarea name="description" placeholder="Describe your task in detail..." rows={5} className="rounded-lg border-[#E2E8F0]" required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2"><Label>Budget (USD)</Label><Input name="budget" type="number" min={1} placeholder="150" required className="h-11 rounded-lg border-[#E2E8F0]" /></div>
            <div className="grid gap-2"><Label>Deadline</Label><Input name="deadline" type="date" required className="h-11 rounded-lg border-[#E2E8F0]" /></div>
          </div>
          <Button type="submit" variant="plastic" className="h-11 px-8 rounded-lg" disabled={loading}>{loading ? "Posting..." : "Post Task"}</Button>
        </form>
      </div>
    </DashboardShell>
  )
}
