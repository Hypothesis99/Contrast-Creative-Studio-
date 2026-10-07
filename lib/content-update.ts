import type { Content } from "./types";

// Preserve editorial changes, publication choices, uploads and deleted records.
function mergeFields<T extends object>(current: T, previous: T, next: T): T {
  const merged = { ...current };
  for (const key of Object.keys(next) as (keyof T)[]) {
    if (
      current[key] === undefined ||
      JSON.stringify(current[key]) === JSON.stringify(previous[key])
    ) {
      merged[key] = structuredClone(next[key]);
    }
  }
  return merged;
}

function mergeCollection<T extends { slug: string }>(
  current: T[],
  previous: T[],
  next: T[],
): T[] {
  const merged = current.map((record) => {
    const oldRecord = previous.find((old) => old.slug === record.slug);
    const newRecord = next.find((item) => item.slug === record.slug);
    return oldRecord && newRecord
      ? mergeFields(record, oldRecord, newRecord)
      : record;
  });
  for (const record of next) {
    if (previous.some((old) => old.slug === record.slug)) continue;
    if (
      merged.some(
        (existing) =>
          existing.slug === record.slug ||
          ("id" in record && "id" in existing && existing.id === record.id),
      )
    )
      continue;
    merged.push(structuredClone(record));
  }
  return merged;
}

export function mergeContentUpdate(
  current: Content,
  previous: Content,
  next: Content,
): Content {
  return {
    settings: mergeFields(current.settings, previous.settings, next.settings),
    services: mergeCollection(
      current.services,
      previous.services,
      next.services,
    ),
    projects: mergeCollection(
      current.projects,
      previous.projects,
      next.projects,
    ),
    articles: mergeCollection(
      current.articles,
      previous.articles,
      next.articles,
    ),
  };
}
