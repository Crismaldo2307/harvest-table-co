export function Footer() {
  return (
    <footer className="border-t border-brand-gold/20 bg-brand-green/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-brand-dark/70 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Cristian &amp; Alonso Data. Todos los derechos reservados.</p>
        <div className="flex flex-wrap gap-4">
          <a href="mailto:cmaldonadoa@student.eae.es" className="hover:text-brand-gold">
            cmaldonadoa@student.eae.es
          </a>
          <a href="/politica-datos" className="hover:text-brand-gold">
            Política de datos
          </a>
        </div>
      </div>
    </footer>
  );
}
