import { NextRequest, NextResponse } from 'next/server'
import { fallbackLng, languages } from './app/i18n/settings'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

export function middleware(req: NextRequest) {
  if (!languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`))) {
    return NextResponse.redirect(new URL(`/${fallbackLng}${req.nextUrl.pathname}`, req.url))
  }

  return NextResponse.next()
}