"use client";

import { useState, useMemo, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface CompRecord {
  address: string;
  sale_price: number;
  sqft: number;
  beds: number;
  baths: number;
  price_per_sqft: number;
  sale_date: string;
  source: string;
  distance_mi: number;
  tier: string;
  is_off_market: boolean;
}

interface ARVAdjustment {
  address: string;
  sale_price: number;
  sqft: number;
  delta_sqft: number;
  adj_per_sqft: number;
  size_adjustment: number;
  adjusted_price: number;
}

interface ARVData {
  low: number;
  high: number;
  average: number;
  median_ppsf: number;
  delta_spread: number;
  delta_pct: number;
  adj_per_sqft: number;
  comp_count_bulk: number;
  comp_count_selected: number;
  adjustment_source: string;
  adjustments: ARVAdjustment[];
}

interface SubjectData {
  address: string;
  sqft: number;
  condition: string;
}

interface CompResponse {
  subject: SubjectData;
  all_comps: CompRecord[];
  paired_comps: CompRecord[];
  arv: ARVData;
}

// ── Constants ────────────────────────────────────────────────────────────────

const API_BASE =
  process.env.NEXT_PUBLIC_COMP_ENGINE_URL || "http://localhost:8000";

const CONDITIONS = ["excellent", "good", "fair", "poor", "teardown"] as const;

const CONDITION_MULTIPLIERS: Record<string, number> = {
  excellent: 1.0,
  good: 0.95,
  fair: 0.9,
  poor: 0.85,
  teardown: 0.7,
};

const REPAIR_ITEMS = [
  "Roof",
  "HVAC",
  "Kitchen",
  "Bathrooms",
  "Flooring",
  "Paint/cosmetic",
  "Foundation",
  "Windows/doors",
  "Other",
] as const;

const SOURCE_COLORS: Record<string, string> = {
  zillow: "bg-blue-600 text-white",
  redfin: "bg-orange-500 text-white",
  realtor: "bg-red-600 text-white",
  dealmachine: "bg-purple-600 text-white",
  dealsauce: "bg-emerald-600 text-white",
  propertyradar: "bg-cyan-600 text-white",
  mls: "bg-gray-600 text-white",
  tax_record: "bg-yellow-600 text-black",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function fmtCurrency(n: number): string {
  return "$" + fmt(n);
}

function fmtPpsf(n: number): string {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 }) + "/sf";
}

// ── Components ───────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="flex items-center justify-center gap-3 py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-600 border-t-emerald-400" />
      <span className="text-zinc-300 text-lg">
        Pulling comps from Zillow, Realtor.com, Redfin...
      </span>
    </div>
  );
}

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}

// ── Step 1: Run Comps ────────────────────────────────────────────────────────

function StepRunComps({
  onResult,
}: {
  onResult: (data: CompResponse) => void;
}) {
  const [address, setAddress] = useState("");
  const [sqft, setSqft] = useState("");
  const [condition, setCondition] = useState("fair");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !sqft.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/comps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: address.trim(),
          sqft: Number(sqft),
          condition,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(
          errBody?.detail || `Server error ${res.status}`
        );
      }

      const data: CompResponse = await res.json();
      onResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to pull comps"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-8">
        <h2 className="mb-6 text-2xl font-bold text-white">Pull Comps</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">
              Property Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="117 S 9th St, Suffolk, VA 23434"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                Square Footage
              </label>
              <input
                type="number"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="1500"
                className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
                min={100}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-700 bg-red-900/40 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-6 py-3.5 text-lg font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Pulling Comps..." : "Pull Comps"}
          </button>
        </form>

        {loading && <Spinner />}
      </div>
    </div>
  );
}

// ── Appraiser-guideline helpers ───────────────────────────────────────────────

/** Parse a sale_date string like "JAN 28, 2026" or "2026-01-28" → age in months. */
function monthsAgo(dateStr: string): number | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  const diffMs = Date.now() - d.getTime();
  return diffMs / (1000 * 60 * 60 * 24 * 30.44);
}

