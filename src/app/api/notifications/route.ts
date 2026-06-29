import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Proposal } from "@/models/proposal"
import { Payment } from "@/models/payment"
import { Task } from "@/models/task"
import { auth } from "@/lib/auth"

function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${Math.max(mins, 1)} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`
  const days = Math.floor(hrs / 24)
  return `${days} day${days > 1 ? "s" : ""} ago`
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers })
    if (!session?.user?.email) {
      return NextResponse.json({ notifications: [], unread: 0 })
    }

    await connectDB()
    const email = session.user.email
    const role = session.user.role
    const notifications: { id: string; message: string; type: string; time: string }[] = []

    if (role === "client" || role === "admin") {
      const tasks = await Task.find({ client_email: email }).select("_id title")
      const taskIds = tasks.map((t) => String(t._id))
      if (taskIds.length) {
        const proposals = await Proposal.find({ task_id: { $in: taskIds } })
          .sort({ submitted_at: -1 })
          .limit(10)
        for (const p of proposals) {
          const task = tasks.find((t) => String(t._id) === String(p.task_id))
          notifications.push({
            id: String(p._id),
            message: `New proposal on "${task?.title || "your task"}" — $${p.proposed_budget}`,
            type: "info",
            time: timeAgo(new Date(p.submitted_at)),
          })
        }
      }
    }

    if (role === "freelancer" || role === "admin") {
      const proposals = await Proposal.find({ freelancer_email: email })
        .sort({ submitted_at: -1 })
        .limit(10)
      for (const p of proposals) {
        if (p.status === "accepted") {
          notifications.push({
            id: `acc-${p._id}`,
            message: "Your proposal was accepted!",
            type: "success",
            time: timeAgo(new Date(p.submitted_at)),
          })
        } else if (p.status === "rejected") {
          notifications.push({
            id: `rej-${p._id}`,
            message: "A proposal was not selected this time.",
            type: "info",
            time: timeAgo(new Date(p.submitted_at)),
          })
        }
      }

      const payments = await Payment.find({ freelancer_email: email, payment_status: "completed" })
        .sort({ paid_at: -1 })
        .limit(5)
      for (const pay of payments) {
        notifications.push({
          id: `pay-${pay._id}`,
          message: `Payment of $${pay.amount} received`,
          type: "success",
          time: timeAgo(new Date(pay.paid_at)),
        })
      }
    }

    notifications.sort((a, b) => 0)
    const limited = notifications.slice(0, 8)

    return NextResponse.json({ notifications: limited, unread: limited.length })
  } catch {
    return NextResponse.json({ notifications: [], unread: 0 })
  }
}
