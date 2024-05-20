import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from "next/headers";
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const jwt = cookies().get("sesion")

    console.log(request.nextUrl.pathname)

    if(request.nextUrl.pathname === "/"){

        if(jwt === undefined){
            return NextResponse.redirect(new URL('/login', request.url))
        }

        if(jwt !== undefined){
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }
    if(request.nextUrl.pathname.includes("/dashboard")){
        if(jwt === undefined){
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if(request.nextUrl.pathname.includes("/login")){
        if(jwt !== undefined){
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

  return NextResponse.next()
}