"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Loader } from "@/components/ui/Loader"
import { StarIcon, DollarSignIcon } from "lucide-react"
import { api } from "@/lib/api"

export default function FreelancerProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.updateUser(id, {}).catch(() => {}).finally(() => {
      api.getUsers(`role=freelancer&limit=50`).then((users: any[]) => {
        const u = users.find((u: any) => u._id === id)
        if (u) setUser(u)
      })
      api.getReviews(`reviewee_email=${user?.email}`).then(setReviews).catch(() => {})
      setLoading(false)
    })
  }, [id])

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><Loader /></div>
  if (!user) return <div className="py-20 text-center text-[#64748B]">Freelancer not found</div>

  const avgRating = reviews.length ? (reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length).toFixed(1) : "0.0"

  return (
    <div className="min-h-[calc(100vh-4rem)] border-b border-[#d1d9e0] dark:border-[#2a2a3e]">
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        <div className="flex flex-col sm:flex-row gap-8 mb-10">
          <Avatar className="size-24 ring-4 ring-[#F5F3FF] dark:ring-[#2d1f5e] ring-offset-4 ring-offset-white dark:ring-offset-[#0a0a0b] shrink-0">
            <AvatarFallback className="bg-[#7C3AED] text-white text-2xl font-semibold">{user.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-[36px] font-bold text-[#0F172A] dark:text-[#f8fafc]">{user.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1"><StarIcon className="size-5 fill-amber-400 text-amber-400" /><span className="font-semibold text-[#0F172A] dark:text-[#f8fafc]">{avgRating}</span><span className="text-[#64748B] dark:text-[#94a3b8]">({reviews.length} reviews)</span></div>
              {user.hourlyRate > 0 && <span className="flex items-center gap-1 text-[#7C3AED] font-semibold"><DollarSignIcon className="size-4" />{user.hourlyRate}/hr</span>}
            </div>
            {user.bio && <p className="mt-4 text-[15px] leading-relaxed text-[#475569] dark:text-[#cbd5e1] max-w-[600px]">{user.bio}</p>}
            {user.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {user.skills.map((s: string) => <Badge key={s} className="bg-[#F5F3FF] dark:bg-[#2d1f5e] text-[#7C3AED] dark:text-[#c4b5fd] border-0 font-medium">{s}</Badge>)}
              </div>
            )}
          </div>
        </div>
        {reviews.length > 0 && (
          <div>
            <h2 className="text-[24px] font-bold text-[#0F172A] dark:text-[#f8fafc] mb-6">Reviews ({reviews.length})</h2>
            <div className="space-y-4">
              {reviews.map((r: any) => (
                <div key={r._id} className="rounded-xl border border-[#F1F5F9] dark:border-[#2a2a3e] bg-white dark:bg-[#1c1a3a] p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">{Array.from({ length: 5 }, (_, i) => <StarIcon key={i} className={`size-4 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-[#E2E8F0] dark:text-[#2a2a3e]"}`} />)}</div>
                    <span className="text-sm text-[#64748B] dark:text-[#94a3b8]">by {r.reviewer_email}</span>
                  </div>
                  <p className="text-[15px] text-[#475569] dark:text-[#cbd5e1]">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
