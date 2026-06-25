"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Loader } from "@/components/ui/Loader"
import { StarIcon } from "lucide-react"
import { api } from "@/lib/api"

export default function FreelancersPage() {
  const [freelancers, setFreelancers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getUsers("role=freelancer").then((users) => {
      setFreelancers(Array.isArray(users) ? users : [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><Loader /></div>

  return (
    <div className="min-h-[calc(100vh-4rem)] border-b border-[#d1d9e0] dark:border-[#2a2a3e]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-12 sm:py-16">
        <div className="mb-6 sm:mb-10">
          <p className="text-sm font-semibold text-[#7C3AED] mb-2">Talent</p>
          <h1 className="text-[28px] sm:text-[40px] font-bold text-[#0F172A] dark:text-[#f8fafc] tracking-[-0.02em]">Browse Freelancers</h1>
          <p className="mt-2 text-[#64748B] dark:text-[#94a3b8] text-sm sm:text-base">Find skilled professionals for your next task</p>
        </div>

        {freelancers.length === 0 ? (
          <p className="text-center text-[#64748B] dark:text-[#94a3b8] py-20">No freelancers found</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {freelancers.map((f: any) => (
              <Link key={f._id} href={`/freelancers/${f._id}`} className="group rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] p-5 transition-all duration-200 hover:border-[#E2E8F0] hover:-translate-y-1">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="size-12 ring-2 ring-[#F5F3FF] ring-offset-2 ring-offset-white">
                    {f.image ? (
                      <img src={f.image} alt={f.name} className="size-full rounded-full object-cover" />
                    ) : (
                      <AvatarFallback className="bg-[#7C3AED] text-white font-semibold">{f.name?.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold text-[#0F172A] dark:text-[#f8fafc] group-hover:text-[#7C3AED] transition-colors truncate">{f.name}</h3>
                    <p className="text-[13px] text-[#64748B] dark:text-[#94a3b8]">{f.role || "Freelancer"}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <StarIcon className="size-3 fill-amber-400 text-amber-400" />
                      <span className="text-[13px] font-medium text-[#0F172A] dark:text-[#f8fafc]">{f.rating || "0.0"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(f.skills || []).slice(0, 3).map((s: string) => (
                    <Badge key={s} variant="outline" className="text-[11px] border-[#EDE9FE] text-[#7C3AED] bg-[#FAF5FF] font-medium">{s}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-[#F1F5F9] dark:border-[#2a2a3e] pt-3">
                  <span className="text-[12px] text-[#94A3B8] dark:text-[#64748b]">Hourly rate</span>
                  <span className="text-base font-bold text-[#0F172A] dark:text-[#f8fafc]">${f.hourlyRate || 0}<span className="text-[11px] font-normal text-[#94A3B8] dark:text-[#64748b]">/hr</span></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
