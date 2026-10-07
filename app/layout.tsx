import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { getContent } from "@/lib/store";
export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  const s = getContent().settings;
  return {
    title: {
      default: "Contrast Creative Studio | Bursa Reklam & Tasarım Ajansı",
      template: "%s | Contrast Creative Studio",
    },
    description: s.description,
    verification: s.searchConsoleId ? { google: s.searchConsoleId } : undefined,
    icons: { icon: "/icon.svg" },
  };
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <a href="#main-content" className="skip-link">
          İçeriğe geç
        </a>
        <SiteShell settings={getContent().settings}>{children}</SiteShell>
      </body>
    </html>
  );
}
