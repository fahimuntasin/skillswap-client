import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Task } from "@/models/task"
import { Proposal } from "@/models/proposal"
import { Payment } from "@/models/payment"
import { requireRole } from "@/lib/require-auth"

export async function DELETE(req: NextRequest) {
  const authResult = await requireRole(req, "admin")
  if ("error" in authResult) return authResult.error

  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Task ID required" }, { status: 400 })

    await Task.findByIdAndDelete(id)
    await Proposal.deleteMany({ task_id: id })
    await Payment.deleteMany({ task_id: id })

    return NextResponse.json({ message: "Task and related data deleted" })
  } catch {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  }
}
