import { createClient } from '@supabase/supabase-js'

// Fallback placeholders keep the module from throwing at build time.
// Real API calls will fail (and surface errors) if env vars aren't set at runtime.
const url = process.env.SUPABASE_URL ?? 'https://placeholder.supabase.co'
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder-service-key'

export const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
})
