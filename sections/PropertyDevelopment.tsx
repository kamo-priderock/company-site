"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Shield, Users, MapPin, Award } from "lucide-react";

const developmentBenefits = [
  {
    icon: Building2,
    title: "Prime Locations",
    description: "Strategic property positioning in high-growth areas across major South African cities.",
    stats: "15+ Cities"
  },
  {
    icon: TrendingUp,
    title: "Investment Growth",
    description: "Consistent portfolio appreciation with an average ROI exceeding industry benchmarks.",
    stats: "18% ROI"
  },
  {
    icon: Shield,
    title: "Secure Investment",
    description: "Comprehensive due diligence and legal framework ensuring your investment protection.",
    stats: "100% Secured"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "300+ qualified professionals dedicated to delivering excellence in every project.",
    stats: "300+ Experts"
  },
  {
    icon: MapPin,
    title: "Strategic Planning",
    description: "Data-driven site selection and market analysis for optimal development success.",
    stats: "98% Success"
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "ISO-certified processes and rigorous quality control at every development stage.",
    stats: "ISO Certified"
  }
];

export function PropertyDevelopment() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-slate-900/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 mb-6"
          >
            <Building2 className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-900 uppercase tracking-wider">Property Development</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 font-serif"
          >
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">ModernSpaces</span> for Your Next Development?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            We deliver comprehensive property development solutions that maximize value, minimize risk, and exceed expectations at every stage.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {developmentBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 hover:border-amber-200 transition-all duration-300 hover:shadow-xl overflow-hidden">
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 transition-all duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Stats */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <benefit.icon className="w-7 h-7 text-amber-600" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-sm font-bold">
                      {benefit.stats}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-900 transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {benefit.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 group-hover:text-amber-600 transition-colors duration-300">
                    <span>Explore</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Floating Number Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", bounce: 0.5 }}
                className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white font-bold text-sm shadow-lg z-20"
              >
                {index + 1}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative"
        >
          <div className="relative p-12 md:p-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
              }} />
            </div>

            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
                  Ready to Start Your Development Project?
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Partner with South Africa's leading property developers. Let's transform your vision into a landmark development.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/50">
                  Schedule Consultation
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-all duration-300 border border-white/20">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
