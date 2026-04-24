"use client";

import { Facebook, Twitter, Linkedin, Instagram, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 ">
      <div className="container mx-auto px-6 md:px-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
              <Image src="/PrideRock.png" alt="Pride Rock Property Group Logo" width={48} height={48} className="w-12 h-12 object-contain" />
              Pride Rock
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Pioneering the future of property development with innovative, sustainable, and premium spaces.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-amber-400 transition-colors">Our Projects</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Property Development & Facilitation</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Mixed -use precincts
              </Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Finance</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Conceptual designs</Link></li>
            </ul>
          </div>

          {/* Newsletter */}

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {currentYear} Pride Rock Property Group. All rights reserved.</p>
          {/* <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
