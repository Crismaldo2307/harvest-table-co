import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { QuoteForm } from "@/components/QuoteForm";
import { ChatAgent } from "@/components/ChatAgent";
import { InteractiveAnalytics } from "@/components/InteractiveAnalytics";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <Hero />
      <section className="bg-brand-green/10 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold text-brand-dark">Barcelona Rent Pulse</h2>
            <p className="text-brand-dark/75">
              Proyecto de inteligencia urbana que combina datos públicos y fuentes alternativas para explicar la tensión del mercado de alquiler en Barcelona. Nuestro enfoque cruza precios, flujos de turismo, dinamismo comercial y empleo para anticipar zonas de riesgo y detectar oportunidades.
            </p>
            <p className="text-brand-dark/70">
              Cristian &amp; Alonso Data transforma millones de registros en decisiones accionables para empresas, administraciones y colectivos ciudadanos que buscan respuestas ante la crisis de vivienda.
            </p>
          </div>
          <div className="space-y-3 rounded-3xl border border-brand-gold/40 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green/80">Highlights 2024</p>
            <ul className="space-y-2 text-sm text-brand-dark/80">
              <li>• Renta media mensual: 1.139 € (+64 % desde 2015).</li>
              <li>• Pernoctaciones turísticas: 22,7 millones.</li>
              <li>• 41 % de pernoctaciones en apartamentos turísticos.</li>
            </ul>
            <a href="/busqueda" className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-gold">
              Explorar dashboard en Looker Studio
            </a>
          </div>
        </div>
      </section>
      <InteractiveAnalytics />
      <Services />
      <QuoteForm />
      <Footer />
      <ChatAgent />
    </main>
  );
}
