import { getAuthClient } from "@better-auth/client"

export const authClient = getAuthClient({
  baseURL: "http://localhost:3001/api/auth",
})

export const { signIn, signUp, signOut, getSession, useSession } = authClient
