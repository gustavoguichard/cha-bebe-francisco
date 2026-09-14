import { compression } from 'remix/middleware/compression'
import { formData } from 'remix/middleware/form-data'
import { logger } from 'remix/middleware/logger'
import { render } from 'remix/middleware/render'
import { staticFiles } from 'remix/middleware/static'
import { createMiddleware, createRouter, type MiddlewareContext } from 'remix/router'

import controller from './actions/controller.tsx'
import { loadDatabase } from './middleware/database.ts'
import { guestSession } from './middleware/session.ts'
import { routes } from './routes.ts'

const isDevelopment = process.env.NODE_ENV === 'development'

const middleware = createMiddleware(
  compression(),
  staticFiles('./public', { index: false }),
  formData(),
  guestSession(),
  loadDatabase(),
  render(),
)

export type AppContext = MiddlewareContext<typeof middleware>

declare module 'remix/router' {
  interface RouterTypes {
    context: AppContext
  }
}

export const router = createRouter<AppContext>({
  middleware: isDevelopment ? [logger(), ...middleware] : middleware,
})

router.map(routes, controller)
