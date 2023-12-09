import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname
    const auth = request.cookies.get('mem.accessToken')?.value
    console.log('AUTH', auth)
    
    function containsAuth(str: string) {
        return str.indexOf("/auth/") !== -1;
    }

    const loginURL = containsAuth(url)


    if(auth) {
        if(loginURL){
            return NextResponse.redirect(new URL('/app', request.url))
        }

        return NextResponse.next()
    } else {
        if(loginURL){

            return NextResponse.next()
        }
         
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }    
}

export const config = {
    matcher: ["/app/:path*", "/auth/:path*"]
}