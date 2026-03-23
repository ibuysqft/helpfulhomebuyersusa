create table if not exists hhb_newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  state_slug text not null default 'national',
  state_name text,
  source text default 'national',
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz,
  last_sent_at timestamptz,
  open_count int default 0,
  click_count int default 0
);

create index if not exists hhb_newsletter_subscribers_state_slug_idx
  on hhb_newsletter_subscribers(state_slug);

create index if not exists hhb_newsletter_subscribers_subscribed_at_idx
  on hhb_newsletter_subscribers(subscribed_at);

alter table hhb_newsletter_subscribers enable row level security;

create policy "service role only"
  on hhb_newsletter_subscribers
  using (auth.role() = 'service_role');
