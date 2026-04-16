'use client';

import { useState } from 'react';
import { Edit2, Save, X, Image as ImageIcon } from 'lucide-react';
import { mockCategories } from '@/utilities/mockData';

interface Category {
  title: string;
  image: string;
  link: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Category>({
    title: '',
    image: '',
    link: '',
  });

  const handleEdit = (index: number) => {
    setFormData(categories[index]);
    setEditingIndex(index);
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updated = [...categories];
      updated[editingIndex] = formData;
      setCategories(updated);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({ title: '', image: '', link: '' });
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Categories</h2>
        <p className="text-slate-600 mt-1">Manage the property category tiles displayed on the homepage</p>
      </div>

      {/* Edit Form */}
      {editingIndex !== null && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Edit Category</h3>
            <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Category Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Link
              </label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="/category-page"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
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

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="aspect-[4/5] relative">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-slate-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-blue-950/70 group-hover:bg-blue-950/50 transition-colors" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-xl font-medium">{category.title}</h3>
                <p className="text-white/70 text-sm mt-1">{category.link}</p>
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={() => handleEdit(index)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Category
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
