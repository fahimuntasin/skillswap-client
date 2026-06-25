"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LayersIcon } from "lucide-react"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth/session", { credentials: "include" }).then(r => r.json()).then((s: any) => {
      if (!s?.user) { router.push("/login"); return }
      const role = s.user.role
      if (role === "admin") router.push("/dashboard/admin")
      else if (role === "freelancer") router.push("/dashboard/freelancer")
      else router.push("/dashboard/client")
    }).catch(() => router.push("/login"))
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
