import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { MongoClient, ObjectId } from "mongodb"

export default async function OAuthRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>
}) {
  const { role } = await searchParams
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("better-auth.session_token")?.value

  if (!sessionToken) {
    redirect("/login")
  }

  const client = new MongoClient(process.env.MONGODB_URI || "")
  await client.connect()
  const db = client.db()

  const session = await db.collection("session").findOne({ token: sessionToken })
  if (!session?.userId) {
    await client.close()
    redirect("/login")
  }

  if (role) {
    await db.collection("user").updateOne(
      { _id: new ObjectId(session.userId as string) },
      { $set: { role } }
    )
  }

  const user = await db.collection("user").findOne(
    { _id: new ObjectId(session.userId as string) },
    { projection: { role: 1 } }
  )
  await client.close()

  const finalRole = role || user?.role || "client"
  redirect(
    finalRole === "admin" ? "/dashboard/admin" :
    finalRole === "freelancer" ? "/dashboard/freelancer" :
    "/dashboard/client"
  )

  return null
}
