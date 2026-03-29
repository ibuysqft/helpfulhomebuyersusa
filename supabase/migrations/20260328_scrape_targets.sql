create table if not exists scrape_targets (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('county', 'city', 'zip', 'state')),
  value       text not null,
  state       text not null default 'VA',
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  unique (type, value, state)
);

-- Seed with current hardcoded targets
insert into scrape_targets (type, value, state) values
  ('county', 'Fairfax', 'VA'),
  ('county', 'Henrico', 'VA'),
  ('county', 'Richmond', 'VA'),
  ('county', 'Prince William', 'VA')
on conflict do nothing;
