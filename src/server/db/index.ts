import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Postgres connection (postgres.js + Drizzle).
 *
 * Works with a local Postgres in development and Neon (or any Postgres) in production.
 * On Vercel use Neon's *pooled* connection string (host contains "-pooler"); `prepare: false`
 * keeps postgres.js compatible with transaction-mode poolers such as PgBouncer.
 */
const url = process.env.DATABASE_URL;

/** False until DATABASE_URL is set: the public site then falls back to the JSON files in src/data. */
export const hasDatabase = Boolean(url);

function connect(connectionString: string) {
  const client = postgres(connectionString, {
    max: process.env.NODE_ENV === "production" ? 5 : 3,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
  });
  return drizzle(client, { schema, casing: "snake_case" });
}

export type Database = ReturnType<typeof connect>;

// One pool per server process (and survives hot reloads in dev).
const globalForDb = globalThis as unknown as { acestarDb?: Database };

export function getDb(): Database {
  if (!url) throw new Error("DATABASE_URL is not set. See docs/BACKEND.md → Local setup.");
  return (globalForDb.acestarDb ??= connect(url));
}

export { schema };
