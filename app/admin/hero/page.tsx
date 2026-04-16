'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { mockCarouselItems } from '@/utilities/mockData';

interface CarouselItem {
  id: number;
  title: string;
  status: string;
  location: string;
  description: string;
  image: string;
}

export default function HeroCarouselPage() {
  const [items, setItems] = useState<CarouselItem[]>(mockCarouselItems);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<CarouselItem>({
    id: 0,
    title: '',
    status: 'DEVELOPMENT',
    location: '',
    description: '',
    image: '',
  });

  const handleEdit = (item: CarouselItem) => {
    setFormData(item);
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      id: items.length + 1,
      title: '',
      status: 'DEVELOPMENT',
      location: '',
      description: '',
      image: '',
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleSave = () => {
    if (isAdding) {
      setItems([...items, formData]);
    } else if (editingId) {
      setItems(items.map((item) => (item.id === editingId ? formData : item)));
    }
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      title: '',
      status: 'DEVELOPMENT',
      location: '',
      description: '',
      image: '',
    });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Hero Carousel</h2>
          <p className="text-slate-600 mt-1">Manage the hero banner carousel slides</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Slide
        </button>
      </div>

      {/* Edit/Add Form */}
      {(editingId || isAdding) && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              {isAdding ? 'Add New Slide' : 'Edit Slide'}
            </h3>
            <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Project Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="TRADING">TRADING</option>
                <option value="DEVELOPMENT">DEVELOPMENT</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="COMING SOON">COMING SOON</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="City/Area"
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Brief description of the project"
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

      {/* Slides List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-[16/9] relative">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-slate-400" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  {item.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 mb-3">{item.location}</p>
              <p className="text-slate-700 mb-4 line-clamp-2">{item.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors flex-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
