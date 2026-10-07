import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro } from "@/components/cards";
import { Star } from "@/components/icons";
import { Paragraphs, Process, Faq } from "@/components/editorial";
import { disciplines } from "@/lib/studio-content";
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
          <Paragraphs text={s.about} />
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
        <Process />
        {s.team && (
          <div className="team-copy">
            <h2>Aynı masada, farklı yetenekler.</h2>
            <Paragraphs text={s.team} />
          </div>
        )}
      </section>
      <section className="section disciplines-section">
        <div className="container">
          <span className="eyebrow">AYNI HEDEF, FARKLI DİSİPLİNLER</span>
          <h2>
            Fikri birlikte
            <br />
            tamamlarız.
          </h2>
          <Process steps={disciplines} />
        </div>
      </section>
      <section className="container section detail-grid">
        <div>
          <span className="eyebrow">NEDEN CONTRAST?</span>
          <h2>
            Güzel görünenin
            <br />
            ötesini düşünürüz.
          </h2>
        </div>
        <div>
          <h3>İhtiyaca göre çalışırız.</h3>
          <p>
            Önce hangi sorunu çözdüğümüzü belirleriz. Hizmetleri bir liste
            olarak değil, markanızın hedefini destekleyen parçalar olarak bir
            araya getiririz.
          </p>
          <h3>Süreci açık tutarız.</h3>
          <p>
            Teslimler, onay aşamaları ve sorumluluklar baştan belli olur.
            Yaratıcı kararlara eşlik eden gerekçeleri de paylaşırız.
          </p>
          <h3>Detayı sona bırakmayız.</h3>
          <p>
            Bir logonun küçük boyutta okunmasından bir formun mobil kullanımına
            kadar uygulamanın gerçek koşullarını düşünürüz.
          </p>
        </div>
      </section>
      <Faq />
    </>
  );
}
