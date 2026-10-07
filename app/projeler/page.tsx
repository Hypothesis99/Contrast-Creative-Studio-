import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro } from "@/components/cards";
import { ProjectFilter } from "@/components/project-filter";
export function generateMetadata() {
  return metadata(
    "Projeler & Portfolyo",
    "Marka kimliği, dijital kampanya, ambalaj ve web tasarımı. Yaratıcı yaklaşımımızı proje hikâyeleri üzerinden keşfedin.",
    "/projeler",
  );
}
export default function Projects() {
  const projects = getContent().projects.filter((x) => x.published);
  return (
    <>
      <PageIntro
        label="FİKİRLER SOMUTLAŞINCA."
        title="İşimiz, kendini anlatır."
        description="Bir görselin ötesinde; ihtiyacı, fikri ve çözümüyle her projenin bir hikâyesi var."
      />
      <section className="container section top-zero">
        <ProjectFilter projects={projects} />
        {projects.some((p) => p.demo) && (
          <p className="content-note">
            Konsept çalışma olarak işaretlenen projeler, yaratıcı yaklaşımımızı
            göstermek için hazırlanmış örneklerdir; gerçek müşteri çalışması
            değildir.
          </p>
        )}
      </section>
    </>
  );
}
