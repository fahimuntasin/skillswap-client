"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { UsersIcon, BriefcaseIcon, DollarSignIcon, TrendingUpIcon } from "lucide-react"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalUsers: 0, totalTasks: 0, totalRevenue: 0, activeTasks: 0 })

  useEffect(() => { api.getStats().then(setStats).catch(() => {}) }, [])

  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="space-y-8">
        <div><h1 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">Admin Dashboard</h1><p className="text-muted-foreground dark:text-[#94a3b8]">Platform overview and management</p></div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[{ l: "Total Users", v: stats.totalUsers, i: UsersIcon, c: "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400" }, { l: "Total Tasks", v: stats.totalTasks, i: BriefcaseIcon, c: "text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400" }, { l: "Total Revenue", v: `$${stats.totalRevenue}`, i: DollarSignIcon, c: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400" }, { l: "Active Tasks", v: stats.activeTasks, i: TrendingUpIcon, c: "text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400" }].map(s => (
            <Card key={s.l} className="border-2 border-transparent hover:border-primary/20 transition-all dark:bg-[#1c1a3a] dark:border-[#2a2a3e]">
              <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground dark:text-[#94a3b8]">{s.l}</CardTitle><div className={`rounded-lg p-2 ${s.c}`}><s.i className="size-4" /></div></CardHeader>
              <CardContent><div className="text-2xl font-bold text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">{s.v}</div></CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue chart */}
        <Card className="dark:bg-[#1c1a3a] dark:border-[#2a2a3e]">
          <CardHeader><CardTitle className="text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">Revenue Overview</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end gap-6 h-40">
              {["Jan","Feb","Mar","Apr","May","Jun"].map((m, i) => {
                const h = [40, 60, 45, 80, 55, 90][i]
                return (
                  <div key={m} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">${h * 10}</span>
                    <div className="w-full bg-[#7C3AED] rounded-t-md transition-all hover:bg-[#6D28D9]" style={{ height: `${h}%` }} />
                    <span className="text-xs text-[#94A3B8] dark:text-[#64748b]">{m}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
