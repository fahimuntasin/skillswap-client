"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { getSession } from "@/lib/auth-client"

export default function EditProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [skills, setSkills] = useState("")
  const [bio, setBio] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSession().then(async (s: any) => {
      if (!s?.user?.id) return
      const u = await api.getUsers(`id=${s.user.id}`).catch(() => null)
      if (u) {
        const data = Array.isArray(u) ? u[0] : u
        setUser(data)
        setName(data.name || "")
        setImage(data.image || "")
        setSkills(Array.isArray(data.skills) ? data.skills.join(", ") : "")
        setBio(data.bio || "")
        setHourlyRate(String(data.hourlyRate || ""))
      }
    })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!user?._id) return
    setSaving(true)
    try {
      await api.updateUser(user._id, {
        name,
        image,
        skills: skills.split(",").map(s => s.trim()).filter(Boolean),
        bio,
        hourlyRate: Number(hourlyRate) || 0,
      })
      toast.success("Profile updated!")
    } catch {
      toast.error("Failed to update profile")
    } finally { setSaving(false) }
  }

  return (
    <DashboardShell role="freelancer" userName={user?.name || ""}>
      <div className="max-w-[640px]">
        <div className="mb-8"><p className="text-sm font-semibold text-[#7C3AED] mb-1">Profile</p><h1 className="text-[28px] font-bold text-[#0F172A] dark:text-[#f8fafc]">Edit Profile</h1></div>
        <form className="space-y-5" onSubmit={handleSave}>
          <div className="grid gap-2"><Label className="text-[#0F172A] dark:text-[#f8fafc]">Full Name</Label><Input value={name} onChange={e => setName(e.target.value)} className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:text-[#f8fafc]" /></div>
          <div className="grid gap-2"><Label className="text-[#0F172A] dark:text-[#f8fafc]">Profile Image URL</Label><Input value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:text-[#f8fafc]" /></div>
          <div className="grid gap-2"><Label className="text-[#0F172A] dark:text-[#f8fafc]">Skills (comma-separated)</Label><Input value={skills} onChange={e => setSkills(e.target.value)} className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:text-[#f8fafc]" /></div>
          <div className="grid gap-2"><Label className="text-[#0F172A] dark:text-[#f8fafc]">Bio</Label><Textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:text-[#f8fafc]" /></div>
          <div className="grid gap-2"><Label className="text-[#0F172A] dark:text-[#f8fafc]">Hourly Rate (USD)</Label><Input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="h-11 rounded-lg border-[#E2E8F0] dark:border-[#2a2a3e] dark:bg-[#1c1a3a] dark:text-[#f8fafc]" /></div>
          <Button type="submit" variant="plastic" className="h-11 px-8 rounded-lg" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
        </form>
      </div>
    </DashboardShell>
  )
}
