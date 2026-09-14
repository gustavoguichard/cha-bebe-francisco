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
