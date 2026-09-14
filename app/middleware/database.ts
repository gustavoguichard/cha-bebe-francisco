import type { Database } from 'remix/data-table'
import { createContextKey, type Middleware } from 'remix/router'

import { getDb } from '../data/database.ts'

export const databaseContext = createContextKey<Database>()

export function loadDatabase(): Middleware<{
  key: typeof databaseContext
  value: Database
  property: 'db'
}> {
  return async (context, next) => {
    context.set(databaseContext, await getDb())
    return next()
  }
}
