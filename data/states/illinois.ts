export const illinoisCities = [
  // Cook County
  { name: 'Chicago', slug: 'chicago', county: 'Cook County' },
  { name: 'Cicero', slug: 'cicero', county: 'Cook County' },
  { name: 'Arlington Heights', slug: 'arlington-heights', county: 'Cook County' },
  { name: 'Evanston', slug: 'evanston', county: 'Cook County' },
  { name: 'Schaumburg', slug: 'schaumburg', county: 'Cook County' },
  { name: 'Palatine', slug: 'palatine', county: 'Cook County' },
  { name: 'Skokie', slug: 'skokie', county: 'Cook County' },
  { name: 'Des Plaines', slug: 'des-plaines', county: 'Cook County' },
  { name: 'Oak Lawn', slug: 'oak-lawn', county: 'Cook County' },
  { name: 'Berwyn', slug: 'berwyn', county: 'Cook County' },
  { name: 'Mount Prospect', slug: 'mount-prospect', county: 'Cook County' },
  { name: 'Orland Park', slug: 'orland-park', county: 'Cook County' },
  { name: 'Tinley Park', slug: 'tinley-park', county: 'Cook County' },
  { name: 'Harvey', slug: 'harvey', county: 'Cook County' },
  { name: 'Calumet City', slug: 'calumet-city', county: 'Cook County' },
  { name: 'Lansing', slug: 'lansing', county: 'Cook County' },
  { name: 'Dolton', slug: 'dolton', county: 'Cook County' },
  { name: 'Markham', slug: 'markham', county: 'Cook County' },
  { name: 'Maywood', slug: 'maywood', county: 'Cook County' },
  { name: 'Blue Island', slug: 'blue-island', county: 'Cook County' },
  // DuPage County
  { name: 'Naperville', slug: 'naperville', county: 'DuPage County' },
  { name: 'Bolingbrook', slug: 'bolingbrook', county: 'DuPage County' },
  { name: 'Wheaton', slug: 'wheaton', county: 'DuPage County' },
  { name: 'Carol Stream', slug: 'carol-stream', county: 'DuPage County' },
  { name: 'Downers Grove', slug: 'downers-grove', county: 'DuPage County' },
  { name: 'Elmhurst', slug: 'elmhurst', county: 'DuPage County' },
  // Lake County
  { name: 'Waukegan', slug: 'waukegan', county: 'Lake County' },
  { name: 'North Chicago', slug: 'north-chicago', county: 'Lake County' },
  { name: 'Round Lake Beach', slug: 'round-lake-beach', county: 'Lake County' },
  { name: 'Zion', slug: 'zion', county: 'Lake County' },
  // Will County
  { name: 'Joliet', slug: 'joliet', county: 'Will County' },
  { name: 'Romeoville', slug: 'romeoville', county: 'Will County' },
  { name: 'Plainfield', slug: 'plainfield', county: 'Will County' },
  { name: 'New Lenox', slug: 'new-lenox', county: 'Will County' },
  // Kane County
  { name: 'Aurora', slug: 'aurora', county: 'Kane County' },
  { name: 'Elgin', slug: 'elgin', county: 'Kane County' },
  { name: 'St. Charles', slug: 'st-charles', county: 'Kane County' },
  // McHenry County
  { name: 'McHenry', slug: 'mchenry', county: 'McHenry County' },
  { name: 'Crystal Lake', slug: 'crystal-lake', county: 'McHenry County' },
  // Winnebago County
  { name: 'Rockford', slug: 'rockford', county: 'Winnebago County' },
  { name: 'Loves Park', slug: 'loves-park', county: 'Winnebago County' },
  // Madison County
  { name: 'Granite City', slug: 'granite-city', county: 'Madison County' },
  { name: 'Alton', slug: 'alton', county: 'Madison County' },
  { name: 'Edwardsville', slug: 'edwardsville', county: 'Madison County' },
  // St. Clair County
  { name: 'Belleville', slug: 'belleville', county: 'St. Clair County' },
  { name: 'East St. Louis', slug: 'east-st-louis', county: 'St. Clair County' },
  { name: 'O\'Fallon', slug: 'ofallon', county: 'St. Clair County' },
  // Champaign County
  { name: 'Champaign', slug: 'champaign', county: 'Champaign County' },
  { name: 'Urbana', slug: 'urbana', county: 'Champaign County' },
  // Additional high-volume cities
  { name: 'Springfield', slug: 'springfield', county: 'Sangamon County' },
  { name: 'Peoria', slug: 'peoria', county: 'Peoria County' },
  { name: 'Bloomington', slug: 'bloomington', county: 'McLean County' },
  { name: 'Decatur', slug: 'decatur', county: 'Macon County' },
] as const

export const illinoisCounties = [
  { name: 'Cook County', slug: 'cook-county' },
  { name: 'DuPage County', slug: 'dupage-county' },
  { name: 'Lake County', slug: 'lake-county' },
  { name: 'Will County', slug: 'will-county' },
  { name: 'Kane County', slug: 'kane-county' },
  { name: 'McHenry County', slug: 'mchenry-county' },
  { name: 'Winnebago County', slug: 'winnebago-county' },
  { name: 'Madison County', slug: 'madison-county' },
  { name: 'St. Clair County', slug: 'st-clair-county' },
  { name: 'Champaign County', slug: 'champaign-county' },
] as const

export type IllinoisCity = typeof illinoisCities[number]
export type IllinoisCounty = typeof illinoisCounties[number]
