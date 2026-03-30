-- Consolidate individual filter columns into JSONB for extensibility
ALTER TABLE scrape_targets
  ADD COLUMN filters jsonb NOT NULL DEFAULT '{}';

-- Migrate any data from the old columns (added same day, likely empty)
UPDATE scrape_targets
SET filters = jsonb_strip_nulls(jsonb_build_object(
  'min_price', min_price,
  'max_price', max_price,
  'min_beds', min_beds,
  'min_baths', min_baths,
  'max_dom', max_dom,
  'property_types', property_types
));

ALTER TABLE scrape_targets
  DROP COLUMN IF EXISTS min_price,
  DROP COLUMN IF EXISTS max_price,
  DROP COLUMN IF EXISTS min_beds,
  DROP COLUMN IF EXISTS min_baths,
  DROP COLUMN IF EXISTS max_dom,
  DROP COLUMN IF EXISTS property_types;
