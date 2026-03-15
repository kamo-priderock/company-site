"use client";

import { motion } from "framer-motion";
import { AnimatedStats } from "../components/AnimatedStats";
import { SectionHeading } from "../components/SectionHeading";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockFeatures } from "../utilities/mockData";

export function About() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <SectionHeading
              title="Shaping the Skyline Since 1994"
              subtitle="We are a premier property development and construction company dedicated to creating spaces that inspire, function, and endure."
              align="left"
              className="mb-0"
            />
            
            <p className="text-lg text-slate-600 leading-relaxed">
              With over three decades of industry expertise, we specialize in delivering high-end commercial, retail, residential, and industrial developments. Our commitment to innovation, sustainability, and uncompromising quality has made us a trusted partner for investors and communities alike.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {mockFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="flex items-center gap-3 text-slate-700 font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  {feature}
                </motion.li>
              ))}
            </ul>

            {isHomePage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <Link 
                  href="/about"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-medium transition-colors duration-300"
                >
                  Learn More About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Architecture"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-amber-600 font-bold text-2xl">
                  1st
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Ranked</p>
                  <p className="text-xl font-bold text-slate-900">Top Developer</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <AnimatedStats />
      </div>
    </section>
  );
}
