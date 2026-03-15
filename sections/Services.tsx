"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { ServiceCard } from "../components/ServiceCard";
import { SectionHeading } from "../components/SectionHeading";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockServices } from "../utilities/mockData";

export function Services() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const displayServices = isHomePage ? mockServices.slice(0, 3) : mockServices;

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-900 uppercase tracking-wider">Our Expertise</span>
            </motion.div>
            
            <SectionHeading
              title="Comprehensive Development Solutions"
              subtitle="From concept to completion, we deliver world-class property developments that transform communities and create lasting value."
              align="left"
              className="mb-0"
            />
          </div>
          
          {isHomePage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <Link 
                href="/services"
                className="group inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>View All Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          )}
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>

        {/* Bottom Stats Bar (if on home page) */}
        {isHomePage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 shadow-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: "Projects Delivered" },
                { value: "30+", label: "Years Experience" },
                { value: "15", label: "Cities Served" },
                { value: "98%", label: "Client Satisfaction" }
              ].map((stat, i) => (
                <div key={i} className="relative">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-slate-700" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
