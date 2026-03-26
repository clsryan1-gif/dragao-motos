'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';

const images = [
  {
    src: '/images/galeria/fan2025_01.png',
    title: 'Comandos de Precisão',
    aspect: 'Aspecto: Aço Escovado e Controles Inteiros'
  },
  {
    src: '/images/galeria/fan2025_02.png',
    title: 'Tanque & Cockpit',
    aspect: 'Aspecto: Brilho Metálico Intenso'
  },
  {
    src: '/images/galeria/fan2025_03.jpg',
    title: 'Engenharia em Equipe',
    aspect: 'Aspecto: Ajuste Técnico de Elite'
  },
  {
    src: '/images/galeria/fan2025_04.png',
    title: 'Estrutura Frontal',
    aspect: 'Aspecto: Geometria e Estabilidade'
  },
  {
    src: '/images/galeria/fan2025_05.png',
    title: 'Finalização & Limpeza',
    aspect: 'Aspecto: Cromo Polido e Fundo Industrial'
  }
];

export function Fan2025Showcase() {
  return (
    <section id="galeria" className="py-20 md:py-32 px-6 md:px-12 bg-aco-escovado relative overflow-hidden text-center">
      {/* Luzes de Estúdio Metálicas */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-verde/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-9xl font-display font-black uppercase italic tracking-tighter mb-4 text-white">
            SHOWCASE <span className="text-metallic">FAN 2025</span>
          </h2>
          <p className="text-neon-verde font-display font-bold uppercase tracking-[0.3em] mb-16 glow-neon">A Elite da Performance Industrial</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          {/* Main Hero Shot */}
          <FadeIn className="md:col-span-4 md:row-span-2">
            <div className="relative aspect-video md:aspect-square group overflow-hidden border-2 border-white/10 rounded-3xl shadow-2xl">
              <Image 
                src={images[2].src} 
                alt={images[2].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.1] brightness-[1.1] grayscale-[0.2]"
              />
              {/* Marca d'água da Logo */}
              <div className="absolute top-6 right-6 w-16 h-16 opacity-40 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                 <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-left">
                <p className="text-neon-verde font-bold uppercase tracking-widest text-xs mb-2">{images[2].aspect}</p>
                <h3 className="text-white text-3xl font-display font-black uppercase italic tracking-tighter">{images[2].title}</h3>
              </div>
              {/* Shine Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none border-2 border-white/5 rounded-3xl" />
            </div>
          </FadeIn>

          {/* Side Shots */}
          <FadeIn delay={100} className="md:col-span-2">
            <div className="relative aspect-video group overflow-hidden border-2 border-white/10 rounded-2xl shadow-xl">
              <Image 
                src={images[0].src} 
                alt={images[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.2] brightness-[0.9] saturate-[0.8]"
              />
              {/* Marca d'água da Logo */}
              <div className="absolute top-4 right-4 w-10 h-10 opacity-30 group-hover:opacity-80 transition-opacity z-20 pointer-events-none">
                 <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-4 left-6 text-left">
                <h3 className="text-white text-xl font-display font-black uppercase italic tracking-tighter">{images[0].title}</h3>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200} className="md:col-span-2">
            <div className="relative aspect-video group overflow-hidden border-2 border-white/10 rounded-2xl shadow-xl">
              <Image 
                src={images[1].src} 
                alt={images[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.1] brightness-[1.1]"
              />
               {/* Marca d'água da Logo */}
               <div className="absolute top-4 right-4 w-10 h-10 opacity-30 group-hover:opacity-80 transition-opacity z-20 pointer-events-none">
                 <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
               <div className="absolute bottom-4 left-6 text-left">
                <h3 className="text-white text-xl font-display font-black uppercase italic tracking-tighter">{images[1].title}</h3>
              </div>
            </div>
          </FadeIn>

          {/* Bottom Row */}
          <FadeIn delay={300} className="md:col-span-3">
            <div className="relative aspect-video group overflow-hidden border-chrome rounded-2xl shadow-xl">
              <Image 
                src={images[3].src} 
                alt={images[3].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.2] brightness-[0.8] grayscale-[0.3]"
              />
               {/* Marca d'água da Logo */}
               <div className="absolute top-4 right-4 w-10 h-10 opacity-30 group-hover:opacity-80 transition-opacity z-20 pointer-events-none">
                 <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
              </div>
               <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
               <div className="absolute bottom-4 left-6 text-left">
                <h3 className="text-white text-2xl font-display font-black uppercase italic tracking-tighter">{images[3].title}</h3>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={400} className="md:col-span-3">
            <div className="relative aspect-video group overflow-hidden border-chrome rounded-2xl shadow-xl">
              <Image 
                src={images[4].src} 
                alt={images[4].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-125 brightness-110"
              />
               {/* Marca d'água da Logo */}
               <div className="absolute top-4 right-4 w-12 h-12 opacity-50 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
               </div>
               <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
               <div className="absolute bottom-4 left-6 text-left">
                <h3 className="text-white text-2xl font-display font-black uppercase italic tracking-tighter">{images[4].title}</h3>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={500} className="mt-20">
           <p className="text-white/40 font-sans text-sm tracking-[0.2em] italic uppercase">Cada imagem é um reflexo do compromisso Dragão Motos com a perfeição mecânica.</p>
        </FadeIn>
      </div>
    </section>
  );
}
