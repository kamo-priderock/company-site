"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AboutSectionLayout } from "@/components/AboutSectionLayout";

interface AboutPageContent {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  isActive: boolean;
}

export function AboutPageSection() {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/about-page-content");
        const data = await response.json();
        if (data.content) {
          setContent(data.content);
        }
      } catch (error) {
        console.error("Error fetching about page content:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center bg-slate-50 py-24">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </section>
    );
  }

  if (!content) {
    return (
      <section className="flex items-center justify-center bg-slate-50 py-24">
        <div className="text-center">
          <h3 className="mb-2 text-2xl font-bold text-slate-900">
            No content available
          </h3>
          <p className="text-slate-600">
            Add about page content under About Page → Page Content
          </p>
        </div>
      </section>
    );
  }

  return (
    <AboutSectionLayout
      content={{
        title: content.title,
        subtitle: content.subtitle,
        description: content.description,
        image: content.image,
        features: content.features,
      }}
      showStats
    />
  );
}
