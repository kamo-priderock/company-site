"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../components/SectionHeading";
import { mockProcessSteps } from "../utilities/mockData";

// 3D CSS-based animated icons
function AnimatedIcon3D({ icon: Icon, index, color }: { icon: any; index: number; color: string }) {
  const colors = ['#fbbf24', '#3b82f6', '#f97316', '#10b981'];
  const rotations = ['rotateY(20deg) rotateX(-10deg)', 'rotateY(-20deg) rotateX(10deg)', 'rotateY(15deg) rotateX(15deg)', 'rotateY(-15deg) rotateX(-15deg)'];
  
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 + 0.3, type: "spring", bounce: 0.5 }}
      className="relative w-32 h-32 mx-auto mb-6"
      style={{ perspective: '1000px' }}
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-3xl blur-2xl opacity-40 animate-pulse"
        style={{ 
          background: `radial-gradient(circle, ${colors[index]} 0%, transparent 70%)`,
          animation: `pulse 3s ease-in-out infinite ${index * 0.5}s`
        }}
      />
      
      {/* Main 3D Container */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: rotations[index],
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 rounded-3xl flex items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors[index]}dd 0%, ${colors[index]}99 100%)`,
            transform: 'translateZ(30px)',
            backfaceVisibility: 'hidden',
          }}
        >
          <Icon className="w-16 h-16 text-white drop-shadow-lg" />
        </div>
        
        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-3xl flex items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors[index]}99 0%, ${colors[index]}dd 100%)`,
            transform: 'translateZ(-30px) rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <Icon className="w-16 h-16 text-white drop-shadow-lg" />
        </div>
        
        {/* Top Face */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(to bottom, ${colors[index]}ee 0%, ${colors[index]}aa 100%)`,
            transform: 'rotateX(90deg) translateZ(64px)',
            backfaceVisibility: 'hidden',
          }}
        />
        
        {/* Bottom Face */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(to top, ${colors[index]}88 0%, ${colors[index]}cc 100%)`,
            transform: 'rotateX(-90deg) translateZ(64px)',
            backfaceVisibility: 'hidden',
          }}
        />
        
        {/* Left Face */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(to right, ${colors[index]}aa 0%, ${colors[index]}dd 100%)`,
            transform: 'rotateY(-90deg) translateZ(64px)',
            backfaceVisibility: 'hidden',
          }}
        />
        
        {/* Right Face */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(to left, ${colors[index]}aa 0%, ${colors[index]}dd 100%)`,
            transform: 'rotateY(90deg) translateZ(64px)',
            backfaceVisibility: 'hidden',
          }}
        />
      </motion.div>
      
      {/* Step Number Badge */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 + 0.6, type: "spring", bounce: 0.6 }}
        className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center font-bold text-xl shadow-2xl border-4 border-white z-20"
        style={{
          boxShadow: '0 10px 40px rgba(251, 191, 36, 0.4)'
        }}
      >
        {index + 1}
      </motion.div>
      
      {/* Floating Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: colors[index],
            top: `${20 + i * 30}%`,
            left: `${10 + i * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
}

export function Process() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          title="Our Process"
          subtitle="A systematic approach to property development that ensures excellence from inception to completion."
        />
        
        <div className="relative mt-20">
          {/* Animated Connecting Line */}
          <div className="absolute top-16 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent hidden lg:block" />
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-16 left-0 h-1 bg-gradient-to-r from-amber-500 via-blue-500 via-orange-500 to-emerald-500 hidden lg:block"
            style={{
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
            }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {mockProcessSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                {/* 3D Animated Icon */}
                <AnimatedIcon3D icon={step.icon} index={index} color={['#fbbf24', '#3b82f6', '#f97316', '#10b981'][index]} />
                
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="text-xl font-bold text-slate-900 mb-3 mt-4"
                >
                  {step.title}
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.6 }}
                  className="text-slate-600 leading-relaxed"
                >
                  {step.description}
                </motion.p>

                {/* Accent Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.7 }}
                  className="w-16 h-1 rounded-full mt-4"
                  style={{
                    background: `linear-gradient(90deg, ${['#fbbf24', '#3b82f6', '#f97316', '#10b981'][index]}, ${['#f59e0b', '#2563eb', '#ea580c', '#059669'][index]})`
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-slate-600 mb-6">
            Ready to start your development journey?
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
            Let's Discuss Your Project
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
