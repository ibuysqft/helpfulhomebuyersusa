import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { supabase } from '@/lib/supabase'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Blog | Virginia Home Selling Tips & Resources',
  description:
    'Tips for selling your home fast in Virginia. Learn about cash sales, the as-is process, foreclosure help, and more.',
  alternates: { canonical: `${siteConfig.url}/blog` },
}

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, meta_description, published_at, city_tags')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(50)

  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-900 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Virginia Home Selling <span className="text-amber-400">Resources</span>
            </h1>
            <p className="text-xl text-slate-300">
              Tips, guides, and market insights for Virginia homeowners.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-800">
          <div className="max-w-4xl mx-auto">
            {!posts || posts.length === 0 ? (
              <p className="text-slate-400 text-center py-12">
                Articles coming soon. Check back shortly.
              </p>
            ) : (
              <div className="grid gap-6">
                {posts.map(post => (
                  <article
                    key={post.id}
                    className="bg-slate-700 rounded-xl p-6 hover:bg-slate-600 transition-colors"
                  >
                    <Link href={`/blog/${post.slug}`} className="group">
                      <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                        {post.title}
                      </h2>
                      {post.meta_description && (
                        <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                          {post.meta_description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        {post.published_at && (
                          <time dateTime={post.published_at}>
                            {new Date(post.published_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                        )}
                        {post.city_tags?.length > 0 && (
                          <span className="text-amber-400">{post.city_tags[0]}, VA</span>
                        )}
                        <span className="text-amber-400 font-semibold group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
