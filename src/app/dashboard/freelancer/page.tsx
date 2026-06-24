"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { FileTextIcon, ClockIcon, CheckCircleIcon, DollarSignIcon } from "lucide-react"

const stats = [
  { label: "Total Proposals", value: "24", icon: FileTextIcon, color: "text-blue-600 bg-blue-50" },
  { label: "Pending", value: "8", icon: ClockIcon, color: "text-amber-600 bg-amber-50" },
  { label: "Accepted", value: "6", icon: CheckCircleIcon, color: "text-emerald-600 bg-emerald-50" },
  { label: "Total Earnings", value: "$3,450", icon: DollarSignIcon, color: "text-primary bg-primary/10" },
]

const proposals = [
  { id: "1", task: "Design landing page", budget: 120, date: "2026-07-01", status: "Pending" },
  { id: "2", task: "Fix CSS bugs", budget: 80, date: "2026-06-28", status: "Accepted" },
  { id: "3", task: "Write blog article", budget: 95, date: "2026-06-25", status: "Rejected" },
  { id: "4", task: "Setup Google Ads", budget: 180, date: "2026-06-20", status: "Accepted" },
]

const statusColor: Record<string, string> = {
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Accepted: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Rejected: "border-red-200 bg-red-50 text-red-700",
}

export default function FreelancerDashboardPage() {
  return (
    <DashboardShell role="freelancer" userName="Sarah Freelancer">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, Sarah</h1>
          <p className="text-muted-foreground">Track your proposals and earnings</p>
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
            <CardTitle className="text-lg">Recent Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {proposals.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{p.task}</p>
                    <p className="text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className="text-sm font-semibold text-primary">${p.budget}</span>
                    <Badge variant="outline" className={statusColor[p.status]}>
                      {p.status}
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
