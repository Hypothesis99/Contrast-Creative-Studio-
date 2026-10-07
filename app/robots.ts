import type { MetadataRoute } from "next";
import { publicUrl } from "@/lib/seo";
export const dynamic = "force-dynamic";
export default function robots(): MetadataRoute.Robots {
  const url = publicUrl();
  return {
    rules: {
      userAgent: "*",
      ...(url
        ? { allow: "/", disallow: ["/admin", "/api/"] }
        : { disallow: "/" }),
    },
    ...(url ? { sitemap: `${url}/sitemap.xml` } : {}),
  };
}
