"use client";

import { motion } from "framer-motion";
import { Award, Shield, Leaf, Users, TrendingUp, Clock } from "lucide-react";

const differentiators = [
  {
    icon: Award,
    title: "Award-Winning Excellence",
    description: "Multiple SAPOA awards recognizing our commitment to quality and innovation in property development.",
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: Shield,
    title: "30+ Years of Trust",
    description: "Three decades of proven track record delivering premium developments across South Africa.",
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: Leaf,
    title: "Green Star Certified",
    description: "Leading the industry in sustainable building practices with multiple Green Star rated properties.",
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: Users,
    title: "Client-Centric Approach",
    description: "98% client satisfaction rate through transparent communication and exceptional service delivery.",
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: TrendingUp,
    title: "R5B+ Portfolio Value",
    description: "Proven investment success with a diverse portfolio of high-performing commercial and residential properties.",
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Consistent project completion within agreed timelines through meticulous planning and execution.",
    color: "from-amber-500 to-amber-600"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* 3D Building Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop)',
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900/95" />
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl z-0" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">Why Choose Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif"
          >
            What Makes <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">ModernSpaces</span> Stand Out?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 leading-relaxed"
          >
            We don't just build properties—we create lasting value through innovation, sustainability, and unwavering commitment to excellence.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 bg-white/95 backdrop-blur-sm rounded-3xl border border-white/20 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-400 group-hover:text-amber-600 transition-colors duration-300">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full`} />
                </div>
              </div>

              {/* Floating Badge Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", bounce: 0.5 }}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
              >
                {index + 1}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to Experience the Difference?</h3>
              <p className="text-slate-600">Join the leading developers and investors who trust ModernSpaces.</p>
            </div>
            <button className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
