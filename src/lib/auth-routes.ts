/** Post-login/register paths per A10_CAT-011 Section 06 */
export function homePathForRole(role?: string | null): string {
  if (role === "admin") return "/dashboard/admin"
  if (role === "freelancer") return "/dashboard/freelancer"
  return "/"
}

export function dashboardPathForRole(role?: string | null): string {
  if (role === "admin") return "/dashboard/admin"
  if (role === "freelancer") return "/dashboard/freelancer"
  return "/dashboard/client"
}

/** Google OAuth users are always clients (Section 06) */
export const GOOGLE_OAUTH_ROLE = "client" as const
