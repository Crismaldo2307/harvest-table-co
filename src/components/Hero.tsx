"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-24" id="home">
      <div className="absolute inset-0 gradient-overlay pointer-events-none" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center">
        <div className="relative z-10 max-w-2xl space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center rounded-full border border-brand-gold/40 bg-white/60 px-4 py-1 text-xs uppercase tracking-[0.3em] text-brand-green"
          >
            Harvest Table Co.
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold leading-tight text-brand-dark md:text-6xl"
          >
            Catering Premium. Intelligent Technology. Unforgettable Experiences.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-brand-dark/80"
          >
            We deliver elevated culinary moments for corporate and private events while leveraging smart tools to tailor every detail to your guests.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap items-center gap-4">
            <a
              href="#quote"
              className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg hover:bg-brand-gold"
            >
              Request a Quote
            </a>
            <a href="#services" className="text-sm font-semibold text-brand-green hover:text-brand-gold">
              Explore Services
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 flex-1"
        >
          <div className="rounded-3xl border border-brand-gold/40 bg-white/70 p-6 shadow-xl">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-brand-green/10 p-4">
                <p className="text-xs uppercase text-brand-green/80">Mission</p>
                <p className="text-brand-dark font-semibold">
                  Deliver premium catering experiences through intelligent, fast, and personalized solutions.
                </p>
              </div>
              <div className="rounded-2xl bg-brand-gold/10 p-4">
                <p className="text-xs uppercase text-brand-gold/90">Vision</p>
                <p className="text-brand-dark font-semibold">
                  Become the leading catering partner by merging innovation, efficiency, and unforgettable flavors.
                </p>
              </div>
              <div className="col-span-2 rounded-2xl border border-dashed border-brand-green/40 p-4">
                <p className="text-xs uppercase text-brand-dark/70">Our Promise</p>
                <p className="text-brand-dark/80">
                  Dedicated culinary experts, tech-enabled logistics, and signature hospitality at every stage of your event.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
