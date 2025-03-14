import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
  const auth = request.cookies.get("auth");

  if (request.nextUrl.pathname === "/" && auth) {
    return NextResponse.redirect(new URL("/posts", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/posts/:path*"],
};
