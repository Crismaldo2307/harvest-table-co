'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '#services', label: 'Services' },
  { href: '#quote', label: 'Quote' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-brand-cream/80 border-b border-brand-gold/20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold text-brand-dark">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold bg-white font-bold text-brand-green">
            HT
          </span>
          <span>Harvest Table Co.</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href="#" className="hover:text-brand-gold transition-colors">
            Home
          </Link>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-gold transition-colors">
              {item.label}
            </Link>
          ))}
          <Link
            href="#quote"
            className="rounded-full bg-brand-green px-4 py-2 text-white shadow hover:bg-brand-gold transition-colors"
          >
            Request a Quote
          </Link>
        </nav>
        <button
          type="button"
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-6 bg-brand-dark" />
            <span className="block h-0.5 w-6 bg-brand-dark" />
            <span className="block h-0.5 w-6 bg-brand-dark" />
          </div>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-brand-gold/20 bg-brand-cream md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4 text-sm font-medium">
              <Link href="#" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link
                href="#quote"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-brand-green px-4 py-2 text-center text-white shadow"
              >
                Request a Quote
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
