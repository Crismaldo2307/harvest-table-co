'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Corporate Events',
    description:
      'Executive breakfasts, product launches, and large-scale conferences coordinated with precision and hospitality.',
  },
  {
    title: 'Weddings & Private Celebrations',
    description:
      'Tailored menus and immersive dining experiences for intimate gatherings and unforgettable wedding receptions.',
  },
  {
    title: 'Box Lunch & Coffee Break',
    description:
      'Chef-crafted bites, specialty coffee, and nutritious snacks designed for agile teams on the move.',
  },
];

export function Services() {
  return (
    <section id="services" className="bg-brand-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Services</p>
            <h2 className="text-3xl font-semibold text-brand-dark md:text-4xl">Curated culinary experiences for every event</h2>
          </div>
          <p className="max-w-lg text-brand-dark/70">
            Each menu is crafted by our culinary team and supported by smart logistics—ensuring on-time delivery, consistent
            quality, and a memorable guest journey.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-brand-gold/30 bg-white p-8 shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/0 via-brand-gold/5 to-brand-green/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative space-y-4">
                <h3 className="text-2xl font-semibold text-brand-dark">{service.title}</h3>
                <p className="text-sm text-brand-dark/70">{service.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-brand-green">
                  Learn more
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
