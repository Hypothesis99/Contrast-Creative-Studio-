# Contrast Creative Studio

Türkçe ajans sitesi. Next.js App Router, React, TypeScript ve Node.js 24 ile çalışır. SQLite içerikleri ve teklif taleplerini kalıcı olarak tutar; görseller yereldir, fontlar uygulamayla birlikte sunulur.

## Yayınlamadan tarayıcıda önizleme

**[GitHub Codespaces ile aç](https://codespaces.new/Hypothesis99/Contrast-Creative-Studio-?ref=main)**

1. GitHub hesabınızla giriş yapın ve **Create codespace** düğmesine basın.
2. Kurulum tamamlanınca site otomatik başlar. Açılmazsa **Ports** sekmesindeki **3000** portunun **Open in Browser** düğmesine basın.
3. **Port Visibility** ayarını **Private** olarak bırakın. GitHub Codespaces portları varsayılan olarak özeldir; yalnızca sizin oturumunuzdan erişilir.

Depodaki `.devcontainer` ayarı Node.js 24 ortamını ve bağımlılıkları hazırlar. Her yeniden açılışta başlangıç betiği çalışan uygulamayı kontrol eder veya yeniden başlatır. Alan adı, canlı site yayını ve Google indekslemesi gerekmez. Yönetim panelini görmek için Codespaces terminalinde `npm run admin:setup` çalıştırıp bir parola belirleyin; ardından aynı önizleme adresinde `/admin` yolunu açın.

Manuel yeniden başlatma: `bash .devcontainer/start-preview.sh`. Başlangıç hataları `.data/preview.log` dosyasına yazılır. Codespaces ayarı ve başlangıç komutları geliştirme ortamında doğrulanmıştır; GitHub hesabınızda Codespace oluşturma adımını siz tamamlamalısınız.

## İçerik seçkisi ve mevcut önizlemeyi güncelleme

12 ayrı hizmet sayfasında özgün tanıtım, teslim kapsamı, hedef kitle, dört çalışma adımı ve üç sık sorulan soru bulunur. Başlangıç içerikleri ayrıca 8 SEO yazısı, 6 konsept proje, proje galerileri, ajans hikâyesi, ekip yaklaşımı, iletişim/brief rehberi ve hukuki metin taslaklarını içerir. Konsept markalar gerçek müşteri referansı veya yayınlanmış kampanya değildir.

Mevcut Codespaces önizlemesinin **tarayıcı içindeki terminalinde** şu komutları çalıştırın; ardından siteyi yenileyin:

```bash
git pull --ff-only
bash .devcontainer/start-preview.sh
```

Mac'in ayrı Terminal uygulamasında değil, Codespaces editöründe çalıştırın. Telefon, e-posta, WhatsApp, Instagram, açık adres, çalışma saatleri, gerçek müşteri yorumları ve showreel bağlantısı doğrulanmadan uydurma bilgiler eklenmez; bu alanlar panelden gerçek bilgilerle tamamlanabilir.

## Geliştirme

```bash
cd /workspace/Contrast-Creative-Studio-
npm ci
npm run dev
```

Her bulut görevi zaten izole bir ortamda çalışır. Mevcut depoyu kullanın; kullanıcı özellikle istemedikçe Git worktree oluşturmayın.

## Kontroller

```bash
npm run build
npm run typecheck
npm test
```

`npm test` üretim derlemesini kullanır ve ayrı bir geçici veritabanıyla 15 entegrasyon testi, 3 içerik güncelleme testi ve 1 derleme gizliliği kontrolü çalıştırır: tüm sayfalar ve 12 hizmet, giriş yetkisi, yabancı origin engellemesi, Codespaces HTTPS adresi, form doğrulaması, dosya gizliliği, kayıt kalıcılığı, blog taslak/yayın geçişi, içerik doğrulaması, görsel yükleme, canonical/schema/sitemap ve çıkış. Test kullanıcı bilgileri rastgele oluşturulur, gösterilmez ve gerçek içerik değiştirilmez. Derleme sırasında aynı `.next` klasörünü kullanan geliştirme sunucusunu durdurun.

## Yönetici hesabı

```bash
npm run admin:setup
```

Etkileşimli terminalde en az 12 karakterlik bir parola belirleyin. Parola ekranda gösterilmez; yalnızca scrypt hash’i ve rastgele oturum anahtarı `.data/admin.json` içinde, dosya izinleri `0600` olacak şekilde tutulur. Ardından `/admin` sayfasından giriş yapılır. Varsayılan parola yoktur. Yapılandırma yoksa panel kapalı kalır.

Alternatif olarak dağıtım platformunun güvenli değişken ayarlarında `ADMIN_PASSWORD` (en az 12 karakter) ve `SESSION_SECRET` (en az 32 karakter) birlikte tanımlanabilir. Gizli değerleri Git’e, kurulum talimatlarına veya sohbete yazmayın. Bu iki değişken proxy üzerinden değiştirilen placeholder değil, uygulama sürecine gerçekten sağlanan yerel değerler olmalıdır.

Panelde şunlar yönetilir:

- Blog yazıları: kategori, tarih, kapak yükleme, Markdown metni, önizleme, URL, SEO başlığı/açıklaması ve taslak/yayın durumu.
- Projeler: müşteri, çalışma, ihtiyaç, çözüm, öncesi/sonrası, görsel galerisi, video bağlantısı ve konsept/yayın durumu.
- Hizmet metinleri, hedef kitle, çalışma adımları ve sık sorulan sorular; ajans hikâyesi, ekip tanıtımı ve iletişim bilgileri.
- Firma logoları ve gerçek müşteri yorumları.
- Teklif talepleri, durum takibi ve korumalı dosya indirme.
- Alan adı, Google Analytics, Meta Pixel ve Search Console doğrulaması.

İçerik değişikliklerini panelde **Değişiklikleri kaydet** ile kalıcı hâle getirin. Hizmet kısa adları bilinçli olarak sabittir; mevcut bağlantılar korunur.

## Veriler ve dosyalar

Varsayılan veri dizini `.data/`dır. `CONTRAST_DATA_DIR` ile kalıcı bir disk üzerindeki başka bir dizin seçilebilir. İçerik SQLite veritabanında, yüklemeler `media/` ve özel teklif ekleri `attachments/` altında tutulur. Veriler ilk açılışta `lib/seed.ts` içeriğiyle başlatılır. İçerik güncellemesi, eski örnek metinlerle hâlâ aynı olan alanları bir kez yeniler; panelden değiştirilen metinler, dosyalar, yayın tercihleri ve iletişim bilgileri korunur. Silinen eski kayıtlar geri eklenmez. Sonraki yeniden başlatmalar kayıtları sıfırlamaz. Canlı veri dizini geliştirme derleyicisinin kaynak izlemesine dahil edilmez; `.data/` dosyaları üretim bağımlılık listelerinden de hariç tutulur ve çalışma anında kalıcı diskten okunur.

Teklifler panelde saklanır; e-posta veya WhatsApp bildirimi gönderilmez. Ek dosyalar en fazla 5 MB PDF/JPG/PNG/WebP; panel görselleri en fazla 3 MB JPG/PNG/WebP olabilir. Dosya içeriği, oturum ve aynı origin kontrolleri sunucuda doğrulanır.

Yedeklerde veri dizinini, görselleri ve korumalı ekleri birlikte saklayın. Canlı SQLite yedeklemesi için SQLite backup API’sini kullanın veya sunucuyu durdurup tüm `.data` dizinini kopyalayın. Yalnızca `studio.sqlite` dosyasını canlı kopyalamak WAL içindeki son kayıtları kaçırabilir. Veri dizini gizli bilgiler içerir; paylaşmayın.

## Yayına alma

Bu uygulama kalıcı diski olan bir **Node.js 24 sunucusu** gerektirir. Statik site olarak dışa aktarılamaz; SQLite için geçici dosya sistemli serverless dağıtım uygun değildir.

```bash
npm ci
npm run build
COOKIE_SECURE=true npm start
```

- HTTPS/TLS’yi alan adınızı barındıran platformda veya reverse proxy’de etkinleştirin.
- `NEXT_PUBLIC_SITE_URL` değişkenine veya paneldeki site adresi alanına gerçek HTTPS alan adını girin. Reverse proxy arkasında giriş için bu origin’i açıkça yapılandırın.
- HTTPS yayında `COOKIE_SECURE=true` tanımlayın. HTTP üzerinden yerel geliştirmede bu değişkeni tanımlamayın.
- Yönetici hesabını güvenli biçimde oluşturun; gerçek telefon, WhatsApp, e-posta, Instagram, adres ve çalışma saatlerini ekleyin.
- Konsept projeler gerçek müşteri projesi değildir. Gerçek projeleri, referansları, ekip/ofis içeriğini ve showreel bağlantısını panelden ekleyin.
- KVKK ve gizlilik metinleri ön taslaktır. Veri sorumlusu bilgileri, hukuki dayanak, süreler, aktarım ve başvuru kanalları gerçek işletme süreçlerine göre tamamlanmalıdır.

Alan adı boşken sayfalarda `noindex` kullanılır; robots tüm indekslemeyi kapatır ve sitemap boş kalır. HTTPS alan adı tanımlanınca canonical, schema.org verileri ve yalnızca yayındaki içerikleri kapsayan sitemap otomatik oluşur. Search Console doğrulama kodu tanımlanabilir; sitemap gönderimi Google hesabında yapılır. Google Analytics/Meta Pixel kimlikleri isteğe bağlıdır ve scriptler yalnızca ziyaretçinin çerez onayından sonra yüklenir. Ölçüm aktifken alt köşedeki **Çerez tercihleri** düğmesi tercihi sıfırlar.

Bloglarda `#` başlık, `##` alt başlık ve `-` liste kullanılabilir. HTML çalıştırılmaz. Uygulama bulut ortamında ve yerel tarayıcı istekleriyle doğrulanmıştır; alan adı bağlantısı ve canlı yayın yapılmamıştır.
