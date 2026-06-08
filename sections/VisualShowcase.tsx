"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

interface ShowcaseItem {
  _id: string;
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

interface Statistic {
  _id: string;
  value: number;
  label: string;
  suffix: string;
  order: number;
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

export function VisualShowcase() {
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([]);
  const [fullWidthSection, setFullWidthSection] = useState<FullWidthSection | null>(null);
  const [statsBanner, setStatsBanner] = useState<StatsBanner | null>(null);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [twoColumnSection, setTwoColumnSection] = useState<TwoColumnSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [showcaseRes, fullWidthRes, statsBannerRes, statsRes, twoColumnRes] =
          await Promise.all([
            fetch("/api/showcase-items"),
            fetch("/api/full-width-section"),
            fetch("/api/stats-banner"),
            fetch("/api/statistics"),
            fetch("/api/two-column-section"),
          ]);

        const showcaseData = await showcaseRes.json();
        const fullWidthData = await fullWidthRes.json();
        const statsBannerData = await statsBannerRes.json();
        const statsData = await statsRes.json();
        const twoColumnData = await twoColumnRes.json();

        setShowcaseItems(showcaseData.items || []);
        setFullWidthSection(fullWidthData.section ?? null);
        setStatsBanner(statsBannerData.banner ?? null);
        setStatistics(statsData.statistics || []);
        setTwoColumnSection(twoColumnData.section ?? null);
      } catch (error) {
        console.error("Error fetching visual showcase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="relative py-24 flex items-center justify-center bg-slate-50 min-h-[40vh]">
        <Loader2 className="w-10 h-10 animate-spin text-amber-600" aria-label="Loading" />
      </section>
    );
  }

  const hasShowcase = showcaseItems.length > 0;
  const hasFullWidth =
    fullWidthSection &&
    fullWidthSection.isActive !== false &&
    (Boolean(fullWidthSection.backgroundImage) || Boolean(fullWidthSection.title));
  const hasStatsBanner =
    statsBanner &&
    statsBanner.isActive !== false &&
    Boolean(statsBanner.backgroundImage) &&
    statistics.length > 0;
  const hasTwoColumn =
    twoColumnSection &&
    twoColumnSection.isActive !== false &&
    (Boolean(twoColumnSection.leftImage) ||
      Boolean(twoColumnSection.rightImage) ||
      Boolean(twoColumnSection.title));

  if (!hasShowcase && !hasFullWidth && !hasStatsBanner && !hasTwoColumn) {
    return null;
  }

  return (
    <section className="relative">
      {hasShowcase && (
        <div className="grid grid-cols-1 md:grid-cols-3">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative h-[60vh] md:h-[80vh] overflow-hidden group cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {item.stats ? (
                    <p className="text-amber-500 text-sm font-bold uppercase tracking-wider mb-2">
                      {item.stats}
                    </p>
                  ) : null}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif">
                    {item.title}
                  </h3>
                  <div className="w-16 h-1 bg-amber-500" />
                </motion.div>
              </div>
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {hasFullWidth && fullWidthSection && (
        <div className="relative h-[70vh] overflow-hidden bg-slate-900">
          {fullWidthSection.backgroundImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${fullWidthSection.backgroundImage})`,
              }}
            />
          ) : null}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl px-6"
            >
              {fullWidthSection.title && (
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-serif">
                  {fullWidthSection.title}
                </h2>
              )}
              {fullWidthSection.buttonText && fullWidthSection.buttonLink && (
                <Link
                  href={fullWidthSection.buttonLink}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
                >
                  {fullWidthSection.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {hasStatsBanner && statsBanner && (
        <div className="relative h-[50vh] min-h-[320px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${statsBanner.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-slate-900/85" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {statistics.map((stat, index) => (
                  <motion.div
                    key={stat._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <h3 className="text-5xl md:text-6xl font-bold text-amber-500 mb-2">
                      {stat.value}
                      {stat.suffix ?? ""}
                    </h3>
                    <p className="text-xl text-slate-300 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {hasTwoColumn && twoColumnSection && (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-[60vh] md:h-[70vh]">
            {twoColumnSection.leftImage && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${twoColumnSection.leftImage})` }}
              />
            )}
          </div>
          <div className="relative h-[60vh] md:h-[70vh]">
            {twoColumnSection.rightImage && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${twoColumnSection.rightImage})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
            <div className="absolute inset-0 flex items-center p-12 md:p-16">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {twoColumnSection.badge && (
                  <p className="text-amber-500 text-sm font-bold uppercase tracking-wider mb-4">
                    {twoColumnSection.badge}
                  </p>
                )}
                {twoColumnSection.title && (
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
                    {twoColumnSection.title}
                  </h3>
                )}
                {twoColumnSection.description && (
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                    {twoColumnSection.description}
                  </p>
                )}
                {twoColumnSection.buttonText && twoColumnSection.buttonLink && (
                  <Link
                    href={twoColumnSection.buttonLink}
                    className="inline-flex items-center gap-2 text-white font-semibold hover:text-amber-500 transition-colors"
                  >
                    {twoColumnSection.buttonText}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
