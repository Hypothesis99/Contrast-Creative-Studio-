import { isAdmin, sameOrigin } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/store";
import { validateContent } from "@/lib/validate";
export async function GET() {
  if (!(await isAdmin()))
    return Response.json({ error: "Giriş gerekli." }, { status: 401 });
  return Response.json(getContent(), {
    headers: { "Cache-Control": "no-store" },
  });
}
export async function PUT(request: Request) {
  if (!(await isAdmin()) || !sameOrigin(request))
    return Response.json({ error: "Yetkisiz istek." }, { status: 403 });
  if (Number(request.headers.get("content-length")) > 2 * 1024 * 1024)
    return Response.json({ error: "İçerik çok büyük." }, { status: 413 });
  try {
    const content = validateContent(await request.json());
    saveContent(content);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "İçerik kaydedilemedi." },
      { status: 400 },
    );
  }
}
