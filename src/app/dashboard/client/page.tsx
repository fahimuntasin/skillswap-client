"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircleIcon, BriefcaseIcon, ClockIcon, DollarSignIcon } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Total Tasks", value: "12", icon: BriefcaseIcon, color: "text-blue-600 bg-blue-50" },
  { label: "Open Tasks", value: "5", icon: ClockIcon, color: "text-amber-600 bg-amber-50" },
  { label: "In Progress", value: "4", icon: BriefcaseIcon, color: "text-emerald-600 bg-emerald-50" },
  { label: "Total Spent", value: "$1,250", icon: DollarSignIcon, color: "text-primary bg-primary/10" },
]

const recentTasks = [
  { id: "1", title: "Design landing page", status: "Open", budget: 150, deadline: "2026-07-15" },
  { id: "2", title: "Fix CSS bugs", status: "In Progress", budget: 80, deadline: "2026-07-10" },
  { id: "3", title: "Write blog article", status: "Open", budget: 100, deadline: "2026-07-20" },
  { id: "4", title: "Setup Google Ads", status: "Completed", budget: 200, deadline: "2026-07-12" },
]

const statusColor: Record<string, string> = {
  Open: "border-amber-200 bg-amber-50 text-amber-700",
  "In Progress": "border-blue-200 bg-blue-50 text-blue-700",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
}

export default function ClientDashboardPage() {
  return (
    <DashboardShell role="client" userName="John Client">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, John</h1>
            <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your tasks</p>
          </div>
          <Link href="/dashboard/client/post-task">
            <Button variant="plastic" className="gap-2">
              <PlusCircleIcon className="size-4" />
              Post New Task
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-2 border-transparent hover:border-primary/20 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <stat.icon className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{task.title}</p>
                    <p className="text-sm text-muted-foreground">Due {new Date(task.deadline).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className="text-sm font-semibold text-primary">${task.budget}</span>
                    <Badge variant="outline" className={statusColor[task.status]}>
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
