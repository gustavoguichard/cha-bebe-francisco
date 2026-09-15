import { createCookie } from 'remix/cookie'
import { session } from 'remix/middleware/session'
import { createCookieSessionStorage } from 'remix/session-storage/cookie'

const isProduction = process.env.NODE_ENV === 'production'
const secret = process.env.SESSION_SECRET || 'x7Qm4vL9pR2sT8wY1zB6nC3hJ5kF0dG7aE4uV8iN2oP9qS1rW6tX3yZ5bM8cH0jK'

export const sessionCookie = createCookie('cha_francisco', {
  secrets: [secret],
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
