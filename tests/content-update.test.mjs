import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { mergeContentUpdate } from "../lib/content-update.ts";

const previous = JSON.parse(
  readFileSync(new URL("../lib/content-v1.json", import.meta.url), "utf8"),
);
function revision() {
  const next = structuredClone(previous);
  next.settings.about = "Yeni ajans hikâyesi";
  next.settings.team = "Yeni ekip tanıtımı";
  next.services[0].intro = "Yeni hizmet tanıtımı";
  next.services[0].faq = [
    { question: "Kapsam nedir?", answer: "Kapsam açıklaması" },
  ];
  next.projects[0].summary = "Yeni proje özeti";
  next.projects[0].gallery = ["/images/forma-detail.svg"];
  next.articles[0].body = "Yeni blog metni";
  next.projects.push({
    ...next.projects[0],
    id: "p-new",
    slug: "yeni-konsept",
  });
  next.articles.push({ ...next.articles[0], id: "a-new", slug: "yeni-yazi" });
  return next;
}

test("content update preserves edited fields, uploads, drafts and deleted old records", () => {
  const current = structuredClone(previous);
  current.settings.email = "saved@example.org";
  current.settings.about = "Yönetici tarafından yazılmış hikâye";
  current.services[0].intro = "Yönetici tarafından yazılmış tanıtım";
  current.projects[0].gallery = [
    "/media/11111111-1111-1111-1111-111111111111.png",
  ];
  current.articles[0].published = false;
  current.articles[0].body = "Yönetici tarafından yazılmış blog";
  current.projects.splice(1, 1);
  const snapshot = structuredClone(current);
  const next = revision();
  const updated = mergeContentUpdate(current, previous, next);
  assert.equal(updated.settings.email, "saved@example.org");
  assert.equal(updated.settings.about, current.settings.about);
  assert.equal(updated.settings.team, next.settings.team);
  assert.equal(updated.services[0].intro, current.services[0].intro);
  assert.deepEqual(updated.services[0].faq, next.services[0].faq);
  assert.deepEqual(updated.projects[0].gallery, current.projects[0].gallery);
  assert.equal(updated.projects[0].summary, next.projects[0].summary);
  assert.equal(
    updated.projects.some((project) => project.id === "p-2"),
    false,
  );
  assert.equal(updated.articles[0].published, false);
  assert.equal(updated.articles[0].body, current.articles[0].body);
  assert.equal(updated.projects.at(-1).id, "p-new");
  assert.equal(updated.articles.at(-1).id, "a-new");
  assert.deepEqual(current, snapshot);
});

test("unchanged content receives the revision without duplicate records on repeat", () => {
  const next = revision();
  const updated = mergeContentUpdate(previous, previous, next);
  assert.deepEqual(updated, next);
  assert.deepEqual(mergeContentUpdate(updated, previous, next), next);
});

test("new seed records do not collide with existing custom IDs or URLs", () => {
  const current = structuredClone(previous);
  current.projects.push({
    ...previous.projects[0],
    id: "p-new",
    slug: "ozel-proje",
    title: "Özel proje",
  });
  current.articles.push({
    ...previous.articles[0],
    id: "a-custom",
    slug: "yeni-yazi",
    title: "Özel yazı",
  });
  const updated = mergeContentUpdate(current, previous, revision());
  assert.equal(
    updated.projects.filter((project) => project.id === "p-new").length,
    1,
  );
  assert.equal(updated.projects.at(-1).title, "Özel proje");
  assert.equal(
    updated.articles.filter((article) => article.slug === "yeni-yazi").length,
    1,
  );
  assert.equal(updated.articles.at(-1).title, "Özel yazı");
});

test("production build traces exclude mutable private data", () => {
  const root = new URL("../.next/server/", import.meta.url);
  const traces = readdirSync(root, { recursive: true }).filter((file) =>
    file.endsWith(".nft.json"),
  );
  assert.ok(
    traces.length > 0,
    "Production traces must exist before running this check.",
  );
  for (const file of traces) {
    const trace = JSON.parse(readFileSync(new URL(file, root), "utf8"));
    assert.equal(
      trace.files.some((entry) => /(^|\/)\.data\//.test(entry)),
      false,
      file,
    );
  }
});
