import Link from "next/link";
import { getContent } from "@/lib/store";
import { metadata, JsonLd, publicUrl } from "@/lib/seo";
import { Arrow, Star } from "@/components/icons";
import { ProjectCard, ArticleCard } from "@/components/cards";
import { Process, Faq, Paragraphs } from "@/components/editorial";
import { QuoteForm } from "@/components/quote-form";
import { isSampleContact } from "@/lib/sample-content";
import { serviceGroups, featuredArticleSlugs } from "@/lib/brand-copy";

export function generateMetadata() {
  return metadata(
    "Contrast Creative Studio — Bursa Reklam & Tasarım Ajansı",
    "Marka, dijital ve prodüksiyon. Bursa / Orhangazi merkezli Contrast ile fikirden uygulamaya yaratıcı üretim.",
    "/",
  );
}
export default function Home() {
  const { settings: s, projects, services, articles } = getContent();
  const url = publicUrl();
  const published = projects.filter((p) => p.published);
  const actualProjects = published.filter((p) => !p.demo);
  const actualClients = s.clients.filter((c) => !c.demo);
  const featured = featuredArticleSlugs
    .map((slug) => articles.find((a) => a.slug === slug && a.published))
    .filter((a) => a !== undefined);
  const blogSelection = [
    ...featured,
    ...articles.filter(
      (a) => a.published && !featured.some((x) => x.id === a.id),
    ),
  ].slice(0, 3);
  const showreel = s.showreelUrl || "/showreel";
  const external = showreel.startsWith("https://");
  const whatsappDemo = isSampleContact(s, "whatsapp");
  const whatsapp = whatsappDemo
    ? "/iletisim#iletisim-bilgileri"
    : `https://wa.me/${s.whatsapp.replace(/\D/g, "")}`;
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
            ...(s.phone && !isSampleContact(s, "phone")
              ? { telephone: s.phone }
              : {}),
            ...(s.email && !isSampleContact(s, "email")
              ? { email: s.email }
              : {}),
            areaServed: ["Bursa", "Orhangazi"],
          }}
        />
      )}
      <section className="hero container">
        <div className="hero-topline">
          <span>
            <i className="live-dot" />
            {s.name.toLocaleUpperCase("tr-TR")}
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
            <p className="hero-lead">
              Markaları düşünüyor, tasarlıyor ve görünür hale getiriyoruz.
            </p>
            <p>
              Kimlikten dijitale, fotoğraftan videoya; markanızın ihtiyaç
              duyduğu yaratıcı üretimi tek bir fikir etrafında topluyoruz.
            </p>
            <div className="hero-actions">
              <Link href="/projeler" className="button">
                Projeleri İncele <Arrow />
              </Link>
              <Link href="#proje-formu" className="text-link">
                Bir Proje Konuşalım <Arrow />
              </Link>
            </div>
            <div className="hero-note">
              <span>BURSA · ORHANGAZİ · HER YERDE</span>
              <span>KEŞFETMEK İÇİN AŞAĞI ↓</span>
            </div>
          </div>
          <Link
            href={showreel}
            className="hero-art"
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <img
              src="/images/studio.svg"
              alt="Contrast’ın turuncu, siyah ve krem yaratıcı tasarım kompozisyonu"
              width="760"
              height="820"
              fetchPriority="high"
            />
            <span className="art-top">FİKİR + TASARIM + ETKİ</span>
            <span className="art-bottom">
              <span className="play-icon">▶</span>
              <span>
                {s.showreelDemo ? "Konsept showreel" : "Studio showreel"}
                <small>
                  {s.showreelDemo
                    ? "45 SANİYE / ÖRNEK ÇALIŞMA"
                    : "HİKÂYEMİZİ İZLEYİN"}
                </small>
              </span>
            </span>
          </Link>
        </div>
      </section>
      <div className="ticker" aria-hidden="true">
        <div>
          MARKA <Star /> DİJİTAL <Star /> PRODÜKSİYON <Star /> FİKİRDEN
          UYGULAMAYA <Star />
        </div>
      </div>
      <section className="studio-selection" id="showreel">
        <div className="container selection-grid">
          <div className="selection-copy">
            <span className="eyebrow light">SHOWREEL</span>
            <h2>
              {s.showreelDemo || !s.showreelUrl
                ? "45 saniyede Contrast."
                : "Contrast’tan bir seçki."}
            </h2>
            <p className="large-copy">Fikirden ekrana, kameradan sokağa.</p>
            <p>
              Marka kimliği, dijital tasarım, sosyal medya, fotoğraf, video ve
              fiziksel uygulamalardan seçtiğimiz işlere kısa bir bakış.
            </p>
            <Link
              href={showreel}
              className="text-link light-link"
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              ▶ Showreel’i İzle
            </Link>
            {s.showreelDemo && (
              <p className="showreel-sample">
                Örnek çalışma · Kurmaca markalar için konsept seçki
              </p>
            )}
          </div>
          <div className="selection-work">
            {!external ? (
              <video
                className="showreel-player"
                controls
                playsInline
                preload="none"
                poster="/videos/concept-showreel-poster.jpg"
                width="1280"
                height="720"
                aria-label="Contrast 45 saniyelik konsept showreel"
              >
                <source src="/videos/concept-showreel.mp4" type="video/mp4" />
                <a href="/showreel">Showreel’i açın</a>
              </video>
            ) : (
              <Link href={showreel} target="_blank" rel="noopener noreferrer">
                <img
                  src="/images/studio.svg"
                  alt="Contrast showreel’i izle"
                  width="760"
                  height="820"
                  loading="lazy"
                />
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="section container" id="hizmetler">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HİZMETLER</span>
            <h2>
              Tek bir marka.
              <br />
              <span className="muted">Her temas noktasında aynı fikir.</span>
            </h2>
          </div>
          <p>
            Bir markanın yalnızca logosunu değil, insanların onunla karşılaştığı
            bütün alanları düşünüyoruz.
          </p>
        </div>
        <div className="service-groups">
          {serviceGroups.map((group, i) => (
            <div className="service-group" key={group.id}>
              <div className="service-group-top">
                <span>
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {group.title.toLocaleUpperCase("tr-TR")}
                </span>
                <Arrow diagonal />
              </div>
              <h3>{group.headline}</h3>
              <p>{group.description}</p>
              <div>
                {group.links
                  .filter(([, slug]) => services.some((s) => s.slug === slug))
                  .map(([label, slug]) => (
                    <Link href={`/hizmetler/${slug}`} key={label}>
                      {label}
                      <span>↗</span>
                    </Link>
                  ))}
                <Link className="group-cta" href={`/hizmetler#${group.id}`}>
                  {group.cta}
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section projects-section" id="secili-projeler">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SEÇİLİ PROJELER</span>
              <h2>
                İşler <span className="serif">konuşsun.</span>
              </h2>
              <p>
                Her proje yeni bir problem, yeni bir fikir ve yeni bir görsel
                dünya.
              </p>
            </div>
            <p>
              Burada yalnızca ortaya çıkan tasarımı değil, arkasındaki düşünceyi
              de gösteriyoruz.
            </p>
          </div>
          <div className="project-grid">
            {published.slice(0, 4).map((p, i) => (
              <ProjectCard project={p} key={p.id} index={i} />
            ))}
          </div>
          <Link href="/projeler" className="text-link section-end-link">
            Tüm projeleri gör <Arrow />
          </Link>
        </div>
      </section>
      <section className="section container" id="rakamlarla-contrast">
        <span className="eyebrow">RAKAMLARLA CONTRAST</span>
        <h2>
          Tasarlıyoruz.
          <br />
          Üretiyoruz.
          <br />
          <span className="muted">Hayata geçiriyoruz.</span>
        </h2>
        <div className="studio-stats">
          <div>
            <strong>{actualProjects.length || published.length}</strong>
            <span>
              {actualProjects.length ? "Tamamlanan proje" : "Konsept proje"}
            </span>
          </div>
          <div>
            <strong>{actualClients.length || s.clients.length}</strong>
            <span>
              {actualClients.length
                ? "Birlikte çalışılan marka"
                : "Örnek marka"}
            </span>
          </div>
          {s.experienceYears && (
            <div>
              <strong>
                {s.experienceYears}+ <small>YIL</small>
              </strong>
              <span>Tasarım ve üretim deneyimi</span>
              {s.experienceDemo && (
                <small className="sample-inline">Örnek bilgi</small>
              )}
            </div>
          )}
          <div>
            <strong>360°</strong>
            <span>Marka, dijital ve prodüksiyon</span>
          </div>
        </div>
      </section>
      <section className="brands-section container" id="referanslar">
        <span className="eyebrow">REFERANSLAR</span>
        <h2>Birlikte ürettiklerimiz.</h2>
        <p>
          Farklı sektörlerden markalarla, farklı ölçeklerde projeler üzerinde
          çalışıyoruz.
        </p>
        <p>
          Her markaya aynı çözümü değil, ihtiyaç duyduğu fikri üretmeye
          inanıyoruz.
        </p>
        {s.clients.length ? (
          <div className="brand-logos">
            {s.clients.map((c) => (
              <span className="reference-brand" key={c.name}>
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
                {c.demo && (
                  <small className="eyebrow sample-label">Örnek referans</small>
                )}
              </span>
            ))}
          </div>
        ) : (
          <p className="content-note">Yeni iş birliklerine açık bir stüdyo.</p>
        )}
        <Link href="/referanslar" className="text-link">
          Referansları incele <Arrow />
        </Link>
      </section>
      <section className="about-section" id="hakkimizda">
        <div className="container about-grid">
          <div>
            <span className="eyebrow light">HAKKIMIZDA</span>
            <h2>
              İyi tasarım,
              <br />
              iyi bir soruyla <span className="serif">başlar.</span>
            </h2>
            <Star className="about-star" />
          </div>
          <div>
            <Paragraphs text={s.about} />
            <Link href="/hakkimizda" className="text-link light-link">
              Contrast’ı daha yakından tanıyın <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container detail-grid" id="yaklasimimiz">
        <div>
          <span className="eyebrow">YAKLAŞIMIMIZ</span>
          <h2>
            Güzel görünmesi yetmez.
            <br />
            <span className="muted">Bir nedeni olmalı.</span>
          </h2>
        </div>
        <div>
          <p>
            Trendleri takip ediyoruz ama yalnızca trend olduğu için
            kullanmıyoruz.
          </p>
          <p>
            Her renk, her tipografi, her kadraj ve her hareket markanın anlatmak
            istediği şeyin bir parçası olmalı.
          </p>
          <p>Çünkü bizim için iyi tasarım; yalnızca dikkat çekmez.</p>
          <div className="approach-words">
            <span>Anlatır.</span>
            <span>Hissettirir.</span>
            <span>Hatırlanır.</span>
          </div>
        </div>
      </section>
      <section className="section disciplines-section" id="calisma-sureci">
        <div className="container">
          <span className="eyebrow">NASIL ÇALIŞIYORUZ?</span>
          <h2>Karmaşık süreçleri sadeleştiriyoruz.</h2>
          <Process />
        </div>
      </section>
      <section className="section container" id="musteri-yorumlari">
        <span className="eyebrow">MÜŞTERİ YORUMLARI</span>
        <h2>Birlikte çalışmak nasıl?</h2>
        <div className="testimonial-grid">
          {s.testimonials.length ? (
            s.testimonials.slice(0, 3).map((t, i) => (
              <article className="testimonial-card" key={i}>
                {t.demo && (
                  <span className="eyebrow sample-label">
                    Örnek yorum · kurgu
                  </span>
                )}
                <blockquote>“{t.text}”</blockquote>
                <p>
                  {t.name}
                  <span>{t.company}</span>
                </p>
              </article>
            ))
          ) : (
            <p>
              “İyi bir iş, önce birbirini anlamakla başlar.” — Contrast’ın
              çalışma anlayışı
            </p>
          )}
        </div>
      </section>
      <section className="section blog-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">İÇERİKLER</span>
              <h2>
                Biraz fikir.
                <br />
                <span className="muted">Biraz ilham.</span>
              </h2>
              <p>
                Tasarım, marka, dijital iletişim ve prodüksiyon dünyasından
                notlar.
              </p>
            </div>
            <Link href="/blog" className="text-link">
              Tüm içerikleri gör <Arrow />
            </Link>
          </div>
          <div className="article-grid">
            {blogSelection.map((a) => (
              <ArticleCard article={a} key={a.id} />
            ))}
          </div>
        </div>
      </section>
      <Faq title="Merak edilenler." />
      <section className="section home-quote" id="proje-formu">
        <div className="container quote-layout">
          <aside>
            <span className="eyebrow">BİR FİKİRLE BAŞLAYALIM.</span>
            <h2>
              Bir projeniz mi var?
              <br />
              <span className="serif">Konuşalım.</span>
            </h2>
            <p>Aklınızda netleşmiş bir proje olabilir.</p>
            <p>
              Ya da sadece:
              <br />
              “Bir şeyleri değiştirmemiz gerekiyor.”
              <br />
              diyor olabilirsiniz.
            </p>
            <p>İkisi de iyi bir başlangıç.</p>
            <h3>Projenizi anlatın.</h3>
            {s.whatsapp && (
              <div className="quote-whatsapp">
                <p>Form doldurmak istemiyor musunuz?</p>
                <Link
                  href={whatsapp}
                  className="text-link"
                  {...(!whatsappDemo
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  WhatsApp’tan yazın <Arrow />
                </Link>
                {whatsappDemo && (
                  <small className="sample-inline">
                    Örnek iletişim bilgisi
                  </small>
                )}
              </div>
            )}
          </aside>
          <QuoteForm services={services} />
        </div>
      </section>
    </>
  );
}
