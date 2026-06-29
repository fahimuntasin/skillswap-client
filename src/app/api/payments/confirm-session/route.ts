import { NextRequest, NextResponse } from "next/server"
import { confirmStripeSession } from "@/lib/stripe-payment"

/** Assignment spec: secure backend confirm-session before DB save */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const sessionId =
      body.session_id ||
      body.sessionId ||
      new URL(req.url).searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 })
    }

    const payment = await confirmStripeSession(String(sessionId))
    return NextResponse.json(payment)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to confirm payment"
    const status = message === "Payment not completed" ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

export async function GET(req: NextRequest) {
  const sessionId = new URL(req.url).searchParams.get("session_id")
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 })
  }
  try {
    const payment = await confirmStripeSession(sessionId)
    return NextResponse.json(payment)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to confirm payment"
    const status = message === "Payment not completed" ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
