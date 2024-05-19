import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { currentRole } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

import { privateRoutes } from "@/routes";

const { auth } = NextAuth(authConfig);

export const isAdmin = async (req: NextRequest) => {
  const role = await currentRole();

  const { nextUrl } = req;

  // Check if the user is on the protected page
  const currentUrl = new URL(nextUrl);
  if (!privateRoutes.includes(currentUrl.pathname)) {
    return null;
  }

  if (role !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", nextUrl));
  }

  return null;
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // If no redirection, call the next middleware
  return isAdmin(req);
});

export const config = {
  matcher: ["/", "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
