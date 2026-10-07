import { notFound } from "next/navigation";
import { PageIntro, Prose } from "@/components/cards";
import { metadata } from "@/lib/seo";
const texts: Record<string, { title: string; body: string }> = {
  kvkk: {
    title: "KVKK aydınlatma metni",
    body: "# Kişisel verilerin korunması\n\nBu metin bir ön taslaktır. Yayına alınmadan önce veri sorumlusunun ticari unvanı, adresi, başvuru kanalları, hukuki sebepler, saklama süreleri ve varsa veri aktarımı bilgileri işletmenizin gerçek süreçlerine göre tamamlanmalıdır.\n\n## Hangi bilgiler işlenir?\n\nTeklif formunda paylaştığınız firma adı, ad ve soyad, telefon, e-posta, hizmet tercihi, bütçe, başlangıç tarihi, açıklama ve isteğe bağlı dosya, teklif talebinin değerlendirilmesi ve iletişim kurulması amacıyla kaydedilir.\n\n## Haklarınız\n\n6698 sayılı Kanun kapsamında kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltme, silme ve mevzuatta tanımlanan diğer haklara sahipsiniz. Başvuru yöntemi, veri sorumlusunun resmi bilgileriyle birlikte yayından önce açıklanmalıdır.",
  },
  gizlilik: {
    title: "Gizlilik politikası",
    body: "# Gizliliğinize saygı duyuyoruz\n\nBu politika bir ön taslaktır. İşletmenin resmi bilgileri, veri saklama süreleri ve kullanılan gerçek hizmet sağlayıcıları yayından önce eklenmelidir.\n\n## Teklif talepleri\n\nFormda paylaşılan bilgiler ve dosyalar teklif sürecinin yürütülmesi için saklanır. Bu kayıtlar yalnızca yetkili yönetici oturumu üzerinden erişilebilir.\n\n## Ölçüm araçları\n\nGoogle Analytics veya Meta Pixel tanımlandığında, bu araçlar yalnızca çerez tercihinizde açıkça kabul etmeniz durumunda yüklenir. Zorunlu yönetici oturum çerezi, yönetim paneline giriş için kullanılır.\n\n## Başvuru\n\nGizlilik ve veri hakları için işletmenin iletişim sayfasında yayımlanacak resmi başvuru kanalları kullanılmalıdır.",
  },
  "cerez-politikasi": {
    title: "Çerez politikası",
    body: "# Çerezler nasıl kullanılır?\n\nYönetici paneli, oturumu güvenli biçimde sürdürmek için contrast_admin adlı zorunlu bir oturum çerezi kullanır. Bu çerez sekiz saat içinde sona erer ve JavaScript tarafından okunamaz.\n\n## Tercih kaydı\n\nÇerez tercihiniz tarayıcının yerel depolamasındaki contrast_consent kaydında tutulur. Ölçüm araçları tanımlıysa sayfanın altındaki Çerez tercihleri bağlantısıyla tercihinizi yeniden belirleyebilirsiniz.\n\n## İsteğe bağlı ölçüm\n\nGoogle Analytics ve Meta Pixel yalnızca etkinleştirildiklerinde ve siz kabul ettiğinizde yüklenir. Google ve Meta, kendi politikaları kapsamında kullanım ve cihaz verilerini işleyebilir. Kullanılan hizmetler ve veri aktarımı koşulları yayından önce işletmenin gerçek kurulumuna göre tamamlanmalıdır.\n\n## Reddetme\n\nYalnızca gerekli seçeneğiyle ölçüm araçlarının yüklenmesini reddedebilirsiniz. Tercihi sıfırlamak gelecekteki yüklemeleri durdurur; daha önce üçüncü taraflarda oluşan kayıtların silinmesini sağlamaz.",
  },
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ legal: string }>;
}) {
  const { legal } = await params;
  const text = texts[legal];
  return text ? metadata(text.title, text.title, `/${legal}`) : {};
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
      <PageIntro label="BİLGİLENDİRME" title={text.title} />
      <section className="article-body legal-body">
        <Prose text={text.body} />
      </section>
    </>
  );
}
