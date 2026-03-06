export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/rooms/:path*",
    "/chat/:path*",
    "/focus/:path*",
    "/gamification/:path*",
    "/profile/:path*",
    "/assignments/:path*",
  ],
}
