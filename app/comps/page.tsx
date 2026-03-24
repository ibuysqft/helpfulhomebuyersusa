import CompsPage from "./CompsClient";

import type { Metadata } from "next";

// ── Metadata ────────────────────────────────────────────────────────────────

const TITLE = "Free Home Comps Tool — See What Houses Are Selling For Near You";
const DESCRIPTION =
  "Pull real comparable sales from Redfin in seconds. Get ARV, price per sqft, and offer range estimates — no sign-up, no agent, no pitch.";
const CANONICAL = "https://www.helpfulhomebuyersusa.com/comps";

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

// ── JSON-LD Structured Data ─────────────────────────────────────────────────

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ARV in real estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ARV (After Repair Value) is the estimated market value of a property after all repairs and renovations are complete. It is calculated using comparable recent sales of similar homes nearby.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are these comps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Comps are pulled live from Redfin's sold listings database. Results reflect actual recorded sale prices from the past 6 months within 1 mile of your property.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account to use this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This comps tool is completely free and requires no sign-up, login, or personal information.",
      },
    },
    {
      "@type": "Question",
      name: "What is price per square foot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Price per square foot (PPSF) divides the sale price by the home's livable square footage. It's used to normalize comparisons between homes of different sizes.",
      },
    },
    {
      "@type": "Question",
      name: "How do cash buyers use comps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cash buyers use comparable sales to determine ARV, then calculate their maximum offer as a percentage of ARV minus estimated repair costs — typically 65-75% of ARV.",
      },
    },
  ],
};

const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Get Free Home Comps Online",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter property address",
      text: "Type the full street address of the property you want comps for.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter square footage",
      text: "Enter the total livable square footage of the property.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select property condition",
      text: "Choose the current condition of the property from the dropdown.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Run Free Comps",
      text: "Click the Run Free Comps button to pull comparable sales from the area.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Review ARV estimate and comparable sales",
      text: "Review the ARV estimate, price per square foot breakdown, and individual comparable sales results.",
    },
  ],
};

function SchemaScripts() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_SCHEMA) }}
      />
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <SchemaScripts />
      <CompsPage />
    </>
  );
}
