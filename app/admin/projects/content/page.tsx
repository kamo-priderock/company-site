'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

interface ProjectsPageContent {
  title: string;
  description: string;
  heroImage: string;
}

export default function ProjectsContentPage() {
  const [content, setContent] = useState<ProjectsPageContent>({
    title: 'Our Projects',
    description: 'A showcase of our most iconic developments',
    heroImage: 'https://www.atterbury.co.za/wp-content/uploads/2021/03/Mall-of-Africa-outdoor-area.1.jpg',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/projects-page-content');
      const data = await res.json();
      if (res.ok && data.content) {
        setContent({
          title: data.content.title,
          description: data.content.description,
          heroImage: data.content.heroImage,
        });
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/projects-page-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Content saved successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save content' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving content' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Projects Page Content</h2>
        <p className="text-slate-600 mt-1">Manage the hero section content for the Projects page</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
            Page Title
          </label>
          <input
            type="text"
            id="title"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            placeholder="Our Projects"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={content.description}
            onChange={(e) => setContent({ ...content, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
            placeholder="A showcase of our most iconic developments"
          />
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Hero Background Image
          </label>
          
          {content.heroImage && (
            <div className="mb-4 rounded-lg overflow-hidden border border-slate-200">
              <img
                src={content.heroImage}
                alt="Hero background"
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          <div className="flex gap-4 items-center">
            <input
              type="url"
              value={content.heroImage}
              onChange={(e) => setContent({ ...content, heroImage: e.target.value })}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              placeholder="https://example.com/image.jpg"
            />
            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  setContent({ ...content, heroImage: res[0].url });
                  setMessage({ type: 'success', text: 'Image uploaded successfully!' });
                }
              }}
              onUploadError={(error: Error) => {
                setMessage({ type: 'error', text: `Upload failed: ${error.message}` });
              }}
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Enter an image URL or upload a new image
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-colors"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
