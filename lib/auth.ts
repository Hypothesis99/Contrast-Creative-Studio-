import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual, scryptSync } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { dataDir, getContent } from "./store";
const COOKIE = "contrast_admin";
type Credentials = { salt: string; hash: string; sessionSecret: string };
function credentials(): Credentials | null {
  if (
    process.env.ADMIN_PASSWORD &&
    process.env.SESSION_SECRET &&
    process.env.ADMIN_PASSWORD.length >= 12 &&
    process.env.SESSION_SECRET.length >= 32
  ) {
    return {
      salt: "contrast-env-v1",
      hash: scryptSync(
        process.env.ADMIN_PASSWORD,
        "contrast-env-v1",
        64,
      ).toString("hex"),
      sessionSecret: process.env.SESSION_SECRET,
    };
  }
  try {
    const c = JSON.parse(
      readFileSync(path.join(dataDir, "admin.json"), "utf8"),
    );
    if (
      typeof c.salt === "string" &&
      /^[a-f0-9]{128}$/.test(c.hash) &&
      typeof c.sessionSecret === "string" &&
      c.sessionSecret.length >= 32
    )
      return c;
  } catch {}
  return null;
}
function equal(a: string, b: string) {
  const x = Buffer.from(a),
    y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
export function adminConfigured() {
  return credentials() !== null;
}
export function checkPassword(password: string) {
  const c = credentials();
  return !!c && equal(scryptSync(password, c.salt, 64).toString("hex"), c.hash);
}
export async function isAdmin() {
  const c = credentials(),
    token = (await cookies()).get(COOKIE)?.value;
  if (!c || !token) return false;
  const [expires, nonce, signature] = token.split(".");
  if (!expires || !nonce || !signature || Number(expires) < Date.now())
    return false;
  return equal(
    createHmac("sha256", c.sessionSecret)
      .update(`${expires}.${nonce}`)
      .digest("hex"),
    signature,
  );
}
export async function login() {
  const c = credentials();
  if (!c) throw new Error("Admin not configured");
  const expires = String(Date.now() + 8 * 60 * 60 * 1000),
    nonce = crypto.randomUUID();
  const signature = createHmac("sha256", c.sessionSecret)
    .update(`${expires}.${nonce}`)
    .digest("hex");
  (await cookies()).set(COOKIE, `${expires}.${nonce}.${signature}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.COOKIE_SECURE === "true",
    path: "/",
    maxAge: 8 * 60 * 60,
  });
}
export async function logout() {
  (await cookies()).delete(COOKIE);
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const internal = new URL(request.url),
    host = request.headers.get("host");
  const allowed = new Set([internal.origin]);
  if (host) allowed.add(`${internal.protocol}//${host}`);
  const configured =
    getContent().settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    try {
      allowed.add(new URL(configured).origin);
    } catch {}
  }
  return allowed.has(origin);
}
