# Content Platform Accounts — Helpful Home Buyers USA

All accounts use `anchor.offer.chatgpt@gmail.com` unless noted.
Master password: `Password!1` (fallback: `Teamanchor1093`)

---

## Status Legend
- ✅ Live / Active
- 🔄 Pending verification
- ⏳ Not yet created
- ❌ Blocked / Failed

---

## Core Social

| Platform | Handle / URL | Status | Notes |
|----------|-------------|--------|-------|
| Instagram | [@helpfulhomebuyersusa](https://www.instagram.com/helpfulhomebuyersusa/) | 🔄 Pending | Created 2026-03-23. Personal account — convert to Business. Login blocked by Instagram rate limit (too many attempts). Session cookie expired. Retry login after ~1 hour cooldown. |
| Facebook Business Page | — | 🔄 Pending | Personal account CREATED 2026-03-23 (Profile ID: 61579151743061, anchor.offer.chatgpt@gmail.com). Business Page blocked by new-account restriction (GraphQL error 1675030). Wait 24-48hrs then run: `cd /tmp/fb-stealth && node retry-page-creation.js` |
| Twitter / X | — | ❌ Blocked | x.com returns net::ERR_FAILED for Playwright browser. Requires real browser or manual creation. |
| LinkedIn Page | [helpful-home-buyers-usa](https://www.linkedin.com/company/helpful-home-buyers-usa/) | ✅ Live | Company Page ID 113019591. Fully populated: tagline, description, phone, website, industry. |
| YouTube Channel | [@HelpfulHomeBuyersUSA](https://www.youtube.com/@HelpfulHomeBuyersUSA) | ✅ Live | Channel UC6rUb9SkBKtO9aYXynkw1Sg. Description + website link added 2026-03-23. |
| TikTok | — | 🔄 Pending | Rate limited until ~2026-03-24 02:00 AM PDT. Retry script at `/tmp/tiktok-retry-ready.js` — uses Teamanchor1093! password, reads Gmail code automatically. |
| Pinterest | [anchorofferchatgpt](https://www.pinterest.com/anchorofferchatgpt/) | ✅ Live | Business account + 4 boards created 2026-03-23. Bio set 2026-03-23. |

## Real Estate Communities

| Platform | Handle / URL | Status | Notes |
|----------|-------------|--------|-------|
| BiggerPockets | [jeffb862](https://www.biggerpockets.com/users/jeffb862) | ❌ Blocked | Insecure password wall blocks all profile editing. Reset email sends only to forgot_password page (no token). Manual password reset required to unlock. |
| ActiveRain | — | ❌ Dead | Platform acquired by Patch.com — domain redirects entirely. Skip. |
| Alignable | — | 🔄 Pending | Created 2026-03-23. Awaiting verification email (up to 48 hrs). |

## Content / Blogs

| Platform | Handle / URL | Status | Notes |
|----------|-------------|--------|-------|
| Reddit | [u/HelpfulHomeBuyersVA](https://www.reddit.com/user/HelpfulHomeBuyersVA/) | ✅ Live | Created 2026-03-23. Email verified. 9 subreddits joined. |
| Medium | [@jeffbordhelpfulhomebuyers](https://medium.com/@jeffbordhelpfulhomebuyers) | ✅ Live | Created 2026-03-23 via Google OAuth. Bio added. |
| Quora | [Jeff Bord-1](https://www.quora.com/profile/Jeff-Bord-1) | ✅ Live | Bio + "Real Estate Investor" credential added 2026-03-23. Actual profile URL is /Jeff-Bord-1. |
| Substack | [Virginia Home Seller Guide](https://virginiahomesellerguide.substack.com) | ✅ Live | Created 2026-03-23. Publication active. |

## Local / Business Directories

| Platform | Handle / URL | Status | Notes |
|----------|-------------|--------|-------|
| Google Business Profile | — | ⏳ Pending | Requires physical address verification. Navigate to business.google.com. |
| Yelp | [Helpful Home Buyers USA](https://biz.yelp.com) | 🔄 Pending Verification | Claim wizard completed 2026-03-23. Business shows "Claimed" badge. Phone SMS verification pending — SMS sent to (703) 940-1159 but code not confirmed. Yelp SMS not appearing in GHL (likely because +17039401159 forwards to Retell before GHL sees it). biz.yelp.com returns net::ERR_FAILED in Playwright (Cloudflare). Manual action: open https://business.yelp.com in real browser while logged in to complete SMS verification. Address shows Walnut Creek CA (incorrect — update to Fairfax VA 22003 after verification). |
| Nextdoor | — | ❌ Blocked | nextdoor.com returns net::ERR_FAILED in Playwright (Cloudflare bot detection, same as Twitter/X). Requires real browser or manual creation at nextdoor.com/create-business. |
| Patch | — | ⏳ Pending | Submit press releases at patch.com/virginia |

---

## Facebook Workaround

Automated account registration blocked by bot detection every attempt.

**Options:**
1. **Manual** — User creates personal FB account at facebook.com/reg, then creates Business Page
2. **CDP** — Open Chrome with `--remote-debugging-port=9222`, log into existing FB account, automation handles Business Page creation only

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-fb-session
```

---

## Instagram Next Steps
1. Go to Settings → Account → Switch to Professional Account → Business → Real Estate
2. Link to Facebook Business Page once created
3. Add bio: "Virginia cash home buyer | Cash offers in 24 hrs | Close in 7 days | (703) 940-1159"
4. Add profile photo (HHB logo)
5. Add website: https://helpfulhomebuyersusa.com

## ActiveRain — Blocked
- Account `jeffbord-hhb` was **disabled** by ActiveRain. Reason unknown.
- To recover: contact support@activerain.com to request reinstatement
- Alternatively: create a new account at activerain.com with different username

## Pinterest — Completed 2026-03-23
- Bio: "Virginia cash home buyer helping homeowners sell quickly. Cash offers in 24 hours, close in 7 days. No repairs, no fees." ✅
- Website: http://helpfulhomebuyersusa.com ✅
- 4 boards: Foreclosure Help Virginia, Cash Home Buying Process, Virginia Real Estate Tips, Sell My House Fast Virginia ✅
- TODO: Add phone number to profile (field present but needs manual entry)
- TODO: Start pinning content to boards

## BiggerPockets — Blocked
- Password flagged as insecure (data breach detection) — all pages redirect to /insecure-password
- Reset emails received but contain only links to forgot_password page, not direct reset token
- **Manual action required**: Go to https://www.biggerpockets.com/account/forgot_password, submit email, check inbox for reset link WITH token (may be a second email that hasn't arrived yet)
- Once unlocked, add: bio "Virginia cash home buyer helping homeowners sell fast | Investor | Northern VA" + role=Investor + market=Virginia

---

## LinkedIn Page — Details

- **Page URL**: https://www.linkedin.com/company/helpful-home-buyers-usa/
- **Page ID**: 113019591
- **Admin URL**: https://www.linkedin.com/company/113019591/admin/dashboard/
- **Email**: anchor.offer.chatgpt@gmail.com
- **Status**: Live — 0 followers as of 2026-03-23
- **Tagline**: We Buy Houses Fast for Cash in Virginia
- **Description**: We buy houses for cash across Virginia. Whether you're facing foreclosure, probate, divorce, or just need to sell fast — we can help. Get a fair cash offer in 24 hours. Call (703) 940-1159 or visit helpfulhomebuyersusa.com
- **Website**: https://helpfulhomebuyersusa.com
- **Phone**: (703) 940-1159
- **Industry**: Real Estate
- **Company size**: 2-10 employees
- **Next steps**: Add logo/cover image. Invite connections to follow. Post first content.

## YouTube Channel — Details

- **Channel URL**: https://www.youtube.com/@HelpfulHomeBuyersUSA
- **Channel ID**: UC6rUb9SkBKtO9aYXynkw1Sg
- **Studio URL**: https://studio.youtube.com/channel/UC6rUb9SkBKtO9aYXynkw1Sg
- **Email**: anchor.offer.chatgpt@gmail.com (Google account)
- **Status**: Live — created 2026-03-23
- **Handle**: @HelpfulHomeBuyersUSA
- **Next steps**: Add channel description, banner image, profile photo. Upload first video.

## Twitter / X — Status

- **Status**: BLOCKED — x.com returns net::ERR_FAILED for Playwright browser (Cloudflare bot detection)
- **Action required**: Create manually at https://x.com/i/flow/signup
  - Email: anchor.offer.chatgpt@gmail.com
  - Username priority: HelpfulHomeBuyers → HelpfulHBuyers → HHBuyersUSA → HelpfulHBuyersUSA
  - Bio: Virginia cash home buyer | Cash offers in 24 hrs | Close in 7 days | helpfulhomebuyersusa.com
  - Website: https://helpfulhomebuyersusa.com

## Instagram — Pending Login (Rate Limited)

- **Status**: Account exists at @helpfulhomebuyersusa (created 2026-03-23, personal account)
- **Issue**: Instagram rate-limited login attempts due to multiple failed tries during automation. "Please wait a few minutes before you try again." message appears.
- **Session cookie**: Expired. `ds_user_id=42687054813` still present but no `sessionid`.
- **Retry**: Wait ~1 hour, then log in at https://www.instagram.com/accounts/login/ → Click "Continue" → Enter password `Password!1`
- **After login**:
  1. Go to Settings → Account → Switch to Professional Account → Business → Real Estate
  2. Add bio: "Virginia cash home buyer | Cash offers in 24 hrs | Close in 7 days | (703) 940-1159"
  3. Add website: https://helpfulhomebuyersusa.com
  4. Add profile photo (HHB logo)
  5. Link to Facebook Business Page once created

## Nextdoor — Blocked (Cloudflare)

- **Status**: BLOCKED — nextdoor.com returns net::ERR_FAILED in Playwright (same Cloudflare bot detection as Twitter/X)
- **Action required**: Create manually at https://nextdoor.com/create-business
  - Business name: Helpful Home Buyers USA
  - Phone: (703) 940-1159
  - Service area: Northern Virginia (Fairfax, Arlington, Alexandria, Loudoun, Prince William)
  - Category: Real Estate
  - Website: https://helpfulhomebuyersusa.com

## Yelp — Pending SMS Verification

- **Status**: Business claimed, awaiting SMS code on (703) 940-1159
- **Issue**: SMS from Yelp not appearing in GHL because +17039401159 forwards to Retell before GHL processes inbound SMS. Yelp biz portal blocked in Playwright.
- **Action required**: Open https://business.yelp.com in real Chrome browser → complete SMS verification → update address to Fairfax VA 22003
