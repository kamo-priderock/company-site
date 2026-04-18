"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Services as ServicesSection } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { Loader2 } from "lucide-react";

interface ServicesPageContent {
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImage: string;
}

const FALLBACK_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";

export default function Services() {
  const [pageContent, setPageContent] = useState<ServicesPageContent | null>(
    null
  );
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/services-page-content");
        const data = await res.json();
        setPageContent(data.content ?? null);
      } catch (e) {
        console.error("Services page banner fetch error:", e);
      } finally {
        setBannerLoading(false);
      }
    };
    load();
  }, []);

  const bannerImage =
    pageContent?.bannerImage?.trim() || FALLBACK_BANNER_IMAGE;
  const bannerTitle = pageContent?.bannerTitle?.trim() || "Our Services";
  const bannerSubtitle =
    pageContent?.bannerSubtitle?.trim() ||
    "Comprehensive property development solutions";

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
            <Loader2
              className="w-10 h-10 animate-spin text-amber-500"
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

      <ServicesSection />
      <Process />
    </motion.div>
  );
}
