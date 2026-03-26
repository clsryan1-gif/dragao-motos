'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Copy, X } from 'lucide-react';

interface DiagnosticOverlayProps {
  error: string;
  onClose: () => void;
}

export function DiagnosticOverlay({ error, onClose }: DiagnosticOverlayProps) {
  const [copied, setCopied] = React.useState(false);

  const copyError = () => {
    navigator.clipboard.writeText(error);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-6 animate-in slide-in-from-top duration-500">
      <div className="bg-aco-grad border-2 border-red-500/50 p-6 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.3)] backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 blur-2xl" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Alerta de Sistema</span>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="bg-black/60 p-4 rounded-xl mb-4 border border-white/5 max-h-40 overflow-y-auto scrollbar-hide">
          <p className="text-xs font-mono text-red-400 break-words leading-relaxed">
            {error}
          </p>
        </div>

        <button 
          onClick={copyError}
          className="w-full bg-red-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 group hover:bg-red-400 transition-all font-display font-black uppercase italic tracking-widest text-xs"
        >
          {copied ? 'Diagnóstico Copiado!' : 'Copiar Erro'}
          {!copied && <Copy size={14} className="group-hover:rotate-12 transition-transform" />}
        </button>
      </div>
    </div>
  );
}
