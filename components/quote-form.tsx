"use client";
import { useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/types";
import { quoteTopics } from "@/lib/quote-topics";
export function QuoteForm({
  services,
  initialService = "",
}: {
  services: Service[];
  initialService?: string;
}) {
  const [sending, setSending] = useState(false),
    [message, setMessage] = useState(""),
    [success, setSuccess] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setMessage("");
    try {
      const response = await fetch("/api/teklif", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Talep kaydedilemedi.");
      setSuccess(true);
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Bağlantınızı kontrol edip tekrar deneyin.",
      );
    } finally {
      setSending(false);
    }
  }
  if (success)
    return (
      <div className="form-success" role="status">
        <span>✓</span>
        <h2>İlk adımı attık.</h2>
        <p>
          Talebiniz bize ulaştı. Paylaştığınız iletişim bilgileri üzerinden
          projenizi konuşmak için sizinle iletişime geçeceğiz.
        </p>
        <button className="button outline" onClick={() => setSuccess(false)}>
          Yeni bir talep oluştur
        </button>
      </div>
    );
  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          Firma adı *
          <input
            name="company"
            autoComplete="organization"
            required
            maxLength={150}
            placeholder="Markanızın adı"
          />
        </label>
        <label>
          Adınız ve soyadınız *
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Sizi nasıl tanıyalım?"
          />
        </label>
        <label>
          Telefon *
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            minLength={7}
            maxLength={30}
            placeholder="05xx xxx xx xx"
          />
        </label>
        <label>
          E-posta *
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            placeholder="merhaba@markaniz.com"
          />
        </label>
      </div>
      <fieldset className="service-checkboxes">
        <legend>Hangi konuda çalışmak istiyorsunuz? *</legend>
        {quoteTopics
          .filter(
            (topic) =>
              topic.id === "diger" ||
              topic.services.some((slug) =>
                services.some((s) => s.slug === slug),
              ),
          )
          .map((topic) => (
            <label key={topic.id}>
              <input
                type="checkbox"
                name="services"
                value={`topic:${topic.id}`}
                defaultChecked={topic.services.includes(initialService)}
              />
              <span>{topic.label}</span>
            </label>
          ))}
      </fieldset>
      <div className="form-grid">
        <label>
          Yaklaşık bütçe
          <select name="budget" defaultValue="Henüz belirlemedim">
            <option>Henüz belirlemedim</option>
            <option>10.000 – 25.000 TL</option>
            <option>25.000 – 50.000 TL</option>
            <option>50.000 – 100.000 TL</option>
            <option>100.000 TL+</option>
          </select>
        </label>
        <label>
          Proje başlangıcı
          <input name="startDate" type="date" />
        </label>
      </div>
      <label>
        Projenizi kısaca anlatın *
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={6000}
          rows={5}
          placeholder="İhtiyacınız, hedefiniz ve aklınızdaki fikirler…"
        />
      </label>
      <label className="upload-label">
        Bir brief veya görsel paylaşın
        <input name="file" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" />
        <small>PDF, JPG, PNG veya WebP · En fazla 5 MB</small>
      </label>
      <label className="honeypot" aria-hidden="true">
        Web siteniz
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent-label">
        <input type="checkbox" name="consent" required />
        <span>
          <Link href="/kvkk" target="_blank">
            KVKK aydınlatma metnini
          </Link>{" "}
          okudum. Bilgilerimin teklif talebime yanıt verilmesi amacıyla
          işlenmesini kabul ediyorum.
        </span>
      </label>
      {message && (
        <p className="form-error" role="alert">
          {message}
        </p>
      )}
      <button className="button" type="submit" disabled={sending}>
        {sending ? "Gönderiliyor…" : "Projeyi gönder →"}
      </button>
      <p className="form-footnote">
        * alanlar zorunludur. Talebiniz yalnızca projenizi değerlendirmek için
        kullanılır.
      </p>
    </form>
  );
}
