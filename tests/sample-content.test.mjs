import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fillSampleContent, isSampleContact } from "../lib/sample-content.ts";

const legacy = JSON.parse(
  readFileSync(new URL("../lib/content-v1.json", import.meta.url), "utf8"),
);
const contactFields = [
  "phone",
  "whatsapp",
  "email",
  "instagram",
  "address",
  "hours",
  "mapUrl",
];

function freeze(value) {
  if (value && typeof value === "object") {
    Object.freeze(value);
    for (const child of Object.values(value)) freeze(child);
  }
  return value;
}

test("empty legacy settings receive clearly marked contact, reference and showreel examples", () => {
  const input = structuredClone(legacy);
  const snapshot = structuredClone(input);
  const updated = fillSampleContent(freeze(input));

  for (const key of contactFields) {
    assert.ok(updated.settings[key].trim(), `${key} has sample content`);
    assert.equal(isSampleContact(updated.settings, key), true, key);
  }
  assert.deepEqual(
    [...updated.settings.sampleContactFields].sort(),
    [...contactFields].sort(),
  );
  assert.equal(updated.settings.showreelUrl, "/showreel");
  assert.equal(updated.settings.showreelDemo, true);
  assert.equal(updated.settings.clients.length, 4);
  assert.equal(updated.settings.testimonials.length, 3);
  assert.ok(updated.settings.clients.every((client) => client.demo === true));
  assert.ok(
    updated.settings.testimonials.every(
      (testimonial) => testimonial.demo === true,
    ),
  );
  assert.equal(updated.settings.siteUrl, "");
  assert.equal(updated.settings.gaId, "");
  assert.equal(updated.settings.pixelId, "");
  assert.equal(updated.settings.searchConsoleId, "");
  assert.deepEqual(updated.services, snapshot.services);
  assert.deepEqual(updated.projects, snapshot.projects);
  assert.deepEqual(updated.articles, snapshot.articles);
  assert.deepEqual(input, snapshot);
});

test("existing real contacts, showreel, client records and testimonials remain unchanged", () => {
  const input = structuredClone(legacy);
  Object.assign(input.settings, {
    phone: "+90 555 123 45 67",
    whatsapp: "+905551234567",
    email: "actual@example.org",
    instagram: "https://www.instagram.com/actual-studio/",
    address: "Müşterinin kaydettiği gerçek adres",
    hours: "Salı–Cumartesi 10.00–18.00",
    mapUrl: "https://maps.google.com/?q=Bursa",
    showreelUrl: "https://www.youtube.com/watch?v=real-video",
    clients: [{ name: "Gerçek firma", logo: "/media/actual-logo.png" }],
    testimonials: [
      {
        name: "Gerçek müşteri",
        company: "Gerçek firma",
        text: "Mevcut yorum.",
      },
    ],
  });
  const snapshot = structuredClone(input);
  const updated = fillSampleContent(freeze(input));

  for (const key of contactFields) {
    assert.equal(updated.settings[key], snapshot.settings[key], key);
    assert.equal(isSampleContact(updated.settings, key), false, key);
  }
  assert.equal(updated.settings.sampleContactFields?.length ?? 0, 0);
  assert.equal(updated.settings.showreelUrl, snapshot.settings.showreelUrl);
  assert.notEqual(updated.settings.showreelDemo, true);
  assert.deepEqual(updated.settings.clients, snapshot.settings.clients);
  assert.deepEqual(
    updated.settings.testimonials,
    snapshot.settings.testimonials,
  );
  assert.deepEqual(input, snapshot);
});

test("partially completed settings flag only newly filled contact fields", () => {
  const input = structuredClone(legacy);
  input.settings.email = "saved@example.org";
  input.settings.phone = "+90 555 123 45 67";
  input.settings.address = "Panelde kaydedilmiş adres";
  const snapshot = structuredClone(input);
  const updated = fillSampleContent(freeze(input));
  const preserved = ["email", "phone", "address"];
  const filled = contactFields.filter((key) => !preserved.includes(key));

  assert.deepEqual(
    [...updated.settings.sampleContactFields].sort(),
    filled.sort(),
  );
  for (const key of preserved) {
    assert.equal(updated.settings[key], snapshot.settings[key], key);
    assert.equal(isSampleContact(updated.settings, key), false, key);
  }
  for (const key of filled)
    assert.equal(isSampleContact(updated.settings, key), true);
  assert.deepEqual(input, snapshot);
});

test("repeated filling is idempotent and keeps example flags and collections stable", () => {
  const first = fillSampleContent(structuredClone(legacy));
  const snapshot = structuredClone(first);
  const second = fillSampleContent(freeze(first));

  assert.deepEqual(second, snapshot);
  assert.deepEqual(first, snapshot);
  assert.equal(
    new Set(second.settings.sampleContactFields).size,
    second.settings.sampleContactFields.length,
  );
});
