"use client";

import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface ARVData {
  low: number;
  high: number;
  average: number;
  median_ppsf: number;
  comp_count_selected: number;
}

interface CompResponse {
  arv: ARVData;
}

// ── Constants ────────────────────────────────────────────────────────────────

const CONDITIONS = ["excellent", "good", "fair", "poor", "teardown"] as const;

const CTA_URL = "https://www.helpfulhomebuyersusa.com/property-information";
const ATTRIBUTION_URL = "https://www.helpfulhomebuyersusa.com";

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

// ── Component ────────────────────────────────────────────────────────────────

export default function EmbedCompsClient() {
  const [address, setAddress] = useState("");
  const [sqft, setSqft] = useState("");
  const [condition, setCondition] = useState("fair");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CompResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !sqft.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/comps", {
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
        throw new Error(errBody?.detail || `Server error ${res.status}`);
      }

      const data: CompResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to pull comps",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError("");
    setAddress("");
    setSqft("");
    setCondition("fair");
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: 24,
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#ffffff",
        borderRadius: 12,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Form */}
      {!result && (
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: 20,
              fontWeight: 700,
              color: "#1e293b",
            }}
          >
            Free Home Comps
          </h2>

          <label style={labelStyle}>Property Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, Richmond, VA 23220"
            required
            style={inputStyle}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <div>
              <label style={labelStyle}>Square Feet</label>
              <input
                type="number"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="1500"
                required
                min={100}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                style={inputStyle}
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
            <div
              style={{
                marginTop: 12,
                padding: "10px 14px",
                borderRadius: 8,
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Pulling Comps..." : "Run Free Comps"}
          </button>

          {loading && (
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "#94a3b8",
                marginTop: 8,
              }}
            >
              This may take up to 60 seconds on first run.
            </p>
          )}
        </form>
      )}

      {/* Results */}
      {result && (
        <div style={{ flex: 1 }}>
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: 18,
              fontWeight: 700,
              color: "#1e293b",
            }}
          >
            ARV Estimate
          </h2>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: "#64748b" }}>
            Based on {result.arv.comp_count_selected} comparable sales
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <ResultCard label="Low" value={fmtCurrency(result.arv.low)} />
            <ResultCard
              label="Average"
              value={fmtCurrency(result.arv.average)}
              isHighlight
            />
            <ResultCard label="High" value={fmtCurrency(result.arv.high)} />
          </div>

          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              background: "#f97316",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 16,
              padding: "14px 24px",
              borderRadius: 10,
              textDecoration: "none",
              marginBottom: 12,
              transition: "background 0.2s",
            }}
          >
            Get a Full Cash Offer
          </a>

          <button
            type="button"
            onClick={handleReset}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              background: "transparent",
              color: "#64748b",
              fontWeight: 500,
              fontSize: 14,
              padding: "10px 0",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Run another comp
          </button>
        </div>
      )}

      {/* Attribution */}
      <div
        style={{
          marginTop: 20,
          paddingTop: 12,
          borderTop: "1px solid #e2e8f0",
          textAlign: "center",
          fontSize: 12,
          color: "#94a3b8",
        }}
      >
        Powered by{" "}
        <a
          href={ATTRIBUTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}
        >
          HelpfulHomeBuyersUSA.com
        </a>
      </div>
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ResultCard({
  label,
  value,
  isHighlight = false,
}: {
  label: string;
  value: string;
  isHighlight?: boolean;
}) {
  return (
    <div
      style={{
        padding: "14px 8px",
        borderRadius: 10,
        border: isHighlight ? "2px solid #16a34a" : "1px solid #e2e8f0",
        background: isHighlight ? "#f0fdf4" : "#f8fafc",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: isHighlight ? "#16a34a" : "#1e293b",
          marginTop: 4,
        }}
      >
        {value}
      </div>
    </div>
  );
}

// ── Inline styles (avoid Tailwind dependency for embed portability) ──────────

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#475569",
  marginBottom: 4,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  fontSize: 15,
  color: "#1e293b",
  background: "#ffffff",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 16,
  padding: "14px 24px",
  borderRadius: 10,
  border: "none",
  background: "#16a34a",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: 16,
};
