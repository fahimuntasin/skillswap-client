import { NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (role && role !== session.user.role) {
      const client = new MongoClient(process.env.MONGODB_URI || "")
      await client.connect()
      await client.db().collection("user").updateOne(
        { id: session.user.id },
        { $set: { role } }
      )
      await client.close()
    }

    const finalRole = role || session.user.role || "client"
    const dashboard = finalRole === "admin"
      ? "/dashboard/admin"
      : finalRole === "freelancer"
        ? "/dashboard/freelancer"
        : "/dashboard/client"

    return NextResponse.redirect(new URL(dashboard, request.url))
  } catch {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}
