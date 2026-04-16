'use client';

import { useState } from 'react';
import { Save, Image as ImageIcon } from 'lucide-react';

interface CTASection {
  title: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

export default function CTASectionPage() {
  const [ctaSection, setCTASection] = useState<CTASection>({
    title: "Let's Build Together",
    buttonText: 'Get In Touch',
    buttonLink: '/contact',
    backgroundImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1927&auto=format&fit=crop',
  });

  const handleSave = () => {
    alert('CTA Section saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Call-to-Action Section</h2>
          <p className="text-slate-600 mt-1">Manage the final CTA section at the bottom of the homepage</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">CTA Content</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={ctaSection.title}
              onChange={(e) => setCTASection({ ...ctaSection, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Let's Build Together"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Button Text
            </label>
            <input
              type="text"
              value={ctaSection.buttonText}
              onChange={(e) => setCTASection({ ...ctaSection, buttonText: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Get In Touch"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Button Link
            </label>
            <input
              type="text"
              value={ctaSection.buttonLink}
              onChange={(e) => setCTASection({ ...ctaSection, buttonLink: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="/contact"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Background Image URL
            </label>
            <input
              type="text"
              value={ctaSection.backgroundImage}
              onChange={(e) => setCTASection({ ...ctaSection, backgroundImage: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Preview
          </label>
          <div className="relative h-[50vh] rounded-lg overflow-hidden">
            {ctaSection.backgroundImage ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${ctaSection.backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-slate-900/80" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="px-6">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-serif">
                      {ctaSection.title}
                    </h2>
                    <button className="inline-flex items-center gap-2 bg-amber-500 text-white px-10 py-5 rounded-full font-bold text-lg">
                      {ctaSection.buttonText}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-slate-400" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Tips</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Use high-quality images that represent your brand</li>
          <li>• Keep the title short and action-oriented</li>
          <li>• Button text should clearly indicate what happens next</li>
          <li>• Test the button link to ensure it works correctly</li>
        </ul>
      </div>
    </div>
  );
}
