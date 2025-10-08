'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-white to-brand-cream" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:flex-row md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-brand-gold">Premium Catering</p>
          <h1 className="text-4xl font-bold text-brand-dark md:text-5xl">
            Premium Catering. Intelligent Technology. Unforgettable Experiences.
          </h1>
          <p className="max-w-xl text-base text-brand-dark/70 md:text-lg">
            Harvest Table Co. blends culinary artistry with smart automation to deliver elegant dining moments faster,
            smarter, and tailored to every guest.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#quote"
              className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-brand-gold"
            >
              Request a Tailored Proposal
            </Link>
            <Link href="#services" className="text-sm font-semibold text-brand-green underline-offset-4 hover:underline">
              Explore services
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1"
        >
          <div className="relative overflow-hidden rounded-3xl border border-brand-gold/40 bg-brand-cream p-6 shadow-2xl">
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-brand-gold/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-brand-green/10 blur-3xl" />
            <div className="relative space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Mission</h2>
              <p className="text-base text-brand-dark/80">
                “Deliver premium catering experiences through intelligent, fast, and personalized solutions.”
              </p>
              <h2 className="pt-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Vision</h2>
              <p className="text-base text-brand-dark/80">
                “Become the leading partner in event catering by combining innovation, efficiency, and unforgettable
                flavor.”
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
