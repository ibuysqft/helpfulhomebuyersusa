CREATE TABLE case_studies (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'VA',
  situation TEXT NOT NULL,
  headline TEXT NOT NULL,
  days_to_close INTEGER,
  seller_net INTEGER,
  offer_vs_list_pct INTEGER,
  property_type TEXT,
  story TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  outcome TEXT NOT NULL,
  testimonial TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_case_studies_published ON case_studies(published);
CREATE INDEX idx_case_studies_situation ON case_studies(situation);
CREATE INDEX idx_case_studies_city ON case_studies(city);
