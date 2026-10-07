import type { Content } from "./types";
import { services } from "./service-content";
import { articles } from "./article-content";
import { projects } from "./project-content";

export const seed: Content = {
  settings: {
    name: "Contrast Creative Studio",
    tagline: "İyi fikirler. Güçlü kontrastlar.",
    description:
      "Bursa ve Orhangazi’de marka kimliği, sosyal medya, web tasarımı, fotoğraf, video ve dijital reklam. Markanız için stratejiden üretime yaratıcı çözümler.",
    phone: "",
    whatsapp: "",
    email: "",
    instagram: "",
    address: "",
    hours: "",
    mapUrl: "",
    siteUrl: "",
    gaId: "",
    pixelId: "",
    searchConsoleId: "",
    showreelUrl: "",
    about:
      "Contrast’ın çıkış noktası basit: Her markanın anlatmaya değer bir hikâyesi var. Bizim işimiz, o hikâyenin doğru yerini bulmak ve onu güçlü bir fikre dönüştürmek. Tasarımı yalnızca güzel bir sonuç olarak değil, markanızın kendini daha açık anlatmasının bir yolu olarak görüyoruz.\n\nİşe dinleyerek başlıyoruz. Ne ürettiğinizi, müşterinizin sizi neden seçtiğini ve nereye gitmek istediğinizi anlamadan görsel karar vermiyoruz. Bazen çözüm yeni bir kimlik, bazen daha anlaşılır bir web sitesi, bazen de ürününüzü doğru anlatan bir fotoğraf serisi oluyor. İhtiyaca göre düşünüyor, hizmetleri aynı hedef etrafında bir araya getiriyoruz.\n\nBursa ve Orhangazi’de yerel işletmelerin ihtiyaçlarını odağımıza alırken, tasarım ve dijital iletişim projelerinde mesafeyi bir engel olarak görmüyoruz. Açık bir kapsam, düzenli iletişim ve özenli uygulamayla birlikte çalışıyoruz. Büyük sözler yerine neyi, neden yaptığımızı anlatmayı; ortaya çıkan işi de bu açıklıkla teslim etmeyi önemsiyoruz.",
    team: "Contrast’ın çalışma masasında strateji, tasarım, fotoğraf, video ve dijital iletişim aynı hedef etrafında buluşur. Her projenin ihtiyacı farklıdır; bu yüzden yaratıcı yönü ve üretim planını işin kapsamına göre kurarız. Bir kimlik çalışmasında tipografi ve uygulama detaylarını, bir çekimde sahneyi ve ışığı, bir kampanyada mesajı ve ölçümü birlikte düşünürüz. Sürecin sizin tarafınızda da anlaşılır olması için kararları, sorumlulukları ve onay adımlarını açıkça paylaşırız.",
    clients: [],
    testimonials: [],
  },
  services,
  projects,
  articles,
};
