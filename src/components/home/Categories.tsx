import Link from "next/link"
import {
  PaintBrushIcon,
  PencilIcon,
  CodeBracketIcon,
  MegaphoneIcon,
  CubeIcon,
} from "@heroicons/react/24/outline"

const categories = [
  { name: "Design", icon: PaintBrushIcon, color: "bg-pink-50 text-pink-600", href: "/tasks?category=Design" },
  { name: "Writing", icon: PencilIcon, color: "bg-blue-50 text-blue-600", href: "/tasks?category=Writing" },
  { name: "Development", icon: CodeBracketIcon, color: "bg-purple-50 text-purple-600", href: "/tasks?category=Development" },
  { name: "Marketing", icon: MegaphoneIcon, color: "bg-orange-50 text-orange-600", href: "/tasks?category=Marketing" },
  { name: "Other", icon: CubeIcon, color: "bg-green-50 text-green-600", href: "/tasks?category=Other" },
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
          <Link
            key={cat.name}
            href={cat.href}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-sakura-petal/50 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sakura/10"
          >
            <div className={`rounded-xl p-3 transition-transform group-hover:scale-110 ${cat.color}`}>
              <cat.icon className="size-6" />
            </div>
            <span className="text-sm font-medium text-foreground">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
