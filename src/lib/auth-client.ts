const API_URL = "http://localhost:3001"

export async function loginWithEmail(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  })
  if (!res.ok) throw new Error("Login failed")
  return res.json()
}

export async function registerWithEmail(data: {
  name: string
  email: string
  password: string
  image?: string
  role?: string
}) {
  const res = await fetch(`${API_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  })
  if (!res.ok) throw new Error("Registration failed")
  return res.json()
}

export async function signInWithGoogle() {
  window.location.href = `${API_URL}/api/auth/sign-in/google`
}

export async function getSession() {
  const res = await fetch(`${API_URL}/api/auth/session`, {
    credentials: "include",
  })
  if (!res.ok) return null
  return res.json()
}

export async function signOut() {
  await fetch(`${API_URL}/api/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  })
}
