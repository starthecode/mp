import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.rewrite(new URL('/dashboard', request.url));
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/dashboard'],
};
