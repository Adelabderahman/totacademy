import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkIsAdmin, MASTER_ADMIN_EMAIL } from './lib/adminAccess';

/**
 * Edge Middleware for protecting /studio and administrative routes.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /studio and /admin routes
  if (pathname.startsWith('/studio') || pathname.startsWith('/admin')) {
    const userEmailCookie = request.cookies.get('tot_user_email')?.value;
    const decodedEmail = userEmailCookie ? decodeURIComponent(userEmailCookie) : null;

    const response = NextResponse.next();
    response.headers.set('x-studio-guarded', '1');
    if (decodedEmail) {
      response.headers.set('x-user-email', decodedEmail);
      response.headers.set('x-is-admin', checkIsAdmin(decodedEmail) ? '1' : '0');
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*', '/admin/:path*'],
};
