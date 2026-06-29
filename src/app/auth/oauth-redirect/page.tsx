import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { GOOGLE_OAUTH_ROLE, homePathForRole } from "@/lib/auth-routes"

/** Google OAuth sign-up/login always creates a Client account (A10_CAT-011 §06). */
export default async function OAuthRedirectPage() {
  const reqHeaders = await headers()

  let session = await auth.api.getSession({ headers: reqHeaders })
  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== GOOGLE_OAUTH_ROLE && session.user.role !== "admin") {
    await auth.api.updateUser({
      headers: reqHeaders,
      body: { role: GOOGLE_OAUTH_ROLE },
    })
    session = await auth.api.getSession({ headers: reqHeaders })
    if (!session?.user) redirect("/login")
  }

  redirect(homePathForRole(session!.user.role))
}
