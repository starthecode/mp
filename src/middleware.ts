// import { getSession } from 'next-auth/react';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const session = await getSession();

//   console.log('sessionss:', session);

//   // // Check if user has admin role and a valid session
//   // const isAdmin = request.locals.user?.role === 'admin';
//   // const hasValidSession = !!request.locals.user;

//   // if (!isAdmin || !hasValidSession) {
//   //   // Redirect to login page or handle unauthorized access
//   //   return NextResponse.redirect('/login');
//   // }

//   // Continue to the dashboard if the user is an admin with a valid session
//   return NextResponse.next();
// }

// // Supports both a single string value or an array of matchers
// export const config = {
//   matcher: ['/dashboard'],
// };

import { DefaultJWT, getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// Paths that require authentication or authorization
const requireAdminAuth: string[] = [
  '/dashboard',
  '/users',
  '/products',
  '/orders',
  '/downloads',
];

const requireAuth: string[] = ['/account/:path*', '/account?tab=downloads'];

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      roles: string[];
    };
  }
}

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  if (requireAdminAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.SECRET,
    });

    // Check if not logged in
    if (!token) {
      const url = new URL(`/api/auth/signin`, request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    // Check if not authorized
    if (
      !token.user ||
      !token.user.roles ||
      !token.user.roles.includes('admin')
    ) {
      const url = new URL(`/403`, request.url);
      return NextResponse.rewrite(url);
    }
  } else if (requireAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.SECRET,
    });

    // Check if not logged in
    if (!token) {
      const url = new URL(`/api/auth/signin`, request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
