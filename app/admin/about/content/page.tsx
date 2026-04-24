'use client';

import { Save, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function AboutContentPage() {
  const [content, setContent] = useState({
    title: 'About Pride Rock Property Group',
    subtitle: 'Building Excellence Since 1994',
    description: 'We are a premier property development company...',
    image: '',
  });

  const handleSave = () => {
    alert('About page content saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">About Page Content</h2>
          <p className="text-slate-600 mt-1">Manage the main content for the About page</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Page Content</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Page Title</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
            <input
              type="text"
              value={content.subtitle}
              onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Hero Image URL</label>
            <input
              type="text"
              value={content.image}
              onChange={(e) => setContent({ ...content, image: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {content.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image src={content.image} alt="Preview" fill sizes="100vw" unoptimized className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
