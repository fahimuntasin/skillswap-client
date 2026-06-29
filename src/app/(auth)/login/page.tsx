"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileTextIcon, UsersIcon, ShieldCheckIcon, LayersIcon } from "lucide-react"
import { loginWithEmail } from "@/lib/auth-client"
import { homePathForRole } from "@/lib/auth-routes"
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton"
import { AuthPlatformStats } from "@/components/auth/AuthPlatformStats"
import { toast } from "sonner"
import gsap from "gsap"

const features = [
  { icon: FileTextIcon, title: "Post in minutes", sub: "Describe your task and set your budget instantly." },
  { icon: UsersIcon, title: "Get proposals fast", sub: "Skilled freelancers apply within hours." },
  { icon: ShieldCheckIcon, title: "Pay securely", sub: "Stripe-protected. Money releases on completion." },
]

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const googleBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = googleBtnRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.set(el, { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" })
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { scale: 1.03, boxShadow: "0 8px 25px rgba(124,58,237,0.15)", borderColor: "#7C3AED", duration: 0.3, ease: "power2.out" })
      })
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderColor: "#E2E8F0", duration: 0.3, ease: "power2.out" })
      })
      el.addEventListener("mousedown", () => { gsap.to(el, { scale: 0.97, duration: 0.1 }) })
      el.addEventListener("mouseup", () => { gsap.to(el, { scale: 1.03, duration: 0.1 }) })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="hidden w-[480px] shrink-0 flex-col justify-between px-10 py-12 lg:flex border-r border-[#1e1e35]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-lg bg-[#7C3AED]">
              <LayersIcon className="size-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-base font-bold text-[#f8fafc]">Skill<span className="text-[#8b5cf6]">Swap</span></span>
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#7C3AED]">
                <f.icon className="size-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#e2e8f0]">{f.title}</p>
                <p className="mt-0.5 text-[13px] leading-[1.6] text-[#94a3b8]">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <AuthPlatformStats />
          <div className="mt-5 border-t border-[#2a2a3e] pt-5">
            <p className="text-[13px] italic leading-[1.6] text-[#94a3b8]">
              &ldquo;Post tasks, get proposals, and hire with confidence — all in one place.&rdquo;
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 sm:mb-10">
            <h1 className="text-[28px] font-semibold text-[#0F172A] dark:text-[#f8fafc] tracking-[-0.02em] mb-2">Welcome back</h1>
            <p className="text-[#64748B] dark:text-[#94a3b8] text-[15px]">Enter your email to sign in to your account</p>
          </div>
          <form className="space-y-5" onSubmit={async (e) => {
            e.preventDefault(); setLoading(true)
            const form = new FormData(e.currentTarget)
            try {
              const res = await loginWithEmail(form.get("email") as string, form.get("password") as string)
              toast.success("Logged in successfully")
              const role = res.user?.role
              router.push(homePathForRole(role))
            } catch { toast.error("Invalid email or password") }
            finally { setLoading(false) }
          }}>
            <div className="space-y-2"><Label htmlFor="email" className="text-[13px] font-medium text-[#0F172A] dark:text-[#e2e8f0]">Email</Label><Input id="email" name="email" type="email" placeholder="you@email.com" autoCapitalize="none" autoComplete="email" className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" /></div>
            <div className="space-y-2">
              <div className="flex items-center justify-between"><Label htmlFor="password" className="text-[13px] font-medium text-[#0F172A] dark:text-[#e2e8f0]">Password</Label><Link href="/forgot-password" className="text-[13px] text-[#64748B] dark:text-[#94a3b8] hover:text-[#7C3AED]">Forgot?</Link></div>
              <Input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
            </div>
            <Button type="submit" variant="plastic" className="w-full h-11 rounded-lg text-[15px] font-medium" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
          </form>
          <div className="my-6 flex items-center gap-3"><div className="h-px flex-1 bg-[#F1F5F9] dark:bg-[#2a2a3e]" /><span className="text-xs text-[#94A3B8] uppercase tracking-wider">or continue with</span><div className="h-px flex-1 bg-[#F1F5F9] dark:bg-[#2a2a3e]" /></div>
          <GoogleSignInButton ref={googleBtnRef} />
          <p className="mt-8 text-center text-[14px] text-[#64748B] dark:text-[#94a3b8]">Don&apos;t have an account? <Link href="/register" className="font-medium text-[#0F172A] dark:text-[#f8fafc] hover:text-[#7C3AED] underline underline-offset-4">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}
