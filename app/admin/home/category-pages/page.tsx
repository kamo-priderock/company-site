"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Loader2,
  Save,
  RotateCcw,
  Plus,
  Trash2,
} from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import toast, { Toaster } from "react-hot-toast";
import {
  CATEGORY_PAGE_SLUGS,
  type CategoryPageSlug,
} from "@/lib/categoryPageSlugs";
import type { CategoryPagePublic } from "@/lib/categoryPageDefaults";
import { getDefaultCategoryPage } from "@/lib/categoryPageDefaults";

const PROJECT_FILTER_OPTIONS = [
  "Commercial",
  "Retail",
  "Industrial",
  "Residential",
  "Mixed-Use",
] as const;

const SLUG_LABEL: Record<CategoryPageSlug, string> = {
  commercial: "Commercial",
  industrial: "Industrial",
  "mixed-use": "Mixed-use",
  residential: "Residential",
  retail: "Retail",
};

/** Common Lucide icon names used on category pages (also accepts any other Lucide name). */
const LUCIDE_ICON_HINTS = [
  "Building2",
  "Building",
  "Users",
  "TrendingUp",
  "Award",
  "Warehouse",
  "Truck",
  "Zap",
  "Shield",
  "ShoppingBag",
  "Store",
  "Car",
  "Home",
  "Trees",
  "Heart",
  "Sun",
  "Layers",
  "MapPin",
];

const inputClass =
  "w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500";
const uploadButtonClass =
  "bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium w-full max-w-xl";
const uploadContainerClass = "w-full max-w-xl";

