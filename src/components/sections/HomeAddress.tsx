import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { FadeIn } from '@/components/ui/FadeIn';

export function HomeAddress() {
  return (
    <section className="py-20 px-6 md:px-12 bg-preto-profundo relative overflow-hidden border-t border-grafite-claro">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FadeIn className="md:col-span-2">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-neon-verde/5 border border-neon-verde/20 rounded-full">
              <MapPin className="text-neon-verde w-5 h-5" />
              <span className="text-neon-verde font-display font-black uppercase tracking-widest text-sm">Nossa Localização</span>
            </div>
            <h2 className="text-4xl md:text-8xl font-display font-black uppercase italic tracking-tighter text-white mb-12 leading-none">
              Venha para a <span className="text-neon-verde">Matriz Dragão</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
              <div className="flex flex-col items-center gap-4 p-8 bg-grafite/30 border border-white/5 rounded-3xl">
                <div className="w-16 h-16 bg-neon-verde text-preto-profundo rounded-2xl flex items-center justify-center shrink-0 shadow-neon">
                  <MapPin size={32} />
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-2">Endereço Oficial</p>
                  <p className="text-white text-2xl font-bold font-display uppercase tracking-wider leading-tight">{CONTACT_INFO.address.replace(', 58000-000', '')}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 p-8 bg-grafite/30 border border-white/5 rounded-3xl">
                <div className="w-16 h-16 bg-neon-verde text-preto-profundo rounded-2xl flex items-center justify-center shrink-0 shadow-neon">
                  <Phone size={32} />
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-2">Telefone Resgate</p>
                  <p className="text-white text-2xl font-bold font-display uppercase tracking-wider leading-tight">{CONTACT_INFO.phone}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 p-8 bg-grafite/30 border border-white/5 rounded-3xl">
                <div className="w-16 h-16 bg-neon-verde text-preto-profundo rounded-2xl flex items-center justify-center shrink-0 shadow-neon">
                  <Clock size={32} />
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-2">Funcionamento</p>
                  <p className="text-white text-xl font-bold font-display uppercase tracking-wider">Seg - Sex: {CONTACT_INFO.opening_hours.week}</p>
                  <p className="text-neon-verde text-lg font-bold font-display uppercase tracking-wider">Sáb: {CONTACT_INFO.opening_hours.saturday}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
