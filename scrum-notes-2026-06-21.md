# Scrum Notes — 2026-06-21

**Branch:** `main`

## Work Done

### Visual Showcase — Statistics admin UI
- **Issue:** User could only edit the stats banner background in Visual Showcase admin; the stat values (14+, Years, etc.) had no editor on that page.
- **Root cause:** Statistics are fetched from `/api/statistics` in `sections/VisualShowcase.tsx`, but the admin page only saved the banner background and pointed users to the About section.
- **Fix:** Added full statistics CRUD to `app/admin/home/visual-showcase/page.tsx` under the **Stats Banner** section (value, label, suffix, order, active toggle, add/edit/delete).
- **Note:** Same statistics data is also used by `AnimatedStats` in the homepage About section; edits from either admin page update the shared data.
