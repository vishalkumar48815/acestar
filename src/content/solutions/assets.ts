import generated from "./media.generated.json";
import type { Img } from "./types";

type Entry = { src: string; width: number; height: number };
const media = generated as Record<string, Entry>;

/**
 * Look up an optimised image by its path on the old site ("2026/03/Image-13.png").
 * Returns undefined when it hasn't been imported yet, and components render without it.
 */
export function asset(legacyPath: string | undefined, alt = ""): Img | undefined {
  if (!legacyPath) return undefined;
  const entry = media[legacyPath];
  return entry ? { ...entry, alt } : undefined;
}
