import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SITE_URL = 'https://helpfulhomebuyersusa.com'
const LINKEDIN_COMPANY_ID = '113019591'

export interface BlogPostSummary {
  id: string
  slug: string
  title: string
  content: string
  targetKeyword: string
}

export interface SocialPost {
  blogPostId: string
  platform: 'linkedin' | 'reddit' | 'twitter'
  postContent: string
  redditSubreddit?: string
}

// ---------------------------------------------------------------------------
// Copy generation
// ---------------------------------------------------------------------------

const PLATFORM_INSTRUCTIONS: Record<string, string> = {
  linkedin: `Write a LinkedIn post for a real estate professional audience.
- 150-200 words, professional tone, no hashtag spam (max 3 relevant hashtags)
- Lead with a pain point or insight, not a sales pitch
- End with a soft CTA linking to the article
- Do NOT use emojis excessively (max 2)`,
  reddit: `Write a Reddit post for r/nova (Northern Virginia community).
- Conversational, helpful, NOT salesy — Reddit hates ads
- Under 120 words
- Frame as sharing useful info, not promoting
- No hashtags, no emojis
- Include the URL naturally in the body`,
  twitter: `Write a Twitter/X thread opener (single tweet, 240 chars max).
- Hook in first line — surprising stat or question
- No hashtags in first tweet
- End with a link`,
}

export async function generateSocialCopy(
  post: BlogPostSummary,
  platform: 'linkedin' | 'reddit' | 'twitter'
): Promise<string> {
  const postUrl = `${SITE_URL}/blog/${post.slug}`
  const excerpt = post.content.slice(0, 800)

  const prompt = `You are writing social media copy for Helpful Home Buyers USA, a cash home buying company in Virginia.

Article title: "${post.title}"
Target keyword: "${post.targetKeyword}"
Article URL: ${postUrl}
Article excerpt: ${excerpt}

${PLATFORM_INSTRUCTIONS[platform]}

Return ONLY the post text, no quotes, no explanation.`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text.trim() : ''
  return text
}

export async function buildSocialQueue(post: BlogPostSummary): Promise<SocialPost[]> {
  const [linkedinCopy, redditCopy, twitterCopy] = await Promise.all([
    generateSocialCopy(post, 'linkedin'),
    generateSocialCopy(post, 'reddit'),
    generateSocialCopy(post, 'twitter'),
  ])

  return [
    { blogPostId: post.id, platform: 'linkedin', postContent: linkedinCopy },
    { blogPostId: post.id, platform: 'reddit', postContent: redditCopy, redditSubreddit: 'nova' },
    { blogPostId: post.id, platform: 'twitter', postContent: twitterCopy },
  ]
}

// ---------------------------------------------------------------------------
// Platform publishers
// ---------------------------------------------------------------------------

export async function publishToLinkedIn(postContent: string, postUrl: string): Promise<void> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN
  if (!token) throw new Error('LINKEDIN_ACCESS_TOKEN not set')

  const body = {
    author: `urn:li:organization:${LINKEDIN_COMPANY_ID}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: postContent },
        shareMediaCategory: 'ARTICLE',
        media: [{ status: 'READY', originalUrl: postUrl }],
      },
    },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
  }

  const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`LinkedIn publish failed ${res.status}: ${err}`)
  }
}

export async function publishToReddit(postContent: string, postUrl: string, subreddit: string): Promise<void> {
  const clientId = process.env.REDDIT_CLIENT_ID
  const clientSecret = process.env.REDDIT_CLIENT_SECRET
  const username = process.env.REDDIT_USERNAME
  const password = process.env.REDDIT_PASSWORD
  if (!clientId || !clientSecret || !username || !password) throw new Error('Reddit credentials not set')

  // Get OAuth token
  const authRes = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'HelpfulHomeBuyersUSA/1.0',
    },
    body: new URLSearchParams({ grant_type: 'password', username, password }),
  })

  if (!authRes.ok) throw new Error(`Reddit auth failed: ${authRes.status}`)
  const { access_token } = await authRes.json() as { access_token: string }

  // Submit link post
  const submitRes = await fetch('https://oauth.reddit.com/api/submit', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'HelpfulHomeBuyersUSA/1.0',
    },
    body: new URLSearchParams({
      sr: subreddit,
      kind: 'link',
      title: postContent.split('\n')[0].slice(0, 300),
      url: postUrl,
      resubmit: 'false',
    }),
  })

  if (!submitRes.ok) {
    const err = await submitRes.text()
    throw new Error(`Reddit submit failed ${submitRes.status}: ${err}`)
  }
}

export async function publishToTwitter(postContent: string): Promise<void> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN
  const apiKey = process.env.TWITTER_API_KEY
  const apiSecret = process.env.TWITTER_API_SECRET
  const accessToken = process.env.TWITTER_ACCESS_TOKEN
  const accessSecret = process.env.TWITTER_ACCESS_SECRET
  if (!apiKey || !apiSecret || !accessToken || !accessSecret) throw new Error('Twitter credentials not set')

  // OAuth 1.0a signature
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const nonce = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  const tweetText = postContent.slice(0, 280)

  const oauthParams = {
    oauth_consumer_key: apiKey,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_token: accessToken,
    oauth_version: '1.0',
  }

  // Build signature base string
  const bodyParams = { text: tweetText }
  const allParams = { ...oauthParams, ...bodyParams }
  const sortedParams = Object.entries(allParams)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

  const signatureBase = [
    'POST',
    encodeURIComponent('https://api.twitter.com/2/tweets'),
    encodeURIComponent(sortedParams),
  ].join('&')

  const signingKey = `${encodeURIComponent(apiSecret)}&${encodeURIComponent(accessSecret)}`

  // HMAC-SHA1 via Web Crypto
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(signingKey),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  )
  const signatureBytes = await crypto.subtle.sign('HMAC', keyMaterial, new TextEncoder().encode(signatureBase))
  const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBytes)))

  const authHeader = 'OAuth ' + Object.entries({ ...oauthParams, oauth_signature: signature })
    .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
    .join(', ')

  const res = await fetch('https://api.twitter.com/2/tweets', {
    method: 'POST',
    headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: tweetText }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Twitter publish failed ${res.status}: ${err}`)
  }

  void bearerToken // available but OAuth 1.0a is used for posting
}
