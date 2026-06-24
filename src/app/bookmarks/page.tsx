"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useBookmarks } from "@/lib/bookmarks"
import { api } from "@/lib/api"
import { BookmarkIcon, DollarSignIcon, ClockIcon } from "lucide-react"

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks()
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    if (bookmarks.length) {
      api.getTasks().then((d: any) => setTasks((d.tasks || []).filter((t: any) => bookmarks.includes(t._id))))
    }
  }, [bookmarks])

  return (
    <div className="min-h-[calc(100vh-4rem)] border-b border-[#d1d9e0] dark:border-[#2a2a3e]">
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        <h1 className="text-[40px] font-bold text-[#0F172A] dark:text-[#f8fafc] mb-2">My Bookmarks</h1>
        <p className="text-[#64748B] dark:text-[#94a3b8] mb-10">{bookmarks.length} saved tasks</p>
        {!tasks.length ? <p className="text-[#64748B]">No bookmarks yet. Save tasks to view them here.</p> : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((t: any) => (
              <Link key={t._id} href={`/tasks/${t._id}`} className="group rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] p-5 hover:-translate-y-1 transition-all">
                <Badge className="mb-3 bg-[#F5F3FF] dark:bg-[#2d1f5e] text-[#7C3AED] dark:text-[#c4b5fd] border-0 text-xs">{t.category}</Badge>
                <h3 className="font-semibold text-[#0F172A] dark:text-[#f8fafc] mb-2">{t.title}</h3>
                <div className="flex justify-between text-sm"><span className="flex items-center gap-1"><DollarSignIcon className="size-3.5" />${t.budget}</span><span className="flex items-center gap-1 text-[#64748B]"><ClockIcon className="size-3.5" />{new Date(t.deadline).toLocaleDateString()}</span></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
