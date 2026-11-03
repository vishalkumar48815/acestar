# Acestar website: backend handover

This document explains the backend of acestar.my: the PostgreSQL database, the `/admin` area, and how content gets from the admin to the public pages. It's for the developer who will maintain or extend it.

**Status (Nov 2026)**

| Area                                                                      | State                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| PostgreSQL schema + migrations (Drizzle ORM)                              | ✅ Done                                                                                                                            |
| Seed from the content migrated from the old site (`src/data/*.json`)      | ✅ Done                                                                                                                            |
| Public News / Blog / Gallery read from the database, with a JSON fallback | ✅ Done                                                                                                                            |
| `/admin`: login, dashboard, News, Blog, Gallery CRUD, image uploads       | ✅ Done                                                                                                                            |
| Contact / Support / Careers form emails                                   | ⏳ Not started. Forms will **email** submissions and **won't store them in the database** (see [§11](#11-forms-and-email-planned)) |

---

## 1. Architecture at a glance

```
                ┌────────────────────────── Next.js 16 (App Router, Cache Components) ──────────────────────────┐
 Visitor ──────▶│  /news /blog /gallery  ──▶ src/server/content/media.ts  ("use cache" + cacheTag)                │
                │                                     │                                                          │
                │                                     ├─ DATABASE_URL set → PostgreSQL (Drizzle)                 │
                │                                     └─ not set          → src/data/*.json (seed content)       │
                │                                                                                                │
 Admin ────────▶│  src/proxy.ts (cookie check, redirect) ─▶ /admin/* pages ─▶ src/server/admin/queries.ts        │
                │                                              │                                                 │
                │                                              └─ Server Actions (src/server/admin/actions/*)    │
                │                                                   requireAdmin() → zod → DB → updateTag(...)   │
                │                                                   images → sharp → Vercel Blob / public/uploads│
                └────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Key ideas:

1. **The database is the source of truth** for News, Blog and Gallery. `src/data/*.json` is only the original seed and a fallback, so the site still builds and runs before a database exists.
2. **Public pages are static.** Every public getter is a `"use cache"` function tagged `press`, `blog` or `gallery`. Pages are prerendered at build time and served from the CDN.
3. **Admin writes invalidate exactly what changed.** Each Server Action calls `updateTag("blog")` (and so on) after a successful write. The next visit regenerates only the pages that use that tag. There are no rebuilds or webhooks.
4. **No separate API server.** Reads are server components and writes are Server Actions. There are no REST endpoints to secure or version.

---

## 2. Tech stack

| Concern          | Choice                                                                               | Notes                                                                |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Database         | PostgreSQL 17 (local: Docker or Postgres.app; production: [Neon](https://neon.tech)) | Any Postgres ≥ 14 works                                              |
| ORM / migrations | [Drizzle ORM](https://orm.drizzle.team) 0.45 + drizzle-kit 0.31                      | Schema in TypeScript, SQL migrations committed in `/drizzle`         |
| Driver           | `postgres` (postgres.js) 3.4                                                         | `prepare: false` so it works behind Neon's pooler / PgBouncer        |
| Auth             | Single admin from env vars, scrypt password hash, HS256 JWT cookie via `jose`        | No users table on purpose (see [§7](#7-authentication-and-security)) |
| Validation       | Zod 4                                                                                | `src/server/admin/validation.ts`                                     |
| Images           | `sharp` (server) + Vercel Blob (production)                                          | Local dev writes to `public/uploads`                                 |
| Hosting          | Vercel                                                                               |                                                                      |

---

## 3. Local setup (about 5 minutes)

**Requirements:** Node.js 20.12+ (22 recommended) and PostgreSQL. To get PostgreSQL, use either of these:

- **Docker** (any OS): `docker compose up -d` uses `docker-compose.yml` in the repo root.
- **Postgres.app** (Mac, no Docker): install it from postgresapp.com, then create the user and database with
  `psql -c "create user acestar password 'acestar' createdb;" -c "create database acestar owner acestar;"`

```bash
npm install
cp .env.example .env.local           # then fill in the values (below)
npm run admin:password -- "choose-a-strong-password"   # paste the printed line into .env.local
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"   # → SESSION_SECRET

npm run db:migrate                   # creates the tables
npm run db:seed                      # loads News (44), Blog (17), Gallery (5 albums, 55 photos)
npm run dev                          # http://localhost:3000  and  http://localhost:3000/admin
```

### Scripts

| Command                         | What it does                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| `npm run db:generate`           | Creates a new SQL migration in `/drizzle` from changes to `src/server/db/schema.ts`             |
| `npm run db:migrate`            | Applies pending migrations to `DATABASE_URL`                                                    |
| `npm run db:seed`               | Fills **empty** tables from `src/data/*.json`. Safe to re-run                                   |
| `npm run db:reset`              | Wipes News, Blog and Gallery and seeds again (local use; refuses in production without `--yes`) |
| `npm run db:studio`             | Opens Drizzle Studio, a browser UI for the tables                                               |
| `npm run db:cleanup-media`      | Lists uploaded images nothing uses any more; add `-- --apply` to delete them                    |
| `npm run admin:password -- "…"` | Prints an `ADMIN_PASSWORD_HASH=` line                                                           |

---

## 4. Environment variables

| Variable                | Required   | Example / notes                                                                                                                                                                                                            |
| ----------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`          | For admin  | Local: `postgres://acestar:acestar@localhost:5432/acestar`. Neon: the **pooled** string (host contains `-pooler`) with `?sslmode=require`. If empty, the public site uses the JSON files and `/admin` shows a setup notice |
| `ADMIN_EMAIL`           | Yes        | The only admin login. Case-insensitive                                                                                                                                                                                     |
| `ADMIN_PASSWORD_HASH`   | Yes        | Output of `npm run admin:password`. Format `scrypt:N:r:p:salt:hash` (colons, not `$`, because Next's env loader expands `$VAR`)                                                                                            |
| `SESSION_SECRET`        | Yes        | 32+ random characters. Rotating it signs everyone out                                                                                                                                                                      |
| `BLOB_READ_WRITE_TOKEN` | Production | Added automatically when you connect a Vercel Blob store. If empty, uploads go to `public/uploads` (development only)                                                                                                      |

`.env.local` is git-ignored; `.env.example` is committed. On Vercel, add these under Project → Settings → Environment Variables (Production and Preview).

---

## 5. Database schema

Source of truth: [`src/server/db/schema.ts`](../src/server/db/schema.ts). First migration: [`drizzle/0000_init.sql`](../drizzle/0000_init.sql).

```mermaid
erDiagram
    media_assets ||--o{ press_items : "image_id"
    media_assets ||--o{ blog_posts : "cover_id"
    media_assets ||--o{ gallery_photos : "asset_id"
    albums ||--o{ gallery_photos : "album_id (cascade)"
    albums |o--o| gallery_photos : "cover_photo_id"

    media_assets {
        uuid id PK
        text url UK
        storage_driver storage "static | local | blob"
        text storage_key
        int width
        int height
        int bytes
        text mime_type
        timestamptz created_at
    }
    press_items {
        uuid id PK
        text title
        text publisher
        press_language language "en | ms | zh"
        text excerpt
        text url "external link or /path"
        uuid image_id FK
        bool featured "max one true"
        publish_status status "draft | published"
        date published_on
        timestamptz created_at
        timestamptz updated_at
    }
    blog_posts {
        uuid id PK
        text slug UK
        text title
        text excerpt
        text body "Markdown"
        text category
        text author
        uuid cover_id FK
        smallint reading_minutes
        publish_status status
        date published_on
        timestamptz created_at
        timestamptz updated_at
    }
    albums {
        uuid id PK
        text slug UK
        text title
        text period "e.g. 2023–2025"
        text description
        uuid cover_photo_id FK
        int position
        publish_status status
        timestamptz created_at
        timestamptz updated_at
    }
    gallery_photos {
        uuid id PK
        uuid album_id FK
        uuid asset_id FK
        text alt
        int position
        timestamptz created_at
    }
    admin_login_attempts {
        bigserial id PK
        text ip
        bool succeeded
        timestamptz created_at
    }
```

### Tables

| Table                  | Purpose                                                                                                                                                   | Notable constraints and indexes                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `media_assets`         | Every image, whether a committed seed file (`static`), a local dev upload (`local`) or Vercel Blob (`blob`). Stores width and height so pages never shift | `url` unique; `width > 0 and height > 0`                                                                |
| `press_items`          | News page: press coverage                                                                                                                                 | `(status, published_on desc)`; **partial unique index on `featured` where true**, so only one top story |
| `blog_posts`           | Blog articles, Markdown body                                                                                                                              | `slug` unique and checked against `^[a-z0-9]+(-[a-z0-9]+)*$`; `(status, published_on desc)`             |
| `albums`               | Gallery albums, ordered by `position`                                                                                                                     | `slug` unique and format-checked; `(status, position)`                                                  |
| `gallery_photos`       | Photos in an album, ordered by `position`                                                                                                                 | `album_id` **on delete cascade**; `asset_id` **on delete restrict**; `(album_id, position)`             |
| `admin_login_attempts` | Brute-force throttling for `/admin/login`                                                                                                                 | `(ip, created_at desc)`. Rows older than a day can be pruned                                            |

### Conventions

- **Naming:** `snake_case` in SQL and camelCase in TypeScript. This is handled by `casing: "snake_case"` in both the client and `drizzle.config.ts`, so the schema doesn't repeat column names.
- **Keys:** `uuid` primary keys (`gen_random_uuid()`). They are safe to show in admin URLs and can't be enumerated.
- **Dates:**
  - Publish dates are `date` columns, read as `"yyyy-mm-dd"` strings. They are calendar days, so they have no timezone bugs.
  - Audit columns (`created_at`, `updated_at`) are `timestamptz`. `updated_at` is bumped by Drizzle's `$onUpdate`.
- **Status:** `draft | published`. Public queries always filter `status = 'published'`. Drafts exist only in the admin.
- **Foreign keys:** content → image uses `on delete set null`, because deleting an image must never delete an article. Photo → asset uses `restrict`; the app deletes the photo first, then releases the asset.
- **Ordering** uses integer `position` columns. Reorders rewrite `0..n-1` in a single `UPDATE … FROM unnest(array) WITH ORDINALITY` statement, which also repairs gaps.

### Changing the schema

1. Edit `src/server/db/schema.ts`.
2. Run `npm run db:generate -- --name short_description`, then **review the generated SQL** in `/drizzle`.
3. Run `npm run db:migrate` locally, test, and commit the schema together with the migration.
4. Deploy, then run `npm run db:migrate` against production (see [§6](#6-going-live-neon--vercel)).

Rules:

- Never edit a migration that has already been applied anywhere. Add a new one instead.
- Don't use `drizzle-kit push` against production.
- For renames or destructive changes, write the migration so it's backwards compatible, or deploy in two steps.

---

## 6. Going live (Neon + Vercel)

Moving to production is about ten minutes, done once.

1. **Database:** create a Neon project in the Singapore region (closest to Malaysia, `aws-ap-southeast-1`). Copy the **pooled** connection string. Alternatively, add Neon from Vercel → Storage, which sets `DATABASE_URL` for you.
2. **Images:** in Vercel → Storage, create a **Blob** store and connect it to the project. This adds `BLOB_READ_WRITE_TOKEN`.
3. **Env vars:** in Vercel, add `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` and `SESSION_SECRET`. Use a different secret and password from local.
4. **Create the tables and content** from your machine:
   ```bash
   DATABASE_URL="postgres://…neon…" npm run db:migrate
   DATABASE_URL="postgres://…neon…" npm run db:seed
   ```
   To copy your _local_ data instead of the seed, use `pg_dump`:
   ```bash
   pg_dump --data-only --no-owner "postgres://acestar:acestar@localhost:5432/acestar" \
     | psql "postgres://…neon… (direct, non-pooled URL)"
   ```
   Note that images uploaded locally live in `public/uploads`, which is not deployed. Re-upload them in production, or seed only.
5. **Redeploy.** The build reads the database and prerenders all pages.

**Recommended:** add `npm run db:migrate &&` in front of the Vercel Build Command (`npm run db:migrate && next build`), so migrations always ship with the code. This requires `DATABASE_URL` to be available at build time, which it is by default.

**Backups:** Neon keeps point-in-time restore (7 days on the free plan, longer on paid plans). For an extra copy, schedule a weekly `pg_dump`.

---

## 7. Authentication and security

There is **one admin account, defined in environment variables**. This was a deliberate choice: the client has one person managing content, so there is no users table, no password-reset email flow, and nothing to leak. To change the password, generate a new hash and update the env var.

| Layer             | Where                                           | What it does                                                                                                                                                                                                                                             |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Password          | `src/server/auth/password.ts`                   | scrypt (N=2^15, r=8, p=1, 32-byte key, 16-byte salt). Comparisons use `timingSafeEqual`. The hash runs **even when the email is wrong**, so response time doesn't reveal which part failed                                                               |
| Throttling        | `actions/auth.ts`                               | 5 failed attempts per IP per 15 minutes, stored in `admin_login_attempts`. Failures also add a 400 ms delay                                                                                                                                              |
| Session           | `src/server/auth/token.ts`                      | HS256 JWT (`jose`) holding `sub = email` and `role = admin`, valid for 8 hours. Stored in the `acestar_admin` cookie: `httpOnly`, `secure` in production, `sameSite=lax`, `path=/admin`. A token whose email no longer matches `ADMIN_EMAIL` is rejected |
| Proxy             | `src/proxy.ts`                                  | **Optimistic only.** Redirects to `/admin/login` without a valid cookie. Adds `X-Robots-Tag: noindex` and `Cache-Control: private, no-store`                                                                                                             |
| Data Access Layer | `src/server/auth/session.ts` → `requireAdmin()` | **The real check.** Called by the panel layout, **every admin query** (`src/server/admin/queries.ts`) and **every Server Action**. Never rely on the proxy alone                                                                                         |
| Input             | `src/server/admin/validation.ts`                | Zod schemas for every form. Slugs, URLs and dates are format-checked. Line endings are normalised                                                                                                                                                        |
| Redirects         | `safeNext()`                                    | After login, the app only redirects to `/admin…` paths (no open redirect)                                                                                                                                                                                |
| SEO               | `admin/layout.tsx`                              | `robots: noindex, nofollow`                                                                                                                                                                                                                              |
| CSRF              | Next.js                                         | Server Actions are POST-only and checked against the `Origin` header. The cookie is `sameSite=lax`                                                                                                                                                       |

**If you add more admins later:**

1. Add an `admin_users` table with email, password hash, role and `disabled_at`.
2. Change `verifySession()` to look up the user instead of comparing against `ADMIN_EMAIL`.
3. Keep `requireAdmin()` as the single gate.

Consider adding an `audit_log` table at the same time.

---

## 8. Images and uploads

Pipeline (`src/server/storage.ts`):

1. **Browser:** `compressImage()` resizes to a 2400px longest side and converts to WebP before upload. A 10 MB phone photo becomes about 300 KB, which keeps requests under Vercel's 4.5 MB body limit.
2. **Server:** the server checks the MIME type (JPG, PNG, WebP, AVIF, GIF) and caps files at 8 MB.
3. **Server, sharp:**
   - applies EXIF rotation and strips metadata (including GPS);
   - caps the longest side at 2400px and encodes WebP at quality 82;
   - caps decoding at 80 MP (decompression-bomb guard).
4. **Store:**
   - Vercel Blob at `uploads/<folder>/<year>/<random>-<name>.webp`, public and cached for a year;
   - or `public/uploads/...` locally.
5. **Record:** the result is saved as a row in `media_assets` with its width and height.

Images are served through `next/image`, which produces AVIF/WebP at the right size per device. Blob hosts are allowed in `next.config.ts → images.remotePatterns`.

**Cleanup:**

- When an image is replaced or removed, or its article, photo or album is deleted, `releaseAsset()` deletes the row and file **if nothing else references it** (it also checks Markdown bodies).
- Seed images (`static`) are never deleted.
- Abandoned uploads (for example, uploaded then the form wasn't saved) are removed by `npm run db:cleanup-media -- --apply`, which only touches assets older than 24 hours. A weekly Vercel Cron could run the same query (TODO).

`public/uploads` is git-ignored and **does not work on Vercel**, because the filesystem is read-only. The code refuses local uploads when `VERCEL` is set.

---

## 9. Caching and revalidation

| Getter (`src/server/content/media.ts`) | Tag       | Used by                                                 |
| -------------------------------------- | --------- | ------------------------------------------------------- |
| `getPressItems()`                      | `press`   | `/news`                                                 |
| `getBlogPosts()` (no bodies)           | `blog`    | `/blog`, related posts, sitemap, `generateStaticParams` |
| `getBlogPost(slug)`                    | `blog`    | `/blog/[slug]`                                          |
| `getAlbums()`                          | `gallery` | `/gallery`                                              |

- Every getter uses `cacheLife("hours")` as a safety net, for example when someone edits rows directly in Drizzle Studio.
- Admin actions call `updateTag(tag)`, so changes are visible on the next request. `updateTag` is read-your-own-writes inside Server Actions; use `revalidateTag(tag, "max")` from a Route Handler or webhook.
- `/blog/[slug]` uses `ensureStatic = "navigation"`:
  - all published posts are prerendered at build time;
  - a post published later is generated on its first visit and then served statically.
- Admin pages are request-time (they read the session cookie). They set `export const instant = false` to opt out of Next's instant-navigation validation, and stream behind `(panel)/loading.tsx`.

**JSON fallback:** if `DATABASE_URL` is empty, the same getters read `src/data/*.json`. This keeps preview deployments and fresh clones working. Once production has a database, edit content in `/admin`; edits to the JSON files are ignored while a database is connected.

---

## 10. The admin area

| Route            | Features                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/admin/login`   | Email and password, throttled. Redirects back to the page you came from                                                                                                                                                                                                                                                                               |
| `/admin`         | Counts (published/drafts), recently edited items, storage status                                                                                                                                                                                                                                                                                      |
| `/admin/news`    | Search (title and publisher), status filter, pagination (20 per page). Create and edit headline, publisher, language, date, link, summary, image, **Top story** (only one; setting it clears the previous one in the same transaction), and draft/published                                                                                           |
| `/admin/blog`    | Search (title, category and slug), status filter, pagination. Editor features:<br>• slug auto-generated from the title (editable, unique)<br>• category suggestions, author, date, cover image<br>• **Markdown editor** with toolbar, inline image upload, and a live preview that uses the public site's renderer<br>• reading time computed on save |
| `/admin/gallery` | Album list with up/down ordering. Album page:<br>• multi-file upload with per-file progress<br>• drag-and-drop or arrow reordering<br>• inline captions (alt text), saved on blur<br>• choose the cover (★) and two-step delete<br>• album details form<br>Albums with no photos are hidden on the site                                               |

UX details:

- Forms submit through `startTransition`, so fields aren't cleared after a validation error. The first invalid field gets focus.
- There's an "Unsaved changes" warning, and delete buttons need two clicks instead of browser dialogs.
- Works on mobile (drawer navigation) and in dark mode.

### File map

```
src/
  proxy.ts                         optimistic /admin redirect
  server/
    db/index.ts                    connection pool (singleton), hasDatabase flag
    db/schema.ts                   ← schema source of truth
    content/media.ts               public cached getters (+ JSON fallback), contentTags
    auth/{password,token,session}.ts
    admin/
      queries.ts                   admin reads (each calls requireAdmin)
      validation.ts                zod schemas
      assets.ts                    releaseAsset(), pgCode()
      actions/{auth,press,blog,gallery,media}.ts   Server Actions ("use server")
    storage.ts                     sharp + Vercel Blob / local
  app/
    (site)/…                       public pages (header/footer layout)
    admin/layout.tsx               noindex, instant=false
    admin/login/                   sign-in
    admin/(panel)/                 session gate layout, loading.tsx, dashboard, news, blog, gallery
  components/admin/                form kit, image field, markdown editor, photo manager, shell
  lib/admin-form.ts                FormState type shared by actions and forms
drizzle/                           SQL migrations (commit them)
scripts/db/{seed,cleanup-media}.ts
scripts/hash-password.mjs
docker-compose.yml                 local Postgres
```

---

## 11. Forms and email (planned)

Decision: **form submissions are emailed and not stored.** There is no `submissions` table. Planned implementation:

1. **One Server Action per form** (`contact`, `support`, `careers`) in `src/server/forms/`, validated with Zod. Shared field schemas already exist in `src/lib/forms.ts`.
2. **Email:**
   - Nodemailer over SMTP with a Google Workspace account and an **App Password**: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO_SALES`, `MAIL_TO_SUPPORT`, `MAIL_TO_CAREERS`.
   - Alternatively, use a transactional provider such as Resend or Postmark for better deliverability.
   - Set `replyTo` to the visitor's email. The `from` address must be the authenticated account.
3. **Spam protection:**
   - a hidden honeypot field plus a minimum fill time;
   - per-IP rate limiting (re-use the `admin_login_attempts` pattern or Vercel KV);
   - optionally Cloudflare Turnstile.
4. **Careers CVs:** attach the file directly (limit 5 MB, PDF/DOCX only), or upload it to a _private_ Blob and email a signed link.
5. **Templates:** a plain-text body plus a simple HTML version. Never put user input into the subject without stripping newlines.

Open questions for the client:

- Which inbox receives each form (`enquiry@` vs `isr@acestar.my`)?
- Does support stay on Zoho Desk?

---

## 12. Adding a new content type (checklist)

Example: "Events".

1. **Schema:** add `events` to `schema.ts` (uuid PK, `status`, timestamps, indexes for the public query), then run `db:generate` and `db:migrate`.
2. **Public getter:** in `src/server/content/`, add `getEvents()` with `"use cache"`, `cacheTag("events")` and `cacheLife("hours")`, and add `events` to `contentTags`.
3. **Admin query and validation:** add the admin query to `queries.ts` (call `requireAdmin()` first) and a Zod schema to `validation.ts`.
4. **Actions:** add `actions/events.ts` with `requireAdmin()` → `safeParse` → write → `releaseAsset` for replaced images → `updateTag("events")`.
5. **Admin pages:** create `app/admin/(panel)/events/{page,new/page,[id]/page}.tsx` with `export const instant = false`, reusing `AdminForm`, `TextField`, `ImageField` and so on. Add a nav item in `components/admin/shell.tsx`.
6. **Public page and sitemap:** add the public page and its sitemap entry.

---

## 13. Known limitations and next steps

- [ ] **Changing a blog slug breaks old links.** Add a `redirects` table (from_path, to_path) checked in `proxy.ts`, or block slug edits on published posts.
- [ ] Scheduled publishing: a `published_on` date in the future still shows immediately. Filter `published_on <= current_date` and add a daily `revalidateTag`.
- [ ] Vercel Cron for `db:cleanup-media` and for pruning `admin_login_attempts` older than 1 day.
- [ ] Audit log of admin changes, if more people get access.
- [ ] The rate limiter trusts `x-forwarded-for`, which is correct on Vercel. Behind another proxy, use that platform's client-IP header.
- [ ] Search on `/news` is client-side (44 items). Above ~500 items, move it to SQL (`ilike` or Postgres full-text search).
- [ ] A deleted blog post is served as a 404 page (with `noindex`), but if it had already been generated on demand the status can be 200 while streaming. A redirects table would solve this too.

---

## 14. Troubleshooting

| Symptom                                                    | Fix                                                                                                                               |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `/admin` says "Database not connected"                     | `DATABASE_URL` is empty. Set it in `.env.local` and restart `npm run dev`                                                         |
| Login says "isn't configured yet"                          | `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` or `SESSION_SECRET` (32+ characters) is missing                                              |
| Login always fails with the right password                 | The hash was copied incompletely, or quotes were included. Paste the whole `ADMIN_PASSWORD_HASH=scrypt:…` line exactly as printed |
| "Too many attempts"                                        | Wait 15 minutes, or run `delete from admin_login_attempts;`                                                                       |
| Upload fails on Vercel: "Uploads need a Vercel Blob store" | Connect a Blob store to the project (this sets `BLOB_READ_WRITE_TOKEN`) and redeploy                                              |
| `relation "…" does not exist`                              | Run `npm run db:migrate` for that database                                                                                        |
| Too many connections on Neon                               | Use the **pooled** connection string (`-pooler` host)                                                                             |
| Edited a row in Drizzle Studio but the site didn't change  | Wait up to an hour (`cacheLife`), or save the item once in `/admin`, which invalidates the tag                                    |
