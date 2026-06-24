import Link from "next/link"
import { PaintBrushIcon, PencilSquareIcon, CodeBracketIcon, MegaphoneIcon, Squares2X2Icon } from "@heroicons/react/24/outline"

const categories = [
  { name: "Design", icon: PaintBrushIcon, color: "bg-[#F5F3FF] text-[#7C3AED]", href: "/tasks?category=Design" },
  { name: "Writing", icon: PencilSquareIcon, color: "bg-[#FEF3C7] text-[#D97706]", href: "/tasks?category=Writing" },
  { name: "Development", icon: CodeBracketIcon, color: "bg-[#D1FAE5] text-[#059669]", href: "/tasks?category=Development" },
  { name: "Marketing", icon: MegaphoneIcon, color: "bg-[#FEE2E2] text-[#DC2626]", href: "/tasks?category=Marketing" },
  { name: "Other", icon: Squares2X2Icon, color: "bg-[#E0F2FE] text-[#0284C7]", href: "/tasks?category=Other" },
]

export function Categories() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-[96px] border-b border-[#F1F5F9] dark:border-[#2a2a3e]">
      <div className="mb-12 text-center">
        <h2>Popular Categories</h2>
        <p className="mt-3 text-[#64748B] dark:text-[#94a3b8] dark:text-[#94a3b8] text-base">Choose from a wide range of task categories</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.href} className="card-global flex flex-col items-center gap-3 p-6">
            <div className={`rounded-xl p-3 ${cat.color}`}>
              <cat.icon className="size-6" />
            </div>
            <span className="text-sm font-medium text-[#0F172A] dark:text-[#f8fafc] dark:text-[#f8fafc]">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
