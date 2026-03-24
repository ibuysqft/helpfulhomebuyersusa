import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Home Comps Widget | Helpful Home Buyers USA",
  description:
    "Embeddable ARV comps calculator. Pull live comparable sales data for any US property.",
  robots: { index: false, follow: false },
};

/**
 * Minimal layout for the embed page.
 * Hides root-layout sticky CTAs, chat widget, and analytics overlays
 * so the iframe renders a clean, standalone form.
 */
export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Hide root-layout chrome inside the embed iframe */
            [class*="MobileCTABar"],
            [class*="DesktopStickyCTA"],
            .fixed.bottom-0.z-50,
            .fixed.right-4.bottom-24,
            .fixed.right-6.bottom-6,
            iframe[data-widget-id],
            #chat-widget-container,
            [id^="leadconnector"],
            noscript iframe { display: none !important; }
            body { background: transparent !important; min-height: auto !important; }
          `,
        }}
      />
      {children}
    </>
  );
}
