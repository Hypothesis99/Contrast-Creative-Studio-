import { randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { isAdmin, sameOrigin } from "@/lib/auth";
import { dataDir } from "@/lib/store";
import { imageType } from "@/lib/uploads";
export async function POST(request: Request) {
  if (!(await isAdmin()) || !sameOrigin(request))
    return Response.json({ error: "Yetkisiz istek." }, { status: 403 });
  if (Number(request.headers.get("content-length")) > 4 * 1024 * 1024)
    return Response.json(
      { error: "Görsel en fazla 3 MB olmalı." },
      { status: 413 },
    );
  try {
    const form = await request.formData(),
      file = form.get("file");
    if (!(file instanceof File) || file.size > 3 * 1024 * 1024 || !file.size)
      return Response.json(
        { error: "En fazla 3 MB boyutunda bir görsel seçin." },
        { status: 400 },
      );
    const bytes = Buffer.from(await file.arrayBuffer()),
      ext = imageType(bytes);
    if (!ext)
      return Response.json(
        { error: "JPG, PNG veya WebP yükleyin." },
        { status: 400 },
      );
    const id = `${randomUUID()}.${ext}`;
    mkdirSync(path.join(dataDir, "media"), { recursive: true });
    writeFileSync(path.join(dataDir, "media", id), bytes, { flag: "wx" });
    return Response.json({ url: `/media/${id}` });
  } catch {
    return Response.json({ error: "Görsel yüklenemedi." }, { status: 400 });
  }
}
