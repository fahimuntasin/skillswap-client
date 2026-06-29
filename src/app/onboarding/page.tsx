"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PrimaryActionButton } from "@/components/ui/PrimaryActionButton"
import { notifySuccess, notifyError } from "@/lib/notify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LayersIcon, SparklesIcon, ArrowRightIcon } from "lucide-react"
import { getSession } from "@/lib/auth-client"
import Link from "next/link"

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "freelancer"

  const [step, setStep] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  // Freelancer fields
  const [skills, setSkills] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [bio, setBio] = useState("")

  // Client fields
  const [company, setCompany] = useState("")
  const [website, setWebsite] = useState("")

  useEffect(() => {
    getSession().then((s: any) => {
      if (!s?.user) { router.push("/login"); return }
      setUser(s.user)
    })
  }, [router])

  const handleFinish = async () => {
    if (!user?.id) return
    setSaving(true)
    try {
      const body: Record<string, unknown> = { onboardingCompleted: true, role }
      if (role === "freelancer") {
        body.skills = skills.split(",").map((s) => s.trim()).filter(Boolean)
        body.hourlyRate = Number(hourlyRate) || 0
        body.bio = bio
      } else {
        body.company = company
        body.website = website
      }
      const res = await fetch("/api/auth/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Update failed")
      setDone(true)
      notifySuccess("Profile ready!", "Taking you to your dashboard...")
      setTimeout(() => {
        window.location.href = role === "freelancer" ? "/dashboard/freelancer" : "/dashboard/client"
      }, 900)
    } catch {
      notifyError("Setup failed", "Something went wrong. Please try again.")
    } finally { setSaving(false) }
  }

  const steps = role === "freelancer"
    ? [
        { title: "What skills do you offer?", desc: "Comma-separated (e.g. React, Python, Design)", field: "skills" },
        { title: "What's your hourly rate?", desc: "Set a rate you're comfortable with", field: "rate" },
        { title: "Write a short bio", desc: "Tell clients about yourself", field: "bio" },
      ]
    : [
        { title: "What's your company name?", desc: "Your business or brand name", field: "company" },
        { title: "Company website", desc: "Optional — helps freelancers learn about you", field: "website" },
      ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#7C3AED]">
              <LayersIcon className="size-5 text-white" />
            </div>
          </div>
          <h1 className="text-[26px] font-semibold text-[#0F172A] dark:text-[#f8fafc] tracking-[-0.02em] mb-1">
            {role === "freelancer" ? "Set up your freelancer profile" : "Tell us about your company"}
          </h1>
          <p className="text-[14px] text-[#64748B] dark:text-[#94a3b8]">
            Step {step + 1} of {steps.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-[#7C3AED]" : "bg-[#E2E8F0] dark:bg-[#2a2a3e]"}`} />
          ))}
        </div>

        {/* Step content */}
        {step === 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F5F3FF] dark:bg-[#2a1a5e] mb-4">
              <SparklesIcon className="size-5 text-[#7C3AED] shrink-0" />
              <p className="text-sm text-[#0F172A] dark:text-[#f8fafc]">Welcome{user?.name ? `, ${user.name}` : ""}! Let&apos;s quickly set up your profile.</p>
            </div>
            <Label className="text-[13px] font-medium text-[#0F172A] dark:text-[#e2e8f0]">{steps[0].title}</Label>
            <p className="text-xs text-[#64748B] dark:text-[#94a3b8] -mt-2">{steps[0].desc}</p>
            {role === "freelancer" ? (
              <Input value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, Python, UI Design, ..." className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] text-[15px] focus-visible:border-[#7C3AED]" />
            ) : (
              <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="Acme Inc." className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] text-[15px] focus-visible:border-[#7C3AED]" />
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <Label className="text-[13px] font-medium text-[#0F172A] dark:text-[#e2e8f0]">{steps[1].title}</Label>
            <p className="text-xs text-[#64748B] dark:text-[#94a3b8] -mt-2">{steps[1].desc}</p>
            {role === "freelancer" ? (
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px] text-[#64748B] dark:text-[#94a3b8] font-medium">$</span>
                <Input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="25" className="h-11 pl-8 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] text-[15px] focus-visible:border-[#7C3AED]" />
              </div>
            ) : (
              <Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://acme.com" className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] text-[15px] focus-visible:border-[#7C3AED]" />
            )}
          </div>
        )}

        {step === 2 && role === "freelancer" && (
          <div className="space-y-4">
            <Label className="text-[13px] font-medium text-[#0F172A] dark:text-[#e2e8f0]">{steps[2].title}</Label>
            <p className="text-xs text-[#64748B] dark:text-[#94a3b8] -mt-2">{steps[2].desc}</p>
            <Textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} placeholder="I'm a passionate developer with 3+ years of experience..." className="rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-[#f8fafc] text-[15px] focus-visible:border-[#7C3AED]" />
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8">
          <button onClick={() => step > 0 ? setStep(step - 1) : router.push("/")} className="text-sm font-medium text-[#64748B] dark:text-[#94a3b8] hover:text-[#0F172A] dark:hover:text-[#f8fafc] transition-colors">
            {step > 0 ? "Back" : "Skip"}
          </button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)} variant="plastic" className="h-11 px-6 rounded-lg gap-2">
              Next <ArrowRightIcon className="size-4" />
            </Button>
          ) : (
            <PrimaryActionButton
              type="button"
              onClick={handleFinish}
              loading={saving}
              success={done}
              disabled={done}
              successLabel="All set!"
              className="!w-auto shrink-0 px-6"
            >
              {saving ? "Saving profile..." : "Complete setup"}
            </PrimaryActionButton>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-[#94A3B8]">
          You can always update this later in your{" "}
          <Link href={role === "freelancer" ? "/dashboard/freelancer/profile" : "/dashboard/client"} className="text-[#7C3AED] hover:underline">profile settings</Link>.
        </p>
      </div>
    </div>
  )
}
