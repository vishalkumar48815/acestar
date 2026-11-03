import "server-only";
import { and, asc, count, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { requireAdmin } from "@/server/auth/session";
import { getDb, schema } from "@/server/db";

/**
 * Admin read model. Every function checks the session itself (Data Access Layer), reads
 * fresh data (no cache) and returns plain objects shaped for the admin screens.
 */

const { pressItems, blogPosts, albums, galleryPhotos, mediaAssets } = schema;

export const PAGE_SIZE = 20;

export type ListParams = { q?: string; status?: string; page?: number };
type Status = "draft" | "published";
const asStatus = (s?: string): Status | undefined => (s === "draft" || s === "published" ? s : undefined);
const like = (q: string) => `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
const pageOf = (p?: number) => Math.max(1, Math.floor(p ?? 1) || 1);

/* ---------------------------------------------------------------- dashboard */

export async function getDashboard() {
  await requireAdmin();
  const db = getDb();
  const statusCounts = (table: typeof pressItems | typeof blogPosts | typeof albums) =>
    db
      .select({ status: table.status, n: count() })
      .from(table)
      .groupBy(table.status)
      .then((rows) => ({
        published: rows.find((r) => r.status === "published")?.n ?? 0,
        draft: rows.find((r) => r.status === "draft")?.n ?? 0,
      }));

  const [press, blog, gallery, photos, recent] = await Promise.all([
    statusCounts(pressItems),
    statusCounts(blogPosts),
    statusCounts(albums),
    db
      .select({ n: count() })
      .from(galleryPhotos)
      .then(([r]) => r.n),
    db.execute<{
      kind: "news" | "blog" | "gallery";
      id: string;
      title: string;
      status: Status;
      updated_at: string;
    }>(sql`
      (select 'news' as kind, id, title, status, updated_at from press_items order by updated_at desc limit 6)
      union all
      (select 'blog', id, title, status, updated_at from blog_posts order by updated_at desc limit 6)
      union all
      (select 'gallery', id, title, status, updated_at from albums order by updated_at desc limit 6)
      order by updated_at desc limit 8
    `),
  ]);
  return { press, blog, gallery, photos, recent: [...recent] };
}

/* ---------------------------------------------------------------- news */

export async function listPress({ q, status, page }: ListParams) {
  await requireAdmin();
  const where: SQL[] = [];
  const s = asStatus(status);
  if (s) where.push(eq(pressItems.status, s));
  if (q?.trim()) where.push(or(ilike(pressItems.title, like(q.trim())), ilike(pressItems.publisher, like(q.trim())))!);
  const filter = where.length ? and(...where) : undefined;
  const current = pageOf(page);

  const db = getDb();
  const [rows, [{ total }]] = await Promise.all([
    db
      .select({
        id: pressItems.id,
        title: pressItems.title,
        publisher: pressItems.publisher,
        language: pressItems.language,
        publishedOn: pressItems.publishedOn,
        status: pressItems.status,
        featured: pressItems.featured,
        imageUrl: mediaAssets.url,
      })
      .from(pressItems)
      .leftJoin(mediaAssets, eq(mediaAssets.id, pressItems.imageId))
      .where(filter)
      .orderBy(desc(pressItems.publishedOn), desc(pressItems.createdAt))
      .limit(PAGE_SIZE)
      .offset((current - 1) * PAGE_SIZE),
    db.select({ total: count() }).from(pressItems).where(filter),
  ]);
  return { rows, total, page: current, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export async function getPressForEdit(id: string) {
  await requireAdmin();
  if (!isUuid(id)) return undefined;
  return getDb().query.pressItems.findFirst({
    where: eq(pressItems.id, id),
    with: { image: { columns: { id: true, url: true, width: true, height: true } } },
  });
}

/* ---------------------------------------------------------------- blog */

export async function listBlog({ q, status, page }: ListParams) {
  await requireAdmin();
  const where: SQL[] = [];
  const s = asStatus(status);
  if (s) where.push(eq(blogPosts.status, s));
  if (q?.trim())
    where.push(
      or(
        ilike(blogPosts.title, like(q.trim())),
        ilike(blogPosts.category, like(q.trim())),
        ilike(blogPosts.slug, like(q.trim())),
      )!,
    );
  const filter = where.length ? and(...where) : undefined;
  const current = pageOf(page);

  const db = getDb();
  const [rows, [{ total }]] = await Promise.all([
    db
      .select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        title: blogPosts.title,
        category: blogPosts.category,
        publishedOn: blogPosts.publishedOn,
        status: blogPosts.status,
        readingMinutes: blogPosts.readingMinutes,
        coverUrl: mediaAssets.url,
      })
      .from(blogPosts)
      .leftJoin(mediaAssets, eq(mediaAssets.id, blogPosts.coverId))
      .where(filter)
      .orderBy(desc(blogPosts.publishedOn), desc(blogPosts.createdAt))
      .limit(PAGE_SIZE)
      .offset((current - 1) * PAGE_SIZE),
    db.select({ total: count() }).from(blogPosts).where(filter),
  ]);
  return { rows, total, page: current, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export async function getBlogForEdit(id: string) {
  await requireAdmin();
  if (!isUuid(id)) return undefined;
  return getDb().query.blogPosts.findFirst({
    where: eq(blogPosts.id, id),
    with: { cover: { columns: { id: true, url: true, width: true, height: true } } },
  });
}

export async function getBlogCategories() {
  await requireAdmin();
  const rows = await getDb()
    .selectDistinct({ category: blogPosts.category })
    .from(blogPosts)
    .orderBy(asc(blogPosts.category));
  return rows.map((r) => r.category);
}

/* ---------------------------------------------------------------- gallery */

export async function listAlbums() {
  await requireAdmin();
  const db = getDb();
  const photoCount = db
    .select({ albumId: galleryPhotos.albumId, n: count().as("n") })
    .from(galleryPhotos)
    .groupBy(galleryPhotos.albumId)
    .as("photo_count");
  const cover = db
    .select({ photoId: galleryPhotos.id, url: mediaAssets.url })
    .from(galleryPhotos)
    .innerJoin(mediaAssets, eq(mediaAssets.id, galleryPhotos.assetId))
    .as("cover");

  return db
    .select({
      id: albums.id,
      slug: albums.slug,
      title: albums.title,
      period: albums.period,
      status: albums.status,
      position: albums.position,
      photos: sql<number>`coalesce(${photoCount.n}, 0)::int`,
      coverUrl: cover.url,
    })
    .from(albums)
    .leftJoin(photoCount, eq(photoCount.albumId, albums.id))
    .leftJoin(cover, eq(cover.photoId, albums.coverPhotoId))
    .orderBy(asc(albums.position), asc(albums.createdAt));
}

export async function getAlbumForEdit(id: string) {
  await requireAdmin();
  if (!isUuid(id)) return undefined;
  return getDb().query.albums.findFirst({
    where: eq(albums.id, id),
    with: {
      photos: {
        orderBy: [asc(galleryPhotos.position), asc(galleryPhotos.createdAt)],
        columns: { id: true, alt: true, position: true },
        with: { asset: { columns: { url: true, width: true, height: true } } },
      },
    },
  });
}

export const isUuid = (v: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
