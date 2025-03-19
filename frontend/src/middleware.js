import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token'); // Get auth token from cookies

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Run middleware only on protected routes
export const config = {
  matcher: ['/admindashboard', '/employeedashboard'], // Protect these pages
};
