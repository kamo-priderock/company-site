"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import toast, { Toaster } from "react-hot-toast";
import { CATEGORY_PAGE_SLUGS } from "@/lib/categoryPageSlugs";
import { SLUG_LABEL } from "@/components/admin/CategoryPageEditor";
import Image from "next/image";

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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Category>({
    title: "",
    image: "",
    link: "",
    pageSlug: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories?includeInactive=true");
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      title: "",
      image: "",
      link: "",
      pageSlug: "",
      order: categories.length,
      isActive: true,
    });
    setIsAdding(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        await fetchCategories();
        resetForm();
        toast.success("Category created");
        if (data.category?._id) {
          window.location.href = `/admin/home/categories/${data.category._id}`;
        }
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchCategories();
        toast.success("Category deleted");
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("An error occurred while deleting");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      image: "",
      link: "",
      pageSlug: "",
      order: 0,
      isActive: true,
    });
    setIsAdding(false);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Categories</h2>
          <p className="mt-1 text-slate-600">
            Manage homepage category tiles and their landing page content. Click
            a category to edit both in one place.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-700"
        >
          <Plus className="h-5 w-5" />
          Add New Category
        </button>
      </div>

      {isAdding && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Add New Category</h3>
            <button
              onClick={resetForm}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., Commercial Properties"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Property category page
              </label>
              <select
                value={formData.pageSlug ?? ""}
                onChange={(e) => {
                  const pageSlug = e.target.value;
                  setFormData({
                    ...formData,
                    pageSlug,
                    link: pageSlug
                      ? linkForPageSlug(pageSlug)
                      : formData.link,
                  });
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {PAGE_SLUG_OPTIONS.map((opt) => (
                  <option key={opt.value || "none"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Link
              </label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                disabled={Boolean(formData.pageSlug)}
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
                value={formData.order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(e.target.value, 10) || 0,
                  })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="0"
              />
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="h-5 w-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-slate-700"
              >
                Active (visible on website)
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category Image
              </label>
              {formData.image && (
                <div className="relative mb-4 aspect-[4/5] max-w-xs overflow-hidden rounded-lg">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="absolute right-2 top-2 rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <div className="flex flex-col gap-3">
                <UploadButton<OurFileRouter, "imageUploader">
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setFormData({ ...formData, image: res[0].url });
                      toast.success("Image uploaded");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(
                      `Upload failed: ${error.message}. Use an image under 16MB.`
                    );
                  }}
                  appearance={{
                    button:
                      "bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors",
                    container: "w-full",
                    allowedContent: "text-slate-600 text-sm",
                  }}
                  content={{
                    button: "Upload Image",
                    allowedContent: "Images up to 16MB",
                  }}
                />
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Or paste image URL here"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-2 font-medium text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create & edit
                </>
              )}
            </button>
            <button
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-6 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {categories.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-12 text-center shadow-sm">
          <ImageIcon className="mx-auto mb-4 h-16 w-16 text-slate-400" />
          <h3 className="mb-2 text-xl font-bold text-slate-900">
            No categories yet
          </h3>
          <p className="mb-6 text-slate-600">
            Get started by adding your first category
          </p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-700"
          >
            <Plus className="h-5 w-5" />
            Add First Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <div
              key={category._id}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <Link
                href={`/admin/home/categories/${category._id}`}
                className="block"
              >
                <div className="relative aspect-[4/5]">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 1280px) 50vw, 20vw"
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                      <ImageIcon className="h-12 w-12 text-slate-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-blue-950/70 transition-colors group-hover:bg-blue-950/50" />
                  <div className="absolute right-4 top-4 flex gap-2">
                    {!category.isActive && (
                      <span className="bg-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        INACTIVE
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-xl font-medium text-white">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">{category.link}</p>
                    {category.pageSlug ? (
                      <p className="mt-1 text-xs text-amber-200/90">
                        Page: {category.pageSlug}
                      </p>
                    ) : null}
                    <span className="mt-2 inline-block rounded bg-white/20 px-2 py-1 text-xs text-white">
                      Order: {category.order}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex gap-2 p-4">
                <Link
                  href={`/admin/home/categories/${category._id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(category._id!)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
