import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { QuoteForm } from "@/components/QuoteForm";
import { ChatAgent } from "@/components/ChatAgent";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <QuoteForm />
      <footer className="border-t border-brand-gold/20 bg-brand-green/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-brand-dark/70 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Harvest Table Co. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#quote" className="hover:text-brand-gold">
              Request a Quote
            </a>
            <a href="mailto:hello@harvesttableco.com" className="hover:text-brand-gold">
              hello@harvesttableco.com
            </a>
          </div>
        </div>
      </footer>
      <ChatAgent />
    </main>
  );
}
