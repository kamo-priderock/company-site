"use client";

import { motion } from "framer-motion";
import { About as AboutSection } from "../../sections/About";
import { WhyChooseUs } from "../../sections/WhyChooseUs";
import { Team } from "../../sections/Team";
import { Download, FileText, ArrowRight } from "lucide-react";
import { mockAwards2025, mockAwards2024, mockAccreditations, mockMemberships } from "../../utilities/mockData";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 bg-white"
    >
      {/* Banner Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop)` }}
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="container mx-auto px-6 md:px-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif"
            >
              About Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-200 max-w-2xl mx-auto"
            >
              Company Profile
            </motion.p>
          </div>
        </div>
      </div>

      <AboutSection />
      <WhyChooseUs />
      <Team />
    </motion.div>
  );
}
