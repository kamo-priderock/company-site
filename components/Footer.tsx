"use client";

import { Facebook, Twitter, Linkedin, Instagram, Building2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
              <Building2 className="w-8 h-8 text-amber-500" />
              ModernSpaces
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
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Commercial Development</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Retail Spaces</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Industrial Parks</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Residential Communities</Link></li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Property Management</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to receive updates on our latest projects and industry insights.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:border-amber-500 text-white text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {currentYear} ModernSpaces Property Developers. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
