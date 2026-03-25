'use client';

import React, { useState } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { Button } from '@/components/ui/Button';
import { CONTACT_INFO } from '@/lib/constants';
import { AlertCircle, Motorbike, MessageCircle } from 'lucide-react';

export function SOSSection() {
  const [step, setStep] = useState(1);
  const [sosData, setSosData] = useState({
    modelo: '',
    problema: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const generateWALink = () => {
    const text = `🆘 SOS RESGATE DRAGÃO!%0A%0A` +
      `*MOTO:* ${sosData.modelo}%0A` +
      `*O QUE HOUVE:* ${sosData.problema}%0A%0A` +
      `Estou parado e preciso de resgate urgente! 🏁🆘`;
    return `https://wa.me/558387426823?text=${text}`;
  };

  return (
    <section id="sos" className="py-12 md:py-32 px-6 md:px-12 bg-black border-y border-red-900/30 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-red-600/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <FadeIn>
           <h2 className="text-4xl md:text-8xl font-display font-black text-white uppercase italic tracking-tighter mb-8 italic">
              CENTRO DE <span className="text-red-500 underline decoration-red-900">RESGATE 24H</span>
           </h2>
        </FadeIn>

        <FadeIn delay={200} className="bg-grafite/50 border border-red-900/20 p-8 rounded-3xl shadow-2xl backdrop-blur-xl max-w-2xl mx-auto">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                 <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center animate-pulse">
                    <Motorbike size={40} className="text-white" />
                 </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Qual o modelo da sua moto?</h3>
              <input 
                type="text" 
                placeholder="Ex: Honda CG Fan 160"
                className="w-full bg-black border-2 border-red-900/30 p-5 rounded-xl text-white focus:border-red-600 outline-none transition-all font-sans text-lg"
                value={sosData.modelo}
                onChange={(e) => setSosData({...sosData, modelo: e.target.value})}
              />
              <Button 
                onClick={handleNext} 
                disabled={!sosData.modelo}
                variant="sos" size="lg" className="w-full"
              >
                Próximo Passo
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                 <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center animate-pulse">
                    <AlertCircle size={40} className="text-white" />
                 </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">O que aconteceu?</h3>
              <textarea 
                placeholder="Ex: Pneu furado, Motor parou, Pane elétrica..."
                className="w-full bg-black border-2 border-red-900/30 p-5 rounded-xl text-white focus:border-red-600 outline-none transition-all font-sans text-lg h-32 resize-none"
                value={sosData.problema}
                onChange={(e) => setSosData({...sosData, problema: e.target.value})}
              />
              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="cyber" className="flex-1">Voltar</Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!sosData.problema}
                  variant="sos" className="flex-[2]"
                >
                  Confirmar Resgate
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 py-4">
               <div className="flex justify-center mb-6">
                 <div className="w-24 h-24 bg-green-600 rounded-3xl flex items-center justify-center animate-bounce shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                    <MessageCircle size={48} className="text-white" />
                 </div>
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase italic tracking-tighter">TRIAGEM <span className="text-green-500">CONCLUÍDA!</span></h3>
              <p className="text-white/60 text-lg">Clique abaixo para enviar os detalhes para o nosso WhatsApp e iniciar o socorro imediato.</p>
              
              <a href={generateWALink()} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="neon" size="xl" className="w-full !skew-x-0 !bg-green-600 hover:!bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                   ENVIAR AGORA VIA WHATSAPP
                </Button>
              </a>
              <button onClick={() => setStep(1)} className="text-white/30 hover:text-white text-xs uppercase font-black underline tracking-widest">Refazer Triagem</button>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
