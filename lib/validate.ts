import type { Content } from "./types";
function object(x: unknown): Record<string, unknown> {
  if (!x || typeof x !== "object" || Array.isArray(x))
    throw new Error("Geçersiz içerik.");
  return x as Record<string, unknown>;
}
function string(x: unknown, max = 1000) {
  if (typeof x !== "string" || x.length > max)
    throw new Error("Alan uzunluğunu ve metinleri kontrol edin.");
  return x.trim();
}
function boolean(x: unknown) {
  if (typeof x !== "boolean") throw new Error("Geçersiz yayın durumu.");
  return x;
}
function list(x: unknown, max = 100): unknown[] {
  if (!Array.isArray(x) || x.length > max)
    throw new Error("Liste sınırı aşıldı.");
  return x;
}
function slug(x: unknown) {
  const s = string(x, 150);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s))
    throw new Error("URL yalnızca küçük harf, sayı ve tire içermeli.");
  return s;
}
function required(x: unknown, max = 200) {
  const s = string(x, max);
  if (!s) throw new Error("Başlık ve gerekli alanlar boş bırakılamaz.");
  return s;
}
function url(x: unknown, local = false) {
  const s = string(x, 2048);
  if (!s) return "";
  if (local && /^\/images\/[a-zA-Z0-9._-]+\.(svg|jpg|jpeg|png|webp)$/.test(s))
    return s;
  if (local && /^\/media\/[a-f0-9-]{36}\.(jpg|png|webp)$/.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.protocol === "https:" && !u.username && !u.password) return s;
  } catch {}
  throw new Error("Bağlantılar https:// ile başlamalı.");
}
export function validateContent(value: unknown): Content {
  const c = object(value),
    s = object(c.settings);
  const settings = {
    name: required(s.name),
    tagline: string(s.tagline, 300),
    description: string(s.description, 500),
    phone: string(s.phone, 40),
    whatsapp: string(s.whatsapp, 40),
    email: string(s.email, 160),
    instagram: url(s.instagram),
    address: string(s.address, 1000),
    hours: string(s.hours, 300),
    mapUrl: url(s.mapUrl),
    siteUrl: url(s.siteUrl),
    gaId: string(s.gaId, 30),
    pixelId: string(s.pixelId, 30),
    searchConsoleId: string(s.searchConsoleId, 200),
    showreelUrl: url(s.showreelUrl),
    about: string(s.about, 6000),
    team: string(s.team, 6000),
    clients: list(s.clients, 50).map((x) => {
      const c = object(x);
      return { name: required(c.name), logo: url(c.logo, true) };
    }),
    testimonials: list(s.testimonials, 50).map((x) => {
      const t = object(x);
      return {
        name: required(t.name),
        company: string(t.company, 200),
        text: required(t.text, 2000),
      };
    }),
  };
  if (settings.email && !/^\S+@\S+\.\S+$/.test(settings.email))
    throw new Error("Geçerli bir e-posta adresi girin.");
  if (settings.gaId && !/^G-[A-Z0-9]+$/.test(settings.gaId))
    throw new Error("Analytics kimliği G- ile başlamalı.");
  if (settings.pixelId && !/^\d{5,20}$/.test(settings.pixelId))
    throw new Error("Meta Pixel kimliği sayı olmalı.");
  const services = list(c.services, 40).map((x) => {
    const s = object(x);
    return {
      slug: slug(s.slug),
      title: required(s.title),
      short: required(s.short, 500),
      intro: required(s.intro, 6000),
      items: list(s.items, 30).map((x) => required(x, 300)),
      group: required(s.group, 100),
      number: required(s.number, 10),
      audience: string(s.audience ?? "", 2000),
      process: list(s.process ?? [], 8).map((x) => {
        const step = object(x);
        return {
          title: required(step.title),
          description: required(step.description, 2000),
        };
      }),
      faq: list(s.faq ?? [], 20).map((x) => {
        const entry = object(x);
        return {
          question: required(entry.question, 300),
          answer: required(entry.answer, 3000),
        };
      }),
    };
  });
  const projects = list(c.projects, 200).map((x) => {
    const p = object(x);
    return {
      id: required(p.id, 100),
      slug: slug(p.slug),
      title: required(p.title),
      client: required(p.client),
      category: required(p.category),
      image: url(p.image, true) || "/images/studio.svg",
      year: string(p.year, 10),
      summary: string(p.summary, 1000),
      need: string(p.need, 6000),
      solution: string(p.solution, 6000),
      before: string(p.before, 3000),
      after: string(p.after, 3000),
      gallery: list(p.gallery, 30).map((x) => url(x, true)),
      videoUrl: url(p.videoUrl),
      demo: boolean(p.demo),
      published: boolean(p.published),
    };
  });
  const articles = list(c.articles, 300).map((x) => {
    const a = object(x),
      date = string(a.date, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)))
      throw new Error("Yazı tarihi geçersiz.");
    return {
      id: required(a.id, 100),
      slug: slug(a.slug),
      title: required(a.title),
      category: required(a.category),
      summary: string(a.summary, 1000),
      body: string(a.body, 60000),
      image: url(a.image, true) || "/images/studio.svg",
      date,
      seoTitle: string(a.seoTitle, 200),
      seoDescription: string(a.seoDescription, 500),
      published: boolean(a.published),
    };
  });
  for (const collection of [services, projects, articles]) {
    const slugs = collection.map((x) => x.slug);
    if (new Set(slugs).size !== slugs.length)
      throw new Error("Aynı URL iki kez kullanılamaz.");
  }
  return { settings, services, projects, articles };
}
