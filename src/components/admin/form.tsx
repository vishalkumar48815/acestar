"use client";

import {
  createContext,
  type ReactNode,
  startTransition,
  use,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { type FormState, idle } from "@/lib/admin-form";
import { cn } from "@/lib/utils";
import { button, inputClass } from "./ui";

type Ctx = { state: FormState; pending: boolean; dirty: boolean; edited: ReadonlySet<string>; markDirty: () => void };
const FormContext = createContext<Ctx>({
  state: idle,
  pending: false,
  dirty: false,
  edited: new Set(),
  markDirty: () => {},
});
export const useAdminForm = () => use(FormContext);

/**
 * Form wrapper for admin Server Actions.
 * Submits through a transition instead of `<form action>` so React doesn't reset the inputs
 * after a validation error, and warns before leaving with unsaved changes.
 */
export function AdminForm({
  action,
  children,
  className,
}: {
  action: (prev: FormState, data: FormData) => Promise<FormState>;
  children: ReactNode;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, idle);
  const [dirty, setDirty] = useState(false);
  // Fields edited since the last failed save stop showing their (now stale) error.
  const [edited, setEdited] = useState<ReadonlySet<string>>(new Set());
  const ref = useRef<HTMLFormElement>(null);

  // The successful result clears "unsaved" (derived during render, no effect needed).
  const [seen, setSeen] = useState(state);
  if (seen !== state) {
    setSeen(state);
    setEdited(new Set());
    if (state.status === "success") setDirty(false);
  }

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // Focus the first invalid field after a failed save.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    ref.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
  }, [state]);

  return (
    <FormContext value={{ state, pending, dirty, edited, markDirty: () => setDirty(true) }}>
      <form
        ref={ref}
        noValidate
        className={className}
        onChange={(e) => {
          setDirty(true);
          const name = (e.target as EventTarget as { name?: string }).name;
          if (name && state.status === "error" && state.fieldErrors?.[name] && !edited.has(name))
            setEdited(new Set(edited).add(name));
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          startTransition(() => formAction(data));
        }}
      >
        {children}
      </form>
    </FormContext>
  );
}

/** Label + control + hint + server error, wired with ids for screen readers. */
export function Field({
  name,
  label,
  hint,
  children,
  className,
}: {
  name: string;
  label: string;
  hint?: ReactNode;
  className?: string;
  children: (props: { id: string; name: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
}) {
  const { state, edited } = useAdminForm();
  const error = state.status === "error" && !edited.has(name) ? state.fieldErrors?.[name]?.[0] : undefined;
  const id = `f-${name}`;
  const described = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children({ id, name, "aria-invalid": Boolean(error), "aria-describedby": described })}
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-fg-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  name,
  label,
  hint,
  className,
  ...input
}: { name: string; label: string; hint?: ReactNode; className?: string } & Omit<
  React.ComponentProps<"input">,
  "name" | "id"
>) {
  return (
    <Field name={name} label={label} hint={hint} className={className}>
      {(p) => <input {...p} {...input} className={inputClass} />}
    </Field>
  );
}

export function TextAreaField({
  name,
  label,
  hint,
  className,
  ...input
}: { name: string; label: string; hint?: ReactNode; className?: string } & Omit<
  React.ComponentProps<"textarea">,
  "name" | "id"
>) {
  return (
    <Field name={name} label={label} hint={hint} className={className}>
      {(p) => <textarea {...p} {...input} className={cn(inputClass, "min-h-28 py-2.5 leading-relaxed")} />}
    </Field>
  );
}

export function SelectField({
  name,
  label,
  hint,
  options,
  className,
  ...select
}: {
  name: string;
  label: string;
  hint?: ReactNode;
  className?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
} & Omit<React.ComponentProps<"select">, "name" | "id">) {
  return (
    <Field name={name} label={label} hint={hint} className={className}>
      {(p) => (
        <select {...p} {...select} className={cn(inputClass, "appearance-auto pr-8")}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

/** Draft/Published segmented control. */
export function StatusField({ defaultValue }: { defaultValue: "draft" | "published" }) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-ink">Visibility</legend>
      <div className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-white p-1 dark:bg-white/[0.04]">
        {(["draft", "published"] as const).map((s) => (
          <label
            key={s}
            className="relative cursor-pointer rounded-lg px-3 py-2 text-center text-sm font-medium text-fg-muted transition-colors has-checked:bg-[image:var(--btn-gradient)] has-checked:text-white has-focus-visible:ring-2 has-focus-visible:ring-[var(--accent-from)]"
          >
            <input type="radio" name="status" value={s} defaultChecked={defaultValue === s} className="sr-only" />
            {s === "draft" ? "Draft" : "Published"}
          </label>
        ))}
      </div>
      <p className="mt-1.5 text-xs text-fg-subtle">Drafts are only visible here in the admin.</p>
    </fieldset>
  );
}

/** Sticky save bar with status feedback. */
export function SaveBar({ label = "Save changes", extra }: { label?: string; extra?: ReactNode }) {
  const { state, pending, dirty } = useAdminForm();
  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-line bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] px-4 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className={button("primary", "min-w-32")} disabled={pending}>
          {pending ? <Spinner /> : null}
          {pending ? "Saving…" : label}
        </button>
        <p aria-live="polite" className="min-w-0 flex-1 text-sm">
          {state.status === "error" ? (
            <span className="font-medium text-danger">{state.message}</span>
          ) : state.status === "success" && !dirty ? (
            <span className="font-medium text-success">✓ {state.message}</span>
          ) : dirty ? (
            <span className="text-fg-subtle">Unsaved changes</span>
          ) : null}
        </p>
        {extra}
      </div>
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("size-4 animate-spin rounded-full border-2 border-current border-r-transparent", className)}
    />
  );
}
