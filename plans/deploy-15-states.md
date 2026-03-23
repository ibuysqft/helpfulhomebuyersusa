# Deploy All 15 State Sites to Vercel

## Architecture

One GitHub repo → 15 Vercel projects → 15 domains.
Each project uses the same Next.js codebase, differentiated entirely by env vars.

## One-Command Setup

```bash
# From helpfulhomebuyersusa/ project root
chmod +x scripts/create-state-projects.sh
./scripts/create-state-projects.sh
```

This creates all 15 Vercel projects (`hhb-virginia`, `hhb-texas`, etc.),
sets all env vars, and adds custom domains.

## Manual Setup (alternative)

### 1. Create Vercel project for each state

```bash
# Example for Virginia
vercel project add hhb-virginia --framework nextjs

# Set state-specific env vars
vercel env add NEXT_PUBLIC_STATE production --project hhb-virginia   # → "Virginia"
vercel env add NEXT_PUBLIC_STATE_ABBR production --project hhb-virginia  # → "VA"
vercel env add NEXT_PUBLIC_STATE_SLUG production --project hhb-virginia  # → "virginia"
vercel env add NEXT_PUBLIC_IS_NATIONAL production --project hhb-virginia  # → "false"
vercel env add NEXT_PUBLIC_SITE_URL production --project hhb-virginia  # → "https://helpfulhomebuyersvirginia.com"

# Set shared secrets (same for all states — copy from .env.local)
vercel env add SUPABASE_URL production --project hhb-virginia
vercel env add SUPABASE_SERVICE_ROLE_KEY production --project hhb-virginia
# ... etc (see states/virginia.env for the full list)
```

### 2. Link GitHub repo

In Vercel dashboard for each project:
- Settings → Git → Connect GitHub → `ibuysqft/helpfulhomebuyersusa`
- Root directory: `.` (project root)
- Framework: Next.js

### 3. DNS for each domain

**Namecheap DNS setup (for each of the 15 domains):**

For apex domains (e.g. `helpfulhomebuyerstexas.com`):
```
Type: A
Host: @
Value: 76.76.21.21
TTL: Automatic
```

For www subdomain:
```
Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

### 4. Trigger first deploy

```bash
# Once DNS is configured, trigger a production deploy
vercel deploy --project hhb-virginia --prod
```

## State Projects Reference

| State | Project | Domain | Status |
|-------|---------|--------|--------|
| Virginia | hhb-virginia | helpfulhomebuyersvirginia.com | LIVE (national hub) |
| Texas | hhb-texas | helpfulhomebuyerstexas.com | Pending |
| Florida | hhb-florida | helpfulhomebuyersflorida.com | Pending |
| Georgia | hhb-georgia | helpfulhomebuyersgeorgia.com | Pending |
| Ohio | hhb-ohio | helpfulhomebuyersohio.com | Pending |
| North Carolina | hhb-north-carolina | helpfulhomebuyersnorthcarolina.com | Pending |
| South Carolina | hhb-south-carolina | helpfulhomebuyerssouthcarolina.com | Pending |
| Illinois | hhb-illinois | helpfulhomebuyersillinois.com | Pending |
| Michigan | hhb-michigan | helpfulhomebuyersmichigan.com | Pending |
| New York | hhb-new-york | helpfulhomebuyersnewyork.com | Pending |
| New Jersey | hhb-new-jersey | helpfulhomebuyersnewjersey.com | Pending |
| California | hhb-california | helpfulhomebuyerscalifornia.com | Pending |
| Arizona | hhb-arizona | helpfulhomebuyersarizona.com | Pending |
| Colorado | hhb-colorado | helpfulhomebuyerscolorado.com | Pending |
| Connecticut | hhb-connecticut | helpfulhomebuyersconnecticut.com | Pending |

## Updating Phone Numbers Per State

When you get state-specific phone numbers (e.g. a Texas number for Texas):

```bash
vercel env rm NEXT_PUBLIC_PHONE production --project hhb-texas
echo "+19725551234" | vercel env add NEXT_PUBLIC_PHONE production --project hhb-texas

vercel env rm NEXT_PUBLIC_PHONE_DISPLAY production --project hhb-texas
echo "(972) 555-1234" | vercel env add NEXT_PUBLIC_PHONE_DISPLAY production --project hhb-texas

# Redeploy to pick up new values
vercel deploy --project hhb-texas --prod
```

## Adding Tracking Pixels Per State

Once FB/Google ad accounts are set up per state:

```bash
# Replace PENDING values
vercel env rm NEXT_PUBLIC_FB_PIXEL_ID production --project hhb-texas
echo "123456789012345" | vercel env add NEXT_PUBLIC_FB_PIXEL_ID production --project hhb-texas
vercel deploy --project hhb-texas --prod
```

## Vercel Free Tier Limits

- Hobby plan: 1 project per account
- Pro plan ($20/mo): unlimited projects
- If you have 1 Vercel account, use Pro plan to host all 15 + national hub
- Alternative: Create separate Vercel accounts (one per state) on Hobby tier
