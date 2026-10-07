import type { Metadata } from "next";
import { getContent } from "./store";
export function publicUrl() {
  const url =
    getContent().settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "";
  try {
    const u = new URL(url);
    return u.protocol === "https:" &&
      u.hostname !== "localhost" &&
      !/^127\./.test(u.hostname)
      ? u.origin
      : "";
  } catch {
    return "";
  }
}
export function metadata(
  title: string,
  description: string,
  path: string,
  image = "/images/social-cover.png",
): Metadata {
  const base = publicUrl();
  const shareImage = image.endsWith(".svg") ? "/images/social-cover.png" : image;
  return {
    title: title.includes("Contrast Creative Studio")
      ? { absolute: title }
      : title,
    description,
    alternates: base ? { canonical: `${base}${path}` } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "tr_TR",
      ...(base
        ? { url: `${base}${path}`, images: [new URL(shareImage, base).href] }
        : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(base ? { images: [new URL(shareImage, base).href] } : {}) },
    robots: base
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
