"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboardIcon,
  PlusCircleIcon,
  ListTodoIcon,
  FileTextIcon,
  DollarSignIcon,
  UserIcon,
  UsersIcon,
  ShieldCheckIcon,
  ReceiptIcon,
  LogOutIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  StarIcon,
} from "lucide-react"

type SidebarLink = {
  href: string
  label: string
  icon: React.ElementType
}

const clientLinks: SidebarLink[] = [
  { href: "/dashboard/client", label: "Overview", icon: LayoutDashboardIcon },
  { href: "/dashboard/client/post-task", label: "Post Task", icon: PlusCircleIcon },
  { href: "/dashboard/client/my-tasks", label: "My Tasks", icon: ListTodoIcon },
  { href: "/dashboard/client/proposals", label: "Proposals", icon: FileTextIcon },
]

const freelancerLinks: SidebarLink[] = [
  { href: "/dashboard/freelancer", label: "Overview", icon: LayoutDashboardIcon },
  { href: "/tasks", label: "Browse Tasks", icon: BriefcaseIcon },
  { href: "/dashboard/freelancer/proposals", label: "My Proposals", icon: FileTextIcon },
  { href: "/dashboard/freelancer/projects", label: "Active Projects", icon: TrendingUpIcon },
  { href: "/dashboard/freelancer/earnings", label: "Earnings", icon: DollarSignIcon },
  { href: "/dashboard/freelancer/profile", label: "Edit Profile", icon: UserIcon },
]

const adminLinks: SidebarLink[] = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboardIcon },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: UsersIcon },
  { href: "/dashboard/admin/tasks", label: "Manage Tasks", icon: ShieldCheckIcon },
  { href: "/dashboard/admin/transactions", label: "Transactions", icon: ReceiptIcon },
]

type DashboardShellProps = {
  children: React.ReactNode
  role: "client" | "freelancer" | "admin"
  userName?: string
}

export function DashboardShell({ children, role, userName = "User" }: DashboardShellProps) {
  const pathname = usePathname()

  const links = role === "client" ? clientLinks : role === "freelancer" ? freelancerLinks : adminLinks

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-white lg:block dark:bg-[#0f0f1a] dark:border-[#2a2a3e]">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b dark:border-[#2a2a3e] px-6 py-5">
            <Avatar className="size-9 ring-2 ring-primary/20">
              <AvatarFallback className="bg-primary text-white font-semibold text-sm">
                {userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#0F172A] dark:text-[#f8fafc]">{userName}</p>
              <p className="truncate text-xs text-muted-foreground dark:text-[#94a3b8] capitalize">{role}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="border-t dark:border-[#2a2a3e] p-3">
            <Link href="/login">
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                <LogOutIcon className="size-4" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main area (content + mobile bottom nav) */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Main content */}
        <main className="flex-1 overflow-auto pb-16 lg:pb-0">
          <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">{children}</div>
        </main>

        {/* Mobile bottom tab nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white dark:bg-[#0f0f1a] dark:border-[#2a2a3e]">
          <div className="flex overflow-x-auto">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 flex-1 min-w-0 py-2 px-1 text-[10px] font-medium transition-all",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <link.icon className="size-5" />
                  <span className="truncate w-full text-center leading-tight">{link.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
