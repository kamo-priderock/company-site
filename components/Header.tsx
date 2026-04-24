"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || pathname !== "/"
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
            <Image src="/PrideRock.png" alt="Pride Rock Property Group Logo" width={48} height={48} className="w-12 h-12 object-contain" />
          </div>
          <span
            className={cn(
              "font-bold text-xl tracking-tight transition-colors duration-300",
              isScrolled || pathname !== "/" ? "text-slate-900" : "text-white"
            )}
          >
            Pride Rock Property Group
          </span>
        </Link>

        {/* Desktop Nav - Visible on large screens */}
        <nav 
          className="items-center gap-8 relative z-50"
          style={{
            display: isDesktop ? 'flex' : 'none'
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-all duration-200 relative py-2",
                pathname === link.href
                  ? "text-amber-600"
                  : isScrolled || pathname !== "/"
                  ? "text-slate-700 hover:text-amber-600"
                  : "text-white hover:text-amber-400",
                "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-600 after:transition-all after:duration-300 hover:after:w-full"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle - Visible only on mobile */}
        <button
          type="button"
          className={cn(
            "p-2.5 rounded-lg transition-colors",
            isScrolled || pathname !== "/"
              ? "text-slate-900 hover:bg-slate-100"
              : "text-white hover:bg-white/10"
          )}
          style={{
            display: isDesktop ? 'none' : 'block'
          }}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with darker overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
              style={{ display: isDesktop ? 'none' : 'block' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel - Slides in from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col"
              style={{ display: isDesktop ? 'none' : 'flex' }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200",
                        pathname === link.href
                          ? "bg-amber-50 text-amber-700 font-semibold"
                          : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
