import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { SOSSection } from '@/components/sections/SOSSection';
import { HomeAddress } from '@/components/sections/HomeAddress';
import { BottomNav } from '@/components/layout/BottomNav';
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
      
      <div className="street-flow" />
      <Navbar />
      
      <div className="flex-grow">
        <Hero />
        <div id="sos">
          <SOSSection />
        </div>
        <HomeAddress />
      </div>

      <Footer />
      <BottomNav />
    </main>
  );
}
