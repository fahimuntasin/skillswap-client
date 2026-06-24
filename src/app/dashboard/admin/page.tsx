"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { UsersIcon, BriefcaseIcon, DollarSignIcon, TrendingUpIcon } from "lucide-react"

const stats = [
  { label: "Total Users", value: "156", icon: UsersIcon, color: "text-blue-600 bg-blue-50" },
  { label: "Total Tasks", value: "89", icon: BriefcaseIcon, color: "text-purple-600 bg-purple-50" },
  { label: "Total Revenue", value: "$12,450", icon: DollarSignIcon, color: "text-primary bg-primary/10" },
  { label: "Active Tasks", value: "34", icon: TrendingUpIcon, color: "text-emerald-600 bg-emerald-50" },
]

export default function AdminDashboardPage() {
  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
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
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Manage Users", desc: "View and block users", href: "/dashboard/admin/users" },
                { label: "Manage Tasks", desc: "Monitor all platform tasks", href: "/dashboard/admin/tasks" },
                { label: "Transactions", desc: "Payment history overview", href: "/dashboard/admin/transactions" },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="group rounded-lg border p-4 transition-all hover:border-primary/30 hover:bg-accent/50"
                >
                  <p className="font-semibold group-hover:text-primary transition-colors">{action.label}</p>
                  <p className="text-sm text-muted-foreground">{action.desc}</p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
