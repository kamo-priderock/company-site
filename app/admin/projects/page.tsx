'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Eye } from 'lucide-react';
import { mockProjects } from '@/utilities/mockData';

interface Project {
  title: string;
  type: string;
  location: string;
  status: string;
  image: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Project>({
    title: '',
    type: 'Commercial',
    location: '',
    status: 'Completed',
    image: '',
  });

  const handleEdit = (index: number) => {
    setFormData(projects[index]);
    setEditingIndex(index);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      type: 'Commercial',
      location: '',
      status: 'Completed',
      image: '',
    });
    setIsAdding(true);
    setEditingIndex(null);
  };

  const handleSave = () => {
    if (isAdding) {
      setProjects([...projects, formData]);
    } else if (editingIndex !== null) {
      const updated = [...projects];
      updated[editingIndex] = formData;
      setProjects(updated);
    }
    resetForm();
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'Commercial',
      location: '',
      status: 'Completed',
      image: '',
    });
    setEditingIndex(null);
    setIsAdding(false);
  };

  const projectTypes = ['Commercial', 'Retail', 'Industrial', 'Residential', 'Mixed-Use'];
  const projectStatuses = ['Completed', 'Under Construction', 'Coming Soon', 'Planning'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Projects</h2>
          <p className="text-slate-600 mt-1">Manage featured projects and developments</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {projectTypes.map((type) => (
          <div key={type} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-600">{type}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {projects.filter((p) => p.type === type).length}
            </p>
          </div>
        ))}
      </div>

      {/* Edit/Add Form */}
      {(editingIndex !== null || isAdding) && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              {isAdding ? 'Add New Project' : 'Edit Project'}
            </h3>
            <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Project Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
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
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {projectStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
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
              Save Project
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] relative">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-slate-400" />
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded ${
                    project.status === 'Completed'
                      ? 'bg-green-500 text-white'
                      : project.status === 'Under Construction'
                      ? 'bg-amber-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{project.title}</h3>
                <p className="text-sm text-slate-600">{project.location}</p>
                <span className="inline-block mt-2 text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                  {project.type}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm"
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
          </div>
        ))}
      </div>
    </div>
  );
}
