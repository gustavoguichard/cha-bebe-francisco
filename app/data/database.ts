import * as path from 'node:path'
import type { Database } from 'remix/data-table'
import { loadMigrations } from 'remix/data-table/migrations/node'

const rootDir = path.resolve(import.meta.dirname, '../..').replace(/[\\/]dist$/, '')

let pending: Promise<Database> | undefined

export function getDb(): Promise<Database> {
  pending ??= createDatabase()
  return pending
}

async function createDatabase(): Promise<Database> {
  let db = await openDatabase()
  let migrations = await loadMigrations(path.join(rootDir, 'db', 'migrations'))
  await db.migrate(migrations)
  return db
}

async function openDatabase(): Promise<Database> {
  if (process.env.DATABASE_URL) {
    let { createPostgresDatabase } = await import('remix/data-table/postgres')
    return createPostgresDatabase({ connectionString: process.env.DATABASE_URL })
  }

  let { createSqliteDatabase } = await import('remix/data-table/sqlite')
  let filename = process.env.SQLITE_PATH ?? path.join(rootDir, 'db', 'app.sqlite')
  return createSqliteDatabase({ filename, foreignKeys: true })
}
