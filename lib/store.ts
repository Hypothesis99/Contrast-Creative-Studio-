import "server-only";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { seed, editorialSeed } from "./seed";
import previousContent from "./content-v1.json";
import { mergeContentUpdate } from "./content-update";
import { fillSampleContent } from "./sample-content";
import type { Content, Lead } from "./types";
// Resolve mutable state at runtime, so database, upload and log writes do not
// become Turbopack source dependencies and trigger repeated page reloads.
const runtimeCwd = process.cwd.bind(process);
export const dataDir = path.resolve(
  /* turbopackIgnore: true */ process.env.CONTRAST_DATA_DIR ||
    path.join(runtimeCwd(), ".data"),
);
let db: DatabaseSync;
function database() {
  if (!db) {
    mkdirSync(dataDir, { recursive: true, mode: 0o700 });
    db = new DatabaseSync(path.join(dataDir, "studio.sqlite"));
    db.exec(
      "PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS content (id INTEGER PRIMARY KEY, value TEXT NOT NULL); CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, value TEXT NOT NULL); CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS content_updates (id TEXT PRIMARY KEY)",
    );
    db.prepare("INSERT OR IGNORE INTO content(id,value) VALUES(1,?)").run(
      JSON.stringify(seed),
    );
    db.exec("BEGIN IMMEDIATE");
    try {
      const version = "editorial-2026-10-v2";
      if (
        !db.prepare("SELECT id FROM content_updates WHERE id=?").get(version)
      ) {
        const row = db
          .prepare("SELECT value FROM content WHERE id=1")
          .get() as { value: string };
        const updated = mergeContentUpdate(
          JSON.parse(row.value),
          previousContent,
          editorialSeed,
        );
        db.prepare("UPDATE content SET value=? WHERE id=1").run(
          JSON.stringify(updated),
        );
        db.prepare("INSERT INTO content_updates(id) VALUES(?)").run(version);
      }
      const sampleVersion = "sample-preview-2026-10-v3";
      if (
        !db
          .prepare("SELECT id FROM content_updates WHERE id=?")
          .get(sampleVersion)
      ) {
        const row = db
          .prepare("SELECT value FROM content WHERE id=1")
          .get() as {
          value: string;
        };
        db.prepare("UPDATE content SET value=? WHERE id=1").run(
          JSON.stringify(fillSampleContent(JSON.parse(row.value))),
        );
        db.prepare("INSERT INTO content_updates(id) VALUES(?)").run(
          sampleVersion,
        );
      }
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      db.close();
      db = undefined!;
      throw error;
    }
  }
  return db;
}
export function getContent(): Content {
  return JSON.parse(
    (
      database().prepare("SELECT value FROM content WHERE id=1").get() as {
        value: string;
      }
    ).value,
  );
}
export function saveContent(content: Content) {
  database()
    .prepare("UPDATE content SET value=? WHERE id=1")
    .run(JSON.stringify(content));
}
export function getLeads(): Lead[] {
  return database()
    .prepare("SELECT value FROM leads ORDER BY rowid DESC")
    .all()
    .map((r) => JSON.parse(r.value as string));
}
export function addLead(lead: Lead) {
  database()
    .prepare("INSERT INTO leads(id,value) VALUES(?,?)")
    .run(lead.id, JSON.stringify(lead));
}
export function setLeadStatus(id: string, status: string) {
  const lead = getLeads().find((l) => l.id === id);
  if (!lead) return false;
  lead.status = status;
  database()
    .prepare("UPDATE leads SET value=? WHERE id=?")
    .run(JSON.stringify(lead), id);
  return true;
}
export function rateLimit(key: string, max: number, seconds: number): boolean {
  const now = Date.now(),
    connection = database();
  connection.prepare("DELETE FROM rate_limits WHERE expires < ?").run(now);
  connection
    .prepare(
      "INSERT INTO rate_limits(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1",
    )
    .run(key, now + seconds * 1000);
  return (
    (
      connection
        .prepare("SELECT count FROM rate_limits WHERE key=?")
        .get(key) as { count: number }
    ).count <= max
  );
}
