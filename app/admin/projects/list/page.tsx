"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import toast, { Toaster } from "react-hot-toast";
import type { ProjectDetailUI } from "@/lib/projectSerialize";

const TYPES = [
  "Commercial",
  "Retail",
  "Industrial",
  "Residential",
  "Mixed-Use",
] as const;
const STATUSES = [
  "Completed",
  "Under Construction",
  "Coming Soon",
  "Planning",
] as const;

interface ListItem {
  _id: string;
  title: string;
  type: string;
  location: string;
  status: string;
  image: string;
  order: number;
  isActive: boolean;
}

function linesToText(lines: string[]) {
  return (lines || []).join("\n");
}

function textToLines(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

type SectionForm = {
  title: string;
  description: string;
  images: string[];
  order: number;
};

const emptySection = (): SectionForm => ({
  title: "",
  description: "",
  images: [],
  order: 0,
});

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>("Commercial");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<string>("Planning");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [units, setUnits] = useState("");
  const [completion, setCompletion] = useState("");
  const [architect, setArchitect] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [amenitiesText, setAmenitiesText] = useState("");
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [galleryUrlPaste, setGalleryUrlPaste] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [brochureUrl, setBrochureUrl] = useState("");
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [gallerySections, setGallerySections] = useState<SectionForm[]>([]);

  const fetchList = async () => {
    try {
      const res = await fetch("/api/projects?includeInactive=true");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (e) {
      console.error(e);
      toast.error("Could not load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const resetForm = () => {
    setTitle("");
    setType("Commercial");
    setLocation("");
    setStatus("Planning");
    setImage("");
    setDescription("");
    setArea("");
    setUnits("");
    setCompletion("");
    setArchitect("");
    setFeaturesText("");
    setAmenitiesText("");
    setGalleryUrls([]);
    setGalleryUrlPaste("");
    setContactPhone("");
    setContactEmail("");
    setBrochureUrl("");
    setOrder(projects.length);
    setIsActive(true);
    setGallerySections([]);
    setEditingId(null);
    setIsAdding(false);
  };

  const populateFromDetail = (p: ProjectDetailUI) => {
    setTitle(p.title);
    setType(p.category);
    setLocation(p.location);
    setStatus(p.status);
    setImage(p.image || "");
    setDescription(p.description);
    setArea(p.details.area === "—" ? "" : p.details.area);
    setUnits(p.details.units === "—" ? "" : p.details.units);
    setCompletion(
      p.details.completion === "—" ? "" : p.details.completion
    );
    setArchitect(p.details.architect === "—" ? "" : p.details.architect);
    setFeaturesText(linesToText(p.features));
    setAmenitiesText(linesToText(p.amenities));
    setGalleryUrls(
      p.gallery?.length ? [...p.gallery] : p.image ? [p.image] : []
    );
    setContactPhone(p.contactPhone);
    setContactEmail(p.contactEmail);
    setBrochureUrl(p.brochureUrl);
    setGallerySections(
      (p.gallerySections || []).map((s, i) => ({
        title: s.title,
        description: s.description || "",
        images: [...(s.images || [])],
        order: s.order ?? i,
      }))
    );
  };

  const handleEdit = async (item: ListItem) => {
    setEditingId(item._id);
    setIsAdding(false);
    setImage(item.image);
    setOrder(item.order);
    setIsActive(item.isActive);
    try {
      const res = await fetch(`/api/projects/${item._id}`);
      if (!res.ok) throw new Error("load failed");
      const data = await res.json();
      if (data.project) populateFromDetail(data.project as ProjectDetailUI);
    } catch (e) {
      console.error(e);
      toast.error("Could not load project details");
    }
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
    setEditingId(null);
    setOrder(projects.length);
  };

  const buildPayload = () => {
    const gallery = galleryUrls.map((u) => u.trim()).filter(Boolean);
    const sections = gallerySections
      .filter((s) => s.title.trim())
      .map((s, i) => ({
        title: s.title.trim(),
        description: s.description.trim(),
        images: (s.images || []).map((u) => u.trim()).filter(Boolean),
        order: s.order ?? i,
      }));
    return {
      title: title.trim(),
      type,
      location: location.trim(),
      status,
      image: image.trim(),
      description: description.trim(),
      area: area.trim(),
      units: units.trim(),
      completion: completion.trim(),
      architect: architect.trim(),
      features: textToLines(featuresText),
      amenities: textToLines(amenitiesText),
      gallery: gallery.length ? gallery : image.trim() ? [image.trim()] : [],
      gallerySections: sections,
      contactPhone: contactPhone.trim(),
      contactEmail: contactEmail.trim(),
      brochureUrl: brochureUrl.trim(),
      order,
      isActive,
    };
  };

  const handleSave = async () => {
    if (!title.trim() || !location.trim() || !image.trim()) {
      toast.error("Title, location, and card image are required");
      return;
    }
    setSaving(true);
    const tid = toast.loading("Saving…");
    try {
      const payload = buildPayload();
      if (isAdding) {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(
            typeof err.error === "string" ? err.error : "Create failed"
          );
        }
        toast.success("Project created", { id: tid });
        await fetchList();
        resetForm();
      } else if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(
            typeof err.error === "string" ? err.error : "Update failed"
          );
        }
        toast.success("Project updated", { id: tid });
        await fetchList();
        resetForm();
      } else {
        toast.dismiss(tid);
      }
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Save failed", { id: tid });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Project deleted");
      await fetchList();
      if (editingId === id) resetForm();
    } catch {
      toast.error("Could not delete");
    }
  };

  const addGallerySection = () => {
    setGallerySections((prev) => [
      ...prev,
      { ...emptySection(), order: prev.length },
    ]);
  };

  const updateSection = (
    index: number,
    field: keyof SectionForm,
    value: string | number
  ) => {
    setGallerySections((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const removeSection = (index: number) => {
    setGallerySections((prev) => prev.filter((_, i) => i !== index));
  };

  const appendGalleryUrls = (urls: string[]) => {
    const next = urls.map((u) => u.trim()).filter(Boolean);
    if (!next.length) return;
    setGalleryUrls((prev) => [...prev, ...next]);
  };

  const removeGalleryUrl = (index: number) => {
    setGalleryUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const mergeGalleryPaste = () => {
    const extra = textToLines(galleryUrlPaste);
    if (extra.length) appendGalleryUrls(extra);
    setGalleryUrlPaste("");
    if (extra.length) toast.success(`Added ${extra.length} URL(s)`);
  };

  const appendSectionImages = (sectionIndex: number, urls: string[]) => {
    const next = urls.map((u) => u.trim()).filter(Boolean);
    if (!next.length) return;
    setGallerySections((prev) => {
      const copy = [...prev];
      copy[sectionIndex] = {
        ...copy[sectionIndex],
        images: [...(copy[sectionIndex].images || []), ...next],
      };
      return copy;
    });
  };

  const removeSectionImage = (sectionIndex: number, imageIndex: number) => {
    setGallerySections((prev) => {
      const copy = [...prev];
      copy[sectionIndex] = {
        ...copy[sectionIndex],
        images: copy[sectionIndex].images.filter((_, i) => i !== imageIndex),
      };
      return copy;
    });
  };

  const uploadAppearance = {
    button:
      "bg-amber-600 text-white px-4 py-2 rounded-lg text-sm ut-ready:bg-amber-600 ut-uploading:opacity-70",
    container: "w-auto",
    allowedContent: "text-slate-600 text-xs",
  } as const;

  if (loading) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">All projects</h2>
            <p className="text-slate-600 mt-1">
              Listing card, unlimited gallery images, optional gallery sections
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium"
          >
            <Plus className="w-5 h-5" />
            Add project
          </button>
        </div>

        {(isAdding || editingId) && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                {isAdding ? "New project" : "Edit project"}
              </h3>
              <button
                type="button"
                onClick={resetForm}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title * (can use multiple lines)
                </label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Location *
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Card image * (projects grid) — UploadThing
                </label>
                {image && (
                  <img
                    src={image}
                    alt=""
                    className="h-32 rounded-lg object-cover mb-2 max-w-xs border"
                  />
                )}
                <div className="flex flex-col gap-2 max-w-md">
                  <UploadButton<OurFileRouter, "imageUploader">
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]) {
                        setImage(res[0].url);
                        toast.success("Card image uploaded");
                      }
                    }}
                    onUploadError={(err: Error) => {
                      toast.error(err.message);
                    }}
                    appearance={uploadAppearance}
                    content={{
                      button: "Upload card image",
                      allowedContent: "Images up to 16MB",
                    }}
                  />
                  <input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
                    placeholder="Or paste existing image URL"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Total area
                </label>
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  placeholder="125,000 m²"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Units
                </label>
                <input
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Completion
                </label>
                <input
                  value={completion}
                  onChange={(e) => setCompletion(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Lead architect
                </label>
                <input
                  value={architect}
                  onChange={(e) => setArchitect(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Features (one per line)
                </label>
                <textarea
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Amenities (one per line)
                </label>
                <textarea
                  value={amenitiesText}
                  onChange={(e) => setAmenitiesText(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg font-mono text-sm"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Project gallery — UploadThing (hero + main gallery). Add as
                    many batches as you need.
                  </label>
                  {galleryUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {galleryUrls.map((url, gi) => (
                        <div
                          key={`${url}-${gi}`}
                          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                        >
                          <img
                            src={url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryUrl(gi)}
                            className="absolute right-0 top-0 rounded-bl bg-red-600 p-1 text-white hover:bg-red-700"
                            aria-label="Remove image"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <UploadButton<OurFileRouter, "multiImageUploader">
                      endpoint="multiImageUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.length) {
                          appendGalleryUrls(res.map((r) => r.url));
                          toast.success(
                            `${res.length} image(s) uploaded to gallery`
                          );
                        }
                      }}
                      onUploadError={(err: Error) => {
                        toast.error(err.message);
                      }}
                      appearance={uploadAppearance}
                      content={{
                        button: "Upload multiple images",
                        allowedContent: "Up to 50 files, 16MB each",
                      }}
                    />
                    <UploadButton<OurFileRouter, "imageUploader">
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]) {
                          appendGalleryUrls([res[0].url]);
                          toast.success("Image added");
                        }
                      }}
                      onUploadError={(err: Error) => {
                        toast.error(err.message);
                      }}
                      appearance={uploadAppearance}
                      content={{
                        button: "Upload one image",
                        allowedContent: "16MB",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Optional: paste extra URLs (one per line), then append
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <textarea
                      value={galleryUrlPaste}
                      onChange={(e) => setGalleryUrlPaste(e.target.value)}
                      rows={3}
                      className="min-w-0 flex-1 px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
                      placeholder="https://…"
                    />
                    <button
                      type="button"
                      onClick={mergeGalleryPaste}
                      className="shrink-0 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Append URLs
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Sidebar phone
                </label>
                <input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Sidebar email
                </label>
                <input
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Brochure PDF URL (optional)
                </label>
                <input
                  value={brochureUrl}
                  onChange={(e) => setBrochureUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  placeholder="https://…/brochure.pdf"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Sort order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="proj-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 text-amber-600 rounded"
                />
                <label htmlFor="proj-active" className="text-sm font-medium">
                  Active on site
                </label>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900">
                  Optional gallery sections
                </h4>
                <button
                  type="button"
                  onClick={addGallerySection}
                  className="text-sm font-medium text-amber-700 hover:text-amber-800"
                >
                  + Add section
                </button>
              </div>
              <p className="text-sm text-slate-600">
                e.g. “Tenants confirmed” with a short description and images via
                UploadThing (optional).
              </p>
              {gallerySections.map((sec, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-700">
                      Section {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    placeholder="Section title"
                    value={sec.title}
                    onChange={(e) =>
                      updateSection(idx, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={sec.description}
                    onChange={(e) =>
                      updateSection(idx, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-slate-600">
                      Section images (UploadThing)
                    </span>
                    {sec.images.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {sec.images.map((url, ii) => (
                          <div
                            key={`${url}-${ii}`}
                            className="relative h-16 w-16 shrink-0 overflow-hidden rounded border border-slate-200 bg-white"
                          >
                            <img
                              src={url}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeSectionImage(idx, ii)}
                              className="absolute right-0 top-0 rounded-bl bg-red-600 p-0.5 text-white"
                              aria-label="Remove"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <UploadButton<OurFileRouter, "multiImageUploader">
                        endpoint="multiImageUploader"
                        onClientUploadComplete={(res) => {
                          if (res?.length) {
                            appendSectionImages(
                              idx,
                              res.map((r) => r.url)
                            );
                            toast.success(`${res.length} image(s) added`);
                          }
                        }}
                        onUploadError={(err: Error) => {
                          toast.error(err.message);
                        }}
                        appearance={uploadAppearance}
                        content={{
                          button: "Upload multiple",
                          allowedContent: "≤50 files",
                        }}
                      />
                      <UploadButton<OurFileRouter, "imageUploader">
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res?.[0]) {
                            appendSectionImages(idx, [res[0].url]);
                            toast.success("Image added");
                          }
                        }}
                        onUploadError={(err: Error) => {
                          toast.error(err.message);
                        }}
                        appearance={uploadAppearance}
                        content={{
                          button: "Upload one",
                          allowedContent: "16MB",
                        }}
                      />
                    </div>
                  </div>
                  <input
                    type="number"
                    placeholder="Order"
                    value={sec.order}
                    onChange={(e) =>
                      updateSection(
                        idx,
                        "order",
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    className="w-32 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-slate-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="aspect-video bg-slate-100 relative">
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-slate-300 absolute inset-0 m-auto" />
                )}
                {!p.isActive && (
                  <span className="absolute top-2 right-2 bg-slate-800 text-white text-xs px-2 py-1 rounded">
                    INACTIVE
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 whitespace-pre-line">{p.title}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {p.type} · {p.status} · order {p.order}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(p)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-100 rounded-lg text-sm"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p._id)}
                    className="py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
