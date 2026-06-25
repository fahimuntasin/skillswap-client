"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircleIcon, BriefcaseIcon, ClockIcon, DollarSignIcon } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import { getSession } from "@/lib/auth-client"

const statusColor: Record<string, string> = {
  Open: "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700/50",
  "In Progress": "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700/50",
}

export default function ClientDashboardPage() {
  const [session, setSession] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSession().then((s) => {
      setSession(s)
      if (s?.user?.email) {
        api.getClientTasks(s.user.email).then((data) => {
          setTasks(Array.isArray(data) ? data : [])
        }).catch(() => {})
      }
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const totalTasks = tasks.length
  const openTasks = tasks.filter((t) => t.status === "open" || t.status === "Open").length
  const inProgress = tasks.filter((t) => t.status === "In Progress" || t.status === "in_progress").length
  const totalSpent = tasks
    .filter((t) => t.status === "Completed" || t.status === "completed")
    .reduce((s, t) => s + (t.budget || 0), 0)

  const stats = [
    { label: "Total Tasks", value: String(totalTasks), icon: BriefcaseIcon, color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30" },
    { label: "Open Tasks", value: String(openTasks), icon: ClockIcon, color: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30" },
    { label: "In Progress", value: String(inProgress), icon: BriefcaseIcon, color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30" },
    { label: "Total Spent", value: `$${totalSpent}`, icon: DollarSignIcon, color: "text-primary bg-primary/10 dark:text-[#a78bfa] dark:bg-primary/20" },
  ]

  return (
    <DashboardShell role="client" userName={session?.user?.name || "Client"}>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#f8fafc]">Welcome back, {session?.user?.name || "Client"}</h1>
            <p className="text-muted-foreground dark:text-[#94a3b8]">Here&apos;s what&apos;s happening with your tasks</p>
          </div>
          <Link href="/dashboard/client/post-task">
            <Button variant="plastic" className="gap-2 w-full sm:w-auto">
              <PlusCircleIcon className="size-4" />
              Post New Task
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-2 border-transparent hover:border-primary/20 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground dark:text-[#94a3b8]">{stat.label}</CardTitle>
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <stat.icon className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0F172A] dark:text-[#f8fafc]">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#0F172A] dark:text-[#f8fafc]">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground dark:text-[#94a3b8]">Loading...</p>
            ) : tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground dark:text-[#94a3b8]">No tasks yet. Post your first task!</p>
            ) : (
              <div className="space-y-3">
                {tasks.slice(0, 5).map((task: any) => (
                  <div key={task._id} className="flex items-center justify-between rounded-lg border border-[#E2E8F0] dark:border-[#2a2a3e] p-3 hover:bg-muted/50 dark:hover:bg-[#2a274a]/50 transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate text-[#0F172A] dark:text-[#f8fafc]">{task.title}</p>
                      <p className="text-sm text-muted-foreground dark:text-[#94a3b8]">Due {new Date(task.deadline).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className="text-sm font-semibold text-primary dark:text-[#a78bfa]">${task.budget}</span>
                      <Badge variant="outline" className={statusColor[task.status === "open" ? "Open" : task.status === "in_progress" ? "In Progress" : task.status]}>
                        {task.status === "open" ? "Open" : task.status === "in_progress" ? "In Progress" : task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
