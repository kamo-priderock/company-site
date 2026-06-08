"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedStats } from "@/components/AnimatedStats";

export type AboutSectionData = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
};

export function AboutSectionLayout({
  content,
  showLearnMore = false,
  showStats = true,
}: {
  content: AboutSectionData;
  showLearnMore?: boolean;
  showStats?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
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

            {content.description ? (
              <p className="text-lg leading-relaxed text-slate-600">
                {content.description}
              </p>
            ) : null}

            {content.features.length > 0 ? (
              <ul className="mt-6 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
                {content.features.map((feature, index) => (
                  <motion.li
                    key={`${feature}-${index}`}
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
            ) : null}

            {showLearnMore ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-medium text-white transition-colors duration-300 hover:bg-slate-800"
                >
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ) : null}
          </motion.div>

          {content.image?.trim() ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src={content.image}
                  alt={content.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-8 -left-8 hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-xl md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-2xl font-bold text-amber-600">
                    1st
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                      Ranked
                    </p>
                    <p className="text-xl font-bold text-slate-900">Top Developer</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </div>

        {showStats ? <AnimatedStats /> : null}
      </div>
    </section>
  );
}
