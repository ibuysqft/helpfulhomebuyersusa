import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface ActionState {
  id: string
  action: 'publish' | 'reject'
}

async function handlePublishAction(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  const action = formData.get('action') as 'publish' | 'reject'
  if (!id || !action) return

  if (action === 'publish') {
    await supabase
      .from('blog_posts')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', id)
  } else {
    await supabase.from('blog_posts').update({ status: 'rejected' }).eq('id', id)
  }

  redirect('/admin')
}

export default async function AdminPage() {
  const { data: drafts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, meta_description, word_count, city_tags, draft_created_at')
    .eq('status', 'draft')
    .order('draft_created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">Draft Posts</h2>
        <span className="text-slate-400 text-sm">{drafts?.length ?? 0} awaiting review</span>
      </div>

      {!drafts || drafts.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-12 text-center text-slate-400">
          No drafts pending review.
        </div>
      ) : (
        <div className="space-y-4">
          {drafts.map(draft => (
            <article key={draft.id} className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg mb-1 truncate">
                    {draft.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-2">/blog/{draft.slug}</p>
                  {draft.meta_description && (
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed line-clamp-2">
                      {draft.meta_description}
                    </p>
                  )}
                  <div className="flex gap-4 text-xs text-slate-500">
                    {draft.word_count && <span>{draft.word_count} words</span>}
                    {draft.city_tags?.length > 0 && (
                      <span>Tags: {draft.city_tags.join(', ')}</span>
                    )}
                    {draft.draft_created_at && (
                      <span>
                        Generated{' '}
                        {new Date(draft.draft_created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <form action={handlePublishAction}>
                    <input type="hidden" name="id" value={draft.id} />
                    <input type="hidden" name="action" value="publish" />
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Publish
                    </button>
                  </form>
                  <form action={handlePublishAction}>
                    <input type="hidden" name="id" value={draft.id} />
                    <input type="hidden" name="action" value="reject" />
                    <button
                      type="submit"
                      className="bg-slate-700 hover:bg-red-900 text-slate-300 hover:text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
