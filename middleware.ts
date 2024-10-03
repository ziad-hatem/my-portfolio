import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/backend(.*)"]);
const isPostRequest = (req: any) => req.method === "POST";
const isBlockedPostRoute = createRouteMatcher(["/api(.*)"]);

export default clerkMiddleware((auth, req) => {
  const user = auth();

  if (isBlockedPostRoute(req) && isPostRequest(req)) {
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  if (!auth().userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
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
