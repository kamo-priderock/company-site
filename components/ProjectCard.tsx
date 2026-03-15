"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

interface ProjectCardProps {
  title: string;
  type: string;
  location: string;
  image: string;
  index: number;
}

export function ProjectCard({ title, type, location, image, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-3xl aspect-[4/5] md:aspect-[3/4] bg-slate-100"
    >
      <img
        src={image}
        alt={title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-amber-600/80 backdrop-blur-sm rounded-full">
              {type}
            </span>
            <span className="flex items-center text-xs text-white/80 font-medium">
              <MapPin className="w-3 h-3 mr-1" />
              {location}
            </span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif tracking-tight">
            {title}
          </h3>
          
          <div className="flex items-center text-amber-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-4">
            View Project <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
