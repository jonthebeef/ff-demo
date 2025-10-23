import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/upgrade(.*)", "/dashboard(.*)", "/success(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
