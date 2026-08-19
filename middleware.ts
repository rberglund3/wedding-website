import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "site_access";

export function middleware(request: NextRequest) {
  const hasAccess = request.cookies.get(COOKIE_NAME)?.value === "granted";

  if (hasAccess) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/enter-password";
  url.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!enter-password|api/site-auth|_next/static|_next/image|favicon.ico|robots.txt|images).*)",
  ],
};
