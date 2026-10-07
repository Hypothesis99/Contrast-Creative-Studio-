import Link from "next/link";
import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro, ProjectCard } from "@/components/cards";
import { Process } from "@/components/editorial";
export function generateMetadata() {
  return metadata(
    "Referanslar",
    "Contrast Creative Studio iş birlikleri, müşteri yorumları ve proje hikâyeleri.",
    "/referanslar",
  );
}
export default function References() {
  const content = getContent(),
    s = content.settings,
    projects = content.projects.filter((p) => p.published && !p.demo),
    concepts = content.projects.filter((p) => p.published && p.demo);
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
              <span className="reference-brand" key={c.name}>
                {c.logo ? (
                  <img src={c.logo} alt={c.name} width="180" height="70" />
                ) : (
                  c.name
                )}
                {c.demo && (
                  <small className="eyebrow sample-label">Örnek referans</small>
                )}
              </span>
            ))}
          </div>
        )}
        {s.testimonials.map((t, i) => (
          <div className="testimonial" key={i}>
            {t.demo && (
              <span className="eyebrow sample-label">Örnek yorum · kurgu</span>
            )}
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
        {!projects.length && concepts.length > 0 && (
          <>
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  YARATICI YAKLAŞIMIMIZDAN ÖRNEKLER
                </span>
                <h2>
                  Farklı ihtiyaçlar.
                  <br />
                  Ortak bir özen.
                </h2>
              </div>
              <p>
                Aşağıdaki çalışmalar konsept örneklerdir.
                <br />
                Gerçek müşteri referansı olarak sunulmaz.
              </p>
            </div>
            <div className="project-grid">
              {concepts.slice(0, 4).map((p, index) => (
                <ProjectCard project={p} key={p.id} index={index} />
              ))}
            </div>
          </>
        )}
      </section>
      <section className="section disciplines-section">
        <div className="container">
          <span className="eyebrow">İYİ İŞ BİRLİĞİNİN TEMELİ</span>
          <h2>
            Birlikte çalışırken
            <br />
            neyi önemsiyoruz?
          </h2>
          <Process
            steps={[
              {
                title: "Ortak hedef",
                description:
                  "Önce neyi çözmek istediğimizi konuşur, çalışmayı bu hedef etrafında kurarız.",
              },
              {
                title: "Açık kapsam",
                description:
                  "Teslimleri, takvimi ve sorumlulukları baştan anlaşılır bir çerçeveye alırız.",
              },
              {
                title: "Düzenli iletişim",
                description:
                  "Önemli karar noktalarında görüşür, geri bildirimleri birlikte değerlendiririz.",
              },
              {
                title: "Kullanılabilir sonuç",
                description:
                  "İşleri doğru dosyalar ve gerekli kullanım bilgileriyle teslim etmeyi önemseriz.",
              },
            ]}
          />
        </div>
      </section>
      <section className="container section detail-grid">
        <div>
          <span className="eyebrow">SİZİN MARKANIZ İÇİN</span>
          <h2>
            Yeni bir hikâyeyi
            <br />
            birlikte yazalım.
          </h2>
        </div>
        <div>
          <p>
            Bir kimlik yenilemesi, düzenli içerik üretimi veya yeni bir
            kampanya. İhtiyacınızı anlatarak başlayın; hangi hizmetlerin
            birlikte çalışması gerektiğini değerlendirelim.
          </p>
          <Link href="/teklif-al" className="button">
            Projenizi konuşalım ↗
          </Link>
        </div>
      </section>
    </>
  );
}
