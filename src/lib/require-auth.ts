import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

type Role = "client" | "freelancer" | "admin"

export async function requireSession(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Authentication required" }, { status: 401 }) }
  }
  return { session, user: session.user }
}

export async function requireRole(req: NextRequest, allowed: Role | Role[]) {
  const result = await requireSession(req)
  if ("error" in result) return result

  const roles = Array.isArray(allowed) ? allowed : [allowed]
  const userRole = result.user.role as Role
  if (!roles.includes(userRole)) {
    return { error: NextResponse.json({ error: "Forbidden: insufficient role" }, { status: 403 }) }
  }
  return result
}
