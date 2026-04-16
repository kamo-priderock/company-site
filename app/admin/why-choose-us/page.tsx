'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, Edit2, X } from 'lucide-react';

interface Differentiator {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface WhyChooseUsContent {
  sectionBadge: string;
  mainTitle: string;
  highlightedWord: string;
  subtitle: string;
  backgroundImage: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
}

export default function WhyChooseUsPage() {
  const [content, setContent] = useState<WhyChooseUsContent>({
    sectionBadge: 'Why Choose Us',
    mainTitle: 'What Makes',
    highlightedWord: 'ModernSpaces',
    subtitle: 'We don\'t just build properties—we create lasting value through innovation, sustainability, and unwavering commitment to excellence.',
    backgroundImage: 'https://media.arcadis.com/-/media/project/arcadiscom/com/blogs/global/matt-billerbeck/2023/shopping-malls-will-become-what/shopping-malls-will-become--header.jpg?rev=0eccb19847ba4143bf53c287dd53ba30',
    ctaTitle: 'Ready to Experience the Difference?',
    ctaDescription: 'Join the leading developers and investors who trust ModernSpaces.',
    ctaButtonText: 'Get Started',
  });

  const [differentiators, setDifferentiators] = useState<Differentiator[]>([
    {
      icon: 'Award',
      title: 'Award-Winning Excellence',
      description: 'Multiple SAPOA awards recognizing our commitment to quality and innovation in property development.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: 'Shield',
      title: '30+ Years of Trust',
      description: 'Three decades of proven track record delivering premium developments across South Africa.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: 'Leaf',
      title: 'Green Star Certified',
      description: 'Leading the industry in sustainable building practices with multiple Green Star rated properties.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: 'Users',
      title: 'Client-Centric Approach',
      description: '98% client satisfaction rate through transparent communication and exceptional service delivery.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: 'TrendingUp',
      title: 'R5B+ Portfolio Value',
      description: 'Proven investment success with a diverse portfolio of high-performing commercial and residential properties.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: 'Clock',
      title: 'On-Time Delivery',
      description: 'Consistent project completion within agreed timelines through meticulous planning and execution.',
      color: 'from-amber-500 to-amber-600',
    },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Differentiator>({
    icon: 'Award',
    title: '',
    description: '',
    color: 'from-amber-500 to-amber-600',
  });

  const handleSave = () => {
    alert('Why Choose Us content saved successfully!');
  };

  const handleEdit = (index: number) => {
    setFormData(differentiators[index]);
    setEditingIndex(index);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      icon: 'Award',
      title: '',
      description: '',
      color: 'from-amber-500 to-amber-600',
    });
    setIsAdding(true);
    setEditingIndex(null);
  };

  const handleSaveItem = () => {
    if (isAdding) {
      setDifferentiators([...differentiators, formData]);
    } else if (editingIndex !== null) {
      const updated = [...differentiators];
      updated[editingIndex] = formData;
      setDifferentiators(updated);
    }
    resetForm();
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setDifferentiators(differentiators.filter((_, i) => i !== index));
    }
  };

  const resetForm = () => {
    setFormData({
      icon: 'Award',
      title: '',
      description: '',
      color: 'from-amber-500 to-amber-600',
    });
    setEditingIndex(null);
    setIsAdding(false);
  };

  const iconOptions = ['Award', 'Shield', 'Leaf', 'Users', 'TrendingUp', 'Clock', 'Star', 'CheckCircle', 'Heart', 'Zap'];
  const colorOptions = [
    'from-amber-500 to-amber-600',
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-red-500 to-red-600',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Why Choose Us Section</h2>
          <p className="text-slate-600 mt-1">Manage the differentiators and content for this section</p>
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
        <h3 className="text-xl font-bold text-slate-900">Section Header</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Section Badge</label>
            <input
              type="text"
              value={content.sectionBadge}
              onChange={(e) => setContent({ ...content, sectionBadge: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Highlighted Word</label>
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Background Image URL</label>
            <input
              type="text"
              value={content.backgroundImage}
              onChange={(e) => setContent({ ...content, backgroundImage: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Bottom CTA Section</h3>

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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">CTA Description</label>
            <input
              type="text"
              value={content.ctaDescription}
              onChange={(e) => setContent({ ...content, ctaDescription: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Differentiators Section */}
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

        {/* Edit/Add Form */}
        {(editingIndex !== null || isAdding) && (
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">
                {isAdding ? 'Add Differentiator' : 'Edit Differentiator'}
              </h4>
              <button onClick={resetForm} className="p-2 hover:bg-slate-200 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Icon Name (Lucide)</label>
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Gradient Color</label>
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
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
                onClick={handleSaveItem}
                className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Item
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color}`}>
                    <div className="w-6 h-6 text-white font-bold">{item.icon[0]}</div>
                  </div>
                  <span className="text-sm bg-white px-2 py-1 rounded text-slate-600">{index + 1}</span>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">{item.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg font-medium transition-colors text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
