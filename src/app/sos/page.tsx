import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SOSSection } from '@/components/sections/SOSSection';
import { FadeIn } from '@/components/ui/FadeIn';

export default function SOSPage() {
  return (
    <main className="min-h-screen bg-preto-profundo text-white pt-24 md:pt-32">
      <Navbar />
      <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-8xl font-display font-black uppercase italic tracking-tighter mb-8">
            Centro de <span className="text-red-500">Resgate</span>
          </h1>
          <p className="text-white/60 text-lg md:text-2xl max-w-3xl mx-auto font-sans">
            Emergência? Pane mecânica? Não entre em pânico. Nós estamos a caminho para te salvar.
          </p>
        </FadeIn>
      </div>
      <div className="pb-24">
        <SOSSection />
      </div>
      <Footer />
    </main>
  );
}
