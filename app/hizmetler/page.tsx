import Link from "next/link";
import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro } from "@/components/cards";
import { Arrow } from "@/components/icons";
import { serviceGroups } from "@/lib/brand-copy";
export function generateMetadata() {
  return metadata(
    "Hizmetler",
    "Bursa ve Orhangazi’de sosyal medya, kurumsal kimlik, logo, web tasarımı, prodüksiyon ve dijital reklam hizmetleri.",
    "/hizmetler",
  );
}
export default function Services() {
  const { services } = getContent();
  const groups = [
    ...serviceGroups,
    ...[...new Set(services.map((s) => s.group))]
      .filter((group) => !serviceGroups.some((item) => item.group === group))
      .map((group, index) => ({
        id: `diger-${index}`,
        group,
        title: group,
        headline: group,
        description: "Markanızın ihtiyacına göre yaratıcı çözümler.",
      })),
  ];
  return (
    <>
      <PageIntro
        label="BİR FİKİRDEN, BÜTÜN BİR DÜNYAYA."
        title="Tek bir marka. Her temas noktasında aynı fikir."
        description="Bir markanın yalnızca logosunu değil, insanların onunla karşılaştığı bütün alanları düşünüyoruz."
      />
      <section className="container service-list">
        {groups.map((group) => (
          <div id={group.id} className="service-category" key={group.id}>
            <span className="eyebrow">{group.title}</span>
            <h2>{group.headline}</h2>
            <p>{group.description}</p>
            {services
              .filter((s) => s.group === group.group)
              .map((s) => (
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
          </div>
        ))}
      </section>
    </>
  );
}
