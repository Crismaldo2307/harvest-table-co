"use client";

import { motion } from "framer-motion";
import { pearsonCorrelation } from "@/lib/statistics";
import { districtSnapshots, rentalTrends } from "@/data/rental-trends";

const rentSeries = rentalTrends.map((item) => item.avgRent);
const tourismSeries = rentalTrends.map((item) => item.touristNightsMillions);
const commerceSeries = rentalTrends.map((item) => item.commerceIndex);

const correlations = [
  {
    title: "Turismo vs. renta",
    value: pearsonCorrelation(rentSeries, tourismSeries),
    description:
      "La recuperación de pernoctaciones tras 2021 explica gran parte del rebote de precios, especialmente en Ciutat Vella y l'Eixample."
  },
  {
    title: "Comercio vs. renta",
    value: pearsonCorrelation(rentSeries, commerceSeries),
    description:
      "Los barrios con más densidad comercial mantienen rentas medias por encima de 1.000 € y menor disponibilidad residencial."
  },
  {
    title: "Top presión turística",
    value: districtSnapshots
      .slice()
      .sort((a, b) => b.tourismPressureIndex - a.tourismPressureIndex)
      .slice(0, 1)[0].district,
    description:
      "Ciutat Vella concentra el 17 % de las viviendas de uso turístico registradas y supera los 1.200 € de renta media mensual."
  }
];

export function Services() {
  return (
    <section id="insights" className="bg-brand-green/5 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-3xl font-bold text-brand-dark md:text-4xl"
          >
            ¿Qué factores empujan el alquiler en Barcelona?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mt-4 text-brand-dark/70"
          >
            Integramos bases de BigQuery, padrón municipal y catastros comerciales para cuantificar el efecto combinado del turismo, la oferta comercial y el empleo en cada distrito.
          </motion.p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {correlations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-4 rounded-3xl border border-brand-gold/30 bg-white/80 p-6 shadow-sm"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-sm uppercase tracking-wide text-brand-green/80">Indicador clave</span>
                <span className="text-xs text-brand-dark/60">2024</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-dark">{item.title}</h3>
              <p className="text-4xl font-bold text-brand-green">
                {typeof item.value === "number" ? item.value.toFixed(2) : item.value}
              </p>
              <p className="text-sm text-brand-dark/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
