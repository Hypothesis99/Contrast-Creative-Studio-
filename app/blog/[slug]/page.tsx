import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/store";
import { metadata, JsonLd, publicUrl } from "@/lib/seo";
import { PageIntro, Prose, ArticleCard } from "@/components/cards";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getContent().articles.find((a) => a.slug === slug && a.published);
  return a
    ? metadata(
        a.seoTitle || a.title,
        a.seoDescription || a.summary,
        `/blog/${slug}`,
        a.image,
      )
    : {};
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getContent(),
    a = content.articles.find((a) => a.slug === slug && a.published);
  if (!a) notFound();
  const url = publicUrl();
  return (
    <>
      {url && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: a.title,
            description: a.summary,
            datePublished: a.date,
            author: { "@type": "Organization", name: content.settings.name },
            publisher: { "@type": "Organization", name: content.settings.name },
            mainEntityOfPage: `${url}/blog/${slug}`,
            image: new URL(a.image, url).href,
          }}
        />
      )}
      <PageIntro
        label={`${a.category} / ${new Date(`${a.date}T12:00:00Z`).toLocaleDateString("tr-TR")} / ${Math.max(1, Math.ceil(a.body.split(/\s+/).length / 200))} DK OKUMA`}
        title={a.title}
        description={a.summary}
      />
      <div className="container">
        <img
          className="article-cover"
          src={a.image}
          alt={a.title}
          width="1400"
          height="700"
        />
      </div>
      <article className="article-body">
        <Prose text={a.body} />
        <Link href="/teklif-al" className="button">
          Bu fikri birlikte geliştirelim ↗
        </Link>
      </article>
      <section className="container section">
        <div className="section-heading">
          <h2>Okumaya devam.</h2>
          <Link href="/blog" className="text-link">
            Tüm yazılar ↗
          </Link>
        </div>
        <div className="article-grid">
          {content.articles
            .filter((x) => x.published && x.id !== a.id)
            .slice(0, 3)
            .map((x) => (
              <ArticleCard article={x} key={x.id} />
            ))}
        </div>
      </section>
    </>
  );
}
