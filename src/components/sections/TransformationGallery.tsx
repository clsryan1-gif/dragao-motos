'use client';

import React, { useState } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ChevronRight, ChevronLeft, Eye } from 'lucide-react';
import Image from 'next/image';

const transformations = [
  {
    id: 1,
    title: 'Projeto Street Fighter',
    bike: 'Honda CB 600F Hornet',
    before: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop', // Moto stock
    after: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800&auto=format&fit=crop', // Moto custom
    description: 'Transformação completa: escape esportivo, remap staged e pintura exclusiva camaleão.'
  },
  {
    id: 2,
    title: 'Performance Track Day',
    bike: 'BMW S1000RR',
    before: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop',
    description: 'Ajuste de suspensão Ohlins, freios Brembo racing e eletrônica desbloqueada para pista.'
  }
];

export function TransformationGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(true);

  const next = () => setActiveIndex((prev) => (prev + 1) % transformations.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + transformations.length) % transformations.length);

  const current = transformations[activeIndex];

  return (
    <section id="galeria" className="py-6 md:py-24 px-6 md:px-12 bg-preto-asfalto border-t border-grafite relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionLabel>Work in Progress</SectionLabel>
          <h2 className="font-display text-2xl md:text-8xl font-bold text-white mb-6 md:mb-12 uppercase italic tracking-tighter">
            Transformações <span className="text-neon-verde">Dragão</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Visual Showcase com Toggle Antes/Depois */}
          <FadeIn delay={200} className="relative group">
            <div className="relative aspect-video overflow-hidden border border-grafite-claro rounded-sm bg-grafite">
              <Image 
                src={showAfter ? current.after : current.before} 
                alt={current.title}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Overlay Toggle */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                <div className="bg-neon-verde text-preto-profundo px-4 py-1 text-sm font-bold uppercase tracking-widest">
                  {showAfter ? 'Depois (Dragão Custom)' : 'Antes (Original)'}
                </div>
                <button 
                  onClick={() => setShowAfter(!showAfter)}
                  className="bg-white/10 hover:bg-neon-verde hover:text-preto-profundo backdrop-blur-md p-3 rounded-full transition-all border border-white/20"
                  aria-label={showAfter ? "Ver versão original" : "Ver versão customizada"}
                >
                  <Eye className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Navegação entre projetos */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              <button 
                onClick={prev} 
                className="p-4 bg-grafite border border-grafite-claro hover:border-neon-verde text-white transition-all focus:ring-2 focus:ring-neon-verde outline-none"
                aria-label="Ver projeto anterior"
              >
                <ChevronLeft />
              </button>
              <button 
                onClick={next} 
                className="p-4 bg-grafite border border-grafite-claro hover:border-neon-verde text-white transition-all focus:ring-2 focus:ring-neon-verde outline-none"
                aria-label="Próximo projeto"
              >
                <ChevronRight />
              </button>
            </div>
          </FadeIn>

          {/* Info do Projeto */}
          <FadeIn delay={400} className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display text-4xl font-bold uppercase text-white leading-none">{current.title}</h3>
              <p className="font-display text-xl text-neon-verde uppercase tracking-wider">{current.bike}</p>
            </div>
            <p className="font-sans text-white/60 text-lg leading-relaxed">
              {current.description}
            </p>
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-grafite-claro">
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Status</p>
                <p className="text-white text-sm font-bold uppercase italic">Concluído</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Performance</p>
                <p className="text-neon-verde text-sm font-bold uppercase italic">+15% HP</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Tempo</p>
                <p className="text-white text-sm font-bold uppercase italic">12 Dias</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
