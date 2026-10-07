import type { Metadata } from "next";
import { isAdmin, adminConfigured } from "@/lib/auth";
import { getContent, getLeads } from "@/lib/store";
import { AdminPanel, AdminLogin } from "@/components/admin-panel";
export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};
export default async function Admin() {
  return (await isAdmin()) ? (
    <AdminPanel initialContent={getContent()} initialLeads={getLeads()} />
  ) : (
    <AdminLogin configured={adminConfigured()} />
  );
}
