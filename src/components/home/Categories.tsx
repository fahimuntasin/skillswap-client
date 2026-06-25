import Link from "next/link"
import { Paintbrush, PenTool, Code, Megaphone, LayoutGrid } from "lucide-react"

const categories = [
  { name: "Design", icon: Paintbrush, href: "/tasks?category=Design" },
  { name: "Writing", icon: PenTool, href: "/tasks?category=Writing" },
  { name: "Development", icon: Code, href: "/tasks?category=Development" },
  { name: "Marketing", icon: Megaphone, href: "/tasks?category=Marketing" },
  { name: "Other", icon: LayoutGrid, href: "/tasks?category=Other" },
]

export function Categories() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-[96px] border-b border-[#F1F5F9] dark:border-[#2a2a3e]">
      <div className="mb-12 text-center">
        <h2>Categories</h2>
        <p className="mt-3 text-[#64748B] dark:text-[#94a3b8] text-base">
          Choose from a wide range of task categories
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7C3AED] hover:shadow-[0_0_16px_rgba(124,58,237,0.2)] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:hover:border-[#7C3AED]"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED]">
                <Icon className="size-5 text-black" />
              </div>
              <span className="text-sm font-medium text-[#0F172A] dark:text-white">{cat.name}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
