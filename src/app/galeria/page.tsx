import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Fan2025Showcase } from '@/components/sections/Fan2025Showcase';
import { FadeIn } from '@/components/ui/FadeIn';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function GaleriaPage() {
  const session = await getSession();
  const isAdmin = session?.role === 'ADMIN';

  const images = await prisma.gallery.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <main className="min-h-screen bg-preto-profundo text-white pt-24 md:pt-32">
      <Navbar />
      <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-8xl font-display font-black uppercase italic tracking-tighter mb-8">
            Nossa <span className="text-neon-verde">Galeria</span>
          </h1>
          <p className="text-white/60 text-lg md:text-2xl max-w-3xl mx-auto font-sans">
            Obras de arte mecânica e resultados que falam por si só. Performance em estado puro.
          </p>
        </FadeIn>
      </div>
      <Fan2025Showcase dbImages={JSON.parse(JSON.stringify(images))} isAdmin={isAdmin} />
      <Footer />
    </main>
  );
}
