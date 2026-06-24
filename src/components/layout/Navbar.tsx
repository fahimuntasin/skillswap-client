"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MenuIcon, LayersIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isLoggedIn = false

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "/", label: "Home" },
    { href: "/tasks", label: "Browse Tasks" },
    { href: "/freelancers", label: "Browse Freelancers" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 border-b transition-all duration-300",
        scrolled
          ? "border-[#E2E8F0] bg-[rgba(255,255,255,0.85)] backdrop-blur-[12px]"
          : "border-[#E2E8F0] bg-white"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="flex size-[26px] items-center justify-center rounded-[6px] bg-[#7C3AED]">
            <LayersIcon className="size-[14px] text-white" strokeWidth={2.5} />
          </div>
          <span className="ml-2 text-[18px] font-semibold text-[#0F172A] leading-none">
            Skill<span className="text-[#7C3AED]">Swap</span>
          </span>
        </Link>

        {/* Divider */}
        <div className="mx-5 hidden h-4 w-px bg-[#E2E8F0] sm:block" />

        {/* Desktop nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-5 text-[14px] font-normal transition-colors",
                  isActive
                    ? "text-[#7C3AED]"
                    : "text-[#64748B] hover:text-[#0F172A]"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-[calc(100%-16px)] bg-[#7C3AED]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hidden sm:flex items-center gap-2 text-[14px] font-medium text-[#0F172A] hover:text-[#7C3AED] transition-colors">
                Dashboard
              </Link>
              <Avatar className="size-8 ring-2 ring-[#7C3AED] ring-offset-1">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-[#7C3AED] text-white text-xs font-semibold">JD</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-[14px] font-medium text-[#0F172A]">John</span>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/login" className="text-[14px] font-medium text-[#0F172A] hover:text-[#7C3AED] transition-colors">
                Log in
              </Link>
              <Link href="/register">
                <Button variant="plastic" className="h-9 rounded-[6px] px-[18px] text-[14px] font-medium">
                  Join Now
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="sm:hidden inline-flex size-9 items-center justify-center rounded-[6px] border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] transition-colors">
              <MenuIcon className="size-4 text-[#0F172A]" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-14">
              <div className="flex flex-col gap-1">
                {links.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors",
                        isActive
                          ? "bg-[#F5F3FF] text-[#7C3AED]"
                          : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                <hr className="my-3 border-[#E2E8F0]" />
                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#0F172A] hover:bg-[#F1F5F9]"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="mt-2 flex items-center justify-center rounded-[6px] bg-[#7C3AED] px-[18px] py-2.5 text-[14px] font-medium text-white hover:bg-[#6D28D9] transition-colors"
                    >
                      Join Now
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
