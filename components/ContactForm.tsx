"use client";

import { motion } from "framer-motion";

export function ContactForm() {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-bold text-slate-900 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-bold text-slate-900 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-2">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="enquiryType" className="block text-sm font-bold text-slate-900 mb-2">
          Enquiry Type <span className="text-red-500">*</span>
        </label>
        <select
          id="enquiryType"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all appearance-none"
          required
        >
          <option value="" disabled selected>Select an enquiry type</option>
          <option value="general">General Enquiry</option>
          <option value="sales">Sales & Leasing</option>
          <option value="development">Development Projects</option>
          <option value="careers">Careers</option>
        </select>
      </div>
      
      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
          required
        ></textarea>
      </div>
      
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white px-12 py-4 font-bold transition-colors duration-300 tracking-wider uppercase text-sm rounded-sm"
        >
          SUBMIT
        </button>
      </div>
    </motion.form>
  );
}
