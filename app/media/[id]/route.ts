import { readFileSync } from "node:fs";
import path from "node:path";
import { dataDir } from "@/lib/store";
import { mimeTypes } from "@/lib/uploads";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!/^[a-f0-9-]{36}\.(jpg|png|webp)$/.test(id))
    return new Response("Bulunamadı", { status: 404 });
  try {
    return new Response(readFileSync(path.join(dataDir, "media", id)), {
      headers: {
        "Content-Type": mimeTypes[id.split(".").pop()!],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Bulunamadı", { status: 404 });
  }
}