function RecencyBadge({ dateStr }: { dateStr: string }) {
  const months = monthsAgo(dateStr);
  if (months === null) return null;
  if (months > 12)
    return (
      <span title="Sale > 12 months old — stale" className="ml-1 text-red-400 text-xs font-bold">
        ⚠ {Math.round(months)}mo
      </span>
    );
  if (months > 6)
    return (
      <span title="Sale 6-12 months old" className="ml-1 text-amber-400 text-xs">
        {Math.round(months)}mo
      </span>
    );
  return (
    <span className="ml-1 text-zinc-500 text-xs">{Math.round(months)}mo</span>
  );
}

// ── Step 2: Review & Validate ────────────────────────────────────────────────

function StepReview({
  data,
  onConfirm,
}: {
  data: CompResponse;
  onConfirm: (adjustedArv: number, excludedAddresses: Set<string>) => void;
}) {
  const [excluded, setExcluded] = useState<Set<string>>(new Set());

  const toggleComp = useCallback((address: string) => {
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(address)) next.delete(address);
      else next.add(address);
      return next;
    });
  }, []);

  const includedComps = useMemo(
    () => data.all_comps.filter((c) => !excluded.has(c.address)),
    [data.all_comps, excluded]
  );

  const selectedComps = useMemo(
    () => includedComps.filter((c) => c.tier === "selected"),
    [includedComps]
  );

  // Recalculate median PPSF live from currently-included comps
  const medianPpsf = useMemo(() => {
    const ppsfs = includedComps
      .filter((c) => c.sqft > 0)
      .map((c) => c.sale_price / c.sqft)
      .sort((a, b) => a - b);
    if (ppsfs.length === 0) return 0;
    const mid = Math.floor(ppsfs.length / 2);
    return ppsfs.length % 2 !== 0 ? ppsfs[mid] : (ppsfs[mid - 1] + ppsfs[mid]) / 2;
  }, [includedComps]);

  const grossArv = medianPpsf * data.subject.sqft;
  const condMult = CONDITION_MULTIPLIERS[data.subject.condition] ?? 0.9;
  const adjustedArv = grossArv * condMult;

  const sortedPrices = includedComps.map((c) => c.sale_price).sort((a, b) => a - b);
  const low = sortedPrices[0] ?? 0;
  const high = sortedPrices[sortedPrices.length - 1] ?? 0;
  const spread = high - low;
  const spreadPct = low > 0 ? (spread / low) * 100 : 0;

  // Bracketing: appraiser rule — need at least one comp above AND below subject's adjusted value
  const subjectValue = adjustedArv;
  const hasBelow = includedComps.some((c) => c.sale_price < subjectValue);
  const hasAbove = includedComps.some((c) => c.sale_price > subjectValue);
  const isBracketed = hasBelow && hasAbove;

  const minCompsOk = selectedComps.length >= 3;

  // Paired comps sorted high → low for the analysis panel
  const pairedSorted = [...data.paired_comps].sort((a, b) => b.sale_price - a.sale_price);

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3">
        <span className="text-zinc-300">
          Showing <span className="font-bold text-white">{includedComps.length}</span> comps —{" "}
          <span className="font-bold text-emerald-400">{selectedComps.length} selected</span>
          {!minCompsOk && (
            <span className="ml-3 text-red-400 font-semibold">⚠ Need ≥ 3 selected to confirm</span>
          )}
        </span>
        <div className="flex items-center gap-4 text-sm">
          <span className={isBracketed ? "text-emerald-400" : "text-amber-400"}>
            {isBracketed ? "✓ Comps bracket subject" : "⚠ Subject not bracketed"}
          </span>
          <span className="text-zinc-500">{excluded.size} excluded</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        {/* Left: Comp table */}
        <div className="xl:col-span-3">
          <div className="overflow-x-auto rounded-xl border border-zinc-700 bg-zinc-900">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700 text-left text-xs uppercase tracking-wider text-zinc-400">
                  <th className="px-3 py-3 w-8"></th>
                  <th className="px-3 py-3">Address</th>
                  <th className="px-3 py-3 text-right">Price</th>
                  <th className="px-3 py-3 text-right">Sqft</th>
                  <th className="px-3 py-3 text-right">$/sf</th>
                  <th className="px-3 py-3 text-center">Bd/Ba</th>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3 text-right">Dist</th>
                  <th className="px-3 py-3">Source</th>
                  <th className="px-3 py-3">Tier</th>
                </tr>
              </thead>
              <tbody>
                {data.all_comps.map((comp) => {
                  const isExcluded = excluded.has(comp.address);
                  const isSelected = comp.tier === "selected";
                  const isOffMarket = comp.is_off_market;
                  const distFar = comp.distance_mi > 1;
                  // Size comparability: flag if >20% different from subject
                  const sizeDeltaPct =
                    data.subject.sqft > 0
                      ? Math.abs(comp.sqft - data.subject.sqft) / data.subject.sqft
                      : 0;
                  const sizeFar = sizeDeltaPct > 0.2 && comp.sqft > 0;

                  return (
                    <tr
                      key={comp.address}
                      className={`border-b border-zinc-800 transition ${
                        isExcluded
                          ? "opacity-35"
                          : isSelected
                          ? "bg-emerald-950/30"
                          : "hover:bg-zinc-800/50"
                      }`}
                    >
                      <td className="px-3 py-2.5">
                        <input
                          type="checkbox"
                          checked={!isExcluded}
                          onChange={() => toggleComp(comp.address)}
                          className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="px-3 py-2.5 max-w-[180px]">
                        <span className="text-white font-medium truncate block">
                          {comp.address}
                        </span>
                        {isOffMarket && (
                          <span className="text-xs text-amber-400">off-market</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-right text-white tabular-nums">
                        {fmtCurrency(comp.sale_price)}
                      </td>
                      <td className={`px-3 py-2.5 text-right tabular-nums ${sizeFar ? "text-amber-400" : "text-zinc-300"}`}>
                        {fmt(comp.sqft)}
                        {sizeFar && <span title=">20% size diff" className="ml-0.5 text-xs">*</span>}
                      </td>
                      <td className="px-3 py-2.5 text-right text-zinc-300 tabular-nums">
                        {fmtPpsf(comp.price_per_sqft)}
                      </td>
                      <td className="px-3 py-2.5 text-center text-zinc-300">
                        {comp.beds}/{comp.baths}
                      </td>
                      <td className="px-3 py-2.5 text-zinc-400 text-xs whitespace-nowrap">
                        {comp.sale_date}
                        <RecencyBadge dateStr={comp.sale_date} />
                      </td>
                      <td className={`px-3 py-2.5 text-right text-xs tabular-nums ${distFar ? "text-amber-400" : "text-zinc-400"}`}>
                        {comp.distance_mi > 0 ? `${comp.distance_mi.toFixed(1)}mi` : "—"}
                        {distFar && <span title=">1 mile" className="ml-0.5">*</span>}
                      </td>
                      <td className="px-3 py-2.5">
                        <Badge className={SOURCE_COLORS[comp.source] ?? "bg-zinc-600 text-white"}>
                          {comp.source}
                        </Badge>
                      </td>
                      <td className="px-3 py-2.5">
                        <Badge
                          className={
                            isSelected
                              ? "bg-emerald-700 text-emerald-100"
                              : "bg-zinc-700 text-zinc-300"
                          }
                        >
                          {comp.tier}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Legend */}
          <div className="mt-2 flex gap-4 px-1 text-xs text-zinc-500">
            <span>* sqft differs &gt;20% from subject</span>
            <span className="text-amber-400">amber = flag review</span>
            <span className="text-red-400">red = stale (&gt;12mo)</span>
          </div>
        </div>

        {/* Right: Validation panel */}
        <div className="xl:col-span-2">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white tracking-wide uppercase">
                Paired Comps Analysis
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Subject: {fmt(data.subject.sqft)} sqft | {data.subject.condition} condition
              </p>
            </div>

            {/* Bracketing status */}
            <div className={`rounded-lg px-4 py-2 text-sm font-medium ${isBracketed ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-amber-950 text-amber-400 border border-amber-800"}`}>
              {isBracketed
                ? "✓ Comps bracket subject — low and high comp both present"
                : "⚠ Bracketing gap — add a comp " + (!hasBelow ? "below" : "above") + " subject value"}
            </div>

            {/* Individual adjustment grid */}
            {data.arv.adjustments.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Size Adjustment Grid
                </h4>
                <div className="space-y-2">
                  {pairedSorted.map((comp, i) => {
                    const adj = data.arv.adjustments.find(
                      (a) => a.address === comp.address
                    );
                    const label =
                      i === 0
                        ? "HIGH"
                        : i === pairedSorted.length - 1
                        ? "LOW"
                        : i === Math.floor(pairedSorted.length / 2)
                        ? "MED"
                        : "";
                    return (
                      <div
                        key={comp.address}
                        className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {label && (
                            <span className="text-emerald-400 font-bold w-8">{label}</span>
                          )}
                          <span className="text-zinc-300 truncate flex-1">{comp.address}</span>
                          <span className="text-zinc-400">{fmt(comp.sqft)}sf</span>
                        </div>
                        <div className="pl-10 space-y-0.5 text-zinc-400">
                          <div className="flex justify-between">
                            <span>Sale price:</span>
                            <span className="text-white tabular-nums">{fmtCurrency(comp.sale_price)}</span>
                          </div>
                          {adj && (
                            <>
                              <div className="flex justify-between">
                                <span>
                                  Size adj ({adj.delta_sqft > 0 ? "+" : ""}{adj.delta_sqft} sf × ${Math.round(adj.adj_per_sqft)}/sf):
                                </span>
                                <span className={adj.size_adjustment >= 0 ? "text-emerald-400 tabular-nums" : "text-red-400 tabular-nums"}>
                                  {adj.size_adjustment >= 0 ? "+" : ""}{fmtCurrency(adj.size_adjustment)}
                                </span>
                              </div>
                              <div className="flex justify-between border-t border-zinc-800 pt-0.5">
                                <span className="font-bold text-zinc-200">Adjusted:</span>
                                <span className="font-bold text-white tabular-nums">{fmtCurrency(adj.adjusted_price)}</span>
                              </div>
                            </>
                          )}
                          {!adj && (
                            <div className="flex justify-between">
                              <span>$/sf:</span>
                              <span className="text-zinc-300 tabular-nums">{fmtPpsf(comp.price_per_sqft)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Delta spread */}
            <div className="border-t border-zinc-700 pt-4">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                Delta Spread
              </h4>
              <div className="space-y-1 font-mono text-sm text-zinc-300">
                <div className="flex justify-between">
                  <span>Low:</span>
                  <span className="text-white tabular-nums">{fmtCurrency(low)}</span>
                </div>
                <div className="flex justify-between">
                  <span>High:</span>
                  <span className="text-white tabular-nums">{fmtCurrency(high)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Spread:</span>
                  <span className={`tabular-nums ${spreadPct > 25 ? "text-amber-400" : "text-white"}`}>
                    {fmtCurrency(spread)} ({spreadPct.toFixed(1)}%)
                    {spreadPct > 25 && " ⚠"}
                  </span>
                </div>
                {spreadPct > 25 && (
                  <p className="text-xs text-amber-400 pt-1">
                    Wide spread — consider excluding outliers before confirming
                  </p>
                )}
              </div>
            </div>

            {/* ARV math */}
            <div className="border-t border-zinc-700 pt-4">
              <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-400">
                ARV Calculation
              </h4>
              <p className="mb-3 text-xs text-zinc-500">
                Source: {data.arv.adjustment_source}
              </p>
              <div className="space-y-1 font-mono text-sm text-zinc-300">
                <div className="flex justify-between">
                  <span>Median $/sqft:</span>
                  <span className="text-white tabular-nums">${Math.round(medianPpsf)}/sf</span>
                </div>
                <div className="flex justify-between">
                  <span>× Subject sqft:</span>
                  <span className="text-white tabular-nums">× {fmt(data.subject.sqft)}</span>
                </div>
                <div className="my-1 border-t border-dashed border-zinc-600" />
                <div className="flex justify-between">
                  <span>Gross ARV:</span>
                  <span className="text-white font-bold tabular-nums">{fmtCurrency(grossArv)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>
                    Cond. adj. ({data.subject.condition} = {Math.round(condMult * 100)}%):
                  </span>
                  <span className="text-zinc-400">× {condMult}</span>
                </div>
                <div className="my-1 border-t border-dashed border-zinc-600" />
                <div className="flex justify-between text-base">
                  <span className="font-bold text-emerald-400">ADJUSTED ARV:</span>
                  <span className="font-bold text-emerald-400 tabular-nums">{fmtCurrency(adjustedArv)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onConfirm(adjustedArv, excluded)}
              disabled={!minCompsOk}
              className="w-full rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirm Comps →
            </button>
            {!minCompsOk && (
              <p className="text-center text-xs text-red-400">
                Need at least 3 selected comps to confirm
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 3: Repairs & Offer ──────────────────────────────────────────────────

function StepOffer({
  arv,
  spreadPct,
  spreadAmount,
  onReset,
}: {
  arv: number;
  spreadPct: number;
  spreadAmount: number;
  onReset: () => void;
}) {
  const [mode, setMode] = useState<"quick" | "line">("quick");
  const [quickTotal, setQuickTotal] = useState(0);
  const [lineItems, setLineItems] = useState<Record<string, number>>(
    Object.fromEntries(REPAIR_ITEMS.map((item) => [item, 0]))
  );

  const lineTotal = useMemo(
    () => Object.values(lineItems).reduce((sum, v) => sum + v, 0),
    [lineItems]
  );

  const repairs = mode === "quick" ? quickTotal : lineTotal;
  const av = arv - repairs;
  const maxOffer = av * 0.9;
  const repairPct = arv > 0 ? (repairs / arv) * 100 : 0;

  const handleCopy = useCallback(() => {
    const text = [
      `MAX OFFER: ${fmtCurrency(maxOffer)}`,
      `ARV: ${fmtCurrency(arv)}`,
      `Repairs: ${fmtCurrency(repairs)}`,
      `Net AV: ${fmtCurrency(av)}`,
      `90% Rule Applied`,
    ].join("\n");
    navigator.clipboard.writeText(text);
  }, [maxOffer, arv, repairs, av]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Left: Repair estimate */}
      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
        <h3 className="mb-4 text-lg font-bold text-white">Repair Estimate</h3>

        {/* Toggle */}
        <div className="mb-5 flex rounded-lg border border-zinc-700 p-1">
          <button
            onClick={() => setMode("quick")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
              mode === "quick"
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Quick Total
          </button>
          <button
            onClick={() => setMode("line")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
              mode === "line"
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Line Items
          </button>
        </div>

        {mode === "quick" ? (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">
              Total Repair Budget
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                $
              </span>
              <input
                type="number"
                value={quickTotal || ""}
                onChange={(e) => setQuickTotal(Number(e.target.value) || 0)}
                placeholder="45000"
                className="w-full rounded-lg border border-zinc-600 bg-zinc-800 py-3 pl-8 pr-4 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {REPAIR_ITEMS.map((item) => (
              <div key={item} className="flex items-center justify-between gap-3">
                <label className="text-sm text-zinc-300 w-36">{item}</label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={lineItems[item] || ""}
                    onChange={(e) =>
                      setLineItems((prev) => ({
                        ...prev,
                        [item]: Number(e.target.value) || 0,
                      }))
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-zinc-600 bg-zinc-800 py-2 pl-7 pr-3 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-zinc-700 pt-3">
              <span className="text-sm font-bold text-zinc-200">Total</span>
              <span className="text-lg font-bold text-white tabular-nums">
                {fmtCurrency(lineTotal)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right: Offer calculation */}
      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
        <h3 className="mb-4 text-lg font-bold text-white">
          Offer Calculation
        </h3>

        <div className="space-y-2 font-mono text-sm text-zinc-300">
          <div className="flex justify-between">
            <span>ARV (from comps):</span>
            <span className="text-white tabular-nums">
              {fmtCurrency(arv)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>- Repair estimate:</span>
            <span className="text-red-400 tabular-nums">
              - {fmtCurrency(repairs)}
            </span>
          </div>
          <div className="my-1 border-t border-dashed border-zinc-600" />
          <div className="flex justify-between">
            <span>Net (AV):</span>
            <span className="text-white tabular-nums font-bold">
              {fmtCurrency(av)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>x 90% rule:</span>
            <span className="text-white">x 0.90</span>
          </div>
          <div className="my-1 border-t border-dashed border-zinc-600" />
          <div className="flex justify-between text-xl">
            <span className="font-bold text-emerald-400">MAX OFFER:</span>
            <span className="font-bold text-emerald-400 tabular-nums">
              {fmtCurrency(maxOffer)}
            </span>
          </div>
        </div>

        {/* Sanity check */}
        <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-950 p-4">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            Sanity Check
          </h4>
          <div className="space-y-1 font-mono text-sm text-zinc-300">
            <div className="flex justify-between">
              <span>ARV:</span>
              <span className="text-white tabular-nums">
                {fmtCurrency(arv)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Repairs:</span>
              <span
                className={`tabular-nums ${
                  repairPct > 35 ? "text-red-400" : "text-white"
                }`}
              >
                {fmtCurrency(repairs)} ({repairPct.toFixed(1)}% of ARV)
                {repairPct > 35 && " -- High repair ratio"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Spread:</span>
              <span
                className={`tabular-nums ${
                  spreadPct > 25 ? "text-amber-400" : "text-white"
                }`}
              >
                {fmtCurrency(spreadAmount)} ({spreadPct.toFixed(1)}%)
                {spreadPct > 25 && " -- Wide spread"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-500"
          >
            Copy Offer
          </button>
          <button
            onClick={handlePrint}
            className="rounded-lg border border-zinc-600 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
          >
            Print / Save PDF
          </button>
        </div>

        <button
          onClick={onReset}
          className="mt-4 w-full rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}

// ── Page (Wizard Container) ──────────────────────────────────────────────────

export default function CompsPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<CompResponse | null>(null);
  const [confirmedArv, setConfirmedArv] = useState(0);
  const [spreadInfo, setSpreadInfo] = useState({ pct: 0, amount: 0 });

  const handleResult = (result: CompResponse) => {
    setData(result);
    setStep(2);
  };

  const handleConfirm = (adjustedArv: number) => {
    setConfirmedArv(adjustedArv);

    // Calculate spread from included comps
    if (data) {
      const prices = data.all_comps
        .map((c) => c.sale_price)
        .sort((a, b) => a - b);
      const low = prices[0] ?? 0;
      const high = prices[prices.length - 1] ?? 0;
      const spread = high - low;
      setSpreadInfo({
        pct: low > 0 ? (spread / low) * 100 : 0,
        amount: spread,
      });
    }

    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setData(null);
    setConfirmedArv(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Comp Analysis
          </h1>
          <p className="mt-1 text-zinc-400">
            Helpful Home Buyers USA &mdash; Property Valuation Tool
          </p>
        </div>

        {/* Step indicators */}
        <div className="mb-8 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  s === step
                    ? "bg-emerald-600 text-white"
                    : s < step
                    ? "bg-emerald-900 text-emerald-400"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {s}
              </div>
              <span
                className={`text-sm ${
                  s === step ? "text-white font-medium" : "text-zinc-500"
                }`}
              >
                {s === 1
                  ? "Pull Comps"
                  : s === 2
                  ? "Review & Validate"
                  : "Repairs & Offer"}
              </span>
              {s < 3 && (
                <div className="mx-2 h-px w-8 bg-zinc-700" />
              )}
            </div>
          ))}
        </div>

        {/* Steps */}
        {step === 1 && <StepRunComps onResult={handleResult} />}
        {step === 2 && data && (
          <StepReview data={data} onConfirm={handleConfirm} />
        )}
        {step === 3 && (
          <StepOffer
            arv={confirmedArv}
            spreadPct={spreadInfo.pct}
            spreadAmount={spreadInfo.amount}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
