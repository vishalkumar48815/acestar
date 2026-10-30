import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared input surface: 16px text (no iOS zoom), 48px tall, clear focus and error states. */
export const control = cn(
  "w-full rounded-2xl border border-line bg-white/80 px-4 text-base text-fg shadow-[inset_0_1px_2px_rgb(30_40_90/0.04)] transition-[border-color,box-shadow,background-color]",
  "placeholder:text-fg-subtle/80 hover:border-[color-mix(in_oklab,var(--accent-from)_35%,var(--line))]",
  "focus:border-[color-mix(in_oklab,var(--accent-from)_70%,transparent)] focus:bg-white focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent-from)_16%,transparent)] focus:outline-none",
  "aria-[invalid=true]:border-danger aria-[invalid=true]:shadow-[0_0_0_4px_color-mix(in_oklab,var(--danger)_14%,transparent)]",
  "disabled:opacity-60 dark:bg-white/[0.04] dark:focus:bg-white/[0.06]",
);

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Label + control + hint/error, wired up with aria-describedby. */
export function FieldShell({ id, label, required, hint, error, className, children }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[0.875rem] font-semibold text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-brand-ink">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-fg-subtle">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[0.8125rem] font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[0.8125rem] text-fg-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: ReactNode) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

type Common = { id: string; label: string; error?: string; hint?: ReactNode; className?: string };

export function TextField({
  id,
  label,
  error,
  hint,
  className,
  required,
  ...props
}: Common & Omit<ComponentPropsWithoutRef<"input">, "id" | "className">) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "min-h-12")}
        {...props}
      />
    </FieldShell>
  );
}

export function TextArea({
  id,
  label,
  error,
  hint,
  className,
  required,
  ...props
}: Common & Omit<ComponentPropsWithoutRef<"textarea">, "id" | "className">) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "min-h-32 resize-y py-3 leading-relaxed")}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  className,
  required,
  children,
  ...props
}: Common & Omit<ComponentPropsWithoutRef<"select">, "id" | "className">) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(control, "min-h-12 cursor-pointer appearance-none pr-11")}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg-subtle"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </FieldShell>
  );
}

/** Small success / error banner shown after a submit. */
export function FormNotice({ tone, children }: { tone: "success" | "error" | "info"; children: ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-2xl border px-4 py-3 text-[0.9375rem] leading-relaxed",
        tone === "success" && "border-success/30 bg-success/10 text-fg",
        tone === "error" && "border-danger/30 bg-danger/10 text-fg",
        tone === "info" && "border-line bg-brand-soft/60 text-fg-muted",
      )}
    >
      {children}
    </div>
  );
}
