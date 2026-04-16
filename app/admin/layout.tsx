'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  Briefcase, 
  Settings,
  Users,
  LogOut,
  ChevronRight,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Image, label: 'Hero Carousel', href: '/admin/hero' },
  { icon: Home, label: 'Categories', href: '/admin/categories' },
  { icon: FileText, label: 'About Section', href: '/admin/about' },
  { icon: Briefcase, label: 'Projects', href: '/admin/projects' },
  { icon: Image, label: 'Visual Showcase', href: '/admin/visual-showcase' },
  { icon: Settings, label: 'Why Choose Us', href: '/admin/why-choose-us' },
  { icon: Settings, label: 'Services', href: '/admin/services' },
  { icon: Users, label: 'Team Members', href: '/admin/team' },
  { icon: FileText, label: 'CTA Section', href: '/admin/cta-section' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState('/admin');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-50',
          isSidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          {isSidebarOpen && (
            <span className="font-bold text-xl">Admin Panel</span>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ChevronRight
              className={cn(
                'w-5 h-5 transition-transform',
                isSidebarOpen && 'rotate-180'
              )}
            />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setCurrentPath(item.href)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'transition-all duration-300',
          isSidebarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-slate-900">Content Management</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              View Site
            </Link>
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
