-- HHB National Newsletter sends log
-- Tracks weekly newsletter delivery per state for the 15-state network.

create table if not exists hhb_newsletter_sends (
    id uuid primary key default gen_random_uuid(),
    week_of date not null,
    state_slug text not null,
    state_name text,
    subject text,
    recipient_count int default 0,
    sent_count int default 0,
    failed_count int default 0,
    sent_at timestamptz default now()
);

create index on hhb_newsletter_sends (state_slug, week_of);
create index on hhb_newsletter_sends (week_of);

alter table hhb_newsletter_sends enable row level security;

create policy "service role only"
    on hhb_newsletter_sends
    for all
    using (auth.role() = 'service_role');
