
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { decodeToken, hasRole } from './utils/auth';


export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const decoded = decodeToken(token);
    if (!hasRole(decoded, "ROLE_ADMIN") || !hasRole(decoded, "ROLE_ADMIN")) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/admin', '/lightings'],
};
