'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, User } from 'lucide-react';
import { mockTeam } from '@/utilities/mockData';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<TeamMember>({
    name: '',
    role: '',
    image: '',
  });

  const handleEdit = (index: number) => {
    setFormData(team[index]);
    setEditingIndex(index);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      role: '',
      image: '',
    });
    setIsAdding(true);
    setEditingIndex(null);
  };

  const handleSave = () => {
    if (isAdding) {
      setTeam([...team, formData]);
    } else if (editingIndex !== null) {
      const updated = [...team];
      updated[editingIndex] = formData;
      setTeam(updated);
    }
    resetForm();
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeam(team.filter((_, i) => i !== index));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
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
          <h2 className="text-3xl font-bold text-slate-900">Team Members</h2>
          <p className="text-slate-600 mt-1">Manage your team member profiles</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Team Member
        </button>
      </div>

      {/* Edit/Add Form */}
      {(editingIndex !== null || isAdding) && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              {isAdding ? 'Add Team Member' : 'Edit Team Member'}
            </h3>
            <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role/Position
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Chief Executive Officer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Profile Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="https://example.com/profile.jpg"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Member
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

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-square relative">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <User className="w-16 h-16 text-slate-400" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{member.role}</p>
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
