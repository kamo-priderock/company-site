'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2, X, Loader2, CheckCircle2 } from 'lucide-react';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import Image from 'next/image';

interface HomeAboutContent {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  isActive: boolean;
}

interface Statistic {
  _id?: string;
  value: number;
  label: string;
  suffix: string;
  order: number;
  isActive: boolean;
}

export default function AboutPage() {
  const [content, setContent] = useState<HomeAboutContent>({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    features: [],
    isActive: true,
  });
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [editingStatId, setEditingStatId] = useState<string | null>(null);
  const [isAddingStat, setIsAddingStat] = useState(false);
  const [statFormData, setStatFormData] = useState<Statistic>({
    value: 0,
    label: '',
    suffix: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contentRes, statsRes] = await Promise.all([
        fetch('/api/home-about?includeInactive=true'),
        fetch('/api/statistics')
      ]);

      const contentData = await contentRes.json();
      const statsData = await statsRes.json();

      if (contentData.content) {
        setContent({
          ...contentData.content,
          image: contentData.content.image ?? '',
        });
      }
      setStatistics(statsData.statistics || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async () => {
    setSaving(true);
    try {
      const url = content._id 
        ? `/api/home-about/${content._id}`
        : '/api/home-about';
      
      const method = content._id ? 'PUT' : 'POST';

      const payload = { ...content };
      delete payload._id;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchData();
        alert('Content saved successfully!');
      } else {
        alert('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setContent({
        ...content,
        features: [...content.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setContent({
      ...content,
      features: content.features.filter((_, i) => i !== index),
    });
  };

  const handleAddStat = () => {
    setStatFormData({
      value: 0,
      label: '',
      suffix: '',
      order: statistics.length,
      isActive: true,
    });
    setIsAddingStat(true);
    setEditingStatId(null);
  };

  const handleEditStat = (stat: Statistic) => {
    setStatFormData(stat);
    setEditingStatId(stat._id || null);
    setIsAddingStat(false);
  };

  const handleSaveStat = async () => {
    try {
      if (isAddingStat) {
        const response = await fetch('/api/statistics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(statFormData),
        });

        if (response.ok) {
          await fetchData();
          resetStatForm();
        } else {
          alert('Failed to create statistic');
        }
      } else if (editingStatId) {
        const response = await fetch(`/api/statistics/${editingStatId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(statFormData),
        });

        if (response.ok) {
          await fetchData();
          resetStatForm();
        } else {
          alert('Failed to update statistic');
        }
      }
    } catch (error) {
      console.error('Error saving statistic:', error);
      alert('An error occurred while saving');
    }
  };

  const handleDeleteStat = async (id: string) => {
    if (!confirm('Are you sure you want to delete this statistic?')) return;

    try {
      const response = await fetch(`/api/statistics/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      } else {
        alert('Failed to delete statistic');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('An error occurred while deleting');
    }
  };

  const resetStatForm = () => {
    setStatFormData({
      value: 0,
      label: '',
      suffix: '',
      order: 0,
      isActive: true,
    });
    setEditingStatId(null);
    setIsAddingStat(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Homepage About Section</h2>
          <p className="text-slate-600 mt-1">
            Content for the about block on the landing page only. The{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">/about</code> page
            is edited under <strong>About Page → Page Content</strong>.
          </p>
        </div>
        <button
          onClick={handleSaveContent}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Content
            </>
          )}
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Main Content</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., Shaping the Skyline Since 1994"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Subtitle
            </label>
            <textarea
              value={content.subtitle}
              onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Short description"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Detailed description"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Company section image
            </label>
            <p className="mb-3 text-sm text-slate-500">
              Shown beside the about text on the homepage only.
            </p>

            {content.image && (
              <div className="mb-4 relative aspect-[4/3] max-w-xl rounded-lg overflow-hidden">
                <Image
                  src={content.image}
                  alt="About section preview"
                  fill
                  sizes="100vw"
                  unoptimized
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setContent({ ...content, image: '' })}
                  className="mt-2 p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm"
                >
                  <X className="w-4 h-4 inline mr-1" />
                  Remove Image
                </button>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <UploadButton<OurFileRouter, "imageUploader">
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setContent({ ...content, image: res[0].url });
                    alert('Image uploaded successfully!');
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error('Upload error:', error);
                  alert(`Upload failed: ${error.message}`);
                }}
                appearance={{
                  button: 'bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors',
                  container: 'w-full',
                  allowedContent: 'text-slate-600 text-sm',
                }}
                content={{
                  button: 'Upload section image',
                  allowedContent: 'Images up to 16MB',
                }}
              />

              <div className="text-center text-sm text-slate-500">OR</div>

              <input
                type="text"
                value={content.image}
                onChange={(e) => setContent({ ...content, image: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Or paste image URL here"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <input
              type="checkbox"
              id="contentActive"
              checked={content.isActive}
              onChange={(e) => setContent({ ...content, isActive: e.target.checked })}
              className="w-5 h-5 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
            />
            <label htmlFor="contentActive" className="text-sm font-medium text-slate-700">
              Active (visible on website)
            </label>
          </div>
        </div>
      </div>

      {/* Features Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Features List</h3>
          <p className="mt-1 text-sm text-slate-600">
            Bullet points shown on the About section — same size and alignment as on the site.
          </p>
        </div>

        {content.features.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No features yet. Add items below.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2">
            {content.features.map((feature, index) => (
              <li
                key={index}
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
                  className="shrink-0 rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
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
            onKeyPress={(e) => e.key === 'Enter' && addFeature()}
            placeholder="Add new feature..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={addFeature}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Statistics Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Statistics</h3>
          <button
            onClick={handleAddStat}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Statistic
          </button>
        </div>

        {/* Stat Form */}
        {(editingStatId || isAddingStat) && (
          <div className="p-4 bg-slate-50 rounded-lg space-y-4 border-2 border-amber-200">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-900">
                {isAddingStat ? 'Add New Statistic' : 'Edit Statistic'}
              </h4>
              <button onClick={resetStatForm} className="p-1 hover:bg-slate-200 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Value
                </label>
                <input
                  type="number"
                  value={statFormData.value}
                  onChange={(e) => setStatFormData({ ...statFormData, value: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={statFormData.label}
                  onChange={(e) => setStatFormData({ ...statFormData, label: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Years Experience"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Suffix
                </label>
                <input
                  type="text"
                  value={statFormData.suffix}
                  onChange={(e) => setStatFormData({ ...statFormData, suffix: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="+"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  value={statFormData.order}
                  onChange={(e) => setStatFormData({ ...statFormData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="statActive"
                  checked={statFormData.isActive}
                  onChange={(e) => setStatFormData({ ...statFormData, isActive: e.target.checked })}
                  className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="statActive" className="text-sm text-slate-700">
                  Active
                </label>
              </div>

              <button
                onClick={handleSaveStat}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors text-sm"
              >
                <Save className="w-4 h-4" />
                Save Statistic
              </button>
            </div>
          </div>
        )}

        {/* Statistics Grid */}
        {statistics.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No statistics yet. Click "Add Statistic" to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statistics.map((stat) => (
              <div key={stat._id} className="p-4 bg-slate-50 rounded-lg space-y-3 relative">
                {!stat.isActive && (
                  <span className="absolute top-2 right-2 text-xs bg-slate-600 text-white px-2 py-1 rounded">
                    Inactive
                  </span>
                )}
                <div className="text-3xl font-bold text-amber-600">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-slate-700">{stat.label}</div>
                <div className="text-xs text-slate-500">Order: {stat.order}</div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEditStat(stat)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-sm transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStat(stat._id!)}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded text-sm transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
