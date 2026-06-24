"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader } from "@/components/ui/Loader"
import { ClockIcon, DollarSignIcon, SearchIcon } from "lucide-react"
import { api } from "@/lib/api"

const categories = ["All", "Design", "Writing", "Development", "Marketing", "Other"]

export default function BrowseTasksPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [page, setPage] = useState(1)
  const [tasks, setTasks] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set("page", String(page))
      params.set("limit", "9")
      if (category !== "All") params.set("category", category)
      if (search) params.set("search", search)
      const data = await api.getTasks(params.toString())
      setTasks(data.tasks || [])
      setTotalPages(data.totalPages || 0)
    } catch { setTasks([]) }
    finally { setLoading(false) }
  }, [page, category, search])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  return (
    <div className="min-h-[calc(100vh-4rem)] border-b border-[#d1d9e0] dark:border-[#2a2a3e]">
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#7C3AED] mb-2">Explore</p>
          <h1 className="text-[40px] font-bold text-[#0F172A] dark:text-[#f8fafc] tracking-[-0.02em]">Browse Tasks</h1>
          <p className="mt-2 text-[#64748B] dark:text-[#94a3b8] text-base">Find the perfect task and start earning</p>
        </div>

        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
            <Input placeholder="Search tasks..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="pl-9 h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc]" />
          </div>
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }} className="h-11 rounded-lg border border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] bg-white px-3 text-sm text-[#0F172A] w-full sm:w-[180px] outline-none focus:border-[#7C3AED]">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {loading ? <Loader /> : tasks.length === 0 ? (
          <p className="text-center text-[#64748B] py-20">No tasks found. Try different filters.</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((t: any) => (
                <Link key={t._id} href={`/tasks/${t._id}`} className="group rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] p-5 transition-all duration-200 hover:border-[#E2E8F0] dark:hover:border-[#3a3a5e] hover:-translate-y-1">
                  <Badge variant="secondary" className="mb-3 bg-[#F5F3FF] dark:bg-[#2d1f5e] text-[#7C3AED] dark:text-[#c4b5fd] border-0 font-medium text-xs">{t.category}</Badge>
                  <h3 className="text-[15px] font-semibold text-[#0F172A] dark:text-[#f8fafc] group-hover:text-[#7C3AED] transition-colors line-clamp-2 mb-2">{t.title}</h3>
                  <p className="text-[13px] text-[#64748B] dark:text-[#94a3b8] mb-4">by {t.client_email}</p>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-1 font-semibold text-[#0F172A] dark:text-[#f8fafc]"><DollarSignIcon className="size-3.5" />${t.budget}</span>
                    <span className="flex items-center gap-1 text-[#64748B] dark:text-[#94a3b8]"><ClockIcon className="size-3.5" />{new Date(t.deadline).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-[#E2E8F0] dark:border-[#2a2a3e] dark:text-[#94a3b8] px-4 py-2 text-sm font-medium text-[#64748B] hover:border-[#0F172A] dark:hover:border-[#4a4a6e] disabled:opacity-40 transition-all">Previous</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${page === i + 1 ? "bg-[#0F172A] text-white dark:bg-[#f8fafc] dark:text-[#0F172A]" : "border border-[#E2E8F0] dark:border-[#2a2a3e] text-[#64748B] dark:text-[#94a3b8] hover:border-[#0F172A] dark:hover:border-[#4a4a6e]"}`}>{i + 1}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg border border-[#E2E8F0] dark:border-[#2a2a3e] dark:text-[#94a3b8] px-4 py-2 text-sm font-medium text-[#64748B] hover:border-[#0F172A] dark:hover:border-[#4a4a6e] disabled:opacity-40 transition-all">Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
