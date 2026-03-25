'use client';

import React, { useState } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "O Remap reduz a vida útil do motor?",
    a: "Pelo contrário. Quando feito de forma profissional pela Dragão Motos, o Remap ajusta a mistura ar-combustível que vem pobre de fábrica para passar nas normas de emissão. Isso resulta em um motor que trabalha mais 'frio' e linear, aumentando a durabilidade além da potência."
  },
  {
    q: "Com qual frequência devo trocar o óleo?",
    a: "Depende do uso. Para motos de alta performance ou uso severo em cidade, recomendamos a cada 3.000km ou 6 meses. Usamos exclusivamente sintéticos de alta qualidade que protegem as engrenagens do câmbio e embreagem."
  },
  {
    q: "Vocês atendem motos de baixa cinlindrada?",
    a: "Com certeza! Da CG 160 à S1000RR, toda moto merece precisão mecânica. Temos pacotes de revisão específicos para motos de uso diário (trabalho) focados em máxima economia e confiabilidade."
  },
  {
    q: "Como funciona a garantia dos serviços?",
    a: "Todos os nossos serviços de manutenção têm garantia de 90 dias ou 3.000km. Projetos de customização e motor têm acompanhamento especializado vitalício em nossa rede de parceiros."
  }
];

export function TechnicalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-6 md:py-24 px-6 md:px-12 bg-preto-profundo border-t border-grafite">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-4 md:mb-16">
          <SectionLabel className="mx-auto">Dúvidas Técnicas</SectionLabel>
          <h2 className="font-display text-2xl md:text-8xl font-bold text-white uppercase italic tracking-tighter leading-none">
            Mecânica <span className="text-neon-verde">sem Mistério</span>
          </h2>
        </FadeIn>

        <div className="space-y-2 md:space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div 
                className={`border transition-all duration-300 ${
                  openIndex === index ? 'border-neon-verde bg-grafite' : 'border-grafite-claro bg-black'
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex justify-between items-center text-left"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className={`font-display text-2xl font-bold uppercase ${openIndex === index ? 'text-neon-verde' : 'text-white/80'}`}>
                    {index + 1}. {faq.q}
                  </span>
                  {openIndex === index ? <Minus className="text-neon-verde" /> : <Plus className="text-white/40" />}
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="p-6 pt-0 font-sans text-white/50 leading-relaxed border-t border-grafite-claro/30 mt-2">
                    {faq.a}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
