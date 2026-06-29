import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon, ShieldCheckIcon } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

async function getFreelancers() {
  try {
    return await api.getFreelancers(6)
  } catch { return [] }
}

export async function TopFreelancers() {
  const freelancers = await getFreelancers()
  if (!freelancers.length) return null

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-[96px] bg-accent/30 dark:bg-[#0e0e18] rounded-3xl my-8 border-b border-[#F1F5F9] dark:border-[#2a2a3e]">
      <div className="mb-12 text-center">
        <h2>Top Freelancers</h2>
        <p className="mt-3 text-[#64748B] dark:text-[#94a3b8] text-base">Meet our highest-rated talent ready to work on your tasks</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {freelancers.map((f: any) => (
          <Link key={f._id} href={`/freelancers/${f._id}`}>
            <Card className="card-global group border-0 rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="size-11 ring-2 ring-[#F5F3FF] dark:ring-[#2d1f5e] ring-offset-2 ring-offset-white dark:ring-offset-[#1c1a3a]">
                    {f.image ? <AvatarImage src={f.image} alt={f.name} /> : null}
                    <AvatarFallback className="bg-[#7C3AED] text-white font-semibold text-sm">
                      {f.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#0F172A] dark:text-[#f8fafc] group-hover:text-[#7C3AED] transition-colors flex items-center gap-1">
                      {f.name}
                      {f.verified && <ShieldCheckIcon className="size-3.5 text-[#7C3AED]" aria-label="Verified" />}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <StarIcon className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-[#0F172A] dark:text-[#f8fafc]">{f.rating || 0}</span>
                      <span className="text-[#64748B] dark:text-[#94a3b8]">· {f.completedJobs || 0} jobs done</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {f.skills?.slice(0, 3).map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs border-[#EDE9FE] dark:border-[#3d2a6e] text-[#7C3AED] dark:text-[#c4b5fd] bg-[#FAF5FF] dark:bg-[#1e1445] font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
