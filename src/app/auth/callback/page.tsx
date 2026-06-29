"use client"

import { useEffect } from "react"
import { LayersIcon } from "lucide-react"
import { homePathForRole } from "@/lib/auth-routes"

export default function AuthCallbackPage() {
  useEffect(() => {
    fetch("/api/auth/session", { credentials: "include" })
      .then((r) => r.json())
      .then((s: any) => {
        if (!s?.user) {
          setTimeout(() => { window.location.href = "/login" }, 500)
          return
        }
        window.location.href = homePathForRole(s.user.role)
      })
      .catch(() => { setTimeout(() => { window.location.href = "/login" }, 500) })
  }, [])

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
