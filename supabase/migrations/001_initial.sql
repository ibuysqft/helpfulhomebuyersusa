create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  address text not null,
  phone text not null,
  condition text not null check (condition in ('Good','Fair','Poor','Very Poor')),
  source_url text,
  source_city text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  device text,
  ghl_contact_id text,
  ghl_status text default 'pending' check (ghl_status in ('pending','success','failed')),
  ghl_retry_count int default 0
);

create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content text not null,
  meta_description text,
  target_keyword text,
  status text default 'draft' check (status in ('draft','published','rejected')),
  draft_created_at timestamptz default now(),
  published_at timestamptz,
  word_count int,
  city_tags text[]
);

create table audit_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  issues jsonb,
  vitals_lcp float,
  vitals_cls float,
  pages_count int,
  sitemap_url_count int,
  report_json jsonb
);

-- RLS
alter table leads enable row level security;
create policy "service role full access" on leads using (true) with check (true);

alter table blog_posts enable row level security;
create policy "public read published" on blog_posts for select using (status = 'published');
create policy "service role full access" on blog_posts using (true) with check (true);

alter table audit_reports enable row level security;
create policy "service role full access" on audit_reports using (true) with check (true);
