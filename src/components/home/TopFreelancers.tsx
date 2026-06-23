import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "@heroicons/react/24/solid"

type Freelancer = {
  id: string
  name: string
  image: string
  skills: string[]
  rating: number
  jobsCompleted: number
}

async function getTopFreelancers(): Promise<Freelancer[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/freelancers?limit=6`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

const fallbackFreelancers: Freelancer[] = [
  { id: "1", name: "Sarah Chen", image: "", skills: ["UI Design", "Figma", "Branding"], rating: 4.9, jobsCompleted: 87 },
  { id: "2", name: "Alex Rivera", image: "", skills: ["React", "Node.js", "TypeScript"], rating: 4.8, jobsCompleted: 64 },
  { id: "3", name: "Emily Park", image: "", skills: ["Copywriting", "SEO", "Blogging"], rating: 4.7, jobsCompleted: 52 },
  { id: "4", name: "David Kim", image: "", skills: ["Marketing", "Ads", "Analytics"], rating: 4.9, jobsCompleted: 93 },
  { id: "5", name: "Mia Johnson", image: "", skills: ["Illustration", "Logo", "Branding"], rating: 4.6, jobsCompleted: 41 },
  { id: "6", name: "Ryan Patel", image: "", skills: ["Python", "Django", "AWS"], rating: 4.8, jobsCompleted: 78 },
]

export async function TopFreelancers() {
  const freelancers = await getTopFreelancers()
  const displayFreelancers = freelancers.length > 0 ? freelancers : fallbackFreelancers

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 bg-sakura-petal/20 rounded-2xl my-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground">Top Freelancers</h2>
        <p className="mt-2 text-muted-foreground">Meet our highest-rated talent ready to work on your tasks</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayFreelancers.map((freelancer) => (
          <Card
            key={freelancer.id}
            className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sakura/10"
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="size-12 ring-2 ring-sakura-light">
                  <AvatarImage src={freelancer.image} alt={freelancer.name} />
                  <AvatarFallback className="bg-sakura text-white">
                    {freelancer.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-sakura-deep transition-colors">
                    {freelancer.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <StarIcon className="size-3.5" />
                    <span>{freelancer.rating}</span>
                    <span className="text-muted-foreground">· {freelancer.jobsCompleted} jobs</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {freelancer.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs border-sakura-petal text-sakura-deep bg-sakura-petal/30">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
