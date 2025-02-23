import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value; // Correct way to access cookies
  const protectedRoutes = [
    '/profile',
    '/profile/maintenance',
    '/profile/control-panel',
    '/profile/added-location',
    '/profile/previous-requests',
    '/profile/favourite',
    '/profile/help-center'
  ];

  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (!token && isProtectedRoute) {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('redirected', 'true'); // Add query param
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'], // Apply middleware only to protected profile routes
};
