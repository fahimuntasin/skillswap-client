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
    <section className="mx-auto max-w-[1280px] px-6 py-[96px] border-b border-[#F1F5F9]">
      <div className="mb-12 text-center">
        <h2>Latest Featured Tasks</h2>
        <p className="mt-3 text-[#64748B] text-base">Browse recently posted tasks from clients worldwide</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div key={task.id} className="card-global group p-6">
            <Badge variant="secondary" className="mb-3 bg-[#F5F3FF] text-[#7C3AED] hover:bg-[#EDE9FE] border-0 font-medium">
              {task.category}
            </Badge>
            <h3 className="mb-2 text-[17px] font-medium text-[#0F172A] group-hover:text-[#7C3AED] transition-colors line-clamp-2">
              {task.title}
            </h3>
            <p className="mb-5 text-sm text-[#64748B]">by {task.clientName}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-[#7C3AED] font-semibold">
                <CurrencyDollarIcon className="size-4" />
                ${task.budget}
              </span>
              <span className="flex items-center gap-1.5 text-[#64748B]">
                <ClockIcon className="size-4" />
                {new Date(task.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
