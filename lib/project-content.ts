import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "p-1",
    slug: "forma-marka-kimligi",
    title: "Sade bir fikir. Güçlü bir kimlik.",
    client: "FORMA",
    category: "Marka kimliği",
    image: "/images/forma.svg",
    year: "2026",
    summary:
      "Mimarlık ve mekân tasarımı için kurgulanan bir marka: yapısal bir işaretten basılı uygulamalara uzanan kimlik konsepti.",
    need: "Konseptin çıkış noktası, mimarlık alanında çalışan bir markanın kendini tek bir görsel dille anlatma ihtiyacıydı. Sunum dosyaları, kartvizit, proje paftaları ve dijital içeriklerin aynı karakteri taşıması; işaretin küçük ölçekte de anlaşılır olması hedeflendi. Sade görünümün sıradanlığa dönüşmemesi temel tasarım sorusuydu.",
    solution:
      "Mimari plan ve hacim ilişkilerinden hareketle modüler bir işaret oluşturuldu. Sıcak kil tonu, doğal kâğıt rengi ve koyu nötr bir palet; yapısal tipografiyle bir araya getirildi. Logo, renk ve boşluk kuralları bir kimlik sistemine dönüştürüldü. Kartvizit, marka kılavuzu ve sunum örneklerinde bu sistemin farklı yüzeylerde nasıl çalıştığı gösterildi.",
    before:
      "Konsept briefinde markanın uygulamalarını bağlayan ortak bir renk, tipografi ve yerleşim sistemi bulunmuyordu.",
    after:
      "Dijital ve basılı örneklerde aynı karakteri koruyan bir kimlik sistemi ortaya çıktı. Bu çalışma bir tasarım örneğidir; gerçek müşteri performansı veya ticari sonuç içermez.",
    gallery: ["/images/forma-detail.svg"],
    videoUrl: "",
    demo: true,
    published: true,
  },
  {
    id: "p-2",
    slug: "mora-ambalaj-tasarimi",
    title: "Doğadan ilham, rafta fark.",
    client: "MORA",
    category: "Ambalaj & tasarım",
    image: "/images/mora.svg",
    year: "2026",
    summary:
      "Doğal bakım ürünleri için kurgulanan bir ambalaj ailesi: sakin renkler, okunabilir etiketler ve ortak bir karakter.",
    need: "Örnek brief, farklı boyut ve türde ürünlerden oluşan bir bakım serisini tek bir marka altında topluyordu. Ürün adları, kullanım bilgileri ve seri ayrımlarının hızlı okunması; ambalajların yan yana geldiğinde bir aile gibi görünmesi gerekiyordu. Görsel yaklaşımın doğal bir his vermesi, fakat bilgi hiyerarşisini zayıflatmaması amaçlandı.",
    solution:
      "Botanik yeşiller, sıcak açık tonlar ve sakin bir tipografi sistemi seçildi. Etikette marka, ürün türü ve yardımcı bilgiler için tekrar kullanılabilir alanlar oluşturuldu. Şişe, kutu ve kavanoz örnekleri üzerinde aynı düzen farklı ölçülere uyarlandı. İkinci görselde renk paleti ve etiket parçaları, ambalaj kararlarının nasıl bir sisteme bağlandığını gösteriyor.",
    before:
      "Kurgusal ürün ailesinde ürünleri hem birbirine bağlayan hem de ayırt etmeyi kolaylaştıran bir etiket sistemi ihtiyacı vardı.",
    after:
      "Farklı ambalaj formlarına uyarlanabilen bir görsel konsept hazırlandı. Malzeme, baskı ve mevzuata tabi etiket bilgileri gerçek bir üretim projesinde ayrıca doğrulanmalıdır.",
    gallery: ["/images/mora-detail.svg"],
    videoUrl: "",
    demo: true,
    published: true,
  },
  {
    id: "p-3",
    slug: "pulse-dijital-kampanya",
    title: "Ritmini bul. Sesini duyur.",
    client: "PULSE",
    category: "Dijital kampanya",
    image: "/images/pulse.svg",
    year: "2026",
    summary:
      "Bir etkinlik fikri için hazırlanan kampanya dünyası: hareket, kontrast ve farklı ekranlarda aynı ritim.",
    need: "Etkinlik duyurularının akış içinde kolay fark edilmesi, ana mesajın hızlı okunması ve tarih gibi bilgilerin kaybolmaması hedeflendi. Kampanyanın dikey içeriklerde, kare gönderilerde ve geniş dijital alanlarda ortak bir karakter taşıması gerekiyordu. Çalışma gerçek bir etkinliğe ait değil, çoklu mecra tasarımını göstermek için kurgulandı.",
    solution:
      "Büyük tipografi, mor ve yeşil kontrastı ve ritim duygusu veren grafik formlar kullanıldı. Ana görseldeki hiyerarşi, farklı ekran oranlarına uyarlanabilecek bileşenlere ayrıldı. Kısa başlık, yardımcı bilgi ve çağrı alanları ayrı tutuldu. Uygulama görselinde kare ve dikey tasarımların aynı kampanya içinde nasıl birlikte kullanılabileceği gösterildi.",
    before:
      "Örnek briefte kampanya fikri vardı; mecralara uyarlanabilir bir görsel sistem ve bilgi düzeni henüz tanımlanmamıştı.",
    after:
      "Sosyal medya ve dijital ekranlar için ortak bir kampanya dili oluşturuldu. Konsept yayınlanmış bir reklam kampanyası değildir; erişim veya dönüşüm sonucu iddia edilmez.",
    gallery: ["/images/pulse-detail.svg"],
    videoUrl: "",
    demo: true,
    published: true,
  },
  {
    id: "p-4",
    slug: "atelier-web-deneyimi",
    title: "Dijitalde yeni bir perspektif.",
    client: "ATELIER",
    category: "Web tasarımı",
    image: "/images/atelier.svg",
    year: "2026",
    summary:
      "Bir tasarım stüdyosu için kurgulanan web deneyimi: projeleri öne çıkaran editoryal bir arayüz ve açık bir içerik akışı.",
    need: "Ziyaretçinin projeleri keşfederken stüdyonun yaklaşımını da anlayabilmesi hedeflendi. Ana sayfa, proje detayları ve iletişim arasında kolay bir yol kurulması; görsellerin metinle yarışmadan birbirini desteklemesi gerekiyordu. Mobil ekranda okunabilirlik ve karar noktalarının görünürlüğü tasarımın başlangıç koşullarıydı.",
    solution:
      "Geniş boşluklar, belirgin başlıklar ve içerik odaklı bir grid üzerine kurulan arayüz tasarlandı. Proje kartları kısa bir özetle keşfe açıldı; detay sayfaları ihtiyaç ve çözüm anlatımına ayrıldı. Masaüstü ve mobil örneklerde aynı tipografik karakter korundu. İletişim çağrıları, ziyaretçinin içeriği değerlendirdikten sonra ulaşabileceği noktalara yerleştirildi.",
    before:
      "Kurgusal stüdyonun proje anlatımı, hizmetleri ve iletişim adımı için ortak bir içerik hiyerarşisi ihtiyacı bulunuyordu.",
    after:
      "Proje keşfinden iletişime uzanan anlaşılır bir arayüz konsepti hazırlandı. Bu örnek canlı bir müşteri sitesi veya ölçülmüş bir dönüşüm çalışması değildir.",
    gallery: ["/images/atelier-detail.svg"],
    videoUrl: "",
    demo: true,
    published: true,
  },
  {
    id: "p-5",
    slug: "terra-sosyal-medya",
    title: "Her gün, aynı sıcak hikâye.",
    client: "TERRA",
    category: "Sosyal medya",
    image: "/images/terra.svg",
    year: "2026",
    summary:
      "Bir kahve markası için kurgulanan içerik sistemi: ürün, ritüel ve mekân hikâyelerini aynı görsel dilde buluşturan bir seçki.",
    need: "Örnek briefte sosyal medya hesabının yalnızca ürün duyurularından oluşmaması; kahvenin hazırlanışını, günlük ritüelleri ve marka karakterini de anlatması istendi. Farklı içerik türlerinin ortak bir görünüm taşıması ve çekim planının düzenli üretime uygun olması hedeflendi.",
    solution:
      "Toprak tonları, yalın tipografi ve ritüel fikrinden hareket eden grafik öğelerle bir içerik sistemi kuruldu. Ürün tanıtımı, hazırlık süreci, kısa bilgi ve mekân anlatımı için içerik sütunları tanımlandı. Kare gönderi ve dikey video kapakları aynı tasarım bileşenleriyle hazırlandı. Çalışma gerçek fotoğraf veya video çekimi yerine özgün çizimlerle görsel yaklaşımı gösteriyor.",
    before:
      "Konsept briefinde konu çeşitliliği ve aylık üretimi kolaylaştıracak ortak bir şablon sistemi tanımlanmamıştı.",
    after:
      "Farklı konulara uyarlanabilir, tutarlı bir sosyal medya içerik ailesi oluşturuldu. Konsept hesap yönetimi veya gerçek takipçi performansı içermez.",
    gallery: ["/images/terra-detail.svg"],
    videoUrl: "",
    demo: true,
    published: true,
  },
  {
    id: "p-6",
    slug: "objects-urun-gorsel-dili",
    title: "Detay, hikâyenin kendisi.",
    client: "OBJECTS",
    category: "Ürün görsel dili",
    image: "/images/product-study.svg",
    year: "2026",
    summary:
      "Bir seramik ürün serisi için kurgulanan görsel yön: form, doku ve ölçeği anlatan çekim planı örnekleri.",
    need: "Ürünlerin aynı seri içinde tutarlı görünmesi, ana kare ile detay ve kullanım karelerinin farklı soruları cevaplaması hedeflendi. Konsept, fotoğraf çekimi öncesinde görsel yönün ve kadrajların nasıl planlanabileceğini göstermek için hazırlandı; görseller fotoğraf değil illüstrasyondur.",
    solution:
      "Doğal açık tonlar, yumuşak gölge ve ürünü öne çıkaran sade sahneler seçildi. Ürünün tamamı, ağız ve yüzey detayları, farklı formların birlikte görünümü için ayrı kadrajlar düşünüldü. Yardımcı görselde bu çekim planı üç farklı sahneyle örneklendi. Gerçek bir çekimde malzeme rengi, ışık ve doku ürünün özelliklerine göre yeniden ayarlanmalıdır.",
    before:
      "Kurgusal ürün serisinde her görselin hangi bilgiyi vereceği ve birlikte nasıl bir görünüm oluşturacağı henüz belirlenmemişti.",
    after:
      "Ana görsel, detay ve seri anlatımını birbirine bağlayan bir görsel yön oluşturuldu. Bu illüstrasyon çalışması gerçek bir ürün çekimi veya satış sonucu değildir.",
    gallery: ["/images/product-detail.svg"],
    videoUrl: "",
    demo: true,
    published: true,
  },
];
