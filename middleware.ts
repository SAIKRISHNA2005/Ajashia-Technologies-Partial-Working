// Removing Clerk middleware and implementing a simpler auth check with Supabase
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/orders", "/wishlist", "/compare", "/checkout", "/admin"]

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))

  // Get the token from cookies
  const token = request.cookies.get("supabase-auth-token")?.value

  // If the route is protected and there's no token, redirect to sign-in
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
