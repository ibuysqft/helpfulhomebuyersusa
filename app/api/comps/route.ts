import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const maxDuration = 60;

const COMP_ENGINE_URL = process.env.COMP_PULLER_URL;
const COMP_PULLER_SHARED_SECRET = process.env.COMP_PULLER_SHARED_SECRET;
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const GENERIC_COMP_ERROR =
  "The comps tool is temporarily unavailable. Please try again in a few minutes.";
const VALID_CONDITIONS = new Set(["poor", "fair", "good"]);
const MAX_BODY_BYTES = 2_048;

let _ratelimit: Ratelimit | null = null;
function getRatelimit() {
  if (!_ratelimit) {
    _ratelimit = new Ratelimit({
      redis: new Redis({
        url: UPSTASH_REDIS_REST_URL!,
        token: UPSTASH_REDIS_REST_TOKEN!,
      }),
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      analytics: false,
      prefix: "comps",
    });
  }
  return _ratelimit;
}

function getClientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function isSameSiteRequest(req: NextRequest) {
  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) {
    return false;
  }

  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const source = origin || referer;

  if (!host || !source) return false;

  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asFiniteNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim()) return Number(value);
  return Number.NaN;
}

function asCondition(value: unknown) {
  if (typeof value !== "string") return "fair";
  const normalized = value.trim().toLowerCase();
  return VALID_CONDITIONS.has(normalized) ? normalized : null;
}

function isBackendComp(value: unknown): value is BackendComp {
  if (!isPlainObject(value)) return false;
  return (
    typeof value.address === "string" &&
    typeof value.sale_price === "number" &&
    typeof value.sqft === "number" &&
    typeof value.beds === "number" &&
    typeof value.baths === "number" &&
    typeof value.distance === "number" &&
    typeof value.source === "string" &&
    typeof value.sale_date === "string"
  );
}

function isBackendResponse(value: unknown): value is BackendResponse {
  if (!isPlainObject(value)) return false;
  return (
    typeof value.address === "string" &&
    typeof value.arv === "number" &&
    typeof value.price_per_sqft === "number" &&
    typeof value.max_offer === "number" &&
    typeof value.conservative_offer === "number" &&
    typeof value.repairs_low === "number" &&
    typeof value.repairs_high === "number" &&
    typeof value.sources === "string" &&
    Array.isArray(value.comps) &&
    value.comps.every(isBackendComp)
  );
}

interface BackendComp {
  address: string;
  sale_price: number;
  sqft: number;
  beds: number;
  baths: number;
  distance: number;
  source: string;
  sale_date: string;
}

interface BackendResponse {
  address: string;
  arv: number;
  price_per_sqft: number;
  comp_count: number;
  max_offer: number;
  conservative_offer: number;
  repairs_low: number;
  repairs_high: number;
  profit_estimate_low: number;
  profit_estimate_high: number;
  comps: BackendComp[];
  pulled_at: string;
  sources: string;
}

