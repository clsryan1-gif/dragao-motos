import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { FadeIn } from '@/components/ui/FadeIn';

export function HomeAddress() {
  return (
    <section className="py-20 px-6 md:px-12 bg-preto-profundo relative overflow-hidden border-t border-grafite-claro">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-neon-verde/5 border border-neon-verde/20 rounded-full">
            <MapPin className="text-neon-verde w-5 h-5" />
            <span className="text-neon-verde font-display font-black uppercase tracking-widest text-sm">Onde Estamos</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-display font-black uppercase italic tracking-tighter text-white mb-8 leading-none">
            Visite a nossa <br />
            <span className="text-neon-verde">Matriz de Elite</span>
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-grafite border border-white/5 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="text-neon-verde" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Endereço</p>
                <p className="text-white text-xl font-bold font-display uppercase tracking-wider">{CONTACT_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-grafite border border-white/5 rounded-2xl flex items-center justify-center shrink-0">
                <Phone className="text-neon-verde" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Telefone / WhatsApp</p>
                <p className="text-white text-xl font-bold font-display uppercase tracking-wider">{CONTACT_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-grafite border border-white/5 rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="text-neon-verde" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Horário de Funcionamento</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase font-black">Seg - Sex</p>
                    <p className="text-neon-verde font-display font-bold">{CONTACT_INFO.opening_hours.week}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase font-black">Sábado</p>
                    <p className="text-neon-verde font-display font-bold">{CONTACT_INFO.opening_hours.saturday}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Placeholder para Mapa ou Imagem da Fachada */}
        <FadeIn delay={200} className="relative aspect-video md:aspect-square overflow-hidden rounded-3xl border-2 border-neon-verde/20">
           <div className="absolute inset-0 bg-grafite flex items-center justify-center flex-col p-12 text-center group">
              <MapPin className="w-24 h-24 text-neon-verde/20 group-hover:scale-110 transition-transform duration-500 mb-6" />
              <p className="font-display text-2xl font-black text-white/20 uppercase tracking-tighter italic">Mapa em Construção</p>
           </div>
        </FadeIn>
      </div>
    </section>
  );
}
