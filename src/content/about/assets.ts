import type { Img } from "@/content/solutions/types";
import generated from "./media.generated.json";

type Entry = { src: string; width: number; height: number };
const media = generated as Record<string, Entry>;

/** Optimised About-page image by its path on the old site (see scripts/build-about-media.mjs). */
export function aboutAsset(legacyPath: string, alt = ""): Img | undefined {
  const entry = media[legacyPath];
  return entry ? { ...entry, alt } : undefined;
}
