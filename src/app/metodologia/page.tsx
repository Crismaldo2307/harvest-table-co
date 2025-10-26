import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAgent } from "@/components/ChatAgent";

export const metadata: Metadata = {
  title: "Metodología | Barcelona Rent Pulse",
  description: "Paso a paso del modelado en BigQuery y la construcción del dashboard en Looker Studio."
};

const steps = [
  {
    title: "Consolidación de la tabla maestra",
    description:
      "Creamos la tabla rental_market_analytics combinando alquiler medio, contratos y dimensiones geográficas por barrio.",
    image: "/proceso/step1.svg"
  },
  {
    title: "Cruce con actividad económica y turismo",
    description:
      "Añadimos totales de negocios activos y porcentaje de residentes extranjeros para medir dinamismo económico.",
    image: "/proceso/step2.svg"
  },
  {
    title: "Agregaciones por distrito",
    description:
      "Agrupamos por distrito para obtener contratos totales y comparar patrones centro-periferia.",
    image: "/proceso/step3.svg"
  },
  {
    title: "Integración de viviendas turísticas",
    description:
      "Enlazamos con el registro de viviendas de uso turístico para medir presión sobre el parque residencial.",
    image: "/proceso/step4.svg"
  },
  {
    title: "Esquema final validado",
    description:
      "Revisamos tipos de datos y campos clave que alimentan los gráficos: rentas, comercio, turismo y vivienda.",
    image: "/proceso/step5.svg"
  },
  {
    title: "Diseño del dashboard",
    description:
      "Partimos de un lienzo en blanco en Looker Studio, definiendo layout y componentes interactivos.",
    image: "/proceso/step6.svg"
  },
  {
    title: "Conexión de fuentes",
    description:
      "Activamos las tres conexiones de BigQuery: mercado de renta, mix urbano y vista distrito-barrio.",
    image: "/proceso/step7.svg"
  },
  {
    title: "Visualización final",
    description:
      "Construimos indicadores clave, ranking de distritos y mapa de presión turística en un único tablero.",
    image: "/proceso/step8.svg"
  }
];

export default function MetodologiaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-brand-green/5 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold text-brand-dark">Metodología y proceso de analítica</h1>
          <p className="mt-4 text-brand-dark/70">
            Desde la extracción en BigQuery hasta la publicación en Looker Studio, cada paso está documentado para garantizar transparencia.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-6xl space-y-12 px-6">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className={`flex flex-col gap-10 rounded-3xl border border-brand-gold/30 bg-white/90 p-6 shadow-sm md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={640}
                  height={360}
                  className="h-auto w-full rounded-2xl border border-brand-gold/30"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center space-y-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-green/70">Paso {index + 1}</p>
                <h2 className="text-2xl font-semibold text-brand-dark">{step.title}</h2>
                <p className="text-brand-dark/75">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
      <ChatAgent />
    </main>
  );
}
