import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SkillSwap — Freelance Micro-Task Platform",
  description: "Get your tasks done by skilled freelancers. Post small tasks and hire expert freelancers to complete them.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  )
}
