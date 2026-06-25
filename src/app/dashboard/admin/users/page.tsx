"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { ShieldCheckIcon } from "lucide-react"
import { toast } from "sonner"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => { api.getUsers("limit=100").then(setUsers).catch(() => {}) }, [])

  async function toggleBlock(id: string, blocked: boolean) {
    await api.updateUser(id, { isBlocked: !blocked })
    setUsers(prev => prev.map(u => u._id === id ? { ...u, isBlocked: !blocked } : u))
    toast.success(blocked ? "User unblocked" : "User blocked")
  }

  async function toggleVerify(id: string, verified: boolean) {
    await api.updateUser(id, { verified: !verified })
    setUsers(prev => prev.map(u => u._id === id ? { ...u, verified: !verified } : u))
    toast.success(verified ? "Verification removed" : "Freelancer verified")
  }

  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="mb-6"><p className="text-sm font-semibold text-[#7C3AED] mb-1">Admin</p><h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc]">Manage Users</h1></div>
      <div className="overflow-x-auto rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a]">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[1fr_1fr_80px_80px_120px] gap-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] px-6 py-3 text-xs font-semibold uppercase text-[#94A3B8] dark:text-[#64748b]">
            <span>Name</span><span>Email</span><span>Role</span><span>Status</span><span>Actions</span>
          </div>
          {users.map((u: any) => (
            <div key={u._id} className="grid grid-cols-[1fr_1fr_80px_80px_120px] gap-4 items-center px-6 py-4 border-b border-[#F1F5F9] dark:border-[#2a2a3e] last:border-0 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#0F172A] dark:text-[#f8fafc]">{u.name}</span>
              {u.verified && <ShieldCheckIcon className="size-4 text-[#7C3AED]" />}
            </div>
            <span className="text-[#64748B] dark:text-[#94a3b8]">{u.email}</span>
            <Badge variant="outline" className="text-xs font-medium capitalize dark:border-[#2a2a3e]">{u.role}</Badge>
            <Badge className={`text-xs font-medium ${u.isBlocked ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`}>{u.isBlocked ? "Blocked" : "Active"}</Badge>
            <div className="flex gap-1.5">
              <Button size="sm" variant={u.isBlocked ? "plastic" : "outline"} className="rounded-lg text-xs" onClick={() => toggleBlock(u._id, u.isBlocked)}>{u.isBlocked ? "Unblock" : "Block"}</Button>
              {u.role === "freelancer" && (
                <Button size="sm" variant="ghost" className="rounded-lg text-xs" onClick={() => toggleVerify(u._id, u.verified)}>{u.verified ? "Unverify" : "Verify"}</Button>
              )}
            </div>
            </div>
          ))}
          </div>
        </div>
    </DashboardShell>
  )
}
