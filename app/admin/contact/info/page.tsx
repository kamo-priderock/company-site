"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Plus, Trash2, MapPin } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import toast, { Toaster } from "react-hot-toast";

interface AddressForm {
  title: string;
  linesText: string;
}

interface ContactPageInfo {
  _id?: string;
  image: string;
  addresses: { title: string; lines: string[] }[];
  isActive: boolean;
}

const emptyInfo = (): Omit<ContactPageInfo, "_id"> => ({
  image: "",
  addresses: [],
  isActive: true,
});

function linesToText(lines: string[]) {
  return (lines || []).join("\n");
}

function textToLines(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export default function ContactInfoPage() {
  const [info, setInfo] = useState<ContactPageInfo>({
    ...emptyInfo(),
    addresses: [],
  });
  const [addressForms, setAddressForms] = useState<AddressForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/contact-page-info?includeInactive=true");
        const data = await res.json();
        if (data.info) {
          const doc = data.info as ContactPageInfo;
          setInfo({
            _id: doc._id,
            image: doc.image || "",
            addresses: doc.addresses || [],
            isActive: doc.isActive !== false,
          });
          setAddressForms(
            (doc.addresses || []).map((a) => ({
              title: a.title,
              linesText: linesToText(a.lines || []),
            }))
          );
        } else {
          setInfo({ ...emptyInfo(), addresses: [] });
          setAddressForms([]);
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to load contact info");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addAddress = () => {
    setAddressForms((prev) => [...prev, { title: "", linesText: "" }]);
  };

  const removeAddress = (index: number) => {
    setAddressForms((prev) => prev.filter((_, i) => i !== index));
  };

  const updateAddress = (
    index: number,
    field: keyof AddressForm,
    value: string
  ) => {
    setAddressForms((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSave = async () => {
    const addresses = addressForms
      .filter((f) => f.title.trim())
      .map((f) => ({
        title: f.title.trim(),
        lines: textToLines(f.linesText),
      }));

    if (addresses.length === 0) {
      toast.error("Add at least one address with a title");
      return;
    }

    const payload = {
      image: info.image.trim(),
      addresses,
      isActive: info.isActive,
    };

    setSaving(true);
    const tid = toast.loading("Saving…");
    try {
      const url = info._id
        ? `/api/contact-page-info/${info._id}`
        : "/api/contact-page-info";
      const method = info._id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          typeof err.error === "string" ? err.error : "Save failed"
        );
      }
      const data = await res.json();
      if (data.info) {
        const doc = data.info as ContactPageInfo;
        setInfo({
          _id: doc._id,
          image: doc.image || "",
          addresses: doc.addresses || [],
          isActive: doc.isActive !== false,
        });
        setAddressForms(
          (doc.addresses || []).map((a) => ({
            title: a.title,
            linesText: linesToText(a.lines || []),
          }))
        );
      }
      toast.success("Contact info saved", { id: tid });
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Could not save", {
        id: tid,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Contact locations</h2>
          <p className="text-slate-600 mt-1">
            Banner image and office addresses for the Contact page (no phone numbers
            stored here)
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save changes
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Banner image</h3>
        {info.image && (
          <div className="relative aspect-[21/9] max-w-3xl rounded-lg overflow-hidden border border-slate-200">
            <img
              src={info.image}
              alt="Contact banner"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-3 max-w-xl">
          <UploadButton<OurFileRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]) {
                setInfo((prev) => ({ ...prev, image: res[0].url }));
                toast.success("Image uploaded");
              }
            }}
            onUploadError={(err: Error) => {
              toast.error(err.message);
            }}
            appearance={{
              button:
                "bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium ut-ready:bg-amber-600",
              container: "w-full",
            }}
            content={{
              button: "Upload image",
              allowedContent: "Up to 16MB",
            }}
          />
          <input
            type="text"
            value={info.image}
            onChange={(e) => setInfo((prev) => ({ ...prev, image: e.target.value }))}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Or paste image URL"
          />
        </div>

        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
          <input
            type="checkbox"
            id="cpi-active"
            checked={info.isActive}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, isActive: e.target.checked }))
            }
            className="w-5 h-5 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
          />
          <label htmlFor="cpi-active" className="text-sm font-medium text-slate-700">
            Active (shown on the site when this is the latest record)
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Addresses</h3>
        <button
          type="button"
          onClick={addAddress}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add location
        </button>
      </div>

      {addressForms.length === 0 ? (
        <div className="bg-white rounded-lg p-10 border border-dashed border-slate-300 text-center text-slate-600">
          <MapPin className="w-10 h-10 mx-auto mb-3 text-slate-400" />
          No addresses yet. Click &quot;Add location&quot; to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {addressForms.map((row, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-semibold text-slate-900">
                  Location {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeAddress(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  aria-label="Remove location"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title (e.g. city or office name)
                </label>
                <input
                  type="text"
                  value={row.title}
                  onChange={(e) => updateAddress(index, "title", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Stellenbosch"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address lines (one per line)
                </label>
                <textarea
                  value={row.linesText}
                  onChange={(e) =>
                    updateAddress(index, "linesText", e.target.value)
                  }
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                  placeholder={"1st Floor\n16 Mill Street\nStellenbosch Central\n7600"}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
