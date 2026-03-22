export const newYorkCities = [
  // Kings County (Brooklyn)
  { name: 'Brooklyn', slug: 'brooklyn', county: 'Kings County' },
  { name: 'Flatbush', slug: 'flatbush', county: 'Kings County' },
  { name: 'Brownsville', slug: 'brownsville', county: 'Kings County' },
  { name: 'East New York', slug: 'east-new-york', county: 'Kings County' },
  { name: 'Canarsie', slug: 'canarsie', county: 'Kings County' },
  // Queens County
  { name: 'Queens', slug: 'queens', county: 'Queens County' },
  { name: 'Jamaica', slug: 'jamaica', county: 'Queens County' },
  { name: 'Flushing', slug: 'flushing', county: 'Queens County' },
  { name: 'Astoria', slug: 'astoria', county: 'Queens County' },
  { name: 'South Ozone Park', slug: 'south-ozone-park', county: 'Queens County' },
  { name: 'Hollis', slug: 'hollis', county: 'Queens County' },
  // New York County (Manhattan)
  { name: 'Manhattan', slug: 'manhattan', county: 'New York County' },
  { name: 'Harlem', slug: 'harlem', county: 'New York County' },
  { name: 'Washington Heights', slug: 'washington-heights', county: 'New York County' },
  // Bronx County
  { name: 'Bronx', slug: 'bronx', county: 'Bronx County' },
  { name: 'Fordham', slug: 'fordham', county: 'Bronx County' },
  { name: 'Mott Haven', slug: 'mott-haven', county: 'Bronx County' },
  { name: 'Soundview', slug: 'soundview', county: 'Bronx County' },
  // Richmond County (Staten Island)
  { name: 'Staten Island', slug: 'staten-island', county: 'Richmond County' },
  // Nassau County
  { name: 'Hempstead', slug: 'hempstead', county: 'Nassau County' },
  { name: 'North Hempstead', slug: 'north-hempstead', county: 'Nassau County' },
  { name: 'Freeport', slug: 'freeport', county: 'Nassau County' },
  { name: 'Valley Stream', slug: 'valley-stream', county: 'Nassau County' },
  { name: 'Long Beach', slug: 'long-beach', county: 'Nassau County' },
  { name: 'Elmont', slug: 'elmont', county: 'Nassau County' },
  { name: 'Uniondale', slug: 'uniondale', county: 'Nassau County' },
  { name: 'Roosevelt', slug: 'roosevelt', county: 'Nassau County' },
  { name: 'Westbury', slug: 'westbury', county: 'Nassau County' },
  // Suffolk County
  { name: 'Brentwood', slug: 'brentwood', county: 'Suffolk County' },
  { name: 'Central Islip', slug: 'central-islip', county: 'Suffolk County' },
  { name: 'Wyandanch', slug: 'wyandanch', county: 'Suffolk County' },
  { name: 'Coram', slug: 'coram', county: 'Suffolk County' },
  { name: 'Bay Shore', slug: 'bay-shore', county: 'Suffolk County' },
  { name: 'Huntington', slug: 'huntington', county: 'Suffolk County' },
  { name: 'Islip', slug: 'islip', county: 'Suffolk County' },
  { name: 'Amityville', slug: 'amityville', county: 'Suffolk County' },
  // Westchester County
  { name: 'Yonkers', slug: 'yonkers', county: 'Westchester County' },
  { name: 'New Rochelle', slug: 'new-rochelle', county: 'Westchester County' },
  { name: 'Mount Vernon', slug: 'mount-vernon', county: 'Westchester County' },
  { name: 'White Plains', slug: 'white-plains', county: 'Westchester County' },
  { name: 'Spring Valley', slug: 'spring-valley', county: 'Westchester County' },
  { name: 'Peekskill', slug: 'peekskill', county: 'Westchester County' },
  // Erie County
  { name: 'Buffalo', slug: 'buffalo', county: 'Erie County' },
  { name: 'Cheektowaga', slug: 'cheektowaga', county: 'Erie County' },
  { name: 'Tonawanda', slug: 'tonawanda', county: 'Erie County' },
  { name: 'Lackawanna', slug: 'lackawanna', county: 'Erie County' },
  { name: 'Niagara Falls', slug: 'niagara-falls', county: 'Erie County' },
  // Monroe County
  { name: 'Rochester', slug: 'rochester', county: 'Monroe County' },
  { name: 'Greece', slug: 'greece', county: 'Monroe County' },
  { name: 'Irondequoit', slug: 'irondequoit', county: 'Monroe County' },
  { name: 'Brighton', slug: 'brighton', county: 'Monroe County' },
  // Additional high-volume cities
  { name: 'Syracuse', slug: 'syracuse', county: 'Onondaga County' },
  { name: 'Albany', slug: 'albany', county: 'Albany County' },
  { name: 'Schenectady', slug: 'schenectady', county: 'Schenectady County' },
  { name: 'Utica', slug: 'utica', county: 'Oneida County' },
  { name: 'Troy', slug: 'troy', county: 'Rensselaer County' },
  { name: 'Binghamton', slug: 'binghamton', county: 'Broome County' },
  { name: 'Rome', slug: 'rome', county: 'Oneida County' },
  { name: 'Ithaca', slug: 'ithaca', county: 'Tompkins County' },
  { name: 'Poughkeepsie', slug: 'poughkeepsie', county: 'Dutchess County' },
] as const

export const newYorkCounties = [
  { name: 'Kings County', slug: 'kings-county' },
  { name: 'Queens County', slug: 'queens-county' },
  { name: 'New York County', slug: 'new-york-county' },
  { name: 'Bronx County', slug: 'bronx-county' },
  { name: 'Richmond County', slug: 'richmond-county' },
  { name: 'Nassau County', slug: 'nassau-county' },
  { name: 'Suffolk County', slug: 'suffolk-county' },
  { name: 'Westchester County', slug: 'westchester-county' },
  { name: 'Erie County', slug: 'erie-county' },
  { name: 'Monroe County', slug: 'monroe-county' },
] as const

export type NewYorkCity = typeof newYorkCities[number]
export type NewYorkCounty = typeof newYorkCounties[number]
