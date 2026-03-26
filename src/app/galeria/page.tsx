import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Fan2025Showcase } from '@/components/sections/Fan2025Showcase';
import { FadeIn } from '@/components/ui/FadeIn';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || "dragao_motos_super_secret_key_2026";
const key = new TextEncoder().encode(secretKey);

export const dynamic = 'force-dynamic';

export default async function GaleriaPage() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("dragao_session")?.value;
    let isAdmin = false;

    if (sessionToken) {
      try {
        const { payload } = await jwtVerify(sessionToken, key, { algorithms: ["HS256"] });
        isAdmin = payload.role === 'ADMIN';
      } catch (e) {
        // Ignora erro de JWT, usuário comum
      }
    }

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
  } catch (error: any) {
    console.error("DIAGNOSTICO GALERIA:", error);
    return (
      <main className="min-h-screen bg-preto-profundo text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
           <span className="text-red-500 text-4xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-display font-black uppercase italic italic mb-2">ERRO TÉCNICO DETECTADO</h1>
        <p className="text-white/40 text-xs uppercase tracking-widest max-w-md">
           Ocorreu uma falha ao carregar a interface da galeria. 
           Erro: {error.message || 'Falha de comunicação DB'}
        </p>
        <a href="/" className="mt-8 text-neon-verde font-black uppercase tracking-widest text-[10px] hover:glow-neon transition-all">Voltar para o Radar</a>
      </main>
    )
  }
}
