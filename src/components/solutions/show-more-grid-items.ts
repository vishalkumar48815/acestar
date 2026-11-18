/* Plain (server-safe) helper for <ShowMoreGrid>: keep it out of the "use client" file. */

/** Class for item i: hidden while collapsed if it falls beyond the first two rows at that size. */
export function collapsedItemClass(i: number) {
  if (i >= 6) return "group-data-[expanded=false]/more:hidden";
  if (i >= 4) return "max-lg:group-data-[expanded=false]/more:hidden";
  if (i >= 2) return "max-sm:group-data-[expanded=false]/more:hidden";
  return "";
}
