-- supabase/migrations/20260328_mls_pipeline.sql

create table if not exists mls_leads (
  id                    uuid primary key default gen_random_uuid(),
  mls_number            text unique not null,
  address               text not null,
  list_price            integer,
  beds                  integer,
  baths                 numeric(3,1),
  sqft                  integer,
  agent_name            text,
  agent_email           text,
  agent_phone           text,
  dealsauce_wholesale   integer,
  comp_arv              integer,
  max_offer             integer,
  repair_estimate_low   integer,
  repair_estimate_high  integer,
  distress_score        numeric(3,1),
  distress_signals      jsonb,
  photo_count           integer,
  description_keywords  text[],
  source                text not null check (source in ('dealsauce', 'agent_submission')),
  status                text not null default 'new' check (status in (
    'new','scored','queued','contacted',
    'warm_cash','warm_creative','dead','retail','disqualified'
  )),
  offer_strategy        text check (offer_strategy in ('cash', 'creative')),
  created_at            timestamptz not null default now(),
  contacted_at          timestamptz,
  responded_at          timestamptz,
  warm_at               timestamptz
);

create index if not exists idx_mls_leads_status        on mls_leads (status);
create index if not exists idx_mls_leads_distress_score on mls_leads (distress_score);

create table if not exists outreach_log (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid not null references mls_leads (id),
  channel         text not null check (channel in ('email', 'sms')),
  sent_at         timestamptz not null default now(),
  ghl_contact_id  text,
  sequence_id     text,
  message_preview text
);

create index if not exists idx_outreach_log_lead_id       on outreach_log (lead_id);
create index if not exists idx_outreach_log_ghl_contact   on outreach_log (ghl_contact_id);

create table if not exists daily_send_budget (
  date          date primary key default current_date,
  email_sent    integer not null default 0,
  sms_sent      integer not null default 0,
  email_limit   integer not null default 20,
  sms_limit     integer not null default 10,
  paused        boolean not null default false,
  pause_reason  text
);

-- Atomic increment to avoid race conditions (upserts row if missing)
create or replace function increment_send_count(p_date date, p_field text)
returns void language plpgsql as $$
begin
  if p_field = 'email_sent' then
    insert into daily_send_budget (date, email_sent) values (p_date, 1)
    on conflict (date) do update set email_sent = daily_send_budget.email_sent + 1;
  elsif p_field = 'sms_sent' then
    insert into daily_send_budget (date, sms_sent) values (p_date, 1)
    on conflict (date) do update set sms_sent = daily_send_budget.sms_sent + 1;
  end if;
end;
$$;
