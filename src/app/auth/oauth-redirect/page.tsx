import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { MongoClient } from "mongodb"

export default async function OAuthRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>
}) {
  const h = await headers()
  const session = await auth.api.getSession({ headers: h })
  const { role } = await searchParams

  if (!session?.user) {
    redirect("/login")
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
  redirect(
    finalRole === "admin" ? "/dashboard/admin" :
    finalRole === "freelancer" ? "/dashboard/freelancer" :
    "/dashboard/client"
  )

  return null
}
