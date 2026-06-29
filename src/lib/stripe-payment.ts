import { connectDB } from "@/lib/db"
import { Payment } from "@/models/payment"
import { Task } from "@/models/task"
import { Proposal } from "@/models/proposal"

function getStripe() {
  const Stripe = require("stripe")
  return new Stripe(process.env.STRIPE_SECRET_KEY || "")
}

export async function confirmStripeSession(sessionId: string) {
  await connectDB()

  if (!sessionId) {
    throw new Error("Missing session_id")
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId)
  if (session.payment_status !== "paid") {
    throw new Error("Payment not completed")
  }

  const { taskId, proposalId, freelancerEmail, clientEmail } = session.metadata || {}
  if (!taskId || !proposalId || !freelancerEmail || !clientEmail) {
    throw new Error("Invalid payment session metadata")
  }

  const existing = await Payment.findOne({ transaction_id: sessionId })
  if (existing) return existing

  const payment = await Payment.create({
    client_email: clientEmail,
    freelancer_email: freelancerEmail,
    task_id: taskId,
    amount: (session.amount_total || 0) / 100,
    transaction_id: sessionId,
    payment_status: "completed",
    paid_at: new Date(),
  })

  await Task.findByIdAndUpdate(taskId, { status: "in_progress" })
  await Proposal.findByIdAndUpdate(proposalId, { status: "accepted" })
  await Proposal.updateMany(
    { task_id: taskId, _id: { $ne: proposalId }, status: "pending" },
    { status: "rejected" }
  )

  return payment
}

export { getStripe }
