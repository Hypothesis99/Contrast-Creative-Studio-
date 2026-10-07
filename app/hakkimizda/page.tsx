import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro } from "@/components/cards";
import { Star } from "@/components/icons";
export function generateMetadata() {
  return metadata(
    "Hakkımızda",
    "Contrast Creative Studio’nun yaklaşımı: dinlemek, düşünmek ve birlikte üretmek. Bursa ve Orhangazi için yaratıcı bir partner.",
    "/hakkimizda",
  );
}
export default function About() {
  const s = getContent().settings;
  return (
    <>
      <PageIntro
        label="FARKLI DÜŞÜNÜRÜZ. BİRLİKTE ÜRETİRİZ."
        title="Tanışalım. Biz Contrast."
        description="Birbirinden farklı fikirleri, güçlü bir ortak noktada buluşturuyoruz."
      />
      <section className="container section detail-grid">
        <div>
          <h2>
            İyi bir iş,
            <br />
            iyi bir soruyla başlar.
          </h2>
          <p className="large-copy">{s.about}</p>
        </div>
        <div className="about-art">
          <Star />
          <span>
            FİKİR.
            <br />
            TASARIM.
            <br />
            KONTRAST.
          </span>
        </div>
      </section>
      <section className="container section">
        <span className="eyebrow">ÇALIŞMA ANLAYIŞIMIZ</span>
        <div className="process-grid">
          {[
            ["01", "Önce dinleriz.", "İhtiyacı anlamadan çözüme atlamayız."],
            [
              "02",
              "Açık konuşuruz.",
              "Kapsamı, süreci ve beklentiyi birlikte netleştiririz.",
            ],
            [
              "03",
              "Birlikte üretiriz.",
              "Sizi sürecin bir parçası olarak görürüz.",
            ],
            [
              "04",
              "Detayı önemseriz.",
              "Fikir kadar uygulamanın niteliğine de odaklanırız.",
            ],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        {s.team && (
          <div className="team-copy">
            <h2>Aynı masada, farklı yetenekler.</h2>
            <p>{s.team}</p>
          </div>
        )}
      </section>
    </>
  );
}
