import React from 'react';
import { CONTACT_INFO } from '@/lib/constants';

export function CTAFinal() {
  return (
    <section className="py-8 md:py-32 px-6 md:px-12 bg-neon-verde text-preto-profundo text-center relative overflow-hidden">
      {/* Efeito de luz sutil */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-9xl font-bold mb-6 md:mb-8 uppercase italic leading-none tracking-tighter">
          Sua Moto merece <br /> <span className="text-white">o melhor.</span>
        </h2>
        <p className="font-sans text-lg md:text-2xl font-bold mb-8 md:mb-12 uppercase tracking-widest bg-preto-profundo text-neon-verde inline-block px-3 py-1 md:px-4 md:py-2">
          Agende sua revisão agora
        </p>
        <div>
          <a 
            href={CONTACT_INFO.whatsapp} 
            className="inline-block bg-preto-profundo text-neon-verde px-8 py-4 md:px-16 md:py-6 rounded-sm font-sans font-bold text-lg md:text-xl uppercase tracking-widest hover:bg-preto-asfalto transition-all hover:scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-95"
          >
            Falar com o Especialista
          </a>
        </div>
      </div>
    </section>
  );
}
