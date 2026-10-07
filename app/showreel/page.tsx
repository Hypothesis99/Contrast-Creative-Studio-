import Link from "next/link";
import { metadata } from "@/lib/seo";
import { PageIntro } from "@/components/cards";

export function generateMetadata() {
  return {
    ...metadata(
      "Konsept Showreel",
      "Contrast Creative Studio’nun marka, tasarım ve içerik dünyasından 45 saniyelik özgün konsept seçkisi.",
      "/showreel",
      "/videos/concept-showreel-poster.jpg",
    ),
    robots: { index: false, follow: true },
  };
}

export default function Showreel() {
  return (
    <>
      <PageIntro
        label="KONSEPT SHOWREEL / 45 SANİYE"
        title="45 saniyede Contrast."
        description="Fikirden ekrana, kameradan sokağa."
      />
      <section className="container section top-zero">
        <video
          className="showreel-player"
          controls
          playsInline
          preload="metadata"
          poster="/videos/concept-showreel-poster.jpg"
          width="1280"
          height="720"
          aria-label="Contrast konsept showreel, 45 saniyelik sessiz tasarım seçkisi"
        >
          <source src="/videos/concept-showreel.mp4" type="video/mp4" />
          Tarayıcınız video oynatmayı desteklemiyor.
          <a href="/videos/concept-showreel.mp4">Videoyu açın.</a>
        </video>
        <div className="showreel-description">
          <div>
            <span className="eyebrow">ÖRNEK ÇALIŞMA</span>
            <p>
              FORMA, MORA, PULSE, ATELIER, TERRA ve OBJECTS için hazırlanan
              özgün konsept tasarımlar. Bu sessiz video kurmaca markalardan
              oluşur; gerçek müşteri kampanyası değildir.
            </p>
          </div>
          <Link href="/projeler" className="button outline">
            Proje hikâyelerini keşfet ↗
          </Link>
        </div>
      </section>
    </>
  );
}
