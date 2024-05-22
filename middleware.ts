import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from "next/headers";
import moment from 'moment';
import { validarTokenDate } from './utils/helpers';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const jwt = cookies().get("sesion")
    const date =  cookies().get("dateSesion")
    let valiDate = true
    if(date) valiDate = validarTokenDate(date.value)

    console.log(request.nextUrl.pathname)

    console.log(valiDate)

    if(request.nextUrl.pathname.includes("/dashboard")){
        if(valiDate) return NextResponse.redirect(new URL('/login', request.url))
    }


    if(request.nextUrl.pathname === "/"){

        if(jwt === undefined){
            return NextResponse.redirect(new URL('/login', request.url))
        }

        if(jwt !== undefined){
            if(valiDate) return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }
    if(request.nextUrl.pathname.includes("/dashboard")){
        if(jwt === undefined){
          if(valiDate)  return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if(request.nextUrl.pathname.includes("/login")){
        if(jwt !== undefined){
            if(!valiDate) return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

  return NextResponse.next()
}