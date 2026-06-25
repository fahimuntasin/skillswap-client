async function post(path: string, body: unknown) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Request failed")
  return data
}

export const loginWithEmail = (email: string, password: string) =>
  post("/api/auth/sign-in/email", { email, password })

export const registerWithEmail = (data: { name: string; email: string; password: string; image?: string; role?: string }) =>
  post("/api/auth/sign-up/email", data)

export async function signInWithGoogle() {
  try {
    const res = await fetch("/api/auth/sign-in/social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "google", callbackURL: "/auth/callback" }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  } catch {
    window.location.href = "/api/auth/sign-in/social?provider=google"
  }
}

export async function getSession() {
  try {
    const res = await fetch("/api/auth/session", { credentials: "include" })
    if (!res.ok) return null
    return res.json()
  } catch { return null }
}

export async function signOut() {
  await fetch("/api/auth/sign-out", { method: "POST", credentials: "include" })
}
