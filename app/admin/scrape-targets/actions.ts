'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function addTargetAction(formData: FormData): Promise<void> {
  const type = formData.get('type') as string
  const value = (formData.get('value') as string).trim()
  const state = (formData.get('state') as string).toUpperCase().trim()

  if (!type || !value || !state) return

  const minPrice = formData.get('min_price')
  const maxPrice = formData.get('max_price')
  const minBeds = formData.get('min_beds')
  const minBaths = formData.get('min_baths')
  const maxDom = formData.get('max_dom')
  const propertyTypesRaw = formData.getAll('property_types') as string[]

  await supabase
    .from('scrape_targets')
    .upsert({
      type,
      value,
      state,
      active: true,
      min_price: minPrice ? parseInt(minPrice as string, 10) : null,
      max_price: maxPrice ? parseInt(maxPrice as string, 10) : null,
      min_beds: minBeds ? parseFloat(minBeds as string) : null,
      min_baths: minBaths ? parseFloat(minBaths as string) : null,
      max_dom: maxDom ? parseInt(maxDom as string, 10) : null,
      property_types: propertyTypesRaw.length > 0 ? propertyTypesRaw : null,
    })

  revalidatePath('/admin/scrape-targets')
}

export async function updateTargetFiltersAction(
  id: string,
  formData: FormData,
): Promise<void> {
  const minPrice = formData.get('min_price')
  const maxPrice = formData.get('max_price')
  const minBeds = formData.get('min_beds')
  const minBaths = formData.get('min_baths')
  const maxDom = formData.get('max_dom')
  const propertyTypesRaw = formData.getAll('property_types') as string[]

  await supabase
    .from('scrape_targets')
    .update({
      min_price: minPrice ? parseInt(minPrice as string, 10) : null,
      max_price: maxPrice ? parseInt(maxPrice as string, 10) : null,
      min_beds: minBeds ? parseFloat(minBeds as string) : null,
      min_baths: minBaths ? parseFloat(minBaths as string) : null,
      max_dom: maxDom ? parseInt(maxDom as string, 10) : null,
      property_types: propertyTypesRaw.length > 0 ? propertyTypesRaw : null,
    })
    .eq('id', id)

  revalidatePath('/admin/scrape-targets')
}

export async function toggleTargetAction(
  id: string,
  active: boolean,
): Promise<void> {
  await supabase
    .from('scrape_targets')
    .update({ active })
    .eq('id', id)

  revalidatePath('/admin/scrape-targets')
}

export async function deleteTargetAction(id: string): Promise<void> {
  await supabase
    .from('scrape_targets')
    .delete()
    .eq('id', id)

  revalidatePath('/admin/scrape-targets')
}
