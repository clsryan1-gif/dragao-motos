'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ChevronRight, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
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
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Title */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4 p-4 rounded-2xl bg-aco-grad border-chrome relative group"
          >
            <div className="absolute inset-0 bg-neon-verde/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap size={40} className="text-neon-verde relative z-10" />
          </motion.div>
          <h1 className="text-5xl font-display font-black uppercase italic tracking-tighter text-metallic mb-2">
            DRAGÃO <span className="text-white">MOTOS</span>
          </h1>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            Acesso Restrito ao <span className="text-neon-verde">QG</span>
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-aco-grad border-chrome p-8 rounded-[2.5rem] relative overflow-hidden group">
          {/* Scanline effect mimic */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-verde/30 animate-[scan_4s_linear_infinite] pointer-events-none"></div>
          
          <form className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Piloto / Email</label>
              <div className="relative group/input">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                <input 
                  type="email" 
                  placeholder="DIGITE SEU EMAIL..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 focus:ring-1 focus:ring-neon-verde/20 transition-all placeholder:text-white/5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Senha de Ignição</label>
              <div className="relative group/input">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 focus:ring-1 focus:ring-neon-verde/20 transition-all placeholder:text-white/5"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <label className="flex items-center gap-2 text-white/40 cursor-pointer hover:text-white/60 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-black/40 checked:bg-neon-verde accent-neon-verde" />
                Lembrar Conexão
              </label>
              <button type="button" className="text-neon-verde hover:glow-neon transition-all">Recuperar Código</button>
            </div>

            <button 
              type="submit"
              className="w-full bg-neon-verde py-5 rounded-2xl text-black font-display font-black uppercase italic text-xl tracking-widest shadow-neon hover:shadow-neon-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group/btn"
            >
              INICIAR SISTEMAS
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
            Novo na oficina? <Link href="/registro" className="text-neon-verde hover:glow-neon hover:underline transition-all">Cadastrar Novo Piloto</Link>
          </p>
          
          <div className="flex items-center justify-center gap-2 text-white/20 text-[8px] font-black uppercase tracking-[0.4em]">
            <ShieldCheck size={12} />
            CONEXÃO ENCRIPTADA • DRAGÃO MOTOS PROTOCOL
          </div>
        </div>
      </motion.div>
    </div>
  );
}
