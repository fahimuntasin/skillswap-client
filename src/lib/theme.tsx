"use client"

import { useEffect, useState } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark")
    }
    setMounted(true)
  }, [])

  if (!mounted) return <>{children}</>
  return <>{children}</>
}

export function useDarkMode() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = () => {
    const html = document.documentElement
    html.classList.toggle("dark")
    const isDark = html.classList.contains("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
    setDark(isDark)
  }

  return { dark, toggle }
}
