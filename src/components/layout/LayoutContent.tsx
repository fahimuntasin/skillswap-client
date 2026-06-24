"use client"

import { usePathname } from "next/navigation"
import { ThemeProvider } from "next-themes"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/sonner"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideLayout = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/dashboard")

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {!hideLayout && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
      <Toaster richColors />
    </ThemeProvider>
  )
}
