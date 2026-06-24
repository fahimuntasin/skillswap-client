"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left — brand panel */}
      <div className="hidden w-[480px] shrink-0 flex-col justify-between border-r border-[#F1F5F9] bg-[#FAFAFA] p-16 lg:flex">
        <div>
          <Link href="/" className="flex items-center">
            <div className="flex size-[26px] items-center justify-center rounded-[6px] bg-[#7C3AED]">
              <svg className="size-[14px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="ml-2 text-[18px] font-semibold text-[#0F172A]">
              Skill<span className="text-[#7C3AED]">Swap</span>
            </span>
          </Link>
        </div>

        <blockquote className="max-w-[320px]">
          <p className="text-[15px] leading-relaxed text-[#475569]">
            &ldquo;SkillSwap helped me find amazing freelancers for my startup tasks. Fast, reliable, and incredibly easy to use.&rdquo;
          </p>
          <footer className="mt-4 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#EDE9FE] text-[13px] font-semibold text-[#7C3AED]">SD</div>
            <div>
              <p className="text-sm font-medium text-[#0F172A]">Sophia Davis</p>
              <p className="text-xs text-[#94A3B8]">Startup Founder</p>
            </div>
          </footer>
        </blockquote>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          <div className="mb-10">
            <h1 className="text-[28px] font-semibold text-[#0F172A] tracking-[-0.02em] mb-2">Welcome back</h1>
            <p className="text-[#64748B] text-[15px]">Enter your email to sign in to your account</p>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[13px] font-medium text-[#0F172A]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="h-11 rounded-lg border-[#E2E8F0] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[13px] font-medium text-[#0F172A]">Password</Label>
                <Link href="/forgot-password" className="text-[13px] text-[#64748B] hover:text-[#7C3AED] transition-colors">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="h-11 rounded-lg border-[#E2E8F0] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0"
              />
            </div>

            <Button type="submit" variant="plastic" className="w-full h-11 rounded-lg text-[15px] font-medium">
              Sign in
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#F1F5F9]" />
            <span className="text-xs text-[#94A3B8] uppercase tracking-wider">or continue with</span>
            <div className="h-px flex-1 bg-[#F1F5F9]" />
          </div>

          <Button variant="outline" className="w-full h-11 rounded-lg border-[#E2E8F0] text-[15px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] gap-2.5">
            <svg viewBox="0 0 24 24" className="size-[18px]">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-[14px] text-[#64748B]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-[#0F172A] hover:text-[#7C3AED] transition-colors underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
