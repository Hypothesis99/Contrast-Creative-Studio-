"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import type { Settings } from "@/lib/types";
export function CookieConsent({ settings }: { settings: Settings }) {
  const [consent, setConsent] = useState<string | null>(null),
    [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setConsent(localStorage.getItem("contrast_consent"));
    setLoaded(true);
  }, []);
  function choose(value: string) {
    localStorage.setItem("contrast_consent", value);
    setConsent(value);
  }
  const ga = /^G-[A-Z0-9]+$/.test(settings.gaId) ? settings.gaId : "",
    pixel = /^\d{5,20}$/.test(settings.pixelId) ? settings.pixelId : "";
  const analytics = !!(ga || pixel);
  return (
    <>
      {loaded && analytics && !consent && (
        <aside className="cookie-banner" aria-label="Çerez tercihleri">
          <div>
            <strong>Tercihiniz önemli.</strong>
            <p>
              Sitenin kullanımını anlamak için, yalnızca izninizle ölçüm
              çerezleri kullanıyoruz.{" "}
              <Link href="/cerez-politikasi">Çerez politikası</Link>
            </p>
          </div>
          <button
            className="button outline small"
            onClick={() => choose("denied")}
          >
            Yalnızca gerekli
          </button>
          <button className="button small" onClick={() => choose("granted")}>
            Kabul et
          </button>
        </aside>
      )}
      {analytics && loaded && consent && (
        <button
          className="cookie-settings"
          onClick={() => {
            localStorage.removeItem("contrast_consent");
            window.location.reload();
          }}
        >
          Çerez tercihleri
        </button>
      )}
      {consent === "granted" && ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga-init"
            strategy="afterInteractive"
          >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(ga)});`}</Script>
        </>
      )}
      {consent === "granted" && pixel && (
        <Script
          id="meta-init"
          strategy="afterInteractive"
        >{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(pixel)});fbq('track','PageView');`}</Script>
      )}
    </>
  );
}
