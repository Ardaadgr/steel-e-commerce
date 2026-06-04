import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET || 'super-secret-steel-key-2026'
const key = new TextEncoder().encode(secretKey)

export async function middleware(request: NextRequest) {
  // Protect all /admin routes except /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get('admin_session')?.value
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      const { payload } = await jwtVerify(sessionCookie, key, {
        algorithms: ['HS256'],
      })
      
      const user = payload.user as any
      if (user?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      
      // If valid, allow request to proceed
      return NextResponse.next()
    } catch (error) {
      // Invalid or expired token
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protect /account route
  if (request.nextUrl.pathname.startsWith('/account')) {
    const sessionCookie = request.cookies.get('customer_session')?.value
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const { payload } = await jwtVerify(sessionCookie, key, {
        algorithms: ['HS256'],
      })
      
      const user = payload.user as any
      if (!user || user.role !== 'CUSTOMER') {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Also protect API routes that mutate data (example: /api/products, /api/orders)
  // For now we assume Server Actions are used, but if you have APIs protect them here.

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*'],
}
