"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Corporate Events",
    description:
      "Executive meetings, product launches, and conferences supported by seamless logistics and curated menus.",
    icon: "M13 16h-1v-4h-1m4-4h.01M12 8h0a4 4 0 100 8h0a4 4 0 000-8zm0 0V6a2 2 0 10-4 0v2"
  },
  {
    title: "Weddings & Private",
    description:
      "Sophisticated receptions and intimate celebrations with bespoke culinary storytelling.",
    icon: "M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
  },
  {
    title: "Box Lunch / Coffee Break",
    description:
      "Premium boxed menus and energizing break stations ready for agile teams on the move.",
    icon: "M3 7.5L12 3l9 4.5M4.5 19.5h15M4.5 7.5v12h15v-12"
  }
];

export function Services() {
  return (
    <section id="services" className="bg-brand-green/5 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-3xl font-bold text-brand-dark md:text-4xl"
          >
            Signature Services Designed for Impactful Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mt-4 text-brand-dark/70"
          >
            From boardrooms to ballrooms, we blend culinary artistry with responsive technology to craft seamless experiences.
          </motion.p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-4 rounded-3xl border border-brand-gold/30 bg-white/80 p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-dark">{service.title}</h3>
              <p className="text-sm text-brand-dark/70">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
