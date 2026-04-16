'use client';

import { 
  Image, 
  FileText, 
  Briefcase, 
  Users,
  TrendingUp,
  Eye
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { icon: Image, label: 'Carousel Slides', value: '3', color: 'bg-blue-500' },
    { icon: Briefcase, label: 'Projects', value: '8', color: 'bg-green-500' },
    { icon: Users, label: 'Team Members', value: '4', color: 'bg-purple-500' },
    { icon: Eye, label: 'Page Views', value: '2.4K', color: 'bg-amber-500' },
  ];

  const recentActivity = [
    { action: 'Updated Hero Carousel', time: '2 hours ago', user: 'Admin' },
    { action: 'Added New Project', time: '5 hours ago', user: 'Admin' },
    { action: 'Modified About Section', time: '1 day ago', user: 'Admin' },
    { action: 'Updated Team Member', time: '2 days ago', user: 'Admin' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome Back, Admin!</h2>
        <p className="text-amber-50">Manage your website content from this dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-left">
            <Image className="w-8 h-8 text-amber-600 mb-2" />
            <p className="font-medium text-slate-900">Edit Hero Carousel</p>
            <p className="text-sm text-slate-600">Update banner images</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-left">
            <Briefcase className="w-8 h-8 text-amber-600 mb-2" />
            <p className="font-medium text-slate-900">Add New Project</p>
            <p className="text-sm text-slate-600">Create project entry</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-left">
            <FileText className="w-8 h-8 text-amber-600 mb-2" />
            <p className="font-medium text-slate-900">Update Content</p>
            <p className="text-sm text-slate-600">Edit page sections</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-slate-900">{activity.action}</p>
                <p className="text-sm text-slate-600">{activity.time}</p>
              </div>
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                {activity.user}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
