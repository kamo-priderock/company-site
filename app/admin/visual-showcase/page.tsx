'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface ShowcaseItem {
  title: string;
  image: string;
  stats: string;
}

interface FullWidthSection {
  title: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

interface StatsBanner {
  backgroundImage: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

interface TwoColumnSection {
  leftImage: string;
  rightImage: string;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function VisualShowcasePage() {
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([
    {
      title: 'Commercial Excellence',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      stats: '500+ Projects',
    },
    {
      title: 'Residential Living',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      stats: '30 Years Experience',
    },
    {
      title: 'Industrial Solutions',
      image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop',
      stats: 'R5B+ Portfolio',
    },
  ]);

  const [fullWidthSection, setFullWidthSection] = useState<FullWidthSection>({
    title: "Building Tomorrow's Landmarks",
    buttonText: 'Explore Our Work',
    buttonLink: '/projects',
    backgroundImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
  });

  const [statsBanner, setStatsBanner] = useState<StatsBanner>({
    backgroundImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { value: '30+', label: 'Years' },
      { value: '500+', label: 'Projects' },
      { value: '15', label: 'Cities' },
      { value: 'R5B+', label: 'Portfolio' },
    ],
  });

  const [twoColumnSection, setTwoColumnSection] = useState<TwoColumnSection>({
    leftImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop',
    badge: 'Why Choose Us',
    title: 'Award-Winning Excellence',
    description: 'Three decades of delivering iconic developments across South Africa.',
    buttonText: 'Learn More',
    buttonLink: '/about',
  });

  const handleSave = () => {
    alert('Visual Showcase settings saved successfully!');
  };

  const updateShowcaseItem = (index: number, field: keyof ShowcaseItem, value: string) => {
    const updated = [...showcaseItems];
    updated[index] = { ...updated[index], [field]: value };
    setShowcaseItems(updated);
  };

  const updateStat = (index: number, field: 'value' | 'label', value: string) => {
    const updated = { ...statsBanner };
    updated.stats[index] = { ...updated.stats[index], [field]: value };
    setStatsBanner(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Visual Showcase</h2>
          <p className="text-slate-600 mt-1">Manage the visual showcase section images and content</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          <Save className="w-5 h-5" />
          Save All Changes
        </button>
      </div>

      {/* Top Showcase Items (3 columns) */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Showcase Grid (3 Columns)</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {showcaseItems.map((item, index) => (
            <div key={index} className="space-y-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-slate-900">Column {index + 1}</h4>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateShowcaseItem(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Stats Text</label>
                <input
                  type="text"
                  value={item.stats}
                  onChange={(e) => updateShowcaseItem(index, 'stats', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={item.image}
                  onChange={(e) => updateShowcaseItem(index, 'image', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {item.image && (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full Width Hero Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Full Width Hero Section</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input
              type="text"
              value={fullWidthSection.title}
              onChange={(e) => setFullWidthSection({ ...fullWidthSection, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Button Text</label>
            <input
              type="text"
              value={fullWidthSection.buttonText}
              onChange={(e) => setFullWidthSection({ ...fullWidthSection, buttonText: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Button Link</label>
            <input
              type="text"
              value={fullWidthSection.buttonLink}
              onChange={(e) => setFullWidthSection({ ...fullWidthSection, buttonLink: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Background Image URL</label>
            <input
              type="text"
              value={fullWidthSection.backgroundImage}
              onChange={(e) => setFullWidthSection({ ...fullWidthSection, backgroundImage: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {fullWidthSection.backgroundImage && (
          <div className="aspect-[21/9] rounded-lg overflow-hidden">
            <img src={fullWidthSection.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Stats Banner */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Stats Banner</h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Background Image URL</label>
          <input
            type="text"
            value={statsBanner.backgroundImage}
            onChange={(e) => setStatsBanner({ ...statsBanner, backgroundImage: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statsBanner.stats.map((stat, index) => (
            <div key={index} className="space-y-3 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-slate-900">Stat {index + 1}</h4>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(index, 'value', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Two Column Section</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Left Image URL</label>
            <input
              type="text"
              value={twoColumnSection.leftImage}
              onChange={(e) => setTwoColumnSection({ ...twoColumnSection, leftImage: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {twoColumnSection.leftImage && (
              <div className="aspect-video rounded-lg overflow-hidden mt-2">
                <img src={twoColumnSection.leftImage} alt="Left" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Right Image URL</label>
            <input
              type="text"
              value={twoColumnSection.rightImage}
              onChange={(e) => setTwoColumnSection({ ...twoColumnSection, rightImage: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {twoColumnSection.rightImage && (
              <div className="aspect-video rounded-lg overflow-hidden mt-2">
                <img src={twoColumnSection.rightImage} alt="Right" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Badge Text</label>
            <input
              type="text"
              value={twoColumnSection.badge}
              onChange={(e) => setTwoColumnSection({ ...twoColumnSection, badge: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input
              type="text"
              value={twoColumnSection.title}
              onChange={(e) => setTwoColumnSection({ ...twoColumnSection, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={twoColumnSection.description}
              onChange={(e) => setTwoColumnSection({ ...twoColumnSection, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Button Text</label>
            <input
              type="text"
              value={twoColumnSection.buttonText}
              onChange={(e) => setTwoColumnSection({ ...twoColumnSection, buttonText: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Button Link</label>
            <input
              type="text"
              value={twoColumnSection.buttonLink}
              onChange={(e) => setTwoColumnSection({ ...twoColumnSection, buttonLink: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
