"use client";
import Link from "next/link";
import { useState } from "react";
import type {
  Article,
  Content,
  ContactField,
  Lead,
  Project,
  Service,
  Settings,
} from "@/lib/types";
import { Brand } from "./site-shell";
import { Prose } from "./cards";
import { isSampleContact, sampleContacts } from "@/lib/sample-content";
export function AdminLogin({ configured }: { configured: boolean }) {
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const form = new FormData(e.currentTarget),
        r = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: form.get("password") }),
        }),
        j = await r.json();
      if (!r.ok) throw new Error(j.error);
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Giriş yapılamadı.");
      setBusy(false);
    }
  }
  return (
    <main id="main-content" className="admin-login">
      <div>
        <Brand />
        <span className="eyebrow">STÜDYO YÖNETİMİ</span>
        <h1>Yeniden merhaba.</h1>
        {configured ? (
          <form onSubmit={submit}>
            <label>
              Yönetici parolası
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                maxLength={256}
              />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="button" disabled={busy}>
              {busy ? "Giriş yapılıyor…" : "Panele giriş yap ↗"}
            </button>
          </form>
        ) : (
          <div className="setup-notice">
            <p>
              İlk yönetici hesabını oluşturmak için projenin terminalinde şu
              komutu çalıştırın:
            </p>
            <code>npm run admin:setup</code>
            <p>
              Parola terminalde gizli girilir. Ardından bu sayfayı yenileyin.
            </p>
          </div>
        )}
        <Link href="/" className="text-link">
          ← Siteye dön
        </Link>
      </div>
    </main>
  );
}
function slugify(text: string) {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function Field({
  label,
  value,
  onChange,
  area = false,
  type = "text",
  hint = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  area?: boolean;
  type?: string;
  hint?: string;
}) {
  return (
    <label>
      {label}
      {area ? (
        <textarea
          aria-label={label || "Yazı içeriği"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
        />
      ) : (
        <input
          aria-label={label}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}{" "}
      {hint && <small>{hint}</small>}
    </label>
  );
}
function Upload({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.set("file", file);
      const r = await fetch("/api/admin/upload", {
          method: "POST",
          body: form,
        }),
        j = await r.json();
      if (!r.ok) throw new Error(j.error);
      onChange(j.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yüklenemedi.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="admin-upload">
      <Field label="Kapak görseli" value={value} onChange={onChange} />
      <label className="button outline small">
        {busy ? "Yükleniyor…" : "Görsel yükle"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          onChange={(e) => {
            if (e.target.files?.[0]) void upload(e.target.files[0]);
          }}
        />
      </label>
      {value && (
        <img src={value} alt="Görsel önizlemesi" width="140" height="100" />
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
type Tab = "overview" | "blog" | "projects" | "services" | "leads" | "settings";
const tabs: [Tab, string, string][] = [
  ["overview", "Genel bakış", "◈"],
  ["blog", "Blog & SEO", "✎"],
  ["projects", "Projeler", "▦"],
  ["services", "Hizmetler", "↗"],
  ["leads", "Teklif talepleri", "▤"],
  ["settings", "Site ayarları", "⚙"],
];
export function AdminPanel({
  initialContent,
  initialLeads,
}: {
  initialContent: Content;
  initialLeads: Lead[];
}) {
  const [content, setContent] = useState(initialContent),
    [leads, setLeads] = useState(initialLeads),
    [tab, setTab] = useState<Tab>("overview"),
    [selected, setSelected] = useState(""),
    [busy, setBusy] = useState(false),
    [notice, setNotice] = useState(""),
    [error, setError] = useState(""),
    [dirty, setDirty] = useState(false),
    [preview, setPreview] = useState(false);
  function change(next: Content) {
    setContent(next);
    setDirty(true);
    setNotice("");
  }
  function settings(key: keyof Settings, value: unknown) {
    const next = { ...content.settings, [key]: value };
    if (Object.hasOwn(sampleContacts, key)) {
      next.sampleContactFields = (next.sampleContactFields ?? []).filter(
        (field) => field !== key,
      );
    }
    if (key === "showreelUrl") next.showreelDemo = value === "/showreel";
    if (key === "experienceYears") next.experienceDemo = false;
    change({ ...content, settings: next });
  }
  function article(key: keyof Article, value: unknown) {
    change({
      ...content,
      articles: content.articles.map((a) =>
        a.id === selected ? { ...a, [key]: value } : a,
      ),
    });
  }
  function project(key: keyof Project, value: unknown) {
    change({
      ...content,
      projects: content.projects.map((p) =>
        p.id === selected ? { ...p, [key]: value } : p,
      ),
    });
  }
  function service(key: keyof Service, value: unknown) {
    change({
      ...content,
      services: content.services.map((s) =>
        s.slug === selected ? { ...s, [key]: value } : s,
      ),
    });
  }
  async function save() {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const r = await fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(content),
        }),
        j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setDirty(false);
      setNotice(
        "Değişiklikler kaydedildi. Yayındaki içerikler sitede güncellendi.",
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kaydedilemedi.");
    } finally {
      setBusy(false);
    }
  }
  function addArticle() {
    const id = crypto.randomUUID();
    change({
      ...content,
      articles: [
        {
          id,
          slug: `yeni-yazi-${id.slice(0, 8)}`,
          title: "Yeni yazı",
          category: "Stüdyodan notlar",
          summary: "",
          body: "",
          image: "/images/studio.svg",
          date: new Date().toISOString().slice(0, 10),
          seoTitle: "",
          seoDescription: "",
          published: false,
        },
        ...content.articles,
      ],
    });
    setSelected(id);
    setPreview(false);
  }
  function addProject() {
    const id = crypto.randomUUID();
    change({
      ...content,
      projects: [
        {
          id,
          slug: `yeni-proje-${id.slice(0, 8)}`,
          title: "Yeni proje",
          client: "Marka adı",
          category: "Marka kimliği",
          image: "/images/forma.svg",
          year: String(new Date().getFullYear()),
          summary: "",
          need: "",
          solution: "",
          before: "",
          after: "",
          gallery: [],
          videoUrl: "",
          demo: false,
          published: false,
        },
        ...content.projects,
      ],
    });
    setSelected(id);
  }
  function remove(kind: "articles" | "projects", id: string) {
    if (
      !window.confirm(
        "Bu içerik silinsin mi? Silmeyi kalıcı yapmak için değişiklikleri kaydedin.",
      )
    )
      return;
    change({ ...content, [kind]: content[kind].filter((x) => x.id !== id) });
    setSelected("");
  }
  async function status(id: string, value: string) {
    try {
      const r = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: value }),
      });
      if (!r.ok) throw new Error();
      setLeads(leads.map((l) => (l.id === id ? { ...l, status: value } : l)));
    } catch {
      setError("Talep durumu güncellenemedi.");
    }
  }
  async function refreshLeads() {
    try {
      const r = await fetch("/api/admin/leads");
      if (!r.ok) throw new Error();
      setLeads(await r.json());
    } catch {
      setError("Talepler yüklenemedi.");
    }
  }
  const a = content.articles.find((a) => a.id === selected),
    p = content.projects.find((p) => p.id === selected),
    s = content.services.find((s) => s.slug === selected);
  return (
    <main id="main-content" className="admin-shell">
      <aside className="admin-sidebar">
        <Brand />
        <span className="eyebrow">STÜDYO YÖNETİMİ</span>
        <nav>
          {tabs.map(([key, label, icon]) => (
            <button
              key={key}
              className={tab === key ? "active" : ""}
              onClick={() => {
                setTab(key);
                setSelected("");
                setPreview(false);
                setError("");
                if (key === "leads") void refreshLeads();
              }}
            >
              <span>{icon}</span>
              {label}
              {key === "leads" &&
                leads.filter((l) => l.status === "Yeni").length > 0 && (
                  <b>{leads.filter((l) => l.status === "Yeni").length}</b>
                )}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link href="/" target="_blank">
            Siteyi görüntüle ↗
          </Link>
          <button
            onClick={async () => {
              if (
                dirty &&
                !window.confirm(
                  "Kaydedilmemiş değişiklikler var. Çıkış yapılsın mı?",
                )
              )
                return;
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.reload();
            }}
          >
            Çıkış yap
          </button>
        </div>
      </aside>
      <section className="admin-workspace">
        <header className="admin-header">
          <div>
            <span className="eyebrow">CONTRAST / YÖNETİM</span>
            <h1>{tabs.find((t) => t[0] === tab)?.[1]}</h1>
          </div>
          <div>
            {dirty && (
              <span className="unsaved">Kaydedilmemiş değişiklikler</span>
            )}
            <button
              className="button small"
              onClick={save}
              disabled={busy || !dirty}
            >
              {busy ? "Kaydediliyor…" : "Değişiklikleri kaydet"}
            </button>
          </div>
        </header>
        {notice && (
          <div className="admin-notice" role="status">
            {notice}
          </div>
        )}
        {error && (
          <div className="form-error admin-notice" role="alert">
            {error}
          </div>
        )}
        {tab === "overview" && (
          <>
            <div className="admin-stats">
              {[
                [
                  String(content.articles.filter((a) => a.published).length),
                  "Yayındaki yazı",
                ],
                [
                  String(content.projects.filter((p) => p.published).length),
                  "Yayındaki proje",
                ],
                [
                  String(leads.filter((l) => l.status === "Yeni").length),
                  "Yeni teklif talebi",
                ],
              ].map(([n, l]) => (
                <div key={l}>
                  <span>{n}</span>
                  <p>{l}</p>
                </div>
              ))}
            </div>
            <div className="admin-card">
              <h2>İyi fikirleri güncel tutun.</h2>
              <p>
                Blogdan yeni bir içerik yayınlayın, proje hikâyelerinizi ekleyin
                veya gelen talepleri değerlendirin. Yaptığınız değişiklikleri
                sağ üstteki düğmeyle kaydedin.
              </p>
              <div className="admin-quick">
                <button
                  className="button outline"
                  onClick={() => {
                    setTab("blog");
                    addArticle();
                  }}
                >
                  Yeni blog yazısı +
                </button>
                <button
                  className="button outline"
                  onClick={() => {
                    setTab("projects");
                    addProject();
                  }}
                >
                  Yeni proje +
                </button>
              </div>
            </div>
            <div className="admin-card checklist">
              <h2>Yayın öncesi kontrol</h2>
              {[
                [!!content.settings.siteUrl, "Gerçek HTTPS alan adı"],
                [
                  !!content.settings.email &&
                    !!content.settings.phone &&
                    !isSampleContact(content.settings, "email") &&
                    !isSampleContact(content.settings, "phone"),
                  "İletişim bilgileri",
                ],
                [
                  content.projects.some((p) => !p.demo && p.published),
                  "Gerçek proje ve referanslar",
                ],
              ].map(([ok, label]) => (
                <p key={String(label)}>
                  <span>{ok ? "✓" : "○"}</span>
                  {label}
                </p>
              ))}
              <p>
                <span>○</span>KVKK ve gizlilik metinlerinin işletmeye göre
                tamamlanması
              </p>
            </div>
          </>
        )}
        {tab === "blog" && (
          <div className="admin-editor-layout">
            <div className="admin-content-list">
              <button className="button small" onClick={addArticle}>
                Yeni yazı +
              </button>
              {content.articles.map((item) => (
                <button
                  key={item.id}
                  className={selected === item.id ? "selected" : ""}
                  onClick={() => {
                    setSelected(item.id);
                    setPreview(false);
                  }}
                >
                  <strong>{item.title}</strong>
                  <span>
                    {item.published ? "Yayında" : "Taslak"} · {item.category}
                  </span>
                </button>
              ))}
            </div>
            {a ? (
              <div className="admin-card editor">
                <div className="editor-top">
                  <h2>Yazı editörü</h2>
                  <button
                    className="danger-link"
                    onClick={() => remove("articles", a.id)}
                  >
                    Yazıyı sil
                  </button>
                </div>
                <Field
                  label="Başlık"
                  value={a.title}
                  onChange={(v) => article("title", v)}
                />
                <div className="slug-field">
                  <Field
                    label="URL / kısa ad"
                    value={a.slug}
                    onChange={(v) => article("slug", v)}
                    hint={`/blog/${a.slug}`}
                  />
                  <button
                    className="text-link"
                    onClick={() => article("slug", slugify(a.title))}
                  >
                    Başlıktan oluştur
                  </button>
                </div>
                <div className="form-grid">
                  <Field
                    label="Kategori"
                    value={a.category}
                    onChange={(v) => article("category", v)}
                  />
                  <Field
                    label="Tarih"
                    type="date"
                    value={a.date}
                    onChange={(v) => article("date", v)}
                  />
                </div>
                <Field
                  label="Kısa açıklama"
                  value={a.summary}
                  onChange={(v) => article("summary", v)}
                  area
                />
                <Upload value={a.image} onChange={(v) => article("image", v)} />
                <div className="editor-top">
                  <label>Yazı içeriği</label>
                  <button
                    className="text-link"
                    onClick={() => setPreview(!preview)}
                  >
                    {preview ? "Düzenle" : "Önizle"}
                  </button>
                </div>
                {preview ? (
                  <Prose text={a.body} />
                ) : (
                  <Field
                    label=""
                    value={a.body}
                    onChange={(v) => article("body", v)}
                    area
                    hint="Başlık için #, alt başlık için ##, liste için - kullanın. Paragrafları boş satırla ayırın."
                  />
                )}
                <div className="seo-box">
                  <h3>Arama motoru görünümü</h3>
                  <Field
                    label="SEO başlığı"
                    value={a.seoTitle}
                    onChange={(v) => article("seoTitle", v)}
                    hint={`${a.seoTitle.length} karakter · yaklaşık 50–60 önerilir`}
                  />
                  <Field
                    label="SEO açıklaması"
                    value={a.seoDescription}
                    onChange={(v) => article("seoDescription", v)}
                    area
                    hint={`${a.seoDescription.length} karakter · yaklaşık 140–160 önerilir`}
                  />
                  <div className="seo-preview">
                    <small>
                      {content.settings.siteUrl || "alanadiniz.com"}/blog/
                      {a.slug}
                    </small>
                    <strong>{a.seoTitle || a.title}</strong>
                    <p>{a.seoDescription || a.summary}</p>
                  </div>
                </div>
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={a.published}
                    onChange={(e) => article("published", e.target.checked)}
                  />
                  {a.published
                    ? "Yayında — kaydedildiğinde herkes görebilir"
                    : "Taslak — yalnızca yönetim panelinde görünür"}
                </label>
                {a.published && (
                  <Link
                    href={`/blog/${a.slug}`}
                    target="_blank"
                    className="text-link"
                  >
                    Sitede görüntüle ↗
                  </Link>
                )}
              </div>
            ) : (
              <div className="admin-card editor-empty">
                <h2>Bir fikir paylaşın.</h2>
                <p>Bir yazı seçin veya yeni bir taslak oluşturun.</p>
              </div>
            )}
          </div>
        )}
        {tab === "projects" && (
          <div className="admin-editor-layout">
            <div className="admin-content-list">
              <button className="button small" onClick={addProject}>
                Yeni proje +
              </button>
              {content.projects.map((item) => (
                <button
                  key={item.id}
                  className={selected === item.id ? "selected" : ""}
                  onClick={() => setSelected(item.id)}
                >
                  <strong>
                    {item.client} / {item.title}
                  </strong>
                  <span>
                    {item.published ? "Yayında" : "Taslak"}
                    {item.demo ? " · Konsept" : ""}
                  </span>
                </button>
              ))}
            </div>
            {p ? (
              <div className="admin-card editor">
                <div className="editor-top">
                  <h2>Proje hikâyesi</h2>
                  <button
                    className="danger-link"
                    onClick={() => remove("projects", p.id)}
                  >
                    Projeyi sil
                  </button>
                </div>
                <Field
                  label="Proje başlığı"
                  value={p.title}
                  onChange={(v) => project("title", v)}
                />
                <div className="form-grid">
                  <Field
                    label="Müşteri / marka"
                    value={p.client}
                    onChange={(v) => project("client", v)}
                  />
                  <Field
                    label="Yıl"
                    value={p.year}
                    onChange={(v) => project("year", v)}
                  />
                </div>
                <Field
                  label="URL / kısa ad"
                  value={p.slug}
                  onChange={(v) => project("slug", v)}
                />
                <Field
                  label="Yapılan çalışma / kategori"
                  value={p.category}
                  onChange={(v) => project("category", v)}
                />
                <Field
                  label="Kısa özet"
                  value={p.summary}
                  onChange={(v) => project("summary", v)}
                  area
                />
                <Upload value={p.image} onChange={(v) => project("image", v)} />
                <Field
                  label="Problem / ihtiyaç"
                  value={p.need}
                  onChange={(v) => project("need", v)}
                  area
                />
                <Field
                  label="Üretilen çözüm"
                  value={p.solution}
                  onChange={(v) => project("solution", v)}
                  area
                />
                <div className="form-grid">
                  <Field
                    label="Öncesi"
                    value={p.before}
                    onChange={(v) => project("before", v)}
                    area
                  />
                  <Field
                    label="Sonrası"
                    value={p.after}
                    onChange={(v) => project("after", v)}
                    area
                  />
                </div>
                <div className="gallery-editor">
                  <h3>Proje fotoğrafları</h3>
                  {p.gallery.map((url, i) => (
                    <div key={i}>
                      <Upload
                        value={url}
                        onChange={(v) =>
                          project(
                            "gallery",
                            p.gallery.map((x, j) => (j === i ? v : x)),
                          )
                        }
                      />
                      <button
                        className="danger-link"
                        onClick={() =>
                          project(
                            "gallery",
                            p.gallery.filter((_, j) => i !== j),
                          )
                        }
                      >
                        Kaldır
                      </button>
                    </div>
                  ))}
                  <button
                    className="button outline small"
                    onClick={() => project("gallery", [...p.gallery, ""])}
                  >
                    Görsel ekle +
                  </button>
                </div>
                <Field
                  label="Video bağlantısı"
                  value={p.videoUrl}
                  onChange={(v) => project("videoUrl", v)}
                  hint="YouTube, Vimeo veya HTTPS video bağlantısı"
                />
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={p.demo}
                    onChange={(e) => project("demo", e.target.checked)}
                  />
                  Bu bir konsept çalışma
                </label>
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={p.published}
                    onChange={(e) => project("published", e.target.checked)}
                  />
                  Projeyi yayınla
                </label>
              </div>
            ) : (
              <div className="admin-card editor-empty">
                <h2>İşinizin hikâyesini anlatın.</h2>
                <p>Bir proje seçin veya yeni bir case study oluşturun.</p>
              </div>
            )}
          </div>
        )}
        {tab === "services" && (
          <div className="admin-editor-layout">
            <div className="admin-content-list">
              {content.services.map((item) => (
                <button
                  key={item.slug}
                  className={selected === item.slug ? "selected" : ""}
                  onClick={() => setSelected(item.slug)}
                >
                  <strong>{item.title}</strong>
                  <span>{item.group}</span>
                </button>
              ))}
            </div>
            {s ? (
              <div className="admin-card editor">
                <h2>Hizmet içeriği</h2>
                <Field
                  label="Hizmet adı"
                  value={s.title}
                  onChange={(v) => service("title", v)}
                />
                <Field
                  label="Kısa açıklama"
                  value={s.short}
                  onChange={(v) => service("short", v)}
                  area
                />
                <Field
                  label="Detaylı tanıtım"
                  value={s.intro}
                  onChange={(v) => service("intro", v)}
                  area
                />
                <Field
                  label="Sunulan işler"
                  value={s.items.join("\n")}
                  onChange={(v) => service("items", v.split("\n"))}
                  area
                  hint="Her satıra bir iş yazın."
                />
                <Field
                  label="Kimler için?"
                  value={s.audience || ""}
                  onChange={(v) => service("audience", v)}
                  area
                />
                <h3>Çalışma adımları</h3>
                {(s.process || []).map((step, index) => (
                  <div className="admin-inline-group" key={index}>
                    <Field
                      label={`${index + 1}. adım başlığı`}
                      value={step.title}
                      onChange={(v) =>
                        service(
                          "process",
                          s.process?.map((item, i) =>
                            i === index ? { ...item, title: v } : item,
                          ),
                        )
                      }
                    />
                    <Field
                      label={`${index + 1}. adım açıklaması`}
                      value={step.description}
                      onChange={(v) =>
                        service(
                          "process",
                          s.process?.map((item, i) =>
                            i === index ? { ...item, description: v } : item,
                          ),
                        )
                      }
                      area
                    />
                  </div>
                ))}
                <h3>Sık sorulan sorular</h3>
                {(s.faq || []).map((entry, index) => (
                  <div className="admin-inline-group" key={index}>
                    <Field
                      label={`${index + 1}. soru`}
                      value={entry.question}
                      onChange={(v) =>
                        service(
                          "faq",
                          s.faq?.map((item, i) =>
                            i === index ? { ...item, question: v } : item,
                          ),
                        )
                      }
                    />
                    <Field
                      label={`${index + 1}. yanıt`}
                      value={entry.answer}
                      onChange={(v) =>
                        service(
                          "faq",
                          s.faq?.map((item, i) =>
                            i === index ? { ...item, answer: v } : item,
                          ),
                        )
                      }
                      area
                    />
                    <button
                      className="button outline small"
                      type="button"
                      onClick={() =>
                        service(
                          "faq",
                          s.faq?.filter((_, i) => i !== index),
                        )
                      }
                    >
                      Soruyu kaldır
                    </button>
                  </div>
                ))}
                <button
                  className="button outline small"
                  type="button"
                  onClick={() =>
                    service("faq", [
                      ...(s.faq || []),
                      { question: "Yeni soru", answer: "Yanıtı buraya yazın." },
                    ])
                  }
                >
                  Soru ekle +
                </button>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  target="_blank"
                  className="text-link"
                >
                  Hizmet sayfasını görüntüle ↗
                </Link>
              </div>
            ) : (
              <div className="admin-card editor-empty">
                <h2>Hizmetlerinizi anlatın.</h2>
                <p>Düzenlemek için bir hizmet seçin.</p>
              </div>
            )}
          </div>
        )}
        {tab === "leads" && (
          <div className="leads-list">
            <div className="editor-top">
              <p>{leads.length} teklif talebi</p>
              <button className="button outline small" onClick={refreshLeads}>
                Yenile ↻
              </button>
            </div>
            {!leads.length && (
              <div className="admin-card">
                <h2>Yeni projeler için hazır.</h2>
                <p>Teklif formundan gelen talepler burada görünecek.</p>
              </div>
            )}
            {leads.map((l) => (
              <article className="admin-card lead-card" key={l.id}>
                <header>
                  <div>
                    <span className="eyebrow">
                      {new Date(l.createdAt).toLocaleString("tr-TR")}
                    </span>
                    <h2>{l.company}</h2>
                    <p>{l.name}</p>
                  </div>
                  <label>
                    Durum
                    <select
                      value={l.status}
                      onChange={(e) => void status(l.id, e.target.value)}
                    >
                      <option>Yeni</option>
                      <option>Görüşülüyor</option>
                      <option>Tamamlandı</option>
                    </select>
                  </label>
                </header>
                <div className="lead-info">
                  <a href={`mailto:${l.email}`}>{l.email}</a>
                  <a href={`tel:${l.phone.replace(/[^+\d]/g, "")}`}>
                    {l.phone}
                  </a>
                  <span>{l.budget}</span>
                  {l.startDate && <span>Başlangıç: {l.startDate}</span>}
                </div>
                <div className="lead-tags">
                  {l.services.map((slug) => (
                    <span key={slug}>
                      {content.services.find((s) => s.slug === slug)?.title ||
                        slug}
                    </span>
                  ))}
                </div>
                <p className="lead-message">{l.message}</p>
                {l.fileName && (
                  <a className="text-link" href={`/api/admin/files/${l.id}`}>
                    ↓ {l.fileName}
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
        {tab === "settings" && (
          <div className="admin-settings">
            <div className="admin-card editor">
              <h2>Marka & iletişim</h2>
              {(
                [
                  ["name", "Ajans adı"],
                  ["tagline", "Kısa slogan"],
                  ["description", "Site SEO açıklaması"],
                  ["phone", "Telefon"],
                  ["whatsapp", "WhatsApp numarası (ülke koduyla)"],
                  ["email", "E-posta"],
                  ["instagram", "Instagram bağlantısı"],
                  ["address", "Adres"],
                  ["hours", "Çalışma saatleri"],
                  ["mapUrl", "Google Maps bağlantısı"],
                  ["showreelUrl", "Showreel video bağlantısı"],
                ] as [keyof Settings, string][]
              ).map(([key, label]) => (
                <Field
                  key={key}
                  label={label}
                  value={String(content.settings[key])}
                  onChange={(v) => settings(key, v)}
                  hint={
                    Object.hasOwn(sampleContacts, key) &&
                    isSampleContact(content.settings, key as ContactField)
                      ? "Örnek bilgi. Kendi bilginizi yazdığınızda örnek etiketi kaldırılır."
                      : key === "showreelUrl"
                        ? "Hazır konsept video için /showreel; kendi videonuz için HTTPS bağlantısı."
                        : undefined
                  }
                />
              ))}
              <Field
                label="Tasarım ve üretim deneyimi (yıl)"
                value={content.settings.experienceYears ?? ""}
                onChange={(v) => settings("experienceYears", v)}
                hint={
                  content.settings.experienceDemo
                    ? "Örnek bilgi. Gerçek yılı yazdığınızda örnek etiketi kaldırılır."
                    : "Boş bırakılırsa ana sayfada deneyim yılı gösterilmez."
                }
              />
              <Field
                label="Ajans hikâyesi"
                value={content.settings.about}
                onChange={(v) => settings("about", v)}
                area
              />
              <Field
                label="Ekip tanıtımı"
                value={content.settings.team}
                onChange={(v) => settings("team", v)}
                area
              />
            </div>
            <div>
              <div className="admin-card editor">
                <h2>SEO & ölçüm</h2>
                <Field
                  label="Gerçek site adresi (HTTPS)"
                  value={content.settings.siteUrl}
                  onChange={(v) => settings("siteUrl", v)}
                  hint="Alan adınız bağlandığında doldurun. Boşken arama motoru indekslemesi kapalıdır."
                />
                <Field
                  label="Google Analytics kimliği"
                  value={content.settings.gaId}
                  onChange={(v) => settings("gaId", v)}
                  hint="G-XXXXXXXXXX · Kullanıcı onayından sonra yüklenir."
                />
                <Field
                  label="Meta Pixel kimliği"
                  value={content.settings.pixelId}
                  onChange={(v) => settings("pixelId", v)}
                  hint="Sayısal Pixel ID · Kullanıcı onayından sonra yüklenir."
                />
                <Field
                  label="Google Search Console doğrulama kodu"
                  value={content.settings.searchConsoleId}
                  onChange={(v) => settings("searchConsoleId", v)}
                />
              </div>
              <div className="admin-card editor">
                <h2>Çalışılan markalar</h2>
                {content.settings.clients.map((c, i) => (
                  <div className="repeater-item" key={i}>
                    <Field
                      label="Marka adı"
                      value={c.name}
                      onChange={(v) =>
                        settings(
                          "clients",
                          content.settings.clients.map((x, j) =>
                            j === i ? { ...x, name: v } : x,
                          ),
                        )
                      }
                    />
                    <Upload
                      value={c.logo}
                      onChange={(v) =>
                        settings(
                          "clients",
                          content.settings.clients.map((x, j) =>
                            j === i ? { ...x, logo: v } : x,
                          ),
                        )
                      }
                    />
                    <label className="admin-check">
                      <input
                        type="checkbox"
                        checked={Boolean(c.demo)}
                        onChange={(e) =>
                          settings(
                            "clients",
                            content.settings.clients.map((x, j) =>
                              j === i ? { ...x, demo: e.target.checked } : x,
                            ),
                          )
                        }
                      />
                      Örnek referans etiketi
                    </label>
                    <button
                      className="danger-link"
                      onClick={() =>
                        settings(
                          "clients",
                          content.settings.clients.filter((_, j) => j !== i),
                        )
                      }
                    >
                      Markayı kaldır
                    </button>
                  </div>
                ))}
                <button
                  className="button outline small"
                  onClick={() =>
                    settings("clients", [
                      ...content.settings.clients,
                      { name: "Yeni marka", logo: "" },
                    ])
                  }
                >
                  Marka ekle +
                </button>
              </div>
              <div className="admin-card editor">
                <h2>Müşteri yorumları</h2>
                {content.settings.testimonials.map((t, i) => (
                  <div className="repeater-item" key={i}>
                    {(["name", "company", "text"] as const).map((key) => (
                      <Field
                        key={key}
                        label={
                          { name: "Ad soyad", company: "Firma", text: "Yorum" }[
                            key
                          ]
                        }
                        value={t[key]}
                        onChange={(v) =>
                          settings(
                            "testimonials",
                            content.settings.testimonials.map((x, j) =>
                              j === i ? { ...x, [key]: v } : x,
                            ),
                          )
                        }
                        area={key === "text"}
                      />
                    ))}
                    <label className="admin-check">
                      <input
                        type="checkbox"
                        checked={Boolean(t.demo)}
                        onChange={(e) =>
                          settings(
                            "testimonials",
                            content.settings.testimonials.map((x, j) =>
                              j === i ? { ...x, demo: e.target.checked } : x,
                            ),
                          )
                        }
                      />
                      Örnek yorum · kurgu etiketi
                    </label>
                    <button
                      className="danger-link"
                      onClick={() =>
                        settings(
                          "testimonials",
                          content.settings.testimonials.filter(
                            (_, j) => j !== i,
                          ),
                        )
                      }
                    >
                      Yorumu kaldır
                    </button>
                  </div>
                ))}
                <button
                  className="button outline small"
                  onClick={() =>
                    settings("testimonials", [
                      ...content.settings.testimonials,
                      { name: "Yeni yorum", company: "", text: "" },
                    ])
                  }
                >
                  Yorum ekle +
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
