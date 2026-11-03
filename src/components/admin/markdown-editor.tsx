"use client";

import { useRef, useState } from "react";
import { Markdown } from "@/components/media/markdown";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/server/admin/actions/media";
import { compressImage } from "./compress-image";
import { Spinner, useAdminForm } from "./form";
import { inputClass } from "./ui";

type Mode = "write" | "preview" | "split";
type Tool = "h2" | "h3" | "bold" | "italic" | "ul" | "ol" | "quote" | "link";

const tools: ReadonlyArray<[tool: Tool, label: string, title: string]> = [
  ["h2", "H2", "Section heading"],
  ["h3", "H3", "Sub-heading"],
  ["bold", "B", "Bold"],
  ["italic", "I", "Italic"],
  ["ul", "• List", "Bulleted list"],
  ["ol", "1. List", "Numbered list"],
  ["quote", "❝ Quote", "Quote"],
  ["link", "Link", "Link"],
];

/**
 * Markdown editor with a formatting toolbar, image upload and a live preview that uses the
 * exact renderer of the public blog, so what you see is what gets published.
 */
export function MarkdownEditor({ name, defaultValue }: { name: string; defaultValue: string }) {
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState<Mode>("split");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const { state, markDirty } = useAdminForm();
  const fieldError = state.status === "error" ? state.fieldErrors?.[name]?.[0] : undefined;

  /** Wraps the selection (or inserts a placeholder) and keeps the cursor sensible. */
  function apply(before: string, after = "", placeholder = "") {
    const el = area.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const selected = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    setValue(next);
    markDirty();
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + selected.length);
    });
  }

  /** Prefixes every selected line (headings, lists, quotes), starting on a new block. */
  function linePrefix(prefix: string | ((i: number) => string)) {
    const el = area.current;
    if (!el) return;
    const start = value.lastIndexOf("\n", el.selectionStart - 1) + 1;
    const end = el.selectionEnd;
    const block = value.slice(start, end) || "Text";
    const lines = block
      .split("\n")
      .map(
        (l, i) => (typeof prefix === "string" ? prefix : prefix(i)) + l.replace(/^(#{1,4}\s|[-*]\s|\d+\.\s|>\s?)/, ""),
      );
    const next = value.slice(0, start) + lines.join("\n") + value.slice(end);
    setValue(next);
    markDirty();
    requestAnimationFrame(() => el.focus());
  }

  async function insertImage(f: File | undefined) {
    if (!f) return;
    setUploading(true);
    setError(null);
    const data = new FormData();
    data.set("file", await compressImage(f));
    data.set("folder", "blog");
    const result = await uploadImage(data);
    setUploading(false);
    if (file.current) file.current.value = "";
    if (!result.ok) return setError(result.message);
    const alt = f.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    const { url, width, height } = result.asset;
    apply(`\n\n![${alt}](${url} "${width}x${height}")\n\n`);
  }

  function runTool(tool: Tool) {
    if (tool === "h2") linePrefix("## ");
    else if (tool === "h3") linePrefix("### ");
    else if (tool === "bold") apply("**", "**", "bold text");
    else if (tool === "italic") apply("*", "*", "italic text");
    else if (tool === "ul") linePrefix("- ");
    else if (tool === "ol") linePrefix((i) => `${i + 1}. `);
    else if (tool === "quote") linePrefix("> ");
    else apply("[", "](https://)", "link text");
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={`f-${name}`} className="text-sm font-medium text-ink">
          Article
        </label>
        <div role="tablist" aria-label="Editor view" className="flex gap-1 rounded-lg border border-line p-0.5 text-xs">
          {(["write", "split", "preview"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-md px-2.5 py-1 font-medium capitalize",
                mode === m ? "bg-[image:var(--btn-gradient)] text-white" : "text-fg-muted hover:text-fg",
                m === "split" && "hidden lg:block",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-white dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center gap-1 border-b border-line bg-[color-mix(in_oklab,var(--bg)_60%,transparent)] p-1.5">
          {tools.map(([tool, label, title]) => (
            <button
              key={tool}
              type="button"
              title={title}
              aria-label={title}
              onClick={() => runTool(tool)}
              className="min-h-8 rounded-md px-2.5 text-xs font-semibold text-fg-muted transition-colors hover:bg-brand-soft hover:text-fg"
            >
              {label}
            </button>
          ))}
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />
          <button
            type="button"
            onClick={() => file.current?.click()}
            disabled={uploading}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-semibold text-brand-ink hover:bg-brand-soft"
          >
            {uploading ? <Spinner className="size-3" /> : null}
            {uploading ? "Uploading…" : "+ Image"}
          </button>
          <input
            ref={file}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => void insertImage(e.target.files?.[0])}
          />
        </div>

        <div className={cn("grid", mode === "split" && "lg:grid-cols-2")}>
          <textarea
            ref={area}
            id={`f-${name}`}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-invalid={Boolean(fieldError)}
            spellCheck
            className={cn(
              inputClass,
              "min-h-[32rem] resize-y rounded-none border-0 bg-transparent px-4 py-3 font-mono text-[0.875rem] leading-relaxed shadow-none focus:shadow-none dark:bg-transparent",
              mode === "preview" && "sr-only",
            )}
            placeholder={
              "Start writing…\n\n## A section heading\n\nA paragraph with **bold** text and a [link](https://acestar.my)."
            }
          />
          {mode !== "write" ? (
            <div
              className={cn(
                "max-h-[44rem] overflow-y-auto px-5 py-4",
                mode === "split" && "hidden border-l border-line lg:block",
              )}
            >
              {value.trim() ? (
                <Markdown source={value} />
              ) : (
                <p className="text-sm text-fg-subtle">Nothing to preview yet.</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <p className="text-xs text-fg-subtle">
        Markdown: <code>## Heading</code>, <code>**bold**</code>, <code>*italic*</code>, <code>- list</code>,{" "}
        <code>&gt; quote</code>, <code>[link](url)</code>. Leave a blank line between paragraphs.
      </p>
      {error || fieldError ? (
        <p role="alert" className="text-xs font-medium text-danger">
          {error ?? fieldError}
        </p>
      ) : null}
    </div>
  );
}
