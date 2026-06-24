import type { BetterAuthOptions } from "better-auth"

let clientPromise: ReturnType<typeof import("@better-auth/client").getAuthClient> | null = null

export async function getAuth() {
  if (!clientPromise) {
    const { getAuthClient } = await import("@better-auth/client")
    clientPromise = getAuthClient({
      baseURL: "http://localhost:3001/api/auth",
    })
  }
  return clientPromise
}
