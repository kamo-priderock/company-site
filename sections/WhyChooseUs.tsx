"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  Shield,
  Leaf,
  Users,
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
  Heart,
  Zap,
  Loader2,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  Shield,
  Leaf,
  Users,
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
  Heart,
  Zap,
};

interface WhyChooseUsContent {
  _id?: string;
  sectionBadge: string;
  mainTitle: string;
  highlightedWord: string;
  subtitle: string;
  backgroundImage: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  isActive?: boolean;
}

interface Differentiator {
  _id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  order: number;
  isActive?: boolean;
}

const PARTICLE_POSITIONS = [
  { left: 12, top: 8 },
  { left: 88, top: 15 },
  { left: 45, top: 22 },
  { left: 72, top: 35 },
  { left: 18, top: 42 },
  { left: 55, top: 48 },
  { left: 92, top: 55 },
  { left: 28, top: 62 },
  { left: 65, top: 70 },
  { left: 8, top: 78 },
  { left: 48, top: 85 },
  { left: 82, top: 12 },
  { left: 35, top: 58 },
  { left: 75, top: 88 },
  { left: 22, top: 30 },
];

export function WhyChooseUs() {
  const [content, setContent] = useState<WhyChooseUsContent | null>(null);
  const [differentiators, setDifferentiators] = useState<Differentiator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [contentRes, diffRes] = await Promise.all([
          fetch("/api/why-choose-us"),
          fetch("/api/why-choose-differentiators"),
        ]);
        const contentData = await contentRes.json();
        const diffData = await diffRes.json();
        setContent(contentData.content ?? null);
        setDifferentiators(diffData.items || []);
      } catch (e) {
        console.error("WhyChooseUs fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const itemsWithIcons = useMemo(
    () =>
      differentiators.map((d) => ({
        ...d,
        Icon: ICON_MAP[d.icon] ?? Award,
      })),
    [differentiators]
  );

  if (loading) {
    return (
      <section className="py-24 relative min-h-[40vh] flex items-center justify-center bg-slate-900">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" aria-label="Loading" />
      </section>
    );
  }

  if (!content) {
    return null;
  }

  const bgUrl = content.backgroundImage?.trim();
  const ctaHref = content.ctaButtonLink?.trim() || "/contact";

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {bgUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-slate-900" />
        )}
        <div className="absolute inset-0 bg-slate-900/50" />
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl z-0" />

      <div className="absolute inset-0 z-0">
        {PARTICLE_POSITIONS.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3) * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 5) * 0.4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              {content.sectionBadge || "Why Choose Us"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif"
          >
            {content.mainTitle ? `${content.mainTitle} ` : null}
            {content.highlightedWord ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                {content.highlightedWord}
              </span>
            ) : null}
            {" Stand Out?"}
          </motion.h2>

          {content.subtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-300 leading-relaxed"
            >
              {content.subtitle}
            </motion.p>
          ) : null}
        </div>

        {itemsWithIcons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itemsWithIcons.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 hover:border-amber-500/70 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <item.Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-all duration-300">
                      {item.title}
                    </h3>

                    <p className="text-slate-200 leading-relaxed">{item.description}</p>

                    {/* <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-300 group-hover:text-amber-400 transition-colors duration-300">
                      <span>Learn more</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div> */}
                  </div>

                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full`}
                    />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring", bounce: 0.5 }}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : null}

        {(content.ctaTitle || content.ctaDescription || content.ctaButtonText) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30">
              <div className="text-left">
                {content.ctaTitle ? (
                  <h3 className="text-2xl font-bold text-white mb-2">{content.ctaTitle}</h3>
                ) : null}
                {content.ctaDescription ? (
                  <p className="text-slate-200">{content.ctaDescription}</p>
                ) : null}
              </div>
              {content.ctaButtonText ? (
                <Link
                  href={ctaHref}
                  className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg inline-block text-center"
                >
                  {content.ctaButtonText}
                </Link>
              ) : null}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
