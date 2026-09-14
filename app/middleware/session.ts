import { createCookie } from 'remix/cookie'
import { session } from 'remix/middleware/session'
import { createCookieSessionStorage } from 'remix/session-storage/cookie'

const isProduction = process.env.NODE_ENV === 'production'
const secret = process.env.SESSION_SECRET

if (!secret && isProduction) {
  throw new Error('SESSION_SECRET is required in production')
}

export const sessionCookie = createCookie('cha_francisco', {
  secrets: [secret ?? 'dev-only-secret'],
  httpOnly: true,
  sameSite: 'Lax',
  secure: isProduction,
  maxAge: 60 * 60 * 24 * 60,
  path: '/',
})

export const sessionStorage = createCookieSessionStorage()

export function guestSession() {
  return session(sessionCookie, sessionStorage)
}
