import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAgent } from "@/components/ChatAgent";

export const metadata: Metadata = {
  title: "Cristian & Alonso Data | Quiénes somos",
  description: "Consultora de inteligencia urbana especializada en mercado de alquiler, turismo y comercio en Barcelona."
};

const milestones = [
  {
    year: "2020",
    title: "Fundación",
    detail: "Cristian Maldonado y Alonso García lanzan el laboratorio para analizar el acceso a la vivienda con datos abiertos."
  },
  {
    year: "2022",
    title: "Ecosistema turístico",
    detail: "Integración de datos de reservas, ocupación hotelera y sensores urbanos en BigQuery para detectar presión turística."
  },
  {
    year: "2024",
    title: "Barcelona Rent Pulse",
    detail: "Publicamos el observatorio interactivo con dashboards, API y agente conversacional especializado."
  }
];

const principles = [
  {
    title: "Datos verificables",
    description: "Solo trabajamos con fuentes públicas auditables y modelos reproducibles. Cada insight puede rastrearse hasta su dataset."
  },
  {
    title: "Impacto social",
    description: "Buscamos equilibrar el crecimiento económico con acceso a vivienda asequible. Asesoramos administraciones y empresas."
  },
  {
    title: "Tecnología aplicada",
    description: "Automatizamos pipelines en BigQuery, Looker Studio y entornos GIS para que la analítica llegue a las personas decisoras."
  }
];

export default function EmpresaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-brand-green/5 py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-center">
          <div className="space-y-5 md:w-2/3">
            <span className="rounded-full border border-brand-gold/40 bg-white/80 px-4 py-1 text-xs uppercase tracking-[0.3em] text-brand-green">
              Cristian &amp; Alonso Data
            </span>
            <h1 className="text-4xl font-bold text-brand-dark md:text-5xl">Inteligencia urbana con propósito social</h1>
            <p className="text-lg text-brand-dark/75">
              Somos una consultora de analítica avanzada que combina ciencia de datos, políticas públicas y conocimiento del territorio. Nuestro equipo crea productos digitales para anticipar riesgos y oportunidades en el mercado inmobiliario.
            </p>
            <p className="text-brand-dark/70">
              Colaboramos con operadores turísticos, cadenas comerciales, fondos de inversión y ayuntamientos para diseñar soluciones que no olviden a la ciudadanía.
            </p>
          </div>
          <div className="rounded-3xl border border-brand-gold/40 bg-white/90 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-brand-dark">Nuestros diferenciales</h2>
            <ul className="mt-4 space-y-3 text-sm text-brand-dark/75">
              <li>• Modelos de correlación y simulación con datos reales.</li>
              <li>• Arquitectura cloud en BigQuery y despliegues escalables.</li>
              <li>• Narrativas visuales en Looker Studio, Figma y Next.js.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-brand-dark">Principios que guían cada proyecto</h2>
            <p className="text-brand-dark/70">
              Buscamos alianzas a largo plazo. Nuestro acompañamiento abarca desde la extracción de datos hasta la co-creación de estrategias con equipos directivos y ciudadanía.
            </p>
            <div className="space-y-4">
              {principles.map((principle) => (
                <div key={principle.title} className="rounded-3xl border border-brand-gold/30 bg-brand-green/5 p-5">
                  <h3 className="text-lg font-semibold text-brand-dark">{principle.title}</h3>
                  <p className="mt-2 text-sm text-brand-dark/70">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-brand-dark">Hitos recientes</h2>
            <ul className="space-y-4">
              {milestones.map((item) => (
                <li key={item.year} className="rounded-3xl border border-brand-gold/30 bg-white/80 p-5 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-wider text-brand-green/80">{item.year}</p>
                  <p className="mt-2 text-lg font-semibold text-brand-dark">{item.title}</p>
                  <p className="text-sm text-brand-dark/70">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-brand-green/10 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-brand-dark">Equipo núcleo</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-brand-gold/30 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-brand-dark">Cristian Maldonado</h3>
              <p className="text-sm text-brand-dark/70">Data strategist. Lidera la integración de fuentes públicas, el modelado en BigQuery y la traducción de insights para stakeholders.</p>
            </div>
            <div className="rounded-3xl border border-brand-gold/30 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-brand-dark">Alonso García</h3>
              <p className="text-sm text-brand-dark/70">Especialista en políticas urbanas. Diseña indicadores y acompaña procesos participativos con administraciones y comunidad.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ChatAgent />
    </main>
  );
}
