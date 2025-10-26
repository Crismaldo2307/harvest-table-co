"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { districtSnapshots, rentalTrends, tourismMix } from "@/data/rental-trends";

const chartWidth = 760;
const chartHeight = 320;
const margin = 48;

const metrics = {
  tourism: {
    key: "tourism",
    label: "Turismo",
    description: "Pernoctaciones turísticas registradas (millones)",
    unit: "M pernoctaciones",
    color: "#C8A951",
    series: rentalTrends.map((item) => item.touristNightsMillions)
  },
  commerce: {
    key: "commerce",
    label: "Comercio",
    description: "Índice de facturación comercial (2015 = 100)",
    unit: "Índice",
    color: "#8E7332",
    series: rentalTrends.map((item) => item.commerceIndex)
  },
  employment: {
    key: "employment",
    label: "Empleo",
    description: "Tasa de empleo sobre población activa",
    unit: "%",
    color: "#556B2F",
    series: rentalTrends.map((item) => item.employmentRate)
  }
};

type MetricKey = keyof typeof metrics;

function buildLinePath(values: number[], min: number, max: number) {
  if (values.length === 0 || min === max) {
    return "";
  }
  const plotWidth = chartWidth - margin * 2;
  const plotHeight = chartHeight - margin * 2;
  return values
    .map((value, index) => {
      const x = margin + (index / (values.length - 1)) * plotWidth;
      const y = margin + plotHeight - ((value - min) / (max - min)) * plotHeight;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

export function InteractiveAnalytics() {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("tourism");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverDistrict, setHoverDistrict] = useState<string | null>(null);
  const segmentsWithStart = useMemo(() => {
    let start = 0;
    return tourismMix.map((segment) => {
      const current = { ...segment, start };
      start += segment.value;
      return current;
    });
  }, []);

  const rentSeries = useMemo(() => rentalTrends.map((item) => item.avgRent), []);
  const years = rentalTrends.map((item) => item.year);
  const rentMin = Math.min(...rentSeries);
  const rentMax = Math.max(...rentSeries);

  const selectedMetric = metrics[activeMetric];
  const metricMin = Math.min(...selectedMetric.series);
  const metricMax = Math.max(...selectedMetric.series);
  const rentPath = buildLinePath(rentSeries, rentMin, rentMax);
  const metricPath = buildLinePath(selectedMetric.series, metricMin, metricMax);

  return (
    <section id="analitica" className="bg-white py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold text-brand-dark md:text-4xl">Visualizaciones interactivas</h2>
          <p className="text-brand-dark/70">
            Explora la evolución histórica, el diferencial por distritos y la distribución del alojamiento turístico. Sitúa el cursor para descubrir métricas precisas y compara tendencias año a año.
          </p>
        </div>

        <div className="space-y-6 rounded-3xl border border-brand-gold/30 bg-brand-green/5 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-brand-dark">Renta media vs. indicador seleccionado</h3>
              <p className="text-sm text-brand-dark/70">Series anualizadas 2015 - 2024</p>
              <p className="text-xs text-brand-dark/60">{selectedMetric.description}</p>
            </div>
            <div className="flex gap-2">
              {(Object.keys(metrics) as MetricKey[]).map((metric) => (
                <button
                  key={metric}
                  type="button"
                  onClick={() => setActiveMetric(metric)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    activeMetric === metric
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-brand-green/40 bg-white text-brand-dark hover:border-brand-green/70"
                  }`}
                >
                  {metrics[metric].label}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="h-[320px] min-w-[640px] w-full"
            >
              <defs>
                <linearGradient id="rentGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#556B2F" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#556B2F" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <rect x={margin} y={margin} width={chartWidth - margin * 2} height={chartHeight - margin * 2} fill="url(#rentGradient)" opacity={0.12} />
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = margin + (chartHeight - margin * 2) * (1 - ratio);
                const rentValue = Math.round(rentMin + (rentMax - rentMin) * ratio);
                const metricValue = (metricMin + (metricMax - metricMin) * ratio).toFixed(1);
                return (
                  <g key={ratio}>
                    <line x1={margin} y1={y} x2={chartWidth - margin} y2={y} stroke="#C8A951" strokeDasharray="4 4" strokeOpacity={0.2} />
                    <text x={8} y={y + 4} className="fill-brand-dark/60 text-xs">
                      € {rentValue}
                    </text>
                    <text x={chartWidth - margin + 8} y={y + 4} className="fill-brand-dark/50 text-xs">
                      {metricValue} {selectedMetric.unit}
                    </text>
                  </g>
                );
              })}
              <path d={rentPath} fill="none" stroke="#556B2F" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              <path d={metricPath} fill="none" stroke={selectedMetric.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6" />
              {rentSeries.map((rent, index) => {
                const x = margin + (index / (rentSeries.length - 1)) * (chartWidth - margin * 2);
                const yRent = margin + (chartHeight - margin * 2) - ((rent - rentMin) / (rentMax - rentMin)) * (chartHeight - margin * 2);
                const metricValue = selectedMetric.series[index];
                const yMetric =
                  margin +
                  (chartHeight - margin * 2) -
                  ((metricValue - metricMin) / (metricMax - metricMin)) * (chartHeight - margin * 2);

                return (
                  <g key={years[index]}>
                    <circle
                      cx={x}
                      cy={yRent}
                      r={6}
                      fill="#556B2F"
                      fillOpacity={hoverIndex === index ? 1 : 0.7}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                    />
                    <circle
                      cx={x}
                      cy={yMetric}
                      r={5}
                      fill={selectedMetric.color}
                      fillOpacity={0.75}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                    />
                    {hoverIndex === index ? (
                      <foreignObject
                        x={Math.min(Math.max(x - 80, 8), chartWidth - 160)}
                        y={Math.min(yRent, yMetric) - 72}
                        width={160}
                        height={70}
                      >
                        <div className="rounded-xl border border-brand-gold/40 bg-white/95 p-3 text-xs shadow-lg">
                          <p className="font-semibold text-brand-dark">{years[index]}</p>
                          <p className="text-brand-dark/80">Renta media: € {rent.toLocaleString("es-ES")}</p>
                          <p className="text-brand-dark/70">
                            {selectedMetric.label}: {metricValue.toLocaleString("es-ES", { maximumFractionDigits: 1 })} {selectedMetric.unit}
                          </p>
                        </div>
                      </foreignObject>
                    ) : null}
                  </g>
                );
              })}
              <line x1={margin} y1={chartHeight - margin} x2={chartWidth - margin} y2={chartHeight - margin} stroke="#C8A951" strokeOpacity={0.4} />
              {years.map((year, index) => {
                const x = margin + (index / (years.length - 1)) * (chartWidth - margin * 2);
                return (
                  <text key={year} x={x} y={chartHeight - margin + 24} textAnchor="middle" className="fill-brand-dark/60 text-xs">
                    {year}
                  </text>
                );
              })}
            </svg>
          </div>
          <p className="text-xs text-brand-dark/60">
            Fuente: registros de la Agència de l&apos;Habitatge de Catalunya, Turismo de Barcelona y BigQuery (procesamiento interno).
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-brand-gold/30 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-brand-dark">Presión turística y renta por distrito</h3>
            <p className="text-sm text-brand-dark/70">Mover sobre los puntos para conocer cifras concretas (2023).</p>
            <div className="mt-6 overflow-x-auto">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-[320px] min-w-[640px] w-full">
                <defs>
                  <linearGradient id="scatterGradient" x1="0" x2="1" y1="1" y2="0">
                    <stop offset="0%" stopColor="#C8A951" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#556B2F" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <rect x={margin} y={margin} width={chartWidth - margin * 2} height={chartHeight - margin * 2} fill="url(#scatterGradient)" opacity={0.35} />
                {districtSnapshots.map((district) => {
                  const x = margin + ((district.tourismPressureIndex - 50) / (180 - 50)) * (chartWidth - margin * 2);
                  const y =
                    margin +
                    (chartHeight - margin * 2) -
                    ((district.avgRent - 750) / (1300 - 750)) * (chartHeight - margin * 2);
                  const radius = 8 + (district.shortTermRentals / 8200) * 12;
                  const isActive = hoverDistrict === district.district;

                  return (
                    <g key={district.district}>
                      <circle
                        cx={x}
                        cy={y}
                        r={radius}
                        fill="#556B2F"
                        fillOpacity={isActive ? 0.9 : 0.55}
                        stroke="#C8A951"
                        strokeWidth={isActive ? 3 : 1}
                        onMouseEnter={() => setHoverDistrict(district.district)}
                        onMouseLeave={() => setHoverDistrict(null)}
                      />
                      {isActive ? (
                        <foreignObject
                          x={Math.min(Math.max(x - 90, 8), chartWidth - 180)}
                          y={Math.max(y - 90, 8)}
                          width={180}
                          height={90}
                        >
                          <div className="rounded-xl border border-brand-gold/40 bg-white/95 p-3 text-xs shadow-lg">
                            <p className="font-semibold text-brand-dark">{district.district}</p>
                            <p className="text-brand-dark/80">Renta media: € {district.avgRent.toLocaleString("es-ES")}</p>
                            <p className="text-brand-dark/70">Índice presión turística: {district.tourismPressureIndex}</p>
                            <p className="text-brand-dark/60">Viviendas turísticas: {district.shortTermRentals.toLocaleString("es-ES")}</p>
                          </div>
                        </foreignObject>
                      ) : null}
                    </g>
                  );
                })}
                <line x1={margin} y1={chartHeight - margin} x2={chartWidth - margin} y2={chartHeight - margin} stroke="#1F1F1F" strokeOpacity={0.2} />
                <line x1={margin} y1={margin} x2={margin} y2={chartHeight - margin} stroke="#1F1F1F" strokeOpacity={0.2} />
                <text x={chartWidth / 2} y={chartHeight - 8} textAnchor="middle" className="fill-brand-dark/70 text-sm">
                  Índice de presión turística (media ciudad = 100)
                </text>
                <text
                  x={-(chartHeight / 2)}
                  y={20}
                  transform={`rotate(-90)`}
                  textAnchor="middle"
                  className="fill-brand-dark/70 text-sm"
                >
                  Renta mensual (€)
                </text>
              </svg>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-gold/30 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-brand-dark">Distribución del alojamiento turístico</h3>
            <p className="text-sm text-brand-dark/70">Participación sobre el total de pernoctaciones en 2023.</p>
            <div className="mt-6 space-y-4">
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-brand-green/10">
                {segmentsWithStart.map((segment) => (
                  <motion.div
                    key={segment.label}
                    className="absolute top-0 h-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${segment.value}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      background: "linear-gradient(90deg, rgba(200,169,81,0.8), rgba(85,107,47,0.8))",
                      left: `${segment.start}%`,
                      width: `${segment.value}%`
                    }}
                  />
                ))}
                {segmentsWithStart.map((segment) => (
                  <div
                    key={segment.label}
                    className="absolute top-0 h-full border-r border-white/40"
                    style={{ left: `${segment.start}%`, width: `${segment.value}%` }}
                  />
                ))}
              </div>
              <ul className="space-y-3">
                {tourismMix.map((segment) => (
                  <li key={segment.label} className="flex items-start justify-between gap-4 rounded-2xl bg-brand-green/5 p-4">
                    <div>
                      <p className="text-sm font-semibold text-brand-dark">{segment.label}</p>
                      <p className="text-xs text-brand-dark/70">{segment.description}</p>
                    </div>
                    <span className="text-lg font-bold text-brand-green">{segment.value}%</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-brand-dark/60">
                El peso creciente de las viviendas turísticas tensiona la disponibilidad de alquiler residencial en zonas centrales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
