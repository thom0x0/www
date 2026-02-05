import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const REALM = 'Sanity Studio'

const MAX_AUTH_HEADER_LEN = 8 * 1024

const MAX_TRIES = 3
const BLOCK_TIME_SECONDS = 60

const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

function timingSafeEqual(a: string, b: string) {
  const len = Math.max(a.length, b.length)
  let out = 0

  for (let i = 0; i < len; i += 1) {
    const ca = i < a.length ? a.charCodeAt(i) : 0
    const cb = i < b.length ? b.charCodeAt(i) : 0
    out |= ca ^ cb
  }

  return out === 0 && a.length === b.length
}

function unauthorized() {
  return new NextResponse('oopsies! você não foi autorizado :(', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}"`,
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Pragma: 'no-cache',
    },
  })
}

function noStoreRedirect(url: URL, status = 302) {
  const res = NextResponse.redirect(url, status)
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  res.headers.set('Pragma', 'no-cache')
  return res
}

function clearCookie(res: NextResponse, name: string) {
  res.cookies.set(name, '', {
    path: '/studio',
    maxAge: 0,
  })
}

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next()
  }

  const USER = process.env.STUDIO_USER ?? ''
  const PASS = process.env.STUDIO_PASS ?? ''

  if (!USER || !PASS) {
    return new NextResponse('servidor tá com erro :c', {
      status: 500,
      headers: { 'Cache-Control': 'no-store' },
    })
  }

  const isProd = process.env.NODE_ENV === 'production'

  const blocked = req.cookies.get('studio-blocked')?.value
  if (blocked === 'true') {
    return noStoreRedirect(new URL(RICKROLL_URL, req.url))
  }

  const tries = Number(req.cookies.get('studio-tries')?.value ?? '0')

  const auth = req.headers.get('authorization')

  if (!auth || auth.length > MAX_AUTH_HEADER_LEN) {
    return unauthorized()
  }

  const match = auth.match(/^Basic\s+(.+)$/i)
  if (!match) {
    return unauthorized()
  }

  let decoded = ''
  try {
    decoded = atob(match[1])
  } catch {
    return unauthorized()
  }

  const idx = decoded.indexOf(':')
  if (idx < 0) {
    return unauthorized()
  }

  const user = decoded.slice(0, idx)
  const pass = decoded.slice(idx + 1)

  const userOk = timingSafeEqual(user, USER)
  const passOk = timingSafeEqual(pass, PASS)

  if (!userOk || !passOk) {
    if (tries + 1 >= MAX_TRIES) {
      const res = noStoreRedirect(new URL(RICKROLL_URL, req.url))

      res.cookies.set('studio-blocked', 'true', {
        path: '/studio',
        httpOnly: true,
        sameSite: 'strict',
        secure: isProd,
        maxAge: BLOCK_TIME_SECONDS,
      })

      clearCookie(res, 'studio-tries')

      return res
    }

    const res = unauthorized()

    res.cookies.set('studio-tries', String(tries + 1), {
      path: '/studio',
      httpOnly: true,
      sameSite: 'strict',
      secure: isProd,
      maxAge: 600,
    })

    return res
  }

  const res = NextResponse.next()

  clearCookie(res, 'studio-tries')
  clearCookie(res, 'studio-blocked')

  return res
}

export const config = {
  matcher: ['/studio/:path*'],
}
