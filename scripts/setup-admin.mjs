import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { randomBytes, scryptSync } from "node:crypto";
import path from "node:path";
import { createInterface } from "node:readline";
const dir = path.resolve(process.env.CONTRAST_DATA_DIR || ".data"),
  file = path.join(dir, "admin.json");
if (existsSync(file)) {
  console.error(
    "Yönetici zaten yapılandırılmış. Parola değişimi için mevcut admin.json dosyasını güvenli şekilde yedekleyip kaldırın.",
  );
  process.exit(1);
}
if (!process.stdin.isTTY) {
  console.error(
    "Parola girişi için etkileşimli bir terminal kullanın: npm run admin:setup",
  );
  process.exit(1);
}
console.log(
  "En az 12 karakterlik bir yönetici parolası belirleyin. Girdi ekranda gösterilmez.",
);
const input = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});
let hide = false;
input._writeToOutput = function (text) {
  if (!hide) process.stdout.write(text);
};
const password = await new Promise((resolve) => {
  input.question("Parola: ", resolve);
  hide = true;
});
input.close();
process.stdout.write("\n");
if (password.length < 12) {
  console.error("Parola en az 12 karakter olmalı.");
  process.exit(1);
}
const salt = randomBytes(24).toString("hex");
mkdirSync(dir, { recursive: true, mode: 0o700 });
writeFileSync(
  file,
  JSON.stringify({
    salt,
    hash: scryptSync(password, salt, 64).toString("hex"),
    sessionSecret: randomBytes(48).toString("hex"),
  }),
  { mode: 0o600, flag: "wx" },
);
console.log(
  "Yönetici oluşturuldu. Parolanız kaydedilmez; /admin üzerinden giriş yapabilirsiniz.",
);
