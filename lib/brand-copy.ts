import type { Content } from "./types";
import previousCopy from "./brand-copy-v3.json";

export const brandAbout =
  "Contrast, Bursa / Orhangazi merkezli bağımsız bir kreatif stüdyodur.\n\nMarkaları yalnızca güzel göstermek için değil, daha doğru anlatmak, daha güçlü konumlandırmak ve daha akılda kalıcı hale getirmek için çalışıyoruz.\n\nBir projenin logo, sosyal medya, web sitesi, fotoğraf, video ya da tabela olması bizim için birbirinden kopuk işler değildir.\n\nHepsi aynı markanın farklı yüzleridir.\n\nBu yüzden fikirden tasarıma, çekimden uygulamaya kadar bütün süreci aynı yaratıcı bakış altında topluyoruz.";

export const serviceGroups = [
  {
    id: "marka",
    group: "Tasarım",
    title: "Marka",
    headline: "Kimlikten karaktere.",
    description:
      "Markanızın nasıl göründüğünü değil, nasıl hatırlandığını tasarlıyoruz.",
    cta: "Marka hizmetlerini incele",
    links: [
      ["Logo Tasarımı", "logo-tasarimi"],
      ["Kurumsal Kimlik", "kurumsal-kimlik"],
      ["Grafik Tasarım", "grafik-tasarim"],
      ["Ambalaj Tasarımı", "grafik-tasarim"],
      ["Basılı Materyaller", "baski-tabela-acik-hava"],
      ["Tabela & Açık Hava Uygulamaları", "baski-tabela-acik-hava"],
    ],
  },
  {
    id: "dijital",
    group: "Dijital",
    title: "Dijital",
    headline: "Ekranda sadece var olmayın. Fark edilin.",
    description:
      "Markanızın dijital dünyadaki görünümünü, iletişimini ve kullanıcı deneyimini birlikte kurguluyoruz.",
    cta: "Dijital hizmetleri incele",
    links: [
      ["Web Tasarım", "web-sitesi-tasarimi"],
      ["Sosyal Medya Tasarımı", "sosyal-medya-yonetimi"],
      ["Sosyal Medya Yönetimi", "sosyal-medya-yonetimi"],
      ["Dijital Reklam", "google-ads"],
      ["Kampanya Tasarımı", "meta-ads"],
      ["İçerik Üretimi", "sosyal-medya-yonetimi"],
    ],
  },
  {
    id: "produksiyon",
    group: "Prodüksiyon",
    title: "Prodüksiyon",
    headline: "İyi fikir, doğru kadrajla daha güçlüdür.",
    description:
      "Markanızı anlatan görüntüler üretiyoruz. Ürünlerden insanlara, mekânlardan hikâyelere kadar her çekimi markanın diliyle buluşturuyoruz.",
    cta: "Prodüksiyon hizmetlerini incele",
    links: [
      ["Fotoğraf Çekimi", "fotograf-cekimi"],
      ["Ürün Çekimi", "fotograf-cekimi"],
      ["Video Prodüksiyon", "video-produksiyon"],
      ["Reels & Sosyal Medya Videoları", "reels-reklam-filmi"],
      ["Reklam Filmi", "reels-reklam-filmi"],
      ["Drone Çekimi", "drone-cekimi"],
    ],
  },
];

export const featuredArticleSlugs = [
  "logo-tasarimi-fiyatlarini-ne-belirler",
  "kurumsal-kimlik-nedir",
  "profesyonel-icerik-markaya-ne-kazandirir",
];

export function applyBrandCopy(content: Content): Content {
  const next = structuredClone(content);
  if (next.settings.about === previousCopy.about)
    next.settings.about = brandAbout;
  const revisedArticles: Record<string, { title: string; summary: string }> = {
    "kurumsal-kimlik-nedir": {
      title: "Kurumsal kimlik nedir?",
      summary:
        "Logo bir başlangıçtır. Kurumsal kimlik, markanın bütün temas noktalarında nasıl görüneceğini belirleyen görsel sistemdir.",
    },
    "logo-tasarimi-fiyatlarini-ne-belirler": {
      title: "Bir logo tasarımının fiyatı nasıl belirlenir?",
      summary:
        "Logo tasarımında fiyatı belirleyen yalnızca çizim süresi değildir. Araştırma, strateji, fikir geliştirme ve uygulama süreci de işin bir parçasıdır.",
    },
  };
  for (const old of previousCopy.articles) {
    const article = next.articles.find((a) => a.slug === old.slug);
    if (!article) continue;
    const copy = revisedArticles[old.slug];
    if (article.title === old.title) article.title = copy.title;
    if (article.summary === old.summary) article.summary = copy.summary;
  }
  if (next.settings.experienceYears === undefined) {
    next.settings.experienceYears = "5";
    next.settings.experienceDemo = true;
  }
  return next;
}
