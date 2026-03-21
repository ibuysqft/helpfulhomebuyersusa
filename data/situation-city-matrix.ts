import { situations } from './situations'
import { cities } from './cities'

export const situationCityMatrix = situations.flatMap(situation =>
  cities.map(city => ({
    situationSlug: situation.slug,
    citySlug: city.slug,
    situationLabel: situation.label,
    cityName: city.name,
    county: city.county,
  }))
)
