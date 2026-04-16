'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { mockServices } from '@/utilities/mockData';

interface Service {
  title: string;
  description: string;
  icon: string;
  image: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState(
    mockServices.map((s) => ({
      ...s,
      icon: s.icon.name || 'Building2',
    }))
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Service>({
    title: '',
    description: '',
    icon: 'Building2',
    image: '',
  });

  const handleEdit = (index: number) => {
    setFormData(services[index]);
    setEditingIndex(index);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Building2',
      image: '',
    });
    setIsAdding(true);
    setEditingIndex(null);
  };

  const handleSave = () => {
    if (isAdding) {
      setServices([...services, formData]);
    } else if (editingIndex !== null) {
      const updated = [...services];
      updated[editingIndex] = formData;
      setServices(updated);
    }
    resetForm();
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter((_, i) => i !== index));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Building2',
      image: '',
    });
    setEditingIndex(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Services</h2>
          <p className="text-slate-600 mt-1">Manage services offered by the company</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Service
        </button>
      </div>

      {/* Edit/Add Form */}
      {(editingIndex !== null || isAdding) && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              {isAdding ? 'Add New Service' : 'Edit Service'}
            </h3>
            <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Service Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Service Name"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Brief description of the service"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Icon Name (Lucide)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Building2, Home, etc."
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
              Save Service
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-[16/9] relative">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-slate-400" />
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600 mb-4 text-sm line-clamp-3">{service.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors"
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
