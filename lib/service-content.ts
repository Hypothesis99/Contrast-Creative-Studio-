import type { Service } from "./types";

type Detail = Omit<Service, "number">;
const details: Detail[] = [
  {
    slug: "sosyal-medya-yonetimi",
    title: "Sosyal medya yönetimi",
    group: "Dijital",
    short:
      "Paylaşım yapmanın ötesinde, markanız için bir iletişim dili kuruyoruz.",
    intro:
      "Sosyal medya hesabınız, müşterinizin markanızla her gün karşılaştığı yer. Bu yüzden yalnızca güzel görünen gönderiler hazırlamıyoruz; ne söyleyeceğinizi, kime söyleyeceğinizi ve hangi içeriklerin işinize katkı sağlayacağını birlikte belirliyoruz. Ürünlerinizi, hizmetlerinizi ve işletmenizin karakterini tutarlı bir içerik dünyasına dönüştürüyoruz.\n\nAylık planı önceden paylaşır, tasarım ve metinleri onayınıza sunarız. Fotoğraf, Reels ve kampanya içeriklerini aynı çizgide üretir; hesabın performansını erişim, etkileşim, profil ziyaretleri ve gelen talepler üzerinden değerlendiririz. Her ay, öğrendiklerimize göre planı geliştiririz.",
    audience:
      "Düzenli içerik üretmekte zorlanan, hesabını daha profesyonel göstermek isteyen veya sosyal medyayı müşteri kazanma sürecine bağlamak isteyen işletmeler için.",
    items: [
      "Hesap ve rakip analizi",
      "Aylık içerik takvimi ve konu planı",
      "Gönderi, hikâye ve Reels tasarımları",
      "Marka diline uygun metin yazımı",
      "Yorum ve mesaj yönetimi için iletişim akışı",
      "Aylık performans değerlendirmesi",
    ],
    process: [
      {
        title: "Hesabı tanırız",
        description:
          "Mevcut içerikleri, hedef kitlenizi ve işletmenizin önceliklerini inceleriz.",
      },
      {
        title: "Takvimi kurarız",
        description:
          "İçerik başlıklarını, paylaşım sıklığını ve çekim ihtiyaçlarını birlikte belirleriz.",
      },
      {
        title: "Üretir ve paylaşırız",
        description:
          "Metin ve görselleri onayınıza sunar, belirlenen plana göre yayınları yürütürüz.",
      },
      {
        title: "Sonuçları okuruz",
        description:
          "Hangi içeriklerin ilgi gördüğünü ve gelen talepleri değerlendirip yeni ayı planlarız.",
      },
    ],
    faq: [
      {
        question: "Aylık kaç paylaşım hazırlanıyor?",
        answer:
          "Sabit bir sayıdan önce ihtiyacı konuşuyoruz. Gönderi, hikâye ve Reels adetleri, çekim günleri ve onay takvimi teklifin kapsamına yazılır.",
      },
      {
        question: "Reklam bütçesi sosyal medya yönetimine dahil mi?",
        answer:
          "İçerik yönetimi ve ücretli reklam ayrı işlerdir. Meta Ads yönetimi ayrıca planlanabilir; platforma ödenen reklam bütçesi hizmet bedelinden ayrı gösterilir.",
      },
      {
        question: "Hesabımın sahipliği kimde kalır?",
        answer:
          "Hesap ve reklam varlıkları işletmenizde kalır. Çalışma için gereken yetkiler paylaşılır; kişisel parolanızı göndermeniz gerekmez.",
      },
    ],
  },
  {
    slug: "grafik-tasarim",
    title: "Grafik tasarım",
    group: "Tasarım",
    short:
      "Bir bakışta anlaşılan, her mecrada markanıza ait görünen tasarımlar.",
    intro:
      "İyi bir tasarım, mesajın önüne geçmeden onu güçlendirir. Kampanya görselinden kataloğa, ambalajdan sunuma kadar her işte önce bilginin nasıl okunacağını düşünürüz. Başlık, görsel, renk ve boşluk arasında doğru ilişkiyi kurarak markanızın söylemek istediğini açık bir biçimde anlatırız.\n\nTasarımı kullanılacağı yere göre hazırlarız. Bir telefon ekranında okunabilen içerikle baskıya gidecek katalog aynı teknik ihtiyaçlara sahip değildir. Ölçü, çözünürlük, renk ve teslim formatlarını baştan netleştirir; onaylanan tasarımı gerekli uygulamalarla birlikte teslim ederiz.",
    audience:
      "Kampanyasını güçlü bir görsel dille duyurmak, satış materyallerini yenilemek veya farklı tasarımlarını tek bir marka çizgisinde toplamak isteyen işletmeler için.",
    items: [
      "Kampanya ana görseli ve uyarlamaları",
      "Sosyal medya ve dijital reklam görselleri",
      "Katalog, broşür ve menü tasarımı",
      "Ambalaj ve etiket tasarımı",
      "Kurumsal sunum ve satış dokümanları",
      "Baskıya veya yayına hazır dosyalar",
    ],
    process: [
      {
        title: "Mesajı netleştiririz",
        description:
          "Hedef, içerik, kullanılacak alan ve teknik ölçüleri belirleriz.",
      },
      {
        title: "Yönü seçeriz",
        description:
          "Markanızın kimliğine uygun renk, tipografi ve görsel yaklaşımı oluştururuz.",
      },
      {
        title: "Tasarımı geliştiririz",
        description:
          "İlk tasarımı birlikte değerlendirir, kararlaştırılan revizyonları uygularız.",
      },
      {
        title: "Doğru dosyayı teslim ederiz",
        description:
          "Onaylanan işi baskı ve dijital kullanım için uygun formatlarda hazırlarız.",
      },
    ],
    faq: [
      {
        question: "Mevcut marka kimliğime uygun çalışabilir misiniz?",
        answer:
          "Evet. Logo, renkler, fontlar ve varsa marka kılavuzunuz üzerinden ilerleriz. Eksik uygulama kurallarını da proje kapsamında netleştirebiliriz.",
      },
      {
        question: "Baskı hizmeti tasarıma dahil mi?",
        answer:
          "Tasarım ve üretim ayrı kalemlerdir. Baskı gerekiyorsa adet, malzeme ve teslim koşullarını ayrıca planlar ve teklifte belirtiriz.",
      },
      {
        question: "Düzenlenebilir kaynak dosyaları teslim ediyor musunuz?",
        answer:
          "Teslim formatları ve kaynak dosyalar teklif aşamasında belirlenir. Kullanılan font, fotoğraf ve diğer lisansların koşulları da bu aşamada açıklanır.",
      },
    ],
  },
  {
    slug: "kurumsal-kimlik",
    title: "Kurumsal kimlik",
    group: "Tasarım",
    short:
      "Bir logodan bütün bir marka dünyasına: aynı karakter, her temas noktasında.",
    intro:
      "Müşteriniz markanızı bir tabelada, web sitesinde ve sosyal medyada gördüğünde aynı karakteri hissetmeli. Kurumsal kimlik çalışması bu tutarlılığı kurar. Markanızın nasıl görünmesi ve nasıl konuşması gerektiğini belirleyerek tek tek tasarımlar yerine birlikte çalışan bir sistem geliştiririz.\n\nİşe hedef kitlenizi, konumunuzu ve sizi farklı kılan yönleri anlayarak başlarız. Logo, renk paleti, tipografi, fotoğraf yaklaşımı ve uygulama örneklerini bu çerçevede oluştururuz. Sonuç, sonraki tasarımlarda da yol gösterecek bir marka kılavuzuna dönüşür.",
    audience:
      "Yeni kurulan markalar, büyürken görsel dilini toparlamak isteyen işletmeler ve mevcut kimliğini yenilemeye hazırlanan firmalar için.",
    items: [
      "Marka keşfi ve konumlandırma çerçevesi",
      "Logo ve alternatif kullanımlar",
      "Renk paleti ve tipografi sistemi",
      "Görsel dil ve iletişim tonu",
      "Kartvizit, sunum ve dijital uygulama örnekleri",
      "Marka kullanım kılavuzu ve teslim dosyaları",
    ],
    process: [
      {
        title: "Karakteri buluruz",
        description:
          "Markanın hikâyesini, değerlerini, kitlesini ve rakiplerinden ayrıldığı noktaları konuşuruz.",
      },
      {
        title: "Görsel yönü kurarız",
        description:
          "Konseptleri yalnızca logo olarak değil, farklı uygulamalarla birlikte değerlendiririz.",
      },
      {
        title: "Sistemi genişletiriz",
        description:
          "Seçilen yönü basılı ve dijital temas noktalarına uygularız.",
      },
      {
        title: "Kılavuzla teslim ederiz",
        description:
          "Kullanım kurallarını, dosyaları ve uygulama örneklerini tek bir pakette toplarız.",
      },
    ],
    faq: [
      {
        question: "Logo tasarımıyla kurumsal kimliğin farkı nedir?",
        answer:
          "Logo markanın işaretidir. Kurumsal kimlik; bu işareti renk, tipografi, görsel dil ve uygulama kurallarıyla bütün bir sisteme dönüştürür.",
      },
      {
        question: "Mevcut logoyu koruyabilir miyiz?",
        answer:
          "Evet. İhtiyaç her zaman yeni bir logo değildir. Mevcut logonun teknik düzenlemesi, kullanım kuralları ve çevresindeki görsel sistem üzerine çalışabiliriz.",
      },
      {
        question: "Kimlik tüm materyalleri kapsıyor mu?",
        answer:
          "Uygulama listesi projeye göre belirlenir. Ambalaj, tabela, web sitesi ve sosyal medya şablonlarının hangilerinin dahil olduğunu teklifte açıkça yazarız.",
      },
    ],
  },
  {
    slug: "logo-tasarimi",
    title: "Logo tasarımı",
    group: "Tasarım",
    short:
      "Markanızın hikâyesini sade, ayırt edilebilir ve kullanılabilir bir işarete dönüştürüyoruz.",
    intro:
      "Bir logo yalnızca büyük bir ekranda iyi görünmemeli. Profil fotoğrafında, küçük bir etikette, tabelada ve tek renk baskıda da karakterini korumalı. Tasarımı bu gerçek kullanım alanlarını düşünerek geliştiririz; markanızın adını, hikâyesini ve hedef kitlesini görsel kararların merkezine koyarız.\n\nKonseptleri gerekçeleriyle birlikte sunar, seçilen yönü geri bildiriminizle olgunlaştırırız. Renkli ve tek renk sürümler, açık ve koyu zemin kullanımları, güvenli alan ve temel kullanım kurallarıyla birlikte teslim ederiz. Böylece logonuz farklı tedarikçilere gönderildiğinde de aynı biçimde kullanılır.",
    audience:
      "Yeni bir isimle yola çıkan, mevcut logosunu yenilemek isteyen veya logosunun teknik kullanım sorunlarını çözmek isteyen markalar için.",
    items: [
      "Marka ve kullanım alanı araştırması",
      "Gerekçeli logo konseptleri",
      "İşaret ve logotip tasarımı",
      "Renkli, tek renk ve ters kullanım sürümleri",
      "Vektörel ve dijital teslim dosyaları",
      "Temel logo kullanım kılavuzu",
    ],
    process: [
      {
        title: "Markayı keşfederiz",
        description:
          "İsmi, hedef kitleyi, rakipleri ve logonun nerelerde kullanılacağını inceleriz.",
      },
      {
        title: "Konsept geliştiririz",
        description:
          "Anlamı olan görsel yönler oluşturur, uygulama örnekleriyle sunarız.",
      },
      {
        title: "Birlikte netleştiririz",
        description:
          "Seçilen tasarımı okunabilirlik ve kullanım testleriyle son haline getiririz.",
      },
      {
        title: "Kullanıma hazırlarız",
        description:
          "Dosyaları ve temel kullanım kurallarını düzenli bir teslim paketiyle paylaşırız.",
      },
    ],
    faq: [
      {
        question: "Logo tasarımı ne kadar sürer?",
        answer:
          "Araştırma, konsept ve onay adımları için gerçekçi bir takvim oluştururuz. Teslim tarihi; kapsam, geri bildirim süresi ve diğer uygulamalara göre teklifinizde belirlenir.",
      },
      {
        question: "Kaç alternatif ve revizyon var?",
        answer:
          "Konsept sayısı ve revizyon turları çalışmaya başlamadan önce kararlaştırılır. Her projede aynı paketi dayatmak yerine ihtiyaçlarınıza uygun kapsam öneririz.",
      },
      {
        question: "Marka tescili de yapılıyor mu?",
        answer:
          "Tasarım çalışması marka tescil işlemi değildir. Tescil araştırması ve hukuki başvurular için yetkili bir marka vekiliyle ayrıca çalışılması gerekir.",
      },
    ],
  },
  {
    slug: "web-sitesi-tasarimi",
    title: "Web sitesi tasarımı",
    group: "Dijital",
    short:
      "Markanızı doğru anlatan, ziyaretçiyi kolayca bir sonraki adıma taşıyan web siteleri.",
    intro:
      "Web siteniz, müşterinizin sizi tanıdığı ve karar verdiği bir alan. Tasarımdan önce ziyaretçinin ne aradığını, hangi sayfalara ihtiyaç duyduğunu ve iletişime nasıl geçeceğini belirleriz. İçerik akışını bu sorulara göre kurar; markanızın karakterini mobil ekranda da çalışan bir arayüze dönüştürürüz.\n\nHız, okunabilirlik, erişilebilir gezinme ve teknik SEO’yu birlikte düşünürüz. Hizmet sayfaları, projeler, blog ve teklif formunu yönetilebilir bir yapıda hazırlarız. Alan adı, barındırma, bakım ve içerik yönetimi sorumlulukları teslimden önce netleşir; siteyi kullanabilmeniz için gerekli bilgileri paylaşırız.",
    audience:
      "Yeni web sitesi kuran, eski sitesini yenileyen veya ziyaretçilerinden daha nitelikli teklif talebi almak isteyen işletmeler için.",
    items: [
      "Site haritası ve içerik planı",
      "Markaya özgü arayüz tasarımı",
      "Mobil ve tablet uyumlu geliştirme",
      "Yönetilebilir hizmet, proje ve blog alanları",
      "İletişim ve teklif formları",
      "Teknik SEO, hız kontrolleri ve teslim rehberi",
    ],
    process: [
      {
        title: "Akışı planlarız",
        description:
          "Hedefleri, sayfaları, içerik ihtiyaçlarını ve ziyaretçinin yolculuğunu belirleriz.",
      },
      {
        title: "Arayüzü tasarlarız",
        description:
          "Ana sayfadan alt sayfalara uzanan görsel dili birlikte değerlendiririz.",
      },
      {
        title: "Siteyi geliştiririz",
        description:
          "Onaylanan tasarımı çalışan sayfalara, formlara ve içerik yönetimine dönüştürürüz.",
      },
      {
        title: "Kontrol edip teslim ederiz",
        description:
          "Mobil kullanım, bağlantılar, formlar ve SEO ayarlarını test ederiz.",
      },
    ],
    faq: [
      {
        question: "İçerikleri kendim değiştirebilir miyim?",
        answer:
          "Projenin kapsamına göre bir yönetim paneli hazırlanır. Hangi sayfa ve alanların yönetileceği baştan belirlenir; kullanım bilgisi teslimde paylaşılır.",
      },
      {
        question: "Alan adı ve hosting dahil mi?",
        answer:
          "Alan adı, barındırma ve bakım ayrı sorumluluklardır. Mevcut hizmetinizi değerlendirebilir veya ihtiyaca uygun seçenekleri teklif içinde ayrı kalemler halinde sunabiliriz.",
      },
      {
        question: "Google’da ilk sırayı garanti ediyor musunuz?",
        answer:
          "Hayır. Teknik altyapı, anlamlı içerik ve doğru sayfa yapısı üzerinde çalışırız. Arama sıralaması rekabet, içerik ve zaman içinde değişen pek çok etkene bağlıdır.",
      },
    ],
  },
  {
    slug: "fotograf-cekimi",
    title: "Fotoğraf çekimi",
    group: "Prodüksiyon",
    short:
      "Ürününüzü, mekânınızı ve işinizi doğru ışıkla, doğru hikâyeyle anlatıyoruz.",
    intro:
      "Fotoğraf, müşterinizin ürününüze dokunamadığı bir ortamda ayrıntıları anlatır. Malzeme, doku, renk ve ölçeği doğru göstermek için çekimi kullanım amacına göre planlarız. E-ticaret için temiz ürün kareleri, sosyal medya için kullanım sahneleri veya web sitesi için mekân anlatımı farklı yaklaşımlar gerektirir.\n\nÇekim öncesinde ürün listesi, referanslar, kadrajlar ve ihtiyaç duyulan formatları birlikte netleştiririz. Seçilen kareleri renk ve ışık açısından düzenler; ürünün gerçek özelliklerini koruyan bir retouch yaklaşımıyla teslim ederiz. Aynı serideki fotoğrafların bir arada tutarlı görünmesine dikkat ederiz.",
    audience:
      "E-ticaret ürünlerini, menüsünü, mekânını veya hizmetlerini profesyonel görsellerle anlatmak isteyen üreticiler ve işletmeler için.",
    items: [
      "Ürün ve e-ticaret fotoğrafları",
      "Yemek ve menü çekimleri",
      "Mekân, tesis ve mimari çekimler",
      "Lifestyle ve kullanım sahneleri",
      "Kare seçimi, renk düzenleme ve retouch",
      "Web, sosyal medya ve baskı formatları",
    ],
    process: [
      {
        title: "Çekim listesini çıkarırız",
        description:
          "Ürünleri, kullanım mecralarını, örnek kareleri ve sahne ihtiyaçlarını belirleriz.",
      },
      {
        title: "Sahneyi hazırlarız",
        description:
          "Mekân, ışık, arka plan, aksesuar ve ürün hazırlığını planlarız.",
      },
      {
        title: "Çekimi gerçekleştiririz",
        description:
          "Ana görselleri detay ve kullanım kareleriyle birlikte üretiriz.",
      },
      {
        title: "Seriyi tamamlarız",
        description:
          "Seçilen fotoğrafları düzenleyip anlaşılan format ve adetlerde teslim ederiz.",
      },
    ],
    faq: [
      {
        question: "Çekim nerede yapılır?",
        answer:
          "İhtiyaca göre işletmenizde, uygun bir stüdyo alanında veya belirlenen dış mekânda planlanır. Mekân ve ulaşım gereksinimleri teklif aşamasında konuşulur.",
      },
      {
        question: "Ham fotoğraflar da teslim ediliyor mu?",
        answer:
          "Teslim edilecek kare adedi, dosya formatları ve ham dosyaların durumu önceden belirlenir. Varsayılan bir belirsizlik yerine kapsamı yazılı olarak netleştiririz.",
      },
      {
        question: "Ürünleri nasıl hazırlamalıyım?",
        answer:
          "Temiz, eksiksiz ve hasarsız ürünler önemlidir. Çekim öncesinde etiket, ambalaj, yedek ürün ve varsa model veya aksesuar ihtiyaçlarını içeren hazırlık listesini paylaşırız.",
      },
    ],
  },
  {
    slug: "video-produksiyon",
    title: "Video prodüksiyon",
    group: "Prodüksiyon",
    short:
      "Bir fikri senaryodan son kareye kadar birlikte çalışan bir hikâyeye dönüştürüyoruz.",
    intro:
      "Bir video projesi kameranın açıldığı gün başlamaz. Önce ne anlatmak istediğinizi, kimin izleyeceğini ve izleyicinin ne yapmasını beklediğinizi konuşuruz. Tanıtım filmi, ürün videosu veya kurumsal anlatım için içerik akışını, sahneleri ve mesajı bu hedefe göre kurarız.\n\nSenaryo, çekim planı, mekân ve ekip ihtiyaçlarını belirledikten sonra üretime geçeriz. Kurgu, renk, ses ve gerekli grafiklerle görüntüleri bir araya getirir; web sitesi, sunum veya sosyal medya için uygun sürümleri hazırlarız. Kullanılan müzik, görseller ve kişilerin izinleri proje kapsamına göre ayrıca değerlendirilir.",
    audience:
      "İşini, tesisini, ürününü veya hizmetini hareketli görüntüyle anlatmak isteyen markalar; tanıtım ve kampanya filmi planlayan işletmeler için.",
    items: [
      "Konsept ve senaryo geliştirme",
      "Storyboard ve çekim planı",
      "Mekân, ekip ve prodüksiyon organizasyonu",
      "Kurgu, renk ve ses düzenleme",
      "Altyazı ve hareketli grafik uygulamaları",
      "Farklı mecra ve ekran oranları için teslimler",
    ],
    process: [
      {
        title: "Hikâyeyi buluruz",
        description:
          "Ana mesajı, izleyiciyi, süreyi ve yayın mecrasını belirleriz.",
      },
      {
        title: "Çekimi planlarız",
        description:
          "Sahneleri, mekânları, takvimi ve gerekli izinleri önceden hazırlarız.",
      },
      {
        title: "Görüntüyü üretiriz",
        description: "Onaylanan senaryoya göre çekimleri gerçekleştiririz.",
      },
      {
        title: "Filmi tamamlarız",
        description:
          "Kurgu ve düzenlemeleri geri bildiriminizle tamamlayıp yayın dosyalarını teslim ederiz.",
      },
    ],
    faq: [
      {
        question: "Bir tanıtım filmi kaç dakika olmalı?",
        answer:
          "Süre, anlatılacak içerik ve izleyicinin karşılaştığı mecraya göre belirlenir. Kısa bir sosyal medya sürümü ile detaylı bir tesis tanıtımı aynı kurguya ihtiyaç duymaz.",
      },
      {
        question: "Senaryo ve seslendirme dahil mi?",
        answer:
          "Senaryo, seslendirme, oyuncu, müzik ve ek grafik ihtiyaçlarını ayrı ayrı netleştiririz. Dahil olan üretim kalemleri teklifinizde belirtilir.",
      },
      {
        question: "Filmi farklı platformlarda kullanabilir miyim?",
        answer:
          "Kullanım mecraları ve lisans koşulları baştan konuşulur. Dikey, yatay ve kısa sürümler gerekiyorsa çekim planını buna göre oluştururuz.",
      },
    ],
  },
  {
    slug: "reels-reklam-filmi",
    title: "Reels / reklam filmi",
    group: "Prodüksiyon",
    short:
      "İlk saniyede dikkat, devamında net bir mesaj: kısa videonun her anını düşünürüz.",
    intro:
      "Kısa video, uzun bir filmi yalnızca kısaltmak değildir. İlk görüntü, ekrandaki metin ve anlatım ritmi birlikte çalışmalıdır. Ürününüzün bir faydasını, bir kullanım anını veya markanızın bir fikrini öne çıkararak izleyicinin kolayca takip edebileceği bir hikâye kurarız.\n\nİçeriği Reels ve reklam yerleşimlerini düşünerek planlarız. Dikey kadraj, güvenli metin alanları, altyazı ve kapanış çağrısını çekimden önce tasarlarız. Gerekiyorsa farklı girişler ve kısa sürümler üretir; reklamda test edilebilecek kreatif seçenekleri aynı üretim içinde planlarız.",
    audience:
      "Instagram’da düzenli video üretmek, ürününü kısa bir anlatımla tanıtmak veya reklamları için özgün video kreatifleri hazırlamak isteyen markalar için.",
    items: [
      "Reels konu planı ve kısa senaryolar",
      "Dikey video çekimi",
      "Ürün, mekân ve ekip odaklı anlatımlar",
      "Altyazı, metin ve hareketli grafikler",
      "Farklı açılış ve çağrı versiyonları",
      "Organik içerik ve reklam formatlarına uyarlama",
    ],
    process: [
      {
        title: "Tek mesaj seçeriz",
        description:
          "Her videonun anlatacağı faydayı ve izleyiciden beklenen adımı netleştiririz.",
      },
      {
        title: "Sahneleri hazırlarız",
        description:
          "İlk kareyi, çekim akışını, metinleri ve ürün ihtiyaçlarını planlarız.",
      },
      {
        title: "Dikey düşünürüz",
        description:
          "Çekimi telefon ekranında izlenme ve platform yerleşimlerini dikkate alarak yaparız.",
      },
      {
        title: "Sürümleri teslim ederiz",
        description:
          "Kurgu, altyazı ve alternatif açılışları kararlaştırılan formatlarda hazırlarız.",
      },
    ],
    faq: [
      {
        question: "Trend sesleri reklamlarda kullanabilir miyiz?",
        answer:
          "Organik içerikte kullanılabilen her ses ticari reklam için lisanslı değildir. Müzik seçimini kullanım alanına ve platform koşullarına göre değerlendiririz.",
      },
      {
        question: "Bir çekimden birden fazla Reels çıkar mı?",
        answer:
          "Evet, senaryolar buna göre planlandığında tek çekim gününde bir seri üretilebilir. Video adedi, sahneler ve montaj kapsamı teklifin parçasıdır.",
      },
      {
        question: "Videonun çok izleneceğini garanti ediyor musunuz?",
        answer:
          "İzlenme garantisi vermiyoruz. Mesaj, üretim niteliği ve farklı kreatifleri geliştirmeye odaklanıyor; yayın ve reklam sonuçlarını ayrı değerlendiriyoruz.",
      },
    ],
  },
  {
    slug: "drone-cekimi",
    title: "Drone çekimi",
    group: "Prodüksiyon",
    short:
      "Mekânı çevresiyle birlikte anlatan, hikâyeye yeni bir açı kazandıran görüntüler.",
    intro:
      "Bir tesisin ölçeğini, bir mekânın konumunu veya bir projenin çevresiyle ilişkisini havadan göstermek anlatımı güçlendirebilir. Drone görüntülerini yalnızca etkileyici bir açılış olarak değil, videonun hikâyesini tamamlayan planlar olarak düşünürüz. Çekilecek alanları ve ihtiyaç duyulan hareketleri önceden belirleriz.\n\nUçuş imkânı; bölge, izinler, hava koşulları ve saha güvenliğine göre değerlendirilir. Uygun koşullar oluştuğunda çekimi planlar, görüntüleri kurgu ve renk düzenlemesiyle tamamlarız. Havadan çekim, yer çekimleriyle birlikte bütün bir tanıtım projesinin parçası olarak da hazırlanabilir.",
    audience:
      "Tesis, gayrimenkul, turizm, etkinlik veya mekân tanıtımında çevreyi ve ölçeği göstermek isteyen işletmeler için.",
    items: [
      "Konum ve uçuş uygunluğu değerlendirmesi",
      "Tesis ve mekân çekim planı",
      "Havadan fotoğraf ve video",
      "Yer çekimleriyle anlatım bütünlüğü",
      "Kurgu ve renk düzenleme",
      "Yayın mecrasına uygun teslim formatları",
    ],
    process: [
      {
        title: "Konumu değerlendiririz",
        description:
          "Uçuş alanını, çekim hedefini, izin ve güvenlik ihtiyaçlarını inceleriz.",
      },
      {
        title: "Günü planlarız",
        description:
          "Hava, ışık ve sahadaki hareketliliğe göre uygun çekim zamanını belirleriz.",
      },
      {
        title: "Görüntüleri alırız",
        description: "Onaylanan planları uygun koşullarda gerçekleştiririz.",
      },
      {
        title: "Hikâyeye ekleriz",
        description:
          "Görüntüleri bağımsız teslim veya mevcut filminizle birlikte düzenleriz.",
      },
    ],
    faq: [
      {
        question: "Her konumda drone çekimi yapılabilir mi?",
        answer:
          "Hayır. Uçuş kısıtları, saha koşulları ve gerekli izinler önceden değerlendirilir. Uygun olmayan bir alanda çekim sözü verilmez.",
      },
      {
        question: "Hava koşulları uygun değilse ne olur?",
        answer:
          "Rüzgâr, yağış ve görüş durumu çekimi etkileyebilir. Alternatif tarih ve takvim koşullarını proje planında birlikte belirleriz.",
      },
      {
        question: "Yalnızca havadan çekim yeterli olur mu?",
        answer:
          "Anlatılacak konuya bağlıdır. Çoğu projede detay, insan ve yer çekimleriyle birlikte kullanıldığında daha açıklayıcı bir film ortaya çıkar.",
      },
    ],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    group: "Dijital",
    short:
      "Hizmetinizi arayan insanlarla, doğru mesaj ve doğru sayfada buluşun.",
    intro:
      "Google’da arama yapan bir kişi çoğu zaman bir ihtiyacını çözmeye çalışır. Kampanyayı bu niyeti anlayarak kurarız: hangi hizmet aranıyor, hangi bölgede müşteri hedefleniyor ve reklam tıklandığında kullanıcı hangi sayfaya ulaşacak? Anahtar kelimeleri, reklam metinlerini ve açılış sayfasını aynı hedefe bağlarız.\n\nKurulumda dönüşüm ölçümünü ve bütçe sınırlarını netleştiririz. Yayın başladıktan sonra arama terimlerini, ilgisiz tıklamaları ve gelen talepleri inceler; kampanyayı gerçek sonuçlara göre geliştiririz. Reklam bütçesi ile yönetim ücretini ayrı tutar, hesabın işletmenize ait kalmasını esas alırız.",
    audience:
      "Belirli bir hizmet veya ürün için aktif arama yapan müşterilere ulaşmak isteyen yerel işletmeler ve markalar için.",
    items: [
      "Hedef ve hesap analizi",
      "Anahtar kelime ve arama niyeti araştırması",
      "Kampanya yapısı ve reklam metinleri",
      "Konum, bütçe ve yayın ayarları",
      "Dönüşüm ölçümü ve açılış sayfası değerlendirmesi",
      "Arama terimi takibi, optimizasyon ve raporlama",
    ],
    process: [
      {
        title: "Hedefi tanımlarız",
        description:
          "Form, telefon, satış veya başka bir anlamlı dönüşümü birlikte seçeriz.",
      },
      {
        title: "Kampanyayı kurarız",
        description:
          "Arama niyetine uygun reklam grupları, metinler ve sayfalar oluştururuz.",
      },
      {
        title: "Ölçümü kontrol ederiz",
        description:
          "Bütçe ve hedeflemeyle birlikte dönüşüm takibinin çalışmasını doğrularız.",
      },
      {
        title: "Veriye göre geliştiririz",
        description:
          "Arama terimleri, maliyetler ve taleplerin niteliği üzerinden düzenli iyileştirme yaparız.",
      },
    ],
    faq: [
      {
        question: "Ne kadar reklam bütçesi gerekir?",
        answer:
          "Hedef bölge, rekabet ve hizmetinizin değerine göre bir başlangıç bütçesi belirlenir. Bütçeyi yalnızca tıklama sayısıyla değil, talep ve dönüşüm kalitesiyle birlikte değerlendiririz.",
      },
      {
        question: "Reklam çıkınca organik sıralamam yükselir mi?",
        answer:
          "Google Ads ile organik SEO farklı kanallardır. Reklam vermek organik sıralama artışı garantisi sağlamaz.",
      },
      {
        question: "Reklam hesabı ve ödeme kimde olur?",
        answer:
          "Hesap işletmenize ait olmalıdır. Platforma ödenen medya bütçesi ve ajans yönetim bedeli ayrı kalemler olarak açıklanır.",
      },
    ],
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    group: "Dijital",
    short:
      "Instagram ve Facebook’ta doğru kitleye, güçlü bir kreatifle ulaşın.",
    intro:
      "Sosyal medya reklamında hedefleme kadar gösterdiğiniz fikir de önemlidir. İnsanlar sizi aramıyorken karşılarına çıktığınız için mesajın hızlı anlaşılması gerekir. Kampanya hedefini belirler; ürününüzün veya hizmetinizin faydasını anlatan görsel ve video seçeneklerini hedef kitleyle birlikte planlarız.\n\nInstagram ve Facebook kampanyalarını ölçülebilir bir yapı içinde kurarız. Farklı kreatifleri kontrollü biçimde test eder, bütçeyi sonuçlara göre değerlendiririz. Form sayısı, mesajlar veya satış gibi göstergeleri işletmenizin hedefleriyle birlikte okur; erişimi tek başına başarı olarak sunmayız.",
    audience:
      "Yeni kitlelerle tanışmak, kampanyasını duyurmak, teklif talebi toplamak veya e-ticaret ürünlerini tanıtmak isteyen işletmeler için.",
    items: [
      "Kampanya hedefi ve kitle stratejisi",
      "Instagram ve Facebook reklam kurulumu",
      "Görsel, video ve metin kreatifleri",
      "Kreatif ve yerleşim testleri",
      "İzinlere uygun dönüşüm ölçümü",
      "Bütçe yönetimi ve sonuç değerlendirmesi",
    ],
    process: [
      {
        title: "Hedefi seçeriz",
        description:
          "Bilinirlik, mesaj, talep veya satış hedefini işinizin ihtiyacına göre belirleriz.",
      },
      {
        title: "Kreatifleri hazırlarız",
        description:
          "Farklı mesaj ve görsel yaklaşımları aynı kampanya çerçevesinde üretiriz.",
      },
      {
        title: "Test ederek başlarız",
        description:
          "Hedefleme, yerleşim ve bütçeyi ölçümü takip edilebilir biçimde kurarız.",
      },
      {
        title: "Öğrenip geliştiririz",
        description:
          "Sonuçları ve talep kalitesini değerlendirerek kreatifleri ve dağılımı güncelleriz.",
      },
    ],
    faq: [
      {
        question: "Gönderiyi öne çıkarmakla aynı şey mi?",
        answer:
          "Reklam yöneticisi üzerinden kampanya kurmak; hedef, yerleşim, kreatif testi ve ölçüm üzerinde daha ayrıntılı kontrol sağlar. Yalnızca gönderi öne çıkarmanın ötesinde bir plan hazırlanır.",
      },
      {
        question: "Meta Pixel zorunlu mu?",
        answer:
          "Her kampanya aynı ölçüm altyapısını gerektirmez. Web dönüşümleri izlenecekse teknik kurulum ve çerez izinleri birlikte değerlendirilir; ziyaretçi tercihlerine uygun çalışılır.",
      },
      {
        question: "İçerik üretimi yönetim bedeline dahil mi?",
        answer:
          "Hazır materyallerle kampanya yönetimi ile yeni fotoğraf veya video üretimi farklı kapsamlardır. Dahil olan kreatif sayısı ve üretim kalemleri teklifte belirtilir.",
      },
    ],
  },
  {
    slug: "baski-tabela-acik-hava",
    title: "Baskı / tabela / açık hava",
    group: "Tasarım",
    short:
      "Markanızın sokaktaki, vitrindeki ve elde tutulan yüzünü aynı özenle tasarlıyoruz.",
    intro:
      "Bir tabela uzaktan, bir menü yakından, bir afiş ise çoğu zaman hareket halinde okunur. Tasarımı bu koşullara göre düşünür; mesaj, ölçü, kontrast ve malzeme arasında doğru ilişkiyi kurarız. Markanızın dijitaldeki karakterini fiziksel uygulamalarda da korumaya odaklanırız.\n\nBaskı veya üretim gerekiyorsa adet, malzeme, renk ve uygulama alanını netleştiririz. Tasarım dosyalarını teknik gereksinimlere göre hazırlar, üretim koordinasyonunu proje kapsamına göre yürütürüz. Montaj, izinler, nakliye ve açık hava mecra satın alımı gibi konuların sorumluluklarını baştan belirleriz.",
    audience:
      "Mağaza veya ofis açan, vitrini ve tabelasını yenileyen, basılı tanıtım materyali veya yerel kampanya hazırlayan işletmeler için.",
    items: [
      "Kartvizit, broşür, katalog ve menü",
      "Ambalaj, etiket ve promosyon tasarımları",
      "Tabela ve yönlendirme tasarımı",
      "Vitrin ve araç giydirme görselleri",
      "Afiş ve açık hava kampanya uyarlamaları",
      "Baskı hazırlığı ve üretim koordinasyonu",
    ],
    process: [
      {
        title: "Alanı ve ihtiyacı tanırız",
        description:
          "Ölçü, adet, kullanım mesafesi ve malzeme beklentisini belirleriz.",
      },
      {
        title: "Uygulamayı tasarlarız",
        description:
          "Marka kimliğini ve okunabilirliği fiziksel koşullarda değerlendiririz.",
      },
      {
        title: "Teknik hazırlığı yaparız",
        description:
          "Baskı ve üretim dosyalarını onaylı ölçü ve teknik özelliklere göre hazırlarız.",
      },
      {
        title: "Üretimi planlarız",
        description:
          "Kapsama göre tedarik, numune, teslim ve uygulama koordinasyonunu yürütürüz.",
      },
    ],
    faq: [
      {
        question: "Tasarım ve üretim birlikte yapılabilir mi?",
        answer:
          "Evet, ihtiyaç doğrultusunda birlikte planlanabilir. Tasarım, malzeme, üretim ve uygulama kalemleri ayrı gösterilerek teklif netleştirilir.",
      },
      {
        question: "Tabela için izin gerekiyor mu?",
        answer:
          "Konum ve uygulama türüne göre izin veya bina onayı gerekebilir. Yetkili kurumların koşulları uygulamadan önce değerlendirilmelidir.",
      },
      {
        question: "Baskı rengi ekrandakiyle aynı olur mu?",
        answer:
          "Ekran ve baskı farklı renk sistemleri kullanır. Kritik renkler için malzeme ve üretim tekniğine göre prova veya numune planlamak daha sağlıklıdır.",
      },
    ],
  },
];

export const services: Service[] = details.map((service, index) => ({
  ...service,
  number: String(index + 1).padStart(2, "0"),
}));
