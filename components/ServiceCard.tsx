"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  index: number;
}

export function ServiceCard({ title, description, icon: Icon, image, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Icon Badge */}
        <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center text-amber-600 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          <Icon className="w-7 h-7" />
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white font-serif mb-2">
            {title}
          </h3>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 bg-white">
        <p className="text-slate-600 leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Learn More Link */}
        <div className="flex items-center gap-2 text-amber-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
      
      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-amber-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
