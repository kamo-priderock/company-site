"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CarouselItem {
  _id: string;
  title: string;
  status: string;
  location: string;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
}

interface Category {
  _id: string;
  title: string;
  image: string;
  link: string;
  order: number;
  isActive: boolean;
}

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carouselRes, categoriesRes] = await Promise.all([
          fetch("/api/hero-carousel"),
          fetch("/api/categories"),
        ]);

        const carouselData = await carouselRes.json();
        const categoriesData = await categoriesRes.json();

        setCarouselItems(carouselData.items || []);
        setCategories(categoriesData.categories || []);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    if (carouselItems.length > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [carouselItems]);

  if (loading) {
    return (
      <section className="relative flex h-[65svh] min-h-[460px] w-full items-center justify-center bg-slate-100">
        <Loader2 className="h-12 w-12 animate-spin text-amber-600" />
      </section>
    );
  }

  if (carouselItems.length === 0) {
    return (
      <section className="relative flex h-[65svh] min-h-[460px] w-full items-center justify-center bg-slate-100 px-4">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">No content available</h2>
          <p className="text-slate-600">Please add carousel items in the admin panel</p>
        </div>
      </section>
    );
  }

  const active = carouselItems[currentIndex];
  const titleLines = active.title
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2);

  const supportText = active.description.trim();

  return (
    <section className="relative w-full overflow-x-clip">
      <div className="relative h-[68svh] min-h-[520px] w-full overflow-hidden sm:h-[70svh] md:h-[74vh]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={active._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={active.image}
              alt={active.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              unoptimized
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-slate-900/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-6 pt-12 sm:px-6 md:px-10 md:pb-10">
          <div className="mx-auto w-full max-w-6xl">
            <motion.div
              key={`content-${active._id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl rounded-2xl border border-white/20 bg-black/55 p-5 text-white shadow-xl backdrop-blur-md sm:p-6"
            >
              <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight font-serif sm:text-4xl">
                {titleLines.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <div className="mb-4 flex flex-wrap items-center gap-2.5 text-sm">
                <span className="rounded-md bg-amber-500 px-2.5 py-1 font-semibold text-slate-900">
                  {active.status}
                </span>
                <div className="inline-flex items-center gap-1.5 text-slate-100/95">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{active.location}</span>
                </div>
              </div>

              <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate-100/95 sm:text-base">
                {supportText}
              </p>
            </motion.div>
          </div>
        </div>

        {carouselItems.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {categories.length > 0 && (
        <div className="container relative z-20 mx-auto -mt-2 px-4 pb-10 sm:px-6 md:-mt-6 md:px-10">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={category.link}
                className="group relative block h-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm transition hover:shadow-md sm:h-36 md:h-44"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-slate-900/35" />
                <div className="absolute inset-x-3 bottom-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-white sm:text-base">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
