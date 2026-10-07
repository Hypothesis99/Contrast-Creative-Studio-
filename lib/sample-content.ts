import type { ContactField, Content, Settings } from "./types";

export const sampleContacts: Record<ContactField, string> = {
  phone: "+90 (5XX) XXX XX XX",
  whatsapp: "+90 (5XX) XXX XX XX",
  email: "merhaba@contrast.example",
  instagram: "https://contrast.example/instagram",
  address: "Örnek Mahallesi, Stüdyo Sokak No: 12, Kat: 2\nOrhangazi / Bursa",
  hours: "Pazartesi–Cuma: 09.00–18.00\nCumartesi: Randevuyla · Pazar: Kapalı",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Orhangazi%2C+Bursa",
};

export function isSampleContact(settings: Settings, field: ContactField) {
  return Boolean(
    settings.sampleContactFields?.includes(field) ||
    settings[field] === sampleContacts[field],
  );
}

// Used once by the database update; administrator edits and existing records
// take precedence over these preview examples.
export function fillSampleContent(content: Content): Content {
  const next = structuredClone(content);
  const fields = new Set(next.settings.sampleContactFields ?? []);
  for (const key of Object.keys(sampleContacts) as ContactField[]) {
    if (!next.settings[key].trim()) {
      next.settings[key] = sampleContacts[key];
      fields.add(key);
    }
  }
  next.settings.sampleContactFields = [...fields];
  if (!next.settings.showreelUrl.trim()) {
    next.settings.showreelUrl = "/showreel";
    next.settings.showreelDemo = true;
  }
  if (!next.settings.clients.length) {
    next.settings.clients = ["FORMA", "MORA", "PULSE", "ATELIER"].map(
      (name) => ({
        name,
        logo: `/images/reference-${name.toLowerCase()}.svg`,
        demo: true,
      }),
    );
  }
  if (!next.settings.testimonials.length) {
    next.settings.testimonials = [
      {
        name: "Örnek marka yöneticisi",
        company: "FORMA",
        text: "Markamızın anlatmak istediğini ilk görüşmeden itibaren anladılar. Kimlik çalışmasındaki bütün detayların aynı fikre hizmet etmesi bizi en çok etkileyen şey oldu.",
        demo: true,
      },
      {
        name: "Örnek işletme sahibi",
        company: "MORA",
        text: "Ambalajdan sosyal medya görsellerine kadar tutarlı bir dil kuruldu. Sürecin her adımında neyi neden yaptığımızı bilmek, birlikte çalışmayı çok kolaylaştırdı.",
        demo: true,
      },
      {
        name: "Örnek marka temsilcisi",
        company: "PULSE",
        text: "Fikrimizi dinleyip sade ve güçlü bir tasarıma dönüştürdüler. Düzenli iletişim ve özenli teslim sayesinde yeni marka dünyamızı rahatlıkla kullanmaya başladık.",
        demo: true,
      },
    ];
  }
  return next;
}
