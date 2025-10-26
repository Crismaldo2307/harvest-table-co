import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAgent } from "@/components/ChatAgent";

export const metadata: Metadata = {
  title: "Búsqueda | Barcelona Rent Pulse",
  description: "Explora el dashboard en Looker Studio con datos de alquiler, turismo y comercio en Barcelona."
};

export default function BusquedaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-brand-green/5 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold text-brand-dark">Dashboard en Looker Studio</h1>
          <p className="mt-4 text-brand-dark/70">
            Interactúa con los gráficos originales del proyecto para filtrar por distrito, año o tipo de contrato. El informe se actualiza automáticamente a partir de los datasets alojados en BigQuery.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-brand-gold/40 shadow-lg">
            <iframe
              title="Barcelona Rent Pulse Dashboard"
              src="https://lookerstudio.google.com/embed/reporting/6f8344ee-b498-4dc4-97ea-25c805d8753f/page/p_ragyx9ljxd"
              className="h-full w-full"
              frameBorder="0"
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
          <p className="mt-4 text-sm text-brand-dark/60">
            Consejo: usa los filtros superiores para comparar la evolución de la renta media con los indicadores turísticos y comerciales por distrito.
          </p>
        </div>
      </section>
      <Footer />
      <ChatAgent />
    </main>
  );
}
