import { randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { addLead, dataDir, getContent, rateLimit } from "@/lib/store";
import { attachmentType, mimeTypes } from "@/lib/uploads";
export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > 6 * 1024 * 1024)
    return Response.json(
      { error: "Dosya en fazla 5 MB olmalı." },
      { status: 413 },
    );
  if (!rateLimit("quotes", 60, 3600))
    return Response.json(
      { error: "Çok fazla talep alındı. Lütfen daha sonra tekrar deneyin." },
      { status: 429 },
    );
  try {
    const f = await request.formData();
    const value = (key: string, max: number) =>
      String(f.get(key) || "")
        .trim()
        .slice(0, max);
    if (value("website", 100)) return Response.json({ ok: true });
    const company = value("company", 150),
      name = value("name", 100),
      phone = value("phone", 30),
      email = value("email", 160),
      message = value("message", 6000);
    const valid = new Set(getContent().services.map((s) => s.slug)),
      services = f
        .getAll("services")
        .map(String)
        .filter((s) => valid.has(s));
    if (
      !company ||
      !name ||
      phone.replace(/\D/g, "").length < 7 ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      message.length < 10 ||
      !services.length ||
      f.get("consent") !== "on"
    )
      return Response.json(
        {
          error:
            "Zorunlu alanları doldurun, en az bir hizmet seçin ve aydınlatma metnini onaylayın.",
        },
        { status: 400 },
      );
    const startDate = value("startDate", 10);
    if (startDate && !/^\d{4}-\d{2}-\d{2}$/.test(startDate))
      return Response.json(
        { error: "Geçerli bir başlangıç tarihi seçin." },
        { status: 400 },
      );
    let fileName = "",
      filePath = "",
      fileType = "";
    const file = f.get("file");
    if (file instanceof File && file.size) {
      if (file.size > 5 * 1024 * 1024)
        return Response.json(
          { error: "Dosya en fazla 5 MB olmalı." },
          { status: 413 },
        );
      const buffer = Buffer.from(await file.arrayBuffer()),
        ext = attachmentType(buffer);
      if (!ext)
        return Response.json(
          { error: "Yalnızca PDF, JPG, PNG ve WebP dosyaları kabul edilir." },
          { status: 400 },
        );
      fileName = file.name.replace(/[\r\n]/g, "").slice(0, 180);
      filePath = `${randomUUID()}.${ext}`;
      fileType = mimeTypes[ext];
      mkdirSync(path.join(dataDir, "attachments"), {
        recursive: true,
        mode: 0o700,
      });
      writeFileSync(path.join(dataDir, "attachments", filePath), buffer, {
        mode: 0o600,
        flag: "wx",
      });
    }
    const id = randomUUID();
    addLead({
      id,
      company,
      name,
      phone,
      email,
      services,
      budget: value("budget", 100),
      startDate,
      message,
      fileName,
      filePath,
      fileType,
      createdAt: new Date().toISOString(),
      status: "Yeni",
    });
    return Response.json({ ok: true, id }, { status: 201 });
  } catch {
    return Response.json(
      { error: "Talep kaydedilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 },
    );
  }
}
