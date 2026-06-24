"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function EditProfilePage() {
  return (
    <DashboardShell role="freelancer" userName="Sarah">
      <div className="max-w-[640px]">
        <div className="mb-8"><p className="text-sm font-semibold text-[#7C3AED] mb-1">Profile</p><h1 className="text-[28px] font-bold text-[#0F172A]">Edit Profile</h1></div>
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated!") }}>
          <div className="grid gap-2"><Label>Full Name</Label><Input defaultValue="Sarah Chen" className="h-11 rounded-lg border-[#E2E8F0]" /></div>
          <div className="grid gap-2"><Label>Profile Image URL</Label><Input placeholder="https://..." className="h-11 rounded-lg border-[#E2E8F0]" /></div>
          <div className="grid gap-2"><Label>Skills (comma-separated)</Label><Input defaultValue="UI Design, Figma, Branding" className="h-11 rounded-lg border-[#E2E8F0]" /></div>
          <div className="grid gap-2"><Label>Bio</Label><Textarea defaultValue="Experienced UI designer with 5+ years in branding." rows={3} className="rounded-lg border-[#E2E8F0]" /></div>
          <div className="grid gap-2"><Label>Hourly Rate (USD)</Label><Input type="number" defaultValue={45} className="h-11 rounded-lg border-[#E2E8F0]" /></div>
          <Button type="submit" variant="plastic" className="h-11 px-8 rounded-lg">Save Changes</Button>
        </form>
      </div>
    </DashboardShell>
  )
}
