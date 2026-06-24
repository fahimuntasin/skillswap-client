"use client"

import { useEffect, useState } from "react"
import { BellIcon } from "lucide-react"
import { toast } from "sonner"

export function NotificationBell() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await fetch("/api/notifications")
        if (res.ok) {
          const data = await res.json()
          if (data.unread > count) {
            toast(`You have ${data.unread} new notification(s)`)
          }
          setCount(data.unread)
        }
      } catch {}
    }
    fetchNotifs()
    const interval = setInterval(fetchNotifs, 30000)
    return () => clearInterval(interval)
  }, [count])

  return (
    <button className="relative inline-flex size-9 items-center justify-center rounded-[6px] border border-[#E2E8F0] dark:border-[#2a2a3e] bg-white dark:bg-[#0a0a0b] hover:bg-[#F8FAFC] dark:hover:bg-[#1a1a2e] transition-colors" aria-label="Notifications">
      <BellIcon className="size-4 text-[#0F172A] dark:text-[#f8fafc]" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#7C3AED] text-[9px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  )
}
