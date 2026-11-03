"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ArrowDown, ArrowUp } from "@/components/ui/icons";
import { moveAlbum } from "@/server/admin/actions/gallery";
import { cn } from "@/lib/utils";

export function AlbumOrder({ id, first, last }: { id: string; first: boolean; last: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const move = (dir: "up" | "down") =>
    start(async () => {
      await moveAlbum(id, dir);
      router.refresh();
    });
  const cls =
    "grid size-7 place-items-center rounded-lg text-fg-subtle transition-colors hover:bg-brand-soft hover:text-fg disabled:opacity-30";
  return (
    <div className={cn("flex flex-col gap-0.5", pending && "opacity-50")}>
      <button type="button" className={cls} disabled={first || pending} onClick={() => move("up")} aria-label="Move up">
        <ArrowUp className="size-4" />
      </button>
      <button
        type="button"
        className={cls}
        disabled={last || pending}
        onClick={() => move("down")}
        aria-label="Move down"
      >
        <ArrowDown className="size-4" />
      </button>
    </div>
  );
}
