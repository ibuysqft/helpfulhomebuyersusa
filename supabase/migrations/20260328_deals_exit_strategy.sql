-- supabase/migrations/20260328_deals_exit_strategy.sql

CREATE TYPE exit_strategy AS ENUM (
  'wholesale',
  'short_sale',
  'novation',
  'subject_to',
  'fix_flip',
  'retail'
);

ALTER TABLE deals
  ADD COLUMN exit_strategy exit_strategy;
