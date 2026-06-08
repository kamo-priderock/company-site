"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import {
  getDefaultFooter,
  type FooterLinkPublic,
  type FooterPublic,
} from "@/lib/footerDefaults";

type LinkListKey = "quickLinks" | "serviceLinks" | "legalLinks";

export default function FooterAdminPage() {
  const [footerId, setFooterId] = useState<string | undefined>();
  const [footer, setFooter] = useState<FooterPublic>(getDefaultFooter());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/footer?includeInactive=true");
        const data = await res.json();
        if (data.footer) {
          setFooter({ ...getDefaultFooter(), ...data.footer });
          setFooterId(data._id != null ? String(data._id) : undefined);
        } else {
          setFooter(getDefaultFooter());
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to load footer");
        setFooter(getDefaultFooter());
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateLink = (
    listKey: LinkListKey,
    index: number,
    field: keyof FooterLinkPublic,
    value: string | number
  ) => {
    setFooter((prev) => {
      const links = [...prev[listKey]];
      links[index] = { ...links[index], [field]: value };
      return { ...prev, [listKey]: links };
    });
  };

  const addLink = (listKey: LinkListKey) => {
    setFooter((prev) => ({
      ...prev,
      [listKey]: [
        ...prev[listKey],
        { label: "", href: "/", order: prev[listKey].length },
      ],
    }));
  };

  const removeLink = (listKey: LinkListKey, index: number) => {
    setFooter((prev) => ({
      ...prev,
      [listKey]: prev[listKey]
        .filter((_, i) => i !== index)
        .map((link, i) => ({ ...link, order: i })),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const tid = toast.loading("Saving footer…");
    try {
      const url = footerId ? `/api/footer/${footerId}` : "/api/footer";
      const method = footerId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(footer),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      if (data.footer) {
        setFooter({ ...getDefaultFooter(), ...data.footer });
      }
      const rawId = data.raw?._id ?? data._id;
      if (rawId != null) setFooterId(String(rawId));
      toast.success("Footer saved!", { id: tid });
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Could not save", {
        id: tid,
      });
    } finally {
      setSaving(false);
    }
  };

  const renderLinkEditor = (
    title: string,
    listKey: LinkListKey,
    addLabel: string
  ) => (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      {footer[listKey].length === 0 ? (
        <p className="text-sm text-slate-500 rounded-lg border border-dashed border-slate-200 px-4 py-3">
          No links yet.
        </p>
      ) : (
        footer[listKey].map((link, index) => (
          <div
            key={`${listKey}-${index}`}
            className="grid grid-cols-1 gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3 sm:grid-cols-[1fr_1fr_auto]"
          >
            <input
              type="text"
              value={link.label}
              onChange={(e) =>
                updateLink(listKey, index, "label", e.target.value)
              }
              placeholder="Label"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="text"
              value={link.href}
              onChange={(e) =>
                updateLink(listKey, index, "href", e.target.value)
              }
              placeholder="/about or https://…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={() => removeLink(listKey, index)}
              className="inline-flex items-center justify-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
          </div>
        ))
      )}
      <button
        type="button"
        onClick={() => addLink(listKey)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        {addLabel}
      </button>
    </div>
  );

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
          <h2 className="text-3xl font-bold text-slate-900">Footer</h2>
          <p className="mt-1 text-slate-600">
            Brand, navigation links, social URLs, and copyright shown site-wide.
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
        <h3 className="text-xl font-bold text-slate-900">Brand</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company name
            </label>
            <input
              type="text"
              value={footer.brandName}
              onChange={(e) =>
                setFooter({ ...footer, brandName: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tagline
            </label>
            <textarea
              value={footer.tagline}
              onChange={(e) =>
                setFooter({ ...footer, tagline: e.target.value })
              }
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Logo
            </label>
            {footer.logoUrl ? (
              <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-lg">
                <Image
                  src={footer.logoUrl}
                  alt=""
                  fill
                  sizes="64px"
                  unoptimized
                  className="object-contain"
                />
              </div>
            ) : null}
            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) {
                  setFooter({ ...footer, logoUrl: res[0].url });
                  toast.success("Logo uploaded");
                }
              }}
              onUploadError={(err) => {
                toast.error(err.message);
              }}
              appearance={{
                button:
                  "bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium w-full max-w-md",
                container: "w-full max-w-md",
              }}
              content={{ button: "Upload logo" }}
            />
            <p className="my-2 text-center text-sm text-slate-500 max-w-md">
              or paste URL
            </p>
            <input
              type="text"
              value={footer.logoUrl}
              onChange={(e) =>
                setFooter({ ...footer, logoUrl: e.target.value })
              }
              placeholder="/PrideRock.png"
              className="w-full max-w-md rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Social links</h3>
        <p className="text-sm text-slate-600">
          Leave blank to hide an icon on the site.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {(
            [
              ["facebookUrl", "Facebook URL"],
              ["twitterUrl", "Twitter / X URL"],
              ["linkedinUrl", "LinkedIn URL"],
              ["instagramUrl", "Instagram URL"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
              </label>
              <input
                type="text"
                value={footer[key]}
                onChange={(e) =>
                  setFooter({ ...footer, [key]: e.target.value })
                }
                placeholder="https://…"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Navigation columns</h3>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Quick links — column heading
          </label>
          <input
            type="text"
            value={footer.quickLinksHeading}
            onChange={(e) =>
              setFooter({ ...footer, quickLinksHeading: e.target.value })
            }
            className="w-full max-w-md rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        {renderLinkEditor("Quick links", "quickLinks", "Add quick link")}
        <hr className="border-slate-100" />
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Services — column heading
          </label>
          <input
            type="text"
            value={footer.servicesHeading}
            onChange={(e) =>
              setFooter({ ...footer, servicesHeading: e.target.value })
            }
            className="w-full max-w-md rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        {renderLinkEditor("Service links", "serviceLinks", "Add service link")}
      </div>

      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Bottom bar</h3>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Copyright text
          </label>
          <input
            type="text"
            value={footer.copyrightText}
            onChange={(e) =>
              setFooter({ ...footer, copyrightText: e.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="© {year} Company. All rights reserved."
          />
          <p className="mt-1 text-xs text-slate-500">
            Use <code className="rounded bg-slate-100 px-1">{"{year}"}</code> for
            the current year.
          </p>
        </div>
        {renderLinkEditor(
          "Legal links (optional)",
          "legalLinks",
          "Add legal link"
        )}
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
          <input
            type="checkbox"
            id="footer-active"
            checked={footer.isActive}
            onChange={(e) =>
              setFooter({ ...footer, isActive: e.target.checked })
            }
            className="h-5 w-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
          />
          <label htmlFor="footer-active" className="text-sm font-medium text-slate-700">
            Footer visible on website
          </label>
        </div>
      </div>
    </div>
  );
}
