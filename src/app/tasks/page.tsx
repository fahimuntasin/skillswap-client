"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClockIcon, DollarSignIcon, SearchIcon } from "lucide-react"

const tasks = [
  { id: "1", title: "Design a modern landing page", client: "TechCorp", category: "Design", budget: 150, deadline: "2026-07-15" },
  { id: "2", title: "Fix CSS responsive bugs", client: "WebAgency", category: "Development", budget: 80, deadline: "2026-07-10" },
  { id: "3", title: "Write SEO blog article", client: "ContentHub", category: "Writing", budget: 100, deadline: "2026-07-20" },
  { id: "4", title: "Setup Google Ads campaign", client: "GrowthInc", category: "Marketing", budget: 200, deadline: "2026-07-12" },
  { id: "5", title: "Create logo and brand kit", client: "StartupX", category: "Design", budget: 250, deadline: "2026-07-18" },
  { id: "6", title: "Debug Node.js API errors", client: "DevSquad", category: "Development", budget: 120, deadline: "2026-07-08" },
  { id: "7", title: "Translate blog to French", client: "GlobalReach", category: "Writing", budget: 90, deadline: "2026-07-25" },
  { id: "8", title: "Redesign mobile app UI", client: "AppFlow", category: "Design", budget: 350, deadline: "2026-08-01" },
  { id: "9", title: "Social media strategy", client: "BrandX", category: "Marketing", budget: 180, deadline: "2026-07-30" },
]

const categories = ["All", "Design", "Writing", "Development", "Marketing", "Other"]

export default function BrowseTasksPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [page, setPage] = useState(1)

  const filtered = tasks.filter(t => {
    const matchSearch = search ? t.title.toLowerCase().includes(search.toLowerCase()) : true
    const matchCat = category !== "All" ? t.category === category : true
    return matchSearch && matchCat
  })

  const perPage = 9
  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="min-h-[calc(100vh-4rem)] border-b border-[#d1d9e0]">
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#7C3AED] mb-2">Explore</p>
          <h1 className="text-[40px] font-bold text-[#0F172A] tracking-[-0.02em]">Browse Tasks</h1>
          <p className="mt-2 text-[#64748B] text-base">Find the perfect task and start earning</p>
        </div>

        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
            <Input placeholder="Search tasks..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="pl-9 h-11 rounded-lg border-[#E2E8F0]" />
          </div>
          <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1) }}>
            <SelectTrigger className="w-full sm:w-[180px] h-11 rounded-lg border-[#E2E8F0]"><SelectValue /></SelectTrigger>
            <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((t) => (
            <Link key={t.id} href={`/tasks/${t.id}`} className="group rounded-xl border border-[#F1F5F9] bg-white p-5 transition-all duration-200 hover:border-[#E2E8F0] hover:-translate-y-1">
              <Badge variant="secondary" className="mb-3 bg-[#F5F3FF] text-[#7C3AED] border-0 font-medium text-xs">{t.category}</Badge>
              <h3 className="text-[15px] font-semibold text-[#0F172A] group-hover:text-[#7C3AED] transition-colors line-clamp-2 mb-2">{t.title}</h3>
              <p className="text-[13px] text-[#64748B] mb-4">by {t.client}</p>
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-1 font-semibold text-[#0F172A]"><DollarSignIcon className="size-3.5" />${t.budget}</span>
                <span className="flex items-center gap-1 text-[#64748B]"><ClockIcon className="size-3.5" />{new Date(t.deadline).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-medium text-[#64748B] hover:border-[#0F172A] hover:text-[#0F172A] disabled:opacity-40 transition-all">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${page === i + 1 ? "bg-[#0F172A] text-white" : "border border-[#E2E8F0] text-[#64748B] hover:border-[#0F172A]"}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-medium text-[#64748B] hover:border-[#0F172A] hover:text-[#0F172A] disabled:opacity-40 transition-all">Next</button>
          </div>
        )}
      </div>
    </div>
  )
}
