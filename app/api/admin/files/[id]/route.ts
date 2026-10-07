import { readFileSync } from "node:fs";
import path from "node:path";
import { isAdmin } from "@/lib/auth";
import { dataDir, getLeads } from "@/lib/store";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) return new Response("Yetkisiz", { status: 401 });
  const { id } = await params,
    lead = getLeads().find((l) => l.id === id);
  if (!lead?.filePath) return new Response("Bulunamadı", { status: 404 });
  try {
    return new Response(
      readFileSync(path.join(dataDir, "attachments", lead.filePath)),
      {
        headers: {
          "Content-Type": lead.fileType,
          "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(lead.fileName)}`,
          "Cache-Control": "private, no-store",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  } catch {
    return new Response("Bulunamadı", { status: 404 });
  }
}
