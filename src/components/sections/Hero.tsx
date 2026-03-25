import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';
import { HeroDragon } from './HeroDragon';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section id="hero" className="relative h-[65vh] md:h-screen min-h-[450px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-preto-profundo">
      {/* Dragon Silhouette Background - Surprise Visionary Feature */}
      <HeroDragon />

      {/* Background Overlay com textura de asfalto fictícia via gradiente */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.9)_100%)] z-1" />
      
      {/* Moto Principal - Otimizada com next/image */}
      <div className="absolute inset-0 z-[-1] grayscale opacity-40 scale-110">
        <Image 
          src="/images/hero/hero-moto.png" 
          alt="Moto Dragão" 
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>


      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="animate-slide-up">
          <div className="inline-block border border-neon-verde/40 px-3 py-0.5 mb-4 rounded-sm bg-neon-verde/5">
            <span className="text-neon-verde font-display tracking-[0.2em] uppercase text-[10px] md:text-sm">Oficina de Performance</span>
          </div>
        </div>

        <div className="animate-slide-up [animation-delay:100ms]">
          <h1 className="font-display text-4xl md:text-9xl font-bold leading-tight mb-4 uppercase italic text-white tracking-tighter">
            Potência, Precisão <br />
            <span className="text-neon-verde">& Performance</span>
          </h1>
        </div>

        <div className="animate-fade-in [animation-delay:200ms]">
          <p className="font-sans text-sm md:text-2xl text-white/70 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            A oficina definitiva para a sua moto. <br className="hidden md:block" />
            Performance que você sente em cada curva.
          </p>
        </div>

        <div className="animate-slide-up [animation-delay:300ms]">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Link href="/agendamento" className="w-full sm:w-auto">
              <Button variant="neon" size="lg" className="w-full active:scale-95 transition-transform">
                Falar com um Mecânico
              </Button>
            </Link>
            <Link href="/agendamento" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full active:scale-95 transition-transform">
                Agendar Serviço
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Botão de Scroll Down */}
      <a href="#servicos" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </a>
    </section>
  );
}
