import Link from "next/link";
import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro } from "@/components/cards";
import { Arrow } from "@/components/icons";
export function generateMetadata() {
  return metadata(
    "Hizmetler",
    "Bursa ve Orhangazi’de sosyal medya, kurumsal kimlik, logo, web tasarımı, prodüksiyon ve dijital reklam hizmetleri.",
    "/hizmetler",
  );
}
export default function Services() {
  const { services } = getContent();
  return (
    <>
      <PageIntro
        label="BİR FİKİRDEN, BÜTÜN BİR DÜNYAYA."
        title="Neler yapıyoruz?"
        description="Markanızın ihtiyacına göre düşünür, aynı yaratıcı bakışla farklı çözümler üretiriz."
      />
      <section className="container service-list">
        {services.map((s) => (
          <Link key={s.slug} href={`/hizmetler/${s.slug}`}>
            <span>{s.number}</span>
            <div>
              <span className="eyebrow">{s.group}</span>
              <h2>{s.title}</h2>
              <p>{s.short}</p>
            </div>
            <Arrow diagonal />
          </Link>
        ))}
      </section>
    </>
  );
}
