"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Loader2, X, CheckCircle2 } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

interface AboutPageContent {
  _id?: string;
  bannerImage: string;
  bannerTitle: string;
  bannerSubtitle: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  isActive: boolean;
}

const emptyContent = (): AboutPageContent => ({
  bannerImage: "",
  bannerTitle: "About Us",
  bannerSubtitle: "Company Profile",
  title: "",
  subtitle: "",
  description: "",
  image: "",
  features: [],
  isActive: true,
});

export default function AboutContentPage() {
  const [content, setContent] = useState<AboutPageContent>(emptyContent());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/about-page-content?includeInactive=true");
        const data = await res.json();
        if (data.content) {
          const c = data.content as AboutPageContent;
          setContent({
            ...emptyContent(),
            ...c,
            _id: c._id != null ? String(c._id) : undefined,
            bannerImage: c.bannerImage ?? "",
            bannerTitle: c.bannerTitle ?? "About Us",
            bannerSubtitle: c.bannerSubtitle ?? "Company Profile",
            image: c.image ?? "",
            features: c.features ?? [],
          });
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to load about page content");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const tid = toast.loading("Saving…");
    try {
      const payload = { ...content };
      delete payload._id;

      const url = content._id
        ? `/api/about-page-content/${content._id}`
        : "/api/about-page-content";
      const method = content._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      if (data.content) {
        const c = data.content as AboutPageContent;
        setContent({
          ...emptyContent(),
          ...c,
          _id: c._id != null ? String(c._id) : undefined,
          bannerImage: c.bannerImage ?? "",
          bannerTitle: c.bannerTitle ?? "About Us",
          bannerSubtitle: c.bannerSubtitle ?? "Company Profile",
          image: c.image ?? "",
          features: c.features ?? [],
        });
      }
      toast.success("About page content saved!", { id: tid });
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Could not save", {
        id: tid,
      });
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setContent({
      ...content,
      features: [...content.features, newFeature.trim()],
    });
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setContent({
      ...content,
      features: content.features.filter((_, i) => i !== index),
    });
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

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">About Page Content</h2>
          <p className="mt-1 text-slate-600">
            Hero banner and about section on{" "}
            <code className="rounded bg-slate-100 px-1 text-sm">/about</code>.
            The homepage about block is under{" "}
            <strong>Home Page → About Section</strong>.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-2 font-medium text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          Save changes
        </button>
      </div>

      <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Page banner</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Banner headline
            </label>
            <input
              type="text"
              value={content.bannerTitle}
              onChange={(e) =>
                setContent({ ...content, bannerTitle: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="About Us"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Banner subtitle
            </label>
            <input
              type="text"
              value={content.bannerSubtitle}
              onChange={(e) =>
                setContent({ ...content, bannerSubtitle: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Company Profile"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Banner image
            </label>

            {content.bannerImage ? (
              <div className="relative mb-4 aspect-[21/9] max-w-3xl overflow-hidden rounded-lg">
                <Image
                  src={content.bannerImage}
                  alt="Banner preview"
                  fill
                  sizes="100vw"
                  unoptimized
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setContent({ ...content, bannerImage: "" })}
                  className="absolute right-2 top-2 rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                  aria-label="Remove banner image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : null}

            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) {
                  setContent({ ...content, bannerImage: res[0].url });
                  toast.success("Banner image uploaded");
                }
              }}
              onUploadError={(err) => {
                toast.error(err.message);
              }}
              appearance={{
                button:
                  "bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium w-full max-w-xl",
                container: "w-full max-w-xl",
              }}
              content={{ button: "Upload banner image" }}
            />
            <p className="my-2 max-w-xl text-center text-sm text-slate-500">
              or paste URL
            </p>
            <input
              type="text"
              value={content.bannerImage}
              onChange={(e) =>
                setContent({ ...content, bannerImage: e.target.value })
              }
              className="w-full max-w-xl rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="https://…"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">About section</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={content.title}
              onChange={(e) =>
                setContent({ ...content, title: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Subtitle
            </label>
            <textarea
              value={content.subtitle}
              onChange={(e) =>
                setContent({ ...content, subtitle: e.target.value })
              }
              rows={2}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              value={content.description}
              onChange={(e) =>
                setContent({ ...content, description: e.target.value })
              }
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company section image
            </label>

            {content.image ? (
              <div className="relative mb-4 aspect-[4/3] max-w-xl overflow-hidden rounded-lg">
                <Image
                  src={content.image}
                  alt="Section preview"
                  fill
                  sizes="100vw"
                  unoptimized
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setContent({ ...content, image: "" })}
                  className="mt-2 rounded-lg bg-red-50 p-2 text-sm text-red-600 hover:bg-red-100"
                >
                  <X className="mr-1 inline h-4 w-4" />
                  Remove image
                </button>
              </div>
            ) : null}

            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) {
                  setContent({ ...content, image: res[0].url });
                  toast.success("Section image uploaded");
                }
              }}
              onUploadError={(err) => {
                toast.error(err.message);
              }}
              appearance={{
                button:
                  "bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium",
                container: "w-full max-w-xl",
              }}
              content={{ button: "Upload section image" }}
            />
            <input
              type="text"
              value={content.image}
              onChange={(e) =>
                setContent({ ...content, image: e.target.value })
              }
              className="mt-3 w-full max-w-xl rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Or paste image URL"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3 rounded-lg bg-slate-50 p-4">
            <input
              type="checkbox"
              id="aboutPageActive"
              checked={content.isActive}
              onChange={(e) =>
                setContent({ ...content, isActive: e.target.checked })
              }
              className="h-5 w-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <label
              htmlFor="aboutPageActive"
              className="text-sm font-medium text-slate-700"
            >
              Active (visible on website)
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Features list</h3>

        {content.features.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No features yet.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6">
            {content.features.map((feature, index) => (
              <li
                key={`${feature}-${index}`}
                className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                  aria-hidden
                />
                <span className="min-w-0 flex-1 text-lg leading-relaxed text-slate-700">
                  {feature}
                </span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="shrink-0 rounded-lg p-2 text-red-600 hover:bg-red-50"
                  aria-label={`Remove feature: ${feature}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-3">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addFeature()}
            placeholder="Add new feature…"
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
