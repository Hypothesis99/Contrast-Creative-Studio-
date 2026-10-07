import { getContent } from "@/lib/store";
export function GET() {
  getContent();
  return Response.json({ ok: true });
}
