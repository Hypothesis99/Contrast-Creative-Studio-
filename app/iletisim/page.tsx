import Link from "next/link";
import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro } from "@/components/cards";
import { Faq } from "@/components/editorial";
import { isSampleContact } from "@/lib/sample-content";
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
      <section
        id="iletisim-bilgileri"
        className="container section top-zero contact-grid"
      >
        <div>
          <h2>
            Birlikte bir şeyler
            <br />
            değiştirelim.
          </h2>
          <p>
            Yeni bir marka, bir web sitesi veya düzenli içerik üretimi için
            düşünmeye başlamış olabilirsiniz. Hangi hizmete ihtiyacınız olduğunu
            henüz bilmiyorsanız da konuşabiliriz. İşinizi ve hedefinizi
            anlatmanız yeterli.
          </p>
          <Link href="/teklif-al" className="button">
            Projenizi anlatın ↗
          </Link>
          {s.email &&
            (isSampleContact(s, "email") ? (
              <span className="contact-main">
                {s.email}
                <small className="sample-inline">Örnek e-posta</small>
              </span>
            ) : (
              <a className="contact-main" href={`mailto:${s.email}`}>
                {s.email}
              </a>
            ))}
          {s.phone &&
            (isSampleContact(s, "phone") ? (
              <span className="contact-main">
                {s.phone}
                <small className="sample-inline">Örnek telefon</small>
              </span>
            ) : (
              <a
                className="contact-main"
                href={`tel:${s.phone.replace(/[^+\d]/g, "")}`}
              >
                {s.phone}
              </a>
            ))}
        </div>
        <div className="contact-details">
          <div>
            <span className="eyebrow">İLK GÖRÜŞME</span>
            <p>
              Markanızı, ihtiyaçlarınızı ve zamanlamayı birlikte
              değerlendirelim. Kapsamı netleştirdikten sonra size uygun bir
              çalışma planı oluşturalım.
            </p>
          </div>
          {s.address && (
            <div>
              <span className="eyebrow">
                {isSampleContact(s, "address")
                  ? "ÖRNEK STÜDYO ADRESİ"
                  : "STÜDYO"}
              </span>
              <p>{s.address}</p>
            </div>
          )}
          {s.hours && (
            <div>
              <span className="eyebrow">
                ÇALIŞMA SAATLERİ{isSampleContact(s, "hours") && " · ÖRNEK"}
              </span>
              <p>{s.hours}</p>
            </div>
          )}
          {s.whatsapp &&
            (isSampleContact(s, "whatsapp") ? (
              <span className="contact-channel">
                WhatsApp · {s.whatsapp}
                <small className="sample-inline">Örnek numara</small>
              </span>
            ) : (
              <a
                href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp üzerinden yazın ↗
              </a>
            ))}
          {s.instagram &&
            (isSampleContact(s, "instagram") ? (
              <span className="contact-channel">
                Instagram · @contrast.creativestudio
                <small className="sample-inline">Örnek hesap adı</small>
              </span>
            ) : (
              <a href={s.instagram} target="_blank" rel="noopener noreferrer">
                Instagram’da buluşalım ↗
              </a>
            ))}
          {s.mapUrl && (
            <a href={s.mapUrl} target="_blank" rel="noopener noreferrer">
              {isSampleContact(s, "mapUrl")
                ? "Orhangazi’yi haritada gör · örnek bölge ↗"
                : "Google Maps’te yol tarifi alın ↗"}
            </a>
          )}
          {s.sampleContactFields?.length || (!s.phone && !s.email) ? (
            <div className="contact-draft-note">
              <span className="eyebrow">İLETİŞİM TASLAĞI</span>
              <p>
                İletişim alanları önizleme için örnek bilgilerle dolduruldu.
                Örnek telefon, e-posta ve sosyal medya hesabı aktif değildir.
                Projenizi teklif formundan paylaşabilirsiniz.
              </p>
            </div>
          ) : null}
          <span className="contact-location">
            BURSA / ORHANGAZİ
            <br />
            <small>Fikirler için mesafe yok.</small>
          </span>
        </div>
      </section>
      <section className="section disciplines-section">
        <div className="container detail-grid">
          <div>
            <span className="eyebrow">GÖRÜŞMEYE HAZIRLIK</span>
            <h2>
              Kusursuz bir brief
              <br />
              gerekmiyor.
            </h2>
          </div>
          <div>
            <p>
              Elinizde olanları paylaşın; eksik noktaları birlikte
              netleştiririz. Şu bilgiler iyi bir başlangıç olur:
            </p>
            <ul className="editorial-list">
              <li>Firmanız ve hedef kitleniz hakkında kısa bir bilgi</li>
              <li>Çözmek istediğiniz ihtiyaç veya ulaşmak istediğiniz hedef</li>
              <li>Mevcut logo, web sitesi ve sosyal medya hesaplarınız</li>
              <li>
                Varsa örnek beğenileriniz, yaklaşık bütçe ve başlangıç tarihiniz
              </li>
            </ul>
            <Link href="/teklif-al" className="text-link">
              Briefinizi gönderin ↗
            </Link>
          </div>
        </div>
      </section>
      <Faq />
    </>
  );
}
