ALTER TABLE scrape_targets
  ADD COLUMN min_price      integer,
  ADD COLUMN max_price      integer,
  ADD COLUMN min_beds       numeric(3,1),
  ADD COLUMN min_baths      numeric(3,1),
  ADD COLUMN max_dom        integer,
  ADD COLUMN property_types text[];
