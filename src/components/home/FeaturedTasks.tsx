import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"

const tasks = [
  { id: "1", title: "Design a modern landing page", clientName: "TechCorp", category: "Design", budget: 150, deadline: "2026-07-15" },
  { id: "2", title: "Fix CSS responsive bugs", clientName: "WebAgency", category: "Development", budget: 80, deadline: "2026-07-10" },
  { id: "3", title: "Write SEO blog article", clientName: "ContentHub", category: "Writing", budget: 100, deadline: "2026-07-20" },
  { id: "4", title: "Setup Google Ads campaign", clientName: "GrowthInc", category: "Marketing", budget: 200, deadline: "2026-07-12" },
  { id: "5", title: "Create logo and brand kit", clientName: "StartupX", category: "Design", budget: 250, deadline: "2026-07-18" },
  { id: "6", title: "Debug Node.js API errors", clientName: "DevSquad", category: "Development", budget: 120, deadline: "2026-07-08" },
]

export function FeaturedTasks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground">Latest Featured Tasks</h2>
        <p className="mt-2 text-muted-foreground">Browse recently posted tasks from clients worldwide</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className="uiverse-card border-0 rounded-2xl">
            <CardContent className="p-5">
              <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground border-0 font-medium">
                {task.category}
              </Badge>
              <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {task.title}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">by {task.clientName}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-primary font-semibold">
                  <CurrencyDollarIcon className="size-4" />
                  ${task.budget}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <ClockIcon className="size-4" />
                  {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
