"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedStats } from "../components/AnimatedStats";
import { SectionHeading } from "../components/SectionHeading";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface AboutContent {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  isActive: boolean;
}

export function About() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const response = await fetch('/api/about-content');
      const data = await response.json();
      if (data.content) {
        setContent(data.content);
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </section>
    );
  }

  if (!content) {
    return (
      <section className="py-24 bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No content available</h3>
          <p className="text-slate-600">Please add about content in the admin panel</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <SectionHeading
              title={content.title}
              subtitle={content.subtitle}
              align="left"
              className="mb-0"
            />
            
            <p className="text-lg text-slate-600 leading-relaxed">
              {content.description}
            </p>

            {content.features.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
                {content.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1 text-lg leading-relaxed text-slate-700">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}

            {isHomePage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <Link 
                  href="/about"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-medium transition-colors duration-300"
                >
                  Learn More About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={content.image}
                alt={content.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-amber-600 font-bold text-2xl">
                  1st
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Ranked</p>
                  <p className="text-xl font-bold text-slate-900">Top Developer</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <AnimatedStats />
      </div>
    </section>
  );
}
