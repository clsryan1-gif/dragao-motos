'use client';

import React from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Zap, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function Fan2025Showcase() {
  return (
    <section id="galeria" className="py-12 md:py-32 px-6 md:px-12 bg-preto-asfalto border-t border-grafite relative overflow-hidden">
      {/* Background Glow sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-verde/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <SectionLabel>Destaque da Oficina</SectionLabel>
          <h2 className="font-display text-3xl md:text-8xl font-black text-white mb-8 md:mb-16 uppercase italic tracking-tighter leading-[0.9]">
            Revisão <span className="text-neon-verde">Fan 2025</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Imagem de Alta Qualidade */}
          <FadeIn delay={200} className="lg:col-span-7 relative group">
            <div className="relative aspect-[4/3] md:aspect-video overflow-hidden border-2 border-neon-verde/20 rounded-2xl bg-grafite shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <Image 
                src="/images/galeria/revisaofan2025.jpg" 
                alt="Revisão Honda Fan 2025 Dragão Motos"
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Badge de Qualidade */}
            <div className="absolute -bottom-6 -right-6 bg-neon-verde text-preto-profundo p-6 rounded-2xl shadow-xl hidden md:block">
              <Zap className="w-8 h-8 mb-2" />
              <p className="font-display text-2xl font-black uppercase italic leading-none">Padrão<br/>Elite</p>
            </div>
          </FadeIn>

          {/* Info e Detalhes */}
          <FadeIn delay={400} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-4xl md:text-6xl font-black uppercase text-white leading-tight">Mecânica de <br/><span className="text-neon-verde italic">Precisão Total</span></h3>
              <p className="font-sans text-white/70 text-lg md:text-xl leading-relaxed">
                A nova Honda Fan 2025 exige tecnologia e conhecimento especializado. Na Dragão Motos, realizamos a revisão completa seguindo os padrões de fábrica com o toque de performance que só nossa oficina oferece.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                'Ajuste fino de motor e injeção',
                'Verificação estrutural completa',
                'Lubrificação de alta performance',
                'Diagnóstico via scanner atualizado'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-neon-verde shrink-0" />
                  <span className="font-display text-lg font-bold uppercase tracking-wider text-white/90">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 flex flex-col gap-2">
               <p className="text-xs text-white/40 uppercase font-black tracking-widest">Resultado Final</p>
               <p className="text-white text-3xl font-black uppercase italic tracking-tighter">Máxima Performance Alcançada</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
