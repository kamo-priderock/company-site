"use client";

import { motion } from "framer-motion";
import { Contact as ContactSection } from "../../sections/Contact";
import { Team } from "../../sections/Team";
import { mockOffices } from "../../utilities/mockData";

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 bg-slate-50"
    >
      {/* Banner Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop)` }}
        />
        <div className="absolute inset-0 bg-blue-900/40" />
      </div>

      {/* Office Cards Section - Overlapping Banner */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 -mt-24 md:-mt-32 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockOffices.map((office, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 shadow-lg border-b-4 border-amber-500"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{office.city}</h3>
              <div className="text-slate-600 space-y-1 mb-8">
                {office.address.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              {office.phone && (
                <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-blue-500 hover:text-blue-700 transition-colors">
                  Tel: {office.phone}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <ContactSection />
      <Team />
    </motion.div>
  );
}
