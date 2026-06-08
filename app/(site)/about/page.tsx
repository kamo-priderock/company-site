"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AboutPageSection } from "@/sections/AboutPageSection";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Loader2 } from "lucide-react";

interface AboutPageContent {
  bannerImage: string;
  bannerTitle: string;
  bannerSubtitle: string;
  image: string;
}

const FALLBACK_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

export default function AboutPage() {
  const [banner, setBanner] = useState<AboutPageContent | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/about-page-content");
        const data = await res.json();
        setBanner(data.content ?? null);
      } catch (e) {
        console.error("About page banner fetch error:", e);
      } finally {
        setBannerLoading(false);
      }
    };
    load();
  }, []);

  const bannerImage =
    banner?.bannerImage?.trim() ||
    banner?.image?.trim() ||
    FALLBACK_BANNER_IMAGE;
  const bannerTitle = banner?.bannerTitle?.trim() || "About Us";
  const bannerSubtitle = banner?.bannerSubtitle?.trim() || "Company Profile";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white pt-24"
    >
      <div className="relative h-[35vh] w-full overflow-hidden md:h-[40vh]">
        {bannerLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <Loader2
              className="h-10 w-10 animate-spin text-amber-500"
              aria-label="Loading"
            />
          </div>
        ) : (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bannerImage})` }}
            />
            <div className="absolute inset-0 bg-slate-900/60" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="container mx-auto px-6 md:px-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 mt-2 font-serif text-4xl font-bold text-white md:text-6xl"
                >
                  {bannerTitle}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mx-auto mt-3 max-w-2xl text-lg text-slate-200"
                >
                  {bannerSubtitle}
                </motion.p>
              </div>
            </div>
          </>
        )}
      </div>

      <AboutPageSection />
      <WhyChooseUs />
    </motion.div>
  );
}
