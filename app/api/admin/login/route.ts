import { adminConfigured, checkPassword, login, sameOrigin } from "@/lib/auth";
import { rateLimit } from "@/lib/store";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Geçersiz istek." }, { status: 403 });
  if (!adminConfigured())
    return Response.json(
      {
        error:
          "Yönetici hesabı henüz oluşturulmadı. Terminalde npm run admin:setup çalıştırın.",
      },
      { status: 503 },
    );
  if (!rateLimit("admin-login", 20, 300))
    return Response.json(
      { error: "Çok fazla giriş denemesi. Beş dakika sonra tekrar deneyin." },
      { status: 429 },
    );
  try {
    const body = await request.json();
    if (
      typeof body.password !== "string" ||
      body.password.length > 256 ||
      !checkPassword(body.password)
    )
      return Response.json({ error: "Parola doğru değil." }, { status: 401 });
    await login();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Giriş yapılamadı." }, { status: 400 });
  }
}
