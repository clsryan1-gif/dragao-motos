import { SectionLabel } from '@/components/ui/SectionLabel';
import { CardServico } from '@/components/ui/CardServico';
import { FadeIn } from '@/components/ui/FadeIn';
import { Zap, Settings, ShieldCheck, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/constants';

export function Servicos() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'express': return Zap;
      case 'stander': return Settings;
      case 'premium': return ShieldCheck;
      case 'revitalizacao': return Sparkles;
      default: return Settings;
    }
  };

  const getIconColor = (id: string) => {
    return id === 'stander' ? "text-neon-verde" : "text-white/40";
  };
  return (
    <section id="servicos" className="py-12 md:py-24 px-6 md:px-12 bg-preto-profundo border-t border-grafite/30">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionLabel>Planos de Revisão</SectionLabel>
          <h2 className="font-display text-3xl md:text-7xl font-bold text-white mb-8 md:mb-16 uppercase italic leading-none">
            Cuidado <span className="text-neon-verde italic">Especializado</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SERVICES_DATA.map((servico, index) => (
            <FadeIn key={servico.id} delay={index * 150} className="h-full">
              <CardServico 
                title={servico.title} 
                description={servico.description} 
                icon={getIcon(servico.id)}
                iconColor={getIconColor(servico.id)}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
