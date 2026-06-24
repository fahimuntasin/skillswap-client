"use client"

import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"

const freelancers = [
  { id: "1", name: "Sarah Chen", role: "UI/UX Designer", skills: ["Figma", "Branding", "Prototyping"], rating: 4.9, jobs: 87, rate: 45 },
  { id: "2", name: "Alex Rivera", role: "Full-Stack Developer", skills: ["React", "Node.js", "TypeScript"], rating: 4.8, jobs: 64, rate: 55 },
  { id: "3", name: "Emily Park", role: "Content Writer", skills: ["Copywriting", "SEO", "Blogging"], rating: 4.7, jobs: 52, rate: 35 },
  { id: "4", name: "David Kim", role: "Marketing Expert", skills: ["PPC", "Analytics", "Strategy"], rating: 4.9, jobs: 93, rate: 60 },
  { id: "5", name: "Mia Johnson", role: "Illustrator", skills: ["Illustration", "Logo", "Brand"], rating: 4.6, jobs: 41, rate: 40 },
  { id: "6", name: "Ryan Patel", role: "Backend Developer", skills: ["Python", "Django", "AWS"], rating: 4.8, jobs: 78, rate: 65 },
  { id: "7", name: "Lisa Wong", role: "SEO Specialist", skills: ["SEO", "SEM", "Analytics"], rating: 4.5, jobs: 36, rate: 30 },
  { id: "8", name: "James Lee", role: "Graphic Designer", skills: ["Photoshop", "Illustrator"], rating: 4.7, jobs: 59, rate: 50 },
  { id: "9", name: "Nina Gupta", role: "Data Analyst", skills: ["Python", "SQL", "Tableau"], rating: 4.8, jobs: 45, rate: 55 },
]

export default function FreelancersPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] border-b border-[#d1d9e0]">
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#7C3AED] mb-2">Talent</p>
          <h1 className="text-[40px] font-bold text-[#0F172A] tracking-[-0.02em]">Browse Freelancers</h1>
          <p className="mt-2 text-[#64748B] text-base">Find skilled professionals for your next task</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {freelancers.map((f) => (
            <Link key={f.id} href={`/freelancers/${f.id}`} className="group rounded-xl border border-[#F1F5F9] bg-white p-5 transition-all duration-200 hover:border-[#E2E8F0] hover:-translate-y-1">
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="size-12 ring-2 ring-[#F5F3FF] ring-offset-2 ring-offset-white">
                  <AvatarFallback className="bg-[#7C3AED] text-white font-semibold">{f.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-[#0F172A] group-hover:text-[#7C3AED] transition-colors truncate">{f.name}</h3>
                  <p className="text-[13px] text-[#64748B]">{f.role}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <StarIcon className="size-3 fill-amber-400 text-amber-400" />
                    <span className="text-[13px] font-medium text-[#0F172A]">{f.rating}</span>
                    <span className="text-[12px] text-[#94A3B8]">({f.jobs} jobs)</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {f.skills.slice(0, 3).map((s) => (
                  <Badge key={s} variant="outline" className="text-[11px] border-[#EDE9FE] text-[#7C3AED] bg-[#FAF5FF] font-medium">{s}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-3">
                <span className="text-[12px] text-[#94A3B8]">Hourly rate</span>
                <span className="text-base font-bold text-[#0F172A]">${f.rate}<span className="text-[11px] font-normal text-[#94A3B8]">/hr</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
