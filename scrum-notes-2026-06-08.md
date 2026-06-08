# Scrum Notes - June 8, 2026

**Branch:** `main`

---

## Visual showcase — optional stats text

- **`models/ShowcaseItem.ts`**: `stats` no longer required; defaults to empty string.
- **`app/admin/home/visual-showcase/page.tsx`**: Stats text labeled **(optional)**; placeholder notes it can be left blank.
- **`sections/VisualShowcase.tsx`**: Amber stats line only renders when `item.stats` is non-empty.

Columns can be saved with title + image only; homepage grid shows title without the eyebrow line when stats is empty.

## Why Choose Us — Bottom CTA save fix

**Branch:** `main`

- **`app/api/why-choose-us/[id]/route.ts`**: Strip `_id` / Mongo metadata from PUT body (was blocking updates).
- **`app/api/why-choose-us/route.ts`**: POST upserts existing singleton document instead of creating duplicates when `_id` is missing in admin state.
- **`app/admin/home/why-choose-us/page.tsx`**: Omit `_id` from save payload; normalize `_id` on load/save; clearer API error toasts; **Save CTA** button on Bottom CTA section (top **Save All Changes** still saves full content including CTA).

## Footer CMS

**Branch:** `main`

- **`models/FooterContent.ts`**: Singleton footer document (brand, logo, tagline, social URLs, quick/service/legal link lists, copyright with `{year}`, `isActive`).
- **`lib/footerDefaults.ts`**: Default content from previous hardcoded footer + `mergeFooter` / `formatCopyright`.
- **`app/api/footer/route.ts`**, **`app/api/footer/[id]/route.ts`**: GET (public + `includeInactive` for admin), POST upsert, PUT update.
- **`app/admin/footer/page.tsx`**: Full admin UI with link repeaters, logo upload, social URLs.
- **`app/admin/layout.tsx`**: **Footer** nav entry (`/admin/footer`).
- **`components/Footer.tsx`**: Fetches `/api/footer`, falls back to defaults; hides empty social icons and link columns.
