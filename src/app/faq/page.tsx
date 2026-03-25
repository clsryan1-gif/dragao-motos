import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TechnicalFAQ } from '@/components/sections/TechnicalFAQ';
import { FadeIn } from '@/components/ui/FadeIn';

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-preto-profundo text-white pt-24 md:pt-32">
      <Navbar />
      <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-8xl font-display font-black uppercase italic tracking-tighter mb-8">
            Dúvidas <span className="text-neon-verde">Técnicas</span>
          </h1>
          <p className="text-white/60 text-lg md:text-2xl max-w-3xl mx-auto font-sans">
            Tudo o que você precisa saber para manter sua moto no topo da performance.
          </p>
        </FadeIn>
      </div>
      <TechnicalFAQ />
      <Footer />
    </main>
  );
}
