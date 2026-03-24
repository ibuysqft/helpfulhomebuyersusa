import type { Metadata } from "next";

// ── Metadata ─────────────────────────────────────────────────────────────────

const TITLE = "Free Home Comps Widget for Real Estate Websites";
const DESCRIPTION =
  "Embed a free ARV comps calculator on your real estate website. No API key, no sign-up. Just paste the code.";
const CANONICAL =
  "https://www.helpfulhomebuyersusa.com/comps/embed-guide";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: CANONICAL,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// ── FAQ Schema ───────────────────────────────────────────────────────────────

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free forever. No API key required. No sign-up needed.",
      },
    },
    {
      "@type": "Question",
      name: "Where does the data come from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Live comparable sales pulled from Redfin, Zillow, and Realtor.com databases.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this on WordPress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Paste the iframe embed code into any HTML block or Custom HTML widget in WordPress.",
      },
    },
    {
      "@type": "Question",
      name: "Will this slow down my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The widget loads in an iframe, so it does not affect your page speed or Core Web Vitals.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize the look?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can adjust the iframe width, height, border-radius, and box-shadow via the style attribute in the embed code.",
      },
    },
  ],
};

// ── Embed code snippet ───────────────────────────────────────────────────────

const EMBED_CODE = `<!-- Helpful Homebuyers USA — Free Comps Widget -->
<iframe
  src="https://www.helpfulhomebuyersusa.com/comps/embed"
  width="100%"
  height="500"
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);"
></iframe>`;

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EmbedGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Add a Free Home Comps Tool to Your Website
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600">
            Embed a free ARV comps calculator on your real estate website.
            No API key, no sign-up. Just paste the code.
          </p>
        </header>

        {/* Live Preview */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Live Preview
          </h2>
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-md">
            <iframe
              src="/comps/embed"
              width="100%"
              height={500}
              style={{ border: "none", display: "block" }}
              title="Comps widget preview"
              loading="lazy"
            />
          </div>
        </section>

        {/* Embed Code */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Copy &amp; Paste Embed Code
          </h2>
          <p className="mb-3 text-sm text-slate-600">
            Add this snippet anywhere on your website — WordPress, Squarespace,
            Wix, Webflow, or raw HTML.
          </p>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              <code>{EMBED_CODE}</code>
            </pre>
          </div>
        </section>

        {/* Why use this */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Why Use This Widget?
          </h2>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-500" aria-hidden="true" />
              <span>
                <strong>Free forever</strong> — no API key, no account, no
                hidden fees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-500" aria-hidden="true" />
              <span>
                <strong>Live data</strong> — pulls comparable sales from
                Redfin, Zillow, and Realtor.com in real time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-500" aria-hidden="true" />
              <span>
                <strong>Mobile responsive</strong> — works on any screen size,
                desktop or phone.
              </span>
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-6">
            {FAQ_SCHEMA.mainEntity.map((item) => (
              <div key={item.name}>
                <dt className="mb-1 font-semibold text-slate-800">
                  {item.name}
                </dt>
                <dd className="text-slate-600">
                  {item.acceptedAnswer.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Footer attribution */}
        <footer className="border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          Built by{" "}
          <a
            href="https://www.helpfulhomebuyersusa.com"
            className="font-semibold text-blue-600 hover:underline"
          >
            Helpful Home Buyers USA
          </a>
        </footer>
      </main>
    </>
  );
}
