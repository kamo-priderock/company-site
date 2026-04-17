"use client";

import { motion } from "framer-motion";
import { ContactForm } from "../components/ContactForm";

const DEFAULT_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.686526149866!2d18.85984431521151!3d-33.93635598063756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc45c8b5b5b5b5%3A0x1b5b5b5b5b5b5b5b!2s16%20Mill%20St%2C%20Stellenbosch%20Central%2C%20Stellenbosch%2C%207600%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus";

function mapEmbedSrcFromQuery(query: string) {
  const q = encodeURIComponent(query.trim());
  return `https://maps.google.com/maps?q=${q}&hl=en&z=14&output=embed`;
}

interface ContactProps {
  /** Full address text for the map; first office line from the contact page */
  mapSearchQuery?: string;
}

export function Contact({ mapSearchQuery }: ContactProps) {
  const query = mapSearchQuery?.trim();
  const mapSrc = query ? mapEmbedSrcFromQuery(query) : DEFAULT_MAP_EMBED;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-serif"
          >
            We'd like to hear from you
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600"
          >
            Please contact us should you have any enquiry on our current or future developments.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto mb-24">
          <ContactForm />
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full h-[400px] bg-slate-200 rounded-3xl overflow-hidden relative shadow-md"
        >
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
