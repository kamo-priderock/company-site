/** Shared between client and server — do not import Mongoose models here. */

export const CATEGORY_PAGE_SLUGS = [
  "commercial",
  "industrial",
  "mixed-use",
  "residential",
  "retail",
] as const;

export type CategoryPageSlug = (typeof CATEGORY_PAGE_SLUGS)[number];

export function isCategoryPageSlug(s: string): s is CategoryPageSlug {
  return (CATEGORY_PAGE_SLUGS as readonly string[]).includes(s);
}
