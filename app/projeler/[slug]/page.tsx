import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro } from "@/components/cards";
import { Arrow } from "@/components/icons";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getContent().projects.find((p) => p.slug === slug && p.published);
  return p
    ? metadata(
        `${p.client} — ${p.category}`,
        p.summary,
        `/projeler/${slug}`,
        p.image,
      )
    : {};
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getContent().projects.find((p) => p.slug === slug && p.published);
  if (!p) notFound();
  return (
    <>
      <PageIntro
        label={`${p.client} / ${p.category}`}
        title={p.title}
        description={p.summary}
      />
      <section className="container">
        <div className="case-meta">
          <div>
            <span>MÜŞTERİ / KONSEPT</span>
            <strong>{p.client}</strong>
          </div>
          <div>
            <span>YAPILAN ÇALIŞMA</span>
            <strong>{p.category}</strong>
          </div>
          <div>
            <span>YIL</span>
            <strong>{p.year}</strong>
          </div>
          {p.demo && (
            <span className="tag">
              Konsept çalışma · Gerçek müşteri projesi değildir
            </span>
          )}
        </div>
        <img
          className="case-cover"
          src={p.image}
          alt={`${p.client} ${p.category}`}
          width="1400"
          height="1000"
        />
      </section>
      <section className="container section case-story">
        <div>
          <span className="eyebrow">01 — İHTİYAÇ</span>
          <h2>Başlangıç noktası.</h2>
          <p>{p.need}</p>
        </div>
        <div>
          <span className="eyebrow">02 — ÇÖZÜM</span>
          <h2>Fikri görünür kılmak.</h2>
          <p>{p.solution}</p>
        </div>
      </section>
      <section className="container before-after">
        <div>
          <span className="eyebrow">ÖNCESİ</span>
          <p>{p.before}</p>
        </div>
        <div>
          <span className="eyebrow">SONRASI</span>
          <p>{p.after}</p>
        </div>
      </section>
      <section className="container section case-gallery">
        {p.gallery.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${p.client} proje detayı ${i + 1}`}
            width="1400"
            height="1000"
            loading="lazy"
          />
        ))}
        {p.videoUrl && (
          <a
            href={p.videoUrl}
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Proje videosunu izle <Arrow diagonal />
          </a>
        )}
        <Link href="/projeler" className="text-link">
          ← Tüm projelere dön
        </Link>
      </section>
    </>
  );
}
