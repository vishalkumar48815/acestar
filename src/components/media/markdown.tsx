import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Tiny Markdown renderer for blog bodies (no dependency). Supports the subset the content uses:
 * ## / ### / #### headings, paragraphs, - and 1. lists, > quotes, images, **bold**, *italic*
 * and [links](url). Images may carry their size as a title: ![alt](/img.webp "1200x800").
 */
export function Markdown({ source }: { source: string }) {
  const blocks = source
    .replace(/\r\n?/g, "\n")
    .trim()
    .split(/\n{2,}/);
  return <div className="prose-acestar">{blocks.map((b, i) => renderBlock(b.trim(), i))}</div>;
}

function renderBlock(block: string, key: number): ReactNode {
  const heading = block.match(/^(#{2,4})\s+(.*)$/);
  if (heading) {
    const level = heading[1].length;
    const Tag = (level === 2 ? "h2" : level === 3 ? "h3" : "h4") as "h2";
    return <Tag key={key}>{inline(heading[2])}</Tag>;
  }

  const img = block.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"(\d+)x(\d+)")?\)$/);
  if (img) {
    const [, alt, src, w, h] = img;
    return (
      <figure key={key}>
        <Image
          src={src}
          alt={alt}
          width={Number(w) || 1200}
          height={Number(h) || 800}
          sizes="(min-width: 768px) 720px, 92vw"
        />
        {alt ? <figcaption>{alt}</figcaption> : null}
      </figure>
    );
  }

  const lines = block.split("\n");
  if (lines.every((l) => /^[-*]\s+/.test(l))) {
    return (
      <ul key={key}>
        {lines.map((l, i) => (
          <li key={i}>{inline(l.replace(/^[-*]\s+/, ""))}</li>
        ))}
      </ul>
    );
  }
  if (lines.every((l) => /^\d+[.)]\s+/.test(l))) {
    return (
      <ol key={key}>
        {lines.map((l, i) => (
          <li key={i}>{inline(l.replace(/^\d+[.)]\s+/, ""))}</li>
        ))}
      </ol>
    );
  }
  if (lines.every((l) => l.startsWith(">"))) {
    return (
      <blockquote key={key}>
        <p>{withBreaks(lines.map((l) => l.replace(/^>\s?/, "")))}</p>
      </blockquote>
    );
  }
  return <p key={key}>{withBreaks(lines)}</p>;
}

function withBreaks(lines: string[]) {
  return lines.map((l, i) => (
    <span key={i}>
      {i > 0 ? <br /> : null}
      {inline(l)}
    </span>
  ));
}

/** **bold**, *italic*, [text](url) */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={k++}>{m[1]}</strong>);
    else if (m[2]) out.push(<em key={k++}>{m[2]}</em>);
    else if (m[3]) {
      const href = m[4].replace(/^https:\/\/acestar\.my(?=\/)/, "");
      out.push(
        /^https?:\/\//.test(href) ? (
          <a key={k++} href={href} target="_blank" rel="noopener noreferrer">
            {m[3]}
          </a>
        ) : (
          <Link key={k++} href={href}>
            {m[3]}
          </Link>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
