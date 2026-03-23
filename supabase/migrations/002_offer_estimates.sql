-- Instant Offer Estimator — stores every address lookup with its estimated range
CREATE TABLE offer_estimates (
  id TEXT PRIMARY KEY,
  address TEXT NOT NULL,
  arv_estimate INTEGER,
  offer_low INTEGER,
  offer_high INTEGER,
  comps_used INTEGER,
  market_region TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: only service role can read/write (same pattern as leads table)
ALTER TABLE offer_estimates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service role full access" ON offer_estimates USING (true) WITH CHECK (true);
