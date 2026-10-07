import type { MetadataRoute } from "next";
import { getContent } from "@/lib/store";
import { publicUrl } from "@/lib/seo";
export const dynamic = "force-dynamic";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = publicUrl();
  if (!url) return [];
  const c = getContent(),
    paths = [
      "/",
      "/hizmetler",
      "/projeler",
      "/hakkimizda",
      "/referanslar",
      "/blog",
      "/teklif-al",
      "/iletisim",
      ...c.services.map((s) => `/hizmetler/${s.slug}`),
      ...c.projects
        .filter((p) => p.published)
        .map((p) => `/projeler/${p.slug}`),
      ...c.articles.filter((a) => a.published).map((a) => `/blog/${a.slug}`),
    ];
  return paths.map((p) => ({
    url: `${url}${p}`,
    changeFrequency: p === "/blog" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
