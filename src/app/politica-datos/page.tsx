import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAgent } from "@/components/ChatAgent";

export const metadata: Metadata = {
  title: "Política de datos | Barcelona Rent Pulse",
  description: "Principios de gobernanza, privacidad y licencias de los datos utilizados en el observatorio."
};

const policies = [
  {
    title: "Fuentes y licencias",
    detail:
      "Utilizamos datasets abiertos del Ajuntament de Barcelona, Institut d'Estadística de Catalunya y Agència de l'Habitatge. Se respetan las licencias CC-BY y ODbL, citando siempre la procedencia."
  },
  {
    title: "Procesamiento y almacenamiento",
    detail:
      "Los datos se integran en BigQuery mediante pipelines versionados. Las tablas históricas se anonimizan agregando a nivel de distrito o sección censal para preservar la privacidad."
  },
  {
    title: "Uso responsable",
    detail:
      "Los análisis buscan impacto social positivo. No vendemos datos personales ni ofrecemos listados individualizados de viviendas o propietarios."
  },
  {
    title: "Actualizaciones",
    detail:
      "Los indicadores se refrescan trimestralmente. Si detectas discrepancias, escríbenos para revisar la fuente y actualizar el dashboard."
  }
];

export default function PoliticaDatosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-brand-green/5 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold text-brand-dark">Política de datos y privacidad</h1>
          <p className="mt-4 text-brand-dark/70">
            Queremos que Barcelona Rent Pulse sea una referencia transparente. Aquí detallamos cómo obtenemos, transformamos y compartimos la información.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-5xl space-y-6 px-6">
          {policies.map((policy) => (
            <div key={policy.title} className="rounded-3xl border border-brand-gold/30 bg-white/90 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-brand-dark">{policy.title}</h2>
              <p className="mt-3 text-sm text-brand-dark/70">{policy.detail}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-brand-green/10 py-12">
        <div className="mx-auto max-w-4xl space-y-4 px-6">
          <h2 className="text-2xl font-semibold text-brand-dark">Derechos de acceso y rectificación</h2>
          <p className="text-sm text-brand-dark/70">
            Si necesitas ejercer derechos de acceso, rectificación o supresión sobre tus datos, contáctanos en
            <a href="mailto:cmaldonadoa@student.eae.es" className="ml-1 font-semibold text-brand-green hover:text-brand-gold">
              cmaldonadoa@student.eae.es
            </a>
            . Respondemos en menos de 48 horas laborables.
          </p>
        </div>
      </section>
      <Footer />
      <ChatAgent />
    </main>
  );
}
