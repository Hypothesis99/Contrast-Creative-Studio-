import Link from "next/link";
import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro, ProjectCard } from "@/components/cards";
export function generateMetadata() {
  return metadata(
    "Referanslar",
    "Contrast Creative Studio iş birlikleri, müşteri yorumları ve proje hikâyeleri.",
    "/referanslar",
  );
}
export default function References() {
  const s = getContent().settings,
    projects = getContent().projects.filter((p) => p.published && !p.demo);
  return (
    <>
      <PageIntro
        label="BİRLİKTE DAHA GÜÇLÜ."
        title="Güçlü işler, iyi ilişkiler."
        description="Her yeni iş birliğinde ortak bir hedef, açık bir iletişim ve iyi bir fikir arıyoruz."
      />
      <section className="container section top-zero">
        {s.clients.length > 0 && (
          <div className="brand-logos">
            {s.clients.map((c) => (
              <span key={c.name}>
                {c.logo ? (
                  <img src={c.logo} alt={c.name} width="180" height="70" />
                ) : (
                  c.name
                )}
              </span>
            ))}
          </div>
        )}
        {s.testimonials.map((t, i) => (
          <div className="testimonial" key={i}>
            <blockquote>“{t.text}”</blockquote>
            <p>
              {t.name} / {t.company}
            </p>
          </div>
        ))}
        {projects.length > 0 && (
          <div className="project-grid">
            {projects.map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
          </div>
        )}
        {!s.clients.length && !s.testimonials.length && !projects.length && (
          <div className="empty-feature">
            <h2>
              Yeni hikâyelere
              <br />
              birlikte başlayalım.
            </h2>
            <p>
              Yaratıcı yaklaşımımızı konsept çalışmalarımızda keşfedin. Kendi
              markanız için neler yapabileceğimizi konuşalım.
            </p>
            <Link href="/projeler" className="button">
              Konsept çalışmaları incele ↗
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
