import { logout, sameOrigin } from "@/lib/auth";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Geçersiz istek." }, { status: 403 });
  await logout();
  return Response.json({ ok: true });
}
