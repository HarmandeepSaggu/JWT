import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value; // Ensure correct retrieval
  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Run middleware only on protected routes
export const config = {
  matcher: ['/admindashboard', '/employeedashboard/:path*'], // Apply middleware to dynamic routes
};

