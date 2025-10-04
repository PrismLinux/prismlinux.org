import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const referer = request.headers.get("referer");

  // Check if it's an image file anywhere
  const isImage = pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i);

  if (isImage) {
    // Allow if referer exists and is from same origin
    const origin = request.nextUrl.origin;

    if (referer && referer.startsWith(origin)) {
      // Request from same site - allow
      return NextResponse.next();
    }

    // No referer or external referer - check if it's a bot/direct access
    const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";

    // Allow common browsers loading images within pages
    if (referer || userAgent.includes("mozilla") || userAgent.includes("chrome")) {
      return NextResponse.next();
    }

    // Block direct access (new tab, wget, curl, bots)
    return new NextResponse("Direct access to images is not allowed", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
