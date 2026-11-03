#!/usr/bin/env node
/**
 * Prints an ADMIN_PASSWORD_HASH for .env.local / Vercel.
 *   npm run admin:password -- "your-strong-password"
 */
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Usage: npm run admin:password -- "a password of at least 10 characters"');
  process.exit(1);
}
const N = 2 ** 15,
  r = 8,
  p = 1;
const salt = randomBytes(16);
const hash = scryptSync(password.normalize("NFKC"), salt, 32, { N, r, p, maxmem: 256 * 1024 * 1024 });
console.log(`ADMIN_PASSWORD_HASH=scrypt:${N}:${r}:${p}:${salt.toString("base64url")}:${hash.toString("base64url")}`);
