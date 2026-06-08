"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Edit2, X, Loader2 } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

interface Differentiator {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  order: number;
  isActive: boolean;
}

interface WhyChooseUsContent {
  _id?: string;
  sectionBadge: string;
  mainTitle: string;
  highlightedWord: string;
  subtitle: string;
  backgroundImage: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  isActive: boolean;
}

const emptyContent = (): WhyChooseUsContent => ({
  sectionBadge: "",
  mainTitle: "",
  highlightedWord: "",
  subtitle: "",
  backgroundImage: "",
  ctaTitle: "",
  ctaDescription: "",
  ctaButtonText: "",
  ctaButtonLink: "/contact",
  isActive: true,
});

export default function WhyChooseUsPage() {
  const [content, setContent] = useState<WhyChooseUsContent>(emptyContent());
  const [differentiators, setDifferentiators] = useState<Differentiator[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingContent, setSavingContent] = useState(false);
  const [savingItem, setSavingItem] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Differentiator>({
    icon: "Award",
    title: "",
    description: "",
    color: "from-amber-500 to-amber-600",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDifferentiatorsOnly = async () => {
    const diffRes = await fetch(
      "/api/why-choose-differentiators?includeInactive=true"
    );
    const diffData = await diffRes.json();
    if (!diffRes.ok) throw new Error(diffData.error || "Failed to load differentiators");
    setDifferentiators(diffData.items || []);
  };

  const fetchData = async () => {
    try {
      const [contentRes, diffRes] = await Promise.all([
        fetch("/api/why-choose-us?includeInactive=true"),
        fetch("/api/why-choose-differentiators?includeInactive=true"),
      ]);
      const contentData = await contentRes.json();
      const diffData = await diffRes.json();

      if (contentData.content) {
        const c = contentData.content as WhyChooseUsContent & { _id?: string };
        setContent({
          ...emptyContent(),
          ...c,
          _id: c._id != null ? String(c._id) : undefined,
          ctaButtonLink: c.ctaButtonLink || "/contact",
        });
      } else {
        setContent(emptyContent());
      }
      setDifferentiators(diffData.items || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const buildContentPayload = () => {
    const payload = { ...content };
    delete (payload as { _id?: string })._id;
    return payload;
  };

  const applySavedContent = (saved: WhyChooseUsContent & { _id?: string }) => {
    setContent({
      ...emptyContent(),
      ...saved,
      _id: saved._id != null ? String(saved._id) : undefined,
      ctaButtonLink: saved.ctaButtonLink || "/contact",
    });
  };

  const handleSaveContent = async (successMessage = "Section content saved!") => {
    setSavingContent(true);
    const tid = toast.loading("Saving...");
    try {
      const url = content._id
        ? `/api/why-choose-us/${content._id}`
        : "/api/why-choose-us";
      const method = content._id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildContentPayload()),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }
      if (data.content) {
        applySavedContent(data.content);
      }
      toast.success(successMessage, { id: tid });
    } catch (e) {
      console.error(e);
      toast.error(
        e instanceof Error ? e.message : "Could not save section content",
        { id: tid }
      );
    } finally {
      setSavingContent(false);
    }
  };

  const handleEdit = (item: Differentiator) => {
    setFormData({
      icon: item.icon,
      title: item.title,
      description: item.description,
      color: item.color,
      order: item.order ?? 0,
      isActive: item.isActive !== false,
      _id: item._id,
    });
    setEditingId(item._id || null);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      icon: "Award",
      title: "",
      description: "",
      color: "from-amber-500 to-amber-600",
      order: differentiators.length,
      isActive: true,
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleSaveItem = async () => {
    setSavingItem(true);
    const tid = toast.loading("Saving differentiator...");
    try {
      const payload = { ...formData };
      delete (payload as { _id?: string })._id;

      const url = formData._id
        ? `/api/why-choose-differentiators/${formData._id}`
        : "/api/why-choose-differentiators";
      const method = formData._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      const saved = data.item as Differentiator | undefined;
      if (saved && saved._id) {
        if (method === "POST") {
          setDifferentiators((prev) =>
            [...prev, saved].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          );
        } else {
          setDifferentiators((prev) =>
            prev.map((d) => (d._id === saved._id ? { ...saved } : d))
          );
        }
      } else {
        await fetchDifferentiatorsOnly();
      }
      resetForm();
      toast.success("Differentiator saved!", { id: tid });
    } catch (e) {
      console.error(e);
      toast.error("Could not save differentiator", { id: tid });
    } finally {
      setSavingItem(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this differentiator?")) return;
    const tid = toast.loading("Deleting...");
    try {
      const res = await fetch(`/api/why-choose-differentiators/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setDifferentiators((prev) => prev.filter((d) => d._id !== id));
      if (editingId === id) {
        resetForm();
      }
      toast.success("Deleted", { id: tid });
    } catch (e) {
      console.error(e);
      toast.error("Could not delete", { id: tid });
    }
  };

  const resetForm = () => {
    setFormData({
      icon: "Award",
      title: "",
      description: "",
      color: "from-amber-500 to-amber-600",
      order: 0,
      isActive: true,
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const iconOptions = [
    "Award",
    "Shield",
    "Leaf",
    "Users",
    "TrendingUp",
    "Clock",
    "Star",
    "CheckCircle",
    "Heart",
    "Zap",
  ];
  const colorOptions = [
    "from-amber-500 to-amber-600",
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-purple-500 to-purple-600",
    "from-red-500 to-red-600",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Why Choose Us Section</h2>
          <p className="text-slate-600 mt-1">
            Manage the differentiators and content for this section
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleSaveContent()}
          disabled={savingContent}
          className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {savingContent ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save All Changes
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Section Header</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Section Badge
            </label>
            <input
              type="text"
              value={content.sectionBadge}
              onChange={(e) => setContent({ ...content, sectionBadge: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Highlighted Word
            </label>
            <input
              type="text"
              value={content.highlightedWord}
              onChange={(e) => setContent({ ...content, highlightedWord: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Main Title (before highlighted word)
            </label>
            <input
              type="text"
              value={content.mainTitle}
              onChange={(e) => setContent({ ...content, mainTitle: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="What Makes"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
            <textarea
              value={content.subtitle}
              onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Background Image
            </label>
            {content.backgroundImage ? (
              <div className="mb-3 aspect-video max-w-xl rounded-lg overflow-hidden">
                <Image
                  src={content.backgroundImage}
                  alt=""
                  fill
                  sizes="100vw"
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) {
                  setContent({ ...content, backgroundImage: res[0].url });
                  toast.success("Background image uploaded");
                }
              }}
              onUploadError={(err) => {
                toast.error(err.message);
              }}
              appearance={{
                button:
                  "bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium w-full",
                container: "w-full max-w-xl",
              }}
              content={{ button: "Upload background" }}
            />
            <p className="text-center text-sm text-slate-500 my-2">or paste URL</p>
            <input
              type="text"
              value={content.backgroundImage}
              onChange={(e) => setContent({ ...content, backgroundImage: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <input
              type="checkbox"
              id="wc-active"
              checked={content.isActive}
              onChange={(e) => setContent({ ...content, isActive: e.target.checked })}
              className="w-5 h-5 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
            />
            <label htmlFor="wc-active" className="text-sm font-medium text-slate-700">
              Active (visible on site)
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-900">Bottom CTA Section</h3>
          <button
            type="button"
            onClick={() => handleSaveContent("Bottom CTA saved!")}
            disabled={savingContent}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {savingContent ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save CTA
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">CTA Title</label>
            <input
              type="text"
              value={content.ctaTitle}
              onChange={(e) => setContent({ ...content, ctaTitle: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Button Text</label>
            <input
              type="text"
              value={content.ctaButtonText}
              onChange={(e) => setContent({ ...content, ctaButtonText: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Button Link</label>
            <input
              type="text"
              value={content.ctaButtonLink}
              onChange={(e) => setContent({ ...content, ctaButtonLink: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="/contact"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              CTA Description
            </label>
            <input
              type="text"
              value={content.ctaDescription}
              onChange={(e) => setContent({ ...content, ctaDescription: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Differentiators (Features)</h3>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>

        {(editingId !== null || isAdding) && (
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">
                {isAdding ? "Add Differentiator" : "Edit Differentiator"}
              </h4>
              <button type="button" onClick={resetForm} className="p-2 hover:bg-slate-200 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Icon Name (Lucide)
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gradient Color
                </label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {colorOptions.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-8">
                <input
                  type="checkbox"
                  id="diff-active"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="diff-active" className="text-sm text-slate-700">
                  Active
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={handleSaveItem}
                disabled={savingItem}
                className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {savingItem ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Item
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <div
              key={item._id || index}
              className="p-6 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color}`}>
                    <div className="w-6 h-6 text-white font-bold">{item.icon[0]}</div>
                  </div>
                  <span className="text-sm bg-white px-2 py-1 rounded text-slate-600">
                    {index + 1}
                  </span>
                  {!item.isActive && (
                    <span className="text-xs bg-slate-600 text-white px-2 py-0.5 rounded">
                      inactive
                    </span>
                  )}
                </div>
              </div>

              <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">{item.description}</p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg font-medium transition-colors text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                {item._id && (
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id!)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
