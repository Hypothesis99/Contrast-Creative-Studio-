"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Settings } from "@/lib/types";
import { Arrow, Star } from "./icons";
import { CookieConsent } from "./tracking";
import { isSampleContact } from "@/lib/sample-content";
const links = [
  ["Hizmetler", "/hizmetler"],
  ["Projeler", "/projeler"],
  ["Hakkımızda", "/hakkimizda"],
  ["İçerikler", "/blog"],
  ["İletişim", "/iletisim"],
];
export function Brand() {
  return (
    <Link
      href="/"
      className="brand"
      aria-label="Contrast Creative Studio ana sayfa"
    >
      <span>
        contrast<span className="brand-dot">✳</span>
      </span>
      <small>CREATIVE STUDIO</small>
    </Link>
  );
}
export function SiteShell({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Settings;
}) {
  const pathname = usePathname(),
    [open, setOpen] = useState(false);
  if (pathname.startsWith("/admin")) return <>{children}</>;
  const whatsapp = settings.whatsapp.replace(/\D/g, "");
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav
            className={open ? "main-nav is-open" : "main-nav"}
            aria-label="Ana menü"
          >
            {links.map(([label, url]) => (
              <Link
                key={url}
                href={url}
                className={pathname.startsWith(url) ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/teklif-al"
              className="button small nav-cta"
              onClick={() => setOpen(false)}
            >
              Birlikte çalışalım <Arrow diagonal />
            </Link>
          </nav>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <section className="closing-cta" hidden={pathname === "/"}>
        <div className="container">
          <span className="eyebrow">SIRADAKİ İYİ FİKİR SİZİN OLABİLİR.</span>
          <Link href="/teklif-al">
            <h2>
              Bir projeniz mi var?
              <br />
              <span>Konuşalım.</span>
            </h2>
            <span className="big-arrow">
              <Arrow diagonal />
            </span>
          </Link>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Brand />
            <p>
              Marka · Dijital · Prodüksiyon
              <br />
              Orhangazi / Bursa
            </p>
            <div>
              {settings.email &&
                (isSampleContact(settings, "email") ? (
                  <span>{settings.email} · örnek</span>
                ) : (
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                ))}
              {settings.phone &&
                (isSampleContact(settings, "phone") ? (
                  <span>{settings.phone} · örnek</span>
                ) : (
                  <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}>
                    {settings.phone}
                  </a>
                ))}
              <Link href="/iletisim">
                İletişime geçin <Arrow diagonal />
              </Link>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <span className="eyebrow light">STÜDYO</span>
              <Link href="/hakkimizda">Hakkımızda</Link>
              <Link href="/projeler">Projeler</Link>
              <Link href="/referanslar">Referanslar</Link>
              <Link href="/blog">Blog & içerikler</Link>
            </div>
            <div>
              <span className="eyebrow light">MARKA & TASARIM</span>
              <Link href="/hizmetler/kurumsal-kimlik">Kurumsal kimlik</Link>
              <Link href="/hizmetler/logo-tasarimi">Logo tasarımı</Link>
              <Link href="/hizmetler/grafik-tasarim">Grafik tasarım</Link>
              <Link href="/hizmetler/baski-tabela-acik-hava">
                Baskı & tabela
              </Link>
            </div>
            <div>
              <span className="eyebrow light">DİJİTAL</span>
              <Link href="/hizmetler/sosyal-medya-yonetimi">
                Sosyal medya yönetimi
              </Link>
              <Link href="/hizmetler/web-sitesi-tasarimi">
                Web sitesi tasarımı
              </Link>
              <Link href="/hizmetler/google-ads">Google Ads</Link>
              <Link href="/hizmetler/meta-ads">Meta Ads</Link>
            </div>
            <div>
              <span className="eyebrow light">PRODÜKSİYON</span>
              <Link href="/hizmetler/fotograf-cekimi">Fotoğraf çekimi</Link>
              <Link href="/hizmetler/video-produksiyon">Video prodüksiyon</Link>
              <Link href="/hizmetler/reels-reklam-filmi">
                Reels & reklam filmi
              </Link>
              <Link href="/hizmetler/drone-cekimi">Drone çekimi</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Contrast Creative Studio</p>
            <div>
              <Link href="/referanslar">Referanslar</Link>
              <Link href="/kvkk">KVKK</Link>
              <Link href="/gizlilik">Gizlilik</Link>
              <Link href="/cerez-politikasi">Çerezler</Link>
              {settings.whatsapp && (
                <Link
                  href={
                    isSampleContact(settings, "whatsapp")
                      ? "/iletisim#iletisim-bilgileri"
                      : `https://wa.me/${whatsapp}`
                  }
                  {...(!isSampleContact(settings, "whatsapp")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  WhatsApp{isSampleContact(settings, "whatsapp") && " · örnek"}{" "}
                  ↗
                </Link>
              )}
              {settings.mapUrl && (
                <a
                  href={settings.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps
                  {isSampleContact(settings, "mapUrl") && " · örnek bölge"} ↗
                </a>
              )}
              {settings.instagram &&
                (isSampleContact(settings, "instagram") ? (
                  <Link href="/iletisim#iletisim-bilgileri">
                    Instagram · örnek ↗
                  </Link>
                ) : (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram ↗
                  </a>
                ))}
            </div>
            <span>
              Fikirden uygulamaya. Tek bir Contrast. <Star />
            </span>
          </div>
        </div>
      </footer>
      {settings.whatsapp && (
        <a
          className="whatsapp"
          href={
            isSampleContact(settings, "whatsapp")
              ? "/iletisim#iletisim-bilgileri"
              : `https://wa.me/${whatsapp}`
          }
          {...(!isSampleContact(settings, "whatsapp")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          aria-label={
            isSampleContact(settings, "whatsapp")
              ? "Örnek WhatsApp iletişim bilgileri"
              : "WhatsApp üzerinden iletişim"
          }
        >
          WhatsApp{isSampleContact(settings, "whatsapp") && " · örnek"}{" "}
          <Arrow diagonal />
        </a>
      )}
      <CookieConsent settings={settings} />
    </>
  );
}
