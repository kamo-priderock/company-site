"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { mockCarouselItems, mockCategories } from "../utilities/mockData";
import Link from "next/link";

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mockCarouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mockCarouselItems.length) % mockCarouselItems.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full">
      {/* Carousel */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${mockCarouselItems[currentIndex].image})` }}
            />
            {/* Overlay to make text readable */}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Content Box */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12 relative">
            <motion.div 
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black/60 backdrop-blur-sm border-l-4 border-amber-500 p-8 md:p-12 max-w-2xl text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
                {mockCarouselItems[currentIndex].title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                  {mockCarouselItems[currentIndex].status}
                </span>
                <div className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{mockCarouselItems[currentIndex].location}</span>
                </div>
              </div>
              <p className="text-lg text-slate-200 leading-relaxed">
                {mockCarouselItems[currentIndex].description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Categories Row */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 -mt-16 md:-mt-24 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockCategories.map((category, index) => (
            <Link 
              key={index} 
              href={category.link}
              className="group relative h-48 md:h-64 overflow-hidden block border-b-4 border-transparent hover:border-amber-500 transition-all duration-300"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-blue-950/70 group-hover:bg-blue-950/50 transition-colors duration-300" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-xl md:text-2xl font-medium tracking-wide">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
