import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-900/40 text-amber-400',
  published: 'bg-green-900/40 text-green-400',
  failed: 'bg-red-900/40 text-red-400',
  skipped: 'bg-slate-700 text-slate-400',
}

const PLATFORM_ICONS: Record<string, string> = {
  linkedin: 'in',
  reddit: 'r/',
  twitter: '𝕏',
}

export default async function SocialQueuePage() {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin_token')
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? ''
  if (!adminToken || adminToken.value !== Buffer.from(ADMIN_PASSWORD).toString('base64')) {
    redirect('/admin/login')
  }

  const [{ data: queue }, { data: stats }] = await Promise.all([
    supabase
      .from('social_queue')
      .select('id, platform, post_content, status, error, queued_at, published_at, reddit_subreddit, blog_posts(slug, title)')
      .order('queued_at', { ascending: false })
      .limit(60),
    supabase
      .from('social_queue')
      .select('status')
      .order('queued_at', { ascending: false })
      .limit(500),
  ])

  // Compute counts using Map for O(1) accumulation
  const counts = new Map<string, number>()
  for (const row of stats ?? []) {
    counts.set(row.status, (counts.get(row.status) ?? 0) + 1)
  }

  const pendingCount = counts.get('pending') ?? 0
  const publishedCount = counts.get('published') ?? 0
  const failedCount = counts.get('failed') ?? 0

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">Social Queue</h2>
        <div className="flex gap-3 text-xs">
          <span className="bg-amber-900/40 text-amber-400 px-2 py-1 rounded">
            {pendingCount} pending
          </span>
          <span className="bg-green-900/40 text-green-400 px-2 py-1 rounded">
            {publishedCount} published
          </span>
          {failedCount > 0 && (
            <span className="bg-red-900/40 text-red-400 px-2 py-1 rounded">
              {failedCount} failed
            </span>
          )}
        </div>
      </div>

      {!queue?.length ? (
        <div className="bg-slate-800 rounded-xl p-12 text-center">
          <p className="text-slate-400 mb-2">No social posts queued yet.</p>
          <p className="text-slate-500 text-sm">
            Posts are queued automatically when you publish a blog post from the Drafts tab.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {queue.map(item => {
            const post = item.blog_posts as unknown as { slug: string; title: string } | null
            const statusStyle = STATUS_STYLES[item.status] ?? STATUS_STYLES.skipped
            const icon = PLATFORM_ICONS[item.platform] ?? item.platform
            return (
              <div key={item.id} className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-700 text-slate-300 font-mono text-xs px-2 py-1 rounded font-bold">
                      {icon}
                    </span>
                    <span className="text-slate-300 text-sm font-medium capitalize">
                      {item.platform}
                      {item.platform === 'reddit' && item.reddit_subreddit && (
                        <span className="text-slate-500 ml-1">r/{item.reddit_subreddit}</span>
                      )}
                    </span>
                    {post && (
                      <span className="text-slate-500 text-xs truncate max-w-xs">
                        · {post.title}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2 py-1 rounded ${statusStyle}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-2">
                  {item.post_content}
                </p>

                {item.error && (
                  <p className="text-red-400 text-xs bg-red-950/30 rounded p-2 mb-2">
                    Error: {item.error}
                  </p>
                )}

                <div className="flex gap-4 text-xs text-slate-500">
                  <span>
                    Queued{' '}
                    {new Date(item.queued_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {item.published_at && (
                    <span className="text-green-600">
                      Published{' '}
                      {new Date(item.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
