import { column as c, table, type TableRow } from 'remix/data-table'

export const claims = table({
  name: 'claims',
  columns: {
    id: c.text().primaryKey(),
    item_slug: c.text().notNull(),
    name: c.text().notNull(),
    quantity: c.integer().notNull(),
    created_at: c.text().notNull(),
  },
})

export const rsvps = table({
  name: 'rsvps',
  columns: {
    id: c.text().primaryKey(),
    name: c.text().notNull(),
    adults: c.integer().notNull(),
    children: c.integer().notNull(),
    message: c.text(),
    created_at: c.text().notNull(),
  },
})

export type Claim = TableRow<typeof claims>
export type Rsvp = TableRow<typeof rsvps>
