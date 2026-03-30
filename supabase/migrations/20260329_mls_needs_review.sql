-- Add 'needs_review' to the mls_leads status check constraint
ALTER TABLE mls_leads
  DROP CONSTRAINT IF EXISTS mls_leads_status_check;

ALTER TABLE mls_leads
  ADD CONSTRAINT mls_leads_status_check CHECK (status IN (
    'new', 'scored', 'queued', 'contacted',
    'warm_cash', 'warm_creative', 'dead', 'retail', 'disqualified', 'needs_review'
  ));
