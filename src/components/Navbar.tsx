"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Cristian & Alonso Data", href: "/empresa" },
  { label: "Búsqueda", href: "/busqueda" },
  { label: "Política de datos", href: "/politica-datos" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-gold/30 bg-white/90 backdrop-blur" id="top">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-brand-green">
          <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            Barcelona Rent Pulse
          </motion.span>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-brand-dark hover:text-brand-gold"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {link.label}
            </motion.a>
          ))}
          <Link
            href="/#contacto"
            className="rounded-full bg-brand-green px-4 py-2 text-white shadow hover:bg-brand-gold"
          >
            Contacto
          </Link>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-full border border-brand-green p-2 text-brand-green md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" />
          </svg>
        </button>
      </nav>
      {isOpen ? (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="border-t border-brand-gold/30 bg-white md:hidden"
        >
          <div className="space-y-4 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-brand-dark"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contacto"
              className="block rounded-full bg-brand-green px-4 py-2 text-center text-white"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </a>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