function linesToList(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function listToLines(items: string[]): string {
  return items.join("\n");
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export default function CategoryPagesAdminPage() {
  const [slug, setSlug] = useState<CategoryPageSlug>("commercial");
  const [page, setPage] = useState<CategoryPagePublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (s: CategoryPageSlug) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/category-pages/${s}?includeInactive=true`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setPage(data.page as CategoryPagePublic);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
      setPage(getDefaultCategoryPage(s));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(slug);
  }, [slug, load]);

  const resetToDefaults = () => {
    if (
      !window.confirm(
        "Replace all fields on this page with the built-in default content? Unsaved changes will be lost."
      )
    ) {
      return;
    }
    setPage(getDefaultCategoryPage(slug));
    toast.success("Form reset to defaults (save when ready)");
  };

  const save = async () => {
    if (!page) return;
    setSaving(true);
    const tid = toast.loading("Saving…");
    try {
      const body = { ...page, slug };
      const res = await fetch(`/api/category-pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      if (data.page) setPage(data.page as CategoryPagePublic);
      toast.success("Category page saved", { id: tid });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed", {
        id: tid,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !page) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
      </div>
    );
  }

  const p = page;
  const set = (patch: Partial<CategoryPagePublic>) =>
    setPage({ ...p, ...patch });

  return (
    <div className="space-y-6 pb-16">
      <Toaster position="top-right" />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Category landing pages
          </h2>
          <p className="mt-1 max-w-2xl text-slate-600">
            Edit what visitors see on each property category route (for example
            the Commercial page at{" "}
            <span className="font-medium text-slate-800">/commercial</span>).
            Use{" "}
            <span className="font-medium text-slate-800">Reload</span> to pull
            the latest saved version from the server.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          Save changes
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <label className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">
          Which page are you editing?
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value as CategoryPageSlug)}
            className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {CATEGORY_PAGE_SLUGS.map((s) => (
              <option key={s} value={s}>
                {SLUG_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => load(slug)}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reload from server
        </button>
        <button
          type="button"
          onClick={resetToDefaults}
          className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
        >
          Reset form to built-in defaults
        </button>
      </div>

      <FormSection
        title="Visibility & projects"
        description="Project type must match how projects are tagged in the Projects admin so the grid below the page shows the right listings."
      >
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
          <input
            type="checkbox"
            id="cat-page-active"
            checked={p.isActive}
            onChange={(e) => set({ isActive: e.target.checked })}
            className="h-5 w-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
          />
          <label htmlFor="cat-page-active" className="text-sm font-medium text-slate-800">
            Page is visible on the website
          </label>
          <span className="text-xs text-slate-500">
            (When off, visitors see “not available” instead of this content.)
          </span>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Show projects of type
          </label>
          <select
            value={p.projectFilterType}
            onChange={(e) => set({ projectFilterType: e.target.value })}
            className={inputClass + " max-w-md bg-white"}
          >
            {PROJECT_FILTER_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </FormSection>

      <FormSection
        title="Hero (top of page)"
        description="Large banner at the top. Alignment affects how text sits over the image."
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Hero image
          </label>
          {p.heroImage ? (
            <div className="mb-3 max-h-48 max-w-xl overflow-hidden rounded-lg">
              <img
                src={p.heroImage}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          ) : null}
          <UploadButton<OurFileRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) {
                set({ heroImage: res[0].url });
                toast.success("Hero image uploaded");
              }
            }}
            onUploadError={(err) => {
              toast.error(err.message);
            }}
            appearance={{
              button: uploadButtonClass,
              container: uploadContainerClass,
            }}
            content={{ button: "Upload hero image" }}
          />
          <p className="my-2 max-w-xl text-center text-sm text-slate-500">
            or paste image URL
          </p>
          <input
            type="text"
            value={p.heroImage}
            onChange={(e) => set({ heroImage: e.target.value })}
            className={inputClass + " max-w-xl"}
            placeholder="https://…"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Small label above title (eyebrow)
            </label>
            <input
              type="text"
              value={p.heroEyebrow}
              onChange={(e) => set({ heroEyebrow: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Text alignment
            </label>
            <select
              value={p.heroAlign}
              onChange={(e) =>
                set({ heroAlign: e.target.value as "left" | "center" })
              }
              className={inputClass + " bg-white"}
            >
              <option value="left">Left (text in a box)</option>
              <option value="center">Center (full-width overlay)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Main headline
            </label>
            <input
              type="text"
              value={p.heroTitle}
              onChange={(e) => set({ heroTitle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Supporting paragraph
            </label>
            <textarea
              value={p.heroSubtitle}
              onChange={(e) => set({ heroSubtitle: e.target.value })}
              rows={3}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              First button — label
            </label>
            <input
              type="text"
              value={p.heroCta1Label}
              onChange={(e) => set({ heroCta1Label: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              First button — link
            </label>
            <input
              type="text"
              value={p.heroCta1Href}
              onChange={(e) => set({ heroCta1Href: e.target.value })}
              className={inputClass}
              placeholder="/contact"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Second button — label
            </label>
            <input
              type="text"
              value={p.heroCta2Label}
              onChange={(e) => set({ heroCta2Label: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Second button — link
            </label>
            <input
              type="text"
              value={p.heroCta2Href}
              onChange={(e) => set({ heroCta2Href: e.target.value })}
              className={inputClass}
              placeholder="#projects"
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Key numbers (stats row)"
        description="Short metrics shown under the hero, e.g. square meters developed."
      >
        <div className="space-y-3">
          {p.stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-row flex-wrap items-end gap-3 rounded-lg border border-slate-100 p-4"
            >
              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Value
                </label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const stats = [...p.stats];
                    stats[i] = { ...stats[i], value: e.target.value };
                    set({ stats });
                  }}
                  className={inputClass}
                  placeholder="2.5M+"
                />
              </div>
              <div className="min-w-0 flex-[2]">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Label
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const stats = [...p.stats];
                    stats[i] = { ...stats[i], label: e.target.value };
                    set({ stats });
                  }}
                  className={inputClass}
                  placeholder="Square meters developed"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  set({ stats: p.stats.filter((_, j) => j !== i) })
                }
                className="inline-flex items-center justify-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              set({ stats: [...p.stats, { value: "", label: "" }] })
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Add stat
          </button>
        </div>
      </FormSection>

      <FormSection
        title="Highlight (section intro)"
        description="Heading block above the icon cards."
      >
        <div className="grid gap-4 md:grid-cols-1">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Eyebrow
            </label>
            <input
              type="text"
              value={p.highlightEyebrow}
              onChange={(e) => set({ highlightEyebrow: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={p.highlightTitle}
              onChange={(e) => set({ highlightTitle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Subtitle
            </label>
            <textarea
              value={p.highlightSubtitle}
              onChange={(e) => set({ highlightSubtitle: e.target.value })}
              rows={3}
              className={inputClass}
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Feature cards (grid)"
        description="Each card shows an icon, title, and description. Icon names come from the Lucide icon set (same names as in code)."
      >
        <datalist id="lucide-icons-hints">
          {LUCIDE_ICON_HINTS.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        <div className="space-y-4">
          {p.cards.map((card, i) => (
            <div
              key={i}
              className="space-y-3 rounded-lg border border-slate-100 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Card {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    set({ cards: p.cards.filter((_, j) => j !== i) })
                  }
                  className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove card
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Icon name
                  </label>
                  <input
                    type="text"
                    value={card.icon}
                    list="lucide-icons-hints"
                    onChange={(e) => {
                      const cards = [...p.cards];
                      cards[i] = { ...cards[i], icon: e.target.value };
                      set({ cards });
                    }}
                    className={inputClass}
                    placeholder="Building2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Optional subtitle
                  </label>
                  <input
                    type="text"
                    value={card.subtitle}
                    onChange={(e) => {
                      const cards = [...p.cards];
                      cards[i] = { ...cards[i], subtitle: e.target.value };
                      set({ cards });
                    }}
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Title
                  </label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => {
                      const cards = [...p.cards];
                      cards[i] = { ...cards[i], title: e.target.value };
                      set({ cards });
                    }}
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Description
                  </label>
                  <textarea
                    value={card.description}
                    onChange={(e) => {
                      const cards = [...p.cards];
                      cards[i] = { ...cards[i], description: e.target.value };
                      set({ cards });
                    }}
                    rows={3}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              set({
                cards: [
                  ...p.cards,
                  {
                    icon: "Building2",
                    title: "",
                    description: "",
                    subtitle: "",
                  },
                ],
              })
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Add card
          </button>
        </div>
      </FormSection>

      <FormSection
        title="Features block (optional)"
        description="Larger section with bullet list and side image. Leave bullets empty to hide this block on the site if the template allows."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Eyebrow
            </label>
            <input
              type="text"
              value={p.featuresEyebrow}
              onChange={(e) => set({ featuresEyebrow: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={p.featuresTitle}
              onChange={(e) => set({ featuresTitle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Introduction
            </label>
            <textarea
              value={p.featuresIntro}
              onChange={(e) => set({ featuresIntro: e.target.value })}
              rows={3}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Bullet points (one per line)
            </label>
            <textarea
              value={listToLines(p.featureBullets)}
              onChange={(e) =>
                set({ featureBullets: linesToList(e.target.value) })
              }
              rows={6}
              className={inputClass}
              placeholder={"One bullet per line\ne.g. 24/7 security"}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Badge — title
            </label>
            <input
              type="text"
              value={p.featuresBadgeTitle}
              onChange={(e) => set({ featuresBadgeTitle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Badge — subtitle
            </label>
            <input
              type="text"
              value={p.featuresBadgeSubtitle}
              onChange={(e) => set({ featuresBadgeSubtitle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Side image
            </label>
            {p.featuresSideImage ? (
              <div className="mb-3 max-h-40 max-w-md overflow-hidden rounded-lg">
                <img
                  src={p.featuresSideImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) {
                  set({ featuresSideImage: res[0].url });
                  toast.success("Side image uploaded");
                }
              }}
              onUploadError={(err) => {
              toast.error(err.message);
            }}
              appearance={{
                button: uploadButtonClass,
                container: uploadContainerClass,
              }}
              content={{ button: "Upload side image" }}
            />
            <p className="my-2 max-w-xl text-center text-sm text-slate-500">
              or paste URL
            </p>
            <input
              type="text"
              value={p.featuresSideImage}
              onChange={(e) => set({ featuresSideImage: e.target.value })}
              className={inputClass + " max-w-xl"}
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Specification categories (optional)"
        description="Used on some layouts (e.g. retail/industrial). Each group has a title and checklist items — one item per line."
      >
        <div className="space-y-4">
          {p.specCategories.map((spec, i) => (
            <div
              key={i}
              className="space-y-2 rounded-lg border border-slate-100 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Group {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    set({
                      specCategories: p.specCategories.filter(
                        (_, j) => j !== i
                      ),
                    })
                  }
                  className="inline-flex items-center gap-1 text-sm text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
              <input
                type="text"
                value={spec.category}
                onChange={(e) => {
                  const specCategories = [...p.specCategories];
                  specCategories[i] = {
                    ...specCategories[i],
                    category: e.target.value,
                  };
                  set({ specCategories });
                }}
                className={inputClass}
                placeholder="Category title"
              />
              <textarea
                value={listToLines(spec.items)}
                onChange={(e) => {
                  const specCategories = [...p.specCategories];
                  specCategories[i] = {
                    ...specCategories[i],
                    items: linesToList(e.target.value),
                  };
                  set({ specCategories });
                }}
                rows={4}
                className={inputClass}
                placeholder="One specification per line"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              set({
                specCategories: [
                  ...p.specCategories,
                  { category: "", items: [] },
                ],
              })
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Add specification group
          </button>
        </div>
      </FormSection>

      <FormSection
        title="Amenity groups (optional)"
        description="Used on residential-style pages. Each group has a title, icon, and bullet items (one per line)."
      >
        <div className="space-y-4">
          {p.amenityGroups.map((g, i) => (
            <div
              key={i}
              className="space-y-2 rounded-lg border border-slate-100 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Group {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    set({
                      amenityGroups: p.amenityGroups.filter((_, j) => j !== i),
                    })
                  }
                  className="text-sm text-red-600"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  value={g.title}
                  onChange={(e) => {
                    const amenityGroups = [...p.amenityGroups];
                    amenityGroups[i] = { ...amenityGroups[i], title: e.target.value };
                    set({ amenityGroups });
                  }}
                  className={inputClass}
                  placeholder="Group title"
                />
                <input
                  type="text"
                  value={g.icon}
                  list="lucide-icons-hints"
                  onChange={(e) => {
                    const amenityGroups = [...p.amenityGroups];
                    amenityGroups[i] = { ...amenityGroups[i], icon: e.target.value };
                    set({ amenityGroups });
                  }}
                  className={inputClass}
                  placeholder="Icon name (e.g. Home)"
                />
              </div>
              <textarea
                value={listToLines(g.items)}
                onChange={(e) => {
                  const amenityGroups = [...p.amenityGroups];
                  amenityGroups[i] = {
                    ...amenityGroups[i],
                    items: linesToList(e.target.value),
                  };
                  set({ amenityGroups });
                }}
                rows={4}
                className={inputClass}
                placeholder="One amenity per line"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              set({
                amenityGroups: [
                  ...p.amenityGroups,
                  { title: "", icon: "Home", items: [] },
                ],
              })
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Add amenity group
          </button>
        </div>
      </FormSection>

      <FormSection
        title="Mixed-use components (optional)"
        description="Used on the mixed-use page layout. Each block has a type label, short description, and feature lines."
      >
        <div className="space-y-4">
          {p.mixedUseComponents.map((c, i) => (
            <div
              key={i}
              className="space-y-2 rounded-lg border border-slate-100 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Block {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    set({
                      mixedUseComponents: p.mixedUseComponents.filter(
                        (_, j) => j !== i
                      ),
                    })
                  }
                  className="text-sm text-red-600"
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                value={c.type}
                onChange={(e) => {
                  const mixedUseComponents = [...p.mixedUseComponents];
                  mixedUseComponents[i] = {
                    ...mixedUseComponents[i],
                    type: e.target.value,
                  };
                  set({ mixedUseComponents });
                }}
                className={inputClass}
                placeholder="Type / headline"
              />
              <textarea
                value={c.description}
                onChange={(e) => {
                  const mixedUseComponents = [...p.mixedUseComponents];
                  mixedUseComponents[i] = {
                    ...mixedUseComponents[i],
                    description: e.target.value,
                  };
                  set({ mixedUseComponents });
                }}
                rows={2}
                className={inputClass}
                placeholder="Description"
              />
              <textarea
                value={listToLines(c.features)}
                onChange={(e) => {
                  const mixedUseComponents = [...p.mixedUseComponents];
                  mixedUseComponents[i] = {
                    ...mixedUseComponents[i],
                    features: linesToList(e.target.value),
                  };
                  set({ mixedUseComponents });
                }}
                rows={3}
                className={inputClass}
                placeholder="One feature per line"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              set({
                mixedUseComponents: [
                  ...p.mixedUseComponents,
                  { type: "", description: "", features: [] },
                ],
              })
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Add mixed-use block
          </button>
        </div>
      </FormSection>

      <FormSection
        title="Projects section"
        description="Intro text above the project cards and the button under them."
      >
        <div className="grid gap-4 md:grid-cols-1">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Eyebrow
            </label>
            <input
              type="text"
              value={p.projectsEyebrow}
              onChange={(e) => set({ projectsEyebrow: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={p.projectsTitle}
              onChange={(e) => set({ projectsTitle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Introduction
            </label>
            <textarea
              value={p.projectsIntro}
              onChange={(e) => set({ projectsIntro: e.target.value })}
              rows={3}
              className={inputClass}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Button label
              </label>
              <input
                type="text"
                value={p.projectsButtonText}
                onChange={(e) => set({ projectsButtonText: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Button link
              </label>
              <input
                type="text"
                value={p.projectsButtonLink}
                onChange={(e) => set({ projectsButtonLink: e.target.value })}
                className={inputClass}
                placeholder="/projects"
              />
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Footer call-to-action"
        description="Closing banner at the bottom of the category page."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={p.footerTitle}
              onChange={(e) => set({ footerTitle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Subtitle
            </label>
            <textarea
              value={p.footerSubtitle}
              onChange={(e) => set({ footerSubtitle: e.target.value })}
              rows={2}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Primary button — text
            </label>
            <input
              type="text"
              value={p.footerPrimaryText}
              onChange={(e) => set({ footerPrimaryText: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Primary button — link
            </label>
            <input
              type="text"
              value={p.footerPrimaryHref}
              onChange={(e) => set({ footerPrimaryHref: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Secondary button — text
            </label>
            <input
              type="text"
              value={p.footerSecondaryText}
              onChange={(e) => set({ footerSecondaryText: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Secondary button — link
            </label>
            <input
              type="text"
              value={p.footerSecondaryHref}
              onChange={(e) => set({ footerSecondaryHref: e.target.value })}
              className={inputClass}
              placeholder="tel:… or /contact"
            />
          </div>
        </div>
      </FormSection>

      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-8 py-3 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          Save changes
        </button>
      </div>
    </div>
  );
}
