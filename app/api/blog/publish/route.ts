import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const id = formData.get('id') as string
  const action = formData.get('action') as 'publish' | 'reject'

  if (!id || !['publish', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const update = action === 'publish'
    ? { status: 'published', published_at: new Date().toISOString() }
    : { status: 'rejected' }

  const { error } = await supabase.from('blog_posts').update(update).eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (action === 'publish') {
    revalidateTag('blog', 'max')
  }

  return NextResponse.redirect(new URL('/admin', req.url))
}
