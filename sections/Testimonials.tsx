"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { mockTestimonials } from "../utilities/mockData";

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          title="Client Success Stories"
          subtitle="Hear from the businesses and investors who have partnered with us to realize their vision."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {mockTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-slate-50 p-10 rounded-3xl shadow-sm border border-slate-100 relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-amber-100" />
              
              <p className="text-lg text-slate-700 italic mb-8 relative z-10">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xl">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-amber-600 font-medium mt-1">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
