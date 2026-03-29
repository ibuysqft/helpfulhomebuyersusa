/**
 * proxy.ts — Next.js 16 Proxy (formerly Middleware)
 * Detects which state site is being served from the incoming hostname and
 * sets an x-state-slug header so server components can read it at runtime
 * independently of build-time NEXT_PUBLIC_* env vars.
 */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const HOSTNAME_TO_SLUG: Record<string, string> = {
  'helpfulhomebuyersvirginia.com': 'virginia',
  'www.helpfulhomebuyersvirginia.com': 'virginia',
  'helpfulhomebuyerstexas.com': 'texas',
  'www.helpfulhomebuyerstexas.com': 'texas',
  'helpfulhomebuyersflorida.com': 'florida',
  'www.helpfulhomebuyersflorida.com': 'florida',
  'helpfulhomebuyersgeorgia.com': 'georgia',
  'www.helpfulhomebuyersgeorgia.com': 'georgia',
  'helpfulhomebuyersohio.com': 'ohio',
  'www.helpfulhomebuyersohio.com': 'ohio',
  'helpfulhomebuyersnorthcarolina.com': 'north-carolina',
  'www.helpfulhomebuyersnorthcarolina.com': 'north-carolina',
  'helpfulhomebuyerssouthcarolina.com': 'south-carolina',
  'www.helpfulhomebuyerssouthcarolina.com': 'south-carolina',
  'helpfulhomebuyersillinois.com': 'illinois',
  'www.helpfulhomebuyersillinois.com': 'illinois',
  'helpfulhomebuyersmichigan.com': 'michigan',
  'www.helpfulhomebuyersmichigan.com': 'michigan',
  'helpfulhomebuyersnewyork.com': 'new-york',
  'www.helpfulhomebuyersnewyork.com': 'new-york',
  'helpfulhomebuyersnewjersey.com': 'new-jersey',
  'www.helpfulhomebuyersnewjersey.com': 'new-jersey',
  'helpfulhomebuyerscalifornia.com': 'california',
  'www.helpfulhomebuyerscalifornia.com': 'california',
  'helpfulhomebuyersarizona.com': 'arizona',
  'www.helpfulhomebuyersarizona.com': 'arizona',
  'helpfulhomebuyerscolorado.com': 'colorado',
  'www.helpfulhomebuyerscolorado.com': 'colorado',
  'helpfulhomebuyersconnecticut.com': 'connecticut',
  'www.helpfulhomebuyersconnecticut.com': 'connecticut',
}

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''
  const slug = HOSTNAME_TO_SLUG[hostname]

  const response = NextResponse.next()

  if (slug) {
    response.headers.set('x-state-slug', slug)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
