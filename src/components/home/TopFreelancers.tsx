import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "@heroicons/react/24/solid"

const freelancers = [
  { id: "1", name: "Sarah Chen", image: "", skills: ["UI Design", "Figma", "Branding"], rating: 4.9, jobsCompleted: 87 },
  { id: "2", name: "Alex Rivera", image: "", skills: ["React", "Node.js", "TypeScript"], rating: 4.8, jobsCompleted: 64 },
  { id: "3", name: "Emily Park", image: "", skills: ["Copywriting", "SEO", "Blogging"], rating: 4.7, jobsCompleted: 52 },
  { id: "4", name: "David Kim", image: "", skills: ["Marketing", "Ads", "Analytics"], rating: 4.9, jobsCompleted: 93 },
  { id: "5", name: "Mia Johnson", image: "", skills: ["Illustration", "Logo", "Brand"], rating: 4.6, jobsCompleted: 41 },
  { id: "6", name: "Ryan Patel", image: "", skills: ["Python", "Django", "AWS"], rating: 4.8, jobsCompleted: 78 },
]

export function TopFreelancers() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-[96px] border-b border-[#F1F5F9] dark:border-[#2a2a3e]">
      <div className="mb-12 text-center">
        <h2>Top Freelancers</h2>
        <p className="mt-3 text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8] text-base">Meet our highest-rated talent ready to work on your tasks</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {freelancers.map((f) => (
          <div key={f.id} className="card-global group p-6">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="size-11 ring-2 ring-[#F5F3FF] ring-offset-2 ring-offset-white">
                <AvatarImage src={f.image} alt={f.name} />
                <AvatarFallback className="bg-[#7C3AED] text-white font-semibold text-sm">
                  {f.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[17px] font-medium text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc] group-hover:text-[#7C3AED] transition-colors">
                  {f.name}
                </h3>
                <div className="flex items-center gap-1 text-sm">
                  <StarIcon className="size-3.5 text-amber-400" />
                  <span className="font-medium text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">{f.rating}</span>
                  <span className="text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8]">· {f.jobsCompleted} jobs</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {f.skills.map((s) => (
                <Badge key={s} variant="outline" className="text-xs border-[#EDE9FE] text-[#7C3AED] bg-[#FAF5FF] font-medium">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
