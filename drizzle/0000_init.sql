CREATE TYPE "public"."press_language" AS ENUM('en', 'ms', 'zh');--> statement-breakpoint
CREATE TYPE "public"."publish_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."storage_driver" AS ENUM('static', 'local', 'blob');--> statement-breakpoint
CREATE TABLE "admin_login_attempts" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"ip" text NOT NULL,
	"succeeded" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"period" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"cover_photo_id" uuid,
	"position" integer DEFAULT 0 NOT NULL,
	"status" "publish_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "albums_slug_format" CHECK ("albums"."slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"category" text NOT NULL,
	"author" text DEFAULT 'Acestar' NOT NULL,
	"cover_id" uuid,
	"reading_minutes" smallint DEFAULT 1 NOT NULL,
	"status" "publish_status" DEFAULT 'draft' NOT NULL,
	"published_on" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_format" CHECK ("blog_posts"."slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);
--> statement-breakpoint
CREATE TABLE "gallery_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album_id" uuid NOT NULL,
	"asset_id" uuid NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"storage" "storage_driver" NOT NULL,
	"storage_key" text,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"bytes" integer,
	"mime_type" text DEFAULT 'image/webp' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_assets_dimensions_positive" CHECK ("media_assets"."width" > 0 and "media_assets"."height" > 0)
);
--> statement-breakpoint
CREATE TABLE "press_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"publisher" text NOT NULL,
	"language" "press_language" DEFAULT 'en' NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"url" text,
	"image_id" uuid,
	"featured" boolean DEFAULT false NOT NULL,
	"status" "publish_status" DEFAULT 'draft' NOT NULL,
	"published_on" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_cover_photo_id_gallery_photos_id_fk" FOREIGN KEY ("cover_photo_id") REFERENCES "public"."gallery_photos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_cover_id_media_assets_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gallery_photos" ADD CONSTRAINT "gallery_photos_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gallery_photos" ADD CONSTRAINT "gallery_photos_asset_id_media_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media_assets"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "press_items" ADD CONSTRAINT "press_items_image_id_media_assets_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "admin_login_attempts_ip_created_at_idx" ON "admin_login_attempts" USING btree ("ip","created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "albums_slug_key" ON "albums" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "albums_status_position_idx" ON "albums" USING btree ("status","position");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blog_posts_status_published_on_idx" ON "blog_posts" USING btree ("status","published_on" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "blog_posts_cover_id_idx" ON "blog_posts" USING btree ("cover_id");--> statement-breakpoint
CREATE INDEX "gallery_photos_album_position_idx" ON "gallery_photos" USING btree ("album_id","position");--> statement-breakpoint
CREATE INDEX "gallery_photos_asset_id_idx" ON "gallery_photos" USING btree ("asset_id");--> statement-breakpoint
CREATE UNIQUE INDEX "media_assets_url_key" ON "media_assets" USING btree ("url");--> statement-breakpoint
CREATE INDEX "press_items_status_published_on_idx" ON "press_items" USING btree ("status","published_on" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "press_items_single_featured_key" ON "press_items" USING btree ("featured") WHERE "press_items"."featured";--> statement-breakpoint
CREATE INDEX "press_items_image_id_idx" ON "press_items" USING btree ("image_id");