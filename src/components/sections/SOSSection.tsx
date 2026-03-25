'use client';

import React from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { Button } from '@/components/ui/Button';
import { Phone, AlertTriangle, Truck } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export function SOSSection() {
  return (
    <section id="sos" className="py-6 md:py-24 px-6 md:px-12 bg-black relative overflow-hidden border-y border-red-900/30">
      {/* Luz de Emergência sutil no fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <FadeIn className="flex-1">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-display tracking-[0.15em] text-red-500 uppercase text-[10px] md:text-sm font-black">‼️ RESGATE 24H: NÓS VAMOS ATÉ VOCÊ ‼️</span>
          </div>
          <h2 className="font-display text-2xl md:text-8xl font-black text-white mb-4 md:mb-6 uppercase italic tracking-tighter leading-[0.9]">
            MOTO PARADA? <br />
            <span className="text-red-500">NÃO SE DESESPERE!</span>
          </h2>
          <p className="font-sans text-white/80 text-lg md:text-xl max-w-xl mb-8 font-bold italic leading-tight">
            Sabemos o quanto é ruim ficar na mão. Não importa o lugar ou o perigo, a Dragão Motos vai te buscar e cuidar da sua parceira como se fosse nossa. <span className="text-red-500">Nós te tiramos dessa! 🆘🤝</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`${CONTACT_INFO.whatsapp}?text=%F0%9F%86%98%20AJUDA%20URGENTE!%20Minha%20moto%20me%20deixou%20na%20m%C3%A3o%20e%20preciso%20do%20Resgate%20do%20Drag%C3%A3o%20agora!%20%E2%80%BC%EF%B8%8F`} target="_blank" rel="noopener noreferrer">
              <Button className="bg-red-600 hover:bg-red-500 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)] border-none py-8 px-10 text-xl font-black rounded-2xl animate-pulse">
                🚨 CHAMAR SOCORRO IMEDIATO
              </Button>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={200} className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 bg-grafite border border-red-900/20 hover:border-red-500/40 transition-colors">
            <Truck className="text-red-500 mb-4 w-8 h-8" />
            <h3 className="font-display text-xl font-bold text-white uppercase mb-2">Guincho Próprio</h3>
            <p className="text-sm text-white/40">Transporte seguro e especializado para qualquer tipo de moto.</p>
          </div>
          <div className="p-6 bg-grafite border border-red-900/20 hover:border-red-500/40 transition-colors">
            <AlertTriangle className="text-red-500 mb-4 w-8 h-8" />
            <h3 className="font-display text-xl font-bold text-white uppercase mb-2">Diagnóstico Local</h3>
            <p className="text-sm text-white/40">Tentamos resolver o problema onde você estiver para você seguir viagem.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
