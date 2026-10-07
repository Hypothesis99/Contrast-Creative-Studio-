import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/store";
import { metadata, JsonLd, publicUrl } from "@/lib/seo";
import { PageIntro, ProjectCard } from "@/components/cards";
import { Arrow } from "@/components/icons";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getContent().services.find((x) => x.slug === slug);
  return s
    ? metadata(
        s.title,
        `${s.short} Bursa ve Orhangazi için Contrast Creative Studio çözümleri.`,
        `/hizmetler/${s.slug}`,
      )
    : {};
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getContent(),
    s = content.services.find((x) => x.slug === slug);
  if (!s) notFound();
  const url = publicUrl();
  return (
    <>
      {url && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.intro,
            provider: { "@type": "Organization", name: content.settings.name },
            areaServed: ["Bursa", "Orhangazi"],
            url: `${url}/hizmetler/${s.slug}`,
          }}
        />
      )}
      <PageIntro
        label={`${s.number} — ${s.group}`}
        title={s.title}
        description={s.short}
      />
      <section className="container detail-grid section">
        <div>
          <span className="eyebrow">İYİ BİR BAŞLANGIÇ</span>
          <h2>
            Hedefinizi anlayalım.
            <br />
            Doğru fikri üretelim.
          </h2>
          <p>{s.intro}</p>
          <Link href={`/teklif-al?hizmet=${s.slug}`} className="button">
            Bu hizmet için teklif al <Arrow diagonal />
          </Link>
        </div>
        <div className="deliverables">
          <h3>Neler sunuyoruz?</h3>
          {s.items.map((item, i) => (
            <div key={item}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="container section">
        <span className="eyebrow">NASIL ÇALIŞIYORUZ?</span>
        <div className="process-grid">
          {[
            [
              "01",
              "Dinleriz",
              "Markanızı, hedefinizi ve beklentinizi tanırız.",
            ],
            [
              "02",
              "Düşünürüz",
              "İhtiyacınıza uygun stratejiyi ve yaratıcı yönü belirleriz.",
            ],
            [
              "03",
              "Üretiriz",
              "Fikri somutlaştırır, birlikte değerlendiririz.",
            ],
            [
              "04",
              "Geliştiririz",
              "Teslimden sonra da sonraki adımı birlikte düşünürüz.",
            ],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <h2>
            Fikirlerin hayata
            <br />
            geçtiği yer.
          </h2>
          <Link href="/projeler" className="text-link">
            Projeleri incele <Arrow diagonal />
          </Link>
        </div>
        <div className="project-grid">
          {content.projects
            .filter((x) => x.published)
            .slice(0, 2)
            .map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
        </div>
      </section>
    </>
  );
}
