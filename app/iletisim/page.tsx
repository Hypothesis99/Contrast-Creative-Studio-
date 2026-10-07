import Link from "next/link";
import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro } from "@/components/cards";
export function generateMetadata() {
  return metadata(
    "İletişim",
    "Contrast Creative Studio ile tanışın. Bursa ve Orhangazi’de reklam, tasarım ve dijital iletişim projelerinizi konuşalım.",
    "/iletisim",
  );
}
export default function Contact() {
  const s = getContent().settings;
  return (
    <>
      <PageIntro
        label="BİR MERHABA İLE BAŞLAR."
        title="Konuşmak iyi gelir."
        description="Projenizi, sorularınızı veya bir fikrinizi bizimle paylaşın."
      />
      <section className="container section top-zero contact-grid">
        <div>
          <h2>
            Birlikte bir şeyler
            <br />
            değiştirelim.
          </h2>
          <Link href="/teklif-al" className="button">
            Projenizi anlatın ↗
          </Link>
          {s.email && (
            <a className="contact-main" href={`mailto:${s.email}`}>
              {s.email}
            </a>
          )}
          {s.phone && (
            <a
              className="contact-main"
              href={`tel:${s.phone.replace(/[^+\d]/g, "")}`}
            >
              {s.phone}
            </a>
          )}
        </div>
        <div className="contact-details">
          {s.address && (
            <div>
              <span className="eyebrow">STÜDYO</span>
              <p>{s.address}</p>
            </div>
          )}
          {s.hours && (
            <div>
              <span className="eyebrow">ÇALIŞMA SAATLERİ</span>
              <p>{s.hours}</p>
            </div>
          )}
          {s.whatsapp && (
            <a
              href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp üzerinden yazın ↗
            </a>
          )}
          {s.instagram && (
            <a href={s.instagram} target="_blank" rel="noopener noreferrer">
              Instagram’da buluşalım ↗
            </a>
          )}
          {s.mapUrl && (
            <a href={s.mapUrl} target="_blank" rel="noopener noreferrer">
              Google Maps’te yol tarifi alın ↗
            </a>
          )}
          <span className="contact-location">
            BURSA / ORHANGAZİ
            <br />
            <small>Fikirler için mesafe yok.</small>
          </span>
        </div>
      </section>
    </>
  );
}
