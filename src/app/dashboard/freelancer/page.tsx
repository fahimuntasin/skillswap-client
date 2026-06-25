"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { FileTextIcon, ClockIcon, CheckCircleIcon, DollarSignIcon } from "lucide-react"
import { api } from "@/lib/api"
import { getSession } from "@/lib/auth-client"

const statusColor: Record<string, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700/50",
  accepted: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700/50",
  rejected: "border-red-200 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700/50",
}

export default function FreelancerDashboardPage() {
  const [session, setSession] = useState<any>(null)
  const [proposals, setProposals] = useState<any[]>([])
  const [earningsTotal, setEarningsTotal] = useState(0)

  useEffect(() => {
    getSession().then((s) => {
      setSession(s)
      if (s?.user?.email) {
        api.getProposals(`freelancer_email=${s.user.email}`).then((data) => {
          setProposals(Array.isArray(data) ? data : [])
        }).catch(() => {})
        api.getEarnings(s.user.email).then((data: any) => {
          const items = data?.earnings ? data.earnings : Array.isArray(data) ? data : []
          setEarningsTotal(items.reduce((sum: number, e: any) => sum + (e.amount || 0), 0))
        }).catch(() => {})
      }
    })
  }, [])

  const totalProposals = proposals.length
  const pending = proposals.filter((p) => p.status === "Pending").length
  const accepted = proposals.filter((p) => p.status === "Accepted").length

  const stats = [
    { label: "Total Proposals", value: String(totalProposals), icon: FileTextIcon, color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30" },
    { label: "Pending", value: String(pending), icon: ClockIcon, color: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30" },
    { label: "Accepted", value: String(accepted), icon: CheckCircleIcon, color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30" },
    { label: "Total Earnings", value: `$${earningsTotal}`, icon: DollarSignIcon, color: "text-primary bg-primary/10 dark:text-[#a78bfa] dark:bg-primary/20" },
  ]

  return (
    <DashboardShell role="freelancer" userName={session?.user?.name || "Freelancer"}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#f8fafc]">Welcome back, {session?.user?.name || "Freelancer"}</h1>
          <p className="text-muted-foreground dark:text-[#94a3b8]">Track your proposals and earnings</p>
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
            <CardTitle className="text-lg text-[#0F172A] dark:text-[#f8fafc]">Recent Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            {proposals.length === 0 ? (
              <p className="text-sm text-muted-foreground dark:text-[#94a3b8]">No proposals yet. Browse tasks to apply!</p>
            ) : (
              <div className="space-y-3">
                {proposals.slice(0, 5).map((p: any) => (
                  <div key={p._id} className="flex items-center justify-between rounded-lg border border-[#E2E8F0] dark:border-[#2a2a3e] p-3 hover:bg-muted/50 dark:hover:bg-[#2a274a]/50 transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate text-[#0F172A] dark:text-[#f8fafc]">{p.task?.title || p.task_id}</p>
                      <p className="text-sm text-muted-foreground dark:text-[#94a3b8]">{new Date(p.submitted_at || p.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className="text-sm font-semibold text-primary dark:text-[#a78bfa]">${p.proposed_budget}</span>
                      <Badge variant="outline" className={statusColor[p.status]}>
                        {p.status}
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
