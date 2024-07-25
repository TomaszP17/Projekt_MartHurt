
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    if (!decoded.roles.split(',').includes('ROLE_ADMIN')) {
      return NextResponse.redirect('/unauthorized');
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/admin', '/lightings'],
};
