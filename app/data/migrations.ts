import type { MigrationDescriptor } from 'remix/data-table/migrations'

export const migrations: MigrationDescriptor[] = [
  {
    id: '20260914120000',
    name: 'create_claims_and_rsvps',
    up: `
create table claims (
  id text primary key,
  item_slug text not null,
  name text not null,
  quantity integer not null,
  created_at text not null
);

create index claims_item_slug_idx on claims (item_slug);

create table rsvps (
  id text primary key,
  name text not null,
  adults integer not null,
  children integer not null,
  message text,
  created_at text not null
);
`,
    down: `
drop table if exists rsvps;
drop table if exists claims;
`,
  },
]
