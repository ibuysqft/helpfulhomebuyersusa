/**
 * lib/state-data.ts
 * Dynamic city lookup by state slug. Used by sitemap, [slug]/page.tsx, and
 * sell-my-house-fast-[location]/page.tsx to return the correct city list
 * for whatever state is deployed.
 */
import { cities as vaCities } from '@/data/cities'
import { texasCities } from '@/data/states/texas'
import { floridaCities } from '@/data/states/florida'
import { georgiaCities } from '@/data/states/georgia'
import { ohioCities } from '@/data/states/ohio'
import { northCarolinaCities } from '@/data/states/north-carolina'
import { californiaCities } from '@/data/states/california'
import { illinoisCities } from '@/data/states/illinois'
import { arizonaCities } from '@/data/states/arizona'
import { newYorkCities } from '@/data/states/new-york'

export interface BasicCity {
  name: string
  slug: string
  county: string
}

const STATE_CITIES: Record<string, readonly BasicCity[]> = {
  virginia: vaCities as unknown as BasicCity[],
  texas: texasCities,
  florida: floridaCities,
  georgia: georgiaCities,
  ohio: ohioCities,
  'north-carolina': northCarolinaCities,
  california: californiaCities,
  illinois: illinoisCities,
  arizona: arizonaCities,
  'new-york': newYorkCities,
}

export function getCitiesForState(stateSlug: string): readonly BasicCity[] {
  return STATE_CITIES[stateSlug] ?? (vaCities as unknown as BasicCity[])
}
