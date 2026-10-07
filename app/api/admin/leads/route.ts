import { isAdmin, sameOrigin } from "@/lib/auth";
import { getLeads, setLeadStatus } from "@/lib/store";
export async function GET() {
  if (!(await isAdmin()))
    return Response.json({ error: "Giriş gerekli." }, { status: 401 });
  return Response.json(getLeads(), {
    headers: { "Cache-Control": "no-store" },
  });
}
export async function PATCH(request: Request) {
  if (!(await isAdmin()) || !sameOrigin(request))
    return Response.json({ error: "Yetkisiz istek." }, { status: 403 });
  const { id, status } = await request.json();
  if (
    typeof id !== "string" ||
    !["Yeni", "Görüşülüyor", "Tamamlandı"].includes(status)
  )
    return Response.json({ error: "Geçersiz durum." }, { status: 400 });
  return Response.json({ ok: setLeadStatus(id, status) });
}
