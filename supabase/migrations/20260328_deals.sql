-- supabase/migrations/20260328_deals.sql

CREATE TYPE deal_stage AS ENUM (
  'new', 'contacted', 'offer_sent', 'under_contract', 'closed', 'dead'
);

CREATE TYPE deal_class AS ENUM ('residential', 'commercial');

CREATE TYPE ai_flag_reason AS ENUM (
  'technical_fail', 'hostile_recipient', 'off_script'
);

CREATE TABLE deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ghl_contact_id text UNIQUE,
  stage deal_stage NOT NULL DEFAULT 'new',
  deal_class deal_class NOT NULL DEFAULT 'residential',
  ai_flag boolean NOT NULL DEFAULT false,
  ai_flag_reason ai_flag_reason,
  address text NOT NULL,
  seller_name text,
  seller_phone text,
  assigned_to text,
  snoozed_until timestamptz,
  last_stage_change timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE deal_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  title text NOT NULL,
  due_date timestamptz,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_ghl_contact_id ON deals(ghl_contact_id);
CREATE INDEX idx_deals_last_stage_change ON deals(last_stage_change);
CREATE INDEX idx_deal_tasks_deal_id ON deal_tasks(deal_id);
CREATE INDEX idx_deal_tasks_due_date ON deal_tasks(due_date) WHERE completed = false;
