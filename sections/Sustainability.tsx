"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../components/SectionHeading";
import { mockSustainabilityInitiatives } from "../utilities/mockData";

export function Sustainability() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading
              title="Building for Tomorrow"
              subtitle="Our commitment to sustainable development ensures that we create spaces that not only serve today's needs but also protect future generations."
              align="left"
            />
            
            <div className="space-y-8 mt-12">
              {mockSustainabilityInitiatives.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 mb-4">
                      {item.description}
                    </p>
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1927&auto=format&fit=crop"
              alt="Sustainable Building"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-3xl font-bold mb-2 font-serif">Green Star Rated</h3>
              <p className="text-emerald-100">Pioneering sustainable architecture in every project.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
