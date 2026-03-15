"use client";

import { motion } from "framer-motion";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Services } from "../sections/Services";
import { PropertyDevelopment } from "../sections/PropertyDevelopment";
import { Projects } from "../sections/Projects";
import { Sustainability } from "../sections/Sustainability";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Services />
      <PropertyDevelopment />
      <Projects />
      <Sustainability />
      
      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif"
          >
            Ready to Build the Future?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
          >
            Partner with us to create innovative, sustainable, and premium property developments.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-700 transition-colors duration-300"
            >
              Contact Our Team
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

