import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Fan2025Showcase } from '@/components/sections/Fan2025Showcase';
import { TechnicalFAQ } from '@/components/sections/TechnicalFAQ';
import { SOSSection } from '@/components/sections/SOSSection';
import { Diferenciais } from '@/components/sections/Diferenciais';
import { CTAFinal } from '@/components/sections/CTAFinal';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-preto-profundo selection:bg-neon-verde selection:text-preto-profundo relative overflow-hidden">
      {/* Logos Estratégicos como marcas d'água de fundo */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px]">
          <Image 
            src="/images/logo/logo2.png" 
            alt="" 
            fill
            priority
            className="grayscale animate-pulse object-contain"
            sizes="(max-width: 768px) 300px, 600px"
          />
        </div>
      </div>
      <div className="fixed top-20 right-[-10%] z-0 pointer-events-none opacity-[0.05]">
        <div className="relative w-[200px] h-[200px] md:w-[400px] md:h-[400px]">
          <Image 
            src="/images/logo/logo3.png" 
            alt="" 
            fill
            className="grayscale rotate-12 object-contain"
            sizes="(max-width: 768px) 200px, 400px"
          />
        </div>
      </div>
      <div className="street-flow" />
      <Navbar />
      
      <div className="flex-grow">
        <Hero />
        <Diferenciais />
        <Fan2025Showcase />
        <TechnicalFAQ />
        <SOSSection />
        <CTAFinal />
      </div>

      <Footer />
    </main>
  );
}

