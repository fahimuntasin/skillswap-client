import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next()
  }

  try {
    const res = await fetch(new URL("/api/auth/session", request.url), {
      headers: { cookie: request.headers.get("cookie") || "" },
    })
    const data = await res.json()

    if (!data?.user) {
      return NextResponse.redirect(new URL("/login?redirect=" + encodeURIComponent(pathname), request.url))
    }

    const role = data.user.role

    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (pathname.startsWith("/dashboard/client") && role !== "client" && role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (pathname.startsWith("/dashboard/freelancer") && role !== "freelancer" && role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/dashboard/:path*",
}
