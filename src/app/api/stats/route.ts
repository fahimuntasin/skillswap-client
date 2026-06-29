import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Task } from "@/models/task"
import { User } from "@/models/user"
import { Payment } from "@/models/payment"

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const [totalUsers, totalTasks, activeTasks, freelancerCount, totalPayments] = await Promise.all([
      User.countDocuments(),
      Task.countDocuments(),
      Task.countDocuments({ status: { $in: ["open", "in_progress"] } }),
      User.countDocuments({ role: "freelancer" }),
      Payment.aggregate([{ $match: { payment_status: "completed" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
    ])

    return NextResponse.json({
      totalUsers,
      totalTasks,
      activeTasks,
      freelancerCount,
      totalRevenue: totalPayments[0]?.total || 0,
    })
  } catch {
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 })
  }
}
