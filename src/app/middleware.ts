import { NextRequest, NextResponse } from "next/server";

// private paths 
export const protectedPaths = ["/dashboard"];

// public paths
export const publicPaths = ["/login" , "/register"];

export default function middleware  (req: NextRequest) {
    // get token from cookie
    const cookieToken = req.cookies.get('token')?.value;
    const routeUrl = req.nextUrl.pathname; // get accesed url 
    // determine the route is protected
    const isProtectedRoutePaths = protectedPaths.some((route) => routeUrl.startsWith(route)); 

    // determine the route is public
    const isPublicPaths = publicPaths.some((route) => routeUrl.startsWith(route));

    if(cookieToken && isPublicPaths)
{
    return NextResponse.redirect(new URL('/dashboard' , req.url))
}

if(!cookieToken && isProtectedRoutePaths) {
    return NextResponse.redirect(new URL('/login' , req.url))
}

if(routeUrl === "/") {
    if(cookieToken) {
        return NextResponse.redirect(new URL('/dashboard' , req.url));
    }else if(!cookieToken) {
        return NextResponse.redirect(new URL('/login' , req.url))
    }
}

return NextResponse.next();

}

export const mathcer = [
    "/dashboard/:routeUrl*",
    "/register",
    "/login"
]
