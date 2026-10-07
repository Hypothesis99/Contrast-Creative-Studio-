import { notFound } from "next/navigation";
import { PageIntro, Prose } from "@/components/cards";
import { metadata } from "@/lib/seo";
import { legalTexts as texts } from "@/lib/legal-content";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ legal: string }>;
}) {
  const { legal } = await params;
  const text = texts[legal];
  return text ? metadata(text.title, text.description, `/${legal}`) : {};
}
export default async function Legal({
  params,
}: {
  params: Promise<{ legal: string }>;
}) {
  const { legal } = await params,
    text = texts[legal];
  if (!text) notFound();
  return (
    <>
      <PageIntro
        label="BİLGİLENDİRME"
        title={text.title}
        description={text.description}
      />
      <section className="article-body legal-body">
        <Prose text={text.body} />
      </section>
    </>
  );
}
