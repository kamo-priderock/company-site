"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Contact as ContactSection } from "@/sections/Contact";
import { mockOffices } from "@/utilities/mockData";
import { Loader2 } from "lucide-react";

interface ContactAddress {
  title: string;
  lines: string[];
}

interface ContactPageInfo {
  image: string;
  addresses: ContactAddress[];
}

const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

function mockAsAddresses(): ContactAddress[] {
  return mockOffices.map((o) => ({
    title: o.city,
    lines: o.address,
  }));
}

export default function Contact() {
  const [info, setInfo] = useState<ContactPageInfo | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/contact-page-info");
        const data = await res.json();
        if (!cancelled) {
          setInfo(data.info ?? null);
        }
      } catch (e) {
        console.error("Contact page fetch error:", e);
        if (!cancelled) setInfo(null);
      } finally {
        if (!cancelled) setReady(true);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const bannerImage = info?.image?.trim() || DEFAULT_BANNER;
  const addresses: ContactAddress[] =
    info?.addresses?.length
      ? info.addresses
      : !info
        ? mockAsAddresses()
        : [];

  const mapSearchQuery =
    addresses.length > 0
      ? [addresses[0].title, ...(addresses[0].lines || [])]
          .map((s) => s.trim())
          .filter(Boolean)
          .join(", ")
      : undefined;

  const singleAddress = addresses.length === 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 bg-slate-50"
    >
      <div className="relative h-[35vh] md:h-[40vh] w-full overflow-hidden">
        {!ready ? (
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
            <Loader2
              className="w-10 h-10 animate-spin text-amber-500"
              aria-label="Loading"
            />
          </div>
        ) : (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bannerImage})` }}
            />
            <div className="absolute inset-0 bg-blue-900/40" />
          </>
        )}
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 -mt-24 md:-mt-32 mb-24">
        {!ready ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
          </div>
        ) : addresses.length === 0 && info !== null ? (
          <p className="text-center text-slate-600 py-12 bg-white/80 rounded-lg border border-slate-200">
            No addresses configured yet. Add them in Admin → Contact Page → Contact
            Info.
          </p>
        ) : singleAddress ? (
          <div className="flex justify-center">
            <motion.div
              key={`${addresses[0].title}-0`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl bg-white p-10 md:p-14 shadow-lg border-b-4 border-amber-500"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                {addresses[0].title}
              </h3>
              <div className="text-slate-600 space-y-2 text-lg leading-relaxed">
                {addresses[0].lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {addresses.map((office, index) => (
              <motion.div
                key={`${office.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 shadow-lg border-b-4 border-amber-500"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  {office.title}
                </h3>
                <div className="text-slate-600 space-y-1">
                  {office.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ContactSection mapSearchQuery={mapSearchQuery} />
    </motion.div>
  );
}
