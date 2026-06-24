import Link from "next/link"
import { PaintBrushIcon, PencilSquareIcon, CodeBracketIcon, MegaphoneIcon, Squares2X2Icon } from "@heroicons/react/24/outline"

const categories = [
  { name: "Design", icon: PaintBrushIcon, color: "bg-violet-50 text-violet-600", href: "/tasks?category=Design" },
  { name: "Writing", icon: PencilSquareIcon, color: "bg-amber-50 text-amber-600", href: "/tasks?category=Writing" },
  { name: "Development", icon: CodeBracketIcon, color: "bg-emerald-50 text-emerald-600", href: "/tasks?category=Development" },
  { name: "Marketing", icon: MegaphoneIcon, color: "bg-rose-50 text-rose-600", href: "/tasks?category=Marketing" },
  { name: "Other", icon: Squares2X2Icon, color: "bg-sky-50 text-sky-600", href: "/tasks?category=Other" },
]

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground">Popular Categories</h2>
        <p className="mt-2 text-muted-foreground">Choose from a wide range of task categories</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.href} className="uiverse-card group flex flex-col items-center gap-3 rounded-2xl p-6">
            <div className={`rounded-xl p-3 transition-transform group-hover:scale-110 duration-300 ${cat.color}`}>
              <cat.icon className="size-6" />
            </div>
            <span className="text-sm font-medium text-foreground">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
