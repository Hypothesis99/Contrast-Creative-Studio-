import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { mkdtempSync, rmSync, readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url),
  password = randomBytes(24).toString("hex"),
  secret = randomBytes(48).toString("hex");
let base,
  server,
  cookie = "",
  content,
  leadId,
  dir,
  logs = "";
const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/CXcAAAAASUVORK5CYII=",
  "base64",
);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function api(route, options = {}) {
  return fetch(`${base}${route}`, {
    ...options,
    headers: {
      ...(cookie ? { Cookie: cookie } : {}),
      ...(options.method && options.method !== "GET" ? { Origin: base } : {}),
      ...options.headers,
    },
  });
}
async function save(next) {
  return api("/api/admin/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(next),
  });
}
function quote() {
  const f = new FormData();
  for (const [k, v] of Object.entries({
    company: "Test marka",
    name: "Test kullanıcı",
    phone: "05550000000",
    email: "test@example.org",
    services: "logo-tasarimi",
    budget: "Birlikte belirleyelim",
    startDate: "2026-11-01",
    message: "Yeni markamız için kurumsal bir kimlik istiyoruz.",
    consent: "on",
  }))
    f.append(k, v);
  return f;
}
before(async () => {
  dir = mkdtempSync(path.join(os.tmpdir(), "contrast-test-"));
  const legacy = JSON.parse(
    readFileSync(new URL("../lib/content-v1.json", import.meta.url), "utf8"),
  );
  legacy.settings.about = "Panelde saklanan özel ajans hikâyesi.";
  legacy.settings.email = "saved@example.org";
  legacy.services[0].intro = "Panelde saklanan özel hizmet tanıtımı.";
  const legacyDb = new DatabaseSync(path.join(dir, "studio.sqlite"));
  legacyDb.exec(
    "CREATE TABLE content (id INTEGER PRIMARY KEY, value TEXT NOT NULL)",
  );
  legacyDb
    .prepare("INSERT INTO content(id,value) VALUES(1,?)")
    .run(JSON.stringify(legacy));
  legacyDb.close();
  const probe = net.createServer();
  await new Promise((r) => probe.listen(0, "127.0.0.1", r));
  const port = probe.address().port;
  await new Promise((r) => probe.close(r));
  base = `http://127.0.0.1:${port}`;
  server = spawn(
    process.execPath,
    [
      require.resolve("next/dist/bin/next"),
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      env: {
        ...process.env,
        CONTRAST_DATA_DIR: dir,
        ADMIN_PASSWORD: password,
        SESSION_SECRET: secret,
        COOKIE_SECURE: "false",
        NEXT_PUBLIC_SITE_URL: "",
        CODESPACES: "true",
        CODESPACE_NAME: "contrast-integration",
        GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN: "app.github.dev",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  server.stdout.on("data", (x) => {
    logs = (logs + x.toString()).slice(-6000);
  });
  server.stderr.on("data", (x) => {
    logs = (logs + x.toString()).slice(-6000);
  });
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`${base}/api/health`)).ok) return;
    } catch {}
    if (server.exitCode !== null) throw new Error(`Server exited: ${logs}`);
    await sleep(250);
  }
  throw new Error(`Readiness failed: ${logs}`);
});
after(async () => {
  if (server && server.exitCode === null) {
    server.kill("SIGTERM");
    await new Promise((resolve) => server.once("exit", resolve));
  }
  if (dir) rmSync(dir, { recursive: true, force: true });
});
test("public pages and all 12 service pages render real content", async () => {
  const routes = [
    "/",
    "/hizmetler",
    "/projeler",
    "/projeler/forma-marka-kimligi",
    "/blog",
    "/blog/kurumsal-kimlik-nedir",
    "/hakkimizda",
    "/referanslar",
    "/showreel",
    "/teklif-al?hizmet=logo-tasarimi",
    "/iletisim",
    "/kvkk",
    "/gizlilik",
    "/cerez-politikasi",
  ];
  for (const route of routes) {
    const r = await api(route);
    assert.equal(r.status, 200, route);
    const html = await r.text();
    assert.match(html, /<h1[ >]/, route);
    assert.match(html, /<html lang="tr"/, route);
  }
  const html = await (await api("/hizmetler")).text();
  const links = [
    ...new Set(
      [...html.matchAll(/href="(\/hizmetler\/[^"?]+)"/g)].map((x) => x[1]),
    ),
  ];
  assert.equal(links.length, 12);
  for (const route of links)
    assert.equal((await api(route)).status, 200, route);
  assert.equal((await api("/blog/olmayan-yazi")).status, 404);
});
test("unconfigured domain keeps search indexing closed", async () => {
  assert.match(await (await api("/robots.txt")).text(), /Disallow: \//);
  const html = await (await api("/")).text();
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(
    html,
    /src="https:\/\/(www.googletagmanager|connect.facebook)/,
  );
});
test("admin content, leads and file routes reject anonymous requests", async () => {
  for (const route of [
    "/api/admin/content",
    "/api/admin/leads",
    "/api/admin/files/unknown",
  ])
    assert.equal((await api(route)).status, 401);
});
test("login rejects invalid passwords and foreign origins", async () => {
  assert.equal(
    (
      await api("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "wrong" }),
      })
    ).status,
    401,
  );
  assert.equal(
    (
      await api("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://foreign.example",
        },
        body: JSON.stringify({ password }),
      })
    ).status,
    403,
  );
});
test("admin login creates protected session and reads content", async () => {
  const r = await api("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  assert.equal(r.status, 200);
  const header = r.headers.get("set-cookie");
  assert.match(header, /HttpOnly/);
  assert.match(header, /SameSite=strict/i);
  cookie = header.split(";")[0];
  content = await (await api("/api/admin/content")).json();
  assert.equal(content.services.length, 12);
});
test("existing database upgrades once while retaining administrator content", async () => {
  assert.equal(content.settings.about, "Panelde saklanan özel ajans hikâyesi.");
  assert.equal(content.settings.email, "saved@example.org");
  assert.equal(
    content.services[0].intro,
    "Panelde saklanan özel hizmet tanıtımı.",
  );
  assert.equal(content.projects.length, 6);
  assert.equal(content.articles.length, 8);
  assert.ok(content.settings.team.length > 200);
  for (const service of content.services) {
    assert.equal(service.process.length, 4);
    assert.equal(service.faq.length, 3);
    const html = await (await api(`/hizmetler/${service.slug}`)).text();
    assert.match(html, /Kimler için/);
    assert.match(html, /<details/);
  }
  const db = new DatabaseSync(path.join(dir, "studio.sqlite"));
  assert.equal(
    db.prepare("SELECT COUNT(*) AS count FROM content_updates").get().count,
    2,
  );
  db.close();
  assert.equal(content.settings.showreelUrl, "/showreel");
  assert.equal(content.settings.showreelDemo, true);
  assert.equal(content.settings.clients.length, 4);
  assert.equal(content.settings.testimonials.length, 3);
  assert.ok(content.settings.clients.every((c) => c.demo));
  assert.ok(content.settings.testimonials.every((t) => t.demo));
  assert.ok(content.settings.sampleContactFields.includes("phone"));
  assert.equal(content.settings.sampleContactFields.includes("email"), false);
  for (const article of content.articles) {
    assert.ok(article.body.length > 2000, article.slug);
    assert.equal((await api(`/blog/${article.slug}`)).status, 200);
  }
  for (const project of content.projects) {
    assert.equal((await api(`/projeler/${project.slug}`)).status, 200);
    for (const image of [project.image, ...project.gallery])
      assert.equal((await api(image)).status, 200, image);
  }
});
test("sample contacts, references and playable video are labelled and safe to preview", async () => {
  const contact = await (await api("/iletisim")).text();
  assert.match(contact, /ÖRNEK STÜDYO ADRESİ/);
  assert.match(contact, /Örnek Mahallesi/);
  assert.match(contact, /href="mailto:saved@example.org"/);
  assert.doesNotMatch(contact, /href="tel:/);
  assert.doesNotMatch(contact, /href="https:\/\/wa.me\//);
  assert.doesNotMatch(contact, /href="https:\/\/contrast.example\/instagram/);
  const references = await (await api("/referanslar")).text();
  assert.match(references, /Örnek referans/);
  assert.match(references, /Örnek yorum · kurgu/);
  for (const client of content.settings.clients)
    assert.equal((await api(client.logo)).status, 200);
  const showreel = await (await api("/showreel")).text();
  assert.match(showreel, /<video[^>]*controls/);
  assert.match(showreel, /\/videos\/concept-showreel.mp4/);
  assert.match(showreel, /20 SANİYE/);
  assert.match(showreel, /noindex, follow/);
  const video = await api("/videos/concept-showreel.mp4", {
    headers: { Range: "bytes=0-255" },
  });
  assert.equal(video.status, 206);
  assert.match(video.headers.get("content-type"), /video\/mp4/);
  assert.equal((await video.arrayBuffer()).byteLength, 256);
  assert.equal((await api("/videos/concept-showreel-poster.jpg")).status, 200);
});
test("service FAQs and workflow edits persist and malformed data is rejected", async () => {
  content.services[0].faq[0].answer = "Panelden güncellenen cevap.";
  content.services[0].process[0].description =
    "Panelden güncellenen çalışma adımı.";
  assert.equal((await save(content)).status, 200);
  const stored = await (await api("/api/admin/content")).json();
  assert.equal(stored.services[0].faq[0].answer, "Panelden güncellenen cevap.");
  assert.equal(
    stored.services[0].process[0].description,
    "Panelden güncellenen çalışma adımı.",
  );
  const html = await (
    await api(`/hizmetler/${content.services[0].slug}`)
  ).text();
  assert.match(html, /Panelden güncellenen cevap/);
  const invalid = structuredClone(content);
  invalid.services[0].faq[0].answer = "";
  assert.equal((await save(invalid)).status, 400);
});
test("Codespaces accepts its own HTTPS origin and rejects other preview origins", async () => {
  const previewOrigin = "https://contrast-integration-3000.app.github.dev";
  const valid = await api("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: previewOrigin },
    body: JSON.stringify({ password }),
  });
  assert.equal(valid.status, 200);
  const foreign = await api("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://other-codespace-3000.app.github.dev",
    },
    body: JSON.stringify({ password }),
  });
  assert.equal(foreign.status, 403);
});
test("quote validation rejects missing consent, missing services and disguised files", async () => {
  const f = quote();
  f.delete("consent");
  assert.equal(
    (await api("/api/teklif", { method: "POST", body: f })).status,
    400,
  );
  const g = quote();
  g.delete("services");
  assert.equal(
    (await api("/api/teklif", { method: "POST", body: g })).status,
    400,
  );
  const h = quote();
  h.set(
    "file",
    new File(["<script>bad</script>"], "report.pdf", {
      type: "application/pdf",
    }),
  );
  assert.equal(
    (await api("/api/teklif", { method: "POST", body: h })).status,
    400,
  );
});
test("valid quote persists, attachment remains private, status can change", async () => {
  const f = quote();
  f.set(
    "file",
    new File(["%PDF-1.7\nTest attachment"], "brief.pdf", {
      type: "application/pdf",
    }),
  );
  const r = await api("/api/teklif", { method: "POST", body: f });
  assert.equal(r.status, 201);
  leadId = (await r.json()).id;
  const list = await (await api("/api/admin/leads")).json();
  assert.equal(list.length, 1);
  assert.equal(list[0].company, "Test marka");
  assert.equal((await fetch(`${base}/api/admin/files/${leadId}`)).status, 401);
  const file = await api(`/api/admin/files/${leadId}`);
  assert.equal(file.status, 200);
  assert.match(file.headers.get("content-disposition"), /attachment/);
  assert.match(await file.text(), /%PDF-1.7/);
  assert.equal(
    (
      await api("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: "Görüşülüyor" }),
      })
    ).status,
    200,
  );
  assert.equal(
    (await (await api("/api/admin/leads")).json())[0].status,
    "Görüşülüyor",
  );
});
test("blog draft stays private then publication exposes page and SEO", async () => {
  content.articles.push({
    id: "test-draft",
    slug: "test-blog-taslagi",
    title: "Taslak başlık",
    category: "Test",
    summary: "Test özet açıklaması.",
    body: "# Bir test yazısı\n\nAnlamlı bir içerik.",
    image: "/images/studio.svg",
    date: "2026-10-07",
    seoTitle: "Test SEO başlığı",
    seoDescription: "Özel SEO açıklaması",
    published: false,
  });
  assert.equal((await save(content)).status, 200);
  assert.equal((await api("/blog/test-blog-taslagi")).status, 404);
  content.articles.at(-1).published = true;
  assert.equal((await save(content)).status, 200);
  const r = await api("/blog/test-blog-taslagi");
  assert.equal(r.status, 200);
  assert.match(await r.text(), /Özel SEO açıklaması/);
});
test("admin validates duplicate slugs and unsafe URLs", async () => {
  const invalid = structuredClone(content);
  invalid.articles.push({ ...invalid.articles[0], id: "duplicate" });
  assert.equal((await save(invalid)).status, 400);
  const unsafe = structuredClone(content);
  unsafe.settings.instagram = "javascript:alert(1)";
  assert.equal((await save(unsafe)).status, 400);
  assert.equal(
    (
      await api("/api/admin/content", {
        method: "PUT",
        headers: {
          Origin: "https://foreign.example",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      })
    ).status,
    403,
  );
});
test("uploaded image can be used in a saved project", async () => {
  const f = new FormData();
  f.set("file", new File([png], "cover.png", { type: "image/png" }));
  const r = await api("/api/admin/upload", { method: "POST", body: f });
  assert.equal(r.status, 200);
  const { url } = await r.json();
  assert.match(url, /^\/media\//);
  assert.equal((await api(url)).headers.get("content-type"), "image/png");
  content.projects[0].image = url;
  assert.equal((await save(content)).status, 200);
  assert.match(
    await (await api("/projeler/forma-marka-kimligi")).text(),
    new RegExp(url),
  );
});
test("domain configuration activates canonical, schema and published-only sitemap", async () => {
  content.settings.siteUrl = "https://contrast-test.example";
  content.articles[0].published = false;
  assert.equal((await save(content)).status, 200);
  const home = await (await api("/")).text();
  assert.match(
    home,
    /rel="canonical" href="https:\/\/contrast-test.example\/"/,
  );
  assert.match(home, /application\/ld\+json/);
  const schema = JSON.parse(
    home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
  );
  assert.equal(schema.telephone, undefined);
  assert.equal(schema.email, "saved@example.org");
  assert.match(
    await (await api("/robots.txt")).text(),
    /Sitemap: https:\/\/contrast-test.example\/sitemap.xml/,
  );
  const sitemap = await (await api("/sitemap.xml")).text();
  assert.match(sitemap, /test-blog-taslagi/);
  assert.doesNotMatch(sitemap, /kurumsal-kimlik-nedir/);
  assert.doesNotMatch(sitemap, /\/admin/);
});
test("logout invalidates browser cookie; anonymous access remains blocked", async () => {
  const r = await api("/api/admin/logout", { method: "POST" });
  assert.equal(r.status, 200);
  const cleared = r.headers.get("set-cookie");
  assert.match(cleared, /^contrast_admin=;/);
  const expires = cleared.match(/Expires=([^;]+)/i);
  assert.ok(
    /Max-Age=0/i.test(cleared) ||
      (expires && Date.parse(expires[1]) < Date.now()),
  );
  cookie = "";
  assert.equal((await api("/api/admin/content")).status, 401);
});
