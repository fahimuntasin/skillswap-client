import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { LayoutContent } from "@/components/layout/LayoutContent"
import "./globals.css"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SkillSwap — Freelance Micro-Task Platform",
  description: "Get your tasks done by skilled freelancers.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white text-[#475569] dark:bg-[#0f0f1a] dark:text-[#94a3b8]">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  )
}
