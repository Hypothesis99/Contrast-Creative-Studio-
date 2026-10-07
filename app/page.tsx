import Link from "next/link";
import { getContent } from "@/lib/store";
import { metadata, JsonLd, publicUrl } from "@/lib/seo";
import { Arrow, Star } from "@/components/icons";
import { ProjectCard, ArticleCard } from "@/components/cards";
export function generateMetadata() {
  return metadata(
    "Contrast Creative Studio — Bursa Reklam & Tasarım Ajansı",
    "Bursa ve Orhangazi’de marka kimliği, sosyal medya, web tasarımı ve prodüksiyon. Markanızı unutulmaz kılacak fikirler için tanışalım.",
    "/",
  );
}
export default function Home() {
  const { settings: s, projects, services, articles } = getContent();
  const url = publicUrl();
  return (
    <>
      {url && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: s.name,
            url,
            description: s.description,
            ...(s.phone ? { telephone: s.phone } : {}),
            ...(s.email ? { email: s.email } : {}),
            areaServed: ["Bursa", "Orhangazi"],
          }}
        />
      )}
      <section className="hero container">
        <div className="hero-topline">
          <span>
            <i className="live-dot" /> BAĞIMSIZ FİKİRLER. GÜÇLÜ MARKALAR.
          </span>
          <span>BURSA · ORHANGAZİ · HER YERDE</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              Görünür değil,
              <br />
              <span>unutulmaz.</span>
              <Star className="hero-star" />
            </h1>
            <p>
              Markanızı görünür değil, unutulmaz hale getiriyoruz. Strateji,
              tasarım ve yaratıcı üretimle hikâyenize yeni bir perspektif
              katıyoruz.
            </p>
            <div className="hero-actions">
              <Link href="/projeler" className="button">
                Projelerimizi incele <Arrow diagonal />
              </Link>
              <Link href="/teklif-al" className="text-link">
                Projenizi konuşalım <Arrow />
              </Link>
            </div>
            <div className="hero-note">
              <span>01 / YENİ BİR PERSPEKTİF</span>
              <span>SCROLL TO DISCOVER ↓</span>
            </div>
          </div>
          <Link
            href={s.showreelUrl || "/projeler"}
            className="hero-art"
            {...(s.showreelUrl
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <img
              src="/images/studio.svg"
              alt="Contrast’ın turuncu, siyah ve krem tonlarından oluşan yaratıcı tasarım kompozisyonu"
              width="760"
              height="820"
              fetchPriority="high"
            />
            <span className="art-top">FİKİR + TASARIM + ETKİ</span>
            <span className="art-bottom">
              <span className="play-icon">{s.showreelUrl ? "▶" : "↗"}</span>
              <span>
                {s.showreelUrl
                  ? "Studio showreel"
                  : "Yaratıcı dünyamızı keşfet"}
                <small>
                  {s.showreelUrl ? "HİKÂYEMİZİ İZLEYİN" : "TASARIM KONSEPTLERİ"}
                </small>
              </span>
            </span>
          </Link>
        </div>
      </section>
      <div className="ticker" aria-hidden="true">
        <div>
          İYİ FİKİRLER <Star /> GÜÇLÜ KONTRASTLAR <Star /> BİRLİKTE FARK
          YARATALIM <Star /> İYİ FİKİRLER <Star />
        </div>
      </div>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 — NELER YAPIYORUZ?</span>
            <h2>
              Tek bir bakış açısı.
              <br />
              <span className="muted">Birçok yaratıcı çözüm.</span>
            </h2>
          </div>
          <p>
            Bir logodan çok daha fazlası.
            <br />
            Markanızın ihtiyaç duyduğu her noktada
            <br />
            aynı tutkuyla üretiyoruz.
          </p>
        </div>
        <div className="service-groups">
          {[
            ["01", "Marka & tasarım", "Bir karakter oluşturuyoruz.", "Tasarım"],
            [
              "02",
              "Dijital & iletişim",
              "Doğru insanlara ulaşıyoruz.",
              "Dijital",
            ],
            [
              "03",
              "Fotoğraf & video",
              "Hikâyenizi canlandırıyoruz.",
              "Prodüksiyon",
            ],
          ].map(([n, title, desc, group]) => (
            <div className="service-group" key={group}>
              <div className="service-group-top">
                <span>{n}</span>
                <Arrow diagonal />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div>
                {services
                  .filter((x) => x.group === group)
                  .map((x) => (
                    <Link href={`/hizmetler/${x.slug}`} key={x.slug}>
                      {x.title}
                      <span>↗</span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section projects-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 — SEÇİLİ PROJELER</span>
              <h2>
                İşimiz, kendini
                <br />
                <span className="serif">anlatır.</span>
              </h2>
            </div>
            <Link className="text-link" href="/projeler">
              Tüm projeler <Arrow diagonal />
            </Link>
          </div>
          <div className="project-grid">
            {projects
              .filter((x) => x.published)
              .slice(0, 4)
              .map((p, i) => (
                <ProjectCard project={p} key={p.id} index={i} />
              ))}
          </div>
        </div>
      </section>
      <section className="brands-section container">
        <span className="eyebrow">
          GÜZEL İŞLER, GÜÇLÜ İŞ BİRLİKLERİYLE BAŞLAR.
        </span>
        {s.clients.length ? (
          <div className="brand-logos">
            {s.clients.map((c) => (
              <span key={c.name}>
                {c.logo ? (
                  <img
                    src={c.logo}
                    alt={c.name}
                    width="150"
                    height="60"
                    loading="lazy"
                  />
                ) : (
                  c.name
                )}
              </span>
            ))}
          </div>
        ) : (
          <div className="brand-invitation">
            <span>Yeni hikâyelere yer açıyoruz.</span>
            <Link href="/teklif-al">
              Sıradaki marka sizin olsun <Arrow diagonal />
            </Link>
          </div>
        )}
      </section>
      <section className="about-section">
        <div className="container about-grid">
          <div>
            <span className="eyebrow light">03 — BİZ KİMİZ?</span>
            <h2>
              Farklı düşünürüz.
              <br />
              Birlikte <span className="serif">üretiriz.</span>
            </h2>
            <Star className="about-star" />
          </div>
          <div>
            <p className="large-copy">İyi tasarım, iyi bir soruyla başlar.</p>
            <p>{s.about}</p>
            <Link href="/hakkimizda" className="text-link light-link">
              Bizi biraz daha tanıyın <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container quote-section">
        <span className="eyebrow">
          04 — İYİ İŞLERİN ARDINDA İYİ İLİŞKİLER VAR.
        </span>
        {s.testimonials.length ? (
          <>
            <blockquote>“{s.testimonials[0].text}”</blockquote>
            <p>
              {s.testimonials[0].name}
              <span> / {s.testimonials[0].company}</span>
            </p>
          </>
        ) : (
          <>
            <blockquote>
              “İyi bir iş, önce birbirini
              <br />
              anlamakla başlar.”
            </blockquote>
            <p>Contrast’ın çalışma anlayışı</p>
          </>
        )}
      </section>
      <section className="section blog-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">05 — STÜDYODAN NOTLAR</span>
              <h2>
                Biraz fikir.
                <br />
                <span className="muted">Biraz ilham.</span>
              </h2>
            </div>
            <Link className="text-link" href="/blog">
              Tüm içerikler <Arrow diagonal />
            </Link>
          </div>
          <div className="article-grid">
            {articles
              .filter((a) => a.published)
              .slice(0, 3)
              .map((a) => (
                <ArticleCard article={a} key={a.id} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
