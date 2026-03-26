'use client';

import React from 'react';
import { ShoppingCart, CheckCircle2, Package, Cpu, Zap } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Produto = {
  id: string;
  categoria: string;
  nome: string;
  compatibilidade: string;
  preco: number;
  imagem: string | null;
  estoque: number;
};

interface ProdutoCardProps {
  produto: Produto;
  isAdded: boolean;
  onAdicionar: (p: Produto) => void;
  BRL: (v: number) => string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
};

const ProdutoCard = React.memo(({ produto, isAdded, onAdicionar, BRL }: ProdutoCardProps) => {
  return (
    <motion.div 
      variants={cardVariants}
      className="bg-aco-grad border-chrome rounded-2xl overflow-hidden flex flex-col hover:border-neon-verde transition-all duration-500 group relative shadow-2xl isolate"
    >
      {/* Efeito de Scanner de Laser no Hover (Surpresa) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
         <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-verde shadow-[0_0_15px_#00FF33] animate-[scan_2s_linear_infinite]"></div>
      </div>

      {/* Imagem Container */}
      <Link href={`/produtos/${produto.id}`} className="block relative">
        <div className="bg-black/40 h-40 md:h-48 flex items-center justify-center p-4 overflow-hidden relative grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700">
          {produto.imagem ? (
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-full drop-shadow-[0_0_15px_rgba(34,197,94,0.2)]"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="object-contain w-full h-full"
              />
            </motion.div>
          ) : (
            <Package className="w-12 h-12 text-neon-verde opacity-20" />
          )}
          
          {/* Badge de Categoria Flutuante Style Cyber */}
          <div className="absolute top-3 left-3 z-20">
             <div className="flex items-center gap-1.5 px-2 py-1 bg-black/60 border border-neon-verde/30 rounded-md backdrop-blur-md">
                <Cpu size={10} className="text-neon-verde" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">{produto.categoria}</span>
             </div>
          </div>
        </div>
      </Link>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1 relative z-10">
        <div className="flex items-center gap-2 mb-2">
            <div className={`w-1.5 h-1.5 rounded-full ${produto.estoque > 0 ? 'bg-neon-verde shadow-[0_0_8px_#00FF33]' : 'bg-red-500'}`}></div>
            <span className="text-[9px] font-bold text-white/50 uppercase tracking-tighter italic">
                {produto.estoque > 0 ? 'Original Certificada' : 'Fora de Estoque'}
            </span>
        </div>

        <Link href={`/produtos/${produto.id}`}>
          <h2 className="text-sm md:text-base font-display font-black text-white leading-tight mb-2 group-hover:text-neon-verde transition-colors line-clamp-2 uppercase italic tracking-tight">
            {produto.nome}
          </h2>
        </Link>
        
        <div className="space-y-1 mb-4">
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Compatível:</p>
          <p className="text-[11px] text-neon-verde/70 font-bold line-clamp-1">{produto.compatibilidade}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex flex-col">
              <span className="text-[8px] text-white/30 uppercase font-black tracking-widest">Preço Elite</span>
              <span className={`font-display font-black text-xl md:text-2xl ${produto.estoque > 0 ? 'text-white' : 'text-white/20'}`}>
                {BRL(produto.preco)}
              </span>
          </div>

          <motion.button
            whileHover={produto.estoque > 0 ? { scale: 1.1, rotate: 5 } : {}}
            whileTap={produto.estoque > 0 ? { scale: 0.95 } : {}}
            onClick={() => produto.estoque > 0 && onAdicionar(produto)}
            disabled={produto.estoque <= 0}
            className={`relative p-3 rounded-lg transition-all shadow-neon-hover border-2 ${
              isAdded ? 'bg-neon-verde border-white text-black' : 
              produto.estoque > 0 ? 'bg-black border-neon-verde text-neon-verde hover:bg-neon-verde hover:text-black' : 
              'bg-zinc-900 border-zinc-800 text-zinc-700 cursor-not-allowed'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {isAdded ? (
                 <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                   <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                 </motion.div>
              ) : (
                 <motion.div key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                   <Zap className="w-5 h-5 md:w-6 md:h-6" />
                 </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      
      {/* Decorações de Canto */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 rounded-bl-xl"></div>
    </motion.div>
  );
});

ProdutoCard.displayName = 'ProdutoCard';

export default ProdutoCard;
