import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Diferenciais } from '@/components/sections/Diferenciais';
import { CTAFinal } from '@/components/sections/CTAFinal';
import { FadeIn } from '@/components/ui/FadeIn';

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-preto-profundo text-white pt-24 md:pt-32">
      <Navbar />
      <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-8xl font-display font-black uppercase italic tracking-tighter mb-8">
            Nossos <span className="text-neon-verde">Serviços</span>
          </h1>
          <p className="text-white/60 text-lg md:text-2xl max-w-3xl mx-auto font-sans">
            Excelência técnica e performance para cada detalhe da sua máquina. Conheça nossos diferenciais de elite.
          </p>
        </FadeIn>
      </div>
      <Diferenciais />
      <div className="py-12">
        <CTAFinal />
      </div>
      <Footer />
    </main>
  );
}
