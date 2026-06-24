import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

const freelancers = [
  { id: "1", name: "Sarah Chen", role: "UI/UX Designer", image: "", skills: ["Figma", "Branding", "Prototyping"], rating: 4.9, jobs: 87, rate: 45 },
  { id: "2", name: "Alex Rivera", role: "Full-Stack Developer", image: "", skills: ["React", "Node.js", "TypeScript"], rating: 4.8, jobs: 64, rate: 55 },
  { id: "3", name: "Emily Park", role: "Content Writer", image: "", skills: ["Copywriting", "SEO", "Blogging"], rating: 4.7, jobs: 52, rate: 35 },
  { id: "4", name: "David Kim", role: "Marketing Expert", image: "", skills: ["PPC", "Analytics", "Strategy"], rating: 4.9, jobs: 93, rate: 60 },
  { id: "5", name: "Mia Johnson", role: "Illustrator", image: "", skills: ["Illustration", "Logo", "Brand"], rating: 4.6, jobs: 41, rate: 40 },
  { id: "6", name: "Ryan Patel", role: "Backend Developer", image: "", skills: ["Python", "Django", "AWS"], rating: 4.8, jobs: 78, rate: 65 },
  { id: "7", name: "Lisa Wong", role: "SEO Specialist", image: "", skills: ["SEO", "SEM", "Analytics"], rating: 4.5, jobs: 36, rate: 30 },
  { id: "8", name: "James Lee", role: "Graphic Designer", image: "", skills: ["Photoshop", "Illustrator", "InDesign"], rating: 4.7, jobs: 59, rate: 50 },
  { id: "9", name: "Nina Gupta", role: "Data Analyst", image: "", skills: ["Python", "SQL", "Tableau"], rating: 4.8, jobs: 45, rate: 55 },
]

export default function FreelancersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Browse Freelancers</h1>
        <p className="mt-2 text-muted-foreground">Find skilled professionals for your next task</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {freelancers.map((f) => (
          <Link key={f.id} href={`/freelancers/${f.id}`}>
            <Card className="group h-full border-2 border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="size-14 ring-2 ring-primary/20 shrink-0">
                    <AvatarImage src={f.image} alt={f.name} />
                    <AvatarFallback className="bg-primary text-white font-semibold text-lg">
                      {f.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {f.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{f.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <StarIcon className="size-3.5 text-yellow-500" />
                      <span className="text-sm font-medium">{f.rating}</span>
                      <span className="text-xs text-muted-foreground">({f.jobs} jobs)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {f.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-sm text-muted-foreground">Hourly rate</span>
                  <span className="text-lg font-bold text-primary">${f.rate}<span className="text-xs font-normal text-muted-foreground">/hr</span></span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
