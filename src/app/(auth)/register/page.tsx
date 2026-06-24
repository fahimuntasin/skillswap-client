"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LayersIcon, StarIcon, TrendingUpIcon, CreditCardIcon } from "lucide-react"
import { registerWithEmail, signInWithGoogle } from "@/lib/auth-client"
import { toast } from "sonner"

const features = [
  { icon: StarIcon, title: "Build your profile", sub: "Showcase your skills and let clients find you." },
  { icon: TrendingUpIcon, title: "Earn on your terms", sub: "Set your rates, pick tasks, and get paid securely." },
  { icon: CreditCardIcon, title: "Grow your career", sub: "Build relationships and a steady stream of work." },
]

const stats = [
  { n: "1,200+", l: "Tasks posted" },
  { n: "850+", l: "Freelancers" },
  { n: "$48k", l: "Paid out" },
]

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="hidden w-[480px] shrink-0 flex-col justify-between bg-[#EDE9FE] px-10 py-12 lg:flex">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-lg bg-[#7C3AED]">
              <LayersIcon className="size-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-base font-bold text-[#3C3489]">
              Skill<span className="text-[#7C3AED]">Swap</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#7C3AED]">
                <f.icon className="size-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#3C3489]">{f.title}</p>
                <p className="mt-0.5 text-[13px] leading-[1.6] text-[#534AB7]">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex gap-6">
            {stats.map((s) => (
              <div key={s.l}>
                <p className="text-lg font-bold text-[#7C3AED]">{s.n}</p>
                <p className="text-[11px] text-[#534AB7]">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-[#AFA9EC] pt-5">
            <p className="text-[13px] italic leading-[1.6] text-[#534AB7]">
              &ldquo;Joining SkillSwap was the best career move I ever made.&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-[#7C3AED] text-xs font-semibold text-white">
                AR
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#3C3489]">Alex Rivera</p>
                <p className="text-[11px] text-[#534AB7]">Top Freelancer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          <div className="mb-10">
            <h1 className="text-[28px] font-semibold text-[#0F172A] tracking-[-0.02em] mb-2">Create your account</h1>
            <p className="text-[#64748B] text-[15px]">Enter your details to get started on SkillSwap</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setLoading(true)
              const form = new FormData(e.currentTarget)
              const isFreelancer = (e.currentTarget.querySelector("#freelancer") as HTMLInputElement)?.checked
              try {
                await registerWithEmail({
                  name: form.get("name") as string,
                  email: form.get("email") as string,
                  password: form.get("password") as string,
                  image: (form.get("image") as string) || "",
                  role: isFreelancer ? "freelancer" : "client",
                })
                toast.success("Account created! Please log in.")
                router.push("/login")
              } catch {
                toast.error("Registration failed. Please try again.")
              } finally {
                setLoading(false)
              }
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[13px] font-medium text-[#0F172A]">Full name</Label>
              <Input id="name" name="name" placeholder="John Doe" autoComplete="name" className="h-11 rounded-lg border-[#E2E8F0] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[13px] font-medium text-[#0F172A]">Email</Label>
              <Input id="email" name="email" type="email" placeholder="name@example.com" autoCapitalize="none" autoComplete="email" className="h-11 rounded-lg border-[#E2E8F0] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image" className="text-[13px] font-medium text-[#0F172A]">Profile image URL</Label>
              <Input id="image" name="image" placeholder="https://example.com/photo.jpg" className="h-11 rounded-lg border-[#E2E8F0] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[13px] font-medium text-[#0F172A]">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Min. 6 characters, 1 uppercase, 1 lowercase" autoComplete="new-password" className="h-11 rounded-lg border-[#E2E8F0] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <Checkbox id="freelancer" className="size-4 rounded-[4px] border-[#E2E8F0] data-[state=checked]:bg-[#7C3AED] data-[state=checked]:border-[#7C3AED]" />
              <Label htmlFor="freelancer" className="text-[14px] font-normal text-[#475569] cursor-pointer">
                Register as a <span className="font-semibold text-[#7C3AED]">Freelancer</span>
              </Label>
            </div>

            <Button type="submit" variant="plastic" className="w-full h-11 rounded-lg text-[15px] font-medium" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#F1F5F9]" />
            <span className="text-xs text-[#94A3B8] uppercase tracking-wider">or continue with</span>
            <div className="h-px flex-1 bg-[#F1F5F9]" />
          </div>

          <Button variant="outline" className="w-full h-11 rounded-lg border-[#E2E8F0] text-[15px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] gap-2.5" onClick={() => signInWithGoogle()}>
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
            <Link href="/login" className="font-medium text-[#0F172A] hover:text-[#7C3AED] underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
