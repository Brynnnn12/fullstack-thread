import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Routes yang butuh authentication
    const protectedRoutes = ["/profile"];

    // Routes yang hanya untuk guest (belum login)
    const guestOnlyRoutes = ["/login", "/register"];

    // Jika user sudah login dan mengakses guest-only routes, redirect ke home
    if (token && guestOnlyRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Jika user belum login dan mengakses protected routes, redirect ke login
    if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // API routes yang butuh auth bisa ditambahkan di sini
        if (pathname.startsWith("/api/protected")) {
          return !!token;
        }

        // Untuk routes lainnya, izinkan akses
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};