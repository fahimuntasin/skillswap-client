async function request(path: string, options?: RequestInit) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch(path, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...options?.headers },
      signal: controller.signal,
      ...options,
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  } finally {
    clearTimeout(timeout)
  }
}

export const api = {
  // Tasks
  getTasks: (params?: string) => request(`/api/tasks${params ? `?${params}` : ""}`),
  getTask: (id: string) => request(`/api/tasks/${id}`),
  createTask: (data: unknown) => request("/api/tasks", { method: "POST", body: JSON.stringify(data) }),
  updateTask: (id: string, data: unknown) => request(`/api/tasks?id=${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTask: (id: string) => request(`/api/tasks?id=${id}`, { method: "DELETE" }),

  // Proposals
  getProposals: (params?: string) => request(`/api/proposals${params ? `?${params}` : ""}`),
  createProposal: (data: unknown) => request("/api/proposals", { method: "POST", body: JSON.stringify(data) }),
  updateProposal: (id: string, data: unknown) => request(`/api/proposals?id=${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  // Freelancers
  getFreelancers: (limit?: number) => request(`/api/freelancers${limit ? `?limit=${limit}` : ""}`),

  // Users
  getUser: (id: string) => request(`/api/users/${id}`),
  getUsers: (params?: string) => request(`/api/users${params ? `?${params}` : ""}`),
  updateUser: (id: string, data: unknown) => request(`/api/users/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  // Payments
  createCheckout: (data: unknown) => request("/api/payments", { method: "POST", body: JSON.stringify(data) }),
  confirmPayment: (sessionId: string) =>
    request("/api/payments/confirm-session", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId }),
    }),
  getPayments: () => request("/api/payments"),

  // Reviews
  getReviews: (params?: string) => request(`/api/reviews${params ? `?${params}` : ""}`),
  createReview: (data: unknown) => request("/api/reviews", { method: "POST", body: JSON.stringify(data) }),

  // Stats & Earnings
  getStats: () => request("/api/stats"),
  getRevenue: () => request("/api/admin/revenue"),
  getEarnings: (email: string) => request(`/api/earnings?email=${email}`),
  getClientTasks: (email: string) => request(`/api/client-tasks?client_email=${email}`),
}
