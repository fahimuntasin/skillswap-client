import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import { Review } from "@/models/review"
import { Proposal } from "@/models/proposal"
import { Task } from "@/models/task"

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit") || "10")

    const freelancers = await User.find({ role: "freelancer", isBlocked: false })
      .select("-password")
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean()

    const withRatings = await Promise.all(
      freelancers.map(async (f) => {
        const reviews = await Review.find({ reviewee_email: f.email })
        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0
        const accepted = await Proposal.find({ freelancer_email: f.email, status: "accepted" }).select("task_id")
        const taskIds = accepted.map((p) => p.task_id)
        const completedJobs = taskIds.length
          ? await Task.countDocuments({ _id: { $in: taskIds }, status: "completed" })
          : 0
        return {
          ...f,
          rating: Math.round(avgRating * 10) / 10,
          totalReviews: reviews.length,
          completedJobs,
        }
      })
    )

    withRatings.sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.completedJobs || 0) - (a.completedJobs || 0))

    return NextResponse.json(withRatings)
  } catch {
    return NextResponse.json({ error: "Failed to fetch freelancers" }, { status: 500 })
  }
}
