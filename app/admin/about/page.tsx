'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { mockFeatures, mockStats } from '@/utilities/mockData';

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
}

interface Stat {
  value: number;
  label: string;
  suffix: string;
}

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent>({
    title: 'Shaping the Skyline Since 1994',
    subtitle: 'We are a premier property development and construction company dedicated to creating spaces that inspire, function, and endure.',
    description: 'With over three decades of industry expertise, we specialize in delivering high-end commercial, retail, residential, and industrial developments. Our commitment to innovation, sustainability, and uncompromising quality has made us a trusted partner for investors and communities alike.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    features: mockFeatures,
  });

  const [stats, setStats] = useState<Stat[]>(mockStats);
  const [newFeature, setNewFeature] = useState('');

  const handleSave = () => {
    alert('Content saved successfully!');
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setContent({
        ...content,
        features: [...content.features, newFeature],
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

  const updateStat = (index: number, field: keyof Stat, value: string | number) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">About Section</h2>
          <p className="text-slate-600 mt-1">Manage the about section content and statistics</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          <Save className="w-5 h-5" />
          Save All Changes
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
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={content.image}
              onChange={(e) => setContent({ ...content, image: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Image Preview */}
        {content.image && (
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={content.image}
              alt="About preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Features Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Features List</h3>

        <div className="space-y-3">
          {content.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <span className="flex-1 text-slate-700">{feature}</span>
              <button
                onClick={() => removeFeature(index)}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

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
        <h3 className="text-xl font-bold text-slate-900">Statistics</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-3 p-4 bg-slate-50 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Value
                </label>
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => updateStat(index, 'value', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Suffix
                </label>
                <input
                  type="text"
                  value={stat.suffix}
                  onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="+ or B+ etc."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
