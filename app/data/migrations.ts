import type { MigrationDescriptor } from 'remix/data-table/migrations'

export const migrations: MigrationDescriptor[] = [
  {
    id: '20260914120000',
    name: 'create_claims_and_rsvps',
    up: "create table claims (\n  id text primary key,\n  item_slug text not null,\n  name text not null,\n  quantity integer not null,\n  created_at text not null\n);\n\ncreate index claims_item_slug_idx on claims (item_slug);\n\ncreate table rsvps (\n  id text primary key,\n  name text not null,\n  adults integer not null,\n  children integer not null,\n  message text,\n  created_at text not null\n);\n",
    down: "drop table if exists rsvps;\ndrop table if exists claims;\n",
  },
]
