"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Logo } from "@/components/layout/Logo"
import authImg from "@/Picture/Auth Left Panel Illustration.png"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="hidden w-[480px] shrink-0 flex-col justify-between border-r border-[#F1F5F9] bg-[#FAFAFA] p-16 lg:flex relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
          <Image src={authImg} alt="" fill className="object-cover" unoptimized />
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full">
          <Link href="/">
            <Logo className="h-[22px] w-auto" />
          </Link>

          <blockquote className="max-w-[320px]">
            <p className="text-[15px] leading-relaxed text-[#475569]">
              &ldquo;Joining SkillSwap as a freelancer was the best career move ever. Completed 50+ projects and built amazing client relationships.&rdquo;
            </p>
            <footer className="mt-4 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-[#EDE9FE] text-[13px] font-semibold text-[#7C3AED]">AR</div>
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Alex Rivera</p>
                <p className="text-xs text-[#94A3B8]">Top Freelancer</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          <div className="mb-10">
            <h1 className="text-[28px] font-semibold text-[#0F172A] tracking-[-0.02em] mb-2">Create your account</h1>
            <p className="text-[#64748B] text-[15px]">Enter your details to get started on SkillSwap</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[13px] font-medium text-[#0F172A]">Full name</Label>
              <Input id="name" placeholder="John Doe" autoComplete="name" className="h-11 rounded-lg border-[#E2E8F0] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[13px] font-medium text-[#0F172A]">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" autoCapitalize="none" autoComplete="email" autoCorrect="off" className="h-11 rounded-lg border-[#E2E8F0] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-[13px] font-medium text-[#0F172A]">Profile image URL</Label>
              <Input id="image" placeholder="https://example.com/photo.jpg" className="h-11 rounded-lg border-[#E2E8F0] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[13px] font-medium text-[#0F172A]">Password</Label>
              <Input id="password" type="password" placeholder="Min. 6 characters, 1 uppercase, 1 lowercase" autoComplete="new-password" className="h-11 rounded-lg border-[#E2E8F0] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <Checkbox id="freelancer" className="size-4 rounded-[4px] border-[#E2E8F0] data-[state=checked]:bg-[#7C3AED] data-[state=checked]:border-[#7C3AED]" />
              <Label htmlFor="freelancer" className="text-[14px] font-normal text-[#475569] cursor-pointer">
                Register as a <span className="font-semibold text-[#7C3AED]">Freelancer</span>
              </Label>
            </div>

            <Button type="submit" variant="plastic" className="w-full h-11 rounded-lg text-[15px] font-medium">
              Create account
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
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#0F172A] hover:text-[#7C3AED] transition-colors underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
