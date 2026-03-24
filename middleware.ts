
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;
  if (pathname === "/adminspace") {
    return NextResponse.redirect(new URL("/adminspace/home", request.url));
  }
  if (pathname === "/userspace") {
    return NextResponse.redirect(new URL("/userspace/profile", request.url));
  }

  const adminProtectedRoutes = ["adminspace"];
  const userProtectedRoutes = ["userspace"];

  const isAdminProtectedRoute = adminProtectedRoutes.some(route => 
    pathname.startsWith(`/${route}`)
  );
  const isUserProtectedRoute = userProtectedRoutes.some(route => 
    pathname.startsWith(`/${route}`)
  );

  if (!isAdminProtectedRoute && !isUserProtectedRoute) {
    return NextResponse.next();
  }

  if (isAdminProtectedRoute) {
    const token = request.cookies.get("access_token");
    if (!token) {
      return NextResponse.redirect(new URL("/admin-auth/login", request.url));
    }
    try {
      await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET!));
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/admin-auth/login", request.url));
    }
  }

  if (isUserProtectedRoute) {
    const token = request.cookies.get("access_token");
    
    if (!token) {
      return NextResponse.redirect(new URL("/driver-auth/login", request.url));
    }
    
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
