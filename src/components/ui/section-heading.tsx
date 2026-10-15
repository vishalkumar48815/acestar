import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, lead, align = "start", className, id }: Props) {
  return (
    <div
      data-reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <span className="text-eyebrow text-brand-ink">{eyebrow}</span>
      <h2 id={id} className="text-title">
        {title}
      </h2>
      {lead ? <p className="text-lead text-fg-muted">{lead}</p> : null}
    </div>
  );
}
