import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const COMP_ENGINE_URL =
  process.env.NEXT_PUBLIC_COMP_ENGINE_URL ||
  "https://helpful-homebuyers-comp-puller.onrender.com";

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
  const { address, sqft, condition } = await req.json();

  if (!address?.trim()) {
    return NextResponse.json({ detail: "Address is required" }, { status: 400 });
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${COMP_ENGINE_URL}/analyze-deal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: address.trim(),
        subject_sqft: Number(sqft) || 0,
        condition: condition || "fair",
        push_to_ghl: false,
        save_to_supabase: false,
      }),
      // Render free tier can take 60s to wake — give it 90s
      signal: AbortSignal.timeout(90_000),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Backend unreachable";
    return NextResponse.json({ detail: msg }, { status: 502 });
  }

  if (!backendRes.ok) {
    const body = await backendRes.json().catch(() => null);
    return NextResponse.json(
      { detail: body?.detail || `Backend error ${backendRes.status}` },
      { status: backendRes.status },
    );
  }

  const data: BackendResponse = await backendRes.json();

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
      sqft: Number(sqft) || 0,
      condition: condition || "fair",
    },
    all_comps: allComps,
    paired_comps: allComps.filter((c) => c.tier === "selected"),
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
