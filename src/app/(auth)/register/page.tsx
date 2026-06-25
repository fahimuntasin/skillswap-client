"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LayersIcon, StarIcon, TrendingUpIcon, CreditCardIcon, UserIcon, BriefcaseIcon, UploadIcon, EyeIcon, EyeOffIcon, CheckIcon } from "lucide-react"
import { registerWithEmail, signInWithGoogle } from "@/lib/auth-client"
import { toast } from "sonner"
import gsap from "gsap"

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

function passwordStrength(p: string): { label: string; color: string; score: number } {
  let score = 0
  if (p.length >= 6) score++
  if (p.length >= 10) score++
  if (/[A-Z]/.test(p)) score++
  if (/[a-z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  const map = ["Weak", "Fair", "Good", "Strong", "Very Strong"]
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-emerald-500"]
  return { label: map[score] || "Weak", color: colors[score] || "bg-red-500", score }
}

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [password, setPassword] = useState("")
  const [ps, setPs] = useState({ label: "", color: "bg-red-500", score: 0 } as ReturnType<typeof passwordStrength>)
  const [role, setRole] = useState<"freelancer" | "client">("freelancer")
  const [avatarDataUrl, setAvatarDataUrl] = useState<string>("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const googleBtnRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setPs(passwordStrength(password))
  }, [password])

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { toast.error("Image must be under 2MB"); return }
    setAvatarFile(file)
    const reader = new FileReader()
    reader.onload = () => setAvatarDataUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    const el = googleBtnRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.set(el, { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" })
      el.addEventListener("mouseenter", () => { gsap.to(el, { scale: 1.03, boxShadow: "0 8px 25px rgba(124,58,237,0.15)", borderColor: "#7C3AED", duration: 0.3, ease: "power2.out" }) })
      el.addEventListener("mouseleave", () => { gsap.to(el, { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderColor: "#E2E8F0", duration: 0.3, ease: "power2.out" }) })
      el.addEventListener("mousedown", () => { gsap.to(el, { scale: 0.97, duration: 0.1 }) })
      el.addEventListener("mouseup", () => { gsap.to(el, { scale: 1.03, duration: 0.1 }) })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left sidebar */}
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
          <div className="flex gap-6">
            {stats.map((s) => (<div key={s.l}><p className="text-lg font-bold text-[#8b5cf6]">{s.n}</p><p className="text-[11px] text-[#94a3b8]">{s.l}</p></div>))}
          </div>
          <div className="mt-5 border-t border-[#2a2a3e] pt-5">
            <p className="text-[13px] italic leading-[1.6] text-[#94a3b8]">&ldquo;Joining SkillSwap was the best career move I ever made.&rdquo;</p>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-[#7C3AED] text-xs font-semibold text-white">AR</div>
              <div><p className="text-[13px] font-semibold text-[#e2e8f0]">Alex Rivera</p><p className="text-[11px] text-[#94a3b8]">Top Freelancer</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 sm:mb-10">
            <h1 className="text-[26px] sm:text-[28px] font-semibold text-[#0F172A] dark:text-[#f8fafc] tracking-[-0.02em] mb-2">Create your account</h1>
            <p className="text-[#64748B] dark:text-[#94a3b8] text-[14px] sm:text-[15px]">Enter your details to get started on SkillSwap</p>
          </div>

          <form ref={formRef} className="space-y-4 sm:space-y-5" onSubmit={async (e) => {
            e.preventDefault(); setLoading(true)
            const form = new FormData(e.currentTarget)
            const pass = form.get("password") as string
            if (pass.length < 6) { toast.error("Password must be at least 6 characters"); setLoading(false); return }
            if (!/[A-Z]/.test(pass)) { toast.error("Password must contain 1 uppercase letter"); setLoading(false); return }
            if (!/[a-z]/.test(pass)) { toast.error("Password must contain 1 lowercase letter"); setLoading(false); return }
            try {
              await registerWithEmail({ name: form.get("name") as string, email: form.get("email") as string, password: pass, image: avatarDataUrl || undefined, role })
              toast.success("Account created! Let's set up your profile.")
              router.push(`/onboarding?role=${role}`)
            } catch (err: any) {
              const msg = err?.message || ""
              if (msg.toLowerCase().includes("already exists") || msg.toLowerCase().includes("already registered")) {
                toast.error("This email is already registered. Please sign in instead.", { action: { label: "Sign in", onClick: () => router.push("/login") } })
              } else { toast.error("Registration failed. Please try again.") }
            }
            finally { setLoading(false) }
          }}>
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-[13px] font-medium text-[#0F172A] dark:text-[#e2e8f0]">Full name</Label>
                <Input id="name" name="name" placeholder="John Doe" autoComplete="name" required className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-[13px] font-medium text-[#0F172A] dark:text-[#e2e8f0]">Email</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" autoCapitalize="none" autoComplete="email" required className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="password" className="text-[13px] font-medium text-[#0F172A] dark:text-[#e2e8f0]">Password</Label>
              <div className="relative">
                <Input id="password" name="password" type={showPass ? "text" : "password"} placeholder="Min. 6 chars, 1 uppercase, 1 lowercase" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required className="h-11 w-full rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] text-[15px] placeholder:text-[#94A3B8] focus-visible:border-[#7C3AED] focus-visible:ring-0 pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]">
                  {showPass ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-1.5 space-y-1">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= ps.score ? ps.color : "bg-[#E2E8F0] dark:bg-[#2a2a3e]"}`} />)}
                  </div>
                  <p className="text-[11px] text-[#64748B] dark:text-[#94a3b8]">Strength: <span className="font-medium">{ps.label || "Weak"}</span></p>
                </div>
              )}
            </div>

            {/* Role selector */}
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-[#0F172A] dark:text-[#e2e8f0]">I want to join as</Label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setRole("freelancer")} className={`flex items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all ${role === "freelancer" ? "border-[#7C3AED] bg-[#F5F3FF] dark:bg-[#2a1a5e]" : "border-[#E2E8F0] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e] hover:border-[#7C3AED]/50"}`}>
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${role === "freelancer" ? "bg-[#7C3AED]" : "bg-[#F1F5F9] dark:bg-[#2a2a3e]"}`}>
                    <UserIcon className={`size-5 ${role === "freelancer" ? "text-white" : "text-[#64748B] dark:text-[#94a3b8]"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold ${role === "freelancer" ? "text-[#7C3AED]" : "text-[#0F172A] dark:text-[#f8fafc]"}`}>Freelancer</p>
                    <p className="text-xs text-[#64748B] dark:text-[#94a3b8] truncate">I want to earn</p>
                  </div>
                  {role === "freelancer" && <CheckIcon className="size-4 text-[#7C3AED] ml-auto shrink-0" />}
                </button>
                <button type="button" onClick={() => setRole("client")} className={`flex items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all ${role === "client" ? "border-[#7C3AED] bg-[#F5F3FF] dark:bg-[#2a1a5e]" : "border-[#E2E8F0] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e] hover:border-[#7C3AED]/50"}`}>
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${role === "client" ? "bg-[#7C3AED]" : "bg-[#F1F5F9] dark:bg-[#2a2a3e]"}`}>
                    <BriefcaseIcon className={`size-5 ${role === "client" ? "text-white" : "text-[#64748B] dark:text-[#94a3b8]"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold ${role === "client" ? "text-[#7C3AED]" : "text-[#0F172A] dark:text-[#f8fafc]"}`}>Client</p>
                    <p className="text-xs text-[#64748B] dark:text-[#94a3b8] truncate">I want to hire</p>
                  </div>
                  {role === "client" && <CheckIcon className="size-4 text-[#7C3AED] ml-auto shrink-0" />}
                </button>
              </div>
            </div>

            {/* Image upload */}
            <div className="space-y-2">
              <Label className="text-[13px] font-medium text-[#0F172A] dark:text-[#e2e8f0]">Profile photo (optional)</Label>
              <div className="flex items-center gap-4">
                <div onClick={() => fileInputRef.current?.click()} className="flex size-16 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-[#E2E8F0] dark:border-[#2a2a3e] bg-[#F8FAFC] dark:bg-[#1a1a2e] hover:border-[#7C3AED] transition-colors overflow-hidden">
                  {avatarDataUrl ? <img src={avatarDataUrl} alt="Preview" className="size-full object-cover" /> : <UploadIcon className="size-5 text-[#94A3B8]" />}
                </div>
                <div className="min-w-0">
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-medium text-[#7C3AED] hover:underline">Upload photo</button>
                  <p className="text-xs text-[#94A3B8]">PNG, JPG up to 2MB</p>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handleImageSelect} className="hidden" />
            </div>

            <Button type="submit" variant="plastic" className="w-full h-11 rounded-lg text-[15px] font-medium" disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
          </form>

          <div className="my-5 sm:my-6 flex items-center gap-3"><div className="h-px flex-1 bg-[#F1F5F9] dark:bg-[#2a2a3e]" /><span className="text-xs text-[#94A3B8] uppercase tracking-wider">or continue with</span><div className="h-px flex-1 bg-[#F1F5F9] dark:bg-[#2a2a3e]" /></div>
          <button ref={googleBtnRef} onClick={() => signInWithGoogle()} className="group relative w-full h-11 rounded-lg flex items-center justify-center gap-2.5 text-[15px] font-medium border border-[#E2E8F0] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e] text-[#0F172A] dark:text-[#f8fafc] cursor-pointer transition-colors overflow-hidden">
            <span className="relative z-10 flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" className="size-[18px] shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </span>
          </button>
          <p className="mt-6 sm:mt-8 text-center text-[14px] text-[#64748B] dark:text-[#94a3b8]">Already have an account? <Link href="/login" className="font-medium text-[#0F172A] dark:text-[#f8fafc] hover:text-[#7C3AED] underline underline-offset-4">Sign in</Link></p>
        </div>


      </div>
    </div>
  )
}
