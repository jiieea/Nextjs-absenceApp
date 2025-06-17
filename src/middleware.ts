import { NextResponse } from "next/server";
import type { NextRequest  } from "next/server"; 

export const protectedPaths = [ "/dashboard " , "/students" , "/attendance"];
export const publicPaths = ["/login" , "/register"];

export default function middleware(req : NextRequest) {
    // get token
    const token = req.cookies.get('token')?.value;
    const path = req.nextUrl.pathname;
    const isProtectedPath = protectedPaths.some((route) => {
        path.startsWith(route);
    });
    const isPublicPath = publicPaths.some((route) => path.startsWith(route));

    if(path === "/") {
        if(token) {
            return NextResponse.redirect(new URL("/dashboard" , req.url));
        }else{
            return NextResponse.redirect(new URL("/login" , req.url))
        }
    }

    if(token && isPublicPath) {
        return NextResponse.redirect(new URL('/dashboard'))
    }

    if(!token && isProtectedPath) {
        return NextResponse.redirect(new URL('/register' , req.url));
    }

    return NextResponse.next();
}

export const matcher = [
    '/students/:path*',
    '/dashboard/:path*',
    '/attendance/:path*',
    '/login',
    '/register',
    '/',
  ];