import { getContent } from "@/lib/store";
import { metadata } from "@/lib/seo";
import { PageIntro } from "@/components/cards";
import { QuoteForm } from "@/components/quote-form";
import { Faq } from "@/components/editorial";
export function generateMetadata() {
  return metadata(
    "Teklif Al — Projenizi Konuşalım",
    "Marka tasarımı, web sitesi, sosyal medya veya prodüksiyon projenizi anlatın. Size uygun kapsamı birlikte belirleyelim.",
    "/teklif-al",
  );
}
export default async function Quote({
  searchParams,
}: {
  searchParams: Promise<{ hizmet?: string }>;
}) {
  const { hizmet } = await searchParams;
  return (
    <>
      <PageIntro
        label="İYİ BİR FİKİRLE BAŞLAYALIM."
        title="Aklınızda ne var?"
        description="Bir hedef, bir ihtiyaç veya henüz şekillenmemiş bir fikir. Birlikte konuşup doğru yerden başlayalım."
      />
      <section className="container quote-layout section top-zero">
        <aside>
          <span className="eyebrow">SONRA NE OLACAK?</span>
          <h2>Önce tanışırız.</h2>
          <p>
            Talebinizi inceler, ihtiyacınızı anlamak için sizinle iletişime
            geçeriz. Kapsamı ve zamanlamayı birlikte netleştirdikten sonra size
            özel bir teklif hazırlarız.
          </p>
          <div className="quote-steps">
            <span>01 · Sizi dinleyelim.</span>
            <span>02 · İhtiyacı netleştirelim.</span>
            <span>03 · Doğru çözümü planlayalım.</span>
          </div>
          <h3 className="brief-heading">Ne paylaşabilirsiniz?</h3>
          <p>
            Mevcut marka materyalleriniz, örnek beğenileriniz veya
            hazırladığınız kısa bir brief. Henüz bütçe veya tarih
            belirlemediyseniz bunu da görüşmede birlikte değerlendirebiliriz.
          </p>
          <p>
            Hassas kişisel bilgi veya parola göndermeyin. Dosya alanını
            projenizle ilgili doküman ve görseller için kullanın.
          </p>
        </aside>
        <QuoteForm services={getContent().services} initialService={hizmet} />
      </section>
      <Faq
        entries={[
          {
            question: "Hangi hizmeti seçmem gerektiğini bilmiyorum.",
            answer:
              "İhtiyacınıza yakın gördüğünüz hizmetleri işaretleyip açıklama bölümünde hedefinizi anlatın. Görüşmede hangi çalışmaların gerekli olduğunu birlikte belirleriz.",
          },
          {
            question: "Bütçem henüz belli değil. Formu doldurabilir miyim?",
            answer:
              "Evet. Bütçe alanında birlikte belirleme seçeneğini kullanabilirsiniz. Kapsamı konuşarak önceliklerinize uygun bir plan oluştururuz.",
          },
          {
            question: "Gönderdiğim dosyalar herkes tarafından görülebilir mi?",
            answer:
              "Teklif formuna eklenen dosyalar herkese açık galeride yayınlanmaz. Talep kaydı ve ekleri yalnızca yetkili yönetici panelinden görüntülenebilir.",
          },
        ]}
        title="Başlamadan önce."
      />
    </>
  );
}
