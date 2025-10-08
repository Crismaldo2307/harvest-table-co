import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { QuoteForm } from '@/components/QuoteForm';
import { ChatAgent } from '@/components/ChatAgent';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <QuoteForm />
      <section id="contact" className="bg-brand-cream py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-brand-gold/30 bg-white p-10 shadow-xl">
            <h2 className="text-3xl font-semibold text-brand-dark md:text-4xl">Contact</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-brand-green">Email</p>
                <p className="mt-2 text-brand-dark/80">concierge@harvesttableco.com</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-green">Phone</p>
                <p className="mt-2 text-brand-dark/80">(312) 555-0180</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-green">Service area</p>
                <p className="mt-2 text-brand-dark/80">Greater Chicago Area and surrounding suburbs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-brand-dark py-8 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Harvest Table Co. All rights reserved.
      </footer>
      <ChatAgent />
    </main>
  );
}
