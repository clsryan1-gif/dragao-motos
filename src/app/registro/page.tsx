'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ChevronLeft, ShieldCheck, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegistroPage() {
  return (
    <div className="min-h-screen bg-preto-profundo flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-verde/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="street-flow"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Header/Back Link */}
        <div className="mb-8 flex items-center justify-between">
           <Link href="/login" className="inline-flex items-center gap-2 text-neon-verde text-[10px] font-black uppercase tracking-[0.3em] hover:translate-x-[-5px] transition-transform">
             <ChevronLeft size={16} /> Voltar pro Login
           </Link>
           <div className="h-[1px] flex-1 mx-4 bg-white/5"></div>
           <div className="text-white/20 text-[8px] font-black uppercase tracking-[0.4em]">REG_PROTOCOL_V.01</div>
        </div>

        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-5xl font-display font-black uppercase italic tracking-tighter text-metallic leading-none mb-2">
            NOVO <span className="text-white">PILOTO</span>
          </h1>
          <div className="flex items-center gap-3">
             <div className="h-[2px] w-8 bg-neon-verde"></div>
             <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
               Sincronize sua identidade com o <span className="text-neon-verde">QG</span>
             </p>
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-aco-grad border-chrome p-8 rounded-[2.5rem] relative overflow-hidden group">
          {/* Scanline effect */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-verde/20 animate-[scan_6s_linear_infinite] pointer-events-none"></div>

          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Codinome / Nome</label>
                  <div className="relative group/input">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                    <input 
                      type="text" 
                      placeholder="NOME COMPLETO..."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 transition-all placeholder:text-white/5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Canal / Email</label>
                  <div className="relative group/input">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                    <input 
                      type="email" 
                      placeholder="EMAIL@SISTEMA.COM..."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 transition-all placeholder:text-white/5"
                    />
                  </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Código de Segurança</label>
                  <div className="relative group/input">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                    <input 
                      type="password" 
                      placeholder="CRIAR SENHA..."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 transition-all placeholder:text-white/5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Confirmar Código</label>
                  <div className="relative group/input">
                    <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                    <input 
                      type="password" 
                      placeholder="REPETIR SENHA..."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 transition-all placeholder:text-white/5"
                    />
                  </div>
                </div>
            </div>

            <div className="pt-4 flex items-start gap-3">
                <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-white/10 bg-black/40 checked:bg-neon-verde accent-neon-verde" required />
                <label htmlFor="terms" className="text-[9px] font-black uppercase tracking-widest text-white/30 leading-relaxed cursor-pointer hover:text-white/50 transition-colors">
                  Eu concordo com os <span className="text-neon-verde">protocolos de segurança</span> e termos de uso da Dragão Motos.
                </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-black/40 border border-neon-verde/30 py-5 rounded-2xl text-neon-verde font-display font-black uppercase italic text-xl tracking-widest hover:bg-neon-verde hover:text-black hover:shadow-neon transition-all flex items-center justify-center gap-3 group/btn"
            >
              FINALIZAR CADASTRO
              <UserPlus size={24} className="group-hover:scale-110 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/10 text-[7px] font-black uppercase tracking-[0.5em]">
          PROTECTED BY CYBER-DRAGON FIREWALL • SECURE CONNECTION STRIKE
        </div>
      </motion.div>
    </div>
  );
}
