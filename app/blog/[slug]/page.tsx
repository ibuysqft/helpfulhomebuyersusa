import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { supabase } from '@/lib/supabase'
import { siteConfig } from '@/config/site'

interface Props { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')
  const slugs = (data ?? []).map(p => ({ slug: p.slug }))
  return slugs.length > 0 ? slugs : [{ slug: '_placeholder' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.meta_description,
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.meta_description,
      url: `${siteConfig.url}/blog/${slug}`,
      siteName: siteConfig.name,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at ?? post.published_at,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description,
    datePublished: post.published_at,
    dateModified: post.updated_at ?? post.published_at,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main>
        <article>
          <section className="bg-slate-900 py-16 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-sm text-slate-400 mb-4">
                <Link href="/blog" className="hover:text-white">
                  ← Blog
                </Link>
                {post.published_at && (
                  <>
                    {' · '}
                    <time dateTime={post.published_at}>
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              {post.meta_description && (
                <p className="text-xl text-slate-300">{post.meta_description}</p>
              )}
            </div>
          </section>

          <section className="py-12 px-4 bg-slate-800">
            <div
              className="max-w-3xl mx-auto prose prose-invert prose-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </section>

          <section className="py-12 px-4 bg-amber-500 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Sell Your Virginia Home?
            </h2>
            <p className="text-slate-800 mb-6">
              Get a no-obligation cash offer within 24 hours.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/property-information"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-colors"
              >
                Get My Cash Offer
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-lg transition-colors"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
