"use client";

import { useEffect, useState, useTransition } from "react";
import { Spinner } from "./form";
import { button } from "./ui";

/** Two-step destructive button (no browser dialog): first click arms it, second click runs it. */
export function ConfirmButton({
  onConfirm,
  label = "Delete",
  confirmLabel = "Click again to delete",
  className,
}: {
  onConfirm: () => Promise<unknown>;
  label?: string;
  confirmLabel?: string;
  className?: string;
}) {
  const [armed, setArmed] = useState(false);
  const [pending, start] = useTransition();

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);

  return (
    <button
      type="button"
      className={button("danger", className)}
      disabled={pending}
      onClick={() => (armed ? start(async () => void (await onConfirm())) : setArmed(true))}
    >
      {pending ? <Spinner /> : null}
      {pending ? "Deleting…" : armed ? confirmLabel : label}
    </button>
  );
}
