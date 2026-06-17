"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  type CategoryPageSlug,
} from "@/lib/categoryPageSlugs";
import type { CategoryPagePublic } from "@/lib/categoryPageDefaults";
import { getDefaultCategoryPage } from "@/lib/categoryPageDefaults";
import { CategoryPageEditor } from "@/components/admin/CategoryPageEditor";

export default function CategoryPagesAdminPage() {
  const router = useRouter();
  const [slug, setSlug] = useState<CategoryPageSlug>("commercial");
  const [page, setPage] = useState<CategoryPagePublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [linkedCategoryId, setLinkedCategoryId] = useState<string | null>(null);

  const load = useCallback(async (s: CategoryPageSlug) => {
    setLoading(true);
    try {
      const [pageRes, catRes] = await Promise.all([
        fetch(`/api/category-pages/${s}?includeInactive=true`),
        fetch("/api/categories?includeInactive=true"),
      ]);
      const pageData = await pageRes.json();
      const catData = await catRes.json();

      if (!pageRes.ok) throw new Error(pageData.error || "Failed to load");
      setPage(pageData.page as CategoryPagePublic);

      const match = (catData.categories || []).find(
        (c: { pageSlug?: string; _id?: string }) => c.pageSlug === s
      );
      setLinkedCategoryId(match?._id ?? null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load");
      setPage(getDefaultCategoryPage(s));
      setLinkedCategoryId(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(slug);
  }, [slug, load]);

  useEffect(() => {
    if (linkedCategoryId) {
      router.replace(`/admin/home/categories/${linkedCategoryId}`);
    }
  }, [linkedCategoryId, router]);

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

  if (linkedCategoryId) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
      </div>
    );
  }

  if (loading || !page) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      <Toaster position="top-right" />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Category landing pages
          </h2>
          <p className="mt-1 max-w-2xl text-slate-600">
            This page is no longer used for categories linked to a homepage
            tile. Edit those from{" "}
            <a
              href="/admin/home/categories"
              className="font-medium text-amber-700 hover:text-amber-800"
            >
              Categories
            </a>
            .
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

      <CategoryPageEditor
        slug={slug}
        page={page}
        onChange={setPage}
        showSlugPicker
        onSlugChange={setSlug}
        onReload={() => load(slug)}
        onResetToDefaults={resetToDefaults}
        reloading={loading}
      />

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
