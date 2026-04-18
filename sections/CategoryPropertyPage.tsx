"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Award,
} from "lucide-react";
import Link from "next/link";
import type { CategoryPageSlug } from "@/lib/categoryPageSlugs";
import type { CategoryPagePublic } from "@/lib/categoryPageDefaults";
import { getDefaultCategoryPage } from "@/lib/categoryPageDefaults";
import { getLandingIcon } from "@/lib/landingIcons";
import { ProjectCard } from "@/components/ProjectCard";
import { Loader2 } from "lucide-react";

interface ApiProject {
  _id: string;
  title: string;
  type: string;
  location: string;
  status: string;
  image: string;
}

export function CategoryPropertyPage({ slug }: { slug: CategoryPageSlug }) {
  const [page, setPage] = useState<CategoryPagePublic | null>(null);
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const [pRes, projRes] = await Promise.all([
          fetch(`/api/category-pages/${slug}`),
          fetch("/api/projects"),
        ]);
        const pData = await pRes.json();
        const prData = await projRes.json();
        if (cancelled) return;

        if (pRes.status === 404) {
          setNotFound(true);
          setPage(null);
          setProjects([]);
          return;
        }

        const resolvedPage =
          pData.page || getDefaultCategoryPage(slug);
        setPage(resolvedPage);
        const all = (prData.projects || []) as ApiProject[];
        const filterType =
          (resolvedPage.projectFilterType as string) ||
          getDefaultCategoryPage(slug).projectFilterType;
        setProjects(all.filter((x) => x.type === filterType));
      } catch {
        if (!cancelled) {
          setPage(getDefaultCategoryPage(slug));
          setProjects([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-24">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 pt-24 text-center">
        <p className="text-lg font-medium text-slate-800">
          This category page is not available.
        </p>
        <Link
          href="/"
          className="mt-6 text-amber-600 underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const heroCentered = page.heroAlign === "center";
  const heroOverlay = heroCentered
    ? "bg-gradient-to-t from-black/90 via-black/60 to-black/40"
    : "bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent";

  return (
    <div className="min-h-screen bg-white">
      <section
        className={`relative flex h-[45vh] items-center overflow-hidden ${heroCentered ? "justify-center" : ""}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: page.heroImage
              ? `url(${page.heroImage})`
              : undefined,
          }}
        />
        <div className={`absolute inset-0 ${heroOverlay}`} />

        <div
          className={`container relative z-10 mx-auto px-6 md:px-12 ${heroCentered ? "text-center" : ""}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={
              heroCentered ? "mx-auto max-w-4xl" : "max-w-3xl"
            }
          >
            <span className="mb-4 inline-block rounded-full bg-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-900">
              {page.heroEyebrow}
            </span>
            <h1 className="mb-4 mt-2 font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
              {page.heroTitle}
            </h1>
            <p
              className={`mb-6 mt-3 text-lg leading-relaxed text-slate-200 ${heroCentered ? "mx-auto max-w-2xl" : ""}`}
            >
              {page.heroSubtitle}
            </p>
            <div
              className={`flex flex-wrap gap-4 mt-4 ${heroCentered ? "justify-center" : ""}`}
            >
              <Link
                href={page.heroCta1Href || "/contact"}
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-4 font-bold text-slate-900 transition-colors hover:bg-amber-600"
              >
                {page.heroCta1Label}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={page.heroCta2Href || "#projects"}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {page.heroCta2Label}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <span className="text-sm font-bold uppercase tracking-wider text-amber-600">
              {page.projectsEyebrow}
            </span>
            <h2 className="mt-4 mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
              {page.projectsTitle}
            </h2>
            <p className="text-xl text-slate-600">{page.projectsIntro}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                id={project._id}
                title={project.title}
                type={project.type}
                location={project.location}
                status={project.status}
                image={project.image}
                index={index}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={page.projectsButtonLink || "/projects"}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-slate-800"
            >
              {page.projectsButtonText}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {page.stats.length > 0 && (
        <section className="bg-slate-900 py-12">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-row flex-wrap items-start justify-center gap-x-10 gap-y-8 md:flex-nowrap md:justify-between md:gap-x-12 lg:gap-x-16">
              {page.stats.map((stat, index) => (
                <motion.div
                  key={`${stat.label}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[120px] flex-1 text-center md:min-w-0 md:flex-1"
                >
                  <p className="mb-2 text-4xl font-bold text-amber-500 md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.cards.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto mb-16 max-w-3xl text-center"
            >
              <span className="text-sm font-bold uppercase tracking-wider text-amber-600">
                {page.highlightEyebrow}
              </span>
              <h2 className="mt-4 mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
                {page.highlightTitle}
              </h2>
              <p className="text-xl text-slate-600">{page.highlightSubtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {page.cards.map((card, index) => {
                const Icon = getLandingIcon(card.icon);
                return (
                  <motion.div
                    key={`${card.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-8 transition-all duration-500 hover:shadow-2xl"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 transition-transform group-hover:scale-110">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-slate-900">
                      {card.title}
                    </h3>
                    {card.subtitle ? (
                      <p className="mb-2 text-sm font-semibold text-amber-700">
                        {card.subtitle}
                      </p>
                    ) : null}
                    <p className="leading-relaxed text-slate-600">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {page.mixedUseComponents.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50 py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {page.mixedUseComponents.map((c, i) => (
                <motion.div
                  key={`${c.type}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    {c.type}
                  </h3>
                  <p className="mb-4 text-sm text-slate-600">{c.description}</p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {c.features.map((f, j) => (
                      <li key={j} className="flex gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.amenityGroups.length > 0 && page.mixedUseComponents.length === 0 && (
        <section className="border-t border-slate-100 bg-slate-50 py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {page.amenityGroups.map((g, i) => {
                const Icon = getLandingIcon(g.icon);
                return (
                  <motion.div
                    key={`${g.title}-${i}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border border-slate-200 bg-white p-8"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                        <Icon className="h-6 w-6 text-amber-700" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {g.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {g.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-slate-700"
                        >
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {page.specCategories.length > 0 &&
        page.mixedUseComponents.length === 0 &&
        page.amenityGroups.length === 0 && (
          <section className="border-t border-slate-100 bg-slate-50 py-24">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {page.specCategories.map((block, i) => (
                  <motion.div
                    key={`${block.category}-${i}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border border-slate-200 bg-white p-8"
                  >
                    <h3 className="mb-4 text-xl font-bold text-amber-700">
                      {block.category}
                    </h3>
                    <ul className="space-y-2">
                      {block.items.map((item, j) => (
                        <li key={j} className="text-slate-700">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      {(page.featureBullets.length > 0 || page.featuresSideImage) && (
        <section className="py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {page.featuresEyebrow ? (
                  <span className="text-sm font-bold uppercase tracking-wider text-amber-600">
                    {page.featuresEyebrow}
                  </span>
                ) : null}
                <h2 className="mt-4 mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
                  {page.featuresTitle}
                </h2>
                <p className="mb-8 text-lg text-slate-600">{page.featuresIntro}</p>
                {page.featureBullets.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {page.featureBullets.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {page.featuresSideImage ? (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                    <img
                      src={page.featuresSideImage}
                      alt=""
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {(page.featuresBadgeTitle || page.featuresBadgeSubtitle) && (
                    <div className="absolute -bottom-8 -left-8 max-w-xs rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
                      <div className="mb-2 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                          <Award className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-slate-900">
                            {page.featuresBadgeTitle}
                          </p>
                          <p className="text-sm text-slate-600">
                            {page.featuresBadgeSubtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 font-serif text-4xl font-bold text-white md:text-5xl">
              {page.footerTitle}
            </h2>
            <p className="mb-8 text-xl text-slate-300">{page.footerSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={page.footerPrimaryHref || "/contact"}
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-4 font-bold text-slate-900 transition-colors hover:bg-amber-600"
              >
                {page.footerPrimaryText}
                <ArrowRight className="h-5 w-5" />
              </Link>
              {page.footerSecondaryText && page.footerSecondaryHref ? (
                <a
                  href={page.footerSecondaryHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  {page.footerSecondaryText}
                </a>
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
