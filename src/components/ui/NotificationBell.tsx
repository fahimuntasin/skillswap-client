"use client"

import { useEffect, useState, useRef } from "react"
import { BellIcon, XIcon } from "lucide-react"

type Notification = {
  id: string
  message: string
  type: string
  time: string
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifs, setNotifs] = useState<Notification[]>([])
  const [unread, setUnread] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await fetch("/api/notifications")
        if (res.ok) {
          const data = await res.json()
          setNotifs(data.notifications || [])
          setUnread(data.unread || 0)
        }
      } catch {}
    }
    fetchNotifs()
    const interval = setInterval(fetchNotifs, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const typeColor: Record<string, string> = {
    info: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative inline-flex size-9 items-center justify-center rounded-[6px] border border-[#E2E8F0] dark:border-[#2a2a3e] bg-white dark:bg-[#0a0a0b] hover:bg-[#F8FAFC] dark:hover:bg-[#1a1a2e] transition-colors"
        aria-label="Notifications"
      >
        <BellIcon className="size-4 text-[#0F172A] dark:text-[#f8fafc]" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#7C3AED] text-[9px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed sm:absolute right-2 sm:right-0 top-16 sm:top-full sm:mt-2 z-50 w-[calc(100vw-16px)] sm:w-[380px] rounded-xl border border-[#E2E8F0] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] dark:border-[#2a2a3e]">
            <p className="text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc]">Notifications</p>
            <button onClick={() => setOpen(false)} className="text-[#94A3B8] hover:text-[#64748B]">
              <XIcon className="size-4" />
            </button>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {notifs.length === 0 ? (
              <p className="px-4 py-8 text-sm text-[#94A3B8] text-center">No notifications yet.</p>
            ) : (
              notifs.map((n) => (
                <div key={n.id} className="flex items-start gap-3 px-4 py-3 border-b border-[#F1F5F9] dark:border-[#2a2a3e] last:border-0 hover:bg-[#F8FAFC] dark:hover:bg-[#2a2a3e] transition-colors">
                  <div className={`mt-0.5 shrink-0 size-2 rounded-full ${n.type === "success" ? "bg-emerald-500" : "bg-blue-500"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[#0F172A] dark:text-[#f8fafc]">{n.message}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
