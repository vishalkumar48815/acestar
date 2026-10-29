/**
 * Inline icon set (paths from Lucide, ISC licence).
 * Replaces the lucide-react package to save ~19 KB of JavaScript on every page.
 * To add an icon: copy its node array from lucide.dev and add a line below.
 */
import type { SVGProps } from "react";

type IconNode = [tag: "path" | "circle" | "rect" | "line" | "polyline", attrs: Record<string, string>][];
export type IconProps = SVGProps<SVGSVGElement> & { strokeWidth?: number };

function createIcon(nodes: IconNode) {
  function Icon({ strokeWidth = 2, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        {nodes.map(([Tag, attrs], i) => (
          <Tag key={i} {...attrs} />
        ))}
      </svg>
    );
  }
  return Icon;
}

export const ArrowLeft = createIcon([
  ["path", { d: "m12 19-7-7 7-7" }],
  ["path", { d: "M19 12H5" }],
]);
export const ArrowRight = createIcon([
  ["path", { d: "M5 12h14" }],
  ["path", { d: "m12 5 7 7-7 7" }],
]);
export const ArrowUpRight = createIcon([
  ["path", { d: "M7 7h10v10" }],
  ["path", { d: "M7 17 17 7" }],
]);
export const Award = createIcon([
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
    },
  ],
  ["circle", { cx: "12", cy: "8", r: "6" }],
]);
export const Check = createIcon([["path", { d: "M20 6 9 17l-5-5" }]]);
export const ChevronDown = createIcon([["path", { d: "m6 9 6 6 6-6" }]]);
export const ChevronLeft = createIcon([["path", { d: "m15 18-6-6 6-6" }]]);
export const ChevronRight = createIcon([["path", { d: "m9 18 6-6-6-6" }]]);
export const Mail = createIcon([
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }],
]);
export const MapPin = createIcon([
  [
    "path",
    { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" },
  ],
  ["circle", { cx: "12", cy: "10", r: "3" }],
]);
export const Menu = createIcon([
  ["path", { d: "M4 5h16" }],
  ["path", { d: "M4 12h16" }],
  ["path", { d: "M4 19h16" }],
]);
export const MessageCircle = createIcon([
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
    },
  ],
]);
export const Monitor = createIcon([
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21" }],
]);
export const Moon = createIcon([
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
    },
  ],
]);
export const Phone = createIcon([
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    },
  ],
]);
export const Quote = createIcon([
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
    },
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
    },
  ],
]);
export const RotateCcw = createIcon([
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
  ["path", { d: "M3 3v5h5" }],
]);
export const Sun = createIcon([
  ["circle", { cx: "12", cy: "12", r: "4" }],
  ["path", { d: "M12 2v2" }],
  ["path", { d: "M12 20v2" }],
  ["path", { d: "m4.93 4.93 1.41 1.41" }],
  ["path", { d: "m17.66 17.66 1.41 1.41" }],
  ["path", { d: "M2 12h2" }],
  ["path", { d: "M20 12h2" }],
  ["path", { d: "m6.34 17.66-1.41 1.41" }],
  ["path", { d: "m19.07 4.93-1.41 1.41" }],
]);
export const X = createIcon([
  ["path", { d: "M18 6 6 18" }],
  ["path", { d: "m6 6 12 12" }],
]);
