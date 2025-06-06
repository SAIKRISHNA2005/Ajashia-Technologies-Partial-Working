import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const path = request.nextUrl.pathname

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/orders", "/wishlist", "/compare", "/checkout"]
  const adminRoutes = ["/admin"]

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))
  const isAdminRoute = adminRoutes.some((route) => path === route || path.startsWith(`${route}/`))

  // If the route is protected and there's no session, redirect to sign-in
  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(signInUrl)
  }

  // If admin route, check user role
  if (isAdminRoute && session) {
    const { data: userProfile } = await supabase.from("users").select("role").eq("id", session.user.id).single()

    if (!userProfile || userProfile.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
