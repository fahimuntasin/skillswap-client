"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useReveal } from "@/lib/use-reveal"
import { AnimatedLines } from "@/components/home/decor/Decorations"
import { ShieldCheckIcon } from "lucide-react"

const features = [
  {
    tag: "Post tasks instantly",
    title: "Get your tasks in front of skilled freelancers",
    desc: "Describe what you need, set a budget and deadline. Freelancers see it immediately and start applying.",
    link: "Post a Task",
    href: "/register",
    bg: "bg-[#F8FAFC] dark:bg-[#0e0e16]",
    reverse: false,
    preview: "task" as const,
  },
  {
    tag: "Find top talent",
    title: "Hire the best freelancers",
    desc: "Review proposals, compare pricing, check ratings, and hire with confidence. Only pay for work you approve.",
    link: "Browse Freelancers",
    href: "/freelancers",
    bg: "bg-white dark:bg-[#111118]",
    reverse: true,
    preview: "freelancers" as const,
  },
  {
    tag: "Pay securely",
    title: "Payment held until you're satisfied",
    desc: "Pay via Stripe — funds are held securely until you approve the delivered work. No risk, total transparency.",
    link: "Learn about payments",
    href: "/register",
    bg: "bg-[#F8FAFC] dark:bg-[#0e0e16]",
    reverse: false,
    preview: "payment" as const,
  },
]

function FeatureRow({ f, i, task, freelancers }: {
  f: typeof features[0]
  i: number
  task: any
  freelancers: any[]
}) {
  const { ref, visible } = useReveal()
  const cardBg = "bg-white dark:bg-[#1c1a3a]"
  const cardBorder = "border-[#d1d9e0] dark:border-[#2a2a3e]"

  return (
    <div ref={ref}>
      {i > 0 && <div className="border-t border-[#d1d9e0] dark:border-[#2a2a3e]" />}
      <div className={`grid items-center gap-8 sm:gap-16 px-4 sm:px-6 py-12 sm:py-24 ${f.bg} ${f.reverse ? "lg:grid-cols-[55%_45%]" : "lg:grid-cols-[45%_55%]"} transition-all duration-700 overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className={f.reverse ? "lg:order-2" : ""}>
          <p className="mb-3 text-sm font-semibold text-[#7C3AED]">{f.tag}</p>
          <h2 className="text-[28px] leading-tight sm:text-[32px] font-bold text-[#0F172A] dark:text-[#f8fafc] tracking-[-0.02em]">{f.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-[#64748B] dark:text-[#94a3b8] max-w-[480px]">{f.desc}</p>
          <Link href={f.href} className="btn-action mt-6">{f.link}<span className="btn-arrow">→</span></Link>
        </div>
        <div className={`rounded-xl border ${cardBorder} ${cardBg} p-4 sm:p-6 ${f.reverse ? "lg:order-1" : ""} overflow-hidden max-w-full sm:max-w-[90%]`}>
          <div className="space-y-3">
            {f.preview === "task" && (
              task ? (
                <div className={`rounded-lg border ${cardBorder} p-4 dark:bg-[#16163a]`}>
                  <p className="text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc]">{task.title}</p>
                  <p className="text-xs text-[#64748B] dark:text-[#94a3b8] mt-1">{task.category} · ${task.budget} budget · Due {new Date(task.deadline).toLocaleDateString()}</p>
                </div>
              ) : (
                <p className="text-sm text-[#64748B] dark:text-[#94a3b8] p-4">No open tasks yet — be the first to post one.</p>
              )
            )}
            {f.preview === "freelancers" && (
              freelancers.length ? freelancers.slice(0, 2).map((fl) => (
                <div key={fl._id} className={`flex items-center gap-3 rounded-lg border ${cardBorder} p-3 dark:bg-[#16163a]`}>
                  <div className="size-8 rounded-full bg-[#EDE9FE] dark:bg-[#7C3AED]/30 flex items-center justify-center text-xs font-semibold text-[#7C3AED] dark:text-[#c4b5fd]">
                    {fl.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc] flex items-center gap-1">
                      {fl.name}
                      {fl.verified && <ShieldCheckIcon className="size-3.5 text-[#7C3AED]" />}
                    </p>
                    <p className="text-xs text-[#64748B] dark:text-[#94a3b8] truncate">
                      {fl.skills?.[0] || "Freelancer"} · ${fl.hourlyRate || 0}/hr · {fl.rating || 0} ★
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-[#64748B] dark:text-[#94a3b8] p-4">Freelancers will appear here as they join.</p>
              )
            )}
            {f.preview === "payment" && (
              <div className={`rounded-lg border ${cardBorder} p-4 text-center dark:bg-[#16163a]`}>
                <p className="text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc]">Secure Payment</p>
                <p className="text-xs text-[#64748B] dark:text-[#94a3b8] mt-1">Pay via Stripe · Funds held until approval</p>
                <p className="text-lg font-bold text-[#0F172A] dark:text-[#f8fafc] mt-2">{task ? `$${task.budget}.00` : "—"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeatureRows() {
  const [task, setTask] = useState<any>(null)
  const [freelancers, setFreelancers] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/tasks?limit=1").then((r) => r.json()).then((d) => setTask(d.tasks?.[0] || null)).catch(() => {})
    fetch("/api/freelancers?limit=4").then((r) => r.json()).then(setFreelancers).catch(() => {})
  }, [])

  return (
    <section className="relative border-b border-[#d1d9e0] dark:border-[#2a2a3e] overflow-hidden">
      <AnimatedLines />
      <div className="mx-auto max-w-[1280px] relative">
        {features.map((f, i) => (
          <FeatureRow key={i} f={f} i={i} task={task} freelancers={freelancers} />
        ))}
      </div>
    </section>
  )
}
