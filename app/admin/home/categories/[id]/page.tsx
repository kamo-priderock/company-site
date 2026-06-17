"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import {
  CATEGORY_PAGE_SLUGS,
  isCategoryPageSlug,
  type CategoryPageSlug,
} from "@/lib/categoryPageSlugs";
import type { CategoryPagePublic } from "@/lib/categoryPageDefaults";
import { getDefaultCategoryPage } from "@/lib/categoryPageDefaults";
import {
  CategoryPageEditor,
  SLUG_LABEL,
} from "@/components/admin/CategoryPageEditor";

interface Category {
  _id?: string;
  title: string;
  image: string;
  link: string;
  pageSlug?: string;
  order: number;
  isActive: boolean;
}

function linkForPageSlug(pageSlug: string): string {
  if (!pageSlug) return "";
  return `/${pageSlug}`;
}

const PAGE_SLUG_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "None (custom link only)" },
  ...CATEGORY_PAGE_SLUGS.map((s) => ({
    value: s,
    label: SLUG_LABEL[s],
  })),
];

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [page, setPage] = useState<CategoryPagePublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const pageSlug = category?.pageSlug && isCategoryPageSlug(category.pageSlug)
    ? category.pageSlug
    : null;

  const loadCategory = useCallback(async () => {
    const res = await fetch(`/api/categories/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load category");
    return data.category as Category;
  }, [id]);

  const loadPage = useCallback(async (slug: CategoryPageSlug) => {
    setPageLoading(true);
    try {
      const res = await fetch(
        `/api/category-pages/${slug}?includeInactive=true`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load page");
      setPage(data.page as CategoryPagePublic);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load page");
      setPage(getDefaultCategoryPage(slug));
    } finally {
      setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const cat = await loadCategory();
        if (cancelled) return;
        setCategory({
          ...cat,
          pageSlug: cat.pageSlug ?? "",
        });
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load");
        router.push("/admin/home/categories");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadCategory, router]);

  useEffect(() => {
    if (!pageSlug) {
      setPage(null);
      return;
    }
    loadPage(pageSlug);
  }, [pageSlug, loadPage]);

  const updateCategory = (patch: Partial<Category>) => {
    setCategory((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const handlePageSlugChange = (newSlug: string) => {
    updateCategory({
      pageSlug: newSlug,
      link: newSlug ? linkForPageSlug(newSlug) : category?.link ?? "",
    });
  };

  const reloadPage = () => {
    if (pageSlug) loadPage(pageSlug);
  };

  const resetPageToDefaults = () => {
    if (!pageSlug) return;
    if (
      !window.confirm(
        "Replace all landing page fields with built-in defaults? Unsaved changes will be lost."
      )
    ) {
      return;
    }
    setPage(getDefaultCategoryPage(pageSlug));
    toast.success("Landing page reset to defaults (save when ready)");
  };

  const saveAll = async () => {
    if (!category) return;
    setSaving(true);
    const tid = toast.loading("Saving…");
    try {
      const catRes = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      const catData = await catRes.json();
      if (!catRes.ok) throw new Error(catData.error || "Failed to save category");

      if (pageSlug && page) {
        const pageRes = await fetch(`/api/category-pages/${pageSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...page, slug: pageSlug }),
        });
        const pageData = await pageRes.json();
        if (!pageRes.ok) throw new Error(pageData.error || "Failed to save landing page");
        if (pageData.page) setPage(pageData.page as CategoryPagePublic);
      }

      if (catData.category) {
        setCategory({
          ...catData.category,
          pageSlug: catData.category.pageSlug ?? "",
        });
      }

      toast.success("Saved successfully", { id: tid });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed", { id: tid });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !category) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <Toaster position="top-right" />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            href="/admin/home/categories"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to categories
          </Link>
          <h2 className="text-3xl font-bold text-slate-900">
            Edit {category.title || "category"}
          </h2>
          <p className="mt-1 max-w-2xl text-slate-600">
            Manage the homepage tile and landing page content in one place.
          </p>
        </div>
        <button
          type="button"
          onClick={saveAll}
          disabled={saving || pageLoading}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          Save all changes
        </button>
      </div>

      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">
            Homepage tile
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            How this category appears on the homepage carousel/grid.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={category.title}
              onChange={(e) => updateCategory({ title: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., Retail Properties"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Property category page
            </label>
            <select
              value={category.pageSlug ?? ""}
              onChange={(e) => handlePageSlugChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {PAGE_SLUG_OPTIONS.map((opt) => (
                <option key={opt.value || "none"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">
              Linking to a category page lets you edit its landing page content
              below.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Link
            </label>
            <input
              type="text"
              value={category.link}
              onChange={(e) => updateCategory({ link: e.target.value })}
              disabled={Boolean(category.pageSlug)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:cursor-not-allowed disabled:bg-slate-100"
              placeholder="/services or /projects"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Order
            </label>
            <input
              type="number"
              value={category.order}
              onChange={(e) =>
                updateCategory({ order: parseInt(e.target.value, 10) || 0 })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 md:col-span-2">
            <input
              type="checkbox"
              id="cat-active"
              checked={category.isActive}
              onChange={(e) => updateCategory({ isActive: e.target.checked })}
              className="h-5 w-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <label htmlFor="cat-active" className="text-sm font-medium text-slate-700">
              Active (visible on website)
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Category image
            </label>
            {category.image ? (
              <div className="relative mb-4 aspect-[4/5] max-w-xs overflow-hidden rounded-lg">
                <Image
                  src={category.image}
                  alt="Preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  unoptimized
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => updateCategory({ image: "" })}
                  className="absolute right-2 top-2 rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mb-4 flex aspect-[4/5] max-w-xs items-center justify-center rounded-lg bg-slate-100">
                <ImageIcon className="h-12 w-12 text-slate-400" />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <UploadButton<OurFileRouter, "imageUploader">
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) {
                    updateCategory({ image: res[0].url });
                    toast.success("Image uploaded");
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
                appearance={{
                  button:
                    "bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors",
                  container: "w-full max-w-xs",
                  allowedContent: "text-slate-600 text-sm",
                }}
                content={{
                  button: "Upload image",
                  allowedContent: "Images up to 16MB",
                }}
              />
              <input
                type="text"
                value={category.image}
                onChange={(e) => updateCategory({ image: e.target.value })}
                className="w-full max-w-xl rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Or paste image URL"
              />
            </div>
          </div>
        </div>
      </section>

      {pageSlug ? (
        <section className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-lg font-bold text-slate-900">
              Landing page content
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Content shown when visitors open{" "}
              <code className="rounded bg-slate-100 px-1">/{pageSlug}</code>.
            </p>
          </div>
          {pageLoading || !page ? (
            <div className="flex h-48 items-center justify-center rounded-lg border border-slate-200 bg-white">
              <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
            </div>
          ) : (
            <CategoryPageEditor
              slug={pageSlug}
              page={page}
              onChange={setPage}
              onReload={reloadPage}
              onResetToDefaults={resetPageToDefaults}
              reloading={pageLoading}
            />
          )}
        </section>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-slate-600">
            Select a property category page above to edit its landing page
            content here.
          </p>
        </div>
      )}

      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={saveAll}
          disabled={saving || pageLoading}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-8 py-3 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          Save all changes
        </button>
      </div>
    </div>
  );
}
