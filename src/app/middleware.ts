import { NextRequest, NextResponse } from "next/server";

// private paths 
export const protectedPaths = ["/dashboard"];

// public paths
export const publicPaths = ["/login" , "/register"];

export default function middleware  (req: NextRequest) {
    // get token from cookie
    const cookieToken = req.cookies.get('token')?.value;
    const path = req.nextUrl.pathname; // get accesed url 
    // determine the route is protected
    const isProtectedRoutePaths = protectedPaths.some((route) => path.startsWith(route)); 

    // determine the route is public
    const isPublicPaths = publicPaths.some((route) => path.startsWith(route));

    if(cookieToken && isPublicPaths)
{
    return NextResponse.redirect(new URL('/dashboard' , req.url))
}

if(!cookieToken && isProtectedRoutePaths) {
    return NextResponse.redirect(new URL('/login' , req.url))
}

if(path === "/") {
    if(cookieToken) {
        return NextResponse.redirect(new URL('/dashboard' , req.url));
    }else if(!cookieToken) {
        return NextResponse.redirect(new URL('/login' , req.url))
    }
}

return NextResponse.next();

}

export const mathcer = [
    "/dashboard/:path*",
    "/register",
    "/login"
]