export async function POST(req: NextRequest) {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    console.error("[api/comps] rate limit storage is not configured");
    return NextResponse.json({ detail: GENERIC_COMP_ERROR }, { status: 500 });
  }

  if (!isSameSiteRequest(req)) {
    return NextResponse.json({ detail: "Invalid request" }, { status: 403 });
  }

  const userAgent = req.headers.get("user-agent") ?? "";
  if (!userAgent.trim()) {
    return NextResponse.json({ detail: "Invalid request" }, { status: 403 });
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ detail: "Invalid request body" }, { status: 415 });
  }

  const contentLength = req.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ detail: "Invalid request body" }, { status: 413 });
  }

  const ip = getClientIp(req);
  try {
    const rateLimit = await getRatelimit().limit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        { detail: "Too many comp requests. Please try again later." },
        { status: 429 },
      );
    }
  } catch (err) {
    console.error("[api/comps] rate limit check failed", err);
    return NextResponse.json({ detail: GENERIC_COMP_ERROR }, { status: 500 });
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ detail: "Invalid request body" }, { status: 400 });
  }

  if (!isPlainObject(rawBody)) {
    return NextResponse.json({ detail: "Invalid request body" }, { status: 400 });
  }

  const body = rawBody as { address?: unknown; sqft?: unknown; condition?: unknown };
  const { address, sqft, condition } = body;

  if (!COMP_ENGINE_URL) {
    console.error("[api/comps] comp-puller URL is not configured");
    return NextResponse.json({ detail: GENERIC_COMP_ERROR }, { status: 500 });
  }

  if (!COMP_PULLER_SHARED_SECRET) {
    console.error("[api/comps] COMP_PULLER_SHARED_SECRET is not configured");
    return NextResponse.json({ detail: GENERIC_COMP_ERROR }, { status: 500 });
  }

  const normalizedAddress = typeof address === "string" ? address.trim() : "";
  const normalizedSqft = asFiniteNumber(sqft);
  const normalizedCondition = asCondition(condition);

  if (normalizedAddress.length < 8 || normalizedAddress.length > 160) {
    return NextResponse.json({ detail: "Address is required" }, { status: 400 });
  }

  if (!Number.isFinite(normalizedSqft) || normalizedSqft < 200 || normalizedSqft > 10000) {
    return NextResponse.json({ detail: "Enter a square footage between 200 and 10,000." }, { status: 400 });
  }

  if (!normalizedCondition) {
    return NextResponse.json({ detail: "Invalid property condition" }, { status: 400 });
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${COMP_ENGINE_URL}/analyze-deal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Comp-Puller-Secret": COMP_PULLER_SHARED_SECRET,
      },
      body: JSON.stringify({
        address: normalizedAddress,
        subject_sqft: normalizedSqft,
        condition: normalizedCondition,
        push_to_ghl: false,
        save_to_supabase: false,
      }),
      // Render free tier can take 60s to wake — give it 90s
      signal: AbortSignal.timeout(90_000),
    });
  } catch (err) {
    console.error("[api/comps] comp-puller fetch failed", err);
    return NextResponse.json({ detail: GENERIC_COMP_ERROR }, { status: 502 });
  }

  if (!backendRes.ok) {
    const body = await backendRes.json().catch(() => null);
    const rawDetail = body?.detail || "";
    const isNoComps = backendRes.status === 404 || rawDetail.toLowerCase().includes("not found") || rawDetail.toLowerCase().includes("no comps");
    const detail = isNoComps
      ? "No comps found for this address. Try adding the full state name, a nearby ZIP code, or a different address."
      : GENERIC_COMP_ERROR;
    if (!isNoComps) {
      console.error("[api/comps] comp-puller returned an error", {
        status: backendRes.status,
        detail: rawDetail || backendRes.statusText,
      });
    }
    return NextResponse.json({ detail }, { status: isNoComps ? 404 : 502 });
  }

  let data: unknown;
  try {
    data = await backendRes.json();
  } catch (err) {
    console.error("[api/comps] comp-puller returned invalid JSON", err);
    return NextResponse.json({ detail: GENERIC_COMP_ERROR }, { status: 502 });
  }

  if (!isBackendResponse(data)) {
    console.error("[api/comps] comp-puller returned invalid payload shape");
    return NextResponse.json({ detail: GENERIC_COMP_ERROR }, { status: 502 });
  }

  // Map each backend comp to the shape the frontend expects
  const mapComp = (c: BackendComp, tier: string) => ({
    address: c.address,
    sale_price: c.sale_price,
    sqft: c.sqft,
    beds: c.beds,
    baths: c.baths,
    price_per_sqft: c.sqft > 0 ? Math.round(c.sale_price / c.sqft) : 0,
    sale_date: c.sale_date,
    source: c.source,
    distance_mi: c.distance,
    tier,
    is_off_market: false,
  });

  // Mark the 3 closest comps as "selected", rest as "bulk"
  const sorted = [...data.comps].sort((a, b) => a.distance - b.distance);
  const allComps = sorted.map((c, i) => mapComp(c, i < 3 ? "selected" : "bulk"));

  const response = {
    subject: {
      address: data.address,
      sqft: normalizedSqft,
      condition: normalizedCondition,
    },
    all_comps: allComps,
    paired_comps: allComps.filter((c) => c.tier === "selected"),
    // Apps Script shape: data.summary.arv.median + data.pairings.repairs_*
    summary: {
      arv: {
        median: data.arv,
        low: data.conservative_offer,
        high: data.max_offer,
        median_ppsf: data.price_per_sqft,
      },
    },
    pairings: {
      repairs_low: data.repairs_low,
      repairs_high: data.repairs_high,
    },
    // Frontend shape (kept for backward compat)
    arv: {
      low: data.conservative_offer,
      high: data.max_offer,
      average: data.arv,
      median_ppsf: data.price_per_sqft,
      delta_spread: data.max_offer - data.conservative_offer,
      delta_pct:
        data.conservative_offer > 0
          ? ((data.max_offer - data.conservative_offer) / data.conservative_offer) * 100
          : 0,
      adj_per_sqft: data.price_per_sqft,
      comp_count_bulk: allComps.filter((c) => c.tier === "bulk").length,
      comp_count_selected: allComps.filter((c) => c.tier === "selected").length,
      adjustment_source: data.sources,
      adjustments: [],
    },
  };

  return NextResponse.json(response);
}
