"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bars3Icon } from "@heroicons/react/24/outline"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const isLoggedIn = false

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/tasks", label: "Browse Tasks" },
    { href: "/freelancers", label: "Freelancers" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex size-8 items-center justify-center rounded-xl bg-primary shadow-sm shadow-primary/20 transition-transform group-hover:scale-105">
            <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Skill<span className="text-primary">Swap</span>
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-1 bg-muted/50 rounded-xl p-1">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-white hover:text-foreground hover:shadow-sm">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Dashboard</Link>
              <Button variant="outline" size="sm" className="font-medium rounded-xl">Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-medium text-muted-foreground rounded-xl">Log in</Button>
              </Link>
              <Link href="/register">
                <Button variant="plastic" size="sm" className="rounded-xl">Join Now</Button>
              </Link>
            </>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="sm:hidden inline-flex size-9 items-center justify-center rounded-xl border bg-white hover:bg-muted transition-colors">
            <Bars3Icon className="size-4" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 pt-14">
            <div className="flex flex-col gap-5">
              {publicLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-base font-medium text-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
              <hr />
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="text-base font-medium">Dashboard</Link>
                  <Button variant="outline" onClick={() => setOpen(false)}>Logout</Button>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base font-normal rounded-xl">Log in</Button>
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    <Button variant="plastic" className="w-full rounded-xl">Join Now</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
