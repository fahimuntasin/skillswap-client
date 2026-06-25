"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LayersIcon } from "lucide-react"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const updateRole = async (userId: string, role: string) => {
      try { await fetch("/api/auth/update-user", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: userId, role }) }) } catch {}
    }

    fetch("/api/auth/session", { credentials: "include" }).then(r => r.json()).then(async (s: any) => {
      if (!s?.user) {
        setTimeout(() => { window.location.href = "/login" }, 500)
        return
      }
      const pendingRole = typeof window !== "undefined" ? sessionStorage.getItem("pending_role") : null
      if (pendingRole && pendingRole !== s.user.role) {
        await updateRole(s.user.id, pendingRole)
        s.user.role = pendingRole
        sessionStorage.removeItem("pending_role")
      }
      const role = s.user.role
      if (role === "admin") window.location.href = "/dashboard/admin"
      else if (role === "freelancer") window.location.href = "/dashboard/freelancer"
      else window.location.href = "/dashboard/client"
    }).catch(() => { setTimeout(() => { window.location.href = "/login" }, 500) })
  }, [router])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-[#7C3AED] animate-pulse">
          <LayersIcon className="size-6 text-white" />
        </div>
        <p className="text-sm text-[#64748B] dark:text-[#94a3b8]">Completing sign in...</p>
      </div>
    </div>
  )
}
