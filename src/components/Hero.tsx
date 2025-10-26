"use client";

import { motion } from "framer-motion";
import { rentalTrends } from "@/data/rental-trends";

const latest = rentalTrends[rentalTrends.length - 1];
const base = rentalTrends[0];

export function Hero() {
  const growth = Math.round(((latest.avgRent - base.avgRent) / base.avgRent) * 100);

  return (
    <section className="relative overflow-hidden bg-white py-20" id="inicio">
      <div className="absolute inset-0 gradient-overlay pointer-events-none" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center">
        <div className="relative z-10 max-w-2xl space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center rounded-full border border-brand-gold/40 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.3em] text-brand-green"
          >
            Observatorio urbano independiente
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold leading-tight text-brand-dark md:text-6xl"
          >
            Incremento de la renta en Barcelona y su vínculo con turismo y comercio.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-brand-dark/80"
          >
            Analizamos datos oficiales de la Agència de l&apos;Habitatge de Catalunya, el Departament d&apos;Estadística del Ajuntament y BigQuery para demostrar cómo la presión turística y la actividad económica empujan los precios de alquiler en los distritos más demandados.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#analitica"
              className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg hover:bg-brand-gold"
            >
              Explorar visualizaciones
            </a>
            <a href="/#contacto" className="text-sm font-semibold text-brand-green hover:text-brand-gold">
              Hablemos de soluciones
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="relative z-10 flex-1"
        >
          <div className="rounded-3xl border border-brand-gold/40 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-brand-green/10 p-4">
                <p className="text-xs uppercase text-brand-green/80">Crecimiento acumulado</p>
                <p className="text-2xl font-semibold text-brand-dark">
                  +{growth}%
                </p>
                <p className="mt-2 text-xs text-brand-dark/70">Precio medio mensual de alquiler entre {base.year} y {latest.year}.</p>
              </div>
              <div className="rounded-2xl bg-brand-gold/10 p-4">
                <p className="text-xs uppercase text-brand-gold/90">Turismo recuperado</p>
                <p className="text-2xl font-semibold text-brand-dark">
                  {latest.touristNightsMillions.toFixed(1)} M
                </p>
                <p className="mt-2 text-xs text-brand-dark/70">Pernoctaciones turísticas registradas en {latest.year}.</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-dashed border-brand-green/40 p-4">
                <p className="text-xs uppercase text-brand-dark/70">Hipótesis clave</p>
                <p className="text-brand-dark/80">
                  Donde se concentran los negocios y el turismo, los alquileres crecen más rápido. La correlación anual entre renta y pernoctaciones alcanza un coeficiente de 0.87.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
