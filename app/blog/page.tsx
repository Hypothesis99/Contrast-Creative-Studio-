import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro, ArticleCard } from "@/components/cards";
export function generateMetadata() {
  return metadata(
    "Blog — Tasarım, Sosyal Medya & Reklam",
    "Marka tasarımı, sosyal medya, reklam ve prodüksiyon üzerine notlar. Bursa ve Orhangazi’de işletmeler için fikirler.",
    "/blog",
  );
}
export default function Blog() {
  const articles = getContent()
    .articles.filter((a) => a.published)
    .sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageIntro
        label="STÜDYODAN NOTLAR"
        title="Biraz fikir. Biraz ilham."
        description="Tasarım, iletişim ve yaratıcı üretim üzerine düşündüklerimiz. Markanızın bir sonraki adımı için."
      />
      <section className="container section top-zero">
        <div className="article-grid">
          {articles.map((a) => (
            <ArticleCard article={a} key={a.id} />
          ))}
        </div>
        {!articles.length && <p>Yeni fikirler yakında burada.</p>}
      </section>
    </>
  );
}
