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
  Home,
  ChevronDown,
  Layers,
} from "lucide-react";
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  icon: any;
  label: string;
  href?: string;
  children?: {
    icon: any;
    label: string;
    href: string;
  }[];
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { 
    icon: Home, 
    label: 'Home Page',
    children: [
      { icon: Image, label: "Hero Carousel", href: "/admin/home/hero" },
      { icon: Home, label: "Categories", href: "/admin/home/categories" },
      {
        icon: Layers,
        label: "Category landing pages",
        href: "/admin/home/category-pages",
      },
      { icon: FileText, label: 'About Section', href: '/admin/home/about' },
      { icon: Briefcase, label: 'Projects Section', href: '/admin/home/projects' },
      { icon: Image, label: 'Visual Showcase', href: '/admin/home/visual-showcase' },
      { icon: Settings, label: 'Why Choose Us', href: '/admin/home/why-choose-us' },
      { icon: FileText, label: 'CTA Section', href: '/admin/home/cta-section' },
    ]
  },
  { 
    icon: FileText, 
    label: 'About Page',
    children: [
      { icon: FileText, label: 'Page Content', href: '/admin/about/content' },
      { icon: Users, label: 'Team Section', href: '/admin/about/team' },
      { icon: Image, label: 'Gallery', href: '/admin/about/gallery' },
    ]
  },
  { 
    icon: Settings, 
    label: 'Services Page',
    children: [
      { icon: Settings, label: 'Services List', href: '/admin/services/list' },
      { icon: FileText, label: 'Page Content', href: '/admin/services/content' },
    ]
  },
  { 
    icon: Briefcase, 
    label: 'Projects Page',
    children: [
      { icon: Briefcase, label: 'All Projects', href: '/admin/projects/list' },
      { icon: FileText, label: 'Page Content', href: '/admin/projects/content' },
    ]
  },
  { 
    icon: FileText, 
    label: 'Contact Page',
    children: [
      { icon: FileText, label: 'Page Content', href: '/admin/contact/content' },
      { icon: Settings, label: 'Contact Info', href: '/admin/contact/info' },
    ]
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState('/admin');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Home Page', 'About Page', 'Services Page', 'Projects Page', 'Contact Page']);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen flex flex-col bg-slate-900 text-white transition-all duration-300 z-50',
          isSidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="h-16 shrink-0 flex items-center justify-between px-4 border-b border-slate-800">
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

        {/* Menu Items — scrolls independently so logout stays at bottom */}
        <nav className="flex-1 min-h-0 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            const isExpanded = expandedMenus.includes(item.label);
            const hasChildren = item.children && item.children.length > 0;
            
            return (
              <div key={item.label}>
                {/* Parent Menu Item */}
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setCurrentPath(item.href!)}
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
                ) : (
                  <button
                    onClick={() => hasChildren && toggleMenu(item.label)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors',
                      'text-slate-300 hover:bg-slate-800 hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {isSidebarOpen && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </div>
                    {isSidebarOpen && hasChildren && (
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    )}
                  </button>
                )}

                {/* Child Menu Items */}
                {hasChildren && isExpanded && isSidebarOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-700 pl-2">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = currentPath === child.href;
                      
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setCurrentPath(child.href)}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm',
                            isChildActive
                              ? 'bg-amber-600 text-white'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          )}
                        >
                          <ChildIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="font-medium">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout — pinned to bottom of sidebar */}
        <div className="shrink-0 border-t border-slate-800 p-4">
          <button
            type="button"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          isSidebarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
