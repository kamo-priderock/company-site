"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

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
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-5 md:h-[68px] md:px-8">
        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-slate-50 sm:h-11 sm:w-11">
            <Image
              src="/PrideRock.png"
              alt="Pride Rock Property Group Logo"
              width={44}
              height={44}
              className="h-9 w-9 object-contain sm:h-10 sm:w-10"
            />
          </div>
          <span className="truncate text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
            Pride Rock
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="relative z-50 items-center gap-7"
          style={{
            display: isDesktop ? "flex" : "none",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative py-2 text-sm font-semibold transition-colors duration-200",
                pathname === link.href
                  ? "text-amber-600"
                  : "text-slate-700 hover:text-amber-600",
                "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-600 after:transition-all after:duration-300 hover:after:w-full"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl text-slate-900 transition-colors hover:bg-slate-100"
          style={{
            display: isDesktop ? "none" : "inline-flex",
          }}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-panel"
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
              style={{
                display: isDesktop ? "none" : "block",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              id="mobile-menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[84vw] max-w-[320px] flex-col bg-white shadow-2xl"
              style={{
                display: isDesktop ? "none" : "flex",
              }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 className="text-lg font-bold text-slate-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-5">
                <div className="flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "rounded-lg px-4 py-3 text-base font-medium transition-all duration-200",
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
