import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container page-intro">
      <span className="eyebrow">404 — YENİ BİR YÖN</span>
      <h1>Bu sayfa burada değil.</h1>
      <p>İyi fikirleri bulmak için ana sayfadan başlayabilirsiniz.</p>
      <Link href="/" className="button">
        Ana sayfaya dön ↗
      </Link>
    </section>
  );
}
