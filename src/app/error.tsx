'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Zap, Copy, RefreshCcw, ShieldAlert, Terminal } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('DIAGNÓSTICO CRÍTICO:', error);
  }, [error]);

  const copyToClipboard = () => {
    const errorInfo = `
ERRO: ${error.message}
DIGEST: ${error.digest || 'N/A'}
STACK: ${error.stack || 'N/A'}
URL: ${typeof window !== 'undefined' ? window.location.href : 'N/A'}
DATE: ${new Date().toISOString()}
    `.trim();

    navigator.clipboard.writeText(errorInfo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-preto-profundo text-white flex flex-col pt-20">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {/* Header de Alerta */}
          <div className="flex flex-col items-center mb-12 animate-pulse">
            <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
               <ShieldAlert size={48} className="text-red-500" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter text-center">
               Falha no <span className="text-red-500">Sistema</span>
            </h1>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Circuítos Interrompidos</p>
          </div>

          {/* Painel de Diagnóstico */}
          <div className="bg-aco-grad border-chrome p-8 rounded-[3rem] relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
               <Terminal size={18} className="text-red-500" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Log de Erro Industrial</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-sm text-white/80 overflow-x-auto">
                <p className="text-red-400 font-bold mb-1">[{error.name || 'Error'}]:</p>
                <p>{error.message}</p>
              </div>
              
              {error.digest && (
                <p className="text-[10px] text-white/30 uppercase tracking-widest">ID de Diagnóstico: {error.digest}</p>
              )}
            </div>

            {/* Ações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={copyToClipboard}
                className="bg-white/5 border border-white/10 hover:border-white/30 p-5 rounded-2xl flex items-center justify-center gap-3 transition-all group/btn"
              >
                {copied ? <Zap size={18} className="text-neon-verde" /> : <Copy size={18} className="text-white/40 group-hover/btn:text-white" />}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {copied ? 'Copiado para o Buffer' : 'Copiar Diagnóstico'}
                </span>
              </button>

              <button 
                onClick={() => reset()}
                className="bg-red-500 text-white p-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-red-400 transition-all shadow-lg shadow-red-500/20"
              >
                <RefreshCcw size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Reiniciar Módulo</span>
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="/" 
              className="text-white/30 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all"
            >
              Abandone a Missão e Volte ao Radar Principal
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
