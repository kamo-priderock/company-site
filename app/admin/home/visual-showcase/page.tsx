'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2, X, Loader2 } from 'lucide-react';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

interface ShowcaseItem {
  _id?: string;
  title: string;
  image: string;
  stats?: string;
  order: number;
  isActive: boolean;
}

interface FullWidthSection {
  _id?: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  isActive: boolean;
}

interface StatsBanner {
  _id?: string;
  backgroundImage: string;
  isActive: boolean;
}

interface TwoColumnSection {
  _id?: string;
  leftImage: string;
  rightImage: string;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}

export default function VisualShowcasePage() {
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([]);
  const [fullWidthSection, setFullWidthSection] = useState<FullWidthSection | null>(null);
  const [statsBanner, setStatsBanner] = useState<StatsBanner | null>(null);
  const [twoColumnSection, setTwoColumnSection] = useState<TwoColumnSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [showcaseRes, fullWidthRes, statsBannerRes, twoColumnRes] = await Promise.all([
        fetch('/api/showcase-items'),
        fetch('/api/full-width-section'),
        fetch('/api/stats-banner'),
        fetch('/api/two-column-section')
      ]);

      const showcaseData = await showcaseRes.json();
      const fullWidthData = await fullWidthRes.json();
      const statsBannerData = await statsBannerRes.json();
      const twoColumnData = await twoColumnRes.json();

      setShowcaseItems(showcaseData.items || []);
      
      // Initialize with default values if null
      setFullWidthSection(fullWidthData.section || {
        title: '',
        buttonText: '',
        buttonLink: '',
        backgroundImage: '',
        isActive: true,
      });
      
      setStatsBanner(statsBannerData.banner || {
        backgroundImage: '',
        isActive: true,
      });
      
      setTwoColumnSection(twoColumnData.section || {
        leftImage: '',
        rightImage: '',
        badge: '',
        title: '',
        description: '',
        buttonText: '',
        buttonLink: '',
        isActive: true,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      // Initialize with defaults on error
      setFullWidthSection({
        title: '',
        buttonText: '',
        buttonLink: '',
        backgroundImage: '',
        isActive: true,
      });
      setStatsBanner({
        backgroundImage: '',
        isActive: true,
      });
      setTwoColumnSection({
        leftImage: '',
        rightImage: '',
        badge: '',
        title: '',
        description: '',
        buttonText: '',
        buttonLink: '',
        isActive: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveShowcaseItem = async (item: ShowcaseItem, index: number) => {
    setSaving(true);
    try {
      const url = item._id 
        ? `/api/showcase-items/${item._id}`
        : '/api/showcase-items';
      
      const method = item._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        return true;
      } else {
        throw new Error('Failed to save showcase item');
      }
    } catch (error) {
      console.error('Error saving:', error);
      throw error;
    }
  };

  const handleSaveAllShowcaseItems = async () => {
    setSaving(true);
    const toastId = toast.loading('Saving showcase items...');
    
    try {
      // Save all three items
      const savePromises = showcaseItems.slice(0, 3).map((item, index) => 
        handleSaveShowcaseItem(item, index)
      );
      
      await Promise.all(savePromises);
      await fetchData();
      
      toast.success('All showcase items saved successfully!', { id: toastId });
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save showcase items. Please try again.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFullWidth = async () => {
    if (!fullWidthSection) return;
    setSaving(true);
    const toastId = toast.loading('Saving full width section...');
    
    try {
      const url = fullWidthSection._id 
        ? `/api/full-width-section/${fullWidthSection._id}`
        : '/api/full-width-section';
      
      const method = fullWidthSection._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullWidthSection),
      });

      if (response.ok) {
        await fetchData();
        toast.success('Full width section saved successfully!', { id: toastId });
      } else {
        toast.error('Failed to save full width section', { id: toastId });
      }
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('An error occurred while saving', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStatsBanner = async () => {
    if (!statsBanner) return;
    setSaving(true);
    const toastId = toast.loading('Saving stats banner...');
    
    try {
      const url = statsBanner._id 
        ? `/api/stats-banner/${statsBanner._id}`
        : '/api/stats-banner';
      
      const method = statsBanner._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statsBanner),
      });

      if (response.ok) {
        await fetchData();
        toast.success('Stats banner saved successfully!', { id: toastId });
      } else {
        toast.error('Failed to save stats banner', { id: toastId });
      }
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('An error occurred while saving', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTwoColumn = async () => {
    if (!twoColumnSection) return;
    setSaving(true);
    const toastId = toast.loading('Saving two column section...');
    
    try {
      const url = twoColumnSection._id 
        ? `/api/two-column-section/${twoColumnSection._id}`
        : '/api/two-column-section';
      
      const method = twoColumnSection._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(twoColumnSection),
      });

      if (response.ok) {
        await fetchData();
        toast.success('Two column section saved successfully!', { id: toastId });
      } else {
        toast.error('Failed to save two column section', { id: toastId });
      }
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('An error occurred while saving', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const updateShowcaseItem = (index: number, field: keyof ShowcaseItem, value: string | number | boolean) => {
    const updated = [...showcaseItems];
    updated[index] = { ...updated[index], [field]: value };
    setShowcaseItems(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#f59e0b',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Visual Showcase</h2>
        <p className="text-slate-600 mt-1">Manage the visual showcase section images and content</p>
      </div>

      {/* Top Showcase Items (3 columns) */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Showcase Grid (3 Columns)</h3>
          <button
            onClick={handleSaveAllShowcaseItems}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save All 3 Columns
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((index) => {
            const item = showcaseItems[index] || {
              title: '',
              image: '',
              stats: '',
              order: index,
              isActive: true,
            };

            return (
              <div key={index} className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-900">Column {index + 1}</h4>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateShowcaseItem(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., Commercial Excellence"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Stats text <span className="font-normal text-slate-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={item.stats ?? ''}
                    onChange={(e) => updateShowcaseItem(index, 'stats', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., 500+ Projects — leave blank to hide"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Image</label>
                  
                  {item.image && (
                    <div className="mb-3 relative aspect-video rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.title} fill sizes="100vw" unoptimized className="w-full h-full object-cover" />
                    </div>
                  )}

                  <UploadButton<OurFileRouter, "imageUploader">
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        updateShowcaseItem(index, 'image', res[0].url);
                        toast.success('Image uploaded successfully!');
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                    appearance={{
                      button: 'bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded text-sm font-medium w-full',
                      container: 'w-full',
                    }}
                    content={{
                      button: 'Upload Image',
                    }}
                  />

                  <div className="text-center text-xs text-slate-500 my-2">OR</div>

                  <input
                    type="text"
                    value={item.image}
                    onChange={(e) => updateShowcaseItem(index, 'image', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    placeholder="Paste URL"
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-white rounded border border-slate-200">
                  <input
                    type="checkbox"
                    id={`showcase-active-${index}`}
                    checked={item.isActive}
                    onChange={(e) => updateShowcaseItem(index, 'isActive', e.target.checked)}
                    className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor={`showcase-active-${index}`} className="text-sm text-slate-700">
                    Active
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Width Hero Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Full Width Hero Section</h3>
          <button
            onClick={handleSaveFullWidth}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Section
          </button>
        </div>

        {fullWidthSection && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={fullWidthSection.title}
                  onChange={(e) => setFullWidthSection({ ...fullWidthSection, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., Building Tomorrow's Landmarks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={fullWidthSection.buttonText}
                  onChange={(e) => setFullWidthSection({ ...fullWidthSection, buttonText: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., Explore Our Work"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Button Link</label>
                <input
                  type="text"
                  value={fullWidthSection.buttonLink}
                  onChange={(e) => setFullWidthSection({ ...fullWidthSection, buttonLink: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="/projects"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  id="fullwidth-active"
                  checked={fullWidthSection.isActive}
                  onChange={(e) => setFullWidthSection({ ...fullWidthSection, isActive: e.target.checked })}
                  className="w-5 h-5 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="fullwidth-active" className="text-sm font-medium text-slate-700">
                  Active
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Background Image</label>
                
                {fullWidthSection.backgroundImage && (
                  <div className="mb-3 relative aspect-[21/9] rounded-lg overflow-hidden">
                    <Image src={fullWidthSection.backgroundImage} alt="Preview" fill sizes="100vw" unoptimized className="w-full h-full object-cover" />
                  </div>
                )}

                <UploadButton<OurFileRouter, "imageUploader">
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setFullWidthSection({ ...fullWidthSection, backgroundImage: res[0].url });
                      toast.success('Image uploaded successfully!');
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Upload failed: ${error.message}`);
                  }}
                  appearance={{
                    button: 'bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium',
                    container: 'w-full',
                  }}
                  content={{
                    button: 'Upload Background Image',
                  }}
                />

                <div className="text-center text-sm text-slate-500 my-2">OR</div>

                <input
                  type="text"
                  value={fullWidthSection.backgroundImage}
                  onChange={(e) => setFullWidthSection({ ...fullWidthSection, backgroundImage: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Paste image URL"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Stats Banner - Only Background Image */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Stats Banner Background</h3>
            <p className="text-sm text-slate-500 mt-1">Statistics are managed in the About Section</p>
          </div>
          <button
            onClick={handleSaveStatsBanner}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Banner
          </button>
        </div>

        {statsBanner && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Background Image</label>
              
              {statsBanner.backgroundImage && (
                <div className="mb-3 relative aspect-[21/9] rounded-lg overflow-hidden">
                  <Image src={statsBanner.backgroundImage} alt="Stats banner background" fill sizes="100vw" unoptimized className="w-full h-full object-cover" />
                </div>
              )}

              <UploadButton<OurFileRouter, "imageUploader">
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setStatsBanner({ ...statsBanner, backgroundImage: res[0].url });
                    toast.success('Image uploaded successfully!');
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
                appearance={{
                  button: 'bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium',
                  container: 'w-full',
                }}
                content={{
                  button: 'Upload Background Image',
                }}
              />

              <div className="text-center text-sm text-slate-500 my-2">OR</div>

              <input
                type="text"
                value={statsBanner.backgroundImage}
                onChange={(e) => setStatsBanner({ ...statsBanner, backgroundImage: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Paste image URL"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <input
                type="checkbox"
                id="banner-active"
                checked={statsBanner.isActive}
                onChange={(e) => setStatsBanner({ ...statsBanner, isActive: e.target.checked })}
                className="w-5 h-5 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="banner-active" className="text-sm font-medium text-slate-700">
                Active
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Two Column Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Two Column Section</h3>
          <button
            onClick={handleSaveTwoColumn}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Section
          </button>
        </div>

        {twoColumnSection && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Left Image</label>
              {twoColumnSection.leftImage && (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                  <Image src={twoColumnSection.leftImage} alt="Left" fill sizes="100vw" unoptimized className="w-full h-full object-cover" />
                </div>
              )}
              <UploadButton<OurFileRouter, "imageUploader">
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setTwoColumnSection({ ...twoColumnSection, leftImage: res[0].url });
                    toast.success('Left image uploaded successfully!');
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
                appearance={{
                  button: 'bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded text-sm font-medium w-full',
                  container: 'w-full',
                }}
                content={{
                  button: 'Upload Left Image',
                }}
              />
              <div className="text-center text-xs text-slate-500 my-2">OR</div>
              <input
                type="text"
                value={twoColumnSection.leftImage}
                onChange={(e) => setTwoColumnSection({ ...twoColumnSection, leftImage: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                placeholder="Paste URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Right Image</label>
              {twoColumnSection.rightImage && (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                  <Image src={twoColumnSection.rightImage} alt="Right" fill sizes="100vw" unoptimized className="w-full h-full object-cover" />
                </div>
              )}
              <UploadButton<OurFileRouter, "imageUploader">
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setTwoColumnSection({ ...twoColumnSection, rightImage: res[0].url });
                    toast.success('Right image uploaded successfully!');
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
                appearance={{
                  button: 'bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded text-sm font-medium w-full',
                  container: 'w-full',
                }}
                content={{
                  button: 'Upload Right Image',
                }}
              />
              <div className="text-center text-xs text-slate-500 my-2">OR</div>
              <input
                type="text"
                value={twoColumnSection.rightImage}
                onChange={(e) => setTwoColumnSection({ ...twoColumnSection, rightImage: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                placeholder="Paste URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Badge Text</label>
              <input
                type="text"
                value={twoColumnSection.badge}
                onChange={(e) => setTwoColumnSection({ ...twoColumnSection, badge: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., Why Choose Us"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                type="text"
                value={twoColumnSection.title}
                onChange={(e) => setTwoColumnSection({ ...twoColumnSection, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., Award-Winning Excellence"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                value={twoColumnSection.description}
                onChange={(e) => setTwoColumnSection({ ...twoColumnSection, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Describe this section..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Button Text</label>
              <input
                type="text"
                value={twoColumnSection.buttonText}
                onChange={(e) => setTwoColumnSection({ ...twoColumnSection, buttonText: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., Learn More"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Button Link</label>
              <input
                type="text"
                value={twoColumnSection.buttonLink}
                onChange={(e) => setTwoColumnSection({ ...twoColumnSection, buttonLink: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="/about"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <input
                type="checkbox"
                id="twocolumn-active"
                checked={twoColumnSection.isActive}
                onChange={(e) => setTwoColumnSection({ ...twoColumnSection, isActive: e.target.checked })}
                className="w-5 h-5 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="twocolumn-active" className="text-sm font-medium text-slate-700">
                Active
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
