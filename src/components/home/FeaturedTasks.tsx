import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClockIcon, DollarSignIcon } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

async function getTasks() {
  try {
    const data = await api.getTasks("limit=6")
    return data.tasks || []
  } catch { return [] }
}

export async function FeaturedTasks() {
  const tasks = await getTasks()
  if (!tasks.length) return null

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-[96px] border-b border-[#F1F5F9] dark:border-[#2a2a3e]">
      <div className="mb-12 text-center">
        <h2>Latest Featured Tasks</h2>
        <p className="mt-3 text-[#64748B] dark:text-[#94a3b8] text-base">Browse recently posted tasks from clients worldwide</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task: any) => (
          <Link key={task._id} href={`/tasks/${task._id}`}>
            <Card className="card-global group border-0 rounded-2xl">
              <CardContent className="p-5">
                <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground dark:bg-[#2d1f5e] dark:text-[#c4b5fd] border-0 font-medium">
                  {task.category}
                </Badge>
                <h3 className="mb-2 font-semibold text-foreground dark:text-[#f8fafc] group-hover:text-primary transition-colors line-clamp-2">
                  {task.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground dark:text-[#94a3b8]">by {task.client_email}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-primary font-semibold">
                    <DollarSignIcon className="size-4" />${task.budget}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground dark:text-[#94a3b8]">
                    <ClockIcon className="size-4" />
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
