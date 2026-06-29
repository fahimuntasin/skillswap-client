"use client"

import { useEffect, useState } from "react"

type Stats = { totalTasks: number; totalUsers: number; totalRevenue: number; freelancerCount: number }

function fmt(n: number, prefix = "") {
  if (n >= 1000) return `${prefix}${(n / 1000).toFixed(1).replace(/\.0$/, "")}k+`
  return `${prefix}${n}`
}

export function AuthPlatformStats() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  const items = stats
    ? [
        { n: fmt(stats.totalTasks), l: "Tasks posted" },
        { n: fmt(stats.freelancerCount), l: "Freelancers" },
        { n: fmt(stats.totalRevenue, "$"), l: "Paid out" },
      ]
    : [
        { n: "—", l: "Tasks posted" },
        { n: "—", l: "Freelancers" },
        { n: "—", l: "Paid out" },
      ]

  return (
    <div className="flex gap-6">
      {items.map((s) => (
        <div key={s.l}>
          <p className="text-lg font-bold text-[#8b5cf6]">{s.n}</p>
          <p className="text-[11px] text-[#94a3b8]">{s.l}</p>
        </div>
      ))}
    </div>
  )
}
