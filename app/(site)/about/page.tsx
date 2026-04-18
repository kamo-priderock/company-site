"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { About as AboutSection } from "@/sections/About";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Team } from "@/sections/Team";
import { Loader2 } from "lucide-react";

interface AboutContent {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  isActive: boolean;
}

const FALLBACK_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/about-content");
        const data = await res.json();
        setContent(data.content ?? null);
      } catch (e) {
        console.error("About page banner fetch error:", e);
      } finally {
        setBannerLoading(false);
      }
    };
    load();
  }, []);

  const bannerImage = content?.image?.trim() || FALLBACK_BANNER_IMAGE;
  const bannerTitle = content?.title?.trim() || "About Us";
  const bannerSubtitle = content?.subtitle?.trim() || "Company Profile";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 bg-white"
    >
      <div className="relative h-[35vh] md:h-[40vh] w-full overflow-hidden">
        {bannerLoading ? (
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-amber-500" aria-label="Loading" />
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
                  className="text-4xl md:text-6xl font-bold text-white mb-4 mt-2 font-serif"
                >
                  {bannerTitle}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-slate-200 max-w-2xl mx-auto mt-3"
                >
                  {bannerSubtitle}
                </motion.p>
              </div>
            </div>
          </>
        )}
      </div>

      <AboutSection />
      <WhyChooseUs />
      {/* <Team /> */}
    </motion.div>
  );
}
