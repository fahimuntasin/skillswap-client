import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClockIcon, CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const allTasks = [
  { id: "1", title: "Design a modern landing page", clientName: "TechCorp", category: "Design", budget: 150, deadline: "2026-07-15" },
  { id: "2", title: "Fix CSS responsive bugs", clientName: "WebAgency", category: "Development", budget: 80, deadline: "2026-07-10" },
  { id: "3", title: "Write SEO blog article", clientName: "ContentHub", category: "Writing", budget: 100, deadline: "2026-07-20" },
  { id: "4", title: "Setup Google Ads campaign", clientName: "GrowthInc", category: "Marketing", budget: 200, deadline: "2026-07-12" },
  { id: "5", title: "Create logo and brand kit", clientName: "StartupX", category: "Design", budget: 250, deadline: "2026-07-18" },
  { id: "6", title: "Debug Node.js API errors", clientName: "DevSquad", category: "Development", budget: 120, deadline: "2026-07-08" },
  { id: "7", title: "Translate blog to French", clientName: "GlobalReach", category: "Writing", budget: 90, deadline: "2026-07-25" },
  { id: "8", title: "Redesign mobile app UI", clientName: "AppFlow", category: "Design", budget: 350, deadline: "2026-08-01" },
  { id: "9", title: "Social media strategy plan", clientName: "BrandX", category: "Marketing", budget: 180, deadline: "2026-07-30" },
]

const categories = ["All", "Design", "Writing", "Development", "Marketing", "Other"]

export default function BrowseTasksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Browse Tasks</h1>
        <p className="mt-2 text-muted-foreground">Find the perfect task and start earning</p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by task title..." className="pl-9" />
        </div>
        <Select defaultValue="All">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allTasks.map((task) => (
          <Link key={task.id} href={`/tasks/${task.id}`}>
            <Card className="group h-full border-2 border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
              <CardContent className="p-5">
                <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground border-0">
                  {task.category}
                </Badge>
                <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {task.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">by {task.clientName}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    <CurrencyDollarIcon className="size-4" />
                    ${task.budget}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <ClockIcon className="size-4" />
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" disabled>Previous</Button>
        <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  )
}
