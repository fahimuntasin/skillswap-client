"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bars3Icon } from "@heroicons/react/24/outline"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const isLoggedIn = false

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tasks", label: "Browse Tasks" },
    { href: "/freelancers", label: "Browse Freelancers" },
  ]

  const privateLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-sakura-petal/50 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="text-xl font-bold bg-gradient-to-r from-sakura-deep to-sakura bg-clip-text text-transparent">
            SkillSwap
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-sakura-deep"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {privateLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-sakura-deep"
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="plastic" size="sm">
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="plastic" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden inline-flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-muted">
            <Bars3Icon className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64 pt-12">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-sakura-deep"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-sakura-petal" />
              {isLoggedIn ? (
                <>
                  {privateLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-foreground/70 transition-colors hover:text-sakura-deep"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button variant="plastic" onClick={() => setOpen(false)}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="plastic" className="w-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
