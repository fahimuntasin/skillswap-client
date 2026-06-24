"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const users = [
  { id: "1", name: "John Client", email: "client@example.com", role: "client", blocked: false },
  { id: "2", name: "Sarah Chen", email: "sarah@example.com", role: "freelancer", blocked: false },
  { id: "3", name: "Alex Rivera", email: "alex@example.com", role: "freelancer", blocked: false },
  { id: "4", name: "Spam User", email: "spam@example.com", role: "client", blocked: true },
]

export default function AdminUsersPage() {
  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="mb-6"><p className="text-sm font-semibold text-[#7C3AED] mb-1">Admin</p><h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">Manage Users</h1></div>
      <div className="rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white">
        <div className="grid grid-cols-[1fr_1fr_100px_100px_100px] gap-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8] dark:text-[#64748b]">
          <span>Name</span><span>Email</span><span>Role</span><span>Status</span><span>Action</span>
        </div>
        {users.map((u) => (
          <div key={u.id} className="grid grid-cols-[1fr_1fr_100px_100px_100px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] last:border-0 text-sm">
            <span className="font-medium text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">{u.name}</span><span className="text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8]">{u.email}</span>
            <Badge variant="outline" className="text-xs font-medium capitalize">{u.role}</Badge>
            <Badge className={`text-xs font-medium ${u.blocked ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>{u.blocked ? "Blocked" : "Active"}</Badge>
            <Button size="sm" variant={u.blocked ? "plastic" : "outline"} className="rounded-lg text-xs">{u.blocked ? "Unblock" : "Block"}</Button>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
