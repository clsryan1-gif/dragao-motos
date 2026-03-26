import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || "dragao_motos_super_secret_key_2026";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("dragao_session")?.value;

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      const { payload } = await jwtVerify(sessionToken, key, {
        algorithms: ["HS256"],
      });
      
      if (payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect /api/admin routes if they exist
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
     if (!sessionToken) {
       return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
     }
     try {
       const { payload } = await jwtVerify(sessionToken, key, { algorithms: ["HS256"] });
       if (payload.role !== 'ADMIN') {
         return NextResponse.json({ message: "Proibido" }, { status: 403 });
       }
     } catch (e) {
       return NextResponse.json({ message: "Sessão inválida" }, { status: 401 });
     }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
