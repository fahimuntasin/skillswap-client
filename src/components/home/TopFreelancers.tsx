import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "@heroicons/react/24/solid"

const freelancers = [
  { id: "1", name: "Sarah Chen", image: "", skills: ["UI Design", "Figma", "Branding"], rating: 4.9, jobsCompleted: 87 },
  { id: "2", name: "Alex Rivera", image: "", skills: ["React", "Node.js", "TypeScript"], rating: 4.8, jobsCompleted: 64 },
  { id: "3", name: "Emily Park", image: "", skills: ["Copywriting", "SEO", "Blogging"], rating: 4.7, jobsCompleted: 52 },
  { id: "4", name: "David Kim", image: "", skills: ["Marketing", "Ads", "Analytics"], rating: 4.9, jobsCompleted: 93 },
  { id: "5", name: "Mia Johnson", image: "", skills: ["Illustration", "Logo", "Branding"], rating: 4.6, jobsCompleted: 41 },
  { id: "6", name: "Ryan Patel", image: "", skills: ["Python", "Django", "AWS"], rating: 4.8, jobsCompleted: 78 },
]

export function TopFreelancers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 bg-accent/30 rounded-3xl my-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground">Top Freelancers</h2>
        <p className="mt-2 text-muted-foreground">Meet our highest-rated talent ready to work on your tasks</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {freelancers.map((freelancer) => (
          <Card key={freelancer.id} className="uiverse-card border-0 rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="size-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-white">
                  <AvatarImage src={freelancer.image} alt={freelancer.name} />
                  <AvatarFallback className="bg-primary text-white font-semibold">
                    {freelancer.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {freelancer.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    <StarIcon className="size-3.5 text-amber-400" />
                    <span className="font-medium">{freelancer.rating}</span>
                    <span className="text-muted-foreground">· {freelancer.jobsCompleted} jobs</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {freelancer.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs border-primary/15 text-primary bg-primary/5 font-medium">
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
