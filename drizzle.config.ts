import { defineConfig } from "drizzle-kit";

// drizzle-kit runs outside Next.js, so load .env.local / .env ourselves.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {}
}

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set (copy .env.example to .env.local).");

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  casing: "snake_case",
  dbCredentials: { url: process.env.DATABASE_URL },
  strict: true,
  verbose: true,
});
