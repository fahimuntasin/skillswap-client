import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Task } from "@/models/task"
import { confirmStripeSession, getStripe } from "@/lib/stripe-payment"
import { requireRole } from "@/lib/require-auth"

export async function POST(req: NextRequest) {
  const authResult = await requireRole(req, "client")
  if ("error" in authResult) return authResult.error

  try {
    await connectDB()
    const { taskId, proposalId, amount, clientEmail, freelancerEmail } = await req.json()

    if (!taskId || !proposalId || !amount || !clientEmail || !freelancerEmail) {
      return NextResponse.json({ error: "Missing payment fields" }, { status: 400 })
    }

    if (clientEmail !== authResult.user.email) {
      return NextResponse.json({ error: "Forbidden: client email mismatch" }, { status: 403 })
    }

    const task = await Task.findById(taskId)
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 })

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: clientEmail,
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: task.title || "Task Payment" },
          unit_amount: Math.round(Number(amount) * 100),
        },
        quantity: 1,
      }],
      metadata: {
        taskId: String(taskId),
        proposalId: String(proposalId),
        freelancerEmail,
        clientEmail,
      },
      success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"}/dashboard/client/proposals`,
    })

    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get("session_id")
    if (!sessionId) return NextResponse.json({ error: "Missing session_id" }, { status: 400 })

    const payment = await confirmStripeSession(sessionId)
    return NextResponse.json(payment)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to confirm payment"
    const status = message === "Payment not completed" ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

export async function GET() {
  try {
    await connectDB()
    const { Payment } = await import("@/models/payment")
    const payments = await Payment.find().sort({ paid_at: -1 })
    return NextResponse.json(payments)
  } catch {
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}
